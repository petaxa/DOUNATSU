<script setup lang="ts">
import { createError } from "nuxt/app";
import { onMounted, ref, watch } from "vue";
import type { Ref } from "vue";
import type {
    DisplayWorkTimeRange,
    WorkDateTimeProps,
} from "../../../composables/type";

const props = defineProps<WorkDateTimeProps>();

onMounted(() => {
    if (!props.isInput) return;

    // 作業日を初期化
    const dateTypeDate = props.store.workDate.date;
    if (dateTypeDate === null) {
        // 無効な値だった場合は現在日時で更新する
        const now = new Date();
        props.store.updateWorkDate(now);
        date.value = now;
    } else {
        date.value = dateTypeDate;
    }

    // storeの作業時間を表示用に成型
    // storeの作業時間の内、from,toどちらもnullのものは除外
    workTimes.value = props.store.workTimeRange
        .map((range) => {
            const from = range.from.date;
            const to = range.to.date;
            return { from, to };
        })
        .filter((range) => range.from !== null || range.to !== null);
    // 作業時間を初期化
    if (workTimes.value.length === 0) {
        // ストアに何もなかったら現在日時で初期化
        const initRange = [
            {
                from: new Date(),
                to: new Date(),
            },
        ];
        props.store.updateWorkTimeRange(initRange);
        workTimes.value = initRange;
    }
});

/** 作業日 */
const date: Ref<Date | undefined> = ref(undefined);
watch(date, (newDate) => {
    // 作業日に変更があったらStoreを更新
    if (newDate === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
        });
    }
    props.store.updateWorkDate(newDate);
});

/** 作業時間配列 */
const workTimes: Ref<DisplayWorkTimeRange[]> = ref([]);
watch(
    workTimes,
    (newAry) => {
        // 作業時間に変更があったらStoreを更新
        props.store.updateWorkTimeRange(newAry);
    },
    { deep: true }
);

const timePlus = () => {
    workTimes.value.push({
        from: new Date("2022-11-16 00:00"),
        to: new Date("2022-11-16 00:00"),
    });
};
const timeMinus = () => {
    workTimes.value.pop();
};
</script>

<template>
    <div v-if="props.isInput">
        <Calendar v-model="date" dateFormat="yy/mm/dd" showButtonBar />
        <div class="trans-buttons">
            <Button :onclick="timePlus" icon="pi pi-plus" />
            <Button :onclick="timeMinus" icon="pi pi-minus" />
        </div>
        <div class="times" v-for="range in workTimes">
            <Calendar v-model="range.from" timeOnly />
            <Calendar v-model="range.to" timeOnly />
        </div>
    </div>
    <div v-else>
        <p>{{ props.store.workDate.display || "--/--" }}</p>
        <div v-if="props.store.workTimeRange.length > 0">
            <div v-for="range in props.store.workTimeRange">
                <p>
                    {{ range.from.display }}<span>~</span>{{ range.to.display }}
                </p>
            </div>
        </div>
        <div v-else>
            <p>--<span> ~ </span>--</p>
        </div>
    </div>
</template>
