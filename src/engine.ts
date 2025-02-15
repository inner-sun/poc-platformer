import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { Player } from './player'

export class Engine{
  scene = new Scene
  camera = new PerspectiveCamera(75)
  renderer = new WebGLRenderer
  player = new Player

  constructor(){
    // Add Scene elements
    this.scene.add(this.player.group)
    this.camera.position.set(0, 5, 10)
    this.camera.lookAt(new Vector3)

    // Init Engine
    this.setRenderer()
    document.body.appendChild(this.renderer.domElement)
    this.renderer.setAnimationLoop(() => this.tick())
  }

  setRenderer(){
    this.renderer.setSize(window.innerWidth, window.innerHeight, false)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  tick(){
    this.renderer.render(this.scene, this.camera)
  }
}