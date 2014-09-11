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
   $Text = Elm.Text.make(_elm);
   var main = $Text.asText(function (x) {
      return x + 2;
   }(function (x) {
      return x + 1;
   }(1)));
   _elm.Main.values = {_op: _op
                      ,main: main};
   return _elm.Main.values;
};