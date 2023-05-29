<template>
  <main>
    <section class="mb-8 py-20 text-white text-center relative">
      <!-- Introduction -->
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis,
            congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        >
          <!-- v-icon 如單傳字串,注意雙引號內要再用單引號 -->
          <span class="card-title">Songs</span>
          <!-- Icon  用29行的 v-icon 取代-->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from '@/includes/firebase'
import AppSongItem from '@/components/SongItem.vue'
import IconSecondary from '@/directives/icon-secondary'

export default {
  name: 'Home',
  components: {
    AppSongItem
  },
  directives: {
    'icon-secondary': IconSecondary
  },
  data() {
    return {
      songs: [],
      maxPerPage: 10,
      paddingRequest: false
    }
  },
  async created() {
    this.getSongs()
    window.addEventListener('scroll', this.handleScroll)
  },
  // 離開前需unmount event listener 以釋出佔用的記憶體
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight
      if (bottomOfWindow) {
        // console.log('Bottom of window')
        this.getSongs()
      }
    },
    async getSongs() {
      // 避免multi request
      if (this.paddingRequest) {
        return
      }
      this.paddingRequest = true

      let snapshots

      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docID).get()

        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get()
      } else {
        snapshots = await songsCollection
          .orderBy('modified_name')
          // .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get()
      }
      // console.log(snapshots)

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data()
        })
      })
      this.paddingRequest = false
    }
  }
}
</script>
