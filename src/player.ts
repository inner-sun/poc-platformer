import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { GameObject } from './game-object'
import { Engine } from './engine'

export class Player extends GameObject{
  controllerInput = new Vector3

  constructor(){
    super()

    // Test Mesh for the player model
    const mesh = new Mesh(new BoxGeometry, new MeshBasicMaterial({ color: 0x00E436, wireframe: true }))
    
    // Axis helper
    const axesHelper = new AxesHelper(2);
    
    this.group.add(mesh)
    // this.group.add(axesHelper)
    this.group.position.set(3, 0.51, 0)
  }

  tick(engine: Engine){
    const speed = 0.2
    const movement = this.controllerInput.clone().multiplyScalar(speed)
    const newPosition = engine.collisions.getValidPosition(movement, this)
    this.group.position.copy(newPosition)
  }
}