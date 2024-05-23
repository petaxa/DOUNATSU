import { ComputedRef } from "vue";
import { WorkTimeRange } from "../stores/types";

export type DisplayWorkTimeRange = {
    from: Date | null;
    to: Date | null;
};

export type WorkDateTimeProps = {
    store: {
        workDateAsDate: ComputedRef<Date | null>;
        workDateAsYYYYMMDD: ComputedRef<string>;
        workTimeRangeAsDate: ComputedRef<DisplayWorkTimeRange[]>;
        workTimeRangeAsHHMM: ComputedRef<WorkTimeRange[]>;
        updateWorkDate: (date: Date) => void;
        updateWorkTimeRange: (workTimesDate: DisplayWorkTimeRange[]) => void;
    };
    index: string;
    title: string;
    isInput: boolean;
};
