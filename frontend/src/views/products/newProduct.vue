<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title is-1 has-text-centered">ADD NEW PRODUCT</p>
      </div>
    </section>
    <section class="px-6">
      <input
        class="mb-5"
        multiple
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline">
        <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image pl-3 pt-3">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" style="width:262px;height:250px;"/>
              </figure>
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">ชื่อสินค้า</label>
        <div class="control">
          <input v-model="titleBlog" class="input" type="text" placeholder="จำเป็นต้องระบุ" />
        </div>
      </div>

      <div class="field">
        <label class="label">ราคาสินค้า</label>
        <div class="control">
          <input v-model="titleBlog" class="input" type="text" placeholder="จำเป็นต้องระบุ" />
        </div>
      </div>

      <div class="field">
        <label class="label">จำนวน</label>
        <div class="control">
          <input v-model="titleBlog" class="input" type="text"/>
        </div>
      </div>

      <div class="field">
        <label class="label">จำนวนที่จะแจ้งเตือนสินค้าใกล้หมด</label>
        <div class="control">
          <input v-model="titleBlog" class="input" type="text" placeholder="จำเป็นต้องระบุ" />
        </div>
      </div>

      <div class="control mb-3 mr-3">
        <label class="mr-5">
          <input v-model="bestsell" type="checkbox" name="answer"/>
          Best sell
        </label>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="addNewProduct" class="button is-link">Add Product</button>
        </div>
        <div class="control">
          <button @click="$router.push({ path: '/' })" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  data() {
    return {
      blog: {},
      error: null,
      images: [], // array of image
      product_name: "",
      price: "",
      unit: "",
      minimum_stock: "",
      bestsell: false,
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    addNewProduct() {
      let formData = new FormData();
      formData.append("product_name", this.product_name);
      formData.append("price", this.price);
      formData.append("unit", this.unit);
      formData.append("minimum_stock", this.minimum_stock);
      formData.append("bestsell", this.bestsell ? 1 : 0);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });

      // Note ***************
      // ตอนเรายิง Postmant จะใช้ fromData
      // ตอนยิงหลาย ๆ รูปพร้อมกันใน Postman จะเป็นแบบนี้

      // title   | "This is a title of blog"
      // comment | "comment in blog"
      // ...
      // myImage | [select file 1]
      // myImage | [select file 2]
      // myImage | [select file 3]

      // จะสังเกตุว่าใช้ myImage เป็น key เดียวกัน เลยต้องเอามา loop forEach
      // พอไปฝั่ง backend มันจะจัด file ให้เป็น Array เพื่อเอาไปใช้งานต่อได้

      axios
        .post("http://localhost:3000/blogs", formData)
        .then((res) => this.$router.push({name: 'home'}))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>