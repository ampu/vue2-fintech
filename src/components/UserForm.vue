<template>
  <ValidationObserver
    class="user-form-container"
    ref="validation"
    v-slot="{invalid}"
  >
    <VForm>
      <h1 class="text-h4 text-center">
        Введите данные пользователя
      </h1>

      <UserNameInput
        :user="props.user"
        label="ФИО"
        counter
      />

      <UserBirthInput
        :user="props.user"
        label="Дата рождения"
      />

      <UserOccupationInput
        :user="props.user"
        :occupations="props.occupations"
        label="Специализация"
      />

      <VBtn
        :disabled="invalid"
        block
        color="primary"
        class="mt-5"
        @click="submit"
      >
        Отправить
      </VBtn>
    </VForm>
  </ValidationObserver>
</template>

<script setup>
import {ref} from 'vue'
import {ValidationObserver, setInteractionMode} from 'vee-validate'

import UserNameInput from './UserNameInput.vue'

import UserBirthInput from './UserBirthInput.vue'
import UserOccupationInput from './UserOccupationInput.vue'

setInteractionMode(`eager`)

/** @type {{user: User, occupations: Occupation[]}} props */
const props = defineProps({
  user: {type: Object, required: true},
  occupations: {type: Array, required: true},
})

const emit = defineEmits([`submit`])

const validation = ref()

const submit = async () => {
  const valid = await validation.value.validate()
  if (!valid) {
    return
  }
  emit(`submit`)
}
</script>

<style lang="scss" scoped>
.user-form-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
</style>
