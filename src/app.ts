import * as PIXI from "pixi.js"

import Helpers from "./helpers";
import Settings from "./settings";
import Background from "./background";
import {AnimatedSprite} from "@pixi/sprite-animated";

export default class App {
    private background1: Background;
    private background2: Background;
    private background3: Background;
    private sign1sheet: any;
    private sign1sprite: any;
    private animatedSign1: AnimatedSprite;
    private app:any = new PIXI.Application({
        width: 960,
        height: 540
    })
    constructor() {
        const colorBackground = getComputedStyle(document.documentElement)
            .getPropertyValue('--var-gamebackground').toString();
        const colorBackground2 = Helpers.convertColor(colorBackground);

        this.init();

        let canvas = document.getElementById("gameholder").appendChild(this.app.view);
        canvas.setAttribute("id", "game");

        window.addEventListener('resize', this.onResize.bind(this))
    }

    loadImages(images: Array<Array<string>>) {
        for (let _i = 0; _i < images.length; _i++) {
            this.app.loader.add(images[_i][0], Settings.assetsPath + images[_i][1] + '.png')
        }
    }

    init() {
        this.loadImages([
            ['bg1', 'background-floor1'],
            ['bg2', 'background-floor2'],
            ['bg3', 'background-floor3']
        ]);
        this.app.loader.add(Settings.assetsPath + 'sign1.json')
        this.app.loader.load(this.loadAssets.bind(this))
    }

    loadAssets() {
        this.background3 = new Background('bg3')
        this.background2 = new Background('bg2')
        this.background1 = new Background('bg1')

        this.sign1sheet = this.app.loader.resources[Settings.assetsPath + 'sign1.json'].spritesheet
        this.createStage()
    }

    createStage() {
        this.sign1sprite = new PIXI.AnimatedSprite(this.sign1sheet.animations["sign"]);
        this.sign1sprite.animationSpeed = 0.167;
        this.sign1sprite.loop = false;
        this.sign1sprite.play();

        this.app.stage.addChild(
            this.background3,
            this.background2,
            this.background1,
            this.sign1sprite
        )
        this.onResize()
        this.app.ticker.add(this.runStage.bind(this))
    }

    runStage(delta: number) {
        this.background1.onUpdate(delta, 1.5)
        this.background2.onUpdate(delta, 1.2)
        this.background3.onUpdate(delta, 1)
    }

    onResize() {
        if(window.innerWidth < 980) {
            this.app.renderer.resize(720,405);
        } else {
            this.app.renderer.resize(960,540);
        }
        const width = this.app.renderer.width
        const height = this.app.renderer.height
        this.background1.onResize(width, height)
        this.background2.onResize(width, height)
        this.background3.onResize(width, height)
    }
}
