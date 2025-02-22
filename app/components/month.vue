<script setup lang="ts">
import dayjs from "dayjs";

const monthsOfTheYear = 12;
const firstDay = 1;
const currentYear = new Date().getFullYear();

const months = Array.from({ length: monthsOfTheYear }).map((_, index) => {
  return {
    name: dayjs(new Date(currentYear, index, firstDay)).format("MMMM"),
    value: `${index}`,
  };
});

const selectedMonth = defineModel('selectedMonth', {default: ''})
</script>

<template>
  <USelect v-model="selectedMonth" :options="months" option-attribute="name" size="md" placeholder="Mês" />
</template>

<style scoped>

</style>