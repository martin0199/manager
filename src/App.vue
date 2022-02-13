<template>
<div id="app">
    <template v-if="path==='/login'">
        <router-view/>
    </template>
    <template v-else>
        <div class="app-layout-box content-loading">
            <div class="app-layout-header">
                <layout-header/>
            </div>
            <div class="main-page">
                <div class="main-page-left">
                    <el-menu class="menu-list" id="me-menu"  :default-active="path" unique-opened :collapse="isCollapse">
                        <layout-menu v-for="item in getMenuList" :menu-info="item" :key="item.path" />
                    </el-menu>
                </div>
                <div class="main-page-right">
                    <layout-breadcrumb/>
                    <div class="main-page-right-content with-watermark" id="router-main">
                        <router-view v-if="isRouterAlive" />
                    </div>
                </div>
            </div>
        </div>
    </template>
</div>
</template>
<script>
import waterMark from '@/plugins/waterMark.js'
import layoutMenu from '@/components/layout/Menu'
import layoutHeader from '@/components/layout/Header'
import layoutBreadcrumb from '@/components/layout/Breadcrumb'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      waterHeight: '',
      path: '',
      isRouterAlive: true
    }
  },
  components: {
    layoutMenu,
    layoutHeader,
    layoutBreadcrumb
  },
  computed: {
    ...mapGetters({
      getMenuList: 'getMenuList',
      isCollapse: 'getIsCollapse'
    })
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  watch: {
    $route (to, from) {
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
  }
}
</script>
<style lang="scss">
@import url('./assets/css/both.scss');
//@import url('./assets/css/rest.css');
@import url('./assets/fonts/iconfont.css');
@import url('./assets/mfont/iconfont.css');
body{
    height: 100%;
     position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
#app{
  overflow: hidden !important;
  height: 100%;
  & .el-menu--collapse{
    width:32px !important;
    }

}
#me-menu:not(.el-menu--collapse){
   width:160px !important;
}
.app-layout-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(180deg, #3987b9 0%, #82b3d6 100%) !important;
    .app-layout-header {
        width: 100%;
        height: 50px;
        background-image: url('./assets/img/banner/bg.png');
        background-size:cover;
        background-repeat: no-repeat;
    }
    .main-page{
        height: calc(100% - 50px);
        overflow: hidden;
        width: 100%;
        display: flex;
        background: transparent;
        .main-page-left {
            height: 100%;
            box-sizing: border-box;
            padding: 12px!important;
            max-width: 180px!important;
            flex-shrink: 0;
            &::-webkit-scrollbar{
                display: none !important;
            }
            .menu-list {
                background-color: transparent !important;
                &.el-menu {
                    border: 0;
                    margin: 0;
                }
                .el-menu-item {
                    min-width: auto !important;
                    color: #fff !important;
                    height: 40px !important;
                    line-height: 40px !important;
                    font-size: 12px !important;
                }
                i{
                    color: #fff;
                    margin-right:8px
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
        }
        .main-page-right {
            height: 100%;
            width: 100%;
            .main-page-right-content {
                margin-top: 10px;
                box-sizing: border-box;
                width: 100%;
                height: calc(100% - 40px);
                overflow-x: hidden;
                overflow-y: auto;
            }
        }
    }
}
</style>
