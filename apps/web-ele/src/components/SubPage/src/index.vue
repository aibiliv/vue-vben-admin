<template>
  <el-card class="detail" shadow="never">
    <template #header>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <slot name="title">{{ title }}</slot>
        </div>
        <el-button type="primary" @click="goBack"> 返回 </el-button>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script setup lang="tsx">
const emit = defineEmits(['goBack']);
interface Prop {
  title?: string;
}
const props = withDefaults(defineProps<Prop>(), {
  title: '详情',
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
