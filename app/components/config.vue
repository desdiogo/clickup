<script setup lang="ts">
import {StorageKey} from "~/enums/storage-key";

const teamId = ref('')
const token = ref('');

function onChangeTeamId() {
  sessionStorage.setItem(StorageKey.CLICKUPTEAMID, teamId.value)
}

function onChangeToken() {
  sessionStorage.setItem(StorageKey.CLICKUPTOKEN, token.value)
}

onBeforeMount(() => {
  teamId.value = sessionStorage.getItem(StorageKey.CLICKUPTEAMID) ?? ''
  token.value = sessionStorage.getItem(StorageKey.CLICKUPTOKEN) ?? ''
})

</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton color="white" label="" trailing-icon="i-heroicons-cog-8-tooth-20-solid"/>

    <template #panel>
      <div class="p-4 space-y-4 w-[450px]">
        <UFormGroup label="Team Id" required>
          <UInput v-model="teamId" placeholder="000000" icon="i-heroicons-identification" @change="onChangeTeamId"/>
        </UFormGroup>
        <UFormGroup label="Token" required>
          <UInput v-model="token" placeholder="pk_00000000_XXXXXX..." icon="i-heroicons-key" @change="onChangeToken"/>
        </UFormGroup>
      </div>
    </template>
  </UPopover>
</template>

<style scoped>

</style>