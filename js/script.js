const songDb=[
{
			name:"audio-0",
			tittle:"Rise Up"	,
			artist:"TheFatRat",
			duration: 170 //in seconds
},{
			name:"audio-1",
			tittle:"In The End"	,
			artist:"Linkin Park",
			duration: 219
},{
			name:"audio-2",
			tittle:"Memories"	,
			artist:"Maroon 5",
			duration: 187
},{
			name:"audio-3",
			tittle:"Cheap Thrills"	,
			artist:"Sia",
			duration: 215
},{
			name:"audio-4",
			tittle:"I Don't Wanna Live Forever"	,
			artist:"Zyan, Taylor Swift",
			duration: 247
}														
];
/* ---getting all elements----- */
const tittle=document.getElementById("tittle");
const artist=document.getElementById("artist");
const songImg=document.querySelector('img');
const song=document.querySelector('audio');
const prevButton=document.getElementById('backward');
const playButton=document.getElementById("play");
const nextButton=document.getElementById('forward');
const currentTime=document.querySelector('#current-time');
const totalTime=document.querySelector('#total-time');
const progress=document.querySelector('#progress');

let isPlaying=false;
let songCount=0;
let currentSecs=0;
let CurrentMins=0;
var updateTime;

/* ---function of starting song----------- */
const startSong=()=>{
				song.play();
				isPlaying=true;
playButton.classList.replace("fa-play","fa-pause");
				songImg.classList.add('rotate');
totalTime.innerText=Math.trunc(songDb[songCount].duration/60)+":"+songDb[songCount].duration%60;
				
				updateTime=	setInterval(function(){	
 if(currentSecs<=songDb[songCount].duration){
								progress.style.width=(currentSecs/songDb[songCount].duration)*100+"%";
currentTime.innerText=Math.trunc(currentSecs/60)+":"+currentSecs%60;
								}else {
								songCount=(songCount+1)% songDb.length;
								nextSongData();
					   startSong();
								}
				currentSecs++;
},1000);
};

/* ---function of stoping song */
const pauseSong=()=>{
				song.pause();
				isPlaying=false;
playButton.classList.replace("fa-pause","fa-play");
				songImg.classList.remove('rotate');
				clearInterval(updateTime);
};

/* ---function of next/previous song */
const nextSongData=()=>{
			currentSecs=0;
			clearInterval(updateTime);
			setInterval(updateTime,1000);

   tittle.innerText=songDb[songCount].tittle;
  	artist.innerText=songDb[songCount].artist;
songImg.src="images/audio-"+songCount+".jpg";
		 song.src="audio/audio-"+songCount+".mp3";
}
nextSongData();

/* -----play button function call--------- */
playButton.addEventListener('click',function(){
				if(!isPlaying) {
							startSong();					
				}else {
		 				pauseSong();				
				};
});
/* -----forward button function call------ */
nextButton.addEventListener('click',function(){
				songCount=(songCount+1)% songDb.length;
				nextSongData();
				startSong();
});
/* --backward button function call-------- */
prevButton.addEventListener('click',function(){
				songCount=(songDb.length+songCount-1)% songDb.length;
				nextSongData();
				startSong();
});
