/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="rect.ts" />
/// <reference path="node_modules/eventsystemx/eventsystem.ts" />
/// <reference path="Bezier.ts" />
/// <reference path="handle.ts" />
/// <reference path="clickmanager.ts" />

var reddot = new Anim()
reddot.animType = AnimType.repeat
reddot.stopwatch.start()
var res = createCanvas(400,400)
var ctxt = res.ctxt
var canvas = res.canvas
var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
// var bc = new BezierControl()
var tent = [
    new Vector(0,0),
    new Vector(100,100),
    new Vector(200,200),
]
var mousepos = new Vector(300,300)
document.addEventListener('mousemove', e => {
    mousepos = getMousePos(canvas,e)
})
loop(dt => {
    ctxt.clearRect(0,0,400,400)
    FABRIK(tent,mousepos,0.01)
    line(ctxt,tent)
    // var pos = Bezier.tween(reddot.get(),bc.normalizedCachedXCurve)
    // bc.draw()
    // bc.denormalize(pos)
    // pos.draw(bc.ctxt)
})
// FABRIK(tent, new Vector(20,0), 0.01)

function first<T>(arr:T[]):T{
    return arr[0]
}

function map(val:number,from1:number,from2:number,to1:number,to2:number):number{
    return lerp(to1,to2,inverseLerp(val,from1,from2))
}

function line(ctxt:CanvasRenderingContext2D,points:Vector[]){
    ctxt.beginPath();
    var f = first(points)
    ctxt.moveTo(f.x,f.y)
    for(var i = 1; i < points.length; i++){
        var p = points[i]
        ctxt.lineTo(p.x,p.y)
    }
    // ctxt.closePath()
    ctxt.stroke();
}
