<template>
  <div
    @click="isBirthPickerActive = true"
    @focusin="isBirthPickerActive = true"
  >
    <ValidationProvider
      v-slot="{errors}"
      :name="props.label"
      rules="required"
    >
      <VTextField
        :value="formatDate(props.user.birth)"
        :label="props.label"
        :error-messages="errors"
        readonly
      />
    </ValidationProvider>

    <div class="user-birth-picker-container">
      <VMenu
        v-model="isBirthPickerActive"
        :closeOnContentClick="false"
        absolute
        attach=".user-birth-picker-container"
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
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {ValidationProvider} from 'vee-validate'
import dayjs from 'dayjs'

import {useEscapeListener} from '../composables/use-escape-listener'

/** @type {{user: User, label?: string, counter: boolean}} props */
const props = defineProps({
  user: {type: Object, required: true},
  label: {type: String, required: false},
  counter: {type: Boolean, default: false},
})

const isBirthPickerActive = ref(false)

const formatDate = (value) => {
  return value
    ? dayjs(value).format(`DD.MM.YYYY`)
    : null
}

useEscapeListener(isBirthPickerActive)
</script>

<style lang="scss" scoped>
.user-birth-picker-container {
  position: relative;
}
</style>
