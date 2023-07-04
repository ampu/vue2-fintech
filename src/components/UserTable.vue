<template>
  <VSimpleTable class="my-5">
    <caption class="text-h4">Данные пользователя</caption>
    <col style="width:40%">
    <tbody>
    <tr>
      <th>ID</th>
      <td>{{ props.user.id }}</td>
    </tr>
    <tr>
      <th>ФИО</th>
      <td>{{ props.user.name }}</td>
    </tr>
    <tr>
      <th>Дата рождения</th>
      <td>{{ props.user.birth }}</td>
    </tr>
    <tr>
      <th>Специализация</th>
      <td>{{ occupation?.text }}</td>
    </tr>
    </tbody>
  </VSimpleTable>
</template>

<script setup>
import {computed} from 'vue'
import {getOccupationById} from '../utils/occupation-utils'

/** @type {{user: User, occupations: Occupation[]}} props */
const props = defineProps({
  user: {type: Object, required: true},
  occupations: {type: Array, required: true},
})

const occupation = computed(() => getOccupationById(props.occupations, props.user.occupationId))
</script>

<style lang="scss" scoped>
</style>
