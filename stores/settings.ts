import { defineStore } from "pinia";

export const useSettingsStore = defineStore(
    "settings",
    () => {
        const initialTaskInputCount = ref(0);

        return { initialTaskInputCount };
    },
    {
        persist: true,
    }
);
