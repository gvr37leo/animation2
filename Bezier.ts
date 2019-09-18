class Bezier{
    constructor(){

    }

    static getBezierPoint(t:number,p0:Vector,p1:Vector,p2:Vector,p3:Vector):Vector{
        var a = p0.lerp(p1,t)
        var b = p1.lerp(p2,t)
        var c = p2.lerp(p3,t)
        var d = a.lerp(b,t)
        var e = b.lerp(c,t)
        var res = d.lerp(e,t)
        return res
    }

    static computeWaypoints(numberOfWaypoints:number,p0:Vector,p1:Vector,p2:Vector,p3:Vector){
        numberOfWaypoints--
        var waypoints:Vector[] = [];
        for(var i = 0; i <= numberOfWaypoints; i++){
            waypoints.push(Bezier.getBezierPoint(i / numberOfWaypoints, p0,p1,p2,p3))
        }
        return waypoints;
    }

    static calcLength(waypoints:Vector[]){
        var length = 0;
        for(var i = 1; i < waypoints.length; i++){
            length += waypoints[i].to(waypoints[i - 1]).length()
        }
        return length;
    }

    static tween(t:number, waypoints:Vector[]){
        var lm1 = waypoints.length - 1;
        var low = Math.floor(lm1 * t)
        var high = Math.ceil(lm1 * t)
        return waypoints[low].lerp(waypoints[high],t*lm1 - Math.floor(t*lm1))
    }

    static constantDistanceWaypoints(waypoints:Vector[],numberOfWaypoints:number){
        var length = this.calcLength(waypoints);
        var spacing = length / (numberOfWaypoints - 1)
        var result:Vector[] = [first(waypoints).c()]
        
        var budget = 0
        for(var i = 0; i < waypoints.length - 1; i++){
            var a = waypoints[i]
            var b = waypoints[i + 1]
            var length = a.to(b).length()
            var remainingLength = budget
            budget += length
            var fits = Math.floor((remainingLength + length) / spacing) 
            budget -= fits * spacing
            for(var j = 1; j <= fits; j++){
                result.push(a.lerp(b,(j * spacing - remainingLength) / length))
            }
        }
        result.push(last(waypoints).c())
        return result
    }

    //points need to be guaranteed left to tight
    static cacheSlopeX(points:Vector[],samplePoints:number):Vector[]{
        var result = []
        samplePoints--
        for(var i = 0; i <= samplePoints; i++){
            result.push(new Vector(lerp(first(points).x, last(points).x, i / samplePoints), 0))
        }
        var sectionIndex = 0
        for(var point of result){
            var a = points[sectionIndex]
            var b = points[sectionIndex + 1]
            while(!inRange(a.x,b.x,point.x)){
                sectionIndex++
                a = points[sectionIndex]
                b = points[sectionIndex + 1]
            }
            point.y = map(point.x,a.x,b.x,a.y,b.y)
        }
        return result
    }
}

class BezierControl{
    ctxt: CanvasRenderingContext2D
    visualCurve:Vector[]
    normalizedCachedXCurve:Vector[]
    handles:Handle[]
    precision = 21
    canvassize: Vector

    constructor(){
        this.canvassize = new Vector(200,200)
        var res = createCanvas(200,200)
        this.ctxt = res.ctxt
        var clickmanager = new ClickManager(res.canvas)
        clickmanager.listenToDocument()
        var a = new Handle(new Vector(0,200),clickmanager)
        var b = new Handle(new Vector(200,0),clickmanager)
        var c = new Handle(new Vector(0,0),clickmanager)
        var d = new Handle(new Vector(200,200),clickmanager)
        this.handles = [a,b,c,d]
        this.handles.forEach(h => {
            h.pos.onchange.listen(e => {
                this.update()
                this.draw()
            })
        })
        this.update()
        this.draw()
        
    }

    update(){
        this.visualCurve = Bezier.computeWaypoints(this.precision,this.handles[0].pos.get(),this.handles[1].pos.get(),this.handles[2].pos.get(),this.handles[3].pos.get())
        this.normalizedCachedXCurve = Bezier.cacheSlopeX(this.nall(this.visualCurve), this.precision)
    }

    draw(){
        this.ctxt.clearRect(0,0,200,200)
        this.handles.forEach(h => {
            h.draw(this.ctxt)
        })
        this.line(this.ctxt,[this.handles[0].pos.get(),this.handles[1].pos.get(),])
        this.line(this.ctxt,[this.handles[2].pos.get(),this.handles[3].pos.get()])
        this.line(this.ctxt, this.visualCurve)
    }

    nall(arr:Vector[]){
        return arr.map(v => this.normalize(v.c()))
    }

    normalize(v:Vector){
        v.x = map(v.x,0,this.canvassize.x,0,1)
        v.y = map(v.y,this.canvassize.y,0,0,1)
        return v
    }

    denormalize(v:Vector){
        v.x = map(v.x,0,1,0,this.canvassize.x)
        v.y = map(v.y,0,1,this.canvassize.y,0)
        return v
    }

    line(ctxt,line:Vector[]){
        ctxt.beginPath();
        var f = first(line)
        ctxt.moveTo(f.x,f.y)
        for(var i = 1; i < line.length; i++){
            var p = line[i]
            ctxt.lineTo(p.x,p.y)
        }
        ctxt.stroke();
    }
}

function FABRIK(bones:Vector[],target:Vector,error:number):Vector[]{
    var maxIterations = 10
    var end = FK(bones)
    while(end.to(target).length() > error){
        finalToRoot()
        rootToFinal()
        end = FK(bones)
    }
    return bones
}

function FK(bones:Vector[]):Vector{
    var res = new Vector(0,0)
    bones.forEach(b => res.add(b))
    return res;
}

function finalToRoot(vectors:Vector[],endEffector:Vector){
    
    for(var i = vectors.length; i > 1; i--){
        var a = vectors[i]
        var b = vectors[i - 1]
        var section = a.to(b)
        var length = section.length()
    }
}

function rootToFinal(){

}