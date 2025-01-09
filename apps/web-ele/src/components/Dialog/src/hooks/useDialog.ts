// import { commonDel, commonGet } from '@/api/basic';
import type { FormInstance } from 'element-plus';
import { ref, defineEmits } from 'vue';

//dialog的钩子
export const useDialog = (initData: any) => {
  const loading = ref(false);
  const show = ref<boolean>(false);
  const form = ref(initData || {});
  const formRef = ref<FormInstance>();

  const emit = defineEmits(['update:show', 'submit']);

  let resFn: (form?: unknown) => void;
  let rejFn: () => void;

  const open = () => {
    show.value = true;
    // form.value = initData;
    return new Promise((resolve, reject) => {
      resFn = resolve;
      rejFn = reject;
    });
  };

  const cancel = () => {
    show.value = false;
    formRef.value?.resetFields();
    // emit('update:show', false);
  };

  const confirm = (fn: () => void) => {
    return async () => {
      try {
        await formRef.value?.validate();
        loading.value = true;
        await fn();
        loading.value = false;
        cancel();
      } finally {
        loading.value = false;
      }
    };
  };

  return {
    show,
    loading,
    open,
    cancel,
    confirm,
  };
};
