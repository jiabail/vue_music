<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <CommentItem :comment="comment"></CommentItem>
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <ArticleComment :source="comment.com_id" :type="'c'" :list="commentList">
      </ArticleComment>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="post-wrap">
      <van-button
        class="post-btn"
        size="small"
        round
        @click="isPostShow = true"
      >
        写评论
      </van-button>
    </div>
    <!-- /底部 -->
    <!--发布评论-->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost :target="comment.com_id" @post-success="onPostSuccess">
      </CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import ArticleComment from "./article-comment.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "CommentReply",
  components: { CommentItem, ArticleComment, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPostSuccess(data) {
      //更新
      this.comment.reply_count++;
      //关闭弹层
      this.isPostShow = false;
      //顶部展示
      this.commentList.unshift(data.new_obj);
    },
  },
};
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 160px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  height: 88px !important;
  .post-btn {
    width: 60%;
  }
}
</style>
