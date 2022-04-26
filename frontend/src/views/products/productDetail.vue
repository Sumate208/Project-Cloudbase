<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title is-1 has-text-centered">PRODUCT DETAIL</p>
      </div>
    </section>

    <template>
      <div class="content">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-8">
            <div class="card has-background-light pb-5">
              <figure class="image">
                <img v-if="product.best_sell"
                  :src="'http://localhost:3000/' + 'BestSell.png'"
                  alt="Placeholder image"
                  style="
                    height: 100px;
                    width: 100px;
                    position: absolute;
                    top: 20px;
                    right: -20px;
                  "
                />
              </figure>
              <div class="card-image">
                <div class="columns">
                  <div
                    v-for="image in images"
                    :key="image.image_id"
                    class="column pt-5"
                  >
                    <figure class="image">
                      <img
                        :src="'http://localhost:3000/' + image.file_path"
                        alt="Placeholder image"
                        style="height: 250px; object-fit: cover"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3 card has-background-light">
              <div class="card-content">
                <label class="is-size-3"
                  >สินค้า: {{ product.product_name }}</label
                ><br />
                <label class="is-size-5">ราคา: {{ product.price }}</label
                ><br />
                <label class="is-size-5">เหลือ: {{ product.unit }} ชิ้น</label>
              </div>
              <footer class="card-footer">
                <router-link class="button is-info is-fullwidth" to="/"
                  >To Home Page</router-link
                >
                <button v-if="!isManager()" class="button is-success is-fullwidth" @click="addToCart(product.product_id)">Add to cart</button>
              </footer>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Product",
  props: ["user"],
  data() {
    return {
      product: {},
      images: [],
      error: null,
    };
  },
  mounted() {
    this.getProductDetail(this.$route.params.id);
  },
  methods: {
    getProductDetail(product_id) {
      axios
        .get(`http://localhost:3000/product/detail/${product_id}`)
        .then((response) => {
          this.product = response.data.product;
          this.images = response.data.images;
          console.log(product);
          console.log(images);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addToCart(product_id) {
      let data = {
        order_id: this.user.order_id,
        product_id: product_id,
      }
      axios
        .post("http://localhost:3000/cart/addtocart", data)
        .then((res) => {
            alert("Add Product Success");
          })
        .catch((err) => {
          console.log(err);
        });
    },
    isManager() {
      if (!this.user) return false;
      return this.user.type == "Manager";
    },
  },
};
</script>