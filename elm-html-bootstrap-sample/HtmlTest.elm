module HtmlTest where

import Html (..)
import Mouse

data2line : (Int,Int) -> Html
data2line (x,y) = node "tr" [] []
         [ node "td" [] [] [text <| show x]
         , node "td" [] [] [text <| show y]
         ]

tbl : [(Int,Int)] -> Html
tbl dat = node "table" ["className" := "table table-striped table-bordered table-condensed"] []
      [ node "thead" [] [] [
          node "tr" [] []
              [ node "th" [] [] [text "Mouse X"]
              , node "th" [] [] [text "Mouse Y"]
            ]
          ]
      , node "tbody" [] []
         (map data2line dat)
      ]

body : [(Int,Int)] -> Html
body dat = node "div" ["className":="navbar navbar-default navbar-fixed-top"] ["padding-top":= px 10] [
         node "div" ["className":="container"] [] [
           node "div" ["className":="jumbotron"] [] [
             node "h1" [] [] [ text "Elm/Twitter Bootstrap" ]
             , node "p" [] [] [ node "a" ["href":="https://github.com/evancz/elm-html"] [] [text "Elm-html"]
                              , text "で"
                              , node "a" ["href":="http://getbootstrap.com/"] [] [text "Twitter bootstrap" ]
                              , text "連携しています。"]
             , node "p" [] [] [
               node "a" ["className":="btn btn-primary btn-lg", "href":="http://elm-lang.org/"] [] [ text "もっと学ぼう" ]
             ]
           ]
           , tbl dat
         ]
       ]

display : [(Int, Int)] -> Element
display list = body list |> toElement 200 200

main : Signal Element
main = display <~ foldp (\it acc -> take 10 (it :: acc)) [] Mouse.position
