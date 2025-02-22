<script setup lang="ts">
import type {Data} from "~/@types";

interface Props {
  total: string
}

defineProps<Props>()
const rows = defineModel<Data['dates']>('rows', {default: []})

const columns = [{
  key: 'day',
  label: 'Dias'
}, {
  key: 'hours',
  label: 'Horas'
},]
</script>

<template>
  <UCard class="mx-auto">
    <UTable :columns="columns" :rows="rows"/>
    <template #footer>
      <div class="flex justify-center gap-8">
        <span>Total</span>
        <span>{{ total }}h</span>
      </div>
    </template>
  </UCard>
</template>

<style scoped>

</style>