import { AmbientLight, PerspectiveCamera, PointLight, Scene, Vector3, WebGLRenderer } from 'three'
import { Player } from './player'
import { Controls } from './controls'
import { Floor } from './floor'
import { Platform } from './platform'

export class Engine{
  scene = new Scene
  camera = new PerspectiveCamera(75)
  renderer = new WebGLRenderer
  player = new Player

  constructor(){
    // Set Controls
    new Controls(this.player)

    // Add Scene elements
    const floor = new Floor
    this.scene.add(floor.group)
    const platform1 = new Platform({
      width: 4,
      height: 1,
      depth: 4,
      position: new Vector3(0, 0, 0)
    })
    this.scene.add(platform1.group)
    const platform2 = new Platform({
      width: 4,
      height: 1,
      depth: 4,
      position: new Vector3(-4, 2, 0)
    })
    this.scene.add(platform2.group)
    // Player
    this.scene.add(this.player.group)

    // Add Lighting
    const ambientLight  = new AmbientLight(0xffffff)
    ambientLight.position.set(0, 10, 0)
    this.scene.add(ambientLight)
    const pointLight = new PointLight(0xffffff, 100)
    pointLight.position.set(0, 10, 0)
    this.scene.add(pointLight)

    // Set Camera
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
    this.player.tick(this)

    const cameraPositionBehindPlayer = this.player.group.position.clone().add(new Vector3(0, 5, -10))
    this.camera.position.copy(cameraPositionBehindPlayer)
    const cameraLookAtPosition = this.player.group.position.clone().add(new Vector3(0, 0, 10))
    this.camera.lookAt(cameraLookAtPosition)

    this.renderer.render(this.scene, this.camera)
  }
}