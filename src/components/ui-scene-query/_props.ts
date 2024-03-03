import { Component, ComponentInternalInstance, ComputedRef, PropType } from 'vue';
import { IScheme } from '../ui-scheme/_props';
import { ITableColumn } from '../ui-table/_props';

export interface IUiSceneQueryAPI {
  /** table的句柄, 依此可执行el-table所有的api */
  tableRef: ComputedRef<any>;
  /** 执行组件queryRef内部的查询 */
  exec: () => void;
  /** 查询列表 */
  queryList: (conditions?: any) => Promise<void>;
  /** 重置条件 */
  resetPager: () => void;
  /** 重置条件并查询列表 */
  resetQueryList: () => void;
}
export const getQueryAPI = (opener: ComponentInternalInstance): IUiSceneQueryAPI => {
  return opener.exposed?.UiSceneQueryRef.value;
};

/**
 * @summary
 * @description
 * @param {IScheme[]} querySchemes 查询条件的配置
 * @param {IScheme[]} tableSchemes 表格的配置
 * @param {Component} controlsCard 查询条件的卡片组件(可不传, 可直接使用slot)
 * @param {Object} controlsCardProps 查询条件的卡片组件的props
 * @param {Object} dicts 字典集合
 * @param {Function} queryApi 自定义查询方法
 * @param {Function} beforeQuery 自定义查询前的钩子, 可用于修改查询条件
 * @param {Function} beforeRenderData 自定义渲染数据前的钩子, 可用于修改api返回的数据, 再显示到列表
 * @param {Function} afterRenderData 自定义渲染数据后的钩子, 可用于查询结束后的操作
 * @param {Boolean} autoQueryOnMounted 是否挂载时自动查询
 * @param {Object} dataMap 查询列表返回的数据映射, 只需要total和list, 默认total=res.data.total, list=res.data.list
 * @param {Object} tableProps ui-table组件(非el-table)的其它属性
 *
 */
export const props = {
  querySchemes: {
    type: Array as PropType<IScheme[]>,
    default: () => [],
  },
  tableSchemes: {
    type: Array as PropType<ITableColumn[]>,
    default: () => [],
  },
  controlsCard: {
    type: Object as PropType<Component>,
    default: undefined,
  },
  controlsCardProps: {
    type: Object,
    default: undefined,
  },
  dicts: {
    type: Object,
    default: () => {},
  },
  queryApi: {
    type: Function,
    default: undefined,
  },
  beforeQuery: {
    type: Function,
    default: undefined,
  },
  beforeRenderData: {
    type: Function,
    default: undefined,
  },
  afterRenderData: {
    type: Function,
    default: undefined,
  },
  autoQueryOnMounted: {
    type: Boolean,
    default: true,
  },
  // 数据映射, 默认total=res.data.total, list=res.data.list
  dataMap: {
    type: Object,
    default: () => ({
      total: 'total',
      list: 'list',
    }),
  },
  tableProps: {
    type: Object,
    default: () => ({}),
  },
};
