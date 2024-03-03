<template>
  <span v-if="mode === 'detail'">{{ curVal }}</span>
  <el-input v-else v-model="curVal" />
</template>

<script lang="ts">
  export default {
    name: 'TheCusCom',
  };
</script>
<script setup lang="ts">
  import { computed } from 'vue';

  const _props = defineProps({
    value: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'form',
    },
  });
  const emits = defineEmits(['change']);

  const curVal = computed({
    get() {
      return _props.value;
    },
    set(val: any) {
      emits('change', val);
    },
  });
</script>
