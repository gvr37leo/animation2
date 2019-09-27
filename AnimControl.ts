

class AnimControl{
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
        line(this.ctxt,[this.handles[0].pos.get(),this.handles[1].pos.get(),])
        line(this.ctxt,[this.handles[2].pos.get(),this.handles[3].pos.get()])
        line(this.ctxt, this.visualCurve)
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

    
}

function FK(bones:Vector[]):Vector{
    return bones.reduce((p,c) => p.add(c),new Vector(0,0))
}

function FABRIK(vectors:Vector[],endEffector:Vector,maxError:number,maxIterations:number):Vector[]{
    var lengths = calcSegmentLengths(vectors)
    var totallength = lengths.reduce((p,c) => p + c,0)
    var anchor = first(vectors).c()
    
    if(totallength > first(vectors).to(endEffector).length()){
        for(var i = 0; i < maxIterations && last(vectors).to(endEffector).length() > maxError; i++){
            backward(vectors,endEffector,lengths)
            forward(vectors,anchor,lengths)
        }
    }else{
        var dir = anchor.to(endEffector).normalize()
        var current = new Vector(0,0)
        for(var i = 1; i < vectors.length; i++){
            var offset = dir.c().scale(lengths[i - 1])
            vectors[i] = offset.c().add(anchor).add(current)
            current.add(offset)
        }
    }
    return vectors

}

function backward(vectors:Vector[],endEffector:Vector,lengths:number[]){
    last(vectors).overwrite(endEffector)
    for(var i = vectors.length - 2; i >= 0; i--){
        var a = vectors[i + 1]//towards end
        var b = vectors[i]//towards anchor
        b.overwrite(a.c().add(a.to(b).normalize().scale(lengths[i])))
    }
}

function forward(vectors:Vector[],anchor:Vector,lengths:number[]){
    first(vectors).overwrite(anchor)
    for(var i = 1; i < vectors.length; i++){
        var a = vectors[i - 1]//towards anchor
        var b = vectors[i]//towards end
        b.overwrite(a.c().add(a.to(b).normalize().scale(lengths[i - 1])))
    }
}

function calcSegmentLengths(vectors:Vector[]){
    var lengths:number[] = []
    for(var i = 0; i < vectors.length - 1; i++){
        lengths.push(vectors[i].to(vectors[i + 1]).length())
    }
    return lengths
}
