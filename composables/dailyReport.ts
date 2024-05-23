import { checkValidDate } from "./date";
import { NextTask, TodayTask, WorkTimeRange } from "../stores/types";

export const createDailyReport = (input: {
    projectName: string;
    todayDateAsYYYYMMDD: string;
    todayTimesAsHHMM: WorkTimeRange[];
    todayTasks: TodayTask[];
    nextDayDateAsYYYYMMDD: string;
    nextDayTimesAsHHMM: WorkTimeRange[];
    nextDayTasks: NextTask[];
}) => {
    const projectName = createProjectName(input.projectName);
    const todayDateTime = createDateTime(
        2,
        "作業日時",
        input.todayDateAsYYYYMMDD,
        input.todayTimesAsHHMM
    );
    const todayTasks = createTasks(3, "作業内容", input.todayTasks);

    const nextDayDateTime = createDateTime(
        4,
        "次回作業予定日",
        input.nextDayDateAsYYYYMMDD,
        input.nextDayTimesAsHHMM
    );
    const nextDayTasks = createTasks(5, "次回作業予定", input.nextDayTasks);

    return {
        projectName,
        todayDateTime,
        todayTasks,
        nextDayDateTime,
        nextDayTasks,
        copiedText: `【日報】\n${projectName}\n${todayDateTime}\n${todayTasks}\n${nextDayDateTime}\n${nextDayTasks}`,
    };
};

const createProjectName = (name: string) => {
    return name ? `1. [プロジェクト名] ${name}` : "";
};

const createDateTime = (
    prefix: number,
    title: string,
    dateYYYYMMDD: string,
    times: WorkTimeRange[]
) => {
    if (
        !prefix ||
        !title ||
        !dateYYYYMMDD ||
        !checkValidDate(new Date(dateYYYYMMDD)) ||
        times.length === 0
    )
        return "";

    const timesString = times.reduce((output, time, index) => {
        const text = `${time.from} ~ ${time.to}`;

        if (index === 0) {
            return (output += text);
        } else {
            return (output += `, ${text}`);
        }
    }, "");

    const day = new Date(dateYYYYMMDD).getDay();
    const week = ["日", "月", "火", "水", "木", "金", "土"];
    return `${prefix}. [${title}] ${dateYYYYMMDD.replaceAll("-", "/")}${
        week[day]
    } ${timesString}`;
};

const isTodayTask = (task: TodayTask | NextTask): task is TodayTask => {
    return "pending" in task;
};
const createTasks = (
    prefix: number,
    title: string,
    tasks: TodayTask[] | NextTask[]
) => {
    if (tasks.length === 0) return "";

    const tasksString = tasks.reduce((output, task, index) => {
        // タイトルがないタスクはスキップ
        if (!task.title) return (output += "");
        // 進捗を成型
        const pendingText =
            isTodayTask(task) && task.pending ? `${task.pending}%` : "";
        // 本文
        const text = `${prefix}-${index + 1}. ${
            task.title
        } ${pendingText}\n  ${task.detail.replace("\n", "\n  ")}`;

        // 1行目以外は改行する。
        if (index === 0) {
            return (output += text);
        } else {
            return (output += `\n${text}`);
        }
    }, "");

    return `${prefix}. [${title}]\n${tasksString}`;
};
