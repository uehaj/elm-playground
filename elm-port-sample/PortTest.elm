module PortTest where

import Graphics.Input (button, input, Input)
import Graphics.Input.Field as F

inp : Input F.Content
inp = input F.noContent

btnInp : Input String
btnInp = input "new Date()"

fld fldCont = F.field F.defaultStyle inp.handle id "JSの式を入力して下さい" fldCont
btn fldCont = button btnInp.handle fldCont.string "Eval"

port evalIn : Signal String

port evalOut : Signal String
port evalOut = btnInp.signal

main : Signal Element
main = let disp cont bname = flow down [fld cont, btn cont, plainText bname]
       in disp <~ inp.signal ~ evalIn
