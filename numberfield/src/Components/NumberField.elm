module Components.NumberField exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App as Html
import Html.Events exposing (..)
import String exposing (toFloat)


-- MODEL


type alias Model =
    { value : Float, origValue : String, hasError : Bool, errorMessage : String }


model : Model
model =
    { value = 0, origValue = "", hasError = False, errorMessage = "" }



-- UPDATE


type Msg
    = InputNumber String Float
    | Error String String


update : Msg -> Model -> Model
update msg model =
    case msg of
        InputNumber origValue n ->
            { model | value = n, origValue = origValue, hasError = False, errorMessage = "" }

        Error origValue err ->
            { model | origValue = origValue, hasError = True, errorMessage = err }



-- VIEW


-- inputNumber
-- Model ->                     -- model is { value : Float, origValue : String, hasError : Bool, errorMessage : String }
-- String ->                    -- label String
-- (String -> Float -> a) ->    -- result function takes (1)input field source value(String) and (2) result float value
-- (String -> String -> a) ->   -- error function takes (1)input field source value(String) and (2) error message
--  Html a

inputNumber : Model -> String -> (String -> Float -> a) -> (String -> String -> a) -> Html a
inputNumber model lab onInputHandler onErrorHandler =
    let
        onInputHandlerOnString =
            \str ->
                case String.toFloat str of
                    Ok n ->
                        onInputHandler str n

                    Err err ->
                        onErrorHandler str err
    in
        div []
            ([ fieldset [ class "form-group" ]
                [ label [] [ text lab ]
                , Html.input
                    [ type' "text"
                    , value model.origValue
                    , onInput onInputHandlerOnString
                    , class "form-control"
                    ]
                    []
                ]
             ]
                ++ if model.hasError then
                    [ div
                        [ class "alert alert-danger"
                        , attribute "role" "alert"
                        ]
                        [ span
                            [ class "glyphicon glyphicon-exclamation-sign"
                            , class "aria-hidden"
                            ]
                            []
                        , span [] [ text model.errorMessage ]
                        ]
                    ]
                   else
                    []
            )


view : Model -> Html Msg
view model =
    inputNumber model "sample" InputNumber Error


main : Program Never
main =
    Html.beginnerProgram { model = model, view = view, update = update }

