<template>
  <Dialog
    v-model:visible="modelValue"
    v-bind="$attrs"
    @cancel="cancel"
    @confirm="confirm"
  >
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="地区" prop="region">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup lang="tsx">
import Dialog from '#/components/Dialog/index';
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const emit = defineEmits(['update:show', 'submit']);
const props = defineProps({
  show: { type: Boolean, default: false },
  initData: { type: Object, default: () => {} },
});

const modelValue = ref(props.show);

const rules = reactive<FormRules>({
  name: [{ required: true, message: '必填', trigger: 'blur' }],
  region: [{ required: true, message: '必选', trigger: 'change' }],
});
const formRef = ref<FormInstance>();
const form = reactive({
  name: '',
  region: '',
});

const cancel = () => {
  emit('update:show', false);
};
const confirm = (val: any) => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit('submit', val);
      cancel();
    }
  });
};
</script>

<style scoped></style>
