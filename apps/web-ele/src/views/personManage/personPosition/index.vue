<script setup lang="tsx">
import { ref } from 'vue';
import RealTimePositioning from './RealTimePositioning.vue';
import Statistics from './Statistics.vue';
import Page from '#/components/Page/index';

const COM_MAP: any = {
  RealTimePositioning: RealTimePositioning,
  Statistics: Statistics,
};
const current = ref('List');
const params = ref({});
const changeView = (view: any, arg: any) => {
  params.value = arg;
  current.value = view;
};

const tabs = [
  { label: '实时定位', name: 'RealTimePositioning' },
  { label: '统计分析', name: 'Statistics' },
  // { label: '报警规则设置', name: 'Environment' }
];
const activeName = ref('RealTimePositioning');
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
