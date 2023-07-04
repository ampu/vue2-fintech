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

      <ValidationProvider
        v-slot="{errors}"
        name="ФИО"
        :rules="USER_NAME_RULES"
      >
        <VTextField
          v-model.trim="props.user.name"
          label="ФИО"
          counter
          :error-messages="errors"
        />
      </ValidationProvider>

      <ValidationProvider
        v-slot="{errors}"
        name="Дата рождения"
        rules="required"
      >
        <VTextField
          :value="formatDate(props.user.birth)"
          label="Дата рождения"
          :error-messages="errors"
          readonly
          @click="isBirthPickerActive = true"
          @focus="isBirthPickerActive = true"
        />
      </ValidationProvider>

      <div class="birth-container">
        <VMenu
          v-model="isBirthPickerActive"
          :closeOnContentClick="false"
          absolute
          attach=".birth-container"
        >
          <VDatePicker
            v-model="props.user.birth"
            label="Дата рождения"
            :firstDayOfWeek="1"
            locale="ru-RU"
            :titleDateFormat="formatDate"
          />
        </VMenu>
      </div>

      <ValidationProvider
        v-slot="{errors}"
        name="Специализация"
        rules="required"
      >
        <VSelect
          v-model="props.user.occupationId"
          :items="occupations"
          label="Специализация"
          :error-messages="errors"
        />
      </ValidationProvider>

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
import {ref, watchEffect} from 'vue'
import dayjs from 'dayjs'
import {ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'

import {useEscapeListener} from '../composables/use-escape-listener'
import {isNewUser, USER_NAME_RULES} from '../utils/user-utils'

setInteractionMode(`eager`)

/** @type {{user: User, occupations: Occupation[]}} props */
const props = defineProps({
  user: {type: Object, required: true},
  occupations: {type: Array, required: true},
})

const emit = defineEmits([`submit`])

const validation = ref()
const isBirthPickerActive = ref(false)

const submit = async () => {
  const valid = await validation.value.validate()
  if (!valid) {
    return
  }
  emit(`submit`)
}

const formatDate = (value) => {
  return value
    ? dayjs(value).format(`DD.MM.YYYY`)
    : null
}

useEscapeListener(isBirthPickerActive)
</script>

<style lang="scss" scoped>
.user-form-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.birth-container {
  position: relative;
}
</style>
