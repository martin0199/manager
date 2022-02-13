<template>
    <el-aside class="menu-aside">
        <div class="btn-group">
        <el-button icon="el-icon-plus" size="mini" @click="addMenu">新增</el-button>
        <el-button icon="el-icon-delete" size="mini" @click="deleteMenu">删除</el-button>
        </div>
        <el-tree
            class="flow-tree"
            :data="menuList"
            node-key="menuId"
            ref="menuTree"
            highlight-current
            :default-expanded-keys="defaultExpandedKeys"
            :props="defaultProps"
            @node-click="nodeClick"
            accordion
        ></el-tree>
    </el-aside>
</template>

<script>
export default {
  data () {
    return {
      defaultExpandedKeys: [],
      defaultProps: {
        label: 'nameCz',
        children: 'children'
      }
    }
  },
  props: {
    menuList: {
      type: Array
    }
  },
  methods: {
    nodeClick (node) {
      this.$emit('emitTree', node)
    },
    addMenu () {

    },
    deleteMenu () {

    }
  }
}
</script>

<style lang="scss" scoped>
.menu-aside{
    width:280px!important;
    height: 100%;
    border-right:1px solid #f0f0f0
}
.btn-group{
    margin-bottom: 15px;
}
</style>
