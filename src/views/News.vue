<template>
  <div class="h-auto p-3">
    <div class="mt-5 w-full">
      <h1 class="text-2xl font-semibold text-header">
        {{ newspaper.replaceAll("-", " ") }}
        <font-awesome-icon
          class="cursor-pointer"
          @click="setFavorite"
          :style="{ color: obj.favorite }"
          :icon="['fas', 'star']"
        />
      </h1>
    </div>
    <div class="grid sm:grid-cols-2 grid-col-1 gap-4 mt-5">
      <div
        class="card bg-white rounded-md p-5 shadow"
        v-for="(element, index) in filternews"
        :key="index"
      >
        <img
          class="w-full object-cover h-32 sm:h-48 md:h-64"
          :src="checkImageSrc(element.urlToImage)"
        />
        <div class="p-3">
          <span class="text-sm text-primary">
            {{ element.publishedAt.split("T")[0] }}</span
          >
          <h3 class="font-semibold text-xl leading- text-gray-700 my-2">
            {{ element.title }}
          </h3>
          <p class="paragraph-normal text-gray-600" style="word-wrap: anywhere">
            {{ element.content }}
          </p>
          <!-- <a class="mt-3 block" href="#">Read More >></a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      news: [],
      filternews: [],
      newspaper: "",
      newspapers: JSON.parse(localStorage.getItem("newspapers")),
      obj: {},
    };
  },
  methods: {
    getNewspaper() {
      let index = this.newspapers
        .map((e) => e.name)
        .indexOf(this.newspaper.replaceAll("-", " "));
      this.obj = this.newspapers[index];
      return index;
    },
    // set favorite newspaper
    setFavorite() {
      if (this.obj.favorite === "lightGray") {
        this.obj.favorite = "#FDCA9C";
        this.newspapers.splice(this.getNewspaper(), 1);
        this.newspapers.unshift({
          name: this.newspaper.replaceAll("-", " "),
          favorite: this.obj.favorite,
          index: this.obj.index,
          id: this.obj.id,
        });
      } else {
        this.obj.favorite = "lightGray";
        this.newspapers.splice(this.getNewspaper(this.newspapers), 1);
        this.newspapers.splice(this.obj.index, 0, this.obj);
      }
      localStorage.setItem("newspapers", JSON.stringify(this.newspapers));
    },
    //img src is null or not
    checkImageSrc(urlToImage) {
      return urlToImage && urlToImage !== "null"
        ? urlToImage
        : "https://moh-hei.edu.om/documents/2231351/3455666/news/9c67104a-4607-4348-885e-492f52b29e6e?t=1597578533202";
    },
  },
  created() {
    const route = useRoute();
    this.newspaper = route.params.newspaper;
    this.getNewspaper();
    //get news
    let requestURL =
      "https://newsapi.org/v2/everything?sources=" +
      this.obj.id +
      "&apiKey=" +
      process.env.VUE_APP_API_KEY;
    axios.get(requestURL).then((res) => {
      this.filternews = this.news = res.data.articles;
    });
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
