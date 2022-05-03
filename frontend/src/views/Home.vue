<template>
  <div class="container is-widescreen">
    <div class="columns">
      <!-- Column แสดงสินค้า--------------------------------------------------------->
      <div class="column is-8 pt-6">
        <h1 class="is-size-4 mb-4">สิ้นค้าในร้านทั้งหมด ({{products.length}}) รายการ</h1>
        <div class="container is-max-desktop">
          <div class="is-multiline columns is-variable is-2">
            <!-- Card element start here------------------------------------------>
            <div id="card_product" class="column is-one-quarter" v-for="product in products" :key="product.id">
              <div class="card">
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
                    <div class="">
                        <p>คงเหลือ {{product.quantity}}</p>
                    </div>
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

      <div class="column is-3 pt-6 ml-6">
        <div class="icon is-size-1 button cartButton" @click="showCart = !showCart">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="cart has-background-white" v-show="showCart">
          <div style="display: flex;justify-content: space-between;">
            <span class="is-size-4 mb-4">Cart ({{cart.length}})</span>
            <a @click="cart = []" class="is-danger mb-4 button">Clear</a>
          </div>
          <!-- Card element start here ------------------------------------------>
          <div v-for="(product, index) in cart" :key="product.id" class="card mb-4">
            <div class="card-content p-0">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img :src="product.image" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content pt-2">
                  <p class="is-5">{{product.title}}</p>
                  <p class="has-text-grey-light is-6">{{product.brand}}</p>
                  <div style="display: flex;justify-content: space-between;">
                    <div>
                      <!-- ราคาสินค้า------------------------------------------------ -->
                      <span class="is-6 has-text-danger">{{product.price}}</span>
                      <!-- จำนวนสินค้า----------------------------------------------- -->
                      <span>x{{product.quantity}}</span>
                    </div>
                    <div>
                      <!-- icon รูปถังขยะ------------------------------------------- -->
                      <span class="icon mr-2" key="false" @click="removeFromCart(index)">
                        <i class="far fa-trash-alt"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;font-size: 1.25rem;">
            <span class="has-text-weight-bold">Total</span>
            <span id="totalPrice">{{ totalPrice }}</span>
          </div>
          <a class="button is-warning mt-3" style="width: 100%;" @click="goCheckout()">Checkout</a>
        </div>
      </div>
    </div>
  
    <!-- ModalMethod -->
    <!-- <div class="modal" :class="{'is-active':modal_cart}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Profile</p>
          <button class="delete" aria-label="close" @click="cancel()"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure to update profile?</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="save()">Save changes</button>
          <button class="button" @click="cancel()">Cancel</button>
        </footer>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      user: null,
      cart: [],
      showCart: false,
      products: [
            {
              id: 1,
              title: "น้ำตาล",
              brand: "มิตรผล",
              price: 29,
              image: 'https://aumento.officemate.co.th/media/catalog/product/0/0/0070100.jpg?imwidth=640',
              quantity: 5,
            },
            {
              id: 2,
              title: "น้ำมันพืช",
              brand: "มรกต",
              price: 65,
              image: 'https://cf.shopee.co.th/file/4bc27c8b886b0a00dadf900878c27cd7_tn',
              quantity: 4,
            },
            {
              id: 3,
              title: "น้ำจิ้มสุกี้",
              brand: "พันท้าย",
              price: 54,
              image: 'https://backend.tops.co.th/media/catalog/product/8/8/8850058003346_1.jpg',
              quantity: 7,
            },
            {
              id: 4,
              title: "ผงชูรส",
              brand: "ถ้วยแดง",
              price: 98,
              image: 'https://ocs-k8s-prod.s3-ap-southeast-1.amazonaws.com/UPLOAD11052020/844191.jpg',
              quantity: 6,
            },
            {
              id: 5,
              title: "ข้าวหอมมะลิ",
              brand: "ฉัตร",
              price: 55,
              image: 'https://static.bigc.co.th/media/catalog/product/cache/2/image/17f82f742ffe127f42dca9de82fb58b1/8/8/8858868801107_2.jpg',
              quantity: 8,
            },
            {
              id: 6,
              title: "แป้งทอดกรอบ",
              brand: "ยูเอฟเอ็ม",
              price: 35,
              image: 'https://inwfile.com/s-dc/v7srnp.jpg',
              quantity: 2,
            },
            {
              id: 7,
              title: "ผงซักฟอก",
              brand: "โอโม",
              price: 48,
              image: 'https://aumento.officemate.co.th/media/catalog/product/6/0/60211166.jpg?imwidth=640',
              quantity: 5,
            },
            {
              id: 8,
              title: "น้ำยาล้างจาน",
              brand: "ซันไลต์",
              price: 36,
              image: 'https://www.goodchoiz.com/content/images/thumbs/0034443_%E0%B9%89%E0%B8%B3%E0%B9%89-%E0%B8%B4%E0%B8%B8%E0%B8%B4-%E0%B8%B1%E0%B9%8C-550-_550.jpeg',
              quantity: 4,
            },
        ],

    };
  },
  mounted() {
    this.getUser ();
  },
  methods: {
    getUser () {
      axios.get('/user/me').then(res => {
        this.user = res.data
      })
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
    addToCart(product){
      let have = false, index = 0, qInCart = null;
      for(let i = 0 ; i < this.cart.length ; i++){
          if(this.cart[i].id == product.id) {
            have = true;
            index = i;
            qInCart = this.cart[i].quantity;
          }
      }
      if(qInCart >= product.quantity){
        alert("สินค้าหมด")
      }
      else{
        if(have){
          this.cart[index].quantity++
        }
        else{
            let newObj = Object.assign({}, product);
            newObj.quantity=1
            this.cart.push(newObj);
        }
      }
    },
    removeFromCart(index){
        this.cart.splice(index, 1)
    },
    goCheckout(){
        const myJSON = JSON.stringify(this.cart);
        localStorage.setItem("cart", myJSON);
        this.$router.push({path: '/user/checkout'})
    }
  },
  computed:{
    totalPrice(){
        let sum = 0;
        for (const product of this.cart){
            sum += (product.quantity*product.price)
        }
        return sum
    }
  }
};
</script>
<style>
  .productImage{
    border-bottom: 2px solid black;
  }
  .cartButton{
    margin-top: 50px;
    margin-bottom: 20px;
    width: 100px;
    height: 100px;
  }
  .cart{
    border-radius: 5px;
    border: 10px solid white;
  }
</style>