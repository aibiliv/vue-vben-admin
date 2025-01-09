<script setup lang="tsx">
import { ref } from 'vue';
import Query from '#/components/Query/index';
import Table from '#/components/Table/index';
import Page from '#/components/Page/index';
import Edit from './components/EditDialog.vue';

const QUERY_INIT = {
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
};
const emit = defineEmits(['jump']);
const query = ref(QUERY_INIT);

const search = () => {
  console.log('点击查询');
};
const reset = () => {
  query.value = {
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
  };
  search();
};

const table = ref();
let page = ref({
  size: 10,
  current: 1,
  total: 100,
});
let tableData = ref([
  { id: 1, date: '2016-05-02', name: 'wangxiaohu1', address: 'dsadfasdfafg' },
  { id: 2, date: '2016-05-04', name: 'wangxiaohu2', address: 'dsadfasdfafg' },
]);
let tableHeader = ref([
  { prop: 'date', label: '人员' },
  { prop: 'name', label: '手机号' },
  { prop: 'address', label: '报警区域' },
  { prop: 'address', label: '报警类型' },
  { prop: 'address', label: '原因' },
  { prop: 'address', label: '报警时间' },
  { prop: 'address', label: '状态' },
  { prop: 'address', label: '处理人' },
  { prop: 'address', label: '处理时间' },
  { prop: 'address', label: '处理原因' },
]);
const getList = (val: any) => {
  console.log('val', val);
};
const selects = ref([]);
const changeSelection = (selection: []) => {
  console.log('selection', selection);

  selects.value = selection;
};
const clear = () => {
  table.value.clearSelection();
};

const goDetail = (val: any) => {
  emit('jump', 'Detail', val);
};

const dialog = ref({
  title: '',
  show: false,
  type: '',
  initData: {},
});
const edit = (row: any) => {
  dialog.value = {
    title: row.id ? '编辑' : '新增',
    type: row.id ? 'edit' : 'add',
    show: true,
    initData: row.id ? row : {},
  };
};
</script>

<template>
  <Page>
    <Query @search="search" @reset="reset">
      <el-form-item label="状态">
        <el-select v-model="query.a" placeholder="请选择">
          <el-option label="未处理" value="1" />
          <el-option label="已处理" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="报警类型">
        <el-select v-model="query.b" placeholder="请选择">
          <el-option label="进入重点区域" value="1" />
          <el-option label="停留超时" value="2" />
          <el-option label="人员聚集" value="3" />
          <el-option label="离开区域" value="4" />
          <el-option label="信标低电量" value="5" />
          <el-option label="SOS报警" value="6" />
        </el-select>
      </el-form-item>
      <el-form-item label="报警时间">
        <el-date-picker
          v-model="query.c"
          type="daterange"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="人员">
        <el-select v-model="query.d" placeholder="请选择">
          <el-option label="未处理" value="1" />
          <el-option label="已处理" value="2" />
        </el-select>
      </el-form-item>
    </Query>

    <Table
      ref="table"
      v-model:table-header="tableHeader"
      v-model:current-page="page.current"
      v-model:page-size="page.size"
      :table-data="tableData"
      :total="page.total"
      :showSelection="true"
      @change-page="getList"
      @changeSelection="changeSelection"
      @import="getList"
      @export="getList"
    >
      <template #leftBtns>
        <el-space>
          <el-button type="primary" @click="edit">新增</el-button>
        </el-space>
      </template>
      <template #operation="{ scope }">
        <el-space>
          <el-button link type="primary" @click="goDetail(scope.row)">
            详情
          </el-button>
          <el-button link type="primary" @click="edit(scope.row)">
            编辑
          </el-button>
        </el-space>
      </template>
      <template #bottomBtns>
        <el-space>
          <span>已选{{ selects.length }}条</span>
          <el-button @click="clear">清空</el-button>
        </el-space>
      </template>
    </Table>

    <Edit
      v-if="dialog.show"
      v-model:show="dialog.show"
      :type="dialog.type"
      :title="dialog.title"
      :init-data="dialog.initData"
    />
  </Page>
</template>
