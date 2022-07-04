import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'

export default class Board extends Sprite  {
    constructor(imageReference: string) {
        const texture = Texture.from(imageReference)
        super(texture)
    }

    onResize(width: number, height: number) {
        this.width = width
        this.y = height - this.height + 160
    }

    onUpdate(delta: number) {

    }
}