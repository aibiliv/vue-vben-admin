<script setup lang="tsx">
import { ref } from 'vue';
import Query from '#/components/Query/index';
import Table from '#/components/Table/index';
import Page from '#/components/Page/index';
import Edit from './components/EditDialog.vue';

defineOptions({
  name: 'List',
});
const emit = defineEmits(['jump']);
const query = ref({
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
});

const search = () => {
  console.log('点击查询');
};
const reset = () => {
  console.log('点击重置');
};

const table = ref();
let page = ref({
  size: 10,
  current: 1,
  total: 100,
});
let tableData = ref([
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu1',
    address: 'dsadfasdfafg',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu2',
    address: 'dsadfasdfafg',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu3',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu31',
        address: 'dsadfasdfafg',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu32',
        address: 'dsadfasdfafg',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu4',
    address: 'dsadfasdfafg',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu4',
    address: 'dsadfasdfafg1',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu4',
    address: 'dsadfasdfafg2',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu4',
    address: 'dsadfasdfafg3',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu44',
    address: 'dsadfasdfafg4',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu4',
    address: 'dsadfasdfafg',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu4',
    address: 'dsadfasdfafg',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu4',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu4',
  },
  {
    id: 4,
    date: '2016-05-55',
    name: 'wangxiaohu66',
  },
  // {
  //   id: 4,
  //   date: "2016-05-03",
  //   name: "wangxiaohu4"
  // },
  // {
  //   id: 4,
  //   date: "2016-05-03",
  //   name: "wangxiaohu4"
  // },
  // {
  //   id: 4,
  //   date: "2016-05-03",
  //   name: "wangxiaohu4"
  // }
]);
let tableHeader = ref([
  { prop: 'date', label: '日期', width: '600px' },
  {
    prop: 'name',
    label: '名字',
    width: '600px',
    align: 'center',
    children: [
      { prop: 'name', label: '名字1', width: '300px' },
      { prop: 'name', label: '名字2', width: '300px' },
    ],
  },
  {
    prop: 'address',
    label: '地址',
    width: '600px',
    formatter: (row: { address: string }) => (
      <el-button size="small" type="primary">
        范德萨发sss生的{row.address}
      </el-button>
    ),
  },
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

let dialog = ref({
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
      <el-form-item label="第一项">
        <el-input v-model="query.a" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="第二项">
        <el-input v-model="query.a" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="第三项">
        <el-input v-model="query.b" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="第四项">
        <el-input v-model="query.c" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="第五项">
        <el-input v-model="query.d" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="第六项">
        <el-input v-model="query.e" placeholder="请输入" />
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
