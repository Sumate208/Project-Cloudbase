<template>
  <div class="container is-widescreen">
    <div class="columns">
      <!-- Column แสดงสินค้า--------------------------------------------------------->
      <div class="column" v-if="$parent.$data.user.role != 'Customer'"></div>
      <div class="column is-8 pt-6">
        <h1 class="is-size-4 mb-4">สิ้นค้าในร้านทั้งหมด ({{products.length}}) รายการ</h1>
        <div class="container is-max-desktop">
          <div class="is-multiline columns is-variable is-2">
            <!-- Card element start here------------------------------------------>
            <div id="card_product" class="column is-one-quarter" v-for="product in products" :key="product.pid">
              <div class="card">
                <div class="card-image productImage">
                  <div class="icon is-size-4 best" v-if="product.bestsell==1">
                    <i class="fas fa-trophy"></i>
                  </div>
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
                    <div v-if="$parent.$data.user.role == 'Customer'" class="icon is-size-4" @click="addToCart(product)">
                        <i class="fas fa-shopping-cart has-text-info"></i>
                    </div>
                    <div v-if="$parent.$data.user.role != 'Customer'" class="icon is-size-4" @click="productDetail(product)">
                        <i class="fas fa-info-circle has-text-info"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ตระกร้าไอเท็ม -->
      <div class="column" v-if="$parent.$data.user.role != 'Customer'"></div>
      <div class="column is-3 pt-6 ml-6" v-if="$parent.$data.user.role == 'Customer'">
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
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")),
      showCart: false,
      products: [],
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct(){
      axios.get('http://localhost:3000/getproduct').then(res => {
        this.products = res.data
      })
    },
    addToCart(product){
      let have = false, index = 0, qInCart = null;
      for(let i = 0 ; i < this.cart.length ; i++){
          if(this.cart[i].pid == product.pid) {
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
    },
    productDetail(product){
      this.$router.push({name: 'product-detail',params:{id:product.pid}})
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
  .best{
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: gold;
    border-radius: 50%;
    z-index: 1024;
    left: 5px;
    top: 5px;
  }
</style>