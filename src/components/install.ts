import UiComponents from './ui-components/index.vue';
import UiQuery from './ui-query/index.vue';
import UiSceneDialog from './ui-scene-dialog/index.vue';
import UiSceneDrawer from './ui-scene-drawer/index.vue';
import UiSceneQuery from './ui-scene-query/index.vue';
import UiScheme from './ui-scheme/index.vue';
import UiTable from './ui-table/index.vue';

const commonComponents: Record<string, any> = {
  UiScheme,
  UiSceneQuery,
  UiSceneDrawer,
  UiSceneDialog,
  UiQuery,
  UiComponents,
  UiTable,
};

export default {
  install(Vue: { component: (arg0: string, arg1: any) => void }) {
    Object.keys(commonComponents).forEach((key) => {
      Vue.component(key, commonComponents[key]);
    });
  },
};
