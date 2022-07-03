import { Texture } from '@pixi/core'
import { TilingSprite } from '@pixi/sprite-tiling'

export default class Background extends TilingSprite  {
    constructor() {
        const texture = Texture.from('bg')
        super(texture, 1, texture.height) //width 1 because we will call onResize from App anyway
    }

    onResize(width: number, height: number) {
        this.width = width
        this.y = height - this.height + 160
    }

    onUpdate(delta: number) {
        this.tilePosition.x -= delta
    }
}