<template>
  <div class="home-container">
    <!--头部导航栏-->
    <van-nav-bar class="page-nav-bar" fixed>
      <template v-slot:left>
        <img src="@/assets/logo1.png" alt="" />
        <span class="nav-text">头条</span>
      </template>
      <template #right>
        <van-button
          type="default"
          plain
          round
          size="small"
          class="search-btn"
          to="/search"
        >
          <van-icon name="search" class="search-nav" size="0.48rem"> </van-icon>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <!--频道编辑弹出层-->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdataActive"
      ></ChannelEdit>
    </van-popup>
    <!--通过 animated 属性可以开启切换标签内容时的转场动画。-->
    <!--通过 swipeable 属性可以开启滑动切换标签页。-->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!--文章列表-->
        <ArticleList :channel="item" />
      </van-tab>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="toutiao icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/Article-list.vue";
import ChannelEdit from "./components/Channel-edit.vue";
import { setItem, getItem } from "@/utils/storage";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      //频道列表
      channels: [],
      isChannelEditShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        if (this.user) {
          //已登录
          const { data } = await getUserChannels();
          this.channels = data.data.channels;
        } else {
          //未登录，获取默认频道列表
          const localChannels = getItem("TOUTIAO_CHANNELS");
          if (localChannels) {
            this.channels = localChannels;
          } else {
            const { data } = await getUserChannels();
            this.channels = data.data.channels;
          }
        }

        //console.log(data);
      } catch (err) {
        this.$toast("获取频道数据失败");
      }
    },
    onUpdataActive(index, isChannelEditShow = true) {
      this.active = index;
      this.isChannelEditShow = isChannelEditShow;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 176px;
  padding-bottom: 100px;
  .van-nav-bar {
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    .nav-text {
      font-size: 20px;
      line-height: 45px;
      margin-left: 8px;
      color: #fff;
    }
  }
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 520px;
    height: 64px;
    border: none;
    .search-nav {
      color: black;
      right: 220px;
    }
  }

  .nav-icon {
    font-size: 55px;
    color: #ff7070;
  }
  .page-nav-bar {
    background-color: #ff3a3a;
  }
  //深度操作符
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab--active {
      color: black !important;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      bottom: 8px;
    }
    .van-tab {
      min-width: 200px;
      //border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
  }
}
</style>
