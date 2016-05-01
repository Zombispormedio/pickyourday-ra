angular.module('artoolkit')
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
        /*var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        	camera.position.z = 5;*/
        
       var  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, -50, 500 );
          
      
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

        var renderer=new THREE.WebGLRenderer({canvas:glCanvas, antialias: true });
        renderer.setSize(dimensions.width, dimensions.height);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.autoClear=false;

        var reality= new Reality(sourceCanvas);
        var virtual= new Scene();

       
        var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light.position.set( -5, -5, 10000 ).normalize();
        virtual.scene.add(light);



        function render(){
            renderer.clear();
            renderer.render(reality.scene, reality.camera);

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
            glCanvas: glCanvas,
            virtual:virtual.scene,
            camera:virtual.camera
        };
    }

    return {
        create:create
    }

});