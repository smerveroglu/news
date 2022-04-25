<template>
  <div class="alert h-auto p-3">
    <div class="mt-5 w-full">
      <h1 class="text-2xl font-semibold" style="color: rgb(7 63 121)">
        Top Headlines
      </h1>
    </div>
    <div class="grid sm:grid-cols-2 grid-col-1 gap-4 mt-5">
      <div
        class="card bg-white rounded-md p-5 shadow"
        v-for="(element, index) in filternews"
        :key="index"
      >
        <img
          class="h-auto w-auto object-cover"
          :src="element.urlToImage"
          alt=""
        />
        <div class="p-3 sm:w-full w-80">
          <span class="text-sm text-primary">
            {{ element.publishedAt.split("T")[0] }}</span
          >
          <h3 class="font-semibold text-xl leading-6 text-gray-700 my-2">
            {{ element.title }}
          </h3>
          <p class="paragraph-normal text-gray-600">
            {{ element.description }}
          </p>
          <!-- <a class="mt-3 block" href="#">Read More >></a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      news: [],
      filternews: [],
    };
  },
  async created() {
    let requestURL =
      "https://newsapi.org/v2/top-headlines?country=us" +
      "&apiKey=" +
      process.env.VUE_APP_API_KEY;

    const res = await axios.get(requestURL, {
      proxy: {
        host: "localhost",
        port: 8080,
      },
    });
    this.filternews = this.news = await res.data.articles;
  },
  mounted() {
    var alert_dis = document.querySelectorAll(".alert-dismiss");
    alert_dis.forEach((x) =>
      x.addEventListener("click", function () {
        x.parentElement.classList.add("hidden");
      })
    );
  },
  watch: {
    "$store.state.search": {
      handler(newVal) {
        if (newVal !== "") {
          this.filternews = this.news.filter((el) =>
            el.title.toLowerCase().includes(newVal.toLowerCase())
          );
        } else {
          this.filternews = this.news;
        }
      },
      deep: true,
    },
  },
};
</script>
