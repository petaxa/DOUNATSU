/**
 * Date型の日付をYYYY-MM-DDにフォーマットする
 * @param date
 */
export const formatToYYYYMMDD = (date: Date) => {
    const yyyy = paddingDatePart(date.getFullYear(), 4);
    const mm = paddingDatePart(date.getMonth() + 1, 2);
    const dd = paddingDatePart(date.getDate(), 2);
    return `${yyyy}-${mm}-${dd}`;
};

/**
 * Date型の時間をhh:mmにフォーマットする
 * @param date
 * @returns
 */
export const formatToHHMM = (date: Date) => {
    const hh = paddingDatePart(date.getHours(), 2);
    const mm = paddingDatePart(date.getMinutes(), 2);
    return `${hh}:${mm}`;
};

/**
 * string型のDateに変換可能なを安全にDate型に変換する
 * @param dateString
 * @returns
 */
export const translateDate = (dateString: string) => {
    const workDate = new Date(dateString);
    const isDate = checkValidDate(workDate);

    return isDate ? workDate : null;
};

/**
 * Dateをパディングする
 * @param datePart
 * @param length
 * @returns
 */
const paddingDatePart = (datePart: number, length: number) => {
    return String(datePart).padStart(length, "0");
};

/**
 * 有効なDateかを確認する
 * @param date
 * @returns
 */
export const checkValidDate = (date: Date) => {
    return !isNaN(date.getDate());
};
