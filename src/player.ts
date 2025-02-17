import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { GameObject } from './game-object'
import { Engine } from './engine'
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d-compat'

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
    this.group.position.set(3, 0.5, 0)

    this.rigidBodyDesc = RigidBodyDesc.dynamic()
    this.rigidBodyDesc.setTranslation(this.group.position.x, this.group.position.y, this.group.position.z)
    this.colliderDesc = ColliderDesc.cuboid(0.5, 0.5, 0.5)
  }

  tick(engine: Engine){
    const speed = 0.2
    const movement = this.controllerInput.clone().multiplyScalar(speed)
    const newPosition = engine.physics.getValidPosition(movement, this)
    this.group.position.copy(newPosition)
    if (this.rigidBody) this.rigidBody.setTranslation(newPosition, true)
  }
}