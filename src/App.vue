<template>
  <WelcomePage msg="Welcome to finance calculator" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import WelcomePage from './components/WelcomePage.vue'

@Options({
  components: {
    WelcomePage,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
