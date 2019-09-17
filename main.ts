/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="Bezier.ts" />


var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt


loop((dt) => {
    dt /= 1000
})

function first<T>(arr:T[]):T{
    return arr[0]
}
