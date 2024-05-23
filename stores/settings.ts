import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
    "settings",
    () => {
        const initialTaskInputCount = ref(0);
        const isTaskAutoFillEnabled = ref(true);
    },
    {
        persist: true,
    }
);
