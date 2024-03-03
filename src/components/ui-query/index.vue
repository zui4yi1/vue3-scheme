<template>
  <div class="search-card">
    <ui-scheme ref="uiSchemeRef" mode="search" :schemes="querySchemes" :dicts="dicts">
      <template #append>
        <el-form-item label-width="0">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button plain @click="handleReset">重置</el-button>
        </el-form-item>
      </template>
    </ui-scheme>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ui-query',
  };
</script>

<script setup lang="ts">
  import { ref } from 'vue';
  import UiScheme from '../ui-scheme/index.vue';
  import { props } from './_props';

  defineProps(props);
  const emits = defineEmits(['query']);

  const uiSchemeRef = ref(null as any);

  async function handleQuery() {
    const formData = await uiSchemeRef.value?.getFormFilterEmpty();
    if (!formData) return;
    emits('query', formData);
  }

  function handleReset() {
    uiSchemeRef.value?.reset();
    handleQuery();
  }

  defineExpose({
    handleQuery,
    handleReset,
  });
</script>
