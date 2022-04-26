<template>
  <div id="app">
    <!-- nav bar -->
    <nav
      class="navbar"
      style="
        background-color: rgb(250, 172, 99);
        box-shadow: 0px 0px 10px black;
      "
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item is-size-4"> Home </router-link>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end mr-3">
          <div v-if="user && isManager()" class="navbar-item">
            <router-link to="/blogs/create" class="button is-primary">
              <strong>Add Product</strong>
            </router-link>
          </div>

          <div v-if="user && !(isManager())" class="navbar-item">
            <router-link to="/user/cart/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </svg>
            </router-link>
          </div>

          <div v-if="user" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <figure class="image is-24x24 my-auto">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/128x128.png"
                />
              </figure>
              <span class="pl-3">{{ user.fname }} {{ user.lname }}</span>
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">Profile</a>
              <a class="navbar-item" @click="logOut()">Log out</a>
            </div>
          </div>

          <div v-if="!user" class="navbar-item">
            <router-link to="/user/login">
              <strong>Login</strong>
            </router-link>
          </div>
          <div v-if="!user" class="navbar-item">
            <router-link to="/user/signup">
              <strong>Signup</strong>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <router-view
      :key="$route.fullPath"
      @auth-change="onAuthChange"
      :user="user"
    />
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      const token = localStorage.getItem("token");
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    },
    logOut() {
      localStorage.removeItem("token");
      this.user = null;
    },
    isManager() {
      if (!this.user) return false;
      return this.user.type == "Manager";
    },
  },
};
</script>