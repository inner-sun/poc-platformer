import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { GameObject } from './game-object'

export class Player extends GameObject{
  controllerInput = new Vector3

  constructor(){
    super()

    // Test Mesh for the player model
    const mesh = new Mesh(new BoxGeometry, new MeshBasicMaterial({ color: 0xFF0000 }))
    mesh.position.setY(0.5)

    // Axis helper
    const axesHelper = new AxesHelper(2);

    this.group.add(mesh)
    this.group.add(axesHelper)
  }

  tick(engine){
    const speed = 0.2
    const movement = this.controllerInput.clone().multiplyScalar(speed)
    this.group.position.add(movement)
  }
}