class Bone{
    vertexgroup:number[]
    pos:Vector

    rot:number = 0
    trans:Vector = new Vector(0,0)
    scale:Vector = new Vector(1,1)
    constructor(public id:number,public parent:number){

    }

    applyTransform(){
        var vertices = this.getAllChildVertices()
        var directChildren = bones.filter(b => b.parent == this.id)
        var allChildren = this.getAllChildBones()
        vertices = vertices.concat(allChildren.map(b => b.pos))
        
        for(var v of vertices){
            rotate2dCenter(v,this.rot,this.pos)
            v.mul(this.scale)
            v.add(this.trans)
        }
        for(var child of directChildren){
            child.applyTransform()
        }
    }
    
    getAllChildVertices(){
        var vertices = this.vertexgroup.map(i => mesh[i])
        var children = bones.filter(b => b.parent == this.id)
        for(var c of children){
            vertices = vertices.concat(c.getAllChildVertices()) 
        }
        return vertices
    }

    getAllChildBones(){
        var children = bones.filter(b => b.parent == this.id)
        for(var c of children){
            children = children.concat(c.getAllChildBones()) 
        }
        return children
    }

}

function rotate2d(v:Vector,rotations:number){
    var s = sinCached(rotations * TAU)
    var c = cosCached(rotations * TAU)
    var x = v.x * c - v.y * s
    var y = v.x * s + v.y * c
    v.x = x
    v.y = y
    return v
}

function rotate2dCenter(v:Vector,rotations:number,center:Vector){
    v.sub(center)
    rotate2d(v,rotations)
    v.add(center)
    return v
}