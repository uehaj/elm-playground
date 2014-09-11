Elm.Main = Elm.Main || {};
Elm.Main.make = function (_elm) {
   "use strict";
   _elm.Main = _elm.Main || {};
   if (_elm.Main.values)
   return _elm.Main.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Main",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Gauge = Elm.Gauge.make(_elm),
   $Graphics$Collage = Elm.Graphics.Collage.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Leaf = Elm.Leaf.make(_elm),
   $List = Elm.List.make(_elm),
   $Mouse = Elm.Mouse.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Text = Elm.Text.make(_elm),
   $Time = Elm.Time.make(_elm),
   $Window = Elm.Window.make(_elm);
   var gaugeForm = F4(function (state,
   w,
   h,
   mx) {
      return state.mouseDown ? _L.fromArray([A2($Graphics$Collage.collage,
      w,
      h)(A2($Gauge.gauge,
      {ctor: "_Tuple2",_0: w,_1: h},
      mx))]) : _L.fromArray([]);
   });
   var statusInfo = function (state) {
      return _L.append("points=",
      _L.append($String.show($List.length(state.leafState.points)),
      state.mouseDown ? "" : " Click To Move"));
   };
   var statusLine = function (state) {
      return $Text.leftAligned($Text.style(_U.replace([["color"
                                                       ,$Color.red]],
      $Text.defaultStyle))($Text.toText(statusInfo(state))));
   };
   var background = F2(function (w,
   h) {
      return A3($Graphics$Collage.collage,
      w,
      h,
      _L.fromArray([A2($Graphics$Collage.move,
      {ctor: "_Tuple2",_0: 0,_1: 0},
      $Graphics$Collage.filled($Color.black)(A2($Graphics$Collage.rect,
      $Basics.toFloat(w),
      $Basics.toFloat(h))))]));
   });
   var display = F5(function (state,
   gauge,
   w,
   h,
   mx) {
      return $Graphics$Element.layers(_L.append(_L.fromArray([A2(background,
                                                             w,
                                                             h)
                                                             ,A3($Graphics$Collage.collage,
                                                             w,
                                                             h,
                                                             $Leaf.plotPoints(state.leafState.points))
                                                             ,statusLine(state)]),
      A4(gaugeForm,state,w,h,mx)));
   });
   var State = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,dx: c
             ,leafState: a
             ,mouseDown: b
             ,pointsPerFrame: d};
   });
   var MouseMove = function (a) {
      return {ctor: "MouseMove"
             ,_0: a};
   };
   var MouseDown = function (a) {
      return {ctor: "MouseDown"
             ,_0: a};
   };
   var MouseUp = function (a) {
      return {ctor: "MouseUp"
             ,_0: a};
   };
   var TimeTick = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "TimeTick"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var inputSignal = $Signal.merges(_L.fromArray([A2($Signal._op["~"],
                                                 A2($Signal._op["~"],
                                                 A2($Signal._op["~"],
                                                 A2($Signal._op["<~"],
                                                 TimeTick,
                                                 $Time.fps(5)),
                                                 $Mouse.x),
                                                 $Window.width),
                                                 $Window.height)
                                                 ,A2($Signal._op["~"],
                                                 A2($Signal._op["<~"],
                                                 function (mouseDown) {
                                                    return mouseDown ? MouseDown : MouseUp;
                                                 },
                                                 $Mouse.isDown),
                                                 $Mouse.x)]));
   var initialPointsPerFrame = 4000;
   var initialState = A4(State,
   $Leaf.initialState,
   false,
   500,
   initialPointsPerFrame);
   var threshold = 1000;
   var nextState = F2(function (event,
   oldState) {
      return function () {
         switch (event.ctor)
         {case "MouseDown":
            return _U.eq(oldState.mouseDown,
              false) ? _U.replace([["mouseDown"
                                   ,true]
                                  ,["leafState"
                                   ,$Leaf.initialState]
                                  ,["pointsPerFrame"
                                   ,initialPointsPerFrame]],
              oldState) : oldState;
            case "MouseUp":
            return _U.eq(oldState.mouseDown,
              true) ? _U.replace([["mouseDown"
                                  ,false]
                                 ,["dx",event._0]],
              oldState) : oldState;
            case "TimeTick":
            return function () {
                 var d2 = A2($Debug.watch,
                 "pointsPerFrame",
                 oldState.pointsPerFrame);
                 var d1 = A2($Debug.watch,
                 "tim",
                 event._0);
                 return oldState.mouseDown ? _U.replace([["leafState"
                                                         ,A3($Leaf.nextState,
                                                         A2($Gauge.gaugeValue,
                                                         event._2,
                                                         event._1),
                                                         200,
                                                         $Leaf.initialState)]],
                 oldState) : _U.cmp(event._0,
                 threshold) > 0 ? _U.replace([["pointsPerFrame"
                                              ,oldState.pointsPerFrame / 2 | 0]],
                 oldState) : _U.replace([["leafState"
                                         ,A3($Leaf.nextState,
                                         A2($Gauge.gaugeValue,
                                         event._2,
                                         oldState.dx),
                                         oldState.pointsPerFrame,
                                         oldState.leafState)]],
                 oldState);
              }();}
         _E.Case($moduleName,
         "between lines 41 and 66");
      }();
   });
   var currentState = A3($Signal.foldp,
   nextState,
   initialState,
   inputSignal);
   var main = A2($Signal._op["~"],
   A2($Signal._op["~"],
   A2($Signal._op["~"],
   A2($Signal._op["~"],
   A2($Signal._op["<~"],
   display,
   currentState),
   $Gauge.main),
   $Window.width),
   $Window.height),
   $Mouse.x);
   _elm.Main.values = {_op: _op
                      ,threshold: threshold
                      ,initialPointsPerFrame: initialPointsPerFrame
                      ,TimeTick: TimeTick
                      ,MouseUp: MouseUp
                      ,MouseDown: MouseDown
                      ,MouseMove: MouseMove
                      ,State: State
                      ,initialState: initialState
                      ,nextState: nextState
                      ,background: background
                      ,statusInfo: statusInfo
                      ,statusLine: statusLine
                      ,gaugeForm: gaugeForm
                      ,display: display
                      ,inputSignal: inputSignal
                      ,currentState: currentState
                      ,main: main};
   return _elm.Main.values;
};Elm.Gauge = Elm.Gauge || {};
Elm.Gauge.make = function (_elm) {
   "use strict";
   _elm.Gauge = _elm.Gauge || {};
   if (_elm.Gauge.values)
   return _elm.Gauge.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Gauge",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Graphics$Collage = Elm.Graphics.Collage.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Mouse = Elm.Mouse.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Text = Elm.Text.make(_elm),
   $Time = Elm.Time.make(_elm),
   $Window = Elm.Window.make(_elm);
   var delta = $Time.fps(10);
   var getRoundedValue = function (x) {
      return $Basics.toFloat($Basics.round(x * 10)) / 10;
   };
   var gaugeValue = F2(function (w,
   x) {
      return $Basics.min(1)($Basics.max(0)($Basics.toFloat(x) / ($Basics.toFloat(w) - 100)));
   });
   var gauge = F2(function (_v0,
   x) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return function () {
                 var val = getRoundedValue(A2(gaugeValue,
                 _v0._0,
                 x));
                 var hh = $Basics.toFloat(_v0._1) / 2;
                 var y1 = hh - 50;
                 var y2 = hh - 50;
                 var hw = $Basics.toFloat(_v0._0) / 2;
                 var x1 = 0 - hw + 50;
                 var x2 = hw - 50;
                 var mx = $Basics.min(x2)(A2($Basics.max,
                 x1,
                 $Basics.toFloat(x) - hw));
                 return _L.fromArray([$Graphics$Collage.filled($Color.red)($Graphics$Collage.polygon(_L.fromArray([{ctor: "_Tuple2"
                                                                                                                   ,_0: x1
                                                                                                                   ,_1: y1 - 2}
                                                                                                                  ,{ctor: "_Tuple2"
                                                                                                                   ,_0: x2
                                                                                                                   ,_1: y2 - 2}
                                                                                                                  ,{ctor: "_Tuple2"
                                                                                                                   ,_0: x2
                                                                                                                   ,_1: y2 + 2}
                                                                                                                  ,{ctor: "_Tuple2"
                                                                                                                   ,_0: x1
                                                                                                                   ,_1: y1 + 2}])))
                                     ,$Graphics$Collage.move({ctor: "_Tuple2"
                                                             ,_0: mx
                                                             ,_1: y1})($Graphics$Collage.filled($Color.red)($Graphics$Collage.circle(10)))
                                     ,$Graphics$Collage.move({ctor: "_Tuple2"
                                                             ,_0: mx
                                                             ,_1: y1 + 20})($Graphics$Collage.toForm($Text.leftAligned(A2($Text.style,
                                     _U.replace([["color"
                                                 ,$Color.red]],
                                     $Text.defaultStyle),
                                     $Text.toText($String.show(val))))))]);
              }();}
         _E.Case($moduleName,
         "between lines 45 and 57");
      }();
   });
   var display = F2(function (_v4,
   gaugeState) {
      return function () {
         switch (_v4.ctor)
         {case "_Tuple2":
            return A3($Graphics$Collage.collage,
              _v4._0,
              _v4._1,
              gaugeState.mouseDown ? A2(gauge,
              {ctor: "_Tuple2"
              ,_0: _v4._0
              ,_1: _v4._1},
              gaugeState.x) : _L.fromArray([]));}
         _E.Case($moduleName,
         "between lines 60 and 61");
      }();
   });
   var stepGauge = F2(function (_v8,
   gaugeState) {
      return function () {
         return function () {
            var _v10 = _v8.userInput;
            switch (_v10.ctor)
            {case "MouseDown":
               return _U.replace([["x",_v10._0]
                                 ,["mouseDown",true]],
                 gaugeState);
               case "MouseMove":
               return _U.replace([["x"
                                  ,_v10._0]],
                 gaugeState);
               case "MouseUp":
               return _U.replace([["x",_v10._0]
                                 ,["mouseDown",false]],
                 gaugeState);}
            _E.Case($moduleName,
            "between lines 29 and 34");
         }();
      }();
   });
   var defaultGauge = {_: {}
                      ,mouseDown: false
                      ,x: 0};
   var State = F2(function (a,b) {
      return {_: {}
             ,mouseDown: b
             ,x: a};
   });
   var GaugeInput = F2(function (a,
   b) {
      return {_: {}
             ,timeDelta: a
             ,userInput: b};
   });
   var MouseMove = function (a) {
      return {ctor: "MouseMove"
             ,_0: a};
   };
   var MouseDown = function (a) {
      return {ctor: "MouseDown"
             ,_0: a};
   };
   var MouseUp = function (a) {
      return {ctor: "MouseUp"
             ,_0: a};
   };
   var userInput = $Signal.merges(_L.fromArray([A2($Signal._op["<~"],
                                               MouseMove,
                                               $Mouse.x)
                                               ,A2($Signal._op["~"],
                                               A2($Signal._op["<~"],
                                               function (mouseDown) {
                                                  return mouseDown ? MouseDown : MouseUp;
                                               },
                                               $Mouse.isDown),
                                               $Mouse.x)]));
   var input = A2($Signal.sampleOn,
   delta,
   A3($Signal.lift2,
   GaugeInput,
   delta,
   userInput));
   var gaugeState = A3($Signal.foldp,
   stepGauge,
   defaultGauge,
   input);
   var main = function () {
      var _ = A2($Debug.watch,
      "gs",
      gaugeState);
      return A3($Signal.lift2,
      display,
      $Window.dimensions,
      gaugeState);
   }();
   _elm.Gauge.values = {_op: _op
                       ,MouseUp: MouseUp
                       ,MouseDown: MouseDown
                       ,MouseMove: MouseMove
                       ,userInput: userInput
                       ,GaugeInput: GaugeInput
                       ,State: State
                       ,defaultGauge: defaultGauge
                       ,stepGauge: stepGauge
                       ,gaugeValue: gaugeValue
                       ,getRoundedValue: getRoundedValue
                       ,gauge: gauge
                       ,display: display
                       ,delta: delta
                       ,input: input
                       ,gaugeState: gaugeState
                       ,main: main};
   return _elm.Gauge.values;
};Elm.Leaf = Elm.Leaf || {};
Elm.Leaf.make = function (_elm) {
   "use strict";
   _elm.Leaf = _elm.Leaf || {};
   if (_elm.Leaf.values)
   return _elm.Leaf.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Leaf",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Generator = Elm.Generator.make(_elm),
   $Generator$Standard = Elm.Generator.Standard.make(_elm),
   $Graphics$Collage = Elm.Graphics.Collage.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $IntRange = Elm.IntRange.make(_elm),
   $List = Elm.List.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Window = Elm.Window.make(_elm);
   var transformStep = F3(function (_v0,
   gen0,
   dx) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return function () {
                 var $ = $Generator.int32(gen0),
                 rnd32 = $._0,
                 gen1 = $._1;
                 var rnd = A2($Basics._op["%"],
                 rnd32,
                 100);
                 var nextXY = _U.cmp(rnd,
                 15) > 0 ? {ctor: "_Tuple2"
                           ,_0: dx * _v0._0 + (1 - dx) * _v0._1
                           ,_1: (0 - (1 - dx)) * _v0._0 + dx * _v0._1 + 0.169} : _U.cmp(rnd,
                 8) > 0 ? {ctor: "_Tuple2"
                          ,_0: -0.141 * _v0._0 + 0.302 * _v0._1
                          ,_1: 0.302 * _v0._0 + 0.141 * _v0._1 + 0.127} : _U.cmp(rnd,
                 1) > 0 ? {ctor: "_Tuple2"
                          ,_0: 0.141 * _v0._0 - 0.302 * _v0._1
                          ,_1: 0.302 * _v0._0 + 0.141 * _v0._1 + 0.169} : {ctor: "_Tuple2"
                                                                          ,_0: 0
                                                                          ,_1: 0.175337 * _v0._1};
                 return {ctor: "_Tuple2"
                        ,_0: nextXY
                        ,_1: gen1};
              }();}
         _E.Case($moduleName,
         "between lines 42 and 49");
      }();
   });
   var nextState = F3(function (dx,
   num,
   initState) {
      return function () {
         var addPoints = F3(function (dx,
         _v4,
         acc) {
            return function () {
               return function () {
                  var $ = A3(transformStep,
                  $List.head(acc.points),
                  acc.gen,
                  dx),
                  pos = $._0,
                  nGen = $._1;
                  return _U.replace([["points"
                                     ,A2($List._op["::"],
                                     pos,
                                     acc.points)]
                                    ,["gen",nGen]],
                  acc);
               }();
            }();
         });
         return A3($IntRange.foldl,
         addPoints(dx),
         initState,
         A2($IntRange.to,0,num));
      }();
   });
   var State = F2(function (a,b) {
      return {_: {}
             ,gen: b
             ,points: a};
   });
   var randomSeed = 12346789;
   var initialState = A2(State,
   _L.fromArray([{ctor: "_Tuple2"
                 ,_0: 0
                 ,_1: 0}]),
   $Generator$Standard.generator(randomSeed));
   var sidaHeight = 500;
   var sidaWidth = 500;
   var plotPoints = $List.map(function (_v6) {
      return function () {
         switch (_v6.ctor)
         {case "_Tuple2":
            return $Graphics$Collage.move({ctor: "_Tuple2"
                                          ,_0: _v6._0 * sidaWidth
                                          ,_1: _v6._1 * sidaHeight - sidaHeight / 2})($Graphics$Collage.filled($Color.green)($Graphics$Collage.square(1)));}
         _E.Case($moduleName,
         "on line 55, column 29 to 101");
      }();
   });
   var drawLeaf = F2(function (dx,
   num) {
      return plotPoints(A3(nextState,
      dx,
      num,
      initialState).points);
   });
   var main = function () {
      var disp = function (_v10) {
         return function () {
            switch (_v10.ctor)
            {case "_Tuple2":
               return A3($Graphics$Collage.collage,
                 _v10._0,
                 _v10._1,
                 A2(drawLeaf,0.84,1000));}
            _E.Case($moduleName,
            "on line 64, column 25 to 56");
         }();
      };
      return A2($Signal._op["<~"],
      disp,
      $Window.dimensions);
   }();
   _elm.Leaf.values = {_op: _op
                      ,initialState: initialState
                      ,nextState: nextState
                      ,plotPoints: plotPoints
                      ,main: main
                      ,State: State};
   return _elm.Leaf.values;
};Elm.Generator = Elm.Generator || {};
Elm.Generator.Standard = Elm.Generator.Standard || {};
Elm.Generator.Standard.make = function (_elm) {
   "use strict";
   _elm.Generator = _elm.Generator || {};
   _elm.Generator.Standard = _elm.Generator.Standard || {};
   if (_elm.Generator.Standard.values)
   return _elm.Generator.Standard.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Generator.Standard",
   $Basics = Elm.Basics.make(_elm),
   $Generator = Elm.Generator.make(_elm);
   var magicNum8 = 2147483562;
   var stdRange = function (_v0) {
      return function () {
         return {ctor: "_Tuple2"
                ,_0: 0
                ,_1: magicNum8};
      }();
   };
   var magicNum7 = 2137383399;
   var magicNum6 = 2147483563;
   var magicNum5 = 3791;
   var magicNum4 = 40692;
   var magicNum3 = 52774;
   var magicNum2 = 12211;
   var magicNum1 = 53668;
   var magicNum0 = 40014;
   var Standard = F2(function (a,
   b) {
      return {ctor: "Standard"
             ,_0: a
             ,_1: b};
   });
   var mkStdGen = function (s$) {
      return function () {
         var s = A2($Basics.max,
         s$,
         0 - s$);
         var q = s / (magicNum6 - 1) | 0;
         var s2 = A2($Basics._op["%"],
         q,
         magicNum7 - 1);
         var s1 = A2($Basics._op["%"],
         s,
         magicNum6 - 1);
         return A2(Standard,
         s1 + 1,
         s2 + 1);
      }();
   };
   var stdNext = function (_v2) {
      return function () {
         switch (_v2.ctor)
         {case "Standard":
            return function () {
                 var k$ = _v2._1 / magicNum3 | 0;
                 var s2$ = magicNum4 * (_v2._1 - k$ * magicNum3) - k$ * magicNum5;
                 var s2$$ = _U.cmp(s2$,
                 0) < 0 ? s2$ + magicNum7 : s2$;
                 var k = _v2._0 / magicNum1 | 0;
                 var s1$ = magicNum0 * (_v2._0 - k * magicNum1) - k * magicNum2;
                 var s1$$ = _U.cmp(s1$,
                 0) < 0 ? s1$ + magicNum6 : s1$;
                 var z = s1$$ - s2$$;
                 var z$ = _U.cmp(z,
                 1) < 0 ? z + magicNum8 : z;
                 return {ctor: "_Tuple2"
                        ,_0: z$
                        ,_1: A2(Standard,s1$$,s2$$)};
              }();}
         _E.Case($moduleName,
         "between lines 58 and 66");
      }();
   };
   var stdSplit = function (_v6) {
      return function () {
         switch (_v6.ctor)
         {case "Standard":
            return function () {
                 var _raw = $Basics.snd(stdNext(_v6)),
                 $ = _raw.ctor === "Standard" ? _raw : _E.Case($moduleName,
                 "on line 72, column 28 to 44"),
                 t1 = $._0,
                 t2 = $._1;
                 var new_s2 = _U.eq(_v6._1,
                 1) ? magicNum7 - 1 : _v6._1 - 1;
                 var new_s1 = _U.eq(_v6._0,
                 magicNum6 - 1) ? 1 : _v6._0 + 1;
                 return {ctor: "_Tuple2"
                        ,_0: A2(Standard,new_s1,t2)
                        ,_1: A2(Standard,t1,new_s2)};
              }();}
         _E.Case($moduleName,
         "between lines 70 and 73");
      }();
   };
   var generator = function (seed) {
      return A4($Generator.Generator,
      mkStdGen(seed),
      stdNext,
      stdSplit,
      stdRange);
   };
   _elm.Generator.Standard.values = {_op: _op
                                    ,generator: generator};
   return _elm.Generator.Standard.values;
};Elm.Generator = Elm.Generator || {};
Elm.Generator.make = function (_elm) {
   "use strict";
   _elm.Generator = _elm.Generator || {};
   if (_elm.Generator.values)
   return _elm.Generator.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Generator",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm);
   var Generator = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,next: b
             ,range: d
             ,split: c
             ,state: a};
   });
   var listOfHelp = F4(function (list,
   generate,
   n,
   generator) {
      return _U.cmp(n,
      1) < 0 ? {ctor: "_Tuple2"
               ,_0: $List.reverse(list)
               ,_1: generator} : function () {
         var $ = generate(generator),
         value = $._0,
         generator$ = $._1;
         return A4(listOfHelp,
         A2($List._op["::"],value,list),
         generate,
         n - 1,
         generator$);
      }();
   });
   var listOf = listOfHelp(_L.fromArray([]));
   var minInt32 = -2147483648;
   var maxInt32 = 2147483647;
   var iLogBase = F2(function (b,
   i) {
      return _U.cmp(i,
      b) < 0 ? 1 : 1 + A2(iLogBase,
      b,
      i / b | 0);
   });
   var int32Range = F2(function (_v0,
   generator) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return _U.cmp(_v0._0,
              _v0._1) > 0 ? A2(int32Range,
              {ctor: "_Tuple2"
              ,_0: _v0._1
              ,_1: _v0._0},
              generator) : function () {
                 var b = 2147483561;
                 var f = F3(function (n,
                 acc,
                 state) {
                    return function () {
                       switch (n)
                       {case 0: return {ctor: "_Tuple2"
                                       ,_0: acc
                                       ,_1: state};}
                       return function () {
                          var $ = generator.next(state),
                          x = $._0,
                          state$ = $._1;
                          return A3(f,
                          n - 1,
                          x + acc * b,
                          state$);
                       }();
                    }();
                 });
                 var k = _v0._1 - _v0._0 + 1;
                 var n = A2(iLogBase,b,k);
                 var $ = A3(f,
                 n,
                 1,
                 generator.state),
                 v = $._0,
                 state$ = $._1;
                 return {ctor: "_Tuple2"
                        ,_0: _v0._0 + A2($Basics._op["%"],
                        v,
                        k)
                        ,_1: _U.replace([["state"
                                         ,state$]],
                        generator)};
              }();}
         _E.Case($moduleName,
         "between lines 73 and 86");
      }();
   });
   var floatRange = F2(function (_v5,
   generator) {
      return function () {
         switch (_v5.ctor)
         {case "_Tuple2":
            return _U.cmp(_v5._0,
              _v5._1) > 0 ? A2(floatRange,
              {ctor: "_Tuple2"
              ,_0: _v5._1
              ,_1: _v5._0},
              generator) : function () {
                 var $ = A2(int32Range,
                 {ctor: "_Tuple2"
                 ,_0: minInt32
                 ,_1: maxInt32},
                 generator),
                 x = $._0,
                 generator$ = $._1;
                 var scaled = (_v5._0 + _v5._1) / 2 + (_v5._1 - _v5._0) / $Basics.toFloat(maxInt32 - minInt32) * $Basics.toFloat(x);
                 return {ctor: "_Tuple2"
                        ,_0: scaled
                        ,_1: generator$};
              }();}
         _E.Case($moduleName,
         "between lines 117 and 122");
      }();
   });
   var $float = floatRange({ctor: "_Tuple2"
                           ,_0: 0
                           ,_1: 1});
   var int32 = int32Range({ctor: "_Tuple2"
                          ,_0: minInt32
                          ,_1: maxInt32});
   _elm.Generator.values = {_op: _op
                           ,int32: int32
                           ,int32Range: int32Range
                           ,$float: $float
                           ,floatRange: floatRange
                           ,listOf: listOf
                           ,minInt32: minInt32
                           ,maxInt32: maxInt32
                           ,Generator: Generator};
   return _elm.Generator.values;
};Elm.IntRange = Elm.IntRange || {};
Elm.IntRange.make = function (_elm) {
   "use strict";
   _elm.IntRange = _elm.IntRange || {};
   if (_elm.IntRange.values)
   return _elm.IntRange.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "IntRange",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Trampoline = Elm.Trampoline.make(_elm);
   var zipWith$ = F5(function (func,
   list,
   start,
   end,
   result) {
      return _U.cmp(start,
      end) > 0 ? $Trampoline.Done(result) : $Trampoline.Continue(function (_v0) {
         return function () {
            switch (_v0.ctor)
            {case "_Tuple0":
               return A5(zipWith$,
                 func,
                 $List.tail(list),
                 start + 1,
                 end,
                 A2($List._op["::"],
                 A2(func,$List.head(list),start),
                 result));}
            _E.Case($moduleName,
            "on line 90, column 41 to 114");
         }();
      });
   });
   var zipWith = F3(function (func,
   list,
   _v2) {
      return function () {
         switch (_v2.ctor)
         {case "IntRange":
            return function () {
                 var listLen = $List.length(list);
                 var rangeLen = _v2._1 - _v2._0 + 1;
                 return $List.reverse($Trampoline.trampoline(_U.cmp(rangeLen,
                 listLen) > 0 ? A5(zipWith$,
                 func,
                 list,
                 _v2._0,
                 _v2._0 + listLen - 1,
                 _L.fromArray([])) : _U.cmp(rangeLen,
                 listLen) < 0 ? A5(zipWith$,
                 func,
                 A2($List.take,rangeLen,list),
                 _v2._0,
                 _v2._1,
                 _L.fromArray([])) : A5(zipWith$,
                 func,
                 list,
                 _v2._0,
                 _v2._1,
                 _L.fromArray([]))));
              }();}
         _E.Case($moduleName,
         "between lines 80 and 85");
      }();
   });
   var zip = F2(function (list,
   range) {
      return A3(zipWith,
      F2(function (v0,v1) {
         return {ctor: "_Tuple2"
                ,_0: v0
                ,_1: v1};
      }),
      list,
      range);
   });
   var foldr$ = F4(function (func,
   acc,
   start,
   end) {
      return _U.cmp(start,
      end) > 0 ? $Trampoline.Done(acc) : $Trampoline.Continue(function (_v6) {
         return function () {
            switch (_v6.ctor)
            {case "_Tuple0":
               return A4(foldr$,
                 func,
                 A2(func,end,acc),
                 start,
                 end - 1);}
            _E.Case($moduleName,
            "on line 58, column 41 to 80");
         }();
      });
   });
   var foldr = F3(function (func,
   acc,
   _v8) {
      return function () {
         switch (_v8.ctor)
         {case "IntRange":
            return $Trampoline.trampoline(A4(foldr$,
              func,
              acc,
              _v8._0,
              _v8._1));}
         _E.Case($moduleName,
         "on line 53, column 39 to 80");
      }();
   });
   var map = F2(function (func,
   range) {
      return A3(foldr,
      F2(function (it,acc) {
         return A2($List._op["::"],
         func(it),
         acc);
      }),
      _L.fromArray([]),
      range);
   });
   var toList = function (range) {
      return A2(map,
      function (x) {
         return x;
      },
      range);
   };
   var foldl$ = F4(function (func,
   acc,
   start,
   end) {
      return _U.cmp(start,
      end) > 0 ? $Trampoline.Done(acc) : $Trampoline.Continue(function (_v12) {
         return function () {
            switch (_v12.ctor)
            {case "_Tuple0":
               return A4(foldl$,
                 func,
                 A2(func,start,acc),
                 start + 1,
                 end);}
            _E.Case($moduleName,
            "on line 49, column 41 to 83");
         }();
      });
   });
   var foldl = F3(function (func,
   acc,
   _v14) {
      return function () {
         switch (_v14.ctor)
         {case "IntRange":
            return $Trampoline.trampoline(A4(foldl$,
              func,
              acc,
              _v14._0,
              _v14._1));}
         _E.Case($moduleName,
         "on line 44, column 39 to 80");
      }();
   });
   var IntRange = F2(function (a,
   b) {
      return {ctor: "IntRange"
             ,_0: a
             ,_1: b};
   });
   var to = F2(function (a,b) {
      return A2(IntRange,a,b);
   });
   _elm.IntRange.values = {_op: _op
                          ,zipWith: zipWith
                          ,zip: zip
                          ,toList: toList
                          ,to: to
                          ,map: map
                          ,foldr: foldr
                          ,foldl: foldl};
   return _elm.IntRange.values;
};