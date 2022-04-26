<template>
  <div class="container is-widescreen">
    <!---best sell carousel--->
    <p class="title">สินค้าขายดี</p>
    <div id="myCarousel" class="carousel slide" data-ride="carousel" style="background: #fff;">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner text-center">
        <div class="item active">
          <div class="columns">
            <div class="column"></div>
            <div class="column is-4">
              <img
                class=""
                src="./itemID6-1.jpg"
                style="width: auto; height: 300px"
              />
            </div>
            <div class="column"></div>
          </div>
        </div>
        <div class="item">
          <div class="columns">
            <div class="column"></div>
            <div class="column is-4">
              <img
                class=""
                src="./itemID7-1.jpg"
                style="width: auto; height: 300px"
              />
            </div>
            <div class="column"></div>
          </div>
        </div>

        <div class="item">
          <div class="columns">
            <div class="column"></div>
            <div class="column is-4">
              <img
                class=""
                src="./itemID8-1.jpeg"
                style="width: auto; height: 300px"
              />
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>

      <!-- Left and right controls -->
      <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <!---search product--->
    <section class="hero">
      <div class="hero-body">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-2"><p class="title">ค้นหาสินค้า</p></div>
          <div class="column is-6">
            <div class="field has-addons">
              <div class="control">
                <input
                  style="width: 600px"
                  class="input"
                  type="text"
                  v-model="search"
                  placeholder="Search product"
                />
              </div>
              <div class="control">
                <button @click="getProducts" class="button is-info">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </section>

    <!--product--->
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
          <div
            class="column is-3"
            v-for="product in products"
            :key="product.id"
          >
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image ml-7">
                  <img
                    style="height: 200px;width: 200px"
                    :src="imagePath(product.file_path)"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="title">{{ product.product_name }}</div>
              </div>
              <footer class="card-footer">
                <router-link
                  class="card-footer-item button is-info"
                  :to="`/products/detail/${product.id}`"
                  >Detail</router-link
                >
                <!---Edit button--->
                <!---Add cart--->
                <button v-if="user && !isManager()"
                  class="button is-primary card-footer-item is-normal"
                  @click="addToCart(product.product_id)"
                >
                  Add to cart
                </button>
                <!---Edit button--->
                <a
                  v-if="isManager()"
                  class="card-footer-item button is-danger"
                  @click="
                    $router.push({
                      name: 'update-blog',
                      params: { id: product.id },
                    })
                  "
                >
                  <span class="icon-text">
                    <span>Edit</span>
                  </span>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      search: "",
      products: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    /// search product
    getProducts() {
      axios
        .get("http://localhost:3000", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /// get image path
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    ///cut comment
    /// addlike
    addToCart(product_id) {
      axios
        .post(
          `http://localhost:3000/product/addtocart/${product_id} ${this.user.uid}`
        )
        .then((response) => {
          let selectedBlog = this.blogs.filter((e) => e.id === blogId)[0];
          selectedBlog.like = response.data.like;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /// check owner
    isManager() {
      if (!this.user) return false;
      return this.user.type == "Manager";
    },
  },
};
</script>
