import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { GameObject } from './game-object'

export class Player extends GameObject{
  constructor(){
    super()

    // Test Mesh for the player model
    const mesh = new Mesh(new BoxGeometry, new MeshBasicMaterial({ color: 0xFF0000 }))

    this.group.add(mesh)
  }
}