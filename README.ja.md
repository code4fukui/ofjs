# ofjs
This README is also available in [日本語](README.ja.md).

A subset of [openFrameworks](https://openframeworks.cc/) in JavaScript.

## デモ
[swimming cursors](https://taisukef.github.io/swimming-cursors/)

## 機能
- openFrameworksに触発された2Dドロー​​ライブラリ
- `ofTranslate`、`ofSetColor`、`ofBeginShape`、`ofVertex`、`ofEndShape`などの基本関数を含む
- 手続き的な効果のためのSimplex noiseを使用
- `ofRandom`と`ofMap`のユーティリティ関数を提供

## 使い方
`ofjs`を使うには、提供されているファイルから必要な関数をインポートできます:

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

以下は、英語の README マークダウンチャンクを日本語に翻訳したものです。

## ライセンス
このプロジェクトは [MIT License](LICENSE) のもとで公開されています。
