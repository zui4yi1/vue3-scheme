<template>
  <div class="home-main-body">
    <UiSceneQuery
      ref="UiSceneQueryRef"
      :querySchemes="Schemes.querySchemes"
      :tableSchemes="Schemes.tableSchemes"
      :dicts="dicts"
      :queryApi="DemoAPI.getUserList"
      :tableProps="{ isSelectable: true }"
      @onCusEvent="handleCusEvent"
    >
      <template #controls>
        <el-button type="primary" @click="handleCusEvent('new')">新增</el-button>
        <el-button type="primary" @click="checkAll">全选</el-button>
      </template>
    </UiSceneQuery>
    <UiSceneDrawer ref="drawerRef" :components="[TheForm]" @onCusEvent="handleCusEvent" />
  </div>
</template>

<script setup lang="ts">
  import * as Schemes from '../form/schemes';

  import { DrawerCancelBtn } from '@/utils/constants';
  import { ElConfirm } from '@/utils/tools';
  import { DemoAPI } from 'demo-database';
  import { storeToRefs } from 'pinia';
  import TheForm from '../components/TheForm.vue';
  import { useSceneQueryHook } from './useSceneQuery';

  const sceneQueryHook = useSceneQueryHook();
  const { dicts, UiSceneQueryRef, drawerRef } = storeToRefs(sceneQueryHook);

  function checkAll() {
    // 通过tableRef可调用el-table的所有api
    UiSceneQueryRef.value.tableRef.toggleAllSelection();
  }

  function handleCusEvent(type: string, ...arr: any[]) {
    const { id, userName } = arr[0] || {};
    const formParam = { id, type };
    switch (type) {
      case 'delete':
        ElConfirm(`确认删除${userName}吗?`).then(() => {
          sceneQueryHook.deleteUser(id);
        });
        break;
      case 'detail':
        drawerRef.value?.openDrawer('TheForm', '详情', formParam, DrawerCancelBtn);
        break;
      case 'edit':
        drawerRef.value?.openDrawer('TheForm', '编辑', formParam);
        break;
      case 'new':
        drawerRef.value?.openDrawer('TheForm', '新增', { type });
        break;
      default:
        break;
    }
  }

  defineExpose({
    UiSceneQueryRef,
  });
</script>
