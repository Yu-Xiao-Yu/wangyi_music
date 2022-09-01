<template>
  <div class="home">
    <top-nav/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/views/Home.vue'
import TopNav from '@/components/home/TopNav.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,TopNav
  }
}
</script>
