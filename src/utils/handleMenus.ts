/**
 * 用来处理请求过来的路由信息的工具函数
 */
import { IMenu } from '@/api/menu';
import Home from '@/pages/home/index.vue';
import Empty from '@/pages/home/layout/empty.vue';

// 遍历后台传来的路由字符串，转换为组件对象
export function formatMenu(menus: IMenu[]) {
  menus.forEach((menu) => {
    if (!menu.path) menu.path = '/';

    if (menu.component?.includes('selfwebsite')) {
      // 子系统路由带selfwebsite(本域名内子系统) 例如：http://selfwebsite/jinwu/#/cluster/clusterCommunity
      menu.component = menu.component.replace('selfwebsite', window.location.hostname);
    }
    if (menu.targetType === 2) {
      // 2内嵌
      menu.meta.isLink = menu.component;
      menu.component = null;
      menu.meta.isIframe = true;
    } else if (menu.targetType === 3) {
      // 3外链
      menu.meta.isLink = menu.component;
      menu.meta.isIframe = false;
    }

    if (menu.component) {
      // Layout ParentView 组件特殊处理
      if (menu.component === 'Layout') {
        menu.component = Home;
      } else {
        menu.component = loadView(menu.component);
      }
    } else {
      // 不能为null, 否则router.addRoute加不进路由表
      menu.component = Empty;
    }
    if (menu.children !== null && menu.children && menu.children.length) {
      menu.children = formatMenu(menu.children);
    } else {
      menu.children = [];
    }
  });
  return menus;
}

export const loadView = (componentPath: string) => {
  return () => import(/* @vite-ignore */ `/src/pages${componentPath}.vue`);
};
