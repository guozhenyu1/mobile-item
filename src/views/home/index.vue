<template>
  <div>
    <header>
      <van-nav-bar title="首页" :fixed="true" />
    </header>
    <section>
      <van-tabs v-model="active" class="channel-tabs">
        <van-tab title="标签 1">
          <!-- 实现 下拉刷新 -->
          <van-pull-refresh v-model="pullRefreshLoading" @refresh="onRefresh">
            <!-- 异步获取数据 -->
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
      </van-tabs>
    </section>
    <footer>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">问答</van-tabbar-item>
        <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: null,
      list: [],
      loading: false,
      finished: false,
      pullRefreshLoading: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 2000)
    },
    onRefresh () {
      setTimeout(() => {
        this.pullRefreshLoading = false
      }, 3000)
    }
  }
}
</script>
<style lang = 'less' scoped>
section {
  margin-top: 80px;
}
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 80px;
}
footer {
  height: 60px;
  margin-top: 20px;
}
</style>
