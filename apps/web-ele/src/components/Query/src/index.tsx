import { defineComponent, ref, type PropType } from 'vue';

export default defineComponent({
  name: 'Query',
  props: {
    onSearch: { type: Function as PropType<Function> },
    onReset: { type: Function as PropType<Function> },
    labelWidth: { type: Number, default: 80 },
  },
  setup(props, { slots, emit }) {
    const count = slots.default ? slots.default().length : 0;

    const fold = ref(true);
    const changeFold = () => {
      fold.value = !fold.value;
    };

    return () => (
      <el-row class="query-box">
        <el-form labelWidth={props.labelWidth}>
          <el-row gutter={16}>
            <el-col span={20}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
                  gridColumnGap: '16px',
                  gridRowGap: '16px',
                  height: fold.value ? '32px' : 'auto',
                  overflow: 'hidden',
                }}
              >
                {slots.default ? slots.default() : null}
              </div>
            </el-col>
            <el-col span={4}>
              <el-space>
                {props.onSearch && (
                  <el-button type="primary" onClick={() => emit('search')}>
                    查询
                  </el-button>
                )}
                {props.onReset && (
                  <el-button type="default" onClick={() => emit('reset')}>
                    重置
                  </el-button>
                )}
                {count > 4 && (
                  <el-button type="primary" link onClick={changeFold}>
                    {fold.value ? '展开' : '收起'}
                  </el-button>
                )}
              </el-space>
            </el-col>
          </el-row>
        </el-form>
        <style lang="scss" scoped>
          {`
              .query-box {
                background-color: #fff;
                margin-bottom: 14px;
                // border: 1px solid #ebeef5;
                // border-radius: 6px;
                padding: 20px;
                .el-form {
                  width: 100%;
                  .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                  }
                  .el-form-item__label {
                    padding-right: 0;
                    margin-right: -1px;
                    background-color: var(--el-fill-color-light);
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #ebeef5;
                    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
                  }
                  .el-input, .el-select {
                    width: 100%;
                  }
                }
              }
            `}
        </style>
      </el-row>
    );
  },
});
