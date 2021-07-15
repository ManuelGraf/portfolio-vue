import * as THREE from 'three';
import vector from '@/modules/VectorStore.js'
import OrbitControls from 'three-orbitcontrols'
import TWEEN from '@tweenjs/tween.js'

'use strict';


/**
 * The Controller for the Globe Component
 */
const GlobeComponentController = class {
  constructor() {

  }
  /**
   * this..ready.then(globeCtrl => ... ).catch()
   * As Faplis Data is available sooner than THREE js scene, we need this
   */
  get ready(){
    var self = this;
    var start = Date.now();
    var timeout = 30000;
    return new Promise(waitFor);
    function waitFor(resolve, reject) {
        if (self.initialized)
            resolve(self);
        else if (timeout && (Date.now() - start) >= timeout)
            reject(new Error('Globe Component ready timeout'));
        else
            self.$timeout(waitFor.bind(this, resolve, reject), 100);
    }
    
  }

  $onChanges(changes){
    // As Faplis Data is available sooner than THREE js scene, we need this ready promise 
    this.ready.then(()=>{
      // MARKER DATA
      let markers = changes['markerData'];
      if(markers && markers.currentValue){
        this.onMarkersChanged(markers.currentValue, markers.previousValue);
        this.ready.then(()=>{
          this.MainViewService.isReadyGlobe = true;    
        })
      }
      // SEARCH RESULTS    
      let matches = changes['highlightedPlants']
      if(matches && matches.currentValue){
        this.onHighlightedPlantsChanged(matches.currentValue, matches.previousValue);
      }
      // VISIBILITY
      let isVisible = changes['isVisible'];
      if(isVisible && isVisible.currentValue !== undefined){
        if(isVisible.currentValue){
          if(!isVisible.previousValue){
            //console.log('showing globe');
            this.show();
          }
        }else{
          //console.log('hiding globe');
          this.hide();
        }
      }

    })
  }

  $onInit(){
    this.parent = this.$element[0].parentElement;
    //console.log('globeCtrl::$onInit() creating globe scene in', this.parent);

  }
  /**
   * do all listeners and watch events here
   */
  watchAndListen(){
    this.renderer.domElement.addEventListener('mousedown',this.onMarkerDeselect.bind(this));
    this.renderer.domElement.addEventListener('tap',this.onMarkerDeselect.bind(this));
    this.renderer.domElement.addEventListener('touchstart',this.onMarkerDeselect.bind(this));

    // On window resize, adjust camera aspect ratio and renderer size
    window.addEventListener('resize', this.onResize.bind(this));
  }

  /**
   * initialize the component. Also Init THREE.js stuff and place the canvas.
   */
  init() {
    console.log('init globeComponent')
    this.activeMarker = -1;
    this.isVisible= true;
    this.isCameraRotating = false;
    this.isCameraZooming = false;
    this.orbitControlsStopped = false;
    this.cameraSpherical = new THREE.Spherical();
    this.cameraTweenGroup = new TWEEN.Group();

    const self = this;
    // Scene, Camera, Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 150000000000);
    this.camera.isPerspectiveCamera = true; // r90 orbit controls are checking this...
    this.camera.position.set(0, 0, -3);
    
    this.selectedPlant = '';
    
    /**max distance for different states */
    this.zoomLevels = {
      ZOOM_TOTAL: {
        distance: 2
      },
      ZOOM_LOCATION: {
        distance: 1.3
      },
      ZOOM_TRANSITION: {
        distance: 0.61
      }
    }

    this.textureForDevice;
    this.textures = {
      '1k':{
        globe: {
          map: './images/textures/globe/1k/worldmap-1k.jpg',
          bumpMap: './images/textures/globe/1k/bumpmap-1k.png',
          specularMap: './images/textures/globe/1k/specularmap-1k.jpg'
        },
        clouds:{ alphaMap: './images/textures/globe/1k/clouds-1k.jpg'},
        stars:{ map: './images/textures/globe/1k/starfield-1k.png'}
      },
      '2k':{
        globe: {
          map: './images/textures/globe/2k/worldmap-2k.jpg',
          bumpMap: './images/textures/globe/2k/bumpmap-2k.png',
          specularMap: './images/textures/globe/2k/specularmap-2k.jpg'
        },
        clouds:{ alphaMap: './images/textures/globe/2k/clouds-2k.jpg'},
        stars:{ map: './images/textures/globe/2k/starfield-2k.png'}
      },
      '4k':{
        globe: {
          map: './images/textures/globe/4k/worldmap-4k.jpg',
          bumpMap: './images/textures/globe/4k/bumpmap-4k.png',
          specularMap: './images/textures/globe/4k/specularmap-4k.jpg'
        },
        clouds:{ alphaMap: './images/textures/globe/4k/clouds-4k.jpg'},
        stars:{ map: './images/textures/globe/4k/starfield-4k.png'}
      }
    }

    if(this.$rootScope.breakpoint){
      switch(this.$rootScope.breakpoint){
        case 'viewport-mobile':
          this.textureForDevice = this.textures['1k'];
          break;
        case 'viewport-tablet':
          this.textureForDevice = this.textures['4k'];
          break;
      }
    }else{
      this.textureForDevice = this.textures['4k'];
    }

    
    // place it
    if (!this.parent) this.parent = document.body;
    
    // first assume it is fullscreen, so that the parent div gets bigger;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    let aspect = this.width / this.height;
    let cameraRotation = 0;
    let cameraRotationSpeed = 0;
    let cameraAutoRotation = false;
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbitControls = new BP.CameraControls(this.camera,this.parent);
    
    // limit orbit controls
    this.orbitControls.minPolarAngle = Math.PI / 2 - Math.PI / 4;
    this.orbitControls.maxPolarAngle = Math.PI / 2 + Math.PI / 4;
    this.orbitControls.maxDistance = this.zoomLevels.ZOOM_TOTAL.distance;
    this.orbitControls.minDistance = this.zoomLevels.ZOOM_LOCATION.distance;
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.1;
    this.orbitControls.rotateSpeed = 0.05;
    this.orbitControls.autoRotate = false;
    
    
    this.stopAnimation = false; // if set to true, loop will break;
    
    // Lights
    // let spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2);
    this.sun = new THREE.DirectionalLight(0xfffaee, 0.8);
    this.sunAngle = 0;
    
    // const ambiLight = new THREE.AmbientLight(0x08baff,0.01);
    // this.scene.add(ambiLight);
    
    const ambiLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambiLight);
    
    // Texture Loader
    let textureLoader = new THREE.TextureLoader();
    
    this.planetProto = {
      sphere: function (size) {
        let sphere = new THREE.SphereGeometry(size, 32, 32);
        
        return sphere;
      },
      material: function (options) {
        let material = new THREE.MeshPhongMaterial();
        if (options) {
          for (var property in options) {
            material[property] = options[property];
          }
        }
        
        return material;
      },
      glowMaterial: function (intensity, fade, color) {
        // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
        let glowMaterial = new THREE.ShaderMaterial({
          uniforms: {
            'c': {
              type: 'f',
              value: intensity
            },
            'p': {
              type: 'f',
              value: fade
            },
            glowColor: {
              type: 'c',
              value: new THREE.Color(color)
            },
            viewVector: {
              type: 'v3',
              value: self.camera.position
            }
          },
          vertexShader: `
          uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`
          ,
          fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() 
          {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
          }`
          ,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        });
        
        return glowMaterial;
      },
      texture: function (material, property, uri) {
        let textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = true;
        textureLoader.load(
          uri,
          function (texture) {
            material[property] = texture;
            material.needsUpdate = true;
          }
        );
      }
    };
    
    this.markerProto = {
      latLongToVector3: function latLongToVector3(latitude, longitude, radius, height) {
        var phi = (latitude) * Math.PI / 180;
        var theta = (longitude - 180) * Math.PI / 180;
        
        var x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
        var y = (radius + height) * Math.sin(phi);
        var z = (radius + height) * Math.cos(phi) * Math.sin(theta);
        
        return new THREE.Vector3(x, y, z);
      },
      marker: function marker(size, color, vector3Position) {
        let markerGeometry = new THREE.SphereGeometry(size);
        let markerMaterial = new THREE.MeshLambertMaterial({
          color: color
        });
        let markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
        markerMesh.position.copy(vector3Position);
        
        return markerMesh;
      }
    }
    
    
    // this.globe = new BP.Globe(this.camera, textureLoader);
    // Planet Proto
    this.globe = this.createPlanet({
      surface: {
        size: 0.5,
        material: {
          bumpScale: 0.01,
          specular: new THREE.Color('grey'),
          shininess: 10
        },
        textures: this.textureForDevice.globe
      },
      atmosphere: {
        size: 0.003,
        material: {
          opacity: 0.8
        },
        textures: this.textureForDevice.clouds,
        glow: {
          size: 0.05,
          intensity: 0.7,
          fade: 7,
          color: 0x93cfef
        }
      },
    });
    
    
    
    // Scene, Camera, Renderer Configuration
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    
    this.parent.appendChild(this.renderer.domElement);
    // document.body.appendChild(this.renderer.domElement);
    
    this.orbitControls.enabled = true;
    this.orbitControls.enableZoom = true;
    this.orbitControls.enablePan = false;
    // this.orbitControls.saveState()
    
    this.scene.add(this.camera);
    this.scene.add(this.sun);
    this.scene.add(this.globe);
    
    // Light Configurations
    this.sun.position.set(15000000000, 0, 0);
    this.sunQuat = new THREE.Quaternion;
    
    // Mesh Configurations
    this.globe.receiveShadow = false;
    this.globe.castShadow = false;
    this.globe.getObjectByName('surface').geometry.center();
    
    this.watchAndListen();
    
    let galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
    let galaxyMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide
    });
    let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
    
    // Load Galaxy Textures
    textureLoader.crossOrigin = true;
    textureLoader.load(
      this.textureForDevice.stars.map,
      (texture) => {
        galaxyMaterial.map = texture;
        this.scene.add(galaxy);
      }
    );
    
    this.updateSun();
    this.initialized=true;
  }
  
  /**
   * handler for the Event BP.Events.ROTATE_GLOBE. This is thrown by the faplis list on hover and the maincontroller on faplis search.
   * @param {*} event 
   * @param {*} args id: faplis id to rotate to OR ids[]: multiple faplis ids, only rotate if _only one_ is matching 
   */
  onRotateToFaplisId(event, args){
    console.log('GlobeComponentController::onRotateToFaplisId: event received', event, args)
    if(args){
      if(args.id){
        this.rotateToSubPlant(args.id, args.onAfterRotate);
      }
    }
  }

  /**
   * watcher method for the markerdata from FaplisService.
   * @param {*} now current faplis structure
   * @param {*} old 
   */
  onMarkersChanged(now, old){
    this.locations = now;
    this.clusteredLocations = [];
    // cluster them
    let clusteredLocations = this.$filter('faplisCluster')(this.locations);
    // filter copies, we want the real object back
    // console.log(clusteredLocations)
    for(const cluster of clusteredLocations){
      for (let i = 0; i < cluster.children.length; i++) {
        let location = cluster.children[i];
        cluster.children[i] = this.FaplisService.findNodeById(this.FaplisService.locations,location.id);
      }
    }
    this.clusteredLocations = clusteredLocations;
    // console.log('GlobeComponent:marker Data changed. Clustered: ', this.clusteredLocations);
    this.placeMarkers(this.clusteredLocations);
  }

 /**
   * watcher method for the search results from FaplisService.
   * @param {*} now array of matching faplis ids
   * @param {*} old array of matching faplis ids
   */
  onHighlightedPlantsChanged(now, old){
    if(!now.length){
      // console.log('no plaants matched, zooming out')
      this.deselectMarkers();
    } 
    let matchedClusters = [];
    this.markers.children.forEach((clusterObj)=>{
      clusterObj.userData.highlighted = false;
      clusterObj.userData.matchCount = 0;
      let highlighted = false; 
      if(clusterObj && clusterObj.userData.locations){
        for(const location of clusterObj.userData.locations){
          if(location.state){
            // increment count for cluster and highlight cluster if sth in hierarchy matches 
            let isHierarchyMatched = this.FaplisService.isAnyParentNodeMatched(location.id);
            clusterObj.userData.highlighted = clusterObj.userData.highlighted || isHierarchyMatched;
            if(isHierarchyMatched) clusterObj.userData.matchCount++
            // sum if it happened it any location for returning
            highlighted = highlighted || isHierarchyMatched
          }
        }
      }
      if(highlighted) matchedClusters.push(clusterObj)
    })
    
    // console.log('for highlighted plants %o I found the following clusters on globe: %o',now,matchedClusters);
    if(matchedClusters && matchedClusters.length === 1){
      // console.log('for ids %o there was only one cluster found: %o',now, matchedClusters)
      this.rotateToSubPlant(matchedClusters[0].userData.locations[0].id)
      this.activeMarker = matchedClusters[0].userData.id;
    }   

  }


  /**
   * creates the Planet 3D Object with clouds and atmosphere
   * @param {*} options surface {size, material, textures}, atmosphere: {size, material, textures} 
   */
  createPlanet(options) {
    // Create the planet's Surface
    let surfaceGeometry = this.planetProto.sphere(options.surface.size);
    let surfaceMaterial = this.planetProto.material(options.surface.material);
    let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

    // Create the planet's Atmosphere
    let atmosphereGeometry = this.planetProto.sphere(options.surface.size + options.atmosphere.size);
    let atmosphereMaterialDefaults = {
      side: THREE.DoubleSide,
      transparent: true
    }
    let atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
    let atmosphereMaterial = this.planetProto.material(atmosphereMaterialOptions);
    let atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

    // Create the planet's Atmospheric glow
    let atmosphericGlowGeometry = this.planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
    let atmosphericGlowMaterial = this.planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
    let atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);

    // Nest the planet's Surface and Atmosphere into a planet object
    let planet = new THREE.Object3D();
    surface.name = 'surface';
    atmosphere.name = 'atmosphere';
    atmosphericGlow.name = 'atmosphericGlow';
    planet.add(surface);
    planet.add(atmosphere);
    planet.add(atmosphericGlow);

    // Load the Surface's textures
    for (let textureProperty in options.surface.textures) {
      this.planetProto.texture(
        surfaceMaterial,
        textureProperty,
        options.surface.textures[textureProperty]
      );
    }

    // Load the Atmosphere's texture
    for (let textureProperty in options.atmosphere.textures) {
      this.planetProto.texture(
        atmosphereMaterial,
        textureProperty,
        options.atmosphere.textures[textureProperty]
      );
    }

    return planet;
  }

  /**
   * place a single marker
   * @param {*} object the parent object to add the marker to. Here it's the planet surface.
   * @param {*} options {longitude, latitude, radius, height}
   */
  placeMarker(object, options) {
    let position = this.markerProto.latLongToVector3(options.latitude, options.longitude, options.radius, options.height);
    // let marker = this.markerProto.marker(options.size, options.color, position);
    let marker = new THREE.Group;
    marker.position.copy(position);

    marker.userData = options.userData;
    marker.name = options.name;
    object.add(marker);
  }

  onPlantSelected(event,id){
    // console.log('selected plant', id);
    this.selectedPlant = id;
  }

  /**
   * Polls google maps for an address and places a marker at said address.
   * @param {*} earth 3D Object
   * @param {*} address the locations address
   * @param {*} color color of the marker
   */
  placeMarkerAtAddress(earth, address, color) {
    var self = this;
    let encodedLocation = address.replace(/\s/g, '+');
    let httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedLocation);
    httpRequest.send(null);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        let result = JSON.parse(httpRequest.responseText);

        if (result.results.length > 0) {
          let latitude = result.results[0].geometry.location.lat;
          let longitude = result.results[0].geometry.location.lng;

          self.placeMarker(earth.getObjectByName('surface'), {
            latitude: latitude,
            longitude: longitude,
            radius: 0.5,
            height: 0,
            size: 0.01,
            color: color,
          });
        }
      }
    }
  }

  /**
   * Projects a 3D Objects position to 2D and returns an ngStyle Object with absolute positioning
   * @param {*} object 
   * @returns {Object} {left, bottom} for use in ngStyle
   */
  getMarkerLabelScreenPos(object) {
    let v = vector('GlobeComponent:markerPos:point3D');
    v.copy(object.getWorldPosition())

    v.project(this.camera);

    // translate our vector so that percX=0 represents
    // the left edge, percX=1 is the right edge,
    // percY=0 is the top edge, and percY=1 is the bottom edge.
    var percX = (v.x + 1) / 2;
    var percY = (-v.y + 1) / 2;

    // scale these values to our viewport size
    var left = percX * this.width;
    var top = percY * this.height;
    return {
      'left': left + 'px',
      'bottom': (this.height-top - 18) + 'px' // 18px icon box offset
    }
  }

  /**
   * checks wwhether a certain Location is occluded by the globe. This is not a real raycast but just returns true if a position  is further away from the camera than the globes center.
   * @param {Object3D} location 
   */
  isLocationOccluded(location) {
    //proximyity
    if (location.position.distanceTo(this.camera.position) > new THREE.Vector3(0,0,0).distanceTo(this.camera.position)) {
      return true
    } else {
      return false
    }
  }

  /**
   * returns true if mobile breakpoint is set
   */
  isMobileView(){
    return this.$rootScope.breakpoint === 'viewport-mobile';
  }

  /**
   * Handler for a marker click. scrolls to clicked marker
   * @param {Event} event clickevent 
   * @param {Object3D} marker marker 3D Object
   */
  onMarkerClick(event,marker){
    // event.preventDefault();
    this.selectedPlant = '';
    var old = this.activeMarker;
    if(marker.userData && marker.userData.hasOwnProperty('id') && (old != marker.userData.id)) {
      this.activeMarker = marker.userData.id;
      // console.log('active marker changed from %o to %o', old, this.activeMarker);
      this.rotateToSubPlant(marker.userData.locations[0].id);
    } 
  }

  /**
   * @param {Array<Object>} markersArray an Array with each element requiring an attribute location with {x,y}
   */
  placeMarkers(markersArray) {
    const self = this;  
    // console.log('GlobeComponent::placeMarkers');
    this.onResize();
    if(this.scene){
      var markersGroup = this.scene.getObjectByName('markers');
      if(markersGroup) {
        this.scene.remove(markersGroup);
      }
      this.markers = new THREE.Group();
      this.markers.name = 'markers';
      self.globe.getObjectByName('surface').add(this.markers);
  
      
      // we assume the data to be flattened already as it is bound with flatten filter
      for(let cluster of markersArray) {
        if(typeof(cluster) === 'object'){ // IE11 angular.foreach also iterates over unique id, which is a number.
          self.placeMarker(this.markers, {
            longitude: cluster.location.x,
            latitude: cluster.location.y,
            height: 0,
            radius: 0.5,
            color: 0x08baff,
            size: 0.002,
            userData: {
              locations: cluster.children,
              id: cluster.id
            },
            name: cluster.label
          })
        }
      }
    }
  }

  /**
   * scrolls to a specified marker (cluster) on the globe, depending on its id
   * @param {String} id in Faplis json 
   * @param {function} callback a callback function to call after rotation 
   */
  rotateToSubPlant(id, callback) {
    let v = this.camera.position;
    let marker = this.getMarkerbyId(id);
    if (marker) {
      // console.log('scrolling to ', id);
      var pos = marker.getWorldPosition();
      var latlon = new THREE.Spherical;
      latlon.setFromVector3(pos);
      latlon.radius = this.zoomLevels.ZOOM_LOCATION.distance;
      this.activeMarker = marker.userData.id;
      this.rotateToLatLon({phi: latlon.phi, theta:latlon.theta}, 1000, callback);
      this.zoom(this.zoomLevels.ZOOM_LOCATION.distance, 1000);
    }else{
      console.warn('cluster containing %s not found', id);
    }
  }

  rotateToLatLon(latlon, time, cb){
    // console.log('scrolling to', spherical, time);

    if(!time) time = 300;
    if(this.isCameraRotating) this.cameraRotationTween.stop();
    this.cameraSpherical = new THREE.Spherical().setFromVector3(this.camera.position);
  
    this.isCameraRotating = true;
    this.cameraRotationTween = new TWEEN.Tween(this.cameraSpherical, this.cameraTweenGroup);
    this.cameraRotationTween.to(latlon, time)
    .onStart((obj) =>{
      // console.log('rotate start');
      this.isCameraRotating = true;
    })
    .onUpdate((obj) =>{
      this.cameraSpherical.phi = obj.phi;
      this.cameraSpherical.theta = obj.theta;
    })
    .onComplete((obj)=> {
      // console.log('rotate end');
      this.isCameraRotating = false;
      if(cb && typeof(cb) === 'function'){
        cb();
      }
    })
    .start()
  }

  zoom(distance, time, cb){

      if(!time) time = 300;
      if(this.isCameraZooming) this.zoomTween.stop();

      this.cameraSpherical = new THREE.Spherical().setFromVector3(this.camera.position);
      this.isCameraZooming = true;
      this.zoomTween = new TWEEN.Tween(this.cameraSpherical, this.cameraTweenGroup);
      this.zoomTween.to({radius: distance}, time)
        .onStart((obj) =>{
          this.isCameraZooming = true;
          if(distance < this.zoomLevels.ZOOM_LOCATION.distance || distance > this.zoomLevels.ZOOM_TOTAL.distance){
            // out of orbitcontrol bounds, we have to stop updating
            this.orbitControlsStopped = true;
            // console.log('stopping orbitcontrols')
          }
        })
        .onUpdate((obj) =>{
          this.cameraSpherical.radius = obj.radius;
        })  
        .onComplete((obj)=> {
          this.isCameraZooming = false;
          if(distance < this.zoomLevels.ZOOM_LOCATION.distance || distance > this.zoomLevels.ZOOM_TOTAL.distance){
            // again moving inside orbitcontrol bounds, we have to start updating
            console.log('zoom finsihed')
          }
          if(cb && typeof(cb) === 'function'){
            cb.call(this);
          }
        })
        .start()  

  }

/**
 * obtains a specific 3D Marker by specific subplant ID. 
 * @param {String|Int} id faplis id
 * @returns {Object3D} marker (cluster)
 */
  getMarkerbyId(id) {
    let ret = null;
    this.markers.children.forEach(cluster => {
      if(cluster.userData && cluster.userData.locations){
        cluster.userData.locations.forEach(node => {
          if (node.id == id) {
            ret = cluster;
          }
        })
      }
    })
    return ret;
  }

  /**
   * Hides all 3D Markers
   */
  hideMarkers() {
    this.scene.getObjectByName('markers').visible = false;
    window.querySelectorAll('.globe-labels').style.opacity = 0;
  }

  /**
   * shows all 3D Markers
   */
  showMarkers() {
    this.scene.getObjectByName('markers').visible = true;
    window.querySelectorAll('.globe-labels').style.opacity = 0;
  }

  /**
   * Hides the globe scene and stops animations.
   */
  hide() {
    this.MainViewService.hideGlobe();
    this.zoom(this.zoomLevels.ZOOM_TRANSITION.distance, 1000, () =>{
      // console.log('zoom to %s finished.. stopping animation', this.zoomLevels.ZOOM_TRANSITION.distance);
      this.stop();
    });
  }

  /**
   * Hides the globe scene and starts animations. 
   */
  show() {
    this.activeMarker = null;
    this.MainViewService.showGlobe();
    this.zoom(this.zoomLevels.ZOOM_TOTAL.distance, 1000, () =>{
      // console.log('zoom to %s finished.. starting animation', this.zoomLevels.ZOOM_TOTAL.distance);
    });
    if(!this.parent.clientWidth || !this.parent.clientWidth){
      // Due to hotlinking of panoramas, its possible that we dont know about the correct dimensions, so if never instantiated, resize on first show
      this.$timeout(this.onResize.bind(this), 100)
    }
    this.start();

  }

  /**
   * starts animations.
   */
  start() {
    this.stopAnimation = false;
    this.orbitControlsStopped = false;
    this.render();
    this.orbitControls.update();
  }

  /**
   * stops animations.
   */
  stop() {
    this.stopAnimation = true;
  }

  /**
   * Moves To IV at position in either Map or Pano mode.
   * 2.0: notifies mainController via TWB attribute activeView.
   * @param {Event} event 
   * @param {Object} id site model entity id 
   * @param {String} mapOrPano "map" | "panorama"
   */
  moveToIvLocation(event, id, mapOrPano ){
    this.MainViewService.setActiveView(mapOrPano)
    console.log('GlobeComponent::moveToSiteModelEntityId', id);
    this.NavvisService.IV.moveToSiteModelEntityId(id);
  }

  /**
   * resizes the scene according to viewport. THIS IS BUGGY ON iOS 10 and iOS11, as there will still be old values^. hotfix: https://hackernoon.com/onresize-event-broken-in-mobile-safari-d8469027bf4d
   */
  onResize(event) {
    this.safeApply(()=>{
      // const width = window.getComputedStyle(this.parent).width.match(/\d+/);
      // const height = window.getComputedStyle(this.parent).height.match(/\d+/);
      // this.height = height ? height[0] : window.innerHeight;
      // this.width = width ? width[0] : window.innerWidth;
      this.width = this.parent.clientWidth;
      this.height = this.parent.clientHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderer.render(this.scene, this.camera);
      console.log('scene resized to ', this.width, this.height);
    })
  }
  /**
   * triggered when user deselects a marker (tap, mousedown, touchstart) on globe canvas
   * @param {Event} event 
   */
  onMarkerDeselect(event){
    if(event.target === this.renderer.domElement){
      if([undefined,null,-1].indexOf(this.activeMarker) === -1){
        // console.log('deselected markers');
        this.deselectMarkers()
      }
    }
  }

  /**
   * deselects Marker and zooms back to total
   */
  deselectMarkers(){
    this.activeMarker = null;
    this.zoom(this.zoomLevels.ZOOM_TOTAL.distance,500, function(){
    })
  }

  /**returns the highlighted state of a single cluster marker 3D object. this is set after searching for the first time. */
  isMarkerHighlighted(clusterObj){

  }
  
  isSubplantHighlighted(location){
    return !(this.highlightedPlants && this.highlightedPlants.length ) || this.FaplisService.isAnyParentNodeMatched(location.id);
  }

  /**
   * updates the suns position depending on how many seconds already passed today.
   */
  updateSun(){
    // sun animation
    var time = new Date;
    var millisToday = time.getTime() % 86400000;
    var speed = 1;
    // millisToday = 1;
    var percentOfDayPassed = speed * millisToday / 86400000;
    this.sunAngle = (percentOfDayPassed * -Math.PI * 2) - Math.PI; // calculate  how far the sun already progressed that day and offsets with Math.PI
    let sunPos = this.spher2Cart(0, THREE.Math.radToDeg(this.sunAngle), 150); // substract 180 so it goes from -PI to +PI
    this.sun.position.copy(sunPos);
  }

  /**
   * render cycle. draws and animates the globe.
   * @param {double} timePassed the time passed since start. 
   */
  render(timePassed) {
    this.deltaTime = timePassed - this.timepassedLast;
    // earth.getObjectByName('surface').rotation.y += 1 / 32 * 0.01;
    this.globe.getObjectByName('atmosphere').rotation.y += 1 / 16 * 0.003;
    this.updateSun()
    this.safeApply(() => {
      // this is sufficient that markers will be live
    });   
    // console.log('setting pos from %s - %s (%s, %s, %s)', this.cameraSpherical.phi, this.cameraSpherical.theta, this.camera.position.x,this.camera.position.y,this.camera.position.z)
    // console.log('adjusted pos %s, %s, %s ', this.camera.position.x,this.camera.position.y,this.camera.position.z)
    if(this.isCameraRotating || this.isCameraZooming){
      this.cameraTweenGroup.update();
      this.camera.position.setFromSpherical(this.cameraSpherical);
    }
    if(!this.orbitControlsStopped){
      this.orbitControls.update(this.deltaTime);
    }
    
    this.timepassedLast = timePassed;
    // stop rendering
    this.renderer.render(this.scene, this.camera);
    if (this.stopAnimation) {
      this.stopAnimation = false;
      return;
    }
    requestAnimationFrame(this.render.bind(this));
  };

  /**
   * transforms spherical to cartesian coordinates.
   * @param {*} lat 
   * @param {*} lon 
   * @param {*} radius 
   */
  spher2Cart(lat, lon, radius) {

    var phi = (lat) * Math.PI / 180;
    var theta = (lon - 180) * Math.PI / 180;

    var x = -(radius) * Math.cos(phi) * Math.cos(theta);
    var y = (radius) * Math.sin(phi);
    var z = (radius) * Math.cos(phi) * Math.sin(theta);

    return {
      x:x,
      y:y,
      z:z
    }
  }

  /**
   * make updates in sync with angular app
   * @param {*} fn a function to call so that angular gets it.
   */
  safeApply(fn) {
    window.setTimeout(fn,0);
  }
}

export default{
  GlobeComponentController
}