<template>
    <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="500px"
    >
    <div class="main-content-dialog-edit-form">
        <el-form ref="codeInfoEditForm" size="small" :model="editForm" :rules="editFormRules" class="form-w8">
        <el-form-item label="代码类别ID" prop="codeTypeId" :rules="this.$global.requiredRule">
            <el-input v-model="editForm.codeTypeId" disabled></el-input>
        </el-form-item>
        <el-form-item label="下拉值" prop="value" :rules="this.$global.requiredRule">
            <el-input v-model="editForm.value" :disabled="updateType == 'view'"></el-input>
        </el-form-item>
            <el-form-item label="下拉内容" prop="content" :rules="this.$global.requiredRule">
            <el-input v-model="editForm.content" :disabled="updateType == 'view'"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="sortNo" :rules="this.$global.requiredRule">
            <el-input-number
            v-model="editForm.sortNo"
            :disabled="updateType == 'view'"
            style="width: 100%"
            ></el-input-number>
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
</template>

<script>
export default {
  props: {
    editForm: {
      type: Object,
      require: true,
      default: () => {}
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    updateType: {
      type: String,
      default: ''
    },
    fieldDisabled: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editFormRules: {}
    }
  },
  methods: {
    handleCancel () {
      this.$refs.codeInfoEditForm.clearValidate()
      this.$emit('emitSubmit', false)
    },
    handleOk () {
      this.$refs.codeInfoEditForm.validate().then(valid => {
        if (valid) {
          if (this.updateType === 'add') {
            this.$http.post(this.$api.sys.codeInfo, {
              type: 'insert',
              ...this.editForm
            }).then(res => {
              if (res.data.code === 200) {
                this.$refs.codeInfoEditForm.resetFields()
                this.$refs.codeInfoEditForm.clearValidate()
                sessionStorage.setItem('codeInfo', res.data.data.rows)
                this.$store.commit('SET_CODE_INFO', res.data.data.rows)
                this.$emit('emitSubmit', true)
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
              }
            })
          } else if (this.updateType === 'update') {
            this.$http.post(this.$api.sys.codeInfo, {
              type: 'update',
              ...this.editForm
            }).then(res => {
              if (res.data.code === 200) {
                sessionStorage.setItem('codeInfo', res.data.data.rows)
                this.$store.commit('SET_CODE_INFO', res.data.data.rows)
                this.$emit('emitSubmit', true)
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
