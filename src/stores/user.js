import { defineStore }  from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'


export default defineStore('user',{
  state:()=>({
    userLoggedIn:false,
  }),
  actions:{
    async register(values){
      // 把原來在 registerForm 中 register try的部份移過來
      const userCred=await auth.createUserWithEmailAndPassword
      (values.email, values.password)

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        identity: values.identity
      })

      await userCred.user.updateProfile({
        displayName:values.name
      })

      this.userLoggedIn = true
    },
    async authenticate(values){
      console.log("authenticate:",values);
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.userLoggedIn=true
    },
    async signOut(){
      await auth.signOut()

      this.userLoggedIn=false
    }
  }
})