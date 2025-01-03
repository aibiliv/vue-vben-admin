<template>
  <ElCard class="detail" shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <slot name="title">{{ title }}</slot>
        </div>
        <ElButton type="primary" @click="goBack">
          返回
        </ElButton>
      </div>
    </template>
    <slot></slot>
  </ElCard>
</template>

<script setup lang="tsx">
import { ElButton } from 'element-plus';
import { ElCard } from 'element-plus';
const emit = defineEmits(['goBack']);
interface Prop {
  title?: string;
}
const props = withDefaults(defineProps<Prop>(), {
  title: '详情'
});

const goBack = (val: any) => {
  emit('goBack', val);
};

</script>

<style lang="scss" scoped>
.detail {
  margin: 16px;

  :deep(.el-card__header) {
    padding: 12px 20px;
  }
}
</style>