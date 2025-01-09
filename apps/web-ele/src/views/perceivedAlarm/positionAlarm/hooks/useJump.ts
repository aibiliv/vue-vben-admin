import List from '../List.vue';
import Detail from '../Detail.vue';
import { ref, defineEmits } from 'vue';

export const useJump = () => {
  const COM_MAP: any = {
    List: List,
    Detail: Detail,
  };
  const current = ref('List');
  const params = ref({});
  const emit = defineEmits(['jump']);
  const jump = (comp: string, arg?: any) => {
    params.value = arg;
    current.value = comp;
  };

  const goSubPage = (val: any) => {
    emit('jump', 'Detail', val);
  };
  const goBack = () => {
    emit('jump', 'List');
  };

  return {
    COM_MAP,
    current,
    params,
    jump,
    goSubPage,
    goBack,
  };
};
