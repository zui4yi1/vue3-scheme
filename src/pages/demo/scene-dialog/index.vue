<template>
  <div>1. dialog与内容分离。2.多个dialog可统一管理。</div>
  <div style="margin-top: 40px">
    <el-button @click="openDialog('TheComOne', '抽屉1')">内容1</el-button>
    <el-button @click="openDialog('TheComTwo', '抽屉2')">内容2</el-button>
    <el-button @click="openDialog('TheForm', '表单')">表单</el-button>
  </div>
  <UiSceneDialog ref="dialogRef" :components="[TheComOne, TheComTwo, TheForm]" />
</template>
<script setup lang="ts">
  import { IUiSceneDialog } from '@/components/ui-scene-dialog/_props';
  import { DrawerCancelBtn } from '@/utils/constants';
  import { ref } from 'vue';
  import TheForm from '../components/TheForm.vue';
  import TheComOne from '../scene-drawer/components/TheComOne.vue';
  import TheComTwo from '../scene-drawer/components/TheComTwo.vue';

  const dialogRef = ref({} as IUiSceneDialog);

  function openDialog(componentName: string, title: string) {
    const dialogProps = componentName === 'TheForm' ? {} : DrawerCancelBtn;
    dialogRef.value?.openDialog(componentName, title, {}, dialogProps);
  }
</script>
