<template>
  <div class="table-card" style="height: 400px">
    <el-table
      ref="tableRef"
      :data="tableData"
      stripe
      height="calc(100% - 36px)"
      v-bind="tableProps"
      @select="(...arr) => handleTableEvent('select', ...arr)"
      @selection-change="(...arr) => handleTableEvent('selectionChange', ...arr)"
      @cell-click="(...arr) => handleTableEvent('cellClick', ...arr)"
      @row-click="(...arr) => handleTableEvent('rowClick', ...arr)"
      @sort-change="(...arr) => handleTableEvent('sortChange', ...arr)"
      @current-change="(...arr) => handleTableEvent('currentChange', ...arr)"
      @expand-change="(...arr) => handleTableEvent('expandChange', ...arr)"
    >
      <el-table-column v-if="isSelectable" type="selection" align="center" width="60" />
      <el-table-column v-if="showIndex" type="index" align="center" label="序号" width="80">
        <template #default="{ $index }">
          {{ _getRowInx($index) }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, inx) in tableSchemes"
        :key="'column' + inx"
        :show-overflow-tooltip="item.showOverflowTooltip !== false"
        :width="item.width || 'auto'"
        :align="item.align || 'center'"
        :label="item.label"
        :prop="item.prop"
        v-bind="item.props || {}"
      >
        <template #default="{ row }">
          <!--优先级: 字典->自定义组件->默认直接展示-->
          <template v-if="item.isDict">
            {{ getDictName(item.dictName || item.prop, row[item.prop]) }}
          </template>
          <template v-else-if="item.component">
            <component
              :is="item.component"
              v-bind="item.props"
              :row="row"
              @onCusEvent="handleCusEvent"
            />
          </template>
          <template v-else>
            {{ row[item.prop] }}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :current-page="pageNum"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ui-table',
  };
</script>

<script setup lang="ts">
  import { ComponentInternalInstance, inject, ref } from 'vue';
  import { props } from './_props';

  const _props = defineProps(props);
  const emits = defineEmits(['update:pageSize', 'update:pageNum', 'onTableEvent', 'onCusEvent']);

  const rootInstance = inject('rootInstance', {} as ComponentInternalInstance);
  const tableRef = ref(null as any);

  function _getRowInx(inx: number) {
    const { pageNum, pageSize } = _props;
    return (pageNum - 1) * pageSize + inx + 1;
  }

  function getDictName(dictName: string, val: any) {
    const list: any[] = _props.dicts[dictName] || [];
    if (!list.length) return val;
    if (['', undefined, null].includes(val)) return _props.emptyText;
    if (val instanceof Array || val.includes(',')) {
      const arr: string[] = val instanceof Array ? val : val.split(',');
      return list
        .filter((t) => arr.some((key) => `${key}` === `${t.value}`))
        .map((t) => t.label)
        .join(',');
    } else {
      return list.find((t) => `${t.value}` === `${val}`)?.label || val;
    }
  }

  function handleSizeChange(pageSize: number) {
    emits('update:pageSize', pageSize);
    rootInstance?.exposed?.exec();
  }

  function handleCurrentChange(pageNum: number) {
    emits('update:pageNum', pageNum);
    rootInstance?.exposed?.exec();
  }

  /** el-table原生事件的统一接口 */
  function handleTableEvent(type: string, ...arr: any[]) {
    emits('onTableEvent', type, ...arr);
  }

  /** 自定义事件的统一接口 */
  function handleCusEvent(type: string, ...arr: any[]) {
    emits('onCusEvent', type, ...arr);
  }

  defineExpose({
    tableRef,
    getDictName,
    handleSizeChange,
    handleCurrentChange,
    handleTableEvent,
    handleCusEvent,
  });
</script>
