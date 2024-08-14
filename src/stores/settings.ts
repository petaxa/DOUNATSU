import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const initialTaskFields = ref(5);

  return { initialTaskFields };
});
