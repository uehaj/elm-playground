Elm.Leaf = Elm.Leaf || {};
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
                      ,plotPoints: plotPoints
                      ,nextState: nextState
                      ,main: main
                      ,initialState: initialState};
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
         "between lines 59 and 67");
      }();
   };
   var stdSplit = function (_v6) {
      return function () {
         switch (_v6.ctor)
         {case "Standard":
            return function () {
                 var _raw = $Basics.snd(stdNext(_v6)),
                 $ = _raw.ctor === "Standard" ? _raw : _E.Case($moduleName,
                 "on line 73, column 28 to 44"),
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
         "between lines 71 and 74");
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
                                    ,generator: generator
                                    ,Standard: Standard
                                    ,mkStdGen: mkStdGen
                                    ,magicNum0: magicNum0
                                    ,magicNum1: magicNum1
                                    ,magicNum2: magicNum2
                                    ,magicNum3: magicNum3
                                    ,magicNum4: magicNum4
                                    ,magicNum5: magicNum5
                                    ,magicNum6: magicNum6
                                    ,magicNum7: magicNum7
                                    ,magicNum8: magicNum8
                                    ,stdNext: stdNext
                                    ,stdSplit: stdSplit
                                    ,stdRange: stdRange};
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
         "between lines 76 and 89");
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
         "between lines 120 and 125");
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
                           ,iLogBase: iLogBase
                           ,maxInt32: maxInt32
                           ,minInt32: minInt32
                           ,$float: $float
                           ,floatRange: floatRange
                           ,listOf: listOf
                           ,listOfHelp: listOfHelp
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