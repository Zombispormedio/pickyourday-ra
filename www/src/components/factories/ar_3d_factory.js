angular.module('ar-toolkit')
    .factory('AR3D', function() {


    var Reality=function(sourceCanvas){

        var camera= new THREE.Camera();
        var scene= new THREE.Scene();

        var geometry= new THREE.PlaneGeometry(2,2,0);
        var texture=new THREE.Texture(sourceCanvas);
        var material= new THREE.MeshBasicMaterial({
            map:texture,
            depthTest:false,
            depthWrite:false
        });

        var mesh= new THREE.Mesh(geometry, material);
        scene.add(mesh);

        function update(){
            texture.needsUpdate=true;
        }

        return {
            camera: camera,
            scene: scene,
            update: update, 
        };
    }

    var Scene=function(){
        var scene=new THREE.Scene();
        var camera=new THREE.Camera();

        function add(object){
            scene.add(object);
        }

        function remove(object){
            scene.remove(object);
        }

        return{
            scen:scene,
            camera:camera,
            add:add,
            remove:remove
        }

    }



    var create=function(glCanvas, dimensions, sourceCanvas){

        var renderer=new THREE.WebGLRenderer({canvas:glCanvas});
        renderer.setSize(dimensions.width, dimensions.height);
        renderer.autoClear=false;

        var reality= new Reality(sourceCanvas);
        var virtual= new Scene();
        
        var light=new THREE.SpotLight(0xffffff);

        return {};
    }

    return {
        create:create
    }

});