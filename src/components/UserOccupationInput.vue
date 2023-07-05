<template>
  <ValidationProvider
    v-slot="{errors}"
    :name="props.label"
    rules="required"
  >
    <VSelect
      v-model="props.user.occupationId"
      :items="props.occupations"
      :label="props.label"
      :error-messages="errors"
    />
  </ValidationProvider>
</template>

<script setup>
import {ValidationProvider} from 'vee-validate'

/** @type {{user: User, occupations: Occupation[], label?: string}} props */
const props = defineProps({
  user: {type: Object, required: true},
  occupations: {type: Array, required: true},
  label: {type: String, required: false},
})
</script>

<style lang="scss" scoped>
</style>
