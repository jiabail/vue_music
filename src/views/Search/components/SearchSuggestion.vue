<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import debounce from "@/utils/debounce";
export default {
  name: "searchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], //联想建议数据列表
    };
  },
  watch: {
    searchText: {
      //当searchText发生变化时调用
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
      }, 500),
      immediate: true,
    },
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q);
        //console.log(data);
        this.suggestions = data.data.options;
      } catch (error) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
    //高亮
    highlight(text) {
      const highlightStr = `<span style="color:rgb(243, 24, 24)">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      //text.replace(/this/gi, `<span class="active">${this.searchText}</span>`);
      return text.replace(reg, highlightStr);
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
}
</style>
