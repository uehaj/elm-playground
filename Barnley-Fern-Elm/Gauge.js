Elm.Gauge = Elm.Gauge || {};
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
};