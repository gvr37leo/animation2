class Bezier{


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

    static computeWaypoints(numberOfWaypoints:number,p0:Vector,p1:Vector,p2:Vector,p3:Vector){
        var detail = 1 / numberOfWaypoints;
        var waypoints:Vector[] = [];
        for(var t = 0; t < 1; t += detail){
            waypoints.push(Bezier.getBezierPoint(t, p0,p1,p2,p3))
        }
        waypoints.push(p3.c())
        return waypoints;
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

    static constantDistanceWaypoints(waypoints:Vector[],numberOfWaypoints:number){
        var length = this.calcLength(waypoints);
        var lengthPerWaypoint = length / numberOfWaypoints
        var result:Vector[] = [waypoints[0].c()]
        
        var budget = 0
        for(var i = 1; i < waypoints.length; i++){
            var a = waypoints[i - 1]
            var b = waypoints[i]
            var dist2waypoint = a.to(b).length()
            var startbudget = budget
            budget += dist2waypoint
            
            while(budget > lengthPerWaypoint){
                startbudget
                var dist2newwaypoint = lengthPerWaypoint - startbudget
                dist2waypoint
                var ratio = 0
                budget -= lengthPerWaypoint
                result.push(a.lerp(b,ratio))
            }
        }
        result.push(last(waypoints).c())
        return result
    }


    //points need to be guaranteed left to tight
    static cacheSlopeX(points:Vector[],samplePoints:number):Vector[]{
        var result = []
        for(var i = 0; i <= samplePoints; i++){
            result.push(new Vector(lerp(first(points).x, last(points).x, i / samplePoints), 0))
        }
        var sectionIndex = 0
        for(var point of result){
            var a = points[sectionIndex]
            var b = points[sectionIndex + 1]
            while(!inRange(a.x,b.x,point.x)){
                sectionIndex++
                a = points[sectionIndex]
                b = points[sectionIndex + 1]
            }
            point.y = map(point.x,a.x,b.x,a.y,b.y)
        }
        return result
    }
}