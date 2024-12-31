import { ElButton, ElCol, ElForm, ElRow, ElSpace } from "element-plus";
import { defineComponent, ref, type PropType } from "vue";

export default defineComponent({
  name: "Query",
  props: {
    onSearch: { type: Function as PropType<Function> },
    onReset: { type: Function as PropType<Function> },
    labelWidth: { type: Number, default: 70 }
  },
  setup(props, { slots, emit }) {
    const count = slots.default ? slots.default().length : 0;

    const fold = ref(true);
    const changeFold = () => {
      fold.value = !fold.value;
    };

    return () => (
      <ElRow class="query-box">
        <ElForm labelWidth={props.labelWidth}>
          <ElRow gutter={16}>
            <ElCol span={20}>
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
                {slots.default ? slots.default() : null}
              </div>
            </ElCol>
            <ElCol span={4}>
              <ElSpace>
                {props.onSearch && (
                  <ElButton type="primary" onClick={() => emit("search")}>
                    查询
                  </ElButton>
                )}
                {props.onReset && (
                  <ElButton
                    type="default"
                    onClick={() => emit("reset")}
                  >
                    重置
                  </ElButton>
                )}
                {count > 4 && (
                  <ElButton
                    type="primary"
                    link
                    onClick={changeFold}
                  >
                    {fold.value ? "展开" : "收起"}
                  </ElButton>
                )}
              </ElSpace>
            </ElCol>
          </ElRow>
        </ElForm>
        <style lang="scss" scoped>
          {`
            .query-box {
              background-color: #fff;
              margin-bottom: 14px;
              border: 1px solid #ebeef5;
              border-radius: 6px;
              padding: 20px;
              .el-form {
                width: 100%;
                .el-form__item {
                  margin-right: 0;
                }
              }
              .el-form__label {
                padding-right: 12px;
              }
              .el-input, .el-select {
                width: 100%;
              }
            }
          `}
        </style>
      </ElRow>
    );
  }
});
