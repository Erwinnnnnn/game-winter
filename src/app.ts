import { Application } from '@pixi/app'
import * as Utils from '@pixi/utils'
import Helpers from './helpers'
import Background from './background'

export default class App extends Application {
    private background: Background;
    constructor() {
        const colorBackground = getComputedStyle(document.documentElement)
            .getPropertyValue('--var-gamebackground').toString();
        const colorBackground2 = Helpers.convertColor(colorBackground);

        super({
            width: 960,
            height: 540,
            resolution: devicePixelRatio,
            backgroundColor: colorBackground2
        })

        let canvas = document.getElementById("gameholder").appendChild(this.view);
        canvas.setAttribute("id", "game");

        this.init()

        window.addEventListener('resize', this.onResize.bind(this))
    }

    init() {
        this.loader.add('bg', '../assets/background-floor1.png')
        this.loader.load(this.draw.bind(this))
    }

    draw() {
        this.background = new Background()
        this.stage.addChild(this.background)
        this.onResize()
        this.ticker.add(this.onUpdate.bind(this))
    }

    onUpdate(delta: number) {
        this.background.onUpdate(delta)
    }

    onResize() {
        const width = this.renderer.width, height = this.renderer.height
        this.background.onResize(width, height)
    }
}