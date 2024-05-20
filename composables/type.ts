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
        WorkDate: DateDetails;
        WorkTimeRange: WorkTimeDetailsTypeRange[];
        updateWorkDate: (date: Date) => void;
        updateWorkTimeRange: (workTimesDate: DisplayWorkTimeRange[]) => void;
    };
};
