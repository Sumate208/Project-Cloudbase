<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Product Detail</p>
      </div>
    </section>
    <!-- Image -->
    <img style="width:300px" :src="product.image" alt="Placeholder image">
    <div class="columns is-mobile is-centered">
      <div class="column is-one-quarter">
        <label class="label">Product Name</label>
        <div class="control">
          <input
            v-model="product.title"
            :class="{ 'is-danger': vTitle }"
            class="input"
            type="text"
            v-bind:disabled="!edit"
          />
        </div>
        <template v-if="vTitle">
          <p class="help is-danger">
            This field is required
          </p>
        </template>
      </div>

      <div class="column is-one-quarter">
        <label class="label">Brand</label>
        <div class="control">
          <input
                v-model="product.brand"
                class="input"
                type="text"
                v-bind:disabled="!edit"
                placeholder="Option"
              />
        </div>
      </div>
    </div>
    
    <div class="columns is-mobile is-centered ">
      <div class="column is-half">
        <label class="label">Image Url</label>
        <div class="control">
          <input
          v-model="product.image"
          :class="{ 'is-danger': vImg }"
          class="input"
          type="text"
          v-bind:disabled="!edit"
          />
        </div>
        <template v-if="vImg">
          <p class="help is-danger">
            This field is required
          </p>
        </template>
      </div>
    </div>

    <div class="columns is-mobile is-centered">
      <div class="column is-one-quarter">
        <label class="label">Price</label>
        <div class="control">
          <input
            v-model="product.price"
            :class="{ 'is-danger': vPrice }"
            class="input"
            min="0"
            required type="number"
            v-bind:disabled="!edit"
          />
        </div>
        <template v-if="vPrice">
          <p class="help is-danger">
            Price is required and cannot be negative.
          </p>
        </template>
      </div>

      <div class="column is-one-quarter">
        <label class="label">Quantity</label>
        <div class="control">
          <input 
            v-model="product.quantity"
            :class="{ 'is-danger': vQuantity }"
            class="input" 
            min="0" 
            required type="number" 
            v-bind:disabled="!edit"/>
        </div>
        <template v-if="vQuantity">
          <p class="help is-danger">
            Quantity is required and cannot be negative.
          </p>
        </template>
      </div>
    </div>

    <div class="columns is-mobile is-centered">
      <div class="column is-one-quarter">
        <label class="checkbox">
          <input type="checkbox" v-model="product.bestsell" v-bind:disabled="!edit"/>
          Bestsell
        </label>
      </div>
    </div>
    
    <div class="columns is-mobile is-centered ">
      <div class="column is-one-quarter">
        <div class="field is-grouped">
          <div class="control" v-if="!edit">
            <button @click="edit = !edit" class="button is-link" >Edit Detail</button>
          </div>
          <div class="control" v-if="edit">
            <button @click="openModalUpdate()" class="button is-success" >Save Change</button>
          </div>
          <div class="control">
            <button @click="$router.go(-1)" class="button is-link is-light">Back</button>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button @click="modal_del = !modal_del" class="button is-danger" >Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ModalConfirmUpdate -->
    <div class="modal" :class="{'is-active':modal_confirm}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Product Detail</p>
          <button class="delete" aria-label="close" @click="modal_confirm = false"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure to update detail {{ product.title }} ?</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateDetail()">Confirm</button>
          <button class="button" @click="modal_confirm = false">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- ModalConfirmDelete -->
    <div class="modal" :class="{'is-active':modal_del}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete Product</p>
          <button class="delete" aria-label="close" @click="modal_del = false"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure to delete {{ product.title }}?</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-danger" @click="deleteProduct()">Delete</button>
          <button class="button" @click="modal_del = false">Cancel</button>
        </footer>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {},
      vTitle: false,
      vImg: false,
      vPrice: false,
      vQuantity: false,
      edit: false,
      modal_confirm: false,
      modal_del: false,
    };
  },
  mounted() {
    this.getProductDetail(this.$route.params.id);
  },
  methods: {
    getProductDetail(pid) {
      axios
        .get(`http://localhost:3000/product/${pid}`)
        .then((res) => {
          this.product = res.data.product
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    openModalUpdate(){
      this.vTitle = false;
      this.vImg = false;
      this.vPrice = false;
      this.vQuantity = false;
      
      if(this.product.title == ""){
        this.vTitle = true
      }
      else if(this.product.image == ""){
        this.vImg = true
      }
      else if(parseInt(this.product.price) < 0 || this.product.price == ""){
        this.vPrice = true
      }
      else if(parseInt(this.product.quantity) < 0 || this.product.quantity == ""){
        this.vQuantity = true
      }
      else{
        this.modal_confirm = true
      }
    },
    updateDetail() {
      let data = {
          pid : this.product.pid,
          title: this.product.title,
          brand: this.product.brand,
          price: this.product.price,
          image: this.product.image,
          quantity: this.product.quantity,
          bestsell: this.product.bestsell,
          token: localStorage.getItem("token"),
        };
        if(this.bestsell == true) {data.bestsell = 1;}
        if(this.bestsell == false) {data.bestsell = 0;}
        axios
          .put("http://localhost:3000/product/update", data)
          .then((res) => {
            alert(res.data.msg);
            this.edit = false;
            this.modal_confirm = false;
          })
          .catch((err) => {
            alert(err.response.data.message)
          });
    },
    deleteProduct() {
      let data = {
        token: localStorage.getItem("token"),
        pid : this.product.pid,
      }
      axios
        .put('http://localhost:3000/delete/product', data)
        .then((res) => {
          alert("Product has been deleted.");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.response.data.err);
        });
    },
  },
};
</script>