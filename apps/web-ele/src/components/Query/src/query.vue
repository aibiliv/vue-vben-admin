<template>
    <component :is="render()"></component>
</template>

<script setup lang="tsx">
import { ref, type PropType } from 'vue';

const props = defineProps<{
    onSearch: { type: any },
    onReset: { type: any },
    labelWidth: { type: Number, default: 70 }
}>();
const slots = defineSlots()
const emits = defineEmits(["search", "reset"]);

const count = slots.default().length;

const fold = ref(true);
const changeFold = () => {
    fold.value = !fold.value;
};

const render = () => {
    return (
        <el-row class="query-box">
            <el-form labelWidth={props.labelWidth} layout="inline">
                <el-row gutter={16}>
                    <el-col span={20}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
                                gridColumnGap: "16px",
                                gridRowGap: "16px",
                                height: fold.value ? "32px" : "auto",
                                overflow: "hidden"
                            }}
                        >
                            {slots.default()}
                        </div>
                    </el-col>
                    <el-col span={4}>
                        <el-space>
                            {props.onSearch && (
                                <el-button type="primary" onClick={() => emits("search")}>
                                    查询
                                </el-button>
                            )}
                            {props.onReset && (
                                <el-button
                                    variant="outline"
                                    type="default"
                                    onClick={() => emits("reset")}
                                >
                                    重置
                                </el-button>
                            )}
                            {count > 4 && (
                                <el-button
                                    shape="square"
                                    link
                                    type="primary"
                                    onClick={changeFold}
                                >
                                    {fold.value ? "展开" : "收起"}
                                </el-button>
                            )}
                        </el-space>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
    );
}
</script>

<style lang="scss" scoped>
.query-box {
    :deep(.el-form) {
        width: 100%;

        .el-form__item {
            margin-right: 0;
        }
    }

    .el-form__label {
        padding-right: 12px;
    }

    .el-input,
    .el-select {
        width: 100%;
    }
}
</style>