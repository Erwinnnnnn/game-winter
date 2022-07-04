import { Texture } from '@pixi/core'
import { TilingSprite } from '@pixi/sprite-tiling'

export default class Background extends TilingSprite  {
    constructor(imageReference: string) {
        const texture = Texture.from(imageReference)
        super(texture, 1, texture.height)
    }

    onResize(width: number, height: number) {
        this.width = width
        this.y = height - this.height + 160
    }

    onUpdate(delta: number, speed: number = 1) {
        this.tilePosition.x -= delta * speed
    }
}