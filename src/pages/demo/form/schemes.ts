import { IScheme, ISchemeItem } from '@/components/ui-scheme/_props';
import { ITableColumn } from '@/components/ui-table/_props';
import { markRaw } from 'vue';

import TheCusCom from '../components/TheCusCom.vue';
import TheCusOperation from '../components/TheCusOperation.vue';
import TheFormHeader from '../components/TheFormHeader.vue';

export const FormRules = {
  hobby: [{ required: true, message: '该项不可为空' }],
  nation: [{ required: true, message: '该项不可为空' }],
  gender: [{ required: true, message: '该项不可为空' }],
};

export const scheme: IScheme[] = [
  {
    head: markRaw(TheFormHeader),
    headProps: {
      title: '个人信息',
    },
    items: [
      {
        type: 'el-input',
        prop: 'id',
        label: 'id',
        visible: false,
      },
      {
        type: 'el-input',
        prop: 'userName',
        label: '用户名',
        rules: [
          {
            required: true,
            message: '该项不可为空',
          },
        ],
      },
      {
        type: 'el-radio',
        prop: 'gender',
        label: '性别',
      },
      {
        type: 'el-select',
        prop: 'nation',
        label: '民族',
      },
      {
        type: 'el-checkbox',
        prop: 'hobby',
        label: '爱好',
      },
      {
        type: 'el-input',
        prop: 'age',
        label: '年龄',
      },
      {
        type: 'el-date-picker',
        prop: 'birthDate',
        label: '出生日期',
        props: {
          placeholder: '选择日期',
          'value-format': 'YYYY-MM-DD',
        },
      },

      {
        type: 'el-select',
        prop: 'skill',
        label: '特长',
        props: {
          multiple: true,
        },
      },

      {
        type: 'TheCusCom',
        prop: 'cus1',
        isCustom: true,
        label: '自定义组件',
        component: markRaw(TheCusCom),
      },
    ],
  },
  {
    head: markRaw(TheFormHeader),
    headProps: {
      title: '家庭地址',
    },
    items: [
      {
        type: 'el-cascader',
        prop: 'city',
        label: '省市区',
      },
      {
        type: 'el-input',
        prop: 'address',
        label: '地址',
      },
    ],
  },
];

export const tableSchemes: ITableColumn[] = [
  {
    label: '姓名',
    prop: 'userName',
  },
  {
    label: '性别',
    prop: 'gender',
    isDict: true,
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '民族',
    prop: 'nation',
    isDict: true,
  },
  {
    label: '爱好',
    prop: 'hobby',
    isDict: true,
  },
  {
    label: '特长',
    prop: 'skill',
    isDict: true,
  },
  {
    label: '出生日期',
    prop: 'birthDate',
  },
  {
    label: '操作',
    prop: 'ops',
    showOverflowTooltip: false,
    component: markRaw(TheCusOperation),
  },
];

export const querySchemes = ((): IScheme[] => {
  const arr = scheme[0].items;
  const props = ['userName', 'nation', 'birthDate'];
  const items = (props
    .map((k) => {
      const tmp = arr.find((t) => t.prop === k);
      return tmp;
    })
    .filter((t) => !!t) || []) as ISchemeItem[];
  return [
    {
      items,
    },
  ];
})();
