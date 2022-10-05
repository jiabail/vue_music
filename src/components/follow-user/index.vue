<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
    >已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#ff3a3a"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >
    关注
  </van-button>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "FollowUser",
  model: {
    prop: "isFollowed",
    event: "update-isFollowed",
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
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
    async onFollow() {
      this.loading = true;
      try {
        if (this.isFollowed) {
          //已关注
          await deleteFollow(this.userId);
          //console.log(data);
          //this.article.is_followed = false;
        } else {
          //未关注
          await addFollow(this.userId);
          //console.log(data);
          // this.article.is_followed = true;
        }
        //this.isFollowed = !this.isFollowed;
        this.$emit("update-isFollowed", !this.isFollowed);
      } catch (error) {
        console.log(error);
        let message = "操作失败，请重试！";
        if (error.response && error.response.status === 400) {
          message = "你不能关注你自己!";
        }
        this.$toast(message);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
