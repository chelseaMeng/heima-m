<template>
  <div>
    <!-- 搜索框 -->
    <!-- form的作用:在ios系统吓可以显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        class="search"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- <search-history></search-history>
    <search-result></search-result>
    <search-suggestion></search-suggestion> -->
    <!--动态组件 -->
    <!-- is指定动态组件名字,里面的值是字符串 并且值应该从注册的components里面取-->
    <components
      :is="componentName"
      :keywords="keywords"
      :history="history"
      @clearAll="history = []"
      @search="onSearch"
    ></components>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
import SearchSuggestion from './components/SearchSuggestion'
import storage from '@/utils/storage'
export default {
  name: 'Search',
  data () {
    return {
      keywords: '',
      //   用于记录用户是否搜索
      isShowSearchResult: false,
      // 搜索记录
      history: storage.get('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  methods: {
    onSearch (val) {
      // console.log('正在搜索')
      const index = this.history.indexOf(val)
      // 说明历史记录里有这个值
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(val)
      // 展示搜索结果
      this.isShowSearchResult = true
    },
    onSearchFocus () {
      // 当keywords为空,显示搜索历史
      // 当keywords有值,就显示搜索建议
      //   言外之意就是不显示搜索结果
      this.isShowSearchResult = false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentName () {
      // 如果输入的内容为空,显示搜索历史
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        // 如果用户敲击回车,显示搜索结果
        return 'SearchResult'
      }
      // 既不显示搜索历史 也不是显示搜索结果 就渲染搜索建议
      return 'SearchSuggestion'
    }
  },
  watch: {
    history (value) {
      storage.set('TOUTIAO_SEARCH_HISTORY', value)
      // localStorage.setItem(('TOUTIAO_SEARCH_HISTORY', JSON.stringify(value)))
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    //属性选择器
    color: #fff;
  }
}
</style>
