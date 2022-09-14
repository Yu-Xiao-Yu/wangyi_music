import { getLogin } from '@/request/api/home';
import { getMusicLyric } from '@/request/api/item';
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{//播发列表
      al: {
        id: 89039055,
        name: "我不说想你 月亮会带给你",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568500"
      },
      id: 1446137141, //1841356713
      name: '鱼仔',
      ar: [{
        name: "wo"
      }]
    }],
    playListIndex: 0,
    isbtnShow: true,//播发或者暂停显示
    detailShow: false,//歌曲详情页
    lyricList: {},
    currentTime: 0,//当前时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooterMusic: true//判断底部组件是否显示
  },
  mutations: {
    updateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    pushPlayList(state, value) {
      state.playList.push(value)
    },
    updatePlayList(state, value) {
      state.playList = value
      console.log(state.playList);
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList(state, value) {
      state.lyricList = value
    },
    updateCurrentTime(state, value) {
      // console.log(state.currentTime)
      state.currentTime = value
    },
    updateDuration(state, value) {
      state.duration = value
    },
    updateIsLogin(state, value) {
      state.isLogin = true
    },
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      console.log("歌词", res);
      context.commit("updateLyricList", res.data.lrc)
    },
    async getLogin(context, value) {
      let res = await getLogin(value)
      //console.log('登录', res)
      return res
    },
  },
  modules: {
  }
})
