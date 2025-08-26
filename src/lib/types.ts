export type Mood = { 
    id: number;
    name: string 
};
export type Music = {
     id: number; 
     title: string; 
     artist: string;
     youtubeUrl?: string
 };

 export type MusicByMoodDTO = {
    moodId : number;
    moodName : string;
    musicId : number;
    musicTitle : string;
    musicArtist : string;
    musicUrl? : string;
 }