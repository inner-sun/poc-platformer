import { Group } from 'three'
import { Engine } from './engine'
import { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from '@dimforge/rapier3d-compat'

export class GameObject{
  group = new Group
  colliderDesc?: ColliderDesc
  rigidBodyDesc?: RigidBodyDesc
  collider?: Collider
  rigidBody?: RigidBody

  constructor(){

  }

  tick(engine: Engine){

  }
}