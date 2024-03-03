<template>
  <div>1. 抽屉与内容分离。2.多个抽屉可统一管理。</div>
  <div style="margin-top: 40px">
    <el-button @click="openDrawer('TheComOne', '抽屉1')">内容1</el-button>
    <el-button @click="openDrawer('TheComTwo', '抽屉2')">内容2</el-button>
    <el-button @click="openDrawer('TheForm', '表单')">表单</el-button>
  </div>
  <UiSceneDrawer ref="drawerRef" :components="[TheComOne, TheComTwo, TheForm]" />
</template>
<script setup lang="ts">
  import { IUiSceneDrawer } from '@/components/ui-scene-drawer/_props';
  import { DrawerCancelBtn } from '@/utils/constants';
  import { ref } from 'vue';
  import TheForm from '../components/TheForm.vue';
  import TheComOne from './components/TheComOne.vue';
  import TheComTwo from './components/TheComTwo.vue';

  const drawerRef = ref({} as IUiSceneDrawer);

  function openDrawer(componentName: string, title: string) {
    const drawerProps = componentName === 'TheForm' ? {} : DrawerCancelBtn;
    drawerRef.value?.openDrawer(componentName, title, {}, drawerProps);
  }
</script>
