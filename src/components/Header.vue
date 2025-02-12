<template>
  <header class="top">
    <a href="/" class="logo">
      <div class="logo_name">
        <div class="logo_txt">
          <span class="spn1">ba</span>
          <span class="red">db</span>
          <span class="spn1">ug</span>
        </div>
        <div class="studio">
          <span class="grey">Entertainment</span>
        </div>
      </div>
      <div class="logo_img"></div>
    </a>

    <nav class="menu">
      <ul class="publicTabs navigate" id="menu">
        <li class="navTab" v-for="{ url, name } in routes">
          <router-link class="navLink" :to=url>{{ name }}</router-link>
        </li>
        <div class="lavalamp"></div>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      routes: [
        { url: "/", name: "Home" },
        { url: "about", name: "About me" },
        { url: "portfolio", name: "Portfolio" },
        { url: "contacts", name: "Contacts" },
      ],
    };
  },
};
</script>
