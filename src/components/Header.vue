<template>
  <!-- this header -->
  <header class="p-2 border-b-2" style="backgroundColor:#ECEAED">
    <div class="wrap-header flex items-center justify-between flex-wrap">
      <div class="flex flex-no-shrink items-center">
        <button
          class="text-gray-500 lg:hidden ml-3 block"
          @click="sidebarToggle"
        >
        <font-awesome-icon :icon="['fas', 'bars']" />

        </button>
      </div>
      <div class="mr-5 flex">
        <div
          class="input-box border rounded-md mr-5 lg:w-search w-full flex box-border lg:flex md:flex focus-within:bg-gray-100"
        >
          <span class="text-2xl p-2 text-gray-400">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            class="p-2 w-full bg-white rounded-md outline-none focus:bg-gray-100 "
            v-model="store.state.search"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from "vuex";
export default {
  data() {
    return {
      menu: false,
      store: useStore(),
    };
  },
  
  methods: {
    sidebarToggle: function () {
      document.querySelector(".flex-sidebar").classList.remove("hidden");
    },
  },
};
</script>
