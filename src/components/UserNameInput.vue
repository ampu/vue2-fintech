<template>
  <ValidationProvider
    v-slot="{errors}"
    :name="label"
    :rules="USER_NAME_RULES"
  >
    <VTextField
      v-model.trim="props.user.name"
      :label="props.label"
      :counter="counter"
      :error-messages="errors"
    />
  </ValidationProvider>
</template>

<script setup>
import {ValidationProvider} from 'vee-validate'

import {USER_NAME_RULES} from '../utils/user-utils'

/** @type {{user: User, label?: string, counter: boolean}} props */
const props = defineProps({
  user: {type: Object, required: true},
  label: {type: String, required: false},
  counter: {type: Boolean, default: false},
})
</script>

<style lang="scss" scoped>
</style>
