<template>
  <div ref="tableBox" class="tool-table-box">
    <!-- 控制面板 -->
    <OperationPanel
      v-if="showPanel"
      v-bind="attrs"
      v-model:size="computedSize"
      :sectors="tableHeaderOfPermission"
      @changeColumn="changeColumn"
    >
      <template #tabs>
        <slot name="tabs" />
      </template>
      <template #leftBtns>
        <slot name="leftBtns" />
      </template>
      <template #rightBtns>
        <slot name="rightBtns" />
      </template>
    </OperationPanel>
    <div id="table-container" class="table-container">
      <!-- 表格主体 -->
      <el-table
        ref="table"
        :key="key"
        v-loading.lock="loading"
        v-bind="attrs"
        :data="tableData"
        :row-key="rowKey"
        :default-expand-all="defaultExpandAll"
        :tree-props="treeProps"
        :height="height"
        :max-height="maxHeight"
        :lazy="lazy"
        :size="computedSize"
        :fit="true"
        :stripe="true"
        element-loading-text="拼命加载中"
        :border="resizable ? true : border"
        :expand-row-keys="expandRow.length > 0 ? expandRow : undefined"
        @selection-change="handleSelectionChange"
        @expand-change="handleExpendChange"
        @filter-change="handleFilterChange"
      >
        <el-table-column
          v-if="showSelection"
          :reserve-selection="reserveSelection"
          type="selection"
          :selectable="selectable"
          :resizable="false"
          width="50"
          fixed="left"
          align="center"
        />
        <el-table-column
          v-if="showIndex"
          width="65"
          fixed="left"
          type="index"
          label="序号"
          align="left"
          :resizable="false"
        />
        <slot>
          <ColumnItem
            v-for="(item, index) in props.tableHeader.filter(
              (res: any) => !res.hidden,
            )"
            :key="index"
            :tableHeader="item.children"
            :item="item"
            :resizable="resizable"
          >
            <template
              v-for="prop in getChildrenProps(item)"
              #[prop]="{ scope }"
            >
              <slot :name="prop" :scope="scope" />
            </template>
          </ColumnItem>
        </slot>
        <el-table-column
          v-if="showOperation"
          :fixed="operationFixed || undefined"
          :min-width="resizable ? operationColumnWidth : undefined"
          align="left"
          :width="resizable ? operationColumnWidth : undefined"
        >
          <!-- 操作列header插槽 -->
          <template #header>
            <slot name="operationHeader">
              <span>{{ operationColumnName }}</span>
            </slot>
          </template>
          <!-- 操作列作用域插槽 -->
          <template #default="scope">
            <slot name="operation" :scope="scope" />
          </template>
        </el-table-column>
        <template #append>
          <slot name="append" />
        </template>
      </el-table>
      <div v-if="showPage" class="table-bottom-box">
        <span v-if="$slots.bottomBtns">
          <slot name="bottomBtns" />
        </span>
        <el-pagination
          v-model:currentPage="props.currentPage"
          v-model:page-size="props.pageSize"
          :page-sizes="[5, 10, 15, 20, 50, 100]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="props.total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ref,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  watch,
} from 'vue';
import ColumnItem from './components/ColumnItem.vue';
import OperationPanel from './components/OperationPanel.vue';
import type { TableHeader } from 'element-plus/es/components/table/src/table-header';
import { useElementSize, useParentElement } from '@vueuse/core';
export default defineComponent({
  components: {
    OperationPanel,
    ColumnItem,
  },
  props: {
    loading: { type: Boolean, default: false },
    showPage: { type: Boolean, default: true }, //是否显示分页
    showPanel: { type: Boolean, default: true }, //是否显示操作面板
    showIndex: { type: Boolean, default: false }, //是否显示序号
    showSelection: { type: Boolean, default: false }, //是否显示勾选框
    reserveSelection: { type: Boolean, default: false }, //是否缓存已勾选行，通常用于分页勾选，默认关闭，开启时必须指定rowKey
    showOperation: { type: Boolean, default: true }, //是否显示操作列
    defaultExpandAll: { type: Boolean, default: false }, //是否默认展开所有
    rowKey: { type: String, default: 'id' }, //每行数据的唯一标识，
    tableData: { type: Array, default: () => [] },
    expandRow: { type: Array<any>, default: () => [] }, //展开行
    tableHeader: { type: Array, default: () => [] },
    total: { type: Number, default: 0 },
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 15 },
    operationColumnWidth: { type: Number, default: 200 }, // 操作列宽度
    operationColumnName: { type: String, default: '操作' }, //操作列名称
    operationFixed: { type: String, default: 'right' }, //操作列固定
    treeProps: {
      type: Object,
      default: () => {
        return { hasChildren: 'hasChildren', children: 'children' };
      },
    },
    height: { type: [String, Number], default: null },
    // maxHeight: { type: [String, Number], default: 550 },
    border: { type: Boolean, default: false },
    size: { type: String, default: 'small' },
    resizable: { type: Boolean, default: true },
    lazy: { type: Boolean, default: false },
  },
  setup(props: any, { attrs, slots, expose, emit }) {
    let maxHeight = ref<string | number>('580px');
    let key = ref(1);
    let computedSize = ref<any>('default');
    const table = ref();
    const tableHeaderOfPermission = computed(() => {
      return props.tableHeader;
    });
    const getChildrenProps = (item: any) => {
      const props: any[] = [];
      const func = (item: any) => {
        if (item.children && item.children.length > 0) {
          item.children.forEach((res: any) => {
            if (res.children && res.children.length > 0) {
              getChildrenProps(res.children);
            } else {
              if (res.prop && slots[res.prop]) {
                props.push(res.prop);
              }
            }
          });
        } else {
          if (item.prop && slots[item.prop]) {
            props.push(item.prop);
          }
        }
      };
      func(item);
      return props;
    };
    const selectable = (row: any) => {
      // 默认不禁用  如果想要禁用的话  请把想要禁用的那一条数据里手动添加 uncheckable = 1 这个字段
      let type = 0;
      if (row.uncheckable) {
        type = row.uncheckable;
      }
      return type === 0;
    };
    const sizeChange = (val: number) => {
      emit('update:current-page', 1);
      emit('update:page-size', val);
      emit('change-page', { page: 1, limit: val });
    };
    const currentChange = (val: number) => {
      emit('update:current-page', val);
      emit('change-page', {
        page: val,
        limit: props.pageSize,
      });
    };
    const changeColumn = (cols: TableHeader[]) => {
      key.value++; // 保证表格每次重新渲染
      emit('update:tableHeader', cols);
    };
    const handleSelectionChange = (selection: any[]) => {
      emit('changeSelection', selection);
    };
    const handleExpendChange = (row: any, expend: any) => {
      emit('expand-change', { row, expend });
    };
    const handleFilterChange = (filters: any[]) => {
      console.log(filters);
    };
    const toggleRowSelection = (item: any, status: boolean) => {
      table.value?.toggleRowSelection(item, status);
    };
    //清除选中
    const clearSelection = () => {
      table.value?.clearSelection();
    };

    onMounted(() => {
      // maxHeight根据父级高度自适应
      const box = document.querySelector('#table-container') as HTMLElement;
      let observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          const { contentRect } = entry;
          maxHeight.value = contentRect.height - 112;
        }
      });
      //@ts-ignore
      observer.observe(box, { attributes: true });
    });
    return {
      key,
      table,
      maxHeight,
      computedSize,
      props,
      attrs,
      tableHeaderOfPermission,
      getChildrenProps,
      selectable,
      sizeChange,
      currentChange,
      changeColumn,
      handleSelectionChange,
      handleExpendChange,
      handleFilterChange,
      toggleRowSelection,
      clearSelection,
    };
  },
});
</script>
<style lang="scss" scoped>
.tool-table-box {
  // height: 100%;
  padding: 6px 20px 24px;
  flex-grow: 1;
  background: #fff;
  // border: 1px solid #ebeef5;
  // border-radius: 6px;
  // overflow: hidden;
  .table-container {
    height: calc(100%);
  }
}
::v-deep(.el-table) {
  display: flex;
  flex-direction: column;
  .el-table__header-wrapper {
    flex-shrink: 0;
  }
  .el-table__body-wrapper {
    flex-grow: 1;
  }
  // &::before,
  // .el-table__fixed::before,
  // .el-table__fixed-right::before {
  //   height: 0;
  // }
  th {
    box-sizing: border-box;
    font-weight: bold;
    color: #000;
    background-color: var(--el-fill-color-light);
    &.el-table-fixed-column--left,
    &.el-table-fixed-column--right {
      background-color: var(--el-fill-color-light);
    }
  }
  td {
    background-color: #fff;
  }
  .cell {
    .el-button--text {
      padding: 0;
      color: var(--el-color-primary);
      border: unset;
    }
    .el-button--text:not(:nth-child(1)):before {
      content: '';
      width: 0px;
      // border-right: 1px solid var(--el-color-primary);
      opacity: 0.5;
      height: 100%;
    }
    .not-has-permission {
      cursor: not-allowed;
      pointer-events: none;
    }

    .el-button + .el-button {
      margin-left: 0 !important;
    }
  }
}
::v-deep(.table-bottom-box) {
  padding-top: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .selected-count {
    padding-top: 10px;
    font-size: 14px;
  }
  .el-button + span {
    margin-left: 10px;
  }
}
</style>
