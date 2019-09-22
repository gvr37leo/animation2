/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="rect.ts" />
/// <reference path="node_modules/eventsystemx/eventsystem.ts" />
/// <reference path="Bezier.ts" />
/// <reference path="handle.ts" />
/// <reference path="clickmanager.ts" />
/// <reference path="projectutils.ts" />

var reddot = new Anim()
reddot.animType = AnimType.repeat
reddot.stopwatch.start()
var res = createCanvas(400,400)
var ctxt = res.ctxt
var canvas = res.canvas
var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
// var bc = new BezierControl()

var mousepos = new Vector(11, 10)
document.addEventListener('mousemove', e => {
    mousepos = getMousePos(canvas,e)
})
loop(dt => {

    ctxt.clearRect(0,0,400,400)
    // var pos = Bezier.tween(reddot.get(),bc.normalizedCachedXCurve)
    // bc.draw()
    // bc.denormalize(pos)
    // pos.draw(bc.ctxt)
})
// FABRIK(tent, new Vector(20,0), 0.01)


class SlopedAnimation{
    anim:Anim
    controlPoints:Vector[]
    private path:Vector[]

    constructor(){

    }

    cacheControlPoints(){
        Bezier.computeWaypoints()
    }

    get(){
        Bezier.tween(this.anim.get(),this.path)
        
    }

}