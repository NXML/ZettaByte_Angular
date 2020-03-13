import { Component } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PlayListExercise';

  playlists: Playlist[] = new PlaylistComponent().playlists;

  editing:boolean = false;
  adding:boolean = false;

  newPlaylist : Playlist ={
    name: "",
    totalDuration: 0,
    totalSongs: 0,
    description: "",
    songs : [],
  }
  newSong:Song= {
    title :"",
    duration:0,
    artist:""
  };


  countSong(playlist){
    return playlist.songs.length;
  }
  countDuration(playlist){
    var c = 0;
    playlist.songs.forEach((song : Song) => {
      c+=song.duration;
    });
    return c;
  }

  startAdding(){
    this.adding = true;
  }

  cancel(){
    this.editing=false;
    this.adding=false;
  }

  add(){
    this.newPlaylist.songs.push(this.newSong)
    this.newSong = {
      title :"",
      duration:0,
      artist:""
    };
  }


  deletePlaylist(i){
    this.playlists.splice(i,1)
  }

  deleteSong(i){
    this.newPlaylist.songs.splice(i,1)
  }

  editPlaylist(i){
    this.editing=true;
    this.newPlaylist = {...this.playlists[i]}

    
  }

  submit(){
    if(this.adding){
      this.playlists.push(this.newPlaylist);
    }if(this.editing){
      this.playlists.forEach(playlist => {
        if(playlist.name = this.newPlaylist.name){
          playlist = this.newPlaylist
        }
      });
    }
    this.newPlaylist={
      name: "",
      totalDuration: 0,
      totalSongs: 0,
      description: "",
      songs : [],
    }
    this.editing = false;
  }

  
  submitDisabled(){
    for (let i = 0; i < this.newPlaylist.songs.length; i++) {
      if(!(this.newPlaylist.songs[i].duration>0)){
      
        return true
      }
      if(this.newPlaylist.songs[i].artist.trim()=="")
        return true
        if(this.newPlaylist.songs[i].title.trim()=="")
        return true
    }
      if(this.newPlaylist.name.trim()==""){
     
        return true;
      }

      if(this.newPlaylist.description.trim()==""){
      
        return true;
      }
      return false
  }


}





///data
interface Playlist {
  name: string;
  totalDuration: number;
  totalSongs: number;
  description: string;
  songs: Song[];
}

 interface Song {
  title: string;
  artist: string;
  duration: number;
}

class PlaylistComponent {

  // use this data as the mock data for the app
  playlists: Playlist[] = [
    {
      name: 'Kopikustik',
      totalDuration: 5,
      totalSongs: 2,
      description: 'More than a coffee, this is all of your favorite accoustic songs.',
      songs: [
        {
          title: 'Cigarettes of ours',
          artist: 'Ardhito Pramono',
          duration: 3
        },
        {
          title: 'Walking Back Home',
          artist: 'Vira Talisa',
          duration: 2
        },
      ]
    },
    {
      name: 'Anime Hits',
      totalDuration: 13,
      totalSongs: 3,
      description: 'Listen to your favorite Anime songs, all in one playlist.',
      songs: [
        {
          title: 'Renai Circulation',
          artist: 'Kana Hanazawa',
          duration: 4
        },
        {
          title: 'Platinum Disco',
          artist: 'Tsukihi Phoenix',
          duration: 4
        },
        {
          title: 'Silhouette',
          artist: 'KANA-BOON',
          duration: 5
        },
      ]
    }
  ];
}


