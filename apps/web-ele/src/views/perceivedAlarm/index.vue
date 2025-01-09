<script setup lang="tsx">
import { ref } from 'vue';
import Position from './positionAlarm/index.vue';
import Tunnel from './tunnelAlarm/index.vue';
import Page from '#/components/Page/index';

const COM_MAP: any = {
  Position: Position,
  Tunnel: Tunnel,
};
const current = ref('List');
const params = ref({});
const changeView = (view: any, arg: any) => {
  params.value = arg;
  current.value = view;
};

const tabs = [
  { label: '定位报警', name: 'Position' },
  { label: '隧道报警', name: 'Tunnel' },
  { label: '环境报警', name: 'Environment' },
  { label: '形变报警', name: 'Deformation' },
  { label: '报警设置', name: 'Setting' },
];
const activeName = ref('Position');
</script>

<template>
  <Page class="perceived-alarm p-4">
    <el-tabs v-model="activeName" class="page-tabs">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
      </el-tab-pane>
    </el-tabs>
    <component :is="COM_MAP[activeName]" @jump="changeView"></component>
  </Page>
</template>

<style lang="scss" scoped>
.perceived-alarm {
  .page-tabs {
    :deep(.el-tabs__header) {
      padding: 0 16px;
      background: #fff;
      margin-bottom: 0;
    }
    :deep(.el-tabs__nav-wrap:after) {
      // display: none;
    }
  }
  // :deep(.query-box) {
  //   border: 1px solid #ebeef5;
  //   border-radius: 6px;
  // }
}
</style>
