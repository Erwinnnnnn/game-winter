import * as PIXI from "pixi.js"
import { Layer } from '@pixi/layers'

import Helpers from "./helpers";
import Settings from "./settings";
import Background from "./background";
import City from "./city";
import {AnimatedSprite} from "@pixi/sprite-animated";

PIXI.settings.SORTABLE_CHILDREN = true;

export default class GameController {
    private background1: Background;
    private background2: Background;
    private city1: City;
    private sign1sheet: any;
    private sign1sprite: any;
    private app:PIXI.Application = new PIXI.Application({
        width: 960,
        height: 540,
        backgroundColor: Helpers.convertColor(getComputedStyle(document.documentElement)
            .getPropertyValue('--var-gamebackground').toString())
    })
    //private container:PIXI.Container = new PIXI.Container();

    constructor() {
        this.init();

        let canvas = document.getElementById("gameholder").appendChild(this.app.view);
        canvas.setAttribute("id", "game");

        window.addEventListener('resize', this.onResize.bind(this))
    }

    init() {
        Helpers.loadImages([
            ['bg1', 'background-floor1'],
            ['bg2', 'background-floor2'],
            ['city1', 'city1'],
        ], this.app.loader);
        this.app.loader.add(Settings.assetsPath + 'sign1.json')
        this.app.loader.load(this.loadAssets.bind(this))
    }

    loadAssets() {
        this.background2 = new Background('bg2')
        this.background1 = new Background('bg1')
        this.sign1sheet = this.app.loader.resources[Settings.assetsPath + 'sign1.json'].spritesheet
        this.city1 = new City();

        this.createStage()
    }

    createStage() {
        this.sign1sprite = new PIXI.AnimatedSprite(this.sign1sheet.animations["sign"]);
        this.sign1sprite.animationSpeed = 0.167;
        this.sign1sprite.loop = false;
        this.sign1sprite.play();

        this.app.stage.addChild(
            this.background2,
            this.background1,
            this.sign1sprite
        )

        this.onResize()
        this.app.ticker.add(this.runStage.bind(this))
    }

    runStage(delta: number) {
        this.background1.onUpdate(delta, 0.7)
        this.background2.onUpdate(delta, 0.5)
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
    }
}
