module PiByBall where

import Window
import Debug (log)
import Graphics.Input (input, Input, button, dropDown)
import Keyboard

data Status = Pause | Running
type State = { stat:Status, x1:Float, x2: Float, v1: Float, v2: Float, count: Int, ratio: Float }
data Event = Start | Stop | TimeTick | ChangeN Int

frameRate = 320 -- 画面更新頻度

initialState : State
initialState = { stat=Pause, x1=-200, x2=-100, v1=1, v2=0, count=0, ratio=1 }

inputSignal : Signal Event
inputSignal = let f running = if | running -> Start
                                 | otherwise -> Stop
              in merges [(f <~ inpRunning.signal), (ChangeN <~ inpN.signal), (sampleOn (fps frameRate) (constant TimeTick))]

colide v1 v2 r =  (((r-1)*v1 + 2*v2)/(r+1), (2*r*v1 - (r-1)*v2)/(r+1), 1)

nextState : Event -> State -> State
nextState = \event ({stat, x1, x2, v1, v2, count, ratio} as state) ->
                        case event of
                          Start -> (log "Start" {initialState|stat<-Running, ratio<-ratio})
                          Stop -> (log "Stop" {state|stat<-Pause})
                          ChangeN n ->
                               (log "ChangeN" {initialState|ratio<-100^toFloat n})
                          TimeTick ->
                               if stat == Running then
                                   let (new_v1, new_v2, countIncl)
                                        = if | x1+v1>= x2+v2 -> colide v1 v2 ratio
                                             | x2+v2 >= 0    -> (v1, -v2, 1)
                                             | otherwise     -> (v1, v2, 0)
                                   in (log "timetick" State Running (x1+new_v1) (x2+new_v2) new_v1 new_v2 (count+countIncl) ratio)
                               else
                                  (log "Pause" {initialState|ratio<-ratio})

currentState : Signal State
currentState = foldp nextState initialState inputSignal

description1 = [markdown|
## ボールをぶつけるだけで円周率がわかる？
### シミュレーションの舞台

以下のように2つの質点M1,M2と壁を考えます。<br/>
|]

description2 = [markdown|
表示上の判り易さのために、質点の大きさに差を付けていま<br/>
すが、表示されている大きさは質点の質量の比率には対応し<br/>
ていません。

### 質量について

M1とM2の質量をそれぞれm1,m2としたとき、m1とm2の比率を<br/>
以下とします。

              m1:m2 = 100^N : 1

ここでNは0以上の整数値です。Nに応じて上記の比率は具体<br/>
的には以下のようになります。

<table border="1">
<tr><th>N</th><th>左にある丸の重さ=100^N</th><th>右にある質点の重さ</th></tr>
<tr><td>0</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>100</td><td>1</td></tr>
<tr><td>2</td><td>10000</td><td>1</td></tr>
<tr><td>3</td><td>1000000</td><td>1</td></tr>
<tr><td>:</td><td>:</td><td>:</td></tr>
</table>

### シミュレーション

前提として、質点および壁は完全弾性衝突するとします。<br />
そして質点M1に右向きの適当な初速を与え、M2のM1および<br />
壁に対する衝突回数をカウントします。</p>

実際にやってみましょう。まず以下でNは変更せずに(N=0のまま)<br />
「開始」ボタンを押してみて下さい。
|]

description3 = [markdown|
N=0のとき、衝突回数は最終的に3になったはずです。「最終的」といっても<br />
計算の打ち切り処理はしてませんので、永久に衝突しなくなるだろう時点を<br />
適当に判断してください。<br />
さらにNを1,2..と変えてみると、以下の結果になるでしょう。<br />

<table border="1">
<tr><th>N</th><th>衝突回数</th></tr>
<tr><td>0</td><td>3</td></tr>
<tr><td>1</td><td>31</td></tr>
<tr><td>2</td><td>314</td></tr>
<tr><td>3</td><td>3141</td></tr>
<tr><td>4</td><td>31415</td></tr>
</table>

注意深い読者は気づいたでしょうが、この回数が円周率に対応します。

<table border="1">
<tr><th>N</th><th>衝突回数c</th><th>c/10^N</th></tr>
<tr><td>0</td><td>3</td><td>3.0</td></tr>
<tr><td>1</td><td>31</td><td>3.1</td></tr>
<tr><td>2</td><td>314</td><td>3.14</td></tr>
<tr><td>3</td><td>3141</td><td>3.141</td></tr>
<tr><td>4</td><td>31415</td><td>3.1415</td></tr>
</table>

Nを増やせば増やすほど、精度が上っていきます。

### 留意点など

- 初速は結果には関係ありません。
- 質点と壁の具体的な初期位置は結果には関係ありません(M1,M2,壁の順序で並んでい<br />て、M1の初速が右向きである必要はあります)
- 衝突による速度の変化だけが結果を決めます。
- 正しい表示のためには、一定の離散時間でプロットするのではなく、時間精度を適<br />宜細かくとかしていく必要がありますが、このシミュレーションでは時間間隔一定<br />でプロットしています。動きが変なのは、そのせいです。

### 参考

以下を参考にさせて頂きました。

- [「2つのボールをぶつけると円周率がわかる」らしいのでシミュレーションしてみた](http://wasan.hatenablog.com/entry/2014/04/10/073638)
- [「2つのボールをぶつけると円周率がわかる」のをしつこく確かめてみた・・・解析的に](http://wasan.hatenablog.com/entry/2014/04/15/045611)

|]

bkcolor = rgb 200 200 256

inpN : Input Int
inpN = input 0

-- Nを選択。
selectN : Element
selectN = plainText "N=" `beside` dropDown inpN.handle
        [ ("0", 0)
        , ("1", 1)
        , ("2", 2)
        , ("3", 3)
        , ("4", 4)
        , ("5", 5)]

inpRunning = input False

startButton : Element
startButton = button inpRunning.handle True "開始"

stopButton : Element
stopButton = button inpRunning.handle False "停止"

-- シミュレーションを表示
simulation : Int -> Int -> State -> Element
simulation w h state = layers
                        [ collage w (h `div` 2)  <| [move (-(toFloat w / 4), 0) <| filled bkcolor (rect ((toFloat w)/2) ((toFloat h)/2))]
                          , flow down
                           [ flow right [ collage w (h `div` 2)  <|
                                          [ traced {defaultLine|width<-4} (segment (0, 200) (0, -200))
                                          , move (min 0 state.x1, 0) (filled red <|circle 5)
                                          , move (min 0 state.x2, 0) (filled red <|circle 2) ]
                           ] ] ]
-- 画面を表示
main : Signal Element
main=let disp w h state = spacer 10 10 `beside` flow down
          [ description1
          , image 610 362 "fig1.png"
          , description2
          , selectN
          , if state.stat == Running then stopButton else startButton
          , flow down [ "M1,M2の質量の比率(m1:m2)= 100^N:1 = "++show state.ratio++":1" |> plainText
                      , "M1の位置="++show state.x1 |> plainText
                      , "M2の位置="++show state.x2 |> plainText
                      , "衝突回数:"++show state.count |> plainText ]
          , simulation w h state
          , description3
          ]
     in disp <~ Window.width ~ constant 400 ~ currentState
