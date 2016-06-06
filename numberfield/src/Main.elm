module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App as Html
import Html.Events exposing (onClick)
import String exposing (toInt)
import Platform.Cmd exposing (..)
import Platform.Sub exposing (..)


-- component import example

import Components.NumberField exposing (..)

-- APP


main : Program Never
main =
    Html.program { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Model =
    { height : Components.NumberField.Model
    , weight : Components.NumberField.Model
    }


init : ( Model, Cmd msg )
init =
    ( { height = Components.NumberField.model
      , weight = Components.NumberField.model
      }
    , Cmd.none
    )



-- UPDATE


type Msg
    = NoOp
    | HeightInput String Float
    | HeightError String String
    | WeightInput String Float
    | WeightError String String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        mheight =
            model.height

        mweight =
            model.weight
    in
        case msg of
            NoOp ->
                ( model, Cmd.none )

            HeightInput origValue n ->
                ( { model | height = { mheight | origValue = origValue, hasError = False, value = n } }, Cmd.none )

            HeightError origValue msg ->
                ( { model | height = { mheight | origValue = origValue, hasError = True, errorMessage = msg } }, Cmd.none )

            WeightInput origValue n ->
                ( { model | weight = { mweight | origValue = origValue, hasError = False, value = n } }, Cmd.none )

            WeightError origValue msg ->
                ( { model | weight = { mweight | origValue = origValue, hasError = True, errorMessage = msg } }, Cmd.none )



-- LOGIC


bmi h w =
    w / (h / 100) ^ 2



-- VIEW


bmiPanel model =
    if
        (not (model.height.value == 0 && model.weight.value == 0)
            && not model.height.hasError
            && not model.weight.hasError
        )
    then
        [ div [ class "jumbotron" ]
            [ h1 []
                [ text "BMI=", text <| toString <| bmi model.height.value model.weight.value ]
            ]
        ]
    else
        []


view : Model -> Html Msg
view model =
    div [ class "container", style [ ( "margin-top", "30px" ) ] ]
        ([ div [ class "row" ]
            [ div [ class "col-xs-12" ]
                [ inputNumber model.height "身長(cm)" HeightInput HeightError
                , inputNumber model.weight "体重(kg)" WeightInput WeightError
                ]
            ]
         ]
            ++ bmiPanel model
        )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
