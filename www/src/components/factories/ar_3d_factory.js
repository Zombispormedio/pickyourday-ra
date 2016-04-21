angular.module('ar-toolkit')
    .factory('AR3D', function() {


    var Reality=function(sourceCanvas){

        var camera= new THREE.Camera();
        var scene= new THREE.Scene();

        var geometry= new THREE.PlaneGeometry(2,2,0);
        var texture=new THREE.Texture(sourceCanvas);
        texture.minFilter = THREE.LinearFilter;
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
            scene:scene,
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
        light.position.set(0,0,9000);
        light.lookAt(new THREE.Vector3(0,0,0));
        virtual.scene.add(light);

        function render(){
            renderer.render(reality.scene, reality.camera);
            renderer.render(virtual.scene, virtual.camera);
        }

        function update(){
            reality.update();
        }

        function add(object){
            virtual.add(object.model);
        }

        function remove(object){
            virtual.remove(object.model);
        }

        return {
            add: add,
            remove: remove,
            update: update,
            render: render,
            glCanvas: glCanvas
        };
    }

    return {
        create:create
    }

});