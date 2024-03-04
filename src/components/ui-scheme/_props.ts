import { FormInstance } from 'element-plus';
import { Component, PropType } from 'vue';

/** ui-scheme实例暴露的方法, 可接收表单值的泛型 */
export interface IUIScheme<T = any> {
  formRef: FormInstance;
  reset: () => void;
  getForm: () => Promise<T>;
  getFormFilterEmpty: () => Promise<T>;
  getCompare: () => {
    isChange: boolean;
    changeKeys: string[];
    form: T;
    originForm: T;
  };
  setPropVal: (prop: string, val: any) => void;
  getInitVal: () => T;
  findSchemeItem: (scheme: IScheme[], prop: string) => ISchemeItem | null;
  clearValidate: () => void;
}

/**
 * @summary
 * @description
 * @param {string} type 组件名字, 全局组件
 * @param {string} prop 字段名
 * @param {Object} props 组件的属性
 * @param {string} label 标签名
 * @param {Array} rules 校验规则
 * @param {Object} formItemProps 表单项的属性, 作用于el-form-item相同
 * @param {Boolean} isCustom 是否使用了自定义组件（严格说是非全局组件）
 * @param {string} dictName 带选项时的字典名, 不传则取prop
 * @param {Object} component 自定义组件, 需isCustom为true.
 * @param {Boolean} visible 是否可见
 * @param {Boolean} isRemove 是否删除, 注意若删除则form表单也会移除此属性
 */
export interface ISchemeItem {
  type: string;
  prop: string;
  props?: any;
  label?: string;
  rules?: any[];
  formItemProps?: any;
  isCustom?: boolean;
  dictName?: string; // 带选项时的字典名, 不传则取prop
  component?: any;
  visible?: boolean;
  isRemove?: boolean;
}

/**
 * @summary
 * @description
 * @param {Component | string} head 表单头部组件, 组件对象或组件的string名称, 如果你的组件已注册为全局组件的话用string名称更方便
 * @param {Object} headProps 表单头部组件的属性
 * @param {ISchemeItem[]} items 表单配置项
 */
export interface IScheme {
  head?: Component | string;
  headProps?: any;
  items: ISchemeItem[];
}

/** form的change事件类型 */
export type IOnFormChange = (
  prop: string,
  value: any,
  { formData, setPropVal }: { formData: any; setPropVal: (prop: string, value: any) => void },
) => void;

/**
 * 表单的模式, 默认form
 * @summary form-表单模式, search-查询模式, detail-详情模式
 * @description form和search都是表单模式, 区别是search不校验且取值时自动过滤空值
 */
export type IFormMode = 'form' | 'search' | 'detail';

/**
 * @summary
 * @description
 * @param {IScheme[]} schemes 表单配置项
 * @param {'form'|'search'|'detail'} mode 表单的模式, 默认form
 * @param {Object} detail 表单数据, 同时作为表单的初始值
 * @param {Object} dicts 字典集
 * @param {Object} rules 表单的校验规则
 * @param {Number} labelWidth 标签宽度
 * @param {Number} contentWidth 内容宽度
 * @param {Component[]} components 自定义组件
 * @param {Object} formProps 表单的属性, 作用于el-form相同
 * @param {String} emptyText 为空时的占位符
 * @param {Component} appendComponent 尾部扩展组件, 如查询模块中的放置查询/重置按钮
 *
 */
export const props = {
  schemes: {
    type: Array as PropType<IScheme[]>,
    default: () => [],
  },
  mode: {
    type: String as PropType<IFormMode>,
    default: 'form',
  },
  detail: {
    type: Object,
    default: () => ({}),
  },
  dicts: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: Number,
    default: 120,
  },
  contentWidth: {
    type: Number,
    default: 200,
  },
  components: {
    type: Array as PropType<Component[]>,
    default: () => [],
  },
  formProps: {
    type: Object,
    default: () => ({}),
  },
  // 为空时的占位符
  emptyText: {
    type: String,
    default: '',
  },
  // 尾部扩展组件
  appendComponent: {
    type: [Object, String],
    default: undefined,
  },
};
