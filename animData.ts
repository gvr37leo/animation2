var jumpy = new SmoothAnimation(SmoothAnimation.easeOut)
jumpy.animType = AnimType.pingpong
jumpy.duration = 1000
jumpy.stopwatch.start()

var jumpx = new SmoothAnimation(SmoothAnimation.linear)
jumpx.animType = AnimType.repeat
jumpx.duration = 2000
jumpx.stopwatch.start()

function createAnimsForVector(v){

}

var rootposes = [
    new Vector(0,0),
    // new Vector(0,0),
    new Vector(0,0),
    new Vector(20,-20),
    new Vector(30,-10),
    new Vector(40,0),
    new Vector(0,0),
]

var headPoses = [
    new Vector(0,-40),
    new Vector(0,-10),
    new Vector(40,40),
    new Vector(0,-10),
    new Vector(-10,-35),
    new Vector(0,-10),
    new Vector(0,-40),
]

var east = new Vector(1,0)
var headLookdirection = [
    rotate2d(east,0),
    rotate2d(east,0.20),
    rotate2d(east,0.125),
    rotate2d(east,-0.125),
    rotate2d(east,-0.125),
    rotate2d(east,0),
    rotate2d(east,0),
]