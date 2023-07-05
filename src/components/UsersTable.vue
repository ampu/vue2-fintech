<template>
  <div>
    <h2 class="text-h4 text-center my-5">
      Данные пользователей
    </h2>
    <VDataTable
      class="elevation-0"
      :headers="HEADERS"
      :items="sortedUsers"
      :itemsPerPage="5"
    >
      <template #item.actions="{item}">
        <VBtn
          icon
          color="red darken-3"
          aria-label="Удалить запись"
          @click="emit(`remove`, item)"
        >
          <VIcon dark>mdi-delete</VIcon>
        </VBtn>
      </template>

      <template #item.name="{item}">
        <UserNameInput
          :user="item"
        />
      </template>

      <template #item.importance="{item}">
        <UserImportanceInput
          :user="item"
        />
      </template>
    </VDataTable>
  </div>
</template>

<script setup>
import {computed} from 'vue'

import UserNameInput from './UserNameInput.vue'
import UserImportanceInput from './UserImportanceInput.vue'

const HEADERS = [
  {text: `ID клиента`, value: `id`},
  {text: `ФИО`, value: `name`},
  {text: `Дата рождения`, value: `birth`},
  {text: `Код специализации`, value: `occupationId`},
  {text: `Важность`, value: `importance`},
  {text: ``, value: `actions`},
]

/** @type {{users: User[]}} props */
const props = defineProps({
  users: {type: Array, required: true},
})

const emit = defineEmits([`remove`])

const sortedUsers = computed(() => props.users.slice().reverse())
</script>

<style lang="scss" scoped>
</style>
