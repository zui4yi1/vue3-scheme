import { IUiSceneDrawer } from '@/components/ui-scene-drawer/_props';
import { IUiSceneQueryAPI } from '@/components/ui-scene-query/_props';
import { IUIScheme } from '@/components/ui-scheme/_props';
import { DemoAPI } from 'demo-database';
import { defineStore } from 'pinia';
import { onBeforeMount, ref } from 'vue';

export const useSceneQueryHook = defineStore('store-demo-query', () => {
  const dicts = ref<IDicts>({});

  /** 增删查改一般就用到这三个ref */
  const UiSceneQueryRef = ref({} as IUiSceneQueryAPI);
  const drawerRef = ref({} as IUiSceneDrawer);
  const uiSchemeRef = ref({} as IUIScheme);

  const curUser = ref({} as any);

  async function deleteUser(id: string) {
    await DemoAPI.deleteUser(id);
    UiSceneQueryRef.value?.resetQueryList?.();
  }

  async function getUser(id: string) {
    curUser.value = await DemoAPI.getUser(id);
  }

  async function addUser(data: any) {
    await DemoAPI.addUser(data);
    UiSceneQueryRef.value?.resetQueryList?.();
  }

  async function updateUser(data: any) {
    await DemoAPI.updateUser(data);
    UiSceneQueryRef.value?.queryList?.();
  }

  function reset() {
    curUser.value = {};
  }
  onBeforeMount(async () => {
    reset();
    DemoAPI.getDicts(['gender', 'nation', 'hobby', 'skill', 'city']).then((res: IDicts) => {
      dicts.value = res;
    });
  });
  return {
    UiSceneQueryRef,
    uiSchemeRef,
    drawerRef,

    dicts,
    curUser,

    updateUser,
    addUser,
    deleteUser,
    getUser,
    reset,
  };
});
