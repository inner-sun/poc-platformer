import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { GameObject } from './game-object'

export class Floor extends GameObject{
  constructor(){
    super()

    const mesh = new Mesh(
      new PlaneGeometry(32, 32, 32, 32),
      new MeshBasicMaterial({ color: 0x7E2553, wireframe: true })
    )
    mesh.rotateX(-Math.PI / 2)
    this.group.add(mesh)
  }
}