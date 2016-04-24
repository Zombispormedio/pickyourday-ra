angular.module('ar-toolkit')
    .factory('ARMarker', function(ARObject) {

    var objects={
        16: ARObject.create({color:0xCC0000}),
        32: ARObject.create({color:0x00CC00}),
        64: ARObject.create({color:0x0000CC})
    }


    var onCreate=function(view){
        return function(marker){
            console.log("Created")
            console.log(marker.id)
         
            var object=objects[marker.id];
            //object.transform(marker.matrix);
            console.log(object)
            var model=object.model;
           model.rotation.x += 0.1;
            model.rotation.y += 0.1;
            view.add(object);
        }


    }

    var onUpdate=function(view){
        return function(marker){
              console.log("update")
            console.log(marker.id)
            
            var object=objects[marker.id];
            //object.transform(marker.matrix);
             var model=object.model;
           model.rotation.x += 0.1;
            model.rotation.y += 0.1;
        }
    }

    var onDestroy=function(view){
        return function(marker){
              console.log("remove")
            console.log(marker.id)
         
            var object=objects[marker.id];
            view.remove(object);
        }
    }
    return {
        onCreate:onCreate,
        onUpdate:onUpdate,
        onDestroy:onDestroy
    }
});