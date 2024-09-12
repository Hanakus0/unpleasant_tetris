| ... | ... |
| ---- | ---- |
| 2024/09/13 | ゲームが進行出来なくなる致命的なバグを発見 → 修正 |
| 2024/09/12 | リリース |

---
# 概要
- サイトURL : https://hanakus0.github.io/unpleasant_tetris/
- リポジトリURL : https://github.com/Hanakus0/unpleasant_tetris

| ＃ | 説明 |
| ---- | ---- |
| サイト名 | 不愉快なテトリス |
| ジャンル | ゲーム |
| 制作期間 | 2024/09/10 - 2024/09/12 |
| 制作時間 | 約19時間 |
| 対応端末 | パソコンのみ・スマホ非対応 |

# 不愉快なテトリス について
## 制作背景など
### なぜテトリスなのか？
- 自分がテトリス99にハマっているいた関係で作成意欲が高かったため制作着手
- テトリスは凄く面白いがプレイする中でどこか"繰り返す作業感"が否めず、「**テトリスの作業感を可能な限り無くす**」というコンセプトを持って制作に臨んだ

## 仕様技術
- HTML
- CSS
- JavaScript (バニラ)

JavaScript を勉強していたため何か JavaScript で作品を作ってみようと考えていたため、DB やバックエンドを排除した実装を行った。<br/>
また、単純に「システムにはバックエンドありき」という考え方が普通だと思っていた中で、バックエンドが絡まない実装だとどの程度の作品が作れるのかに興味があったため。

## ゲーム内機能

| 機能 | 機能説明など |
| ---- | ---- |
| スコア表示 | 現プレイのスコアを「消したラインの数 * 100」で表示 |
| ハイスコア表示ャンル | ローカルストレージを利用。ハイスコアを更新するたびにハイスコアを上書きする形で保存。 |
| プレイ回数表示 | ローカルストレージを利用。ゲームオーバー後リトライボタンを押下する毎に記録。 |
| 前回プレイスコア表示 | ローカルストレージを利用。ゲームオーバー後リトライボタンを押下する毎に記録。 |
| テトリス妨害ギミック | 操作キーの変更、従来のテトリスでは考えられない歪な形のテトロミノの追加、テトロミノの落下速度のランダム化、ゲーム画面の暗転など |

## 機能の実装理由など
基本的にゲームに限らずだが「数値でレコードが残ること」がプレイヤーのモチベーションに繋がるという事は自明なので、思いつく限りでゲーム画面にプレイに関するレコードを表示させたいという思いがあった。</br>
その中でゲームなので「数値で表せる要素であるスコアを表示する」という点は念頭に置いてにして実装できた。

### スコア関連について
- JavaScript はローカルストレージを利用してデータをブラウザに保存できることを学習していたため利用しようと考えた
  - 学習したてな点もあって復習にもなった
  - 可能であれば他プレイヤーのスコアも表示したかったが JavaScript では不可能と分かったので諦めた
    - この点については実装ボリュームを抑えられた点、個人的に JavaScript を学習していた中で JavaScript メインで実装したかったという点を踏まえると諦めて良かったと思う

### テトリス妨害ギミック
「テトリスの作業感を無くす」というコンセプトの中で「ランダム的な要素」「ゲームプレイを不安定にする要素」を追加することで"繰り返す安定した非サプライズな作業感"を無くすことができるのではないかと考えた。<br>
総じてテトリスの難易度を急激に上げる機能となったので実装者としては満足。

1. 操作キーの変更
   - 操作感を損なわせれば不安定なゲームプレイが実現できると考えたため実装
   - カーソルキーで操作する以外に PC ならあらゆるキーを使えるのが長所なのでその点を活かせた
     - ただスマホでの操作は完全度外視せざる終えなかったのは残念
2. 従来のテトリスでは考えられない歪な形のテトロミノの追加
  - サプライズ的な要素として強く、オリジナリティが出せると考えたため
  - サイズアップのためテトロミノは 4x4 を採用
    - 結果として一長一短。変わった形のテトロミノを実装できた一方でゲームの挙動に少し変な影響を与えているのが見受けられた。
3. テトロミノの落下速度のランダム化
  - 「ランダム的な要素」「ゲームプレイを不安定にする要素」のどちらも満たす機能だと思ったため実装
  - ゲームの難易度に直結する所にランダム要素を加えられたのは良かった
4. ゲーム画面の暗転
  - 個人的に「ゲームプレイを不安定にする要素」として強いなと考えたため実装
  - 概ね満足ではあるがゲーム性を損ねすぎていると感じる

# 所感など
個人としてゲームを制作することが無かったため興味深く実装に臨めた。</br>
また、学習という面においても JavaScript を丁度学習仕立てだっため復習も兼ねての実装で大変勉強になった。</br>
何かモノを制作し切るということも達成できたため総じて今回の実装には満足。</br>
一方で、ソースコードの可読性としては最悪なので、実装しながらでもその点意識できれば思った。</br>

---
# 参考資料
- https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%88%E3%83%AA%E3%82%B9
- https://kusakarism.info/?p=11573
- https://www.youtube.com/watch?v=zKbektbiqac&list=PLa3BDwShqOrThKoaWauNo8EKZda4pat7Z&index=8
- https://tokodomo.xyz/?p=126
- https://jp-seemore.com/web/3864/#toc21
