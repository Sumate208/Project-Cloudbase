<template>
  <div>
    <div class="container is-fluid mt-5">
      <div class="columns is-centered">
        <div class="column"></div>
        <div class="column is-4">
          <h1 class="title has-text-centered is-size-1">Sign Up</h1>
          <!-- Sign up form -->
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left">
              <input
                v-model="$v.username.$model"
                :class="{ 'is-danger': $v.username.$error }"
                class="input"
                type="text"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <template v-if="$v.username.$error">
              <p class="help is-danger" v-if="!$v.username.required">
                This field is required
              </p>
              <p class="help is-danger" v-else-if="!$v.username.username">
                Invalid Username
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.password.$model"
                :class="{ 'is-danger': $v.password.$error }"
                class="input"
                type="password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <template v-if="$v.password.$error">
              <p class="help is-danger" v-if="!$v.password.required">
                This field is required
              </p>
              <p class="help is-danger" v-else-if="!$v.password.password">
                Invalid Password
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.confirm_password.$model"
                :class="{ 'is-danger': $v.confirm_password.$error }"
                class="input"
                type="password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <template v-if="$v.confirm_password.$error">
              <p class="help is-danger" v-if="!$v.confirm_password.required">
                This field is required
              </p>
              <p
                class="help is-danger"
                v-else-if="!$v.confirm_password.confirm_password"
              >
                Password is not same
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">First Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.fname.$model"
                :class="{ 'is-danger': $v.fname.$error }"
                class="input"
                type="text"
              />
            </div>
            <template v-if="$v.fname.$error">
              <p class="help is-danger" v-if="!$v.fname.required">
                This field is required
              </p>
              <p class="help is-danger" v-else-if="!$v.fname.fname">
                Invalid Firstname
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Last Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.lname.$model"
                :class="{ 'is-danger': $v.lname.$error }"
                class="input"
                type="text"
              />
            </div>
            <template v-if="$v.lname.$error">
              <p class="help is-danger" v-if="!$v.lname.required">
                This field is required
              </p>
              <p class="help is-danger" v-else-if="!$v.lname.lname">
                Invalid Lastname
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Sex</label>
            <div class="control has-icons-left has-icons-right">
              <div class="select is-fullwidth">
                <select
                  v-model="$v.sex.$model"
                  :class="{ 'is-danger': $v.sex.$error }"
                >
                  <option value="Male">Male</option>
                  <option value="Femail">Female</option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i class="fas fa-venus-mars"></i>
              </span>
            </div>
            <template v-if="$v.sex.$error">
              <p class="help is-danger" v-if="!$v.sex.required">
                This field is required
              </p>
              <p class="help is-danger" v-else-if="!$v.sex.sex">
                Invalid Email
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Birth Day</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.birthday.$model"
                :class="{ 'is-danger': $v.birthday.$error }"
                class="input"
                type="date"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-birthday-cake"></i>
              </span>
            </div>
            <template v-if="$v.birthday.$error">
              <p class="help is-danger" v-if="!$v.birthday.required">
                This field is required
              </p>
              <p class="help is-danger" v-else-if="!$v.birthday.birthday">
                Invalid BirthDay Number
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">phone Number</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.phone.$model"
                :class="{ 'is-danger': $v.phone.$error }"
                class="input"
                type="text"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-mobile"></i>
              </span>
            </div>
            <template v-if="$v.phone.$error">
              <p class="help is-danger" v-if="!$v.phone.required">
                This field is required
              </p>
              <p class="help is-danger" v-else-if="!$v.phone.phone">
                Invalid Phone Number
              </p>
            </template>
          </div>

          <button class="button is-primary is-fullwidth" @click="submit()">
            Sign Up
          </button>

          <p class="my-3">Already have an account? 
            <router-link to="/user/login">
              Login
            </router-link></p>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import {
  required,
  helpers,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

function mobile(value) {
  return !helpers.req(value) || !!value.match(/0[0-9]{9}/);
}

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      phone: "",
      fname: "",
      lname: "",
      sex: "",
      birthday: "",
    };
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          confirm_password: this.confirm_password,
          fname: this.fname,
          lname: this.lname,
          sex: this.sex,
          phone: this.phone,
          birthday: this.birthday,
        };

        axios
          .post("http://localhost:3000/user/signup", data)
          .then((res) => {
            alert("Sign up Success");
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },
  },
  validations: {
    phone: {
      required: required,
      phone: mobile,
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("password"),
    },
    username: {
      required: required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    fname: {
      required: required,
    },
    lname: {
      required: required,
    },
    sex: {
      required: required,
    },
    birthday: {
      required: required,
    },
  },
};
</script>