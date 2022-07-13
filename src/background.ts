import * as PIXI from "pixi.js"

export default class Background extends PIXI.TilingSprite  {
    constructor(imageReference: string) {
        const texture = PIXI.Texture.from(imageReference)
        super(texture, 1, texture.height)

    }

    onResize(width: number, height: number) {
        this.width = width
        this.y = height - this.height + 460
    }

    onUpdate(delta: number, speed: number = 1) {
        this.tilePosition.x -= delta * speed
    }
}