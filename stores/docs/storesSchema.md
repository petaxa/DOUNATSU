# Store一覧

## useSettingsStore

設定に関するストア

```Ts
type useSettingStore = {
    initialTaskInputCount: number,
}
```

### Values{#setting-values}

#### initialTaskInputCount

型: number

---

## useTodayWorkStore

当日タスクに関するストア

```Ts
type useTodayWorkStore = {
    projectName: string,
    todayWorkDate: string,
    todayWorkTimeRange: WorkTime[],
    todayTasks: TodayTask[]
}
```

### Values{#todaywork-values}

#### projectName

型: string

#### todayWorkDate

型: string (YYYY-MM-DD)

#### todayWorkTimeRange

型: [WorkTimeRange](#worktimerange)

#### todayTasks

型: [TodayTask](#todaytask)[]

### Action{#todaywork-action}

#### initializeUseTodayWorkStore

useTodayWorkStoreのすべての値を初期化する

---

## useNextDayWorkStore

次回予定タスクに関するストア

```Ts
type useNextDayWorkStore = {
    nextWorkDate: string,
    nextWorkTimeRange: WorkTime[],
    nextTasks: NextTask[]
}
```

### Values{#nextdaywork-values}

#### nextWorkDate

型: string (YYYY-MM-DD)

#### nextWorkTimeRange

型: [WorkTimeRange](#worktimerange)

#### nextTasks

型: [NextTask](#nexttask)[]

### Action{#nextdaywork-action}

#### initializeUseNextDayWorkStore

useNextDayWorkStoreのすべての値を初期化する

---

---

## Storeに登場する型

### WorkTimeRange

```Ts
type WorkTimeRange = {
    from: string, // (hh:mm)
    to: string // (hh:mm)
}
```

#### from

型: string

#### to

型: string

### TodayTask

```Ts
type TodayTask = {
    title: string,
    pending: number,
    detail: string
}
```

#### title{#type-todaytask-title}

型: string

#### pending

型: number

#### detail{#type-todaytask-detail}

型: string

### NextTask

```Ts
type NextTask = {
    title: string,
    detail: string
}
```

#### title{#type-nexttask-title}

型: string

#### detail{#type-nexttask-detail}

型: string
