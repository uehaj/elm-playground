-- http://nabetani.sakura.ne.jp/hena/ord24eliseq/
module Filter where
import Lazy.Stream as S
import String (toList, fromList)
import Graphics.Input.Field as F
import Graphics.Input (Input,input,dropDown)
import Char (toCode)
import Maybe
import Debug (log)

-- 無限長の自然数ストリーム
naturals : S.Stream Int
naturals = S.iterate (\it -> it+1) 1

-- 初期リスト
init : Maybe (S.Stream Int)
init = Just naturals

-- 入力文字に対応する各段階のフィルタとなる関数群
filter_n : Int -> S.Stream a -> S.Stream a
filter_n n stream = S.map snd (S.filter (\(a,b)->(a `mod` n) /= 0) (S.zip naturals stream)) -- 2〜9 の倍数番目を撤去(先頭が1番目であることに注意)

isSquare n=any (\x->n==x*x) [1..n `div` 2+1]
filter_S : S.Stream Int -> S.Stream Int
filter_S x = S.zip x (S.cons 0 (\_->x)) |> S.filter (\(a,b)->not (isSquare b)) |> S.map fst -- 平方数の次を撤去

filter_s : S.Stream Int -> S.Stream Int
filter_s x = S.zip x (S.tail x) |> S.filter (\(a,b)->not (isSquare b)) |> S.map fst -- 平方数の直前を撤去

isCubed n=any (\x->n==x*x*x) [1..n `div` 2+1]
filter_C : S.Stream Int -> S.Stream Int
filter_C x = S.zip x (S.cons 0 (\_->x)) |> S.filter (\(a,b)->not (isCubed b)) |> S.map fst -- 立方数の直後を撤去

filter_c : S.Stream Int -> S.Stream Int
filter_c x = S.zip x (S.tail x) |> S.filter (\(a,b)->not (isCubed b)) |> S.map fst -- 立方数の直前を撤去

filter_h : S.Stream a -> S.Stream a
filter_h = S.drop 100 -- 先頭の100件を撤去

char2func : Char -> Maybe (S.Stream Int) -> Maybe (S.Stream Int)
char2func ch maybeStream =
    case maybeStream of
      Just stream -> if | '2'<=ch && ch<='9' -> Just (filter_n (toCode(ch)-toCode('0')) stream)
                        | ch == 'c' -> Just (filter_c stream)
                        | ch == 'C' -> Just (filter_C stream)
                        | ch == 's' -> Just (filter_s stream)
                        | ch == 'S' -> Just (filter_S stream)
                        | ch == 'h' -> Just (filter_h stream)
                        | otherwise -> Nothing
      Nothing -> Nothing

-- 対応するフィルタ群を取得してfoldlで合成したものに初期リストを適用して結果を得る
solve : String -> Maybe (S.Stream Int)
solve s = foldl (\ch acc -> char2func ch acc) init (toList s)

-- フィルタ適用の各段階を表示する
dispResultStep : Int -> (a, String) -> Element
dispResultStep siz (ch, str) = flow down [flow right [asText ch, plainText "↓"]
                                         , solve str |> maybe (plainText "undefined") (asText . S.take siz) ]

-- フィルタ適用の全段階を表示する
dispResultSteps : Int -> String -> [Element]
dispResultSteps siz xs = zip (toList xs) (allSteps xs) |> map (dispResultStep siz)

-- フィルタ適用の途中段階用の入力文字列を生成
-- allSteps ["abc"] == ["a","ab","abc"]
allSteps : String -> [String]
allSteps x = let steps i x = map (\it -> fromList(i::(toList it))) x
             in foldr (\i acc -> [(fromList [i])] ++ (steps i acc))
                      []
                      (toList x)

-- 入力文字列
filterString : Input F.Content
filterString = input F.noContent

-- 入力文字列フィールド
filterField : F.Content -> Element
filterField fldCont = F.field F.defaultStyle filterString.handle id "記号列を入力" fldCont

-- 結果の幅
resultLength : Input Int
resultLength = input 10

-- 結果の幅フィールド
resultLengthField : Element
resultLengthField = dropDown resultLength.handle [ ("10", 10), ("20", 20) ]

desc : Element
desc = [markdown|
[オフラインどう書く過去問題](http://yhpg.doorkeeper.jp/)[#24 多段階選抜](http://nabetani.sakura.ne.jp/hena/ord24eliseq/)
<table border>
<tr><th>記号<th>意味</tr>
<tr><td>2〜9<td>2〜9 の倍数番目を撤去(先頭が1番目であることに注意)</tr>
<tr><td>S<td>平方数の次を撤去</tr>
<tr><td>s<td>平方数の直前を撤去</tr>
<tr><td>C<td>立方数の直後を撤去</tr>
<tr><td>c<td>立方数の直前を撤去</tr>
<tr><td>h<td>先頭の100件を撤去</tr>
</table>
<br>
|]

-- 画面を構築
-- see:https://github.com/elm-lang/Elm/issues/523
main = let disp xs siz = flow down [ desc
                                   , (filterField xs `beside` plainText "長さ" `beside` resultLengthField)
                                   , (naturals |> S.take siz |> asText)
                                   , flow down (dispResultSteps siz xs.string) ]
       in disp <~ filterString.signal ~ resultLength.signal
