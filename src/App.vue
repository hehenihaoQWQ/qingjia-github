<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        isRouterAlive: true
      }
    },
    provide() {
      return {
        reload: this.reload
      };
    },
		methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      }
    }
  }
</script>
<style>
*{
  margin: 0;
}
html, body, #app{
 height: 100%;
 width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
