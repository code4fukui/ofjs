# ofjs

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A subset of [openFrameworks](https://openframeworks.cc/) in JavaScript for canvas-based creative coding.

`ofjs` provides a set of familiar functions from the openFrameworks C++ toolkit, allowing you to create interactive 2D graphics directly in the browser with minimal setup.

## Demo

- [Swimming Cursors](https://taisukef.github.io/swimming-cursors/) / [source](https://github.com/taisukef/swimming-cursors/)

## Features

-   Familiar `setup()`, `update()`, `draw()` app structure.
-   A core set of openFrameworks-style functions for 2D canvas drawing.
-   Vector math helpers (`Vector2` class, `glm.vec2`, `glm.vec3`).
-   Built-in Simplex noise (`ofNoise`) and a seedable random number generator (`ofRandom`).
-   Automatic canvas creation, resizing, and click-to-fullscreen support.
-   No build step required—runs directly in the browser as ES modules.

## Usage

1.  Clone this repository or download the source files (`ofMain.js`, `Vector2.js`, `glm.js`).
2.  Create an `index.html` file:

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>ofjs Example</title>
      <style>
        html, body {
          overflow: hidden;
        }
      </style>
    </head>
    <body>
      <script type="module" src="main.js"></script>
    </body>
    </html>
    ```

3.  Create a `main.js` file and write your application:

    ```javascript
    import {
      ofRunApp, ofGetWindowSize, ofBackground, ofSetColor, ofColor,
      ofGetFrameNum, ofTranslate, ofBeginShape, ofVertex, ofEndShape,
      ofFill, cos, sin, PI
    } from './ofMain.js';
    import { vec2 } from './glm.js';

    const app = {
      setup() {
        // Runs once at the start.
      },

      update() {
        // Runs on every frame before draw().
      },

      draw() {
        const size = ofGetWindowSize();
        const frame = ofGetFrameNum();
        
        // Set background to a light gray.
        ofBackground(230);
        
        // Center the coordinate system.
        ofTranslate(vec2(size.x / 2, size.y / 2));

        // Draw a circle that pulses with time.
        const radius = 100 + sin(frame * 0.1) * 50;
        const resolution = 60;

        ofSetColor(ofColor(255, 100, 100));
        ofFill(); // Set the shape to be filled.
        ofBeginShape();
        for (let i = 0; i <= resolution; i++) {
          const angle = (i / resolution) * 2 * PI;
          const x = cos(angle) * radius;
          const y = sin(angle) * radius;
          ofVertex(vec2(x, y));
        }
        ofEndShape();
      }
    };

    ofRunApp(app);
    ```

4.  Serve the files with a local web server and open `index.html` in your browser.

## API Reference

### App Lifecycle

-   `ofRunApp(app)`: Starts the application loop. Requires an `app` object with `setup`, `update`, and `draw` methods.

### Window & Environment

-   `ofGetWindowSize()`: Returns the canvas dimensions as a `Vector2`.
-   `ofSetWindowTitle(title)`: Sets the document's title.
-   `ofGetFrameNum()`: Returns the current frame count.
-   `ofGetFramePerSecond()`: Returns the estimated frames per second.

### Drawing

-   `ofBackground(gray)`: Sets the background color (0-255).
-   `ofSetColor(color)`: Sets the fill and stroke color. Accepts CSS color strings (e.g., `'red'`, `'#ff0000'`, or the output of `ofColor`).
-   `ofColor(r, g, b)` or `ofColor(gray)`: Returns an `rgb()` color string.