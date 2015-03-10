import Text
import Window
import Time
import Mouse
import List
import Signal
import Graphics.Element(..)
import Graphics.Collage(..)
import Color(..)
import Signal(Signal,(<~),(~))
import AnimationFrame

mousePos : Int -> Int -> Int -> Int -> (Float, Float)
mousePos x y w h = (toFloat x-(toFloat w/2)
                   , -(toFloat y)+(toFloat h/2))

star : Int-> Int -> (Int, Int) -> Form
star w h (x, y) = Text.fromString "★"
                        |> Text.color orange
                        |> Text.centered
                        |> toForm
                        |> move (mousePos x y w h)

view : List (Int, Int) -> (Int, Int) -> Element
view posList (w,h) = collage w h (List.map (star w h) posList)

stars : Signal(List (Int, Int))
stars = let 
          trace = Time.delay 100
          p1 = Signal.sampleOn AnimationFrame.frame Mouse.position
          p2 = trace p1
          p3 = trace p2
          p4 = trace p3
          p5 = trace p4
          p6 = trace p5
          p7 = trace p6
          p8 = trace p7
          p9 = trace p8
          p10 = trace p9
          p11 = trace p10
          p12 = trace p11
          p13 = trace p12
          p14 = trace p13
        in (\a b c d e f g h i j k l m n -> [a, b, c, d, e, f, g, h, i, j, k, l, m, n])
         <~ p1 ~ p2 ~ p3 ~ p4 ~ p5 ~ p6 ~ p7 ~ p8 ~ p9 ~ p10 ~ p11 ~ p12 ~ p13 ~ p14

main : Signal Element
main = view <~ stars ~ Window.dimensions
