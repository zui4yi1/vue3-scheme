import { IDrawerFootButton } from '../ex-drawer/_props';

/**
 * 打开抽屉
 * @description 四个参数, 后二个可选
 * @param componentName 组件名
 * @param title 抽屉标题
 * @param componentOptions 自定义组件onOpen接收的参数
 * @param props el-drawer的原生组件属性
 *
 */
export type IOpenDrawer = (
  componentName: string,
  title: string,
  componentOptions?: Record<string, any>,
  props?: {
    drawerProps?: Record<string, any>;
    btns?: IDrawerFootButton[];
  },
) => void;

export type IUiSceneDrawer = {
  /** 打开抽屉, 四个参数 {@link IOpenDrawer} */
  openDrawer: IOpenDrawer;
  /** 关闭 */
  close: () => void;
};
