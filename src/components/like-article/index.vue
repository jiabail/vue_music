<template>
  <van-button
    type="default"
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1,
    }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addLiked, deleteLiked } from "@/api/article";
export default {
  name: "LikedArticle",
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        let status = -1;
        if (this.value === 1) {
          //已收藏
          await deleteLiked(this.articleId);
        } else {
          //未收藏
          await addLiked(this.articleId);
          status = 1;
        }
        //更新视图
        this.$emit("input", status);
        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
      } catch (error) {
        this.$toast("操作失败，请重试!");
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
