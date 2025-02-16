import { Box3, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { GameObject } from './game-object'
import { Player } from './player'
import { Engine } from './engine'

export class Collisions{
  gameObjects: GameObject[] = []
  intersectionHighlighter: Mesh<BoxGeometry, MeshBasicMaterial>

  constructor(engine: Engine){
    this.intersectionHighlighter = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0xFF0000, visible: false })
    )
    engine.scene.add(this.intersectionHighlighter)
  }

  getValidPosition(movement: Vector3, player: Player) {
    let validPosition = player.group.position.clone().add(movement)
    const futureBox = new Box3().setFromObject(player.group).translate(movement)
    this.intersectionHighlighter.material.visible = false

    this.gameObjects.forEach(object => {
      const objectBox = new Box3().setFromObject(object.group)

      if (objectBox.intersectsBox(futureBox)) {
        const intersect = objectBox.intersect(futureBox)
        const intersectDepth = new Vector3(
          intersect.max.x - intersect.min.x,
          intersect.max.y - intersect.min.y,
          intersect.max.z - intersect.min.z,
        )
        console.log({ intersectDepth, movement })
        const centerOfIntersection = intersect.getCenter(new Vector3)
        const angleOfIntersection = new Vector3().copy(player.group.position).sub(centerOfIntersection).x > 0 ? 1 : -1
        const correction = new Vector3(
          intersectDepth.x < 1 ? intersectDepth.x * Math.sign(-movement.x) : 0,
          intersectDepth.y < 1 ? intersectDepth.y * Math.sign(-movement.y) : 0,
          intersectDepth.z < 1 ? intersectDepth.z * Math.sign(-movement.z) : 0,
        )
        console.log('angleOfIntersection', angleOfIntersection)
        validPosition.add(correction)
        // Show intersection box
        const size = intersect.getSize(new Vector3)
        this.intersectionHighlighter.geometry = new BoxGeometry(size.x, size.y, size.z)
        this.intersectionHighlighter.position.copy(centerOfIntersection)
        this.intersectionHighlighter.material.visible = true
      }
    })

    return validPosition
  }
}