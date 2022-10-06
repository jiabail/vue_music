<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    >
    </CommentItem>
  </van-list>
</template>

<script>
import { getComments } from "@/api/comment";
import CommentItem from "./comment-item.vue";
export default {
  name: "CommentList",
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    type: {
      type: String,
      validator(val) {
        return ["a", "c"].includes(val);
      },
      default: "a",
    },
  },
  data() {
    return {
      //list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10, //评论个数
    };
  },
  created() {
    this.loading = true;
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.offset,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.$emit("onload-success", data.data);
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
        //console.log(data);
      } catch (error) {}
    },
  },
};
</script>

<style></style>
