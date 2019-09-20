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
    ctxt.stroke();
}