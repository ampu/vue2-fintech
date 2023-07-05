<template>
  <VSelect
    :items="IMPORTANCE_ITEMS"
    :label="props.label"
    v-model="props.user.importance"
  />
</template>

<script setup>
import {IMPORTANCE_ITEMS} from '../utils/user-utils'

/** @type {{user: User, label?: string}} props */
const props = defineProps({
  user: {type: Object, required: true},
  label: {type: String, required: false},
})
</script>

<style lang="scss" scoped>
</style>
