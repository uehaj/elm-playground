Elm.PortTest = Elm.PortTest || {};
Elm.PortTest.make = function (_elm) {
   "use strict";
   _elm.PortTest = _elm.PortTest || {};
   if (_elm.PortTest.values)
   return _elm.PortTest.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "PortTest";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Graphics.Input || {};
   Graphics.Input.Field = Elm.Graphics.Input.Field.make(_elm);
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
   var _op = {};
   var evalIn = Native.Ports.portIn("evalIn",
   Native.Ports.incomingSignal(function (v) {
      return typeof v === "string" || typeof v === "object" && v instanceof String ? v : _E.raise("invalid input, expecting JSString but got " + v);
   }));
   var btnInp = Graphics.Input.input("new Date()");
   var btn = function (fldCont) {
      return A3(Graphics.Input.button,
      btnInp.handle,
      fldCont.string,
      "Eval");
   };
   var evalOut = Native.Ports.portOut("evalOut",
   Native.Ports.outgoingSignal(function (v) {
      return v;
   }),
   btnInp.signal);
   var inp = Graphics.Input.input(Graphics.Input.Field.noContent);
   var fld = function (fldCont) {
      return A5(Graphics.Input.Field.field,
      Graphics.Input.Field.defaultStyle,
      inp.handle,
      Basics.id,
      "JSの式を入力して下さい",
      fldCont);
   };
   var main = function () {
      var disp = F2(function (cont,
      bname) {
         return A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([fld(cont)
                      ,btn(cont)
                      ,Text.plainText(bname)]));
      });
      return A2(Signal._op["~"],
      A2(Signal._op["<~"],
      disp,
      inp.signal),
      evalIn);
   }();
   _elm.PortTest.values = {_op: _op
                          ,inp: inp
                          ,btnInp: btnInp
                          ,fld: fld
                          ,btn: btn
                          ,main: main};
   return _elm.PortTest.values;
};