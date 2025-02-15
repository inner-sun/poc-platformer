import { Player } from './player'

export class Controls{
  player: Player

  constructor(player: Player){
    this.player = player
    window.addEventListener('keydown', (e) => this.onKeydown(e))
    window.addEventListener('keyup', (e) => this.onKeyup(e))
  }

  onKeydown(event: KeyboardEvent){
    if(event.code === 'KeyW'){
      this.player.controllerInput.setZ(1)
    }
    if(event.code === 'KeyS'){
      this.player.controllerInput.setZ(-1)
    }
    if(event.code === 'KeyA'){
      this.player.controllerInput.setX(1)
    }
    if(event.code === 'KeyD'){
      this.player.controllerInput.setX(-1)
    }
  }

  onKeyup(event: KeyboardEvent){
    if(event.code === 'KeyW'){
      this.player.controllerInput.setZ(0)
    }
    if(event.code === 'KeyS'){
      this.player.controllerInput.setZ(0)
    }
    if(event.code === 'KeyA'){
      this.player.controllerInput.setX(0)
    }
    if(event.code === 'KeyD'){
      this.player.controllerInput.setX(0)
    }
  }
}