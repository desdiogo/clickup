<script setup lang="ts">

const currentYear = new Date().getFullYear();

const years = Array.from({ length: 2 }).map((_, index) => {
  return {
    name: `${currentYear + index - 1}`,
    value: `${currentYear + index - 1}`,
  };
});

const selectedYear = defineModel('selectedYear', {default: ''})
</script>

<template>
  <USelect v-model="selectedYear" :options="years" option-attribute="name" size="md" placeholder="Ano" />
</template>

<style scoped>

</style>