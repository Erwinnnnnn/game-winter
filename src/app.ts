import { Application } from '@pixi/app'
import { Layer } from '@pixi/layers'
import Settings from './settings'
import Helpers from './helpers'
import Background from './background'


export default class App extends Application {
    private background1: Background;
    private background2: Background;
    private background3: Background;
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

    loadImages(images: Array<Array<string>>) {
        for (let _i = 0; _i < images.length; _i++) {
            this.loader.add(images[_i][0], Settings.assetsPath + images[_i][1] + '.png')
        }
    }

    init() {
        this.loadImages([
            ['bg', 'background-floor1'],
            ['bg2', 'background-floor2'],
            ['bg3', 'background-floor3']
        ]);
        this.loader.load(this.draw.bind(this))
    }

    draw() {
        this.background3 = new Background('bg3')
        this.background2 = new Background('bg2')
        this.background1 = new Background('bg')
        this.stage.addChild(this.background3, this.background2, this.background1)
        this.onResize()
        this.ticker.add(this.onUpdate.bind(this))
    }

    onUpdate(delta: number) {
        this.background1.onUpdate(delta, 1.5)
        this.background2.onUpdate(delta, 1.2)
        this.background3.onUpdate(delta, 1)
    }

    onResize() {
        if(window.innerWidth < 980) {
            this.renderer.resize(720,405);
        } else {
            this.renderer.resize(960,540);
        }
        const width = this.renderer.width, height = this.renderer.height
        this.background1.onResize(width, height)
        this.background2.onResize(width, height)
        this.background3.onResize(width, height)
    }
}