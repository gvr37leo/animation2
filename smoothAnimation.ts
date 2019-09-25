class SmoothAnimation{
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