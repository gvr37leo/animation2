/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="rect.ts" />
/// <reference path="node_modules/eventsystemx/eventsystem.ts" />
/// <reference path="AnimControl.ts" />
/// <reference path="handle.ts" />
/// <reference path="clickmanager.ts" />
/// <reference path="projectutils.ts" />
/// <reference path="smoothAnimation.ts" />


var res = createCanvas(400,400)
var ctxt = res.ctxt
var canvas = res.canvas
var example = [new Vector(0,0),new Vector(10,20),new Vector(20,20),new Vector(30,0),new Vector(40,10),new Vector(50,10),new Vector(60,0)]
var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
// var bc = new BezierControl()
var anim = new SmoothAnimation(SmoothAnimation.easeInEaseOut)
anim.animType = AnimType.pingpong
anim.duration = 1000 / 2.667
anim.stopwatch.start()



var mousepos = new Vector(11, 10)
document.addEventListener('mousemove', e => {
    mousepos = getMousePos(canvas,e)
})
loop(dt => {

    ctxt.clearRect(0,0,400,400)
    ctxt.fillRect(10,anim.getSmooth() * 300,10,10)
    

    // var pos = Bezier.tween(reddot.get(),bc.normalizedCachedXCurve)
    // bc.draw()
    // bc.denormalize(pos)
    // pos.draw(bc.ctxt)
})
// FABRIK(tent, new Vector(20,0), 0.01)


