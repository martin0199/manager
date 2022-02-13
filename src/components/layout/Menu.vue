<template>
  <div class="sub-menu">
    <el-menu-item v-if="!menuInfo.children" :index="menuInfo.path" @click="toPage(menuInfo.path)">
      <i v-if="menuInfo.meta && menuInfo.meta.icon" :class="['iconfont',menuInfo.meta.icon]"></i>
      <span slot="title">{{ menuInfo.meta && menuInfo.meta.title }}</span>
    </el-menu-item>
    <el-submenu v-else :index="menuInfo.path" ref="menu">
      <template slot="title">
         <i v-if="menuInfo.meta && menuInfo.meta.icon" :class="['iconfont',menuInfo.meta.icon]"></i>
        <span>{{ menuInfo.meta && menuInfo.meta.title }}</span>
      </template>
        <sub-menu v-for="item in menuInfo.children" :menu-info="item" :key="item.path"></sub-menu>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SubMenu',
  props: ['menuInfo'],
  methods: {
    toPage (path) {
      this.$router.push({
        path: path
      })
      this.upToTop()
    }
  }
}
</script>
<style lang="scss">
</style>
