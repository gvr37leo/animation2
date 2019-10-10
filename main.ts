/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="rect.ts" />
/// <reference path="node_modules/eventsystemx/eventsystem.ts" />
/// <reference path="AnimControl.ts" />
/// <reference path="handle.ts" />
/// <reference path="clickmanager.ts" />
/// <reference path="projectutils.ts" />
/// <reference path="smoothAnimation.ts" />
/// <reference path="bone.ts" />
/// <reference path="animData.ts" />



var res = createCanvas(400,400)
var ctxt = res.ctxt
var canvas = res.canvas
var example = [new Vector(0,0),new Vector(10,20),new Vector(20,20),new Vector(30,0),new Vector(40,10),new Vector(50,10),new Vector(60,0)]
var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)



function createRig(){
    mesh = [
        new Vector(-10,0),
        new Vector(10,0),
        new Vector(0,0),
    
        new Vector(-20,-20),
    
        new Vector(0,-40),
    
        new Vector(10,-50),
        new Vector(10,-30),
    ]
    var root = new Bone(1,null)
    root.pos = new Vector(0,0)
    root.rot = 0
    root.scale = new Vector(2,2)
    root.trans = new Vector(20,0)
    root.vertexgroup = [0,1,2]
    var lowerarm = new Bone(2,1)
    lowerarm.pos = new Vector(0,0)
    lowerarm.rot = 0
    lowerarm.vertexgroup = [3]
    var upperarm = new Bone(3,2)
    upperarm.rot = 0
    upperarm.pos = new Vector(-20,-20)
    upperarm.vertexgroup = [4]

    var head = new Bone(4,3)
    head.rot = 0
    head.pos = new Vector(0,-40)
    head.vertexgroup = [5,6]
    bones = [root,lowerarm,upperarm,head]
}
function drawLamp(){
    line(ctxt,[mesh[0],mesh[1]])
    line(ctxt,[mesh[2],mesh[3]])
    line(ctxt,[mesh[3],mesh[4]])
    line(ctxt,[mesh[4],mesh[5]])
    line(ctxt,[mesh[4],mesh[6]])
}


var mousepos = new Vector(11, 10)
document.addEventListener('mousemove', e => {
    mousepos = getMousePos(canvas,e)
})
var bones:Bone[] = []
var mesh:Vector[] = []

loop(dt => {
    ctxt.clearRect(0,0,500,500)
    createRig()
    bones[0].trans.x = jumpx.getSmooth() * 100
    bones[0].trans.y = jumpy.getSmooth() * -100
    bones[0].applyTransform()
    mesh.forEach(v => v.add(new Vector(100,200)))
    drawLamp()
})



















