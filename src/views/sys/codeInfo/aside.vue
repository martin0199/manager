<template>
  <div class="main-content-search">
    <el-card header="代码类别">
        <!--搜索框 -->
        <el-form
        ref="codeTypeSearchForm"
        size="small"
        :model="codeTypeSearchFormData"
        :rules="codeTypeSearchFormRules"
        label-width="80px"
        >
        <el-row :gutter="32">
            <el-col :span="12">
            <el-form-item label="代码类别ID" prop="codeTypeId" label-width="100px">
                <el-input v-model="codeTypeSearchFormData.codeTypeId" style="width: 100%"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="代码分类" prop="codeTypeSort">
                <el-select
                    v-model="codeTypeSearchFormData.codeTypeSort"
                    style="width: 100%"
                    clearable
                >
                    <el-option
                    v-for="item in codeCombo('codeTypeSort')"
                    :key="item.value"
                    :label="item.content"
                    :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-button type="primary" size="mini" @click="getCodeTypeList" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-refresh-left" size="mini" @click="resetCodeTypeForm">重置</el-button>
        </el-row>
        </el-form>
    </el-card>
    <el-card header="查询结果">
        <el-table
        stripe
        ref="codeTypeTableData"
        :data="codeTypeData"
        highlight-current-row
        @row-dblclick="codeTypeRowDblclick"
        @current-change="codeTypeRowChange"
        border
        >
        <template v-for="item in codeTypeColumns">
            <el-table-column
            v-if="item.isShow"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :formatter="item.formatter"
            :show-overflow-tooltip="item.overflow"
            ></el-table-column>
        </template>
        </el-table>
        <!--分页-->
        <el-pagination
        :current-page="codeTypePaginationInfo.currentPage"
        :page-size="codeTypePaginationInfo.pageSize"
        :total="codeTypePaginationInfo.total"
        @current-change="codeTypeHandleCurrentChange"
        @size-change="codeTypeHandleSizeChange"
        layout="sizes, prev, pager, next"
        class="pagination"
        ></el-pagination>
    </el-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      codeTypeSearchFormData: {
        codeTypeId: '',
        codeTypeName: '',
        codeTypeSort: ''
      },
      // Form校验
      codeTypeSearchFormRules: {},
      // table数据
      codeTypeData: [],
      // 分页信息
      codeTypePaginationInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // table列
      codeTypeColumns: [
        {
          isShow: true,
          prop: 'codeTypeId',
          width: '100px',
          label: '代码类别ID'
        },
        {
          isShow: true,
          prop: 'codeTypeName',
          width: '104px',
          label: '代码类别名称'
        },
        {
          isShow: true,
          prop: 'codeTypeSort',
          label: '代码分类',
          formatter: row => this.$global.getNameByCode(this.codeCombo('codeTypeSort'), row.codeTypeSort)
        }
      ]
    }
  },
  methods: {
    // 查询
    getCodeTypeList () {
      this.codeTypePaginationInfo.currentPage = 1
      this.getCodeTypeList2()
    },
    getCodeTypeList2 () {
      // 调用接口,查询对象
      this.$http.post(this.$api.sys.codeType, {
        type: 'view',
        ...this.codeTypeSearchFormData,
        pageNo: this.codeTypePaginationInfo.currentPage,
        pageSize: this.codeTypePaginationInfo.pageSize
      })
        .then(res => {
          if (res.data.code === 200) {
            this.codeTypeData = res.data.data.rows
            this.codeTypePaginationInfo.total = Number(res.data.data.total)
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
    },
    // 重置
    resetCodeTypeForm () {
      this.$refs.codeTypeSearchForm.resetFields()
      this.$emit('emitRestForm')
      this.getCodeTypeList()
    },
    // 存储勾选行,当勾选内容发生该改变则触发
    codeTypeRowChange (currentRow) {
      this.$emit('emitRowChange', currentRow.codeTypeId)
    },
    codeTypeRowDblclick (currentRow) {
      this.$emit('emitDbRowChange', currentRow.codeTypeId)
    },
    // 当换页时触发
    codeTypeHandleCurrentChange (val) {
      this.codeTypePaginationInfo.currentPage = val
      this.getCodeTypeList2()
    },
    // 当页数数量发生改变时触发
    codeTypeHandleSizeChange (val) {
      this.codeTypePaginationInfo.pageSize = val
      this.getCodeTypeList2()
    }
  },
  computed: {
    ...mapGetters({
      codeCombo: 'getCodeInfo'
    })
  },
  mounted () {
    this.getCodeTypeList()
  }
}
</script>

<style>

</style>
