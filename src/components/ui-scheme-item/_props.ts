/**
 * @summary
 * @description
 * @param {String} label 表单控件的显示名称
 * @param {Any} value 表单控件的值
 * @param {String} type 表单控件的类型名称
 * @param {String} prop 表单控件的属性名称
 * @param {Object} form 表单对象, 来自父组件ui-scheme
 * @param {Boolean} multiple 是否多选
 * @param {String} mode 表单控件的模式, 默认为form
 * @param {Array} rules 表单控件的校验规则
 * @param {Object} props 表单控件的属性, 为el-form-item的原生属性
 * @param {Number} width 表单控件的宽度
 *
 */
export const props = {
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number, Boolean, Object, Array],
    default: undefined, // 注意此处为undefined, 不能有默认值, 默认会影响初始化的判断
  },
  type: {
    type: String,
    default: '',
  },
  prop: {
    type: String,
    default: '',
  },
  form: {
    type: Object,
    default: () => {},
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'form',
  },
  rules: {
    type: Object,
    default: () => undefined, // 注意此处为undefined, 否则会覆盖form层级的
  },
  props: {
    type: Object,
    default: () => {},
  },
  width: {
    type: Number,
    default: 320,
  },
};
