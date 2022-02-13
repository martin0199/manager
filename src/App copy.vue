<template>
<div id="app">
    <template v-if="path==='/login'">
        <router-view/>
    </template>
    <template v-else>
        <div class="app-layout-box content-loading">
            <div class="app-layout-header">
                <div class="me-header">
                    <!-- <p-header></p-header> -->
                </div>
            </div>
            <div class="app-layout-main">
                <!-- 侧边栏 -->
                <el-aside class="main-page-left">
                    <el-menu id="me-menu" :default-active="path" :collapse="isCollapse" unique-opened>
                        <sub-menu v-for="item in getMenuList" :menu-info="item" :key="item.path"></sub-menu>
                    </el-menu>
                </el-aside>
                <div class="el-main-page">
                    <!-- 面包屑导航 -->
                    <!-- <p-breadcrumb></p-breadcrumb> -->
                    <!-- 内容 -->
                    <div class="p-info-main with-watermark" id="router-main">
                    <div class="layout-box-main">
                        {{$route}}
                        <router-view v-if="isRouterAlive" />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</div>
</template>
<script>
// import pHeader from '@/components/layout/Header'
import waterMark from '@/plugins/waterMark.js'
import SubMenu from '@/components/layout/SubMenu'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      waterHeight: '',
      path: '',
      isRouterAlive: true,
      isCollapse: false
    }
  },
  components: {
    SubMenu
  },
  computed: {
    ...mapGetters(['getMenuList'])
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  watch: {
    $route (to, from) {
      console.log(to, from)
      this.path = to.path
      window.scrollTo(0, 0)
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextick(e => {
        this.isRouterAlive = true
      })
    },
    initWaterMark () {
      const name = this.$store.getters.getUserInfo
      if (name) {
        const time = this.$global.createTime('day')
        waterMark(name.userName + '/' + time, this.waterHeight)
      }
    }
  },
  mounted () {
    this.waterHeight = document.body.clientHeight
    this.initWaterMark()
  },
  created () {
    this.path = this.$route.path
    console.log(this.$route)
  }
}
</script>
<style lang="scss">
@import url('./assets/css/common.scss');
#app{
  overflow: hidden !important;
  height: 100%;
}
.app-layout-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(180deg, #3987b9 0%, #82b3d6 100%) !important;
}
.app-layout-header {
  width: 100%;
  height: 45px;
}
.me-header {
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  background-image: url('./assets/img/banner/bg.png');
  color: #fff;
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.p-info-main {
  position: relative;
  padding:12px 0;
  width: 100%;
  height: calc(100% - 52px);
  overflow: hidden;
}
/*右边全局样式*/
.layout-box-main {
  position: absolute;
  width:100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
body {
  height: 100%;
}

.app-layout-main {
  width: 100%;
  height: calc(100% - 45px);
  display: flex;
  background-color: transparent;
}
.main-page-left {
  width: auto !important;
  max-width: 180px;
  padding: 12px !important;
}
.main-page-left::-webkit-scrollbar{
  display: none !important;
}
#me-menu:not(.el-menu--collapse){
   width:160px !important;
}
#app .el-menu--collapse{
  width:32px !important;
}
#me-menu {
  height: 100%;
  width: calc(100%-5px);
  background-color: transparent !important;
  .el-menu-item {
    min-width: auto !important;
    color: #fff !important;
    height: 40px !important;
    line-height: 40px !important;
    font-size: 12px !important;
  }
  i{
    color: #fff;
  }
  .el-submenu {
    .el-submenu__title {
      color: #fff !important;
      height: 40px !important;
      line-height: 40px !important;
      font-size: 12px !important;
      i {
        color: #fff !important;
      }
    }
    .el-menu {
      background-color: transparent;
    }
  }
  .el-menu-item.is-active {
    font-size: 12px !important;
    color: #fff !important;
    background: linear-gradient(270deg, #6abcff 0%, #46acff 100%) !important;
    i{
      color: #5ab5ff;
      background: #fff;
      padding: 3px;
      border-radius: 100%;
      font-size: 12px;
    }
  }
  .el-menu-item:hover, .el-menu-item:focus{
    background-color: #2196F3 !important;
  }
   .el-submenu__title:hover{
      background-color: #2196F3 !important;
  }
}
.el-menu--vertical{
  max-height: 100%;
  overflow-y: scroll;
}
.el-menu--vertical::-webkit-scrollbar{
  display: none !important;
}
#me-menu.el-menu {
  border: 0;
  margin: 0;
}
.el-main-page {
  display: inline-block;
  width:100%;
  height: 100%;
}
.el-loading-mask {
  z-index: 3000 !important;
}
</style>
