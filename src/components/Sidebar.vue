<template>
  <!-- sidebar -->
  <nav class="sidebar" style="backgroundColor:#ECEAED">
    <!-- sidebar head -->
    <div class="sidebar-head p-4">
      <h2
        class="text-2xl font-normal text-gray-400 cursor-pointer"
        @click="$router.push('/')"
      >
        News
      </h2>
      <button class="lg:hidden block float-right -mt-7" @click="sidebarToggle">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
    </div>
    <!-- sidebar list -->
    <div
      class="sidebar-list p-4 mt-2"
      v-for="element in newspapers"
      :key="element.id"
      @click="
        $router.push({
          name: 'News',
          params: { newspaper: element.name.replace(/\s/g, '-') },
        })
      "
    >
      <router-link
        to="/"
        class="w-full text-left block rounded-md hover:bg-gray-100 mt-2"
      >
        {{ element.name }}
      </router-link>
    </div>
  </nav>
</template>
<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      newspapers: [],
    };
  },
  methods: {
    sidebarToggle: function () {
      document.querySelector(".flex-sidebar").classList.add("hidden");
    },
  },
  async created() {
    if (localStorage.getItem("newspapers") === null) {
      const res = await axios.get(
        "https://newsapi.org/v2/top-headlines/sources?apiKey=" +
          process.env.VUE_APP_API_KEY
      );
      let mappedRes = await res.data.sources.map((element, i) => {
        return { name: element.name, favorite: "lightGray", index:i, id: element.id };
      });
      await localStorage.setItem("newspapers", JSON.stringify(mappedRes));
    }
    this.newspapers = JSON.parse(localStorage.getItem("newspapers"));
  },
};
</script>
