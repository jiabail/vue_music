<template>
  <div class="my-container">
    <!--已登录-->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image :src="userInfo.photo" class="avatar" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!--未登录-->
    <div class="header not-login" v-else @click="$router.push('/login')">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets/logo1.png" alt="" class="logo-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!--宫格导航-->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!--单元格导航-->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-9" />
    <van-cell
      v-if="user"
      title="退出登录"
      class="logout-cell"
      @click="onLogout"
      clickable
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";

export default {
  name: "MyIndex",
  data() {
    return {
      //用户信息
      userInfo: {},
    };
  },
  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    onLogout() {
      //退出提示
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // on confirm
          //console.log("true");
          //确认退出，清除登录状态
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo();
        //console.log(data);
        this.userInfo = data.data;
      } catch (err) {
        this.$toast("获取数据失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background-image: url("@/assets/beijing1.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .logo-img {
        width: 132px;
        height: 132px;
        border-radius: 50%;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: black;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: black;
        }
      }
    }
    .data-stats {
      //height: 130px;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: black;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .mb-9 {
    margin-bottom: 10px;
  }
  .logout-cell {
    color: red;
    text-align: center;
    padding-top: 10px;
  }
}
</style>
