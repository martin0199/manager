<template>
<el-card>
  <el-container class="menu-container">
      <aside-box :menuList="menuList" @emitTree="emitTree" />
        <el-main class="menu-main">
          <div class="main-content">
            <el-form ref="menuEditForm" size="small" :model="editForm">
              <el-form-item label="菜单ID" prop="name" :rules="this.$global.requiredRule">
                <el-input v-model="editForm.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="菜单名称" prop="nameCz" :rules="this.$global.requiredRule">
                <el-input v-model="editForm.nameCz"></el-input>
              </el-form-item>
              <el-form-item label="上级菜单ID" prop="parentId">
                <el-input v-model="editForm.parentId" disabled></el-input>
              </el-form-item>
              <el-form-item label="菜单URL" prop="path" :rules="this.$global.requiredRule">
                <el-input v-model="editForm.path"></el-input>
              </el-form-item>
              <el-form-item label="是否绝对路径" prop="isAllPath" :rules="this.$global.requiredRule">
                <el-select v-model="editForm.isAllPath" clearable placeholder="请选择">
                  <el-option
                    v-for="item in codeCombo('yesOrNo')"
                    :key="item.value"
                    :label="item.content"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图标地址" prop="imageUrl">
                <el-input v-model="editForm.imageUrl" :disabled="isShowUrl"></el-input>
              </el-form-item>
              <el-form-item label="是否显示" prop="hideInMenu" :rules="this.$global.requiredRule">
                <el-select v-model="editForm.hideInMenu" clearable placeholder="请选择">
                  <el-option
                    v-for="item in codeCombo('yesOrNo')"
                    :key="item.value"
                    :label="item.content"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序号" prop="sortNo">
                <el-input-number v-model="editForm.sortNo"></el-input-number>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="editForm.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  v-if="updateType != 'view'"
                  type="primary"
                  @click="saveMenu"
                  size="mini"
                >保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
</el-container>
</el-card>
</template>

<script>
import asideBox from '@/views/sys/menu/aside.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'menu',
  components: {
    asideBox
  },
  data () {
    return {
      updateType: 'add',
      isShowUrl: true,
      editFormRules: {},
      editForm: {}
    }
  },
  methods: {
    saveMenu () {
      this.$http.post(this.$api.sys.menu, {
        type: 'update',
        ...this.editForm
      }).then(e => {
        if (e.data.code === 200) {
          console.log(e.data.data)
        } else {
          this.$message({
            type: 'error',
            message: e.data.message
          })
        }
      })
    },
    emitTree (node) {
      this.isShowUrl = !node.parentId
      this.updateType = 'edit'
      this.editForm = node
    }
  },
  computed: {
    ...mapGetters({
      codeCombo: 'getCodeInfo',
      menuList: 'getMenuList'
    })
  }
}
</script>
<style scoped lang="scss">
.menu-main{
    margin-left:15px
}
/deep/ .el-form-item__content{
    margin-left: 100px;
}
</style>
