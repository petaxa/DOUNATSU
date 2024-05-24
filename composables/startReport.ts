import { NextTask, WorkTimeRange } from "../stores/types";

export const createStartReport = (
    times: WorkTimeRange[],
    tasks: NextTask[]
) => {
    // 本日の業務開始します。
    // 19:00 ~ 22:00で作業予定です。
    // 【作業予定】
    // ハノイの塔(クラス設計)
    const timesString = createTimes(times);
    const tasksString = createTasks(tasks);

    return {
        workTime: timesString,
        tasks: tasksString,
        copiedText: `本日の業務開始します。\n${timesString}\n${tasksString}`,
    };
};

const createTimes = (times: WorkTimeRange[]) => {
    if (times.length === 0) return "";

    const timesString = times.reduce((output, time, index) => {
        const text = `${time.from} ~ ${time.to}`;

        if (index === 0) {
            return (output += text);
        } else {
            return (output += `, ${text}`);
        }
    }, "");

    return `${timesString}で作業予定です。`;
};

const createTasks = (tasks: NextTask[]) => {
    const tasksString = tasks.reduce((output, task, index) => {
        // タイトルがないタスクはスキップ
        if (!task.title) return (output += "");
        // 本文
        const text = task.title;

        // 1行目以外は改行する。
        if (index === 0) {
            return (output += text);
        } else {
            return (output += `\n${text}`);
        }
    }, "");

    return `【作業予定】\n${tasksString}`;
};
