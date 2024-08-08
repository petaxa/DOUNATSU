# 日報関連ストア

|変数名|型|説明|初期値|
|---|---|---|---|
|taskActualTimeRange|Array\<TimeRange>|作業実績作業時間|start: 現在日時, end: 現在日時 + 2時間後|
|taskActualTitle|Array\<TaskRecord>|作業実績レコード|空配列|
|taskScheduledDate|Date|作業予定日|現在日時 + 1日|
|taskScheduledTimeRange|Array\<TimeRange>|作業予定作業時間|start: 現在日時 + 1日, end: 現在日時 + 1日 + 2時間|
|taskScheduledTitle|Array\<TaskRecord>|作業予定レコード|空配列|

|メソッド名|説明|
|---|---|
|initializeDailyReportStore|ストア内のすべてのプロパティを初期化|
