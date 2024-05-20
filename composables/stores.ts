import {
    DateDetails,
    WorkTimeDetailsTypeRange,
    WorkTimeRange,
} from "../stores/types";
import { checkValidDate, formatToHHMM, formatToYYYYMMDD } from "./date";

/**
 * workDateを{Date, String}に変換する
 * @param workDateString
 * @returns
 */
export const translateDetailsWorkDate = (
    workDateString: string
): DateDetails => {
    const workDate = new Date(workDateString);
    const isDate = checkValidDate(workDate);

    const date = isDate ? workDate : null;
    const display = isDate ? formatToYYYYMMDD(workDate) : "";

    return { date, display };
};

/**
 * WorkTimeRangeの日付を{Date, String}に変換する
 * @param WorkTimeRange
 * @returns
 */
export const translateDetailsWorkTime = (
    WorkTimeRange: WorkTimeRange[]
): WorkTimeDetailsTypeRange[] => {
    return WorkTimeRange.map((range) => {
        return {
            from: validDetailsForTime(range.from),
            to: validDetailsForTime(range.to),
        };
    });
};

/**
 * workTime用のDateDetailsを生成
 * @param dateString
 * @returns
 */
const validDetailsForTime = (dateString: string): DateDetails => {
    const inputDate = new Date(dateString);
    const isDate = checkValidDate(inputDate);

    const date = isDate ? inputDate : null;
    const display = isDate ? formatToYYYYMMDD(inputDate) : "";

    return { date, display };
};

/**
 * WorkTimeRangeDetailsをWorkTimeRangeに戻す
 * @param WorkTimeRangeDetails
 * @returns
 */
export const revertDetailsWorkTime = (
    WorkTimeRangeDetails: WorkTimeDetailsTypeRange[]
) => {
    return WorkTimeRangeDetails.map((range) => ({
        from: range.from?.date,
        to: range.to?.date,
    })).filter(
        (range): range is WorkTimeRange =>
            range.from !== null && range.to !== null
    );
};
