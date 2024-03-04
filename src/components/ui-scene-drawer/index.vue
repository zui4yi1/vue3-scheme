<template>
  <ex-drawer ref="drawerRef" :title="title" v-bind="drawerProps" @onCusEvent="handleCusEvent">
    <!--header插糟-->
    <template #header="{ close, titleId, titleClass }" v-if="$slots.header">
      <slot name="header" :close="close" :title-id="titleId" :title-class="titleClass" />
    </template>
    <!--body-->
    <ui-components ref="componentsRef" :type="componentName" :components="components" />
    <!--footer插糟-->
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </ex-drawer>
</template>

<script lang="ts">
  export default {
    name: 'ui-scene-drawer',
  };
</script>

<script setup lang="ts">
  import { ComponentInternalInstance, getCurrentInstance, nextTick, ref } from 'vue';
  import ExDrawer from '../../components/ex-drawer/index.vue';
  import { IOpenDrawer } from './_props';

  /**
   * @param {Array} components 自定义组件列表
   */
  defineProps({
    components: {
      type: Array,
      default: () => [],
    },
  });

  const componentsRef = ref(null as any);
  const drawerRef = ref(null as any);
  const curInstance = (getCurrentInstance() || {}) as ComponentInternalInstance;

  const opener = ref(null as any);
  const title = ref('');
  const componentName = ref('');
  const drawerProps = ref({} as any);

  function resetProps() {
    title.value = '';
    componentName.value = '';
    drawerProps.value = {};
  }

  const openDrawer: IOpenDrawer = (
    _componentName,
    _title = '',
    _componentOptions = {},
    _drawerProps = {},
  ) => {
    opener.value = curInstance.parent;
    title.value = _title;
    componentName.value = _componentName;
    drawerProps.value = _drawerProps;
    drawerRef.value?.openDrawer();
    nextTick(() => {
      componentsRef.value?.onOpen(_componentOptions, curInstance, opener.value);
    });
  };

  function handleCusEvent(event: string) {
    componentsRef.value?.onCusEvent(event, curInstance, opener.value);
  }

  function close() {
    resetProps();
    drawerRef.value?.close();
  }

  defineExpose({
    openDrawer,
    close,
  });
</script>
