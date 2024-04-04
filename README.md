# 日報アプリ

(私の)アルバイト先での日報、作業開始メッセージを作成するためのデスクトップアプリです。


## 概要

- ひな形に沿った「日報」、「作業開始メッセージ」を生成します。
- フォームに内容を入力すると、事前に設定されたひな形に沿って文章を生成します。
- 生成された文章はクリップボードにコピーされるので、他のアプリケーションに簡単に貼り付けることができます。

## 技術スタック

- Electron: デスクトップアプリケーションフレームワーク
- Vue.js: フロントエンドフレームワーク
- TypeScript: プログラミング言語
- Web Storage API: アプリケーションデータの保存

ブラウザ上で動くWebアプリケーションで起こるブラウザタブの汚染を防ぐため、Electronを用いてデスクトップアプリケーション化しています。
また、機密データを外部に漏洩しないよう、DB等を使ってデータを大規模に保存することは行っていません。
ユーザービリティを高めるのに最低限必要なデータをWebStorageを利用して保存しています。

## 機能詳細

画面毎に実装した機能とその意図を記載します。

### トップ画面

![image](https://github.com/petaxa/DailyReport/assets/50777725/a1c668e3-e5de-41c6-9e62-0f598dbd6bbc)
この画面から各画面へ遷移します。
メインとなる「日報作成」「作業開始メッセージ作成」の画面へ遷移するボタンは大きく、その他の副次的なボタンはその半分ほどの大きさにしています。

### 日報作成画面

![image](https://github.com/petaxa/DailyReport/assets/50777725/fc87ab48-4977-4176-880c-3fb19c3b8c79)
ひな形に必要な内容を入力する入力欄があります。
いくつかの入力欄は想定される値が予め入力されています。
- 作業日: 現在日時
- 作業時間: 11:00から17:00, 21:00から22:00
- 次回作業予定日: 現在日時の翌日
- 次回作業予定時間: 11:00から17:00, 21:00から22:00

いくつかの入力欄はそれぞれに対応した増減ボタンから入力欄を増減することができます
- 作業時間
- 次回作業予定時間
- 作業内容
- 次回作業予定

また、作業内容、次回作業予定は[設定](#設定画面)からデフォルトの表示個数を変更できます

作成ボタンを押下すると成型された日報がモーダルに表示され、クリップボードにコピーされます。
クリップボードへのコピーが完了したら、画面にその旨が表示されます。
これは、ボタン押下からコピー完了まで1sから2sほどかかってしまう問題に対する暫定的な措置です。

### 作業開始メッセージ作成画面
![image](https://github.com/petaxa/DailyReport/assets/50777725/fe2e7d62-ca10-465a-a9cf-d2fa60bf7e27)

この画面は「前回の日報作成時の入力内容」に基づいて初期値が設定されます。
また、作業予定時間も作業予定内容も増減ボタンにより入力欄の増減が行えます。

この画面も作成ボタンを押下すると作業開始メッセージがモーダルに表示され、クリップボードにコピーされます。
また、日報作成画面同様、クリップボードへのコピーが完了したら、画面にその旨が表示されます。

### 設定画面
![image](https://github.com/petaxa/DailyReport/assets/50777725/6d5a37c0-1c78-4b63-b8ad-f2e7dc550cbf)

現在は以下のふたつが設定できます
- 作業内容自動入力可否
- 日報作成画面での作業内容入力欄初期表示個数

## 改善点

- 入力内容を成型する際、分割統治の思想がない
  - 一気に全文を生成してしまっている
  - 入力欄ごとに成型済み文章を作る → 結合することで全体を作成の流れが理想だがそうなっていない
  - 条件による変化にうまく対応できていない箇所があり、改行が多すぎるなど体裁が崩れているときがある
- モーダルの閉じるボタンが上手く実装できていない
  - コンポーネント間の値の受け渡しに知見が薄く、状態管理ができていない。
  - 力技で、モーダルをクリックすると閉じるようにしてしまっている。
- クリップボードへのコピーまで時間がかかるのを改善したい
  - 作成ボタンを押してから1s - 2sくらい時間がかかる
 
## これから開発したい機能
- 作業時間、作業予定時間の初期値を変更できるようにしたい
- ひな形をカスタムできる設定を追加したい
  - 具体的な方法は決まっていない
  - 入力欄への変更は行わない想定
- 給与計算を行い、手元にも記録を残しておきたい
  - 給与計算というより、勤務時間記録かも。
  - (アルバイト用と考えれば、)今月これくらい稼いだよはモチベになるかも？
