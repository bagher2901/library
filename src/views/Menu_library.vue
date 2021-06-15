<template>
  <div class="base">
    <button v-on:click="log_out()" class="exit">خروج</button>
    <h2 class="title">اتوماسیون کتابخانه</h2>

    <!--//////////////////////////////////////////////////////////////////-->
    <div class="menu">
      <ul class="nav nav-tabs">
        <li @click="changePage('books')" class="nav-item">
          <a class="nav-link" v-bind:class="{ active: showPage==='books' }" aria-current="page">کتب</a>
        </li>
        <li @click="changePage('loan')" class="nav-item">
          <a class="nav-link" v-bind:class="{ active: showPage==='loan' }">سرویس امانت</a>
        </li>
        <li @click="changePage('group')" class="nav-item">
          <a class="nav-link" v-bind:class="{ active: showPage==='group' }">دسته بندی</a>
        </li>
        <li @click="changePage('search')" class="nav-item">
          <a class="nav-link" v-bind:class="{ active: showPage==='search' }">جستجو</a>
        </li>
        <li @click="changePage('profile')" class="nav-item">
          <a class="nav-link" v-bind:class="{ active: showPage==='profile' }">پروفایل</a>
        </li>
      </ul>
    </div>
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <Books v-show="showPage==='books'"/>
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <Loan v-show="showPage==='loan'"/>
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->

    <Group v-show="showPage==='group'"/>

    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <Search v-show="showPage==='search'"/>
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->

    <Profile v-show="showPage==='profile'"/>
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
    <!--//////////////////////////////////////////////////////////////////-->
  </div>
</template>

<script>


import db from "../firebase/init"
import firebase from "firebase"
import Profile from "../components/Profile";
import Search from "../components/Search";
import Group from "../components/Group";
import Loan from "../components/Loan";
import Books from "../components/Books";

export default {
  name: "menu_library",
  components: {Books, Loan, Group, Search, Profile},
  data() {
    return {
      showPage: "profile",
      books: [],
      all: 'all',


    }


  },
  methods: {
    changePage(page) {
      this.showPage = page;
    },
    log_out() {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem("user")
        location.reload()
        this.$router.push({name: 'Loginandsignup'}).then()
      }).catch(err => {
        console.log(err)
      })

    }

  },

  created() {

    let user = firebase.auth().currentUser;
    console.log(user)

    // let user = firebase.auth().currentUser.email;
    // db.collection("users").get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     let userEmail = doc.data().email;
    //     console.log(userEmail)
    //     if (user === userEmail) {
    //       console.log("horaaaa")
    //
    //     }
    //   })
    // })
  }
}
</script>


<style scoped>
/*@import "../assets/style.css";*/
::-webkit-scrollbar {
  width: 3.5px;
}

::-webkit-scrollbar-thumb {
  background-color: #007bfe;
}

.base {
  height: auto;
  width: 100%;
  text-align: right;
  direction: rtl;
  margin-bottom: 100px;
  position: relative;
}

.base .btn-loan {
  border-radius: 15px;
  background-color: #21b15d;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.base .btn-loan:hover {
  background-color: #0f6d06;
  -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.base .exit {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 15px;
  background-color: #e0ba0d;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.base .exit:hover {
  background-color: #db2121;
  -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.base .title {
  text-shadow: 2px 2px #837f7f;
  padding-right: 40px;
  padding-top: 70px;
}

.base .menu {
  margin-top: 40px;
}

.base .books {
  margin-top: 100px;
  padding-left: 80px;
  padding-right: 80px;
  height: 600px;
  overflow: scroll;
}

.base .books ::-webkit-scrollbar-thumb {
  background-color: #007bfe;
}

.base .loan-book {
  margin-top: 100px;
  padding-left: 80px;
  padding-right: 80px;
}

.base .loan-book .loan {
  height: 300px;
  overflow-y: scroll;
}

.base .loan-book .loan ::-webkit-scrollbar-thumb {
  background-color: #007bfe;
}

.base .loan-book .my-loan {
  height: 300px;
  overflow-y: scroll;
}

.base .loan-book .my-loan ::-webkit-scrollbar-thumb {
  background-color: #007bfe;
}

.base .group-book {
  margin-top: 100px;
  padding-left: 80px;
  padding-right: 80px;
}

.base .group-book .column-group {
  background-color: aqua;
  width: 200px;
  height: 500px;
  overflow-y: scroll;
  float: right;
}

.base .group-book .column-group ::-webkit-scrollbar-thumb {
  background-color: #007bfe;
}

.base .group-book .table-group {
  width: 1000px;
  height: 500px;
  float: left;
  background-color: aquamarine;
}

.base .group-book .table-group ::-webkit-scrollbar-thumb {
  background-color: #007bfe;
}

.base .search-user .search-book {
  margin-top: 100px;
  padding-left: 80px;
  padding-right: 80px;
}

.base .search-user .search-book hr {
  border: 8px solid #65f178;
  border-radius: 5px;
}

.base .search-user .search-book h5 {
  display: inline-block;
}

.base .search-user .search-book .book-name {
  width: 500px;
  border: 2px solid #65f178;
  border-radius: 4px;
  height: 50px;
  padding: 13px;
}

.base .search-user .search-book .book-name:hover {
  border: 2px solid #84839c;
}

.base .search-user .search-book button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.base .search-user .search-book button:hover {
  background-color: #217e26;
  -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.base .search-user .table-search {
  margin-top: 100px;
  padding-left: 80px;
  padding-right: 80px;
  height: 300px;
  overflow-y: scroll;
}

.base .profile {
  margin-top: 100px;
  padding-left: 80px;
  padding-right: 80px;
}

.base .profile .information h5 {
  display: inline-block;
}

.base .profile .information button {
  border-radius: 15px;
  background-color: #4c93af;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.base .profile .information button:hover {
  background-color: #215c7e;
  -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.base .profile .information .my-loan {
  height: 300px;
  overflow-y: scroll;
}

.base .profile .information .my-loan ::-webkit-scrollbar-thumb {
  background-color: #007bfe;
}

.base .profile .log-sign .wrapper-1 {
  margin-top: 80px;
  margin-bottom: 80px;
}

.base .profile .log-sign .form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.base .profile .log-sign .form-signin .form-signin-heading,
.base .profile .log-sign .form-signin .checkbox {
  margin-bottom: 30px;
}

.base .profile .log-sign .form-signin .checkbox {
  font-weight: normal;
}

.base .profile .log-sign .form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
}

.base .profile .log-sign .form-signin .form-control:focus {
  z-index: 2;
}

.base .profile .log-sign .form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.base .profile .log-sign .form-signin input[type="password"] {
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.base .profile .log-sign .wrapper-2 {
  margin-top: 80px;
  margin-bottom: 80px;
}

.base .profile .log-sign .form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.base .profile .log-sign .form-signin .form-signin-heading,
.base .profile .log-sign .form-signin .checkbox {
  margin-bottom: 30px;
}

.base .profile .log-sign .form-signin .checkbox {
  font-weight: normal;
}

.base .profile .log-sign .form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
}

.base .profile .log-sign .form-signin .form-control:focus {
  z-index: 2;
}

.base .profile .log-sign .form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.base .profile .log-sign .form-signin input[type="password"] {
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/*# sourceMappingURL=base.css.map */
</style>