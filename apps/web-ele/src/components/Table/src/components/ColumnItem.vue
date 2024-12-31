<template>
  <ElTableColumn
    :label="item.label"
    :prop="item.prop"
    :fixed="item.fixed"
    :sortable="item.sortable"
    :show-overflow-tooltip="item.showTooltip ?? true"
    :formatter="item.formatter"
    :width="item.width"
    :min-width="item.minWidth"
    :align="item.align || 'left'"
    :resizable="resizable"
    :render-header="item.renderHeader"
  >
    <template v-if="shouldRenderChildren">
      <ColumnItem
        v-for="(subItem, index) in visibleChildren"
        :key="index"
        :item="subItem"
        :table-header="subItem.children"
      >
        <template v-for="prop in getChildProps(subItem)" #[prop]="{ scope }">
          <slot :name="prop" :scope="scope" />
        </template>
      </ColumnItem>
    </template>
    <template
      v-if="(!item.children || item.children.length < 1) && slots[item.prop]"
      #default="scope"
    >
      <slot :name="item.prop" :scope="scope" />
    </template>
  </ElTableColumn>
</template>
<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { ElTableColumn } from "element-plus";

interface TableColumn {
  label?: string;
  prop?: string;
  fixed?: string | boolean;
  sortable?: boolean;
  showTooltip?: boolean;
  formatter?: Function;
  width?: string | number;
  minWidth?: string | number;
  align?: string;
  children?: TableColumn[];
  resizable?: boolean;
  renderHeader?: Function;
  hidden?: false;
}

interface Props {
  resizable: boolean;
  item: TableColumn;
  tableHeader: TableColumn[];
}

export default defineComponent({
  name: "ColumnItem",
  components: {
    ElTableColumn
  },
  props: {
    item: { type: Object as PropType<any>, default: () => {} },
    resizable: { type: Boolean, default: false },
    tableHeader: { type: Array as PropType<TableColumn[]>, default: () => [] }
  },

  setup(props: Props, { slots }) {
    const visibleChildren = computed(
      () =>
        props.item.children?.filter((child: TableColumn) => !child.hidden) ?? []
    );
    const shouldRenderChildren = computed(
      () => visibleChildren.value.length > 0
    );
    const hasDefaultSlot = computed(() => !!slots[props.item.prop]);
    const getChildProps: any = (item: TableColumn) =>
      item.children
        ?.flatMap(child => getChildProps(child))
        .concat(item.prop)
        .filter(Boolean);

    return {
      slots,
      visibleChildren,
      shouldRenderChildren,
      hasDefaultSlot,
      getChildProps
    };
  }
});
</script>
