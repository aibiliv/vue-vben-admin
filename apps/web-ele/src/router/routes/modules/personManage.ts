import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '人员管理',
    },
    name: 'PersonManage',
    path: '/personManage',
    children: [
      {
        name: 'personPositionIndex',
        path: '/personManage/personPositionIndex',
        component: () => import('#/views/personManage/personPosition/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: '人员定位',
        },
      },
    ],
  },
];

export default routes;
