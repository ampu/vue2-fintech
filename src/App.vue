<template>
  <VApp>
    <VProgressLinear
      v-if="occupationsOp.isPending"
      indeterminate
      absolute
    />

    <VContainer class="container">
      <VAlert
        v-if="occupationsOp.isError"
        type="error"
        border="left"
        color="pink darken-1"
        dark
      >
        Что-то пошло не так... Попробуйте выполнить операцию позже
      </VAlert>

      <UserForm
        :user="formUser"
        :occupations="occupations"
        @submit="submit"
      />

      <UserTable
        v-if="tableUser"
        :user="tableUser"
        :occupations="occupations"
      />

      <VBtn
        v-if="tableUser"
        color="error"
        block
        @click="clear"
      >
        Удалить запись
      </VBtn>
    </VContainer>
  </VApp>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {nanoid} from 'nanoid'

import UserTable from './components/UserTable.vue'
import UserForm from './components/UserForm.vue'

import {Ops, runOp} from './utils/op-utils'
import {apiProvider} from './utils/api-provider'

const formUser = ref({
  id: nanoid(),
  name: undefined,
  birth: undefined,
  occupationId: undefined,
})
const tableUser = ref()
const occupations = ref([])
const occupationsOp = ref(Ops.DEFAULT)

const submit = () => {
  tableUser.value = {...formUser.value}
}

const clear = () => {
  tableUser.value = undefined
}

onMounted(async () => {
  occupations.value = await runOp(occupationsOp, () => apiProvider.getOccupations())
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column;
  gap: 20px;
}
</style>
