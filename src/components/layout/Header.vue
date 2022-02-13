<template>
   <div class="banner-box">
      <div class="banner-user">
        <img src="@/assets/img/banner/user.png" />
        <div>
          <p>{{ userInfo.userName }} | {{ userInfo.niName}}</p>
          <p>登录日期：{{ userInfo.loginTime }}</p>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="logout">
        <i class="iconfont icon-power" @click="loginOut"></i>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  inject: ['reload'],
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  }
}
</script>

<style lang="scss">
.banner-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .banner-model {
    width: 80px;
    text-align: center;
    cursor: pointer;
    .banner-icon {
      margin-top: 6px;
      width: 20px;
      background-size: contain;
      background-repeat: no-repeat;
    }
    p {
      line-height: 18px;
      font-size: 12px;
    }
    .el-badge {
      .el-badge__content.is-fixed.is-dot {
        top: 6px !important;
        right: 12px !important;
      }
      .el-badge__content.is-dot {
        height: 8px !important;
        width: 8px !important;
      }
    }
  }
  .el-divider--vertical {
    margin: 15px 8px !important;
  }
  .banner-user {
    min-width: 180px;
    display: flex;
    flex-direction: row;
    margin-left: 8px;
    img {
      margin: 9px 6px;
      height: 33px;
      background-size: contain;
    }
    p {
      margin-left:8px;
      margin-top: 9px;
      font-size: 12px;
      color:#fff
    }
  }
  .el-dropdown {
    // width: 100px; 角色名称过长不显示注释
    text-align: center;
    color: #fff !important;
    line-height: 44px;
    font-size: 12px;
    cursor: pointer;
  }
  .logout {
    width: 40px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    i{
        color:#fff
    }
  }
}
</style>
