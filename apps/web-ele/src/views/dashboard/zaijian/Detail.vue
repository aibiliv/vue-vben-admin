<template>
  <SubPage @goBack="goBack">
    <h2>{{ params.name }}</h2>
  </SubPage>
</template>

<script setup lang="tsx">
import SubPage from '#/components/SubPage';
const emit = defineEmits(['jump']);
const props =  defineProps<{
  params: any;
}>();

const goBack = () => {
  emit('jump', 'List');
};

</script>

<style scoped>

</style>