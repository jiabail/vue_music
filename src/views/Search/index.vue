<template>
  <div class="search-container">
    <!--顶部搜索栏-->

    <form action="/" class="search-form">
      <van-search
        v-model.trim="searchText"
        show-action
        v-getFocus
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isResultShow = false"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
        <template #left>
          <van-button icon="arrow-left" @click="$router.back()" />
        </template>
      </van-search>
    </form>
    <!--搜素结果-->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!--联想建议-->
    <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    >
    </SearchSuggestion>
    <!--历史记录-->
    <SearchHistory
      v-else
      :search-histories="searchHistories"
      @clear-search-history="searchHistories = []"
      @search="onSearch"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "./components/SearchHistory.vue";
import SearchSuggestion from "./components/SearchSuggestion.vue";
import SearchResult from "./components/SearchResult.vue";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "SearchIndex",
  data() {
    return {
      //搜索关键字
      searchText: "",
      isResultShow: false,
      searchHistories: getItem("TOUTIAO_SEARCH_HISTORIES") || [], //搜索的历史记录数据
    };
  },
  watch: {
    searchHistories(nVal) {
      // 同步到本地存储
      setItem("TOUTIAO_SEARCH_HISTORIES", nVal);
    },
  },
  methods: {
    onSearch(val) {
      //更新文本框内容
      this.searchText = val;
      //存储搜索历史记录,不要有重复历史记录，最新的在最前面
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      //展示搜索结果
      this.isResultShow = true;
    },
  },
  components: { SearchHistory, SearchSuggestion, SearchResult },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: rgb(248, 50, 50);
  }
  .van-button--default {
    border: 0 solid black;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
