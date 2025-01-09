import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '感知报警',
      hideChildrenInMenu: true,
    },
    name: 'PerceivedAlarm',
    path: '/perceivedAlarm',
    children: [
      {
        name: 'PerceivedAlarmIndex',
        path: '/perceivedAlarmIndex',
        component: () => import('#/views/perceivedAlarm/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: '感知报警',
        },
        // children: [
        //   {
        //     name: 'PositionAlarmIndex',
        //     path: '/perceivedAlarm/positionAlarmIndex',
        //     component: () =>
        //       import('#/views/perceivedAlarm/positionAlarm/index.vue'),
        //     meta: {
        //       icon: 'carbon:workspace',
        //       title: '定位报警',
        //     },
        //   },
        //   {
        //     name: 'TunnelAlarmIndex',
        //     path: '/perceivedAlarm/tunnelAlarmIndex',
        //     component: () =>
        //       import('#/views/perceivedAlarm/tunnelAlarm/index.vue'),
        //     meta: {
        //       icon: 'carbon:workspace',
        //       title: '隧道报警',
        //     },
        //   },
        // ],
      },
    ],
  },
];

export default routes;
