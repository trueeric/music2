import {defineStore} from "pinia"
import {Howl} from "howler"
import helper from "@/includes/helper"

export default defineStore("player",{
  state:()=>({
    current_song:{},
    sound:{},
    seek:"00:00",
    duration:"00:00",
    playProgress:"0%"
  }),
  actions:{
    async newSong(song){
      // 按一次只建一個播放實體，同曲同時僅能播一次。再按則把舊實體解除
      if(this.sound instanceof Howl){
        this.sound.unload()
      }

      this.current_song=song
      this.sound=new Howl({
        src:[song.url],
        html5:true,
      })
      // console.log(this.sound);
      this.sound.play()

      this.sound.on("play",()=>{
        requestAnimationFrame(this.progress)
      })
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
    progress(){
      this.seek=helper.formatTime(this.sound.seek())
      this.duration=helper.formatTime(this.sound.duration())

      this.playProgress=`${(this.sound.seek() / this.sound.duration()) * 100 }%`

      if(this.sound.playing()){
        requestAnimationFrame(this.progress)
      }
    },
    updateSeek(){
      // 確認有無播放
      if(!this.sound.playing){
        return
      }
      // 確認播放指標於進度條的位置,為免因像素不同(絕對位置)而進度指標與實際數值不符，改用進度distance(從左起相對位置)來算
      const { x, width } = event.currentTarget.getBoundingClientRect() // 播放相關物件的property 播放點離播放左邊界距離 X , 進度條長度 width

      // console.log(event.currentTarget.getBoundingClientRect());

      const clickX = event.clientX - x
      const percentage=clickX / width
      const seconds=this.sound.duration() * percentage

      this.sound.seek(seconds)
      this.sound.once("seek", this.progress)  // 會先𣊅停，放棄實體，重建實體，重抓播放新位置再播
    }

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