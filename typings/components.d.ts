/** 自定义组件增加ts类型 */
import '@vue/runtime-core';

import UiComponents from '@/components/ui-components/index.vue';
import UiSceneDialog from '@/components/ui-scene-dialog/index.vue';
import UiSceneDrawer from '@/components/ui-scene-drawer/index.vue';
import UiSceneQuery from '@/components/ui-scene-query/index.vue';
import UiScheme from '@/components/ui-scheme/index.vue';
// import UiQuery from '@/components/ui-query/index.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    UiScheme: typeof UiScheme;
    UiSceneQuery: typeof UiSceneQuery;
    UiSceneDrawer: typeof UiSceneDrawer;
    UiComponents: typeof UiComponents;
    UiSceneDialog: typeof UiSceneDialog;
    // UiQuery: typeof UiQuery;
  }
}
