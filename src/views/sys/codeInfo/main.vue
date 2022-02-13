<template>
  <div class="main-content">
    <el-card header="代码信息列表">
        <el-form
        ref="codeInfoSearchForm"
        size="small"
        :model="codeInfoSearchFormData"
        :rules="codeInfoSearchFormRules"
        label-width="80px"
        >
        <el-row :gutter="32">
            <el-col :span="12">
            <el-form-item label="下拉内容" prop="content" label-width="100px">
                <el-input v-model="codeInfoSearchFormData.content" style="width: 100%"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="备注" prop="remark" label-width="100px">
                <el-input v-model="codeInfoSearchFormData.remark" style="width: 100%"></el-input>
            </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-button type="primary" @click="getCodeInfoList" size="mini" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-refresh-left" size="mini" @click="resetCodeSearchForm">重置</el-button>
        </el-row>
        </el-form>
    </el-card>
    <el-card>
        <div slot="header">
            <span>查询结果</span>
            <span class="button-group">
                <el-button icon="el-icon-plus" size="mini" @click="addCodeInfo">新增</el-button>
                <el-button icon="el-icon-edit-outline" size="mini" @click="editCodeInfo">修改</el-button>
                <el-button icon="el-icon-delete" size="mini" @click="deleteCodeInfo">删除</el-button>
                <el-button icon="el-icon-view" size="mini" @click="viewCodeInfo">查看</el-button>
            </span>
        </div>
        <el-table
        ref="codeInfoTableData"
        :data="codeInfoData"
        highlight-current-row
        border
        @selection-change="selectionChange"
        @row-click="rowClick"
        >
        <el-table-column type="selection" width="50"></el-table-column>
        <template v-for="item in codeInfoColumns">
            <el-table-column
            v-if="item.isShow"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatter"
            :show-overflow-tooltip="item.overflow"
            ></el-table-column>
        </template>
        </el-table>

        <el-pagination
        :current-page="codeInfoPaginationInfo.currentPage"
        :page-size="codeInfoPaginationInfo.pageSize"
        :total="codeInfoPaginationInfo.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        ></el-pagination>
    </el-card>
    <dialog-box
    @emitSubmit="emitSubmit"
    :updateType="updateType"
    :editForm="editForm"
    :dialogVisible="dialogVisible"
    :dialogTitle="dialogTitle" />
  </div>
</template>

<script>
import dialogBox from '../codeInfo/dialog.vue'
export default {
  data () {
    return {
      codeInfoSearchFormData: {
        content: '',
        codeTypeId: '',
        codeInfoId: '',
        remark: ''
      },
      codeInfoSearchFormRules: {},
      codeInfoData: [],
      codeInfoColumns: [
        {
          isShow: false,
          prop: 'codeInfoId',
          width: '100px',
          label: '代码信息ID'
        },
        {
          isShow: true,
          prop: 'codeTypeId',
          width: '130px',
          label: '代码类别ID'
        },
        {
          isShow: true,
          prop: 'value',
          label: '下拉值'
        },
        {
          isShow: true,
          prop: 'content',
          width: '100px',
          label: '下拉内容'
        },
        {
          isShow: true,
          prop: 'sortNo',
          label: '排序号'
        },
        {
          isShow: true,
          prop: 'remark',
          label: '备注'
        }
      ],
      codeInfoPaginationInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      rowIds: [],
      selectedRow: {},
      updateType: '',
      dialogTitle: '新增代码信息',
      dialogVisible: false,
      editForm: {
        codeInfoId: undefined,
        codeTypeId: '',
        value: '',
        content: '',
        sortNo: undefined,
        remark: ''
      },
      fieldDisabled: false

    }
  },
  components: {
    dialogBox
  },
  methods: {
    getCodeInfoList () {
      this.codeInfoPaginationInfo.currentPage = 1
      this.getCodeInfoList2()
    },
    getCodeInfoList2 () {
      // 调用接口,查询对象
      this.$http.post(this.$api.sys.codeInfo, {
        type: 'view',
        ...this.codeInfoSearchFormData, // 合并对象
        pageNo: this.codeInfoPaginationInfo.currentPage,
        pageSize: this.codeInfoPaginationInfo.pageSize
      })
        .then(res => {
          this.codeInfoData = res.data.data.rows
          this.codeInfoPaginationInfo.total = Number(res.data.data.total)
          this.rowIds = []
          this.selectedRow = {}
        })
    },
    resetCodeSearchForm () {
      this.$refs.codeInfoSearchForm.resetFields()
      this.getCodeInfoList()
    },
    addCodeInfo () {
      if (!this.codeInfoSearchFormData.codeTypeId) {
        this.$message({
          message: '请在左边选择一条代码类型记录.',
          type: 'warning'
        })
        return false
      }
      this.dialogTitle = '新增代码信息'
      this.dialogVisible = true
      this.updateType = 'add'
      this.editForm = {
        codeInfoId: undefined,
        codeTypeId: this.codeInfoSearchFormData.codeTypeId,
        value: '',
        content: '',
        sortNo: undefined,
        remark: ''
      }
      this.fieldDisabled = false
    },
    editCodeInfo () {
      if (this.rowIds.length === 0) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning'
        })
      } else if (this.rowIds.length > 1) {
        this.$message({
          message: '只能选择一条记录',
          type: 'warning'
        })
      } else {
        this.dialogTitle = '修改代码信息'
        this.dialogVisible = true
        this.updateType = 'update'
        this.editForm = { ...this.selectedRow }
        this.fieldDisabled = true
      }
    },
    deleteCodeInfo () {
      if (this.rowIds.length > 0) {
        this.$confirm('确认删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$http.post(this.$api.sys.codeInfo, {
              type: 'del',
              codeInfoId: this.rowIds.join(',')
            }).then(res => {
              if (res.data.code === 200) {
                sessionStorage.setItem('codeInfo', res.data.data.rows)
                this.$store.commit('SET_CODE_INFO', res.data.data.rows)
                this.getCodeInfoList2()
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
              }
            })
          })
          .catch(() => {
            // 这个.catch()删除掉就会打印Uncaught (in promise) cancel
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$message({
          message: '请选择记录',
          type: 'warning'
        })
      }
    },
    viewCodeInfo () {
      if (this.rowIds.length === 0) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning'
        })
      } else if (this.rowIds.length > 1) {
        this.$message({
          message: '只能选择一条记录',
          type: 'warning'
        })
      } else {
        this.dialogTitle = '查看代码信息'
        this.dialogVisible = true
        this.updateType = 'view'
        this.editForm = { ...this.selectedRow }
        this.fieldDisabled = true
      }
    },
    selectionChange (selection) {
      this.rowIds = selection.map(item => item.codeInfoId)
      if (selection.length === 1) {
        this.selectedRow = { ...selection[0] }
      }
    },
    rowClick (row) {
      this.$refs.codeInfoTableData.toggleRowSelection(row)
    },
    handleCurrentChange (val) {
      this.codeInfoPaginationInfo.currentPage = val
      this.getCodeInfoList2()
    },
    handleSizeChange (val) {
      this.codeInfoPaginationInfo.pageSize = val
      this.getCodeInfoList2()
    },
    emitSubmit (value) {
      this.dialogVisible = false
      if (value) {
        this.getCodeInfoList2()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content-table {
  margin-top: 10px;
}

.el-form-item {
  margin-bottom: 20px;
}
/deep/ .el-form-item__content{
    margin-left: 100px;
}
</style>
