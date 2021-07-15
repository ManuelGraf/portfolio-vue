import * as THREE from 'three'

const VectorStore = class{
  constructor(){
    this.vectors = {};
  }
  vector() {
    if (this.vectors.hasOwnProperty(name)) {
      return this.vectors[name]
    } else {
      let vec = new THREE.Vector3;
      this.vectors[name] = vec;
      return vec;
    }
  }
}
const instance = new VectorStore();

export default {
  vector: instance.vector
}
