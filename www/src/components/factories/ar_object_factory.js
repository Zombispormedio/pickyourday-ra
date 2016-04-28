angular.module('artoolkit')
  .factory('ARObject', function() {

    return {

      createBasicCube: function(color) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
          color: color
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.z = -5;
        return cube;
      },

      createPhongCube: function() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshPhongMaterial({
          color: 0x7FCC19,
          shininess: 230
        });
        var cube = new THREE.Mesh(geometry, material);
        return cube;
      },

      createGradientPlane: function() {
        var canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 128;

        var context = canvas.getContext("2d");

        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

        gradient.addColorStop(0.1, 'rgba(210,210,210,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,1)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);


        var shadowTexture = new THREE.Texture(canvas);
        shadowTexture.needsUpdate = true;

        var shadowMaterial = new THREE.MeshBasicMaterial({
          map: shadowTexture
        });
        var shadowGeo = new THREE.PlaneBufferGeometry(300, 300, 1, 1);

        var mesh = new THREE.Mesh(shadowGeo, shadowMaterial);

        return mesh;

      },

      createIcosahedron: function() {
        var radius=1;
        var color, f, p, vertexIndex, faceIndices = ['a', 'b', 'c'];
        var geometry = new THREE.IcosahedronGeometry(radius, 1);

        for (var i = 0; i < geometry.faces.length; i++) {
          f = geometry.faces[i];
          for (var j = 0; j < 3; j++) {
            vertexIndex = f[faceIndices[j]];
            p = geometry.vertices[vertexIndex];
            color = new THREE.Color(0xffffff);
            color.setHSL((p.y / radius + 1) / 2, 1.0, 0.5);
            f.vertexColors[j] = color;
          }
        }

        var materials = [

          new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors,
            shininess: 0
          }),
          new THREE.MeshBasicMaterial({
            color: 0x000000,
            shading: THREE.FlatShading,
            wireframe: true,
            transparent: true
          })

        ];
      return THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
      }









    }
  });
