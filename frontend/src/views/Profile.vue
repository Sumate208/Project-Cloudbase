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
          <input v-model="user.first_name" class="input" type="text" placeholder="First Name" v-bind:disabled="!edit"/>
        </div>
      </div>
      <div class="column is-one-quarter">
        <label class="label">Last Name</label>
        <div class="control">
          <input v-model="user.last_name" class="input" type="text" placeholder="Last Name" v-bind:disabled="!edit"/>
        </div>
      </div>
    </div>
    
    <div class="columns is-mobile is-centered ">
      <div class="column is-one-quarter">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="user.email" class="input" type="text" placeholder="First Name" v-bind:disabled="!edit"/>
        </div>
      </div>
      <div class="column is-one-quarter">
        <label class="label">Mobile</label>
        <div class="control">
          <input v-model="user.mobile" class="input" type="text" placeholder="Last Name" v-bind:disabled="!edit"/>
        </div>
      </div>
    </div>
    
    <div class="columns is-mobile is-centered ">
      <div class="column is-half">
        <div class="field is-grouped">
          <div class="control" v-if="!edit">
            <button @click="edit = !edit" class="button is-link" >Edit Profile</button>
          </div>
          <div class="control" v-if="edit">
            <button @click="modal_confirm = true" class="button is-success" >Save Change</button>
          </div>
          <div class="control">
            <button @click="$router.go(-1)" class="button is-link is-light">Back</button>
          </div>
        </div>
      </div>
    </div>

    

    <!-- ModalMethod -->
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
          <button class="button is-success" @click="save()">Save changes</button>
          <button class="button" @click="cancel()">Cancel</button>
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
        edit: false,
        modal_confirm: false,
    };
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
    save(){

    },
    cancel(){
      this.modal_confirm = !this.modal_confirm
    }
  },
};
</script>
<style>
.container{
  min-height: 95vh;
}
</style>