<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from "@/api/search";
export default {
  name: "searchResults",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResults({
          page: this.page,
          q: this.searchText,
        });
        //console.log(data);
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
          this.page = 1;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        this.$toast("数据获取失败，请稍后重试");
      }
    },
  },
};
</script>

<style></style>
