<template>
  <div class="table-column-setting">
    <draggable
      v-model="showColumn"
      class="body"
      group="table-column-setting"
      animation="500"
      :move="onMove"
      itemKey="label"
      @end="finishMove"
    >
      <template #item="{ element }">
        <div class="row">
          <!-- <SvgIcon icon-class="move"></SvgIcon> -->
          <!-- <el-icon-rank /> -->
          <span class="chosen">
            <ElCheckbox v-model="element.isShow" @change="changeCheck" />
          </span>
          <span class="title">{{ element.label }}</span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import draggable from "vuedraggable";
// import _ from "lodash";
import { cloneDeep as _cloneDeep } from "@pureadmin/utils";
import { ElCheckbox } from "element-plus";
interface ColType {
  isShow?: boolean;
  hidden?: boolean;
}
interface Props {
  visible: boolean;
  columns: ColType[];
}

const props = defineProps<Props>();
const emit = defineEmits([
  "set",
  "changeSize",
  "changeColumn",
  "import",
  "export"
]);
const showColumn = ref<ColType[]>([]);

watch(props.columns, newvalue => initDsplColumns(newvalue), { deep: true });

onMounted(() => {
  initDsplColumns(props.columns);
});

const initDsplColumns = (newVal: any[]) => {
  const newArr = _cloneDeep(newVal);
  showColumn.value = newArr;
};

const changeCheck = (e?: any) => {
  const arr = showColumn.value.map(item => {
    if (!item.isShow) item.hidden = true;
    else item.hidden = false;
    return item;
  });
  emit("set", arr);
};

const onMove = (e: any) => {
  return e.draggedContext.element.foldable && e.relatedContext.element.foldable;
};

const finishMove = () => changeCheck();
</script>

<style lang="scss" scoped>
.table-column-setting {
  max-height: 60vh;
  overflow-y: auto;
  .row {
    height: 32px;
    .title,
    .chosen,
    .drag {
      margin-left: 10px;
    }
    .title {
      cursor: move;
    }
  }
}
</style>
