// import { commonDel, commonGet } from '@/api/basic';
import type { FormInstance } from 'element-plus';
import { ref, defineEmits } from 'vue';
import Dialog from '../..';
//dialog的钩子
export const useDialog = (option: Object) => {

  const show = ref<boolean>(false);
  // const loading = ref(false);


  const open = () => { 
    show.value = true;
  }
  return {
    show,
    // loading,
    open,
    // cancel,
    // confirm,
  };
};
