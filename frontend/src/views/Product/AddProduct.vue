<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          <!-- <%= error.code + ': ' + error.sqlMessage %> -->
          <!---->
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Add New Product</p>
      </div>
    </section>
    <section class="px-6">
      <div class="field mt-5">
        <label class="label">Product Name</label>
        <div class="control">
          <input v-model="title" class="input" type="text" placeholder="Product Name" />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">Brand</label>
        <div class="control">
          <input v-model="brand" class="input" type="text" placeholder="Product Brand" />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">Price</label>
        <div class="control">
          <input v-model="price" class="input" type="text" placeholder="Price" />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">Image URL</label>
        <div class="control">
          <input v-model="image" class="input" type="text" placeholder="Image URL" />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">Quantity</label>
        <div class="control">
          <input v-model="quantity" class="input" type="text" placeholder="Quantity" />
        </div>
      </div>
    
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input v-model="bestsell" type="checkbox" />
            BESTSELL
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="submit()" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      error: null,
      title: null,
      price: null,
      brand: null,
      images: null,
      quantity: null,
      bestsell: false,
    };
  },
  methods: {
    submit() {
      if(this.title === null || this.price === null || this.brand === null || this.image === null || this.quantity === null)
        alert("กรุณาระบุรายละเอียดให้ครบ")
      else{
        let data = {
          title: this.title,
          price: this.price,
          brand: this.brand,
          image: this.image,
          quantity: this.quantity,
          bestsell: 0,
        };

        if(this.bestsell) {
          data.bestsell = 1
        }

        axios
          .post("http://localhost:3000/addproduct", data)
          .then((res) => this.$router.push({name: 'home'}))
          .catch((e) => console.log(e.response.data));
      }
    },
  },
};
</script>

<style>
</style>