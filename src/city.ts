import * as PIXI from "pixi.js"

export default class City {
    constructor() {
        this.createCityAssets();
    }

    createCityAssets() {
        // todo: hoe app hier krijgen?
        this.app.stage.addChild(
            this.background2,
            this.background1,
            this.sign1sprite
        )
    }

    onResize() {

    }

    onUpdate() {

    }
}