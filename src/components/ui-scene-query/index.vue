<template>
  <div class="ui-scene-query">
    <!-- 查询模块-->
    <UiQuery ref="queryRef" :querySchemes="querySchemes" :dicts="dicts" @query="queryList" />
    <!-- 控制栏模块-->
    <div class="controls-card">
      <slot name="controls">
        <component
          :is="controlsCard"
          v-if="controlsCard"
          v-bind="controlsCardProps || {}"
          @onCusEvent="handleCusEvent"
        />
      </slot>
    </div>
    <!-- 表格模块-->
    <slot name="table">
      <UiTable
        ref="uiTableRef"
        :tableSchemes="tableSchemes"
        :dicts="dicts"
        :tableData="tableData"
        v-model:pageSize="pager.pageSize"
        v-model:pageNum="pager.pageNum"
        :total="total"
        v-bind="tableProps"
        @onCusEvent="handleCusEvent"
        @onTableEvent="handleTableEvent"
      />
    </slot>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ui-scene-query',
  };
</script>

<script setup lang="ts">
  import {
    ComponentInternalInstance,
    computed,
    getCurrentInstance,
    onMounted,
    provide,
    ref,
  } from 'vue';
  import UiQuery from '../ui-query/index.vue';
  import UiTable from '../ui-table/index.vue';
  import { props } from './_props';

  const _props = defineProps(props);
  const emit = defineEmits(['onTableEvent', 'onCusEvent', 'query']);

  const queryRef = ref(null as any);
  const uiTableRef = ref({} as any);
  const tableRef = computed(() => uiTableRef.value?.tableRef);

  const rootInstance = getCurrentInstance() || ({} as ComponentInternalInstance);
  provide('rootInstance', rootInstance);

  const tableData = ref<any[]>([]);
  const pager = ref({
    pageSize: 10,
    pageNum: 1,
  });

  const total = ref<number>(0);

  /** 执行组件queryRef内部的查询 */
  function exec() {
    queryRef.value?.handleQuery();
  }

  /**
   * 查询列表api
   * @param formData 查询参数
   */
  async function queryList(formData: any = {}) {
    if (_props.beforeQuery && _props.beforeQuery instanceof Function) {
      formData = _props.beforeQuery(formData);
    }
    if (_props.queryApi && _props.queryApi instanceof Function) {
      const { pageSize, pageNum } = pager.value;
      const params = Object.assign(formData, { pageSize, pageNum });
      try {
        let res = await _props.queryApi(params);
        if (_props.beforeRenderData && _props.beforeRenderData instanceof Function) {
          res = _props.beforeRenderData(res);
        }
        tableData.value = res.data[_props.dataMap.list];
        total.value = res.data[_props.dataMap.total];
        if (_props.afterRenderData && _props.afterRenderData instanceof Function) {
          res = _props.afterRenderData(res);
        }
      } catch (err) {
        //
      }
    }
  }

  /**
   * 重置分页
   */
  function resetPager() {
    pager.value = {
      pageSize: 10,
      pageNum: 1,
    };
    total.value = 0;
  }

  /**
   * 重置分页，并查询列表
   */
  function resetQueryList() {
    resetPager();
    queryList();
  }

  /** 统一转发原生el-table的事件 */
  function handleTableEvent(type: string, ...arr: any[]) {
    emit('onTableEvent', type, ...arr);
  }

  /** 统一转发自定义事件 */
  function handleCusEvent(type: string, ...arr: any[]) {
    emit('onCusEvent', type, ...arr);
  }

  onMounted(() => {
    _props.autoQueryOnMounted && exec();
  });

  defineExpose({
    tableRef,
    exec,
    queryList,
    resetPager,
    resetQueryList,
  });
</script>
