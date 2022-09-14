import service from "..";

//获取首页轮播图数据
export function getBanner() {
    return service({
        method: 'GET',
        url: "/banner?type=2",
    })
}

//获取发现好歌单
export function getMusicList() {
    return service({
        method: 'GET',
        url: "/personalized?limit=10",
    })
}

//获取搜索功能
export function getSearchMusic(data) {
    return service({
        method: 'GET',
        url: `/cloudsearch?keywords=${data}`,
    })
}

//登录功能
export function getLogin(data) {
    return service({
        method: 'GET',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
    })
}