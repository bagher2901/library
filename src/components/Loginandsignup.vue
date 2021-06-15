<template>
    <div class="base">
        <div class="row log-sign">
            <div class="col">
                <div class="wrapper-1">
                    <form @submit.prevent="login()" class="form-signin">
                        <h3 class="form-signin-heading">وارد شوید</h3>

                        <input v-model="email_login" type="text" class="form-control" name="username"
                               placeholder="ایمیل"
                               required="" autofocus=""/>
                        <hr/>
                        <input v-model="password_login" type="password" class="form-control" name="password"
                               placeholder="رمز" required=""/>
                        <hr/>
                        <button class="btn btn-lg btn-primary btn-block" type="submit">
                            ورود
                        </button>
                        <p class="feedback" v-if="feedback">{{feedback}}</p>
                    </form>
                </div>
            </div>
            <div class="col">
                <div class="wrapper-2">
                    <form @submit.prevent="sign_up()" class="form-signin">
                        <h3 class="form-signin-heading">ثبت نام کنید</h3>
                        <input v-model="username_signUp" type="text" class="form-control" name="user-name"
                               placeholder="نام کاربری" required=""/>

                        <hr/>
                        <input v-model="password_signUp" type="password" class="form-control" name="password"
                               placeholder="رمز" required=""/>
                        <hr/>
                        <input v-model="email_signUp" type="text" class="form-control" name="username"
                               placeholder="ایمیل"
                               required="" autofocus=""/>
                        <hr/>
                        <input v-model="phone" type="tel" class="form-control" name="number" placeholder="تلفن"
                               required=""/>
                        <hr/>
                        <button class="btn btn-lg btn-primary btn-block" type="submit">
                            ثبت نام
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import db from "../firebase/init"
    import firebase from "firebase"

    export default {
        name: "Loginandsignup",
        data() {
            return {
                password_login: '',
                email_login: '',
                password_signUp: '',
                email_signUp: '',
                username_signUp: '',
                phone: '',
                feedback: null

            }
        },
        methods: {
            login() {
                firebase.auth().signInWithEmailAndPassword(
                    this.email_login, this.password_login
                ).then(cred => {
                    let user = firebase.auth().currentUser;
                    db.collection("users").get().then(snapshot => {
                        snapshot.forEach(doc => {
                            let userEmail = doc.data().email;
                            if (user.email === userEmail) {
                                localStorage.removeItem("user")
                                localStorage.setItem("user", JSON.stringify(doc.data()))
                                this.$router.push({name: 'Menu_library'}).then()
                            }
                        })
                    })

                }).catch(err => {
                    this.feedback = err.message
                    console.log(err)
                })

            },
            sign_up() {
                let ref = db.collection("users").doc(this.username_signUp)
                ref.get().then(doc => {
                        if (doc.exists) {
                            this.feedback = "این نام موجود است"
                        } else {
                            firebase.auth().createUserWithEmailAndPassword(this.email_signUp, this.password_signUp)
                                .then(cred => {
                                    ref.set({
                                        email: this.email_signUp,
                                        name: this.username_signUp,
                                        password: this.password_signUp,
                                        phone: this.phone,
                                        role: null,
                                        loanbooks: []
                                    }).then(() => {
                                        let user = {
                                            email: this.email_signUp,
                                            name: this.username_signUp,
                                            password: this.password_signUp,
                                            phone: this.phone,
                                            role: null,
                                            loanbooks: []
                                        }
                                        localStorage.setItem("user", JSON.stringify(user))
                                        this.$router.push({name: 'Menu_library'}).then()
                                    })
                                }).then(() => {
                                this.$router.push({name: 'Menu_library'}).then()
                            }).catch(err => {
                                console.log(err)
                            })

                        }
                    }
                )
            }

        },
        created() {
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

    .feedback {
        margin-top: 30px;
        background-color: #cc1d22;
        color: white;
        direction: ltr;
        text-align: justify;
        font-family: Arial;

    }

    .base {
        height: auto;
        width: 100%;
        text-align: right;
        direction: rtl;
        margin-bottom: 100px;
        position: relative;
    }

    .base .log-sign .wrapper-1 {
        margin-top: 80px;
        margin-bottom: 80px;
    }

    .base .log-sign .form-signin {
        max-width: 380px;
        padding: 15px 35px 45px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .base .log-sign .form-signin .form-signin-heading,
    .base .log-sign .form-signin .checkbox {
        margin-bottom: 30px;
    }

    .base .log-sign .form-signin .checkbox {
        font-weight: normal;
    }

    .base .log-sign .form-signin .form-control {
        position: relative;
        font-size: 16px;
        height: auto;
        padding: 10px;
    }

    .base .log-sign .form-signin .form-control:focus {
        z-index: 2;
    }

    .base .log-sign .form-signin input[type="text"] {
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .base .log-sign .form-signin input[type="password"] {
        margin-bottom: 20px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .base .log-sign .wrapper-2 {
        margin-top: 80px;
        margin-bottom: 80px;
    }

    .base .log-sign .form-signin {
        max-width: 380px;
        padding: 15px 35px 45px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .base .log-sign .form-signin .form-signin-heading,
    .base .log-sign .form-signin .checkbox {
        margin-bottom: 30px;
    }

    .base .log-sign .form-signin .checkbox {
        font-weight: normal;
    }

    .base .log-sign .form-signin .form-control {
        position: relative;
        font-size: 16px;
        height: auto;
        padding: 10px;
    }

    .base .log-sign .form-signin .form-control:focus {
        z-index: 2;
    }

    .base .log-sign .form-signin input[type="text"] {
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .base .log-sign .form-signin input[type="password"] {
        margin-bottom: 20px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    /*# sourceMappingURL=base.css.map */
</style>