<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      //存储列表数据
      list: [],
      loading: false,
      finished: false,
      error: false,
      //请求获取下一页数据的时间戳
      timestamp: null,
      //控制下拉刷新的loading状态
      isreFreshLoading: false,
      //下拉刷新成功提示文本
      refreshSuccessText: "刷新成功",
    };
  },
  methods: {
    async onLoad() {
      try {
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        //console.log(this.channel);
        //console.log(data);
        //请求结果存放
        const results = data.data.results;
        //... 是数组的展开操作符，会把数组中的元素一个个拿出来
        this.list.push(...results);
        //console.log(this.list);
        //本次数据加载结束后，设置加载状态为结束
        this.loading = false;
        //loading关闭后才能触发下一次的加载更多
        // 判断数据全部加载完成
        if (results.length) {
          //更新获取下一页
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        //console.log(error);
        this.error = true;
        this.loading = false;
      }
    },
    //当下拉刷新是触发该函数
    async onRefresh() {
      try {
        //请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        //数据追加到顶部
        const results = data.data.results;
        this.list.unshift(...results);
        //关闭下拉刷新的loading状态
        this.isreFreshLoading = false;
        //更新提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (error) {
        //console.log(error);
        this.isreFreshLoading = false;
        this.refreshSuccessText = "刷新失败";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
