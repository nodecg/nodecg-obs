# \<nodecg-obs-scene\> [![Bower version](https://badge.fury.io/bo/nodecg-obs-scene.svg)](https://badge.fury.io/bo/nodecg-obs-scene)

[`nodecg-obs-scene`](https://github.com/NodeCG/nodecg-obs/packages/nodecg-obs-scene) is a Polymer element that provides realtime data bindings with information about a given scene in OBS Studio. It's made to be used with [`nodecg-utility-obs`](https://github.com/NodeCG/nodecg-obs/packages/nodecg-utility-obs) and [`nodecg-widget-obs`](https://github.com/NodeCG/nodecg-obs/packages/nodecg-widget-obs).

For documentation on how to set up and use `nodecg-utility-obs` and `nodecg-widget-obs`, see [`nodecg-obs`](https://github.com/NodeCG/nodecg-obs).

## Requirements

- NodeCG v0.9 (currently in beta, checkout the latest commit from the [0.9-dev branch](https://github.com/nodecg/nodecg/tree/0.9-dev))

## Install

`nodecg-obs-scene` should be installed as a dependency of your bundle.

Due to limitations of Bower, you'll need to install [`bower-npm-resolver`](https://www.npmjs.com/package/bower-npm-resolver) to install `nodecg-obs-scene`.

1. Install `bower-npm-resolver` via npm:
    ```bash
    cd nodecg/bundles/my-bundle
    npm install --save bower-npm-resolver
    ```
2. Add `bower-npm-resolver` to a `.bowerrc` file in the root of your bundle (create it if it does not exist):
    ```json
    {
       "resolvers": [
           "bower-npm-resolver"
       ]
    }
    ```
3. Install `nodecg-obs-scene` via Bower
    ```bash
    bower install --save npm:nodecg-obs-scene
    ```

`$ bower install --save nodecg-obs-scene`

## Example

```html
<link rel="import" href="../bower_components/nodecg-obs-scene/nodecg-obs-scene.html">

<!-- A simple example element that prints if a given OBS Studio scene is in "preview", "program", or "none". -->
<dom-module id="my-element">
    <template>
        <style>
            :host {
                display: block;
            }
        </style>
        
        <nodecg-obs-scene scene-name="test-scene" state="{{sceneState}}"></nodecg-obs-scene>
        <div>test-scene is currently in: [[sceneState]]</div>
    </template>
    
    <script>
        class MyElement extends Polymer.Element {
            static get is() { 
                return 'my-element';
            }
            
            static get properties() { 
                return {
                    sceneState: String
                };
            }
        }
        
        customElements.define(MyElement.is, MyElement);
    </script>
</dom-module>
```

## Events

`<nodecg-obs-scene>` will emit an event whenever the status of the scene specified by the `sceneName` property changes. There are three such events:
- `program`
- `preview`
- `none`

You can listen to them with `addEventListener` or with Polymer's [annotated event listeners](https://www.polymer-project.org/2.0/docs/devguide/events#annotated-listeners):
```js
sceneElement.addEventListener('program', () => { /* ... */ });
sceneElement.addEventListener('preview', () => { /* ... */ });
sceneElement.addEventListener('none', () => { /* ... */ });
```