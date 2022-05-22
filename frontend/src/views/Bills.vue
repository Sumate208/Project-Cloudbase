<template>
    <div class="container is-widescreen">
        <h1 class="is-size-4 mt-4">ประวัติสั่งซื้อทั้งหมด ({{bills.length}}) รายการ</h1>
        <div class="columns" v-for="bill in bills" :key="bill.bid">
        <!-- Column แสดงสินค้า--------------------------------------------------------->
        <div class="column"></div>
        <div class="column is-8 pt-6">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <div class="columns">
                            <div class="column is-three-quarters">
                                <h2>รหัสคำสั่งซื้อ {{ bill.bid }}</h2>
                                <div class="line">
                                    <div class="columns">
                                        <div class="column">
                                            <p>{{ bill.first_name }} {{ bill.last_name }}</p>
                                        </div>
                                        <div class="column">
                                            <p>เบอร์โทร: {{ bill.mobile }}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="column">
                                <button class="button is-info" @click="orderDetail(bill)">Detail</button>
                                <button class="button is-danger" v-if="bill.status == 'Waiting' && $parent.$data.user.role == 'Customer'" @click="cancleModal(bill.bid)">Cancel order</button>
                                <button class="button is-success" v-if="bill.status == 'Waiting' && $parent.$data.user.role == 'Admin'" @click="verifyModal(bill.bid)">Verify order</button>
                                <button class="button is-success" v-if="bill.status == 'Succeed'" disabled>Succeed</button>
                                <button class="button is-dark" v-if="bill.status == 'Canceled'" disabled>Canceled</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column"></div>
        </div>

        <!-- Bill -->
        <div class="modal" :class="{'is-active':modal_datail}">
            <div class="modal-background" @click="modal_datail = !modal_datail"></div>
            <div class="modal-card" style="max-width: 960px;width: 90%;">
                <section class="modal-card-body">
                    <table id='order-table' style="width: 100%;" class="table is-bordered">
                        <tr>
                            <th colspan="4" style="text-align: center;">Order Detail</th>
                        </tr>
                        <tr>
                            <th colspan="2">ชื่อ : {{ billDetail.first_name+ " " +billDetail.last_name }}</th>
                            <th colspan="2">เบอร์โทร : {{ billDetail.mobile }}</th>
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
                        <tr v-for="product in billDetail.item" :key="product.pid">
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

        <!-- ModalCancle -->
        <div class="modal" :class="{'is-active':modal_confirm_calcle}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Cancle Order</p>
                <button class="delete" aria-label="close" @click="modal_confirm_calcle = false"></button>
                </header>
                <section class="modal-card-body">
                <p>Are you sure to cancle order {{ cancleId }}?</p>
                </section>
                <footer class="modal-card-foot">
                <button class="button is-danger" @click="cancleOrder()">Cancle order</button>
                <button class="button" @click="modal_confirm_calcle = false">No</button>
                </footer>
            </div>
        </div>

        <!-- ModalVerify -->
        <div class="modal" :class="{'is-active':modal_confirm_verify}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Verify Order</p>
                <button class="delete" aria-label="close" @click="modal_confirm_verify = false"></button>
                </header>
                <section class="modal-card-body">
                <p>Are you sure to verify order {{ verifyId }}?</p>
                </section>
                <footer class="modal-card-foot">
                <button class="button is-success" @click="verifyOrder()">Verify order</button>
                <button class="button" @click="modal_confirm_verify = false">No</button>
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
      bills: [],
      modal_datail: false,
      modal_confirm_calcle: false,
      modal_confirm_verify: false,
      billDetail: {},
      cancleId: '',
      verifyId: '',
      totalPrice: 0,
    };
  },
  mounted() {
    this.getBills();
  },
  methods: {
    getBills(){
        const data = {
                token: localStorage.getItem("token"),
            }
            axios
            .put("http://localhost:3000/getbills", data)
            .then((res) => {
                this.bills = res.data.bills
            })
            .catch((err) => {
                alert(err.response.data.msg)
            });
    },
    orderDetail(product){
        this.modal_datail = true;
        this.billDetail = product;
        this.totalPrice = 0;
        for (const product of this.billDetail.item){
            this.totalPrice += (product.quantity*product.price);
        }
    },
    cancleModal(bid){
        this.cancleId = bid
        this.modal_confirm_calcle = true;
    },
    cancleOrder(){
        const data = {
            token: localStorage.getItem("token"),
            bid: this.cancleId,
        }
        axios
            .put("http://localhost:3000/cancle/bill", data)
            .then((res) => {
                this.modal_confirm_calcle = false;
                alert(res.data.msg);
                this.getBills();
            })
            .catch((err) => {
                alert(err.response.data.massage)
            });
    },
    verifyModal(bid){
        this.verifyId = bid
        this.modal_confirm_verify = true;
    },
    verifyOrder(){
        const data = {
            token: localStorage.getItem("token"),
            bid: this.verifyId,
        }
        axios
            .put("http://localhost:3000/verify/bill", data)
            .then((res) => {
                this.modal_confirm_verify = false;
                alert(res.data.msg);
                this.getBills();
            })
            .catch((err) => {
                alert(err.response.data.massage)
            });
    }
  },
};
</script>
<style>
  .productImage{
    border-bottom: 2px solid black;
  }
  .status{
      height: 40px;
      width: 125.61px;
      padding: 7px 16px;
      margin-left: 17px;
      border-radius: 5px;
      color: white;
  }
  .button{
      min-width: 125.61px;
      margin: 1px;
  }

</style>