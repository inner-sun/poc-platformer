import { BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three'
import { GameObject } from './game-object'
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d-compat'

export class Platform extends GameObject{
  constructor({
    width = 1,
    height = 1,
    depth = 1,
    position = new Vector3
  }){
    super()

    const mesh = new Mesh(
      new BoxGeometry(width, height, depth),
      new MeshPhongMaterial({ color: 0x29ADFF, wireframe: true })
    )
    
    this.group.add(mesh)
    this.group.position.set(position.x, position.y + height / 2, position.z)

    this.rigidBodyDesc = RigidBodyDesc.fixed()
    this.rigidBodyDesc.setTranslation(position.x, position.y + height / 2, position.z)
    this.colliderDesc = ColliderDesc.cuboid(width / 2, height / 2, depth / 2)
  }
}