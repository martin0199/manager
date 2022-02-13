<template>
  <div class="breadcrum">
    <i class="iconfont icon-caidan2" @click="collapseMenu"></i>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="main-breadcrum" >
      <el-breadcrumb-item v-for="(item, index) in $route.meta.breakcrumb" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      switchCollapse: 'SET_IS_COLLAPSE'
    }),
    collapseMenu () {
      this.switchCollapse(!this.isCollapse)
    }
  },
  computed: {
    ...mapGetters({
      isCollapse: 'getIsCollapse'
    })
  }
}
</script>

<style lang="scss">
.breadcrum {
  display: flex;
  background: #fff;
  height: 36px;
  box-shadow: 16px 4px 16px rgba(59, 135, 239, 0.1);
}
.main-breadcrum {
  line-height: 36px;
  padding: 0 12px;
}
.el-breadcrumb__item {
  font-size: 14px !important;
  line-height: 36px;
  color: #000 !important;
}
.el-breadcrumb__inner {
  color: #000 !important;
}

i.icon-caidan2 {
  margin: 8px 0 6px 12px;
  cursor: pointer;
  color: #000;
}
</style>
