<template>
  <div class="container is-widescreen">
    <div class="columns mt-3 mb-0">
      <div class="column"></div>
      <div class="column-4 text-has-centered">
        <label class="is-size-1 has-text-centered">YOU CART</label>
      </div>
      <div class="column"></div>
    </div>
    <div class="column pt-6 pl-0 pr-0">
      <!-- card cart component แสดงข้อมูลที่อยู่ใน Localstorage ---------------------------------------------->
      <div class="card mb-4" v-for="item in carts" :key="item.id">
        <div class="card-content p-0">
          <div class="columns">
            <div class="column is-10">
              <div class="media">
                <div class="media-left">
                  <figure class="image">
                    <img
                      style="height: 120px; width: 120px"
                      :src="imagePath(item.file_path)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content pt-2">
                  <p class="is-5">สินค้า {{ item.product_name }}</p>
                  <p class="has-text-grey is-6">
                    ราคาชิ้นละ {{ item.price }} บาท
                  </p>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      <span
                        >จำนวน
                        <span class="has-text-danger">{{ item.unit }}</span>
                        ชิ้น</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column has-text-right">
              <div class="mr-4 p-2">
                <button
                  class="button is-success is-fullwidth"
                  @click="plusInCart(item.product_id)"
                >
                  เพิ่ม
                </button>
                <button class="button is-warning is-fullwidth">ลด</button>
                <button class="button is-danger is-fullwidth">ลบ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-size-4">
      <div class="column is-1 is-offset-8">Total</div>
      <div class="column is-3 has-text-right">
        <!-- Total here ---------------------------------------- -->
        {{ totalCost + " ฿" }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  name: "Home",
  props: ["user"],
  data() {
    return {
      carts: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      axios
        .get(`http://localhost:3000/cart/${this.user.uid}`)
        .then((response) => {
          this.carts = response.data;
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
    plusInCart(product_id) {
      axios
        .put(
          `http://localhost:3000/product/plusproduct/${product_id} ${this.user.uid}`
        )
        .then((response) => {
          let selectedBlog = this.blogs.filter((e) => e.id === blogId)[0];
          selectedBlog.like = response.data.like;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    totalCost: function () {
      let sum = 0;
      this.carts.forEach((item) => {
        sum += item.unit * item.price;
      });
      return sum;
    },
  },
};
</script>
