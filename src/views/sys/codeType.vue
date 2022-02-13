<template>
  <div class="codeType">
    <div class="main-content-search">
      <el-card>
        <el-form ref="codeTypeSearchForm" size="small" :model="searchForm" :rules="searchFormRules" label-width="100px">
          <el-row :gutter="32">
            <el-col :span="6">
              <el-form-item label="代码类别ID" prop="codeTypeId">
                <el-input v-model="searchForm.codeTypeId" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="代码类别名称" prop="codeTypeName">
                <el-input v-model="searchForm.codeTypeName" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="代码分类" prop="codeTypeSort">
                  <el-select
                    v-model="searchForm.codeTypeSort"
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
            <el-col :span="6">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="searchForm.remark" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="getList" size="mini" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-refresh-left" size="mini" @click="resetForm">重置</el-button>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="main-content-table">
      <el-card>
        <div slot="header">
          <span>查询结果</span>
          <span class="button-group">
            <el-button icon="el-icon-plus" size="mini" @click="addCodeType">新增</el-button>
            <el-button icon="el-icon-edit-outline" size="mini" @click="editCodeType">修改</el-button>
            <el-button icon="el-icon-delete" size="mini" @click="deleteCodeType">删除</el-button>
            <el-button icon="el-icon-view" size="mini" @click="viewCodeType">查看</el-button>
          </span>
        </div>

        <el-table
          stripe
          ref="codeTypeTableData"
          :data="tableData"
          border
          @selection-change="selectionChange"
          @row-click="rowClick"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <template v-for="item in tableColumns">
            <el-table-column
              v-if="item.isShow"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :formatter="item.formatter"
            ></el-table-column>
          </template>
        </el-table>

        <el-pagination
          :current-page="paginationInfo.currentPage"
          :page-size="paginationInfo.pageSize"
          :total="paginationInfo.total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination"
        ></el-pagination>
      </el-card>
    </div>
    <div class="main-content-dialog">
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="500px"
      >
        <div class="main-content-dialog-edit-form">
          <el-form size="small" :model="editForm" :rules="editFormRules" ref="codeTypeEditForm" label-width="120px">
            <el-form-item label="代码类别ID" prop="codeTypeId">
              <el-input v-model="editForm.codeTypeId" :disabled="fieldDisabled"></el-input>
            </el-form-item>

            <el-form-item label="代码类别名称" prop="codeTypeName">
              <el-input v-model="editForm.codeTypeName" :disabled="updateType == 'view'"></el-input>
            </el-form-item>
            <el-form-item label="代码类别模板" prop="codeTypeSort">
               <el-select
                    v-model="editForm.codeTypeSort"
                    style="width: 100%"
                    clearable
                    :disabled="updateType == 'view'"
                  >
                    <el-option
                      v-for="item in codeCombo('codeTypeSort')"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                    ></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="排序号" prop="sortNo">
              <el-input-number v-model="editForm.sortNo" :disabled="updateType == 'view'"></el-input-number>
            </el-form-item>

            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="editForm.remark" :disabled="updateType == 'view'"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel" size="mini">取 消</el-button>
          <el-button v-if="updateType != 'view'" type="primary" size="mini" @click="handleOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      searchForm: {
        codeTypeId: '',
        codeTypeName: '',
        remark: ''
      },
      searchFormRules: {},
      tableData: [],
      tableColumns: [
        {
          isShow: true,
          prop: 'codeTypeId',
          label: '代码类别ID'
        },
        {
          isShow: true,
          prop: 'codeTypeName',
          label: '代码类别名称'
        },
        {
          isShow: true,
          prop: 'codeTypeSort',
          label: '代码分类',
          formatter: row => this.$global.getNameByCode(this.codeCombo('codeTypeSort'), row.codeTypeSort)
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
      paginationInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dialogTitle: '新增代码类别',
      dialogVisible: false,
      rowIds: [],
      updateType: '',
      selectedRow: {},
      editForm: {
        codeTypeId: '',
        codeTypeName: '',
        codeTypeSort: undefined,
        sortNo: undefined,
        remark: ''
      },
      editFormRules: {
        codeTypeName: [{ required: true, message: '该填项为必填项!', trigger: ['change', 'blur'] }],
        sortNo: [{ required: true, message: '该填项为必填项!' }],
        codeTypeSort: [{ required: true, message: '该填项为必填项!' }]
      },
      fieldDisabled: false
    }
  },
  methods: {
    getList () {
      this.paginationInfo.currentPage = 1
      this.getList2()
    },
    getList2 () {
      this.$http.post(this.$api.sys.codeType, {
        type: 'view',
        ...this.searchForm,
        pageNo: this.paginationInfo.currentPage,
        pageSize: this.paginationInfo.pageSize
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.rows
          this.paginationInfo.total = Number(res.data.data.total)
          this.rowIds = []
          this.selectedRow = {}
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    resetForm () {
      this.$refs.codeTypeSearchForm.resetFields()
      this.getList()
    },
    resetEditForm () {
      this.editForm = {
        codeTypeId: '',
        codeTypeName: '',
        sortNo: undefined,
        remark: ''
      }
      if (this.$refs.codeTypeEditForm !== undefined) {
        this.$refs.codeTypeEditForm.resetFields()
      }
    },
    addCodeType () {
      this.dialogTitle = '新增代码类别'
      this.dialogVisible = true
      this.updateType = 'add'
      this.editForm = {
        codeTypeId: '',
        codeTypeName: '',
        sortNo: undefined,
        remark: ''
      }
      this.fieldDisabled = false
    },
    editCodeType () {
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
        this.dialogTitle = '修改代码类别'
        this.dialogVisible = true
        this.updateType = 'update'
        this.editForm = { ...this.selectedRow }
        this.fieldDisabled = true
      }
    },
    deleteCodeType () {
      if (this.rowIds.length > 0) {
        this.$confirm('确认删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$http.post(this.$api.sys.codeType, {
              type: 'del',
              codeTypeId: this.rowIds.join()
            }).then(res => {
              if (res.data.code === 200) {
                sessionStorage.setItem('codeType', res.data.data.rows)
                this.$store.commit('SET_CODE_TYPE', res.data.data.rows)
                this.getList2()
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
    viewCodeType () {
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
        this.dialogTitle = '查看代码类别'
        this.dialogVisible = true
        this.updateType = 'view'
        this.editForm = { ...this.selectedRow }
        this.fieldDisabled = true
      }
    },
    selectionChange (selection) {
      this.rowIds = selection.map(item => item.codeTypeId)
      if (selection.length === 1) {
        this.selectedRow = { ...selection[0] }
      }
    },
    rowClick (row) {
      this.$refs.codeTypeTableData.toggleRowSelection(row)
    },
    handleCurrentChange (val) {
      this.paginationInfo.currentPage = val
      this.getList2()
    },
    handleSizeChange (val) {
      this.paginationInfo.pageSize = val
      this.getList2()
    },
    handleOk () {
      this.$refs.codeTypeEditForm.validate(valid => {
        if (valid) {
          if (this.updateType === 'add') {
            this.$http.post(this.$api.sys.codeType, {
              type: 'insert',
              ...this.editForm
            }).then(res => {
              this.dialogVisible = false
              if (res.data.code === 200) {
                sessionStorage.setItem('codeType', res.data.data.rows)
                this.$store.commit('SET_CODE_TYPE', res.data.data.rows)
                this.resetEditForm()
                this.getList2()
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
              }
            })
          } else if (this.updateType === 'update') {
            this.$http.post(this.$api.sys.codeType, {
              type: 'update',
              ...this.editForm
            }).then(res => {
              this.dialogVisible = false
              if (res.data.code === 200) {
                sessionStorage.setItem('codeType', res.data.data.rows)
                this.$store.commit('SET_CODE_TYPE', res.data.data.rows)
                this.getList2()
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    handleCancel () {
      this.resetEditForm()
      this.dialogVisible = false
    }
  },
  computed: {
    ...mapGetters({
      codeCombo: 'getCodeInfo'
    })
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>
.main-content-table{
    margin-top: 10px;
}
</style>
