class Bezier{
    p0:Vector
    p1:Vector
    p2:Vector
    p3:Vector

    constructor(){

    }

    static getBezierPoint(t:number,p0:Vector,p1:Vector,p2:Vector,p3:Vector):Vector{
        var a = p0.lerp(p1,t)
        var b = p1.lerp(p2,t)
        var c = p2.lerp(p3,t)
        var d = a.lerp(b,t)
        var e = b.lerp(c,t)
        var res = d.lerp(e,t)
        return res
    }

    computeWaypoints(numberOfWaypoints:number){
        var detail = 1 / numberOfWaypoints;
        var waypoints:Vector[] = [];
        for(var t = 0; t < 1; t += detail){
            waypoints.push(Bezier.getBezierPoint(t, this.p0,this.p1,this.p2,this.p3))
        }
        waypoints.push(Bezier.getBezierPoint(1, this.p0,this.p1,this.p2,this.p3))
        return waypoints;
    }

    static constantDistanceWaypoints(waypoints:Vector[],numberOfWaypoints:number){
        
        var length = this.calcLength(waypoints);


        var lengthPerWaypoint = length / numberOfWaypoints
        
        var result:Vector[] = []

        var lowwaypoint:Vector = waypoints[0]
        var highwaypoint:Vector = waypoints[1]
        var lowwaypointdist:number
        var highwaypointdist:number

        for(var i = 0; i <= numberOfWaypoints; i++){
            var distanceTraveled = i * lengthPerWaypoint;    

            

            var ratio = to(lowwaypointdist,distanceTraveled) / to(lowwaypointdist, highwaypointdist)
            result.push(lowwaypoint.lerp(highwaypoint,ratio))
        }

        return result
    }

    static rootfind(x:number,points:Vector[]):number{

    }

    static calcLength(waypoints:Vector[]){
        var length = 0;
        for(var i = 1; i < waypoints.length; i++){
            length += waypoints[i].to(waypoints[i - 1]).length()
        }
        return length;
    }

    static tween(t:number, waypoints:Vector[]){
        var lm1 = waypoints.length - 1;
        var low = Math.floor(lm1 * t)
        var high = Math.ceil(lm1 * t)
        return waypoints[low].lerp(waypoints[high],t*lm1 - Math.floor(t*lm1))
    }
}