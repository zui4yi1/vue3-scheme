import { IDrawerFootButton } from '../ex-drawer/_props';

/**
 * 打开弹窗
 * @description 四个参数, 后二个可选
 * @param componentName 组件名
 * @param title 弹窗标题
 * @param componentOptions 自定义组件onOpen接收的参数
 * @param props el-dialog的原生组件属性
 *
 */
export type IOpenDialog = (
  componentName: string,
  title: string,
  componentOptions?: Record<string, any>,
  props?: {
    dialogProps?: Record<string, any>;
    btns?: IDrawerFootButton[];
  },
) => void;

export type IUiSceneDialog = {
  /** 打开弹窗 */
  openDialog: IOpenDialog;
  /** 关闭 */
  close: () => void;
};
