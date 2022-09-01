<template>
  <div class="topNav">
    <div class="topLeft">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao" />
        </svg>
    </div>
    <div class="topContent">
        <span>我的</span>
        <span class="a">发现</span>
        <span>云村</span>
        <span>视频</span>
    </div>
    <div class="topRight">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo" />
        </svg>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .topNav{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topContent{
            width: 65%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            // align-items: center;
            font-size: .36rem;
        }
        .a{
            font-weight: 900;
        }
    }
</style>