module Main exposing (..)

import Html exposing (..)
import Html.App as App
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)
import Mouse exposing (..)
import List exposing (..)


-- MODEL


type alias Point =
    ( Int, Int )


type alias Model =
    List Point


model =
    []



-- INIT


init =
    ( [], Cmd.none )



-- UPDATE


type Msg
    = Move Int Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Move x y ->
            ( take 10 <| ( x, y ) :: model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Mouse.moves (\{ x, y } -> Move x y)



-- VIEW


stylesheetLink : String -> Html msg
stylesheetLink url =
    node "link"
        [ rel "stylesheet"
        , attribute "type" "text/css"
        , href url
        ]
        []


(:=) =
    (,)


px p =
    toString p ++ "px"


linkTo txt url =
    a [ href url ] [ text txt ]


buttonLinkTo txt url =
    a [ href url, class "btn btn-primary btn-lg" ] [ text txt ]



{- マウス座標データを一行分の<tr>に変換 -}


data2line : ( Int, Int ) -> Html msg
data2line ( x, y ) =
    tr []
        [ td [] [ text <| toString x ]
        , td [] [ text <| toString y ]
        ]



{- テーブルを作る -}


tbl : List ( Int, Int ) -> Html msg
tbl dat =
    table [ class "table table-striped table-bordered table-condensed" ]
        [ thead []
            [ tr []
                [ th [] [ text "Mouse X" ]
                , th [] [ text "Mouse Y" ]
                ]
            ]
        , tbody []
            (map data2line dat)
        ]


view : Model -> Html Msg
view model =
    div
        [ class "navbar navbar-default navbar-fixed-top"
        , style
            [ "padding-top" := px 10
            ]
        ]
        [ div [ class "container" ]
            [ div [ class "jumbotron" ]
                [ h1 [] [ text "Elm 0.17/Twitter Bootstrap" ]
                , p []
                    [ "Elm-html" `linkTo` "http://package.elm-lang.org/packages/elm-lang/html/1.0.0"
                    , text "で"
                    , "Twitter bootstrap" `linkTo` "http://getbootstrap.com/"
                    , text "連携しています。"
                    ]
                , p []
                    [ "もっと学ぼう" `buttonLinkTo` "http://elm-lang.org/"
                    , "ソースコード" `buttonLinkTo` "HtmlTest.elm"
                    , tbl model
                    ]
                ]
            ]
        ]


mainView : Model -> Html Msg
mainView model =
    div []
        [ stylesheetLink "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
        , stylesheetLink "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"
        , view model
        ]


main : Program Never
main =
    App.program { init = init, view = mainView, update = update, subscriptions = subscriptions }
