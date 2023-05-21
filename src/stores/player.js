import {defineStore} from "pinia"
import {Howl} from "howler"

export default defineStore("player",{
  state:()=>({
    current_song:{},
    sound:{},
  }),
  actions:{
    async newSong(song){
      this.current_song=song
      this.sound=new Howl({
        src:[song.url],
        html5:true,
      })
      // console.log(this.sound);
      this.sound.play()
    },
    async toggleAudio(){
      if(!this.sound.playing){
        // console.log('check playing:',!this.sound.playing);
        // console.log("no play");
        return
      }

      if(this.sound.playing()){
        this.sound.pause()
      }else{
        this.sound.play()
        // console.log('statePlaying:',state.sound);
      }
    },

  },
  getters:{
    playing:(state)=>{
      if(state.sound.playing){
        // console.log('statePlaying:',state.sound);
        // console.log('state:',state);
        return state.sound.playing()
      }
      return false
    }
  }
})