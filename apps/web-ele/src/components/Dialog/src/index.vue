<template>
  <el-dialog
    class="common-dialog"
    :width="width"
    v-model="modelValue"
    :title="title"
    v-bind="$attrs"
    @close="close"
  >
    <template #header>
      <div v-if="$slots.header">
        <slot name="header"></slot>
      </div>
    </template>
    <template #default>
      <slot name="default">
        <!-- <slotDefault /> -->
      </slot>
    </template>
    <template #footer>
      <slot name="footer">
        <el-space>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </el-space>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="tsx">
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits(['cancel', 'confirm', 'update:visible']);
const props = defineProps({
  width: { type: String, default: '500' },
  visible: { type: Boolean, default: false },
  title: { type: String, default: '详情' },
});
console.log('props', props);

const modelValue = ref(props.visible);
// const modelValue = ref(false);

const close = (val: any) => {
  emit('update:visible', false);
  emit('cancel', val);
};

const confirm = (val: any) => {
  emit('confirm', val);
};
</script>

<style lang="scss" scoped>
.common-dialog {
  :deep(.el-dialog__header) {
    // margin: 0 -16px;
    padding: 12px 16px;
  }
  :deep(.el-dialog__body) {
    padding: 16px;
  }
  :deep(.el-dialog__footer) {
    padding: 12px 16px;
  }
}
</style>
