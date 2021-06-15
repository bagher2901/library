<template>
    <div id="app">

        <button v-on:click="log_out()" class="exit">خروج</button>

        <ul class="nav nav-tabs">
            <li @click="changePage('books')" class="nav-item">
                <a class="nav-link " v-bind:class="{ active: showPage==='books' }" aria-current="page">نمایش کتب</a>
            </li>
            <li @click="changePage('users')" class="nav-item">
                <a class="nav-link " v-bind:class="{ active: showPage==='users'}" aria-current="page">کاربران</a>
            </li>
            <li @click="changePage('add')" class="nav-item">
                <a class="nav-link" v-bind:class="{ active: showPage==='add' }">اضافه کردن</a>
            </li>
            <li @click="changePage('delete')" class="nav-item">
                <a class="nav-link" v-bind:class="{ active: showPage==='delete' }">حذف کردن</a>
            </li>


        </ul>


        <div v-show="showPage==='books'" class="box-books">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">شماره کتاب</th>
                    <th scope="col">نام کتاب</th>
                    <th scope="col">گروه</th>
                    <th scope="col">نام نویسنده</th>
                    <th scope="col">ویرایش</th>
                    <th scope="col">وضعیت</th>
                    <th scope="col">آدرس</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in books" v-bind::key="item.number_book">
                    <th scope="row">{{item.numberbook}}</th>
                    <td>{{item.namebook}}</td>
                    <td>{{item.groupbook}}</td>
                    <td>{{item.writer}}</td>
                    <td>{{item.edit}}</td>
                    <td>{{item.position}}</td>
                    <td>{{item.address}}</td>
                </tr>


                </tbody>
            </table>
        </div>
        <div v-show="showPage==='users'" class="box-books">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">نام کاربر</th>
                    <th scope="col">ایمیل</th>
                    <th scope="col">تللفن</th>

                </tr>
                </thead>
                <tbody>
                <tr v-bind:class="{admin_bgc:item.role==='admin'}" v-for="item in users">
                    <th scope="row">{{item.name}}</th>
                    <td>{{item.email}}</td>
                    <td>{{item.phone}}</td>


                </tr>


                </tbody>
            </table>

        </div>
        <div v-show="showPage==='add'" class="box-add">
            <div class="add-book">
                <form class="search">
                    <h5>نام کتاب:</h5>
                    <input type="text" v-model="bookname" class="book-name"/>
                    <hr/>
                    <h5>نام نویسنده:</h5>
                    <input type="text" v-model="writer" class="book-name"/>
                    <hr/>
                    <h5>گروه:</h5>
                    <input type="text" v-model="groupbook" class="book-name"/>
                    <hr/>
                    <h5>ویرایش:</h5>
                    <input type="text" v-model="edit" class="book-name"/>
                    <hr/>
                    <h5>آدرس</h5>
                    <input type="text" v-model="address" class="book-name"/>
                    <hr/>

                    <button v-on:click="add(bookname,writer,groupbook,edit,address)">اضافه</button>
                </form>

                <table style="margin-bottom: 50px" class="table">
                    <thead>
                    <tr>
                        <th scope="col">شماره کتاب</th>
                        <th scope="col">نام کتاب</th>
                        <th scope="col">گروه</th>
                        <th scope="col">نام نویسنده</th>
                        <th scope="col">ویرایش</th>
                        <th scope="col">وضعیت</th>
                        <th scope="col">آدرس</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in items">
                        <th scope="row">{{item.number_book}}</th>

                        <td>{{item.name_book}}</td>
                        <td>{{item.group}}</td>
                        <td>{{item.writer}}</td>
                        <td>{{item.edit}}</td>
                        <td>{{item.position}}</td>
                        <td>{{item.address}}</td>
                    </tr>


                    </tbody>
                </table>


            </div>
        </div>
        <div v-show="showPage==='delete'" class="box-delete">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">شماره کتاب</th>
                    <th scope="col">نام کتاب</th>
                    <th scope="col">گروه</th>
                    <th scope="col">نام نویسنده</th>
                    <th scope="col">ویرایش</th>
                    <th scope="col">وضعیت</th>
                    <th scope="col">آدرس</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for=" (item,index) in books" :key="item.id">
                    <th scope="row">{{item.numberbook}}</th>
                    <td>{{item.namebook}}</td>
                    <td>{{item.groupbook}}</td>
                    <td>{{item.writer}}</td>
                    <td>{{item.edit}}</td>
                    <td>{{item.position}}</td>
                    <td>{{item.address}}</td>
                    <td>
                        <button v-on:click="deleteing(item.id,index)" class="btn btn-danger">حذف</button>
                    </td>
                </tr>


                </tbody>
            </table>
        </div>


    </div>
</template>

<script>

    import db from "../firebase/init";
    import firebase from "firebase"


    export default {
        name: "Add_delete",
        data() {
            return {
                books: [],
                users: [],
                min: 111111,
                max: 999999,
                showPage: "books",
                items: [],
                click_group: false,
                bookname: '',
                writer: '',
                edit: '',
                address: '',
                groupbook: '',


                index_add: {
                    number_book: "",
                    name_book: "",
                    group: "",
                    writer: "",
                    edit: "",
                    position: "",
                    address: "",
                },


            }

        },
        methods: {
            log_out() {
                firebase.auth().signOut().then(() => {
                    localStorage.removeItem("user")

                    this.$router.push({name: 'Loginandsignup'}).then()
                    location.reload()
                }).catch(err => {
                    console.log(err)
                })

            },
            changePage(page) {
                this.showPage = page;
            },
            add(bookname, writer, groupbook, edit, address) {
                let random_number = Math.floor(Math.random() * (this.max - this.min + 1) + this.min)


                db.collection('books').add({
                    address: address,
                    edit: edit,
                    namebook: bookname,
                    numberbook: random_number,
                    position: 'موجود',
                    position_1: true,
                    writer: writer,
                    groupbook: groupbook
                }).then(() => {
                    this.index_add.name_book = bookname
                    this.index_add.writer = writer
                    this.index_add.group = groupbook
                    this.index_add.edit = edit
                    this.index_add.position = 'موجود'
                    this.index_add.address = address
                    this.index_add.number_book = random_number
                    this.items.push(this.index_add)
                    this.index_add = []
                }).catch(err => {
                    console.log(err)
                })


            },
            deleteing: function (id, index) {
                console.log(id)
                db.collection('books').doc(id).delete()

                    .then(() => {
                        this.books.splice(index, 1)
                    }).catch(err => {
                    console.log(err)
                })


            }

        },
        created() {
            db.collection("books").get().then(snapshot => {
                snapshot.forEach(doc => {
                    let book = doc.data()
                    book.id = doc.id
                    this.books.push(book)
                })
            }).catch(err => {
                console.log(err)
            })

            db.collection("users").get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.users.push(doc.data())
                })
                console.log(this.users)

            }).catch(err => {
                console.log(err)
            })

        }


    }
</script>

<style scoped>

    .admin_bgc {
        background-color: #31a7cc;
        color: black;
    }

    #app {
        direction: rtl;
        margin-left: 40px;
        margin-right: 40px;
        text-align: right;
        height: auto;
        overflow: hidden;
    }
    .exit {
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

    .exit:hover {
        background-color: #db2121;
        -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }


    .nav {
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .add-book {
        margin-top: 100px;
        padding-left: 80px;
        padding-right: 80px;
    }

    .add-book hr {
        border: 8px solid #65f178;
        border-radius: 5px;
    }

    .add-book h5 {
        display: inline-block;
    }

    .add-book .book-name {
        width: 500px;
        border: 2px solid #65f178;
        border-radius: 4px;
        height: 50px;
        padding: 13px;
    }

    .add-book .book-name:hover {
        border: 2px solid #84839c;
    }

    .add-book button {
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

    .add-book button:hover {
        background-color: #217e26;
        -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>