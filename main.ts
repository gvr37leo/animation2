/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="rect.ts" />
/// <reference path="node_modules/eventsystemx/eventsystem.ts" />
/// <reference path="Bezier.ts" />
/// <reference path="handle.ts" />
/// <reference path="clickmanager.ts" />



var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
var bc = new BezierControl()


function first<T>(arr:T[]):T{
    return arr[0]
}

function map(val:number,from1:number,from2:number,to1:number,to2:number):number{
    return lerp(to1,to2,inverseLerp(val,from1,from2))
}

