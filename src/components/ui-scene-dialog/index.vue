<template>
  <ex-dialog
    ref="dialogRef"
    :title="title"
    :closeOnClickModal="closeOnClickModal"
    v-bind="dialogProps"
    @onCusEvent="handleCusEvent"
  >
    <!--header插糟-->
    <template #header="{ close, titleId, titleClass }" v-if="$slots.header">
      <slot name="header" :close="close" :title-id="titleId" :title-class="titleClass" />
    </template>
    <ui-components ref="componentsRef" :type="componentName" :components="components" />
    <!--footer插糟-->
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </ex-dialog>
</template>

<script lang="ts">
  export default {
    name: 'ui-scene-dialog',
  };
</script>

<script setup lang="ts">
  import ExDialog from '@/components/ex-dialog/index.vue';
  import { ComponentInternalInstance, getCurrentInstance, nextTick, ref } from 'vue';
  import { IOpenDialog } from './_props';

  /**
   * @param {Boolean} closeOnClickModal 是否点击遮罩层关闭弹窗, 默认false
   * @param {Array} components 自定义组件列表
   */
  defineProps({
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    components: {
      type: Array,
      default: () => [],
    },
  });

  const componentsRef = ref(null as any);
  const dialogRef = ref(null as any);
  const curInstance = (getCurrentInstance() || {}) as ComponentInternalInstance;

  const opener = ref(null as any);
  const title = ref('');
  const componentName = ref('');
  const dialogProps = ref({} as any);

  /**
   * 重置弹窗参数
   */
  function resetProps() {
    title.value = '';
    componentName.value = '';
    dialogProps.value = {};
  }

  /**
   * 打开弹窗
   * @param {String} _componentName 组件名称
   * @param {String} _title 弹窗标题
   * @param {Object} _componentOptions 组件参数
   * @param {Object} _dialogProps 弹窗参数
   */
  const openDialog: IOpenDialog = (
    _componentName,
    _title = '',
    _componentOptions = {},
    _dialogProps = {},
  ) => {
    opener.value = curInstance.parent;
    title.value = _title;
    componentName.value = _componentName;
    dialogProps.value = _dialogProps;
    dialogRef.value?.openDialog();
    nextTick(() => {
      componentsRef.value?.onOpen(_componentOptions, curInstance, opener.value);
    });
  };

  /**
   * 自定义事件
   * @param {String} event 事件名称
   */
  function handleCusEvent(event: string) {
    componentsRef.value?.onCusEvent(event, curInstance, opener.value);
  }

  function close() {
    resetProps();
    dialogRef.value?.close();
  }

  defineExpose({
    openDialog,
    close,
  });
</script>
