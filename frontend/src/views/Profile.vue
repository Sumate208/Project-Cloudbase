<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Profile</p>
      </div>
    </section>

    <div class="columns is-mobile is-centered">
      <div class="column is-one-quarter">
        <label class="label">First Name</label>
        <div class="control">
          <input
            v-model="$v.first_name.$model"
            :class="{ 'is-danger': $v.first_name.$error }"
            class="input"
            type="text"
            v-bind:disabled="!edit"
          />
        </div>
        <template v-if="$v.first_name.$error">
          <p class="help is-danger" v-if="!$v.first_name.required">
            This field is required
          </p>
        </template>
      </div>
      <div class="column is-one-quarter">
        <label class="label">Last Name</label>
        <div class="control">
          <input
                v-model="$v.last_name.$model"
                :class="{ 'is-danger': $v.last_name.$error }"
                class="input"
                type="text"
                v-bind:disabled="!edit"
              />
        </div>
        <template v-if="$v.last_name.$error">
          <p class="help is-danger" v-if="!$v.last_name.required">
            This field is required
          </p>
        </template>
      </div>
    </div>
    
    <div class="columns is-mobile is-centered ">
      <div class="column is-one-quarter">
        <label class="label">Email</label>
        <div class="control">
          <input
          v-model="$v.email.$model"
          :class="{ 'is-danger': $v.email.$error }"
          class="input"
          type="text"
          v-bind:disabled="!edit"
          />
        </div>
        <template v-if="$v.email.$error">
          <p class="help is-danger" v-if="!$v.email.required">
            This field is required
          </p>
          <p class="help is-danger" v-if="!$v.email.email">Invalid Email</p>
        </template>
      </div>

      <div class="column is-one-quarter">
        <label class="label">Mobile</label>
        <div class="control">
          <input
            v-model="$v.mobile.$model"
            :class="{ 'is-danger': $v.mobile.$error }"
            class="input"
            type="text"
            v-bind:disabled="!edit"
          />
        </div>
        <template v-if="$v.mobile.$error">
          <p class="help is-danger" v-if="!$v.mobile.required">
            This field is required
          </p>
          <p class="help is-danger" v-if="!$v.mobile.mobile">
            Invalid Mobile Number
          </p>
        </template>
      </div>
    </div>

    
    <div class="columns is-mobile is-centered ">
      <div class="column is-half">
        <div class="field is-grouped">
          <div class="control" v-if="!edit">
            <button @click="edit = !edit" class="button is-link" >Edit Profile</button>
          </div>
          <div class="control" v-if="edit">
            <button @click="openModal()" class="button is-success" >Save Change</button>
          </div>
          <div class="control">
            <button @click="$router.go(-1)" class="button is-link is-light">Back</button>
          </div>
        </div>
      </div>
    </div>

    

    <!-- ModalConfirm -->
    <div class="modal" :class="{'is-active':modal_confirm}">
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
          <button class="button is-success" @click="updateProfile()">Confirm</button>
          <button class="button" @click="cancel()">Cancel</button>
        </footer>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import {
  required,
  email,
  helpers,
} from "vuelidate/lib/validators";

function mobileV(value) {
  return !helpers.req(value) || !!value.match(/0[0-9]{9}/);
}
export default {
  data() {
    return {
        edit: false,
        modal_confirm: false,
        first_name: this.$parent.$data.user.first_name,
        last_name: this.$parent.$data.user.last_name,
        email: this.$parent.$data.user.email,
        mobile: this.$parent.$data.user.mobile,

    };
  },
  methods: {
    cancel(){
      this.modal_confirm = !this.modal_confirm
    },
    openModal(){
      if (!this.$v.$invalid) {
        this.modal_confirm = true;
      }
    },
    updateProfile(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = {
        token: localStorage.getItem("token"),
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        mobile: this.mobile,
      }
      
      axios.post('http://localhost:3000/user/update', data)
        .then(res => {
          this.$parent.$data.user = res.data.user
          this.edit = false;
          this.modal_confirm = false;
          alert(res.data.msg);
        })
        .catch(error => {
          this.error = error.response.data
          console.log(error.response.data)
        })
      }
    }
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    mobile: {
      required: required,
      mobile: mobileV,
    },
    first_name: {
      required: required,
    },
    last_name: {
      required: required,
    },
  },
};
</script>
<style>
.container{
  min-height: 95vh;
}
</style>