import { Application } from '@pixi/app'
import { Renderer } from '@pixi/core'
import { BatchRenderer } from '@pixi/core'
import { TilingSpriteRenderer } from '@pixi/sprite-tiling'
import { TickerPlugin } from '@pixi/ticker'
import { AppLoaderPlugin } from '@pixi/loaders'
Application.registerPlugin(TickerPlugin)
Renderer.registerPlugin('tilingSprite', TilingSpriteRenderer)
Renderer.registerPlugin('batch', BatchRenderer)
Application.registerPlugin(AppLoaderPlugin)

import App from './app';

new App();