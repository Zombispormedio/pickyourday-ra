angular.module('ar-toolkit')
    .factory('AR3D', function() {


    var Reality=function(sourceCanvas){

        var camera= new THREE.Camera();
        var scene= new THREE.Scene();

        var geometry= new THREE.PlaneGeometry(2,2,0);
        var texture=new THREE.Texture(sourceCanvas);
        texture.generateMipmaps = false;
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT =THREE.ClampToEdgeWrapping;




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

    var Scene = function() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        

        function add(object) {

            scene.add(object);


        }

        function remove(object) {
            scene.remove(object);
        }

     
        return {
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



        /*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        virtual.add( cube );

        cube.position.z=-5;*/




        function render(){
            renderer.render(reality.scene, reality.camera);


           /* cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;*/


            renderer.render(virtual.scene, virtual.camera);

        }

        function update(){
             reality.update();
        }

        function add(object){
              virtual.add(object);
        }

      

        function remove(object){
             virtual.remove(object);
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