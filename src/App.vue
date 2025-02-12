<template>

  <section class="wrapper">
    <section>
      <Header />
      <section class="content">
        <div class="content_inner">
          <router-view />
        </div>
        <aside class="side_slide">
          <div id="dont_click"></div>
        </aside>
      </section>
    </section>
  </section>
  <footer class="footer">
    <div class="line_inner">
      <div class="foot_line">
        <div class="copy">
          <div class="foot_txt">
            © 2024 badbug. All rights reserved.
          </div>
          <div class="footer_logo"></div>
        </div>
      </div>
    </div>
  </footer>

</template>
<script>
import Header from './components/Header.vue';
import './assets/css/style.scss'

export default {
    name: 'App',
  components: {
    'Header': Header
  },
}
</script>
