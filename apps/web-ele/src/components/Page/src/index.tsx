import { defineComponent, ref, type PropType } from 'vue';

export default defineComponent({
  name: 'Page',
  props: {},
  setup(props, { slots }) {
    return () => (
      <div class="page-container">
        {slots.default?.()}
        <style lang="scss" scoped>
          {`
            .page-container {
              display: flex;
              flex-direction: column;
              height: 100%;
              // padding: 16px;
            }
          `}
        </style>
      </div>
    );
  },
});
