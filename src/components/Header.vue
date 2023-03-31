<template>
  <!-- Header -->
  <header
    id="header"
    class="bg-gray-700"
  >
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{name:'home'}"
        active-class="no-active"
      >Music
      </router-link>

      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">
          <!-- Primary Navigation -->
          <li>
            <router-link class="px-2 text-white" :to="{name:'about'}">About</router-link>
          </li>
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn" >
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthModal"
            >Login / Register</a>
          </li>
          <template v-else >
            <li >
              <router-link
              class="px-2 text-white"
              :to="{name:'manage'}"
              >Manage</router-link>
            </li>
            <li >
              <a
              class="px-2 text-white"
              href="#"
              @click.prevent="signOut"
              >Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'


export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore)
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
      console.log('toggle:',this.modalStore.isOpen)
      // console.log('use:', this.userStore.userLoggedIn)
    },
    signOut(){
      this.userStore.signOut()

      // console.log(this.$route);
      if(this.$route.meta.requireAuth){
        // 按登出鈕後即轉回首頁，不可待在原有權限管制的頁面
        this.$router.push({name:'home'})
      }
    }

  }
}
</script>
