<template>
  <VApp>
    <VProgressLinear
      v-if="occupationsOp.isPending"
      indeterminate
      absolute
    />

    <VContainer
      class="app-container mt-5"
    >
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
        :key="newUser.id"
        :user="newUser"
        :occupations="occupations"
        @submit="addUser"
      />

      <UsersTable
        v-if="users.length !== 0"
        :users="users"
        @remove="removeUser"
      />
    </VContainer>
  </VApp>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import UsersTable from './components/UsersTable.vue'
import UserForm from './components/UserForm.vue'

import {Ops, runOp} from './utils/op-utils'
import {apiProvider} from './utils/api-provider'
import {createUser, cloneUser} from './utils/user-utils'

const occupations = ref([])
const occupationsOp = ref(Ops.DEFAULT)
const newUser = ref(createUser())
const users = ref([])

const addUser = () => {
  const user = cloneUser(newUser.value)
  newUser.value = createUser()
  users.value.push(user)
}

const removeUser = (user) => {
  const userOrder = users.value.findIndex(({id}) => user.id === id)
  if (userOrder !== -1) {
    users.value.splice(userOrder, 1)
  }
}

onMounted(async () => {
  occupations.value = await runOp(occupationsOp, () => apiProvider.getOccupations())
})
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 20px;
}
</style>
