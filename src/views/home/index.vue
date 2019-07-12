<template>
  <div>
    <header>
      <van-nav-bar title="首页" :fixed="true" />
    </header>
    <section>
      <van-tabs v-model="activeChannelIndex" class="channel-tabs">
        <van-tab :title="channelItem.name" v-for='channelItem in channels' :key ='channelItem.id' >
          <!-- 实现 下拉刷新 -->
          <van-pull-refresh v-model="channelItem.pullRefreshLoading" @refresh="onRefresh" :success-text="channelItem.pullSuccessText" >
            <!-- 异步获取数据 -->
            <van-list v-model="channelItem.upLoading" :finished="channelItem.finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in channelItem.articles" :key="item.art_id" :title="item.title" />
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <!-- <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab> -->
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
import { getUserChannels } from '@/api/channel.js'
import { getArticles } from '@/api/article.js'
// 注意 推荐列表 和 用户列表 是同一个接口
export default {
  data () {
    return {
      // 获取频道
      channels: [],
      activeChannelIndex: 0,
      active: null,
      list: [],
      loading: false,
      finished: false,
      pullRefreshLoading: false
    }
  },
  computed: {
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  methods: {
    // 异步获取数据
    async onLoad () {
      try {
        await this.$sleep(800)

        const articles = await this.loadArticles()

        this.activeChannel.articles.push(...articles)

        this.activeChannel.upLoading = false
      } catch (err) {
        console.log(err)
      }
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 2000)
    },
    // 实现 下拉列表
    async onRefresh () {
      const data = await getArticles({
        channelId: this.activeChannel.id,
        timestamp: Date.now(),
        withTop: 1
      })
      if (data.results.length) {
        this.activeChannel.articles = data.results
        this.activeChannel.timestamp = data.pre_timestamp
        this.activeChannel.pullSuccessText = '更新完成'
        this.onLoad()
      }
      this.activeChannel.pullSuccessText = '暂无最新数据'
      this.activeChannel.pullRefreshLoading = false

      // setTimeout(() => {
      //   this.pullRefreshLoading = false
      // }, 3000)
    },
    // 获取 频道列表
    async loadChannels () {
      // 注意  ： 用户列表 和 推荐类别 是 同一个接口 ，只是有无 参数 token的 区别
      let channels = []
      const { user } = this.$store.state
      if (user) {
      // 如果 已经登录 获取用户列表
        channels = (await getUserChannels()).channels
      } else {
        // 如果没有登录
        // 判断本地 是否有 存储的列表
        const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        // 如果有 获取本地
        if (localChannels) {
          // 如果有 获取本地的
          channels = localChannels
        } else {
          // 如果没有，则请求获取推荐的频道列表
          channels = (await getUserChannels()).channels
        }
        // channels = (await getUserChannels()).channels
      }
      // console.log(channels)
      channels.forEach(item => {
        item.articles = [] // 频道的文章
        item.timestamp = Date.now() // 时间戳
        item.finished = false // 控制上拉加载 结束
        item.upLoading = false // 控制下拉刷新 结束
        item.pullRefreshLoading = false // 控制频道列表的下拉刷新状态
        item.pullSuccessText = '' // 控制频道列表的下拉刷新成功提示文字
      })
      // console.log('后端获取的getUserChannels')
      console.log(channels)
      this.channels = channels
    },
    // 获取列表文章
    async loadArticles () {
      try {
        const data = await getArticles({
          channelId: this.activeChannel.id,
          timestamp: this.activeChannel.timestamp,
          withTop: 1
        })

        if (data.pre_timestamp && data.results.length === 0) {
          this.activeChannel.timestamp = data.pre_timestamp
          return this.loadArticles()
        }
        if (data.results.length) {
          this.activeChannel.timestamp = data.pre_timestamp
          return data.results
        }
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }

  },
  async created () {
    await this.loadChannels()
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
