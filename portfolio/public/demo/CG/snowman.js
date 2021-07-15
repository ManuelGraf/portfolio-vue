	
  document.addEventListener("DOMContentLoaded", function() {
    // code...
    var container;

    var camera, controls, scene, renderer;
    var head, eyeL, eyeR,nose,chest,lower,besen, boden;
    var directionalLight, spotLight, pointLight,ambientLight;
    
    var particle,
        particles,
        particleCount,
        particleSystem;
        
    var actFrame = 0;
    var eyeScale =1.3;

    var cross;
    // FALLBACK FÜR MICROSOFT, WAS SONST
    window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();
        
    init();
    animate();
    

	function init(){
		/*Eine Szene erzeugen*/
		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0x111133, 0.002 );

		/*Eine Kamera erzeugen und platzieren*/
		camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 30;
        camera.position.y = 1;
        camera.position.x = 10;
        
        scene.add(camera);
		
        // TRACKBALL CONTROLS
        controls = new THREE.TrackballControls( camera );

				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;

				controls.noZoom = false;
				controls.noPan = false;

				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;

				controls.keys = [ 65, 83, 68 ];

				controls.addEventListener( 'change', render );
		
		//PARTICLES
		
		particleCount = 2500;
        particles = new THREE.Geometry();
        var pMaterial = new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            size: 7,
            // map: texture = THREE.ImageUtils.loadTexture('ParticleSmoke.png', {}, function() {
            //     renderer.render(scene);
            // })
            // ,
                blending: THREE.AdditiveBlending,
                transparent: true
              });
        // now create the individual particles
        for(var p = 0; p < particleCount; p++) {

          // create a particle with random
          // position values, -250 -> 250
          var pX = Math.random() * 1000 - 500,
              pY = Math.random() * 1000 - 500,
              pZ = Math.random() * 1000 - 500,
              particle =  new THREE.Vector3(pX, pY, pZ);
              particle.velocity = new THREE.Vector3(
                0,              // x
                -Math.random(), // y: random vel
                0);             // z
              
              

          // add it to the geometry
          particles.vertices.push(particle);
        }

        // create the particle system
        particleSystem = new THREE.ParticleSystem(particles,pMaterial);

        // add it to the scene
        scene.add(particleSystem);
		
        // var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
        // 
        //                      for (var i = 0; i < 500; i++) {
        // 
        //                          particle = new Particle3D( material);
        //                          particle.position.x = Math.random() * 1000 - 500;
        //                          particle.position.y = Math.random() * 1000 - 500;
        //                          particle.position.z = Math.random() * 1000 - 500;
        //                          particle.scale.x = particle.scale.y =  1;
        //                          scene.add( particle );
        // 
        //                          particles.push(particle); 
        //                      }
        
        // GEOMETRY
        //HEAD
        head = new THREE.Mesh(
            new THREE.SphereGeometry(1.5,10,10),
            new THREE.MeshLambertMaterial({color: 0xFFFFFF})
        );
        head.position.y = 6.5;
        head.castShadow = true;
        
        //LEFT EYE
        eyeL =new THREE.Mesh(
            new THREE.SphereGeometry(0.2,10,10),
            new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30 } )
        );
        eyeL.position.y = 7;
        eyeL.position.x = 0.5;
        eyeL.position.z = 1.3;
        eyeL.scale.y = eyeScale;
        
        //RIGHT EYE
        eyeR = new THREE.Mesh(
            new THREE.SphereGeometry(0.2,10,10),
            new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30 } )
        );
        eyeR.position.y = 7;
        eyeR.position.x = -0.5;
        eyeR.position.z = 1.3;
        eyeR.scale.y = eyeScale;
        
        //NOSE
         nose = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3,0,2,10),
            new THREE.MeshPhongMaterial( { ambient: 0xFFAA00, color: 0xFFAA00, specular: 0xFFAA00, shininess: 30 } )
            )
            nose.position.y = 6.2;
            nose.position.x = 0;
            nose.position.z = 2.5;
            nose.rotation.x = -89.5;
            nose.castShadow = true;
            
        //CHEST 
         chest   = new THREE.Mesh(
            new THREE.SphereGeometry(2.25,10,10),
            new THREE.MeshLambertMaterial({color: 0xFFFFFF})
        );
        chest.position.y = 4;
        chest.castShadow = true;
        
        //LOWER BODY SPHERE
         lower   = new THREE.Mesh(
            new THREE.SphereGeometry(3,10,10),
            new THREE.MeshLambertMaterial({color: 0xFFFFFF})
        );
        lower.position.y = 0;
        lower.castShadow = true;
        
        //BESEN
         besen = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1,0.1,8,10),
            new THREE.MeshPhongMaterial( { ambient: 0xCC5500, color: 0xCC5500, specular: 0xCC5500, shininess: 10 } )
            );
            
            besen.position.z = 1;
            besen.position.x = -2;
            besen.position.y = 2.5;
            besen.rotation.x = -0.5;
            
        //BODEN    
		 boden = new THREE.Mesh(
		    new THREE.PlaneGeometry(500,500,50,50),
            new THREE.MeshPhongMaterial( { ambient: 0xFFFFFF, color: 0xFFFFFF, specular: 0xDDDDFF, shininess: 30 } )
		);
		boden.receiveShadow = true;
		boden.castShadow = true;
		boden.position.y = -1.5;
		
		/*Eine Lichtquelle*/
		 directionalLight = new THREE.DirectionalLight (0xffffff, .6);
         // directionalLight.position.z = 02;
		
		//SPOTLIGHT
         spotLight = new THREE.SpotLight( 0xffffff, .5 );
                 spotLight.position.set( 10, 10, 50 );
         
                 spotLight.castShadow = true;
         
                 spotLight.shadowMapWidth = 1024;
                 spotLight.shadowMapHeight = 1024;
         
                 spotLight.shadowCameraNear = 0;
                 spotLight.shadowCameraFar = 1000;
                 spotLight.shadowCameraFov = 60;
         
                 scene.add( spotLight );
        
		// create a point light
         pointLight =
          new THREE.PointLight(0xFFFFFF);

        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;
		pointLight.position.set(0,0,1);
		pointLight.castShadow = true;
		pointLight.shadowDarkness= 0.5;
		pointLight.shadowCameraVisible = true;

        scene.add(pointLight);
        
        light = new THREE.AmbientLight( 0x444477 );
        				scene.add( light );
        
		
		/*Der Szene den Würfel, das Licht und die Kamera hinzufügen*/
        scene.add(directionalLight);
                scene.add(head);
                scene.add(chest);
                scene.add(lower);
                scene.add(eyeR);
                scene.add(eyeL);
                scene.add(nose);
                scene.add(boden);
                scene.add(besen);

		/*rendern*/
		
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize(window.innerWidth,window.innerHeight);
		renderer.setClearColor(scene.fog.color, 1);
        // renderer.shadowMapEnabled = true;
        // renderer.shadowMapSoft = true;

        container = document.querySelectorAll( '#container' )[0];
        var enterVR = new webvrui.EnterVRButton(renderer.domElement);
        document.body.appendChild(enterVR.domElement);   
        container.appendChild( renderer.domElement )

		renderer.clear();
		requestAnimationFrame(animate);	
		
	}
	
	function animate() {
	    // create a velocity vector
          actFrame++;
          eyeL.scale.y = eyeScale - Math.max(Math.sin(actFrame/60),0)*eyeScale;
          eyeR.scale.y = eyeScale - Math.max(Math.sin(actFrame/60),0)*eyeScale;
          // add some rotation to the system
          // particleSystem.rotation.y += 0.01;
          particleSystem.rotation.y += 0.001;
          var pCount = particleCount;
          while(pCount--) {

            // get the particle
            var particle =
              particles.vertices[pCount];

            // check if we need to reset
            if(particle.y < -200) {
              particle.y = Math.random() * 300 + 200;
              particle.velocity.y = 0;
            }

            // update the velocity with
            // a splat of randomniz
            particle.velocity.y -=
              Math.random() * .001;
              
            // and the position
            // particle.y += particle.velocity.y;
            particle.addSelf(
              particle.velocity);
          }

          // flag to the particle system
          // that we've changed its vertices.
          particleSystem.geometry.__dirtyVertices = true;
          particles.verticesNeedUpdate = true;
			renderer.render( scene, camera );

			requestAnimationFrame( animate );
			controls.update();
			

		}

		function render() {
            
			renderer.render( scene, camera );

		}
  });