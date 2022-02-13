<template>
  <div class="codeInfo">
      <el-row :gutter="10">
        <el-col :span="12">
            <aside-box @emitRowChange="emitRowChange" @emitDbRowChange="emitDbRowChange" @emitRestForm="emitRestForm" />
        </el-col>
        <el-col :span="12">
            <main-box ref="mainBox"/>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import asideBox from '@/views/sys/codeInfo/aside.vue'
import mainBox from '@/views/sys/codeInfo/main.vue'
export default {
  components: {
    asideBox,
    mainBox
  },
  methods: {
    emitRowChange (codeTypeId) {
      this.$refs.mainBox.codeInfoSearchFormData.codeTypeId = codeTypeId
      this.$refs.mainBox.getCodeInfoList()
    },
    emitDbRowChange (codeTypeId) {
      this.$refs.mainBox.codeInfoSearchFormData.codeTypeId = codeTypeId
      this.$refs.mainBox.addCodeInfo()
    },
    emitRestForm () {
      this.$refs.mainBox.codeInfoSearchFormData.codeTypeId = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
