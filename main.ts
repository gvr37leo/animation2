/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="Bezier.ts" />


var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)

var curve = Bezier.computeWaypoints(11,
    new Vector(0,0),
    new Vector(10,10),
    new Vector(0,10),
    new Vector(10,0),
)
var constant = Bezier.constantDistanceWaypoints(curve,11)
var cached = Bezier.cacheSlopeX(curve,11)

loop((dt) => {
    dt /= 1000
})

var bc = new BezierControl()


function first<T>(arr:T[]):T{
    return arr[0]
}

function map(val:number,from1:number,from2:number,to1:number,to2:number):number{
    return lerp(to1,to2,inverseLerp(val,from1,from2))
}

