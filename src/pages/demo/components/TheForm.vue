<template>
  <div class="scheme-wrapper">
    <UiScheme
      ref="uiSchemeRef"
      :mode="mode"
      :schemes="Schemes.scheme"
      :rules="Schemes.FormRules || {}"
      :detail="curUser"
      :dicts="dicts"
      @onFormChange="handleFormChange"
    />
  </div>
</template>
<script lang="ts">
  export default {
    name: 'TheForm',
  };
</script>

<script setup lang="ts">
  import { IFormMode, IOnFormChange } from '@/components/ui-scheme/_props';
  import { storeToRefs } from 'pinia';
  import { ComponentInternalInstance, ref } from 'vue';
  import * as Schemes from '../form/schemes';
  import { useSceneQueryHook } from '../scene-query/useSceneQuery';

  const sceneQueryHook = useSceneQueryHook();
  const { dicts, curUser, uiSchemeRef } = storeToRefs(sceneQueryHook);

  const mode = ref<IFormMode>('form');
  let formType: 'new' | 'edit' | 'detail' = 'new';

  /** 打开组件时的勾子 */
  function onOpen(props: any) {
    const { id, type = 'new' } = props;
    formType = type;
    mode.value = ['edit', 'new'].includes(type) ? 'form' : 'detail';
    type === 'new' && sceneQueryHook.reset();
    id && sceneQueryHook.getUser(id);
  }

  /** 自定义事件, 即提交表单这些*/
  async function onCusEvent(eventName: string, layer: ComponentInternalInstance) {
    if (eventName === 'submit') {
      const data = await uiSchemeRef.value.getForm();
      if (!data) return;
      if (formType === 'edit') {
        sceneQueryHook.updateUser(data);
      } else {
        sceneQueryHook.addUser(data);
      }
      // 关闭抽屉或弹窗
      layer.exposed?.close?.();
    }
  }

  /** 表单联动 */
  const handleFormChange: IOnFormChange = (prop, val, { setPropVal }) => {
    // 每种prop类型单独写一个if
    if (prop === 'gender') {
      if (val === '2') {
        setPropVal('age', 18);
      }
    }
  };

  defineExpose({
    onOpen,
    onCusEvent,
  });
</script>
