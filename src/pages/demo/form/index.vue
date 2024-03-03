<template>
  <el-radio-group v-model="mode">
    <el-radio value="form">form</el-radio>
    <el-radio value="detail">detail</el-radio>
  </el-radio-group>
  <div>
    <UiScheme
      ref="formRef"
      :mode="mode"
      :schemes="formSchemes"
      :dicts="dicts"
      :detail="detail"
      @onFormChange="handleFormChange"
    />
    <el-button type="primary" @click="handelSubmit">提交</el-button>
    <el-button type="success" @click="handelGetInitVal">获取初始值</el-button>
    <el-button type="warning" @click="handleCompare">判断表单是否修改</el-button>
  </div>
</template>

<script setup lang="ts">
  import { IFormMode, IOnFormChange } from '@/components/ui-scheme/_props';
  import * as Schemes from './schemes';

  import { DemoAPI } from 'demo-database';
  import { storeToRefs } from 'pinia';
  import { onBeforeMount, ref } from 'vue';
  import { useSceneQueryHook } from '../scene-query/useSceneQuery';

  const sceneQueryHook = useSceneQueryHook();
  const { dicts } = storeToRefs(sceneQueryHook);

  const formSchemes = ref(Schemes.scheme);
  const formRef = ref();

  const mode = ref<IFormMode>('form');
  const detail = ref({});

  const handelSubmit = async () => {
    const res = await formRef.value.getForm();
    console.info('表单值:', res);
  };

  /** 监听表单变化, 可用于表单联动 */
  const handleFormChange: IOnFormChange = (prop, val, { setPropVal }) => {
    if (prop === 'gender') {
      if (val === '2') {
        // 表单联动, 设置年龄为18
        setPropVal('age', 18);
      }
    }
  };

  const handelGetInitVal = async () => {
    const res = await formRef.value.getInitVal();
    console.info('初始值:', res);
  };

  const handleCompare = () => {
    const res = formRef.value.getCompare();
    console.info('表单是否修改:', res);
  };

  onBeforeMount(async () => {
    const userRes = await DemoAPI.getUserList();
    const id = userRes.data.list[0].id;
    detail.value = await DemoAPI.getUser(id);
  });
</script>
