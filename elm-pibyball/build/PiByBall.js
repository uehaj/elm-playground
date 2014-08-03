Elm.PiByBall = Elm.PiByBall || {};
Elm.PiByBall.make = function (_elm) {
   "use strict";
   _elm.PiByBall = _elm.PiByBall || {};
   if (_elm.PiByBall.values)
   return _elm.PiByBall.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "PiByBall";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Debug = Elm.Debug.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var Keyboard = Elm.Keyboard.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Window = Elm.Window.make(_elm);
   var _op = {};
   var inpRunning = Graphics.Input.input(false);
   var startButton = A3(Graphics.Input.button,
   inpRunning.handle,
   true,
   "開始");
   var stopButton = A3(Graphics.Input.button,
   inpRunning.handle,
   false,
   "停止");
   var inpN = Graphics.Input.input(0);
   var selectN = A2(Graphics.Element.beside,
   Text.plainText("N="),
   A2(Graphics.Input.dropDown,
   inpN.handle,
   _L.fromArray([{ctor: "_Tuple2"
                 ,_0: "0"
                 ,_1: 0}
                ,{ctor: "_Tuple2",_0: "1",_1: 1}
                ,{ctor: "_Tuple2",_0: "2",_1: 2}
                ,{ctor: "_Tuple2",_0: "3",_1: 3}
                ,{ctor: "_Tuple2",_0: "4",_1: 4}
                ,{ctor: "_Tuple2"
                 ,_0: "5"
                 ,_1: 5}])));
   var bkcolor = A3(Color.rgb,
   200,
   200,
   256);
   var simulation = F3(function (w,
   h,
   state) {
      return Graphics.Element.layers(_L.fromArray([A2(Graphics.Collage.collage,
                                                  w,
                                                  h / 2 | 0)(_L.fromArray([Graphics.Collage.move({ctor: "_Tuple2"
                                                                                                 ,_0: 0 - Basics.toFloat(w) / 4
                                                                                                 ,_1: 0})(A2(Graphics.Collage.filled,
                                                  bkcolor,
                                                  A2(Graphics.Collage.rect,
                                                  Basics.toFloat(w) / 2,
                                                  Basics.toFloat(h) / 2)))]))
                                                  ,A2(Graphics.Element.flow,
                                                  Graphics.Element.down,
                                                  _L.fromArray([A2(Graphics.Element.flow,
                                                  Graphics.Element.right,
                                                  _L.fromArray([A2(Graphics.Collage.collage,
                                                  w,
                                                  h / 2 | 0)(_L.fromArray([A2(Graphics.Collage.traced,
                                                                          _U.replace([["width"
                                                                                      ,4]],
                                                                          Graphics.Collage.defaultLine),
                                                                          A2(Graphics.Collage.segment,
                                                                          {ctor: "_Tuple2"
                                                                          ,_0: 0
                                                                          ,_1: 200},
                                                                          {ctor: "_Tuple2"
                                                                          ,_0: 0
                                                                          ,_1: -200}))
                                                                          ,A2(Graphics.Collage.move,
                                                                          {ctor: "_Tuple2"
                                                                          ,_0: A2(Basics.min,
                                                                          0,
                                                                          state.x1)
                                                                          ,_1: 0},
                                                                          Graphics.Collage.filled(Color.red)(Graphics.Collage.circle(5)))
                                                                          ,A2(Graphics.Collage.move,
                                                                          {ctor: "_Tuple2"
                                                                          ,_0: A2(Basics.min,
                                                                          0,
                                                                          state.x2)
                                                                          ,_1: 0},
                                                                          Graphics.Collage.filled(Color.red)(Graphics.Collage.circle(2)))]))]))]))]));
   });
   var description3 = Text.markdown("<div style=\"height:0;width:0;\">&nbsp;</div><p>N=0のとき、衝突回数は最終的に3になったはずです。「最終的」といっても<br /> 計算の打ち切り処理はしてませんので、永久に衝突しなくなるだろう時点を<br /> 適当に判断してください。<br /> さらにNを1,2..と変えてみると、以下の結果になるでしょう。<br /></p>\n<table border=\"1\">\n<tr><th>\nN\n</th><th>\n衝突回数\n</th></tr>\n<tr><td>\n0\n</td><td>\n3\n</td></tr>\n<tr><td>\n1\n</td><td>\n31\n</td></tr>\n<tr><td>\n2\n</td><td>\n314\n</td></tr>\n<tr><td>\n3\n</td><td>\n3141\n</td></tr>\n<tr><td>\n4\n</td><td>\n31415\n</td></tr>\n</table>\n\n<p>注意深い読者は気づいたでしょうが、この回数が円周率に対応します。</p>\n<table border=\"1\">\n<tr><th>\nN\n</th><th>\n衝突回数c\n</th><th>\nc/10^N\n</th></tr>\n<tr><td>\n0\n</td><td>\n3\n</td><td>\n3.0\n</td></tr>\n<tr><td>\n1\n</td><td>\n31\n</td><td>\n3.1\n</td></tr>\n<tr><td>\n2\n</td><td>\n314\n</td><td>\n3.14\n</td></tr>\n<tr><td>\n3\n</td><td>\n3141\n</td><td>\n3.141\n</td></tr>\n<tr><td>\n4\n</td><td>\n31415\n</td><td>\n3.1415\n</td></tr>\n</table>\n\n<p>Nを増やせば増やすほど、精度が上っていきます。</p>\n<h3 id=\"留意点など\">留意点など</h3>\n<ul>\n<li>初速は結果には関係ありません。</li>\n<li>質点と壁の具体的な初期位置は結果には関係ありません(M1,M2,壁の順序で並んでい<br />て、M1の初速が右向きである必要はあります)</li>\n<li>衝突による速度の変化だけが結果を決めます。</li>\n<li>正しい表示のためには、一定の離散時間でプロットするのではなく、時間精度を適<br />宜細かくとかしていく必要がありますが、このシミュレーションでは時間間隔一定<br />でプロットしています。動きが変なのは、そのせいです。</li>\n</ul>\n<h3 id=\"参考その他\">参考その他</h3>\n<p>この記事はElmを使って書いています。この記事を紹介している記事は<a href=\"http://uehaj.hatenablog.com/entry/2014/08/03/234120\">こちら</a>。 以下を参考にさせて頂きました。</p>\n<ul>\n<li><a href=\"http://wasan.hatenablog.com/entry/2014/04/10/073638\">「2つのボールをぶつけると円周率がわかる」らしいのでシミュレーションしてみた</a></li>\n<li><a href=\"http://wasan.hatenablog.com/entry/2014/04/15/045611\">「2つのボールをぶつけると円周率がわかる」のをしつこく確かめてみた・・・解析的に</a></li>\n</ul><div style=\"height:0;width:0;\">&nbsp;</div>",
   "85:16");
   var description2 = Text.markdown("<div style=\"height:0;width:0;\">&nbsp;</div><p>表示上の判り易さのために、質点の大きさに差を付けていま<br/> すが、表示されている大きさは質点の質量の比率には対応し<br/> ていません。</p>\n<h3 id=\"質量について\">質量について</h3>\n<p>M1とM2の質量をそれぞれm1,m2としたとき、m1とm2の比率を<br/> 以下とします。</p>\n<pre><code>          m1:m2 = 100^N : 1</code></pre>\n<p>ここでNは0以上の整数値です。Nに応じて上記の比率は具体<br/> 的には以下のようになります。</p>\n<table border=\"1\">\n<tr><th>\nN\n</th><th>\n左にある丸の重さ=100^N\n</th><th>\n右にある質点の重さ\n</th></tr>\n<tr><td>\n0\n</td><td>\n1\n</td><td>\n1\n</td></tr>\n<tr><td>\n1\n</td><td>\n100\n</td><td>\n1\n</td></tr>\n<tr><td>\n2\n</td><td>\n10000\n</td><td>\n1\n</td></tr>\n<tr><td>\n3\n</td><td>\n1000000\n</td><td>\n1\n</td></tr>\n<tr><td>\n:\n</td><td>\n:\n</td><td>\n:\n</td></tr>\n</table>\n\n<h3 id=\"シミュレーション\">シミュレーション</h3>\n前提として、質点および壁は完全弾性衝突するとします。<br /> そして質点M1に右向きの適当な初速を与え、M2のM1および<br /> 壁に対する衝突回数をカウントします。\n</p>\n\n<p>実際にやってみましょう。まず以下でNは変更せずに(N=0のまま)<br /> 「開始」ボタンを押してみて下さい。</p><div style=\"height:0;width:0;\">&nbsp;</div>",
   "51:16");
   var description1 = Text.markdown("<div style=\"height:0;width:0;\">&nbsp;</div><h2 id=\"ボールをぶつけるだけで円周率がわかる\">ボールをぶつけるだけで円周率がわかる？</h2>\n<h3 id=\"シミュレーションの舞台\">シミュレーションの舞台</h3>\n<p>以下のように2つの質点M1,M2と壁を考えます。<br/></p><div style=\"height:0;width:0;\">&nbsp;</div>",
   "44:16");
   var colide = F3(function (v1,
   v2,
   r) {
      return {ctor: "_Tuple3"
             ,_0: ((r - 1) * v1 + 2 * v2) / (r + 1)
             ,_1: (2 * r * v1 - (r - 1) * v2) / (r + 1)
             ,_2: 1};
   });
   var frameRate = 320;
   var ChangeN = function (a) {
      return {ctor: "ChangeN"
             ,_0: a};
   };
   var TimeTick = {ctor: "TimeTick"};
   var Stop = {ctor: "Stop"};
   var Start = {ctor: "Start"};
   var inputSignal = function () {
      var f = function (running) {
         return running ? Start : Stop;
      };
      return Signal.merges(_L.fromArray([A2(Signal._op["<~"],
                                        f,
                                        inpRunning.signal)
                                        ,A2(Signal._op["<~"],
                                        ChangeN,
                                        inpN.signal)
                                        ,A2(Signal.sampleOn,
                                        Time.fps(frameRate),
                                        Signal.constant(TimeTick))]));
   }();
   var State = F7(function (a,
   b,
   c,
   d,
   e,
   f,
   g) {
      return {_: {}
             ,count: f
             ,ratio: g
             ,stat: a
             ,v1: d
             ,v2: e
             ,x1: b
             ,x2: c};
   });
   var Running = {ctor: "Running"};
   var Pause = {ctor: "Pause"};
   var initialState = {_: {}
                      ,count: 0
                      ,ratio: 1
                      ,stat: Pause
                      ,v1: 1
                      ,v2: 0
                      ,x1: -200
                      ,x2: -100};
   var nextState = F2(function (event,
   _v0) {
      return function () {
         return function () {
            switch (event.ctor)
            {case "ChangeN":
               return A2(Debug.log,
                 "ChangeN",
                 _U.replace([["ratio"
                             ,Math.pow(100,
                             Basics.toFloat(event._0))]],
                 initialState));
               case "Start":
               return A2(Debug.log,
                 "Start",
                 _U.replace([["stat",Running]
                            ,["ratio",_v0.ratio]],
                 initialState));
               case "Stop":
               return A2(Debug.log,
                 "Stop",
                 _U.replace([["stat",Pause]],
                 _v0));
               case "TimeTick":
               return _U.eq(_v0.stat,
                 Running) ? function () {
                    var $ = _U.cmp(_v0.x1 + _v0.v1,
                    _v0.x2 + _v0.v2) > -1 ? A3(colide,
                    _v0.v1,
                    _v0.v2,
                    _v0.ratio) : _U.cmp(_v0.x2 + _v0.v2,
                    0) > -1 ? {ctor: "_Tuple3"
                              ,_0: _v0.v1
                              ,_1: 0 - _v0.v2
                              ,_2: 1} : {ctor: "_Tuple3"
                                        ,_0: _v0.v1
                                        ,_1: _v0.v2
                                        ,_2: 0},
                    new_v1 = $._0,
                    new_v2 = $._1,
                    countIncl = $._2;
                    return A9(Debug.log,
                    "timetick",
                    State,
                    Running,
                    _v0.x1 + new_v1,
                    _v0.x2 + new_v2,
                    new_v1,
                    new_v2,
                    _v0.count + countIncl,
                    _v0.ratio);
                 }() : A2(Debug.log,
                 "Pause",
                 _U.replace([["ratio"
                             ,_v0.ratio]],
                 initialState));}
            _E.Case($moduleName,
            "between lines 26 and 39");
         }();
      }();
   });
   var currentState = A3(Signal.foldp,
   nextState,
   initialState,
   inputSignal);
   var main = function () {
      var disp = F3(function (w,
      h,
      state) {
         return A2(Graphics.Element.beside,
         A2(Graphics.Element.spacer,
         10,
         10),
         A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([description1
                      ,A3(Graphics.Element.image,
                      610,
                      362,
                      "fig1.png")
                      ,description2
                      ,selectN
                      ,_U.eq(state.stat,
                      Running) ? stopButton : startButton
                      ,A2(Graphics.Element.flow,
                      Graphics.Element.down,
                      _L.fromArray([Text.plainText(_L.append("M1,M2の質量の比率(m1:m2)= 100^N:1 = ",
                                   _L.append(String.show(state.ratio),
                                   ":1")))
                                   ,Text.plainText(_L.append("M1の位置=",
                                   String.show(state.x1)))
                                   ,Text.plainText(_L.append("M2の位置=",
                                   String.show(state.x2)))
                                   ,Text.plainText(_L.append("衝突回数:",
                                   String.show(state.count)))]))
                      ,A3(simulation,w,h,state)
                      ,description3])));
      });
      return A2(Signal._op["~"],
      A2(Signal._op["~"],
      A2(Signal._op["<~"],
      disp,
      Window.width),
      Signal.constant(400)),
      currentState);
   }();
   _elm.PiByBall.values = {_op: _op
                          ,frameRate: frameRate
                          ,initialState: initialState
                          ,inputSignal: inputSignal
                          ,colide: colide
                          ,nextState: nextState
                          ,currentState: currentState
                          ,description1: description1
                          ,description2: description2
                          ,description3: description3
                          ,bkcolor: bkcolor
                          ,inpN: inpN
                          ,selectN: selectN
                          ,inpRunning: inpRunning
                          ,startButton: startButton
                          ,stopButton: stopButton
                          ,simulation: simulation
                          ,main: main
                          ,Pause: Pause
                          ,Running: Running
                          ,Start: Start
                          ,Stop: Stop
                          ,TimeTick: TimeTick
                          ,ChangeN: ChangeN
                          ,State: State};
   return _elm.PiByBall.values;
};