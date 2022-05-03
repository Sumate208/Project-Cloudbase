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
                        <input class="input" type="text" v-model="user.first_name" disabled>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Lastname</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.last_name" disabled>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Tel</label>
                    <div class="control">
                        <input class="input" type="text" v-model="user.mobile" disabled>
                    </div>
                </div>
            </div>
            <!-- click this button to open Order modal ----------------- -->
            <a @click="modal_confirm_order = !modal_confirm_order" class="button is-warning">Confirm Order</a>
        </div>
    
        <div class="modal" v-bind:class="{'is-active':modal_confirm_order}">
            <div class="modal-background" @click="modal_confirm_order = !modal_confirm_order"></div>
            <div class="modal-card" style="max-width: 960px;width: 90%;">
                <section class="modal-card-body">
                    <table id='order-table' style="width: 100%;" class="table is-bordered">
                        <!-- ใส่ข้อมูลของ table ไว้ในนี้ -------------------------------------------->
                        <tr>
                            <th colspan="4" style="text-align: center;">Order Detail</th>
                        </tr>
                        <tr>
                            <th colspan="2">ชื่อ : {{ user.first_name+ " " +user.last_name }}</th>
                            <th colspan="2">เบอร์โทร : {{ user.mobile }}</th>
                        </tr>
                        <tr>
                            <th colspan="4" style="text-align: center;">รายการสินค้า</th>
                        </tr>
                        <tr>
                            <th>ชื่อสินค้า</th>
                            <th>ราคาต่อหน่วย</th>
                            <th>จำนวน</th>
                            <td>ราคารวม</td>
                        </tr>
                        <tr v-for="product in cart" :key="product.id">
                            <td>{{ product.title }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.quantity*product.price }}</td>
                        </tr>
                        <tr>
                            <th colspan="2"></th>
                            <th>ราคารวมทั้งหมด</th>
                            <th>{{ totalPrice }}</th>
                        </tr>
                    </table>
                </section>
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
            modal_confirm_order: false,
        };
    },
    created(){
        this.cart = JSON.parse(localStorage.getItem("cart"));
    },
    computed:{
        totalPrice(){
            let sum = 0;
            for (const product of this.cart){
                sum += (product.quantity*product.price)
            }
            return sum
        }
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
    },
};
</script>
<style>
.container{
  min-height: 95vh;
}
</style>