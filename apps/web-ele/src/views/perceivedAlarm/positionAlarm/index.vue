<script setup lang="tsx">
import { ref } from 'vue';
import List from './List.vue';
import Detail from './Detail.vue';
const COM_MAP: any = {
  'List': List,
  'Detail': Detail,
}
const current = ref('List');
const params = ref({});
const changeView = (view: any, arg: any) => {  
  params.value = arg;
  current.value = view;
};
</script>

<template>
  <KeepAlive include="List">
    <component :is="COM_MAP[current]" @jump="changeView" :params="params"></component>
  </KeepAlive>
</template>
