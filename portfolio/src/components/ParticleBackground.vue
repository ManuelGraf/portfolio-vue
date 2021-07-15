<template>
  <div class="particle-background">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */
import * as THREE from "three";

export default {
    onBeforeCreate() {
    this.radius = 40;
    this.tube = 28.2;
    this.radialSegments = 0;
    this.tubularSegments = 5;
    this.p = 5;
    this.q = 4;
    this.heightScale = 4;
    this.asParticles = true;
    this.rotate = true;
    this.colors = [
      THREE.Color(0xcc165e),
      THREE.Color(0xfcc00e),
      THREE.Color(0x026064)
    ];

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    // add the output of the renderer to the html element
    this.$el.append(webGLRenderer.domElement);

    // call the render function
    var step = 0;

    var knot;

    // setup the control gui
    this.radius = 40;
    this.tube = 28.2;
    this.radialSegments = 600;
    this.tubularSegments = 12;
    this.p = 5;
    this.q = 4;
    this.heightScale = 4;
    this.asParticles = true;
    this.rotate = true;
    render();

    function createParticleSystem(geom) {
      var material = new THREE.ParticleBasicMaterial({
        color: 0xffffff,
        size: 3,
        transparent: true,
        blending: THREE.AdditiveBlending
      });

      var system = new THREE.ParticleSystem(geom, material);
      system.sortParticles = true;
      return system;
    }

    function createMesh(geom) {
      // assign two materials
      var meshMaterial = new THREE.MeshNormalMaterial({});
      meshMaterial.side = THREE.DoubleSide;

      // create a multimaterial
      var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [
        meshMaterial
      ]);

      return mesh;
    }

    function render(timepassed) {
      if (controls.rotate) {
        knot.rotation.y = step += 0.001;
        this.radius = this.radius += 0.00001;
      }
      let colorIndex = Math.floor((timepassed / 5000) % 4);
      knot.material.color = this.colors[colorIndex];

      // render using requestAnimationFrame
      requestAnimationFrame(render);
      webGLRenderer.render(scene, camera);
    }
  }
};
</script>

<style scoped>
</style>