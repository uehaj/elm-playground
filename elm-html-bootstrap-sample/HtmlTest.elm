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

linkTo txt url = node "a" ["href":=url] [] [text txt]
buttonLinkTo txt url = node "a" ["href":=url,"className":="btn btn-primary btn-lg"] [] [text txt]

body : [(Int,Int)] -> Html
body dat = node "div" ["className":="navbar navbar-default navbar-fixed-top"] ["padding-top":= px 10] [
         node "div" ["className":="container"] [] [
           node "div" ["className":="jumbotron"] []
             [ node "h1" [] [] [ text "Elm/Twitter Bootstrap" ]
             , node "p" [] [] [ "Elm-html" `linkTo` "https://github.com/evancz/elm-html"
                              , text "で"
                              , "Twitter bootstrap" `linkTo` "http://getbootstrap.com/" 
                              , text "連携しています。"]
             , node "p" [] []
             [ "もっと学ぼう" `buttonLinkTo` "http://elm-lang.org/"
             , "ソースコード" `buttonLinkTo` "HtmlTest.elm"
             ]
           ]
           , tbl dat
         ]
       ]

display : [(Int, Int)] -> Element
display list = body list |> toElement 200 200

main : Signal Element
main = display <~ foldp (\it acc -> take 10 (it :: acc)) [] Mouse.position
