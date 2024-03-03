import { PropType } from 'vue';
import { IScheme } from '../ui-scheme/_props';

/**
 * @summary
 * @description
 * @param {IScheme[]} querySchemes 查询方案
 * @param {Object} dicts 字典集
 *
 */
export const props = {
  querySchemes: {
    type: Array as PropType<IScheme[]>,
    default: () => [],
  },
  dicts: {
    type: Object,
    default: () => {},
  },
};
