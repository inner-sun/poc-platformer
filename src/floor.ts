import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { GameObject } from './game-object'
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d-compat'

export class Floor extends GameObject{
  constructor(){
    super()

    const mesh = new Mesh(
      new PlaneGeometry(32, 32, 32, 32),
      new MeshBasicMaterial({ color: 0x7E2553, wireframe: true })
    )
    mesh.rotateX(-Math.PI / 2)
    this.group.add(mesh)

    this.rigidBodyDesc = RigidBodyDesc.fixed()
    this.rigidBodyDesc.setTranslation(0, -1, 0)
    this.colliderDesc = ColliderDesc.cuboid(16, 1, 16)
  }
}