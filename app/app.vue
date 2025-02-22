<script setup lang="ts">
import dayjs from "dayjs";
import type {Data, TimeTracking} from "~/@types";
import {StorageKey} from "~/enums/storage-key";

const toast = useToast()

const selectedMonth = ref('')
const selectedYear = ref('')

const firstDay = 1;
const startMilliseconds = computed(() => {
  if (!selectedMonth.value && !selectedYear.value) {
    return 0;
  }

  return dayjs(
      new Date(Number(selectedYear.value), Number(selectedMonth.value), firstDay)
  )
      .startOf("month")
      .valueOf();
});

const endMilliseconds = computed(() => {
  if (!selectedMonth.value && !selectedYear.value) {
    return 0;
  }

  return dayjs(
      new Date(Number(selectedYear.value), Number(selectedMonth.value), firstDay)
  )
      .endOf("month")
      .valueOf();
});

async function getTimeTracking(): Promise<Data> {
  const teamId = sessionStorage.getItem(StorageKey.CLICKUPTEAMID) ?? ''
  const token = sessionStorage.getItem(StorageKey.CLICKUPTOKEN) ?? ''

  return await $fetch("/api/time-tracking", {
    method: 'POST',
    body: { start_date: `${startMilliseconds.value}`, end_date: `${endMilliseconds.value}`, team_id: teamId, token },
  });
}

const { data: timeTracking, execute, error, status } = await useAsyncData(
    "time-tracking",
    () => getTimeTracking(),
    { immediate: false }
);
</script>

<template>
  <div class="flex flex-col h-dvh p-8 gap-8">
    <Header/>
    <div class="flex justify-center gap-4">
      <Month v-model:selected-month="selectedMonth"/>
      <Year v-model:selected-year="selectedYear"/>
      <UButton :loading="status=== 'pending'" @click="execute()">Horas Trabalhadas</UButton>
    </div>
    <template v-if="timeTracking">
      <Hours v-model:rows="timeTracking.dates" :total="timeTracking.totalHours" />
    </template>
  </div>

  <UNotifications />
</template>
