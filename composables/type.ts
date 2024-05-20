import { DateDetails, WorkTimeDetailsTypeRange } from "../stores/types";

/**
 *
 */
export type DisplayWorkTimeRange = {
    from: Date | null;
    to: Date | null;
};

export type WorkDateTimeProps = {
    store: {
        workDate: DateDetails;
        workTimeRange: WorkTimeDetailsTypeRange[];
        updateWorkDate: (date: Date) => void;
        updateWorkTimeRange: (workTimesDate: DisplayWorkTimeRange[]) => void;
    };
    isInput: boolean
};
