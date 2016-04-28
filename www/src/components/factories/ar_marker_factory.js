angular.module('artoolkit')
    .factory('ARMarker', function(ARObject) {

    var objects={
        16: ARObject.createBasicCube({color:0xCC0000}),
        32: ARObject.createBasicCube({color:0x00CC00}),
        64: ARObject.createBasicCube({color:0x0000CC})
    }


    var onCreate=function(view, marker){

        console.log("Created")
        console.log(marker.id)
        
        var object=objects[marker.id];
        
        object.rotation.x += 0.1;
        object.rotation.y += 0.1;
        
        view.add(object);
    }

    var onUpdate=function(view, marker){

        console.log("update")
        console.log(marker.id)

        var object=objects[marker.id];

        object.rotation.x += 0.1;
        object.rotation.y += 0.1;

    }

    var onDestroy=function(view, marker){

        console.log("remove")
        console.log(marker.id)

        var object=objects[marker.id];
        view.remove(object);

    }

    var Primitive=function(view, cb){
        return function(marker){
            cb(view, marker);
        }
    }

    return {
        Primitive:Primitive,
        onCreate:onCreate,
        onUpdate:onUpdate,
        onDestroy:onDestroy
    }
});