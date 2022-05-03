<template>
  <div class="container is-widescreen">
    <div class="columns is-centered">
      <!-- Column แสดงสินค้า--------------------------------------------------------->
      <div class="column is-8 pt-6">
        <h1 class="is-size-4 mb-4">สิ้นค้าในร้านทั้งหมด ({{products.length}}) รายการ</h1>
        <div class="container is-max-desktop">
          <div class="is-multiline columns is-variable is-2">
            <!-- Card element start here------------------------------------------>
            <div id="card_product" class="column is-one-quarter" v-for="product in products" :key="product.title">
              <div class="card" v-bind:class="{'has-background-warning-light':product.is_favorite}">
                <div class="card-image productImage">
                  <figure class="image is-1by1">
                    <img :src="product.image" alt="Placeholder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{product.title}}</p>
                      <p class="subtitle is-6">{{product.brand}}</p>
                      <p class="subtitle is-6 has-text-danger">{{product.price}} ฿</p>
                    </div>
                  </div>
                  <div style="display: flex;justify-content: space-between;">
                    <!-- >>>>>ไอคอนรูปตะกร้า <<<<<<,s----------------------------------------->
                    <div class="icon is-size-4" @click="addToCart(product)">
                        <i class="fas fa-shopping-cart has-text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      search: "",
      products: [
            {
                title: "น้ำตาล",
                brand: "มิตรผล",
                price: 29,
                image: 'https://aumento.officemate.co.th/media/catalog/product/0/0/0070100.jpg?imwidth=640'
            },
            {
                title: "น้ำมันพืช",
                brand: "มรกต",
                price: 65,
                image: 'https://cf.shopee.co.th/file/4bc27c8b886b0a00dadf900878c27cd7_tn'
            },
            {
                title: "น้ำจิ้มสุกี้",
                brand: "พันท้าย",
                price: 54,
                image: 'https://backend.tops.co.th/media/catalog/product/8/8/8850058003346_1.jpg'
            },
            {
                title: "ผงชูรส",
                brand: "ถ้วยแดง",
                price: 98,
                image: 'https://ocs-k8s-prod.s3-ap-southeast-1.amazonaws.com/UPLOAD11052020/844191.jpg'
            },
            {
                title: "ข้าวหอมมะลิ",
                brand: "ฉัตร",
                price: 55,
                image: 'https://static.bigc.co.th/media/catalog/product/cache/2/image/17f82f742ffe127f42dca9de82fb58b1/8/8/8858868801107_2.jpg'
            },
            {
                title: "แป้งทอดกรอบ",
                brand: "ยูเอฟเอ็ม",
                price: 35,
                image: 'https://inwfile.com/s-dc/v7srnp.jpg'
            },
            {
                title: "ผงซักฟอก",
                brand: "โอโม",
                price: 48,
                image: 'https://aumento.officemate.co.th/media/catalog/product/6/0/60211166.jpg?imwidth=640'
            },
            {
                title: "น้ำยาล้างจาน",
                brand: "ซันไลต์",
                price: 36,
                image: 'https://www.goodchoiz.com/content/images/thumbs/0034443_%E0%B9%89%E0%B8%B3%E0%B9%89-%E0%B8%B4%E0%B8%B8%E0%B8%B4-%E0%B8%B1%E0%B9%8C-550-_550.jpeg'
            },
        ],

    };
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    getBlogs() {
      axios
        .get("http://localhost:3000", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.blogs = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + "...";
      }
      return content;
    },

  },
};
</script>
<style>
.productImage{
  border-bottom: 2px solid black;
}
</style>