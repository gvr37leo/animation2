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
    constructor(){
        var res = createCanvas(200,200)

        this.ctxt = res.ctxt
        var curve = Bezier.computeWaypoints(11,
            new Vector(0,0),
            new Vector(1,1),
            new Vector(0,1),
            new Vector(1,0),
        )
        for(var p of curve){
            p.x = map(p.x,0,1,0,200)
            p.y = map(p.y,0,1,200,0)
        }
        this.line(curve)
    }

    line(line:Vector[]){
        this.ctxt.beginPath();
        var f = first(line)
        this.ctxt.moveTo(f.x,f.y)
        for(var i = 1; i < line.length; i++){
            var p = line[i]
            this.ctxt.lineTo(p.x,p.y)
        }
        this.ctxt.stroke();
    }
}