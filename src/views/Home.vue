<template>
  <div class="home">
    <top-nav/>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/home/TopNav.vue'
export default {
  components: { TopNav },
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'home' ,
    component:{
        TopNav
    }
}
</script>

<style>

</style>