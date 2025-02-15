import { BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three'
import { GameObject } from './game-object'

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
      new MeshPhongMaterial({ color: 0x29ADFF })
    )
    mesh.position.set(position.x, position.y + height / 2, position.z)

    this.group.add(mesh)
  }
}