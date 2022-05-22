<template>
    <div class="container is-widescreen">
        <div class="container is-max-desktop p-5">
            <div class="column pt-6 pl-0 pr-0">
                <!-- card cart component แสดงข้อมูลที่อยู่ใน Localstorage ---------------------------------------------->
                <div class="card mb-4" v-for="product in cart" :key="product.id">
                    <div class="card-content p-0">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-96x96">
                                    <img :src="product.image" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content pt-2">
                                <p class="is-5">{{ product.title }}</p>
                                <p class="has-text-grey-light is-6">{{ product.brand }}</p>
                                <div style="display: flex;justify-content: space-between;">
                                    <div>
                                        <span class="is-6 has-text-danger">{{ product.price }}</span>
                                        <span>x{{ product.quantity }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns is-size-4">
                <div class="column is-1 is-offset-8">
                    Total
                </div>
                <div class="column is-3 has-text-right">
                    <!-- Total here ---------------------------------------- -->
                    {{ totalPrice }} ฿
                </div>
            </div>
            <hr>
            <h1 class="is-size-4">User Info</h1>
            <br>
            <!-- Form Column --------------------------------------- -->
            <div class="columns">
                <div class="column">
                    <label class="label">Firstname</label>
                    <div class="control">
                        <input class="input" type="text" v-model="this.$parent.$data.user.first_name" disabled>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Lastname</label>
                    <div class="control">
                        <input class="input" type="text" v-model="this.$parent.$data.user.last_name" disabled>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Tel</label>
                    <div class="control">
                        <input class="input" type="text" v-model="this.$parent.$data.user.mobile" disabled>
                    </div>
                </div>
            </div>
            <!-- click this button to open Order modal ----------------- -->
            <button v-bind:disabled="haveItem" @click="modal_confirm = true" class="button is-warning">Confirm Order</button>
        </div>
        
        <!-- ModalConfirmUpdate -->
        <div class="modal" :class="{'is-active':modal_confirm}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Comfirm Order</p>
                <button class="delete" aria-label="close" @click="modal_confirm = false"></button>
                </header>
                <section class="modal-card-body">
                <p>Are you sure to Order?</p>
                </section>
                <footer class="modal-card-foot">
                <button class="button is-success" @click="createBill()">Confirm</button>
                <button class="button" @click="modal_confirm = false">Cancel</button>
                </footer>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
    data() {
        return {
            user: null,
            modal_confirm: false,
            cart: [],
            haveItem: false
        };
    },
    created(){
        this.cart = JSON.parse(localStorage.getItem("cart"));
        if(this.cart.length>0){this.haveItem = false}
        else{this.haveItem = true}
    },
    computed:{
        totalPrice(){
            let sum = 0;
            for (const product of this.cart){
                sum += (product.quantity*product.price)
            }
            return sum
        },
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser () {
            axios.get('/user/me').then(res => {
                this.user = res.data
            })
        },
        createBill(){
            this.modal_confirm = false;
            const data = {
                token: localStorage.getItem("token"),
                cart: this.cart
            }
            axios
            .post("http://localhost:3000/create/bill", data)
            .then((res) => {
                this.modal_confirm = false;
                const myJSON = JSON.stringify([]);
                localStorage.setItem("cart", myJSON);
                this.$router.push({path: '/bills'})
            })
            .catch((err) => {
                alert(err.response.data.msg)
            });
        }
    },
};
</script>
<style>
.container{
  min-height: 95vh;
}
</style>