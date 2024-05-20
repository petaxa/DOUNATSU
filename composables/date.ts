/**
 * Date型の日付をYYYY-MM-DDにフォーマットする
 * @param date
 */
export const formatToYYYYMMDD = (date: Date) => {
    console.log("check formatToStoreStringDate", date);
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
 * Storeに保存されているDate, TimeをDate型に変換する
 * 正常なDateに変換できなかった場合はnullとする
 * 片方のみでも受け付ける。
 * Timeのみの場合、日付はダミー(2022-11-16固定)
 * @param storeDate
 * @param storeTime
 */
export const translateStoreDateToDate = (
    storeDate?: string,
    storeTime?: string
) => {
    const dateString = storeDate ?? "2022-11-16";
    const timeString = storeTime ?? "";

    const date = new Date(`${dateString} ${timeString}`.trim());
    const isValid = !isNaN(date.getTime());

    return isValid ? date : null;
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
