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



function cacheSin(precision:number){
    for(var i = 0; i < precision;i++){
        sinCache[i] = Math.sin((i / precision) * TAU)
    }
}

var sinCache = []
cacheSin(360)

function sinCached(radians:number){
    var percentage = mod(radians,TAU) / TAU
    var abs = percentage * sinCache.length
    var bot = Math.floor(abs)
    var top = Math.ceil(abs)
    var remains = abs - bot
    return lerp(sinCache[bot],sinCache[top % sinCache.length],remains)
}

function cacheCos(precision:number){
    for(var i = 0; i < precision;i++){
        cosCache[i] = Math.cos((i / precision) * TAU)
    }
}

var cosCache = []
cacheCos(360)

function cosCached(radians:number){
    var percentage = mod(radians,TAU) / TAU
    var abs = percentage * cosCache.length
    var bot = Math.floor(abs)
    var top = Math.ceil(abs)
    var remains = abs - bot
    return lerp(cosCache[bot],cosCache[top % cosCache.length],remains)
}