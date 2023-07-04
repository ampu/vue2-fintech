<template>
  <ValidationObserver
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
        :rules="NAME_RULES"
      >
        <VTextField
          ref="name"
          v-model.trim="props.user.name"
          label="ФИО"
          counter
          :error-messages="errors"
          required
        />
      </ValidationProvider>

      <ValidationProvider
        v-slot="{errors}"
        name="Дата рождения"
        rules="required"
      >
        <VTextField
          v-model="props.user.birth"
          label="Дата рождения"
          :error-messages="errors"
          readonly
          required
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
            v-model="isoBirth"
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
          required
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
import {computed, ref, watchEffect} from 'vue'
import dayjs from 'dayjs'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
import {required} from 'vee-validate/dist/rules'

import {useEscapeListener} from '../composables/use-escape-listener'
import {isNewUser} from '../utils/user-utils'

setInteractionMode(`eager`)

extend(`required`, {...required, message: 'Поле обязательно для заполнения'})

extend(`cyrillic`, {
  message: `Только кирилица`,
  validate: (v) => /^[а-яё ]+$/i.test(v),
})

extend(`min_words`, {
  message: (field, params) => `Минимум ${params[0]} слова`,
  validate: (v, [minWords]) => v?.split(` `).filter(Boolean).length >= minWords,
})

const NAME_RULES = {
  required: true,
  cyrillic: true,
  min_words: 2,
}

/** @type {{user: User, occupations: Occupation[]}} props */
const props = defineProps({
  user: {type: Object, required: true},
  occupations: {type: Array, required: true},
})

const emit = defineEmits([`submit`])

const validation = ref()
const name = ref()
const isBirthPickerActive = ref(false)

const isoBirth = computed({
  get() {
    if (!props.user.birth) {
      return
    }
    const [day, month, year] = props.user.birth.split(`.`)
    return `${year}-${month}-${day}`
  },
  set(value) {
    if (!value) {
      props.user.birth = undefined
      return
    }
    const [year, month, day] = value.split(`-`)
    props.user.birth = `${day}.${month}.${year}`
  },
})

const submit = async () => {
  const valid = await validation.value.validate()
  if (!valid) {
    return
  }
  emit(`submit`)
}

const formatDate = (value) => {
  return dayjs(value).format(`DD.MM.YYYY`)
}

watchEffect(() => {
  if (isNewUser(props.user)) {
    validation.value.reset()
    name.value.focus()
  }
})

useEscapeListener(isBirthPickerActive)
</script>

<style lang="scss" scoped>
.birth-container {
  position: relative;
}
</style>
