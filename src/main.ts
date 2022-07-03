import * as PIXI from "pixi.js";

const colorBackground = getComputedStyle(document.documentElement)
    .getPropertyValue('--var-gamebackground').toString();

function convertColor(color: string) {
    color = color.replace(/\s/g, '');
    color = color.replace('#','');
    return PIXI.utils.string2hex(color);
}

const app = new PIXI.Application({
    width: 960, height: 540,
    resolution: devicePixelRatio,
    backgroundColor: convertColor(colorBackground)
});



let canvas = document.getElementById("gameholder").appendChild(app.view);
canvas.setAttribute("id", "game");

// graphics =============

let background;

app.loader
    .add("../assets/background-floor1.png")
    .load(setup);

function setup() {
    let resources = app.loader.resources;

    // initialize background sprite
    background = new PIXI.Sprite(resources["../assets/background-floor1.png"].texture);
    background.position.set(0, app.view.height - 180);
    app.stage.addChild(background);
    app.ticker.add(delta => gameLoop(delta));
    // scale stage container that it fits into the view
    //app.stage.scale.x = app.view.width / background.width;
   // app.stage.scale.y = app.view.height / background.height;
}

function gameLoop(delta) {
    background.x = (background.x + 5*delta) % (background.width + 200);
}