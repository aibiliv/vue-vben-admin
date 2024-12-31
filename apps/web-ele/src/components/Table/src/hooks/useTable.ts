import { commonDel, commonGet } from "@/api/basic";
// import { DialogPlugin, MessagePlugin, type PageInfo } from "tdesign-vue-next";
import { ref } from "vue";

//表格的钩子
// api: 获取分页数据的api接口
export const useTable = (api: string) => {
  const loading = ref(false);

  //搜索栏查询参数
  const query = ref<any>({});

  //分页参数
  const page = ref({ total: 0, current: 1, pageSize: 20 });

  //表格数据
  const tableData = ref([]);

  //获取分页数据
  const getData = async () => {
    try {
      const queryData = {
        ...query.value,
        page: page.value.current,
        limit: page.value.pageSize
      };
      loading.value = true;
      const { success, data } = (await commonGet(api)(queryData)) as any;
      if (!success) return;
      tableData.value = data.records;
      page.value.total = data.total;
    } finally {
      loading.value = false;
    }
  };

  //删除某一行,api-接口地址，tips-提示语
  // const deleteRow = ({ id }, api: string, tips: string = "确认要删除吗？") => {
  //   const confirmDia = DialogPlugin({
  //     theme: "warning",
  //     header: `提示`,
  //     body: tips,
  //     onConfirm: async () => {
  //       const { success } = await commonDel(api)({ id });
  //       if (!success) return;
  //       MessagePlugin.success("操作成功");
  //       getData();
  //       confirmDia.hide();
  //     }
  //   });
  // };

  //切换分页
  const pageChange = curr => {
    page.value = { ...page.value, ...curr };
    getData();
  };

  //搜索栏查询动作
  const search = () => {
    page.value.current = 1;
    getData();
  };

  //搜索栏重置动作
  const reset = () => {
    query.value = {};
    search();
  };

  getData();

  return {
    loading,
    query,
    page,
    tableData,
    pageChange,
    getData,
    search,
    reset
    // deleteRow
  };
};
