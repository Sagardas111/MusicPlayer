const songDb=[
{
			name:"audio-0",
			tittle:"Rise Up"	,
			artist:"TheFatRat",
			duration: 169 //in seconds
},{
			name:"audio-1",
			tittle:"In The End"	,
			artist:"Linkin Park",
			duration: 218
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
const grow=document.querySelector(".grow")
const songImg=document.querySelector('img');
const song=document.querySelector('audio');
const prevButton=document.getElementById('backward');
const playButton=document.getElementById("play");
const nextButton=document.getElementById('forward');
const curTime=document.querySelector('#current-time');
const totalTime=document.querySelector('#total-time');
const proBar=document.querySelector('#progress-bar');

const progress=document.querySelector('#progress');

let Playing=false;
let songCount=0;
let CurrentMins=0;
var updateTime;

/* function for starting the song */
const startSong=()=>{
				song.play();
				Playing=true;
playButton.classList.replace("fa-play","fa-pause");
				grow.style.display="flex";
				songImg.classList.add('rotate');			
};

/* ---function of stoping song */
const pauseSong=()=>{
				song.pause();
				Playing=false;
playButton.classList.replace("fa-pause","fa-play");
				grow.style.display="none";
				songImg.classList.remove('rotate');
				clearInterval(updateTime);
};

/* ----function of next/previous song----- */
const nextSongData=()=>{
   tittle.innerText=songDb[songCount].tittle;
  	artist.innerText=songDb[songCount].artist;
songImg.src="images/audio-"+songCount+".jpg";
		 song.src="audio/audio-"+songCount+".mp3";
		 if(songDb[songCount].duration%60<10){
		 		 totalTime.innerText= Math.trunc(songDb[songCount].duration/60)+":0"+songDb[songCount].duration%60;
		 }else{
		 			totalTime.innerText= Math.trunc(songDb[songCount].duration/60)+":"+songDb[songCount].duration%60;
		 };
};
nextSongData();

/*func of update cur-time and progress  */
song.addEventListener("timeupdate",function(song){
			var 	{currentTime} = song.srcElement;
   if(Math.floor(currentTime) ==songDb[songCount].duration) {
							songCount=(songCount+1)% songDb.length;
					 	nextSongData();
				 		startSong();
			}else {
							if(Math.floor(currentTime%60)<10){
				curTime.innerText=Math.trunc(currentTime/60)+":0"+Math.floor(currentTime%60);
		 	     progress.style.width=(currentTime/songDb[songCount].duration)*100+"%";	
							}else{
				curTime.innerText=Math.trunc(currentTime/60)+":"+Math.floor(currentTime%60);
			      progress.style.width=(currentTime/songDb[songCount].duration)*100+"%";	
							}
			}
});			

/* flexy song current time ontouch */
proBar.addEventListener("click",(event)=>{
				var touchTime=(event.offsetX/event.srcElement.clientWidth)*songDb[songCount].duration;
				song.currentTime=touchTime;
});

/* -----play button function call--------- */
playButton.addEventListener('click',function(){
				if(!Playing) {
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
