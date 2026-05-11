# ofjs

キャンバスベースのクリエイティブコーディングのための、JavaScriptによる[openFrameworks](https://openframeworks.cc/)のサブセットです。

`ofjs`は、openFrameworksのC++ツールキットでお馴染みの関数群を提供し、最小限のセットアップで、ブラウザ上で直接インタラクティブな2Dグラフィックスを作成できるようにします。

## デモ

- [Swimming Cursors](https://taisukef.github.io/swimming-cursors/) / [source](https://github.com/taisukef/swimming-cursors/)

## 特徴

- お馴染みの `setup()`、`update()`、`draw()` によるアプリケーション構造。
- 2Dキャンバス描画のための、openFrameworksスタイルのコア関数群。
- ベクトル演算のヘルパー（`Vector2`クラス、`glm.vec2`、`glm.vec3`）。
- 組み込みのシンプレックスノイズ（`ofNoise`）と、シード設定可能な乱数生成器（`ofRandom`）。
- キャンバスの自動生成、リサイズ、およびクリックによるフルスクリーン表示のサポート。
- ビルドステップ不要 — ESモジュールとしてブラウザ上で直接実行可能。

## 使い方

1. このリポジトリをクローンするか、ソースファイル（`ofMain.js`、`Vector2.js`、`glm.js`）をダウンロードします。
2. `index.html` ファイルを作成します：

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

3. `main.js` ファイルを作成し、アプリケーションを記述します：

    ```javascript
    import {
      ofRunApp, ofGetWindowSize, ofBackground, ofSetColor, ofColor,
      ofGetFrameNum, ofTranslate, ofBeginShape, ofVertex, ofEndShape,
      ofFill, cos, sin, PI
    } from './ofMain.js';
    import { vec2 } from './glm.js';

    const app = {
      setup() {
        // 起動時に一度だけ実行されます。
      },

      update() {
        // 毎フレーム、draw() の前に実行されます。
      },

      draw() {
        const size = ofGetWindowSize();
        const frame = ofGetFrameNum();
        
        // 背景色を明るいグレーに設定します。
        ofBackground(230);
        
        // 座標系を中央に移動します。
        ofTranslate(vec2(size.x / 2, size.y / 2));

        // 時間とともに脈打つ円を描画します。
        const radius = 100 + sin(frame * 0.1) * 50;
        const resolution = 60;

        ofSetColor(ofColor(255, 100, 100));
        ofFill(); // 図形を塗りつぶしに設定します。
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

4. ローカルWebサーバーでファイルをホストし、ブラウザで `index.html` を開きます。

## APIリファレンス

### アプリケーションのライフサイクル

- `ofRunApp(app)`: アプリケーションループを開始します。`setup`、`update`、`draw` メソッドを持つ `app` オブジェクトが必要です。

### ウィンドウと環境

- `ofGetWindowSize()`: キャンバスのサイズを `Vector2` として返します。
- `ofSetWindowTitle(title)`: ドキュメントのタイトルを設定します。
- `ofGetFrameNum()`: 現在のフレーム数を返します。
- `ofGetFramePerSecond()`: 推定される1秒あたりのフレーム数（FPS）を返します。

### 描画

- `ofBackground(gray)`: 背景色を設定します（0〜255）。
- `ofSetColor(color)`: 塗りつぶしと線の色を設定します。CSSのカラー文字列（例: `'red'`、`'#ff0000'`、または `ofColor` の出力）を受け付けます。
- `ofColor(r, g, b)` または `ofColor(gray)`: `rgb()` カラー文字列を返します。
