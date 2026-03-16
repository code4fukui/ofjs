# ofjs
日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A subset of [openFrameworks](https://openframeworks.cc/) in JavaScript.

## Demo
[swimming cursors](https://taisukef.github.io/swimming-cursors/)

## Features
- 2D drawing library inspired by openFrameworks
- Includes basic functions like `ofTranslate`, `ofSetColor`, `ofBeginShape`, `ofVertex`, `ofEndShape`
- Uses Simplex noise for procedural effects
- Provides `ofRandom` and `ofMap` utility functions

## Usage
To use `ofjs`, you can import the necessary functions from the provided files:

```javascript
import { ofTranslate, ofSetColor, ofBeginShape, ofVertex, ofEndShape, ofRunApp } from './ofMain.js'
import { vec2 } from './glm.js'

const app = {
  setup: () => {
    // setup code
  },
  update: () => {
    // update code
  },
  draw: (fps) => {
    // draw code
  }
}

ofRunApp(app)
```

## License
This project is licensed under the [MIT License](LICENSE).
