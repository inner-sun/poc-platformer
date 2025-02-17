import { GameObject } from './game-object'
import { Engine } from './engine'
import RAPIER, { KinematicCharacterController } from '@dimforge/rapier3d-compat'
import { Vector3 } from 'three'
import { Player } from './player'

interface PhysicsObject{
  rigidBody: RAPIER.RigidBody
  collider: RAPIER.Collider
}

export class Physics{
  gameObjects: GameObject[] = []
  physicsObjects: PhysicsObject[] = []
  world: RAPIER.World
  characterController: KinematicCharacterController

  constructor(engine: Engine){
    RAPIER.init().then(() => {
      this.world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 })
      this.characterController = this.world.createCharacterController(0.01)
      this.characterController.enableSnapToGround(0.01)
      this.createInstances()
    })
  }

  createInstances(){
    this.gameObjects.forEach(object => {
      if(object.rigidBodyDesc && object.colliderDesc){
        object.rigidBody = this.world.createRigidBody(object.rigidBodyDesc)
        object.collider = this.world.createCollider(object.colliderDesc, object.rigidBody)
      }
    })
  }

  getValidPosition(movement: Vector3, player: Player){
    let validPosition = player.group.position.clone()

    if(player.collider){
      this.characterController.computeColliderMovement(player.collider, movement)
      const validMovement = this.characterController.computedMovement()
      validPosition.add(validMovement)      
    }
    
    return validPosition
  }

  step(){
    if (this.world) this.world.step()
  }
}