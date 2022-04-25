<template>
  <div class="h-auto p-3">
    <div class="mt-5 w-full">
      <h1 class="text-2xl font-semibold text-header">
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
          class="w-full object-cover h-32 sm:h-48 md:h-64r"
          :src="checkImageSrc(element.urlToImage)"
        />
        <div class="p-3 sm:w-full w-80">
          <span class="text-sm text-primary">
            {{ element.publishedAt.split("T")[0] }}</span
          >
          <h3 class="font-semibold text-xl leading-6 text-gray-700 my-2">
            {{ element.title }}
          </h3>
          <p class="paragraph-normal text-gray-600" style="word-wrap: anywhere">
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
  methods: {
    //img src is null or not
    checkImageSrc(urlToImage) {
      return urlToImage && urlToImage !== "null"
        ? urlToImage
        : "https://moh-hei.edu.om/documents/2231351/3455666/news/9c67104a-4607-4348-885e-492f52b29e6e?t=1597578533202";
    },
  },
  async created() {
    //get news
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
  watch: {
    // filter news
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
