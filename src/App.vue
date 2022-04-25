<template>
  <div class="flex bg-packed font-lexend">
    <div
      class="flex-sidebar lg:flex-auto overflow-auto w-sidebar lg:block hidden bg-white border-r-2 h-screen  lg:relative fixed"
    >
      <Sidebar />
    </div>
    <div class="flex-auto w-full overflow-auto h-screen">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
  // vue Components
  import Sidebar from "@/components/Sidebar";
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";
  import axios from 'axios';

  export default {
    name: "App",

    components: {
      Header,
      Footer,
      Sidebar,
    },
  };
</script>
