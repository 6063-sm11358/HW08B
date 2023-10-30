//variables initialization
let projectSound;
let totalDuration;
let currentTimeStamp = 0;

let albumArt;
let albumArtBG;
let albumArtMain;
let songFont;

let soundWaveForms;
let soundIndex = 0;
let vizRad_Highs;
let vizRad_Mids;
let vizRad_Lows;

let playButton;
let stopButton;
let musicSeek;

let vizChoice;
let vizChoice_Option;

//pre-loading sound, images, and font
function preload()
{
  projectSound = loadSound("./HW08B_Sound.mp3");
  albumArt = loadImage("./AlbumArt.jpg");
  albumArtBG = loadImage("./AlbumArt.jpg");
  albumArtMain = loadImage("./AlbumArt.jpg");
  songFont = loadFont("./BlackHan.ttf");
}

//creating class for buttons
class musicButtons
{
  constructor(_buttonName, _xPosButton, _yPosButton, _clickFunction)
  {
    this.button = createButton(_buttonName);
    this.button.position(_xPosButton, _yPosButton);
    this.button.style("width", width/30+"px");
    this.button.style("height", height/20+"px");
    this.button.style("border-radius","10px");
    this.button.mouseClicked(_clickFunction);
  }
  //function to change button label during play/pause
  changeButtonName(_newName)
  {
    this.button.html(_newName);
  }
}

function setup()
{
  frameRate(18);
  createCanvas(windowWidth, windowHeight);
  background(0);
  soundWaveForms = projectSound.getPeaks();

  //creating dynamic "seek bar" using DOM slider
  totalDuration = projectSound.duration();
  musicSeek = createSlider(0, totalDuration, 0, 1);
  musicSeek.position(width/3.05, height/1.125);
  musicSeek.style("width", width/3+"px");

  //initializing button classes
  playButton = new musicButtons("▶", width/2.2, height/1.07, playMusic);
  stopButton = new musicButtons("■", width/2, height/1.07, stopMusic);

  //creating radio buttons for toggling visualizations
  vizChoice = createRadio();
  vizChoice.position(width/1.2, height/1.085);
  vizChoice.style('font-family','sans-serif');
  vizChoice.style('color','white');
  vizChoice.option('Visuals','Visualization');
  vizChoice.option('AlbumArt','Album Art');
  vizChoice.selected('Visuals');
}

function draw()
{
  //detecting value from radio buttons
  vizChoice_Option = vizChoice.value();
  switch(vizChoice_Option)
  {
    case 'Visuals':
      if(projectSound.isPlaying())
      {
        fill(0);
        noStroke();
        rect(0,0,width,height);

        currentTimeStamp = projectSound.currentTime();
        musicSeek.value(currentTimeStamp);
        vizEffects();
      }
      else if(projectSound.isPaused())
      {
        currentTimeStamp = musicSeek.value();
      }
      else
      {
        playButton.changeButtonName("▶");
        currentTimeStamp = musicSeek.value();
        soundIndex=0;

        fill(0);
        noStroke();
        rect(0,0,width,height);

        fill(255);
        noStroke();
        textFont(songFont);
        textAlign(CENTER,CENTER);
        textSize(32);
        text("Press [ PLAY ] to Start", width/2, height/2.4);
      }
    break;
    
    //code for album art visualization
    case 'AlbumArt':
      
      //album art background graphic
      imageMode(CENTER);
      albumArtBG.resize(width,0);
      image(albumArtBG, width/2, height/2);
      filter(INVERT);

      fill(0,210);
      rect(0, 0, width, height);

      //album art active (front)
      imageMode(CENTER);
      albumArtMain.resize(400,400);
      image(albumArtMain, width/2, height/2.4);

      if(projectSound.isPlaying())
      {
        currentTimeStamp = projectSound.currentTime();
        musicSeek.value(currentTimeStamp);
      }
      else if(projectSound.isPaused())
      {
        currentTimeStamp = musicSeek.value();
      }
      else
      {
        playButton.changeButtonName("▶");
        currentTimeStamp = musicSeek.value();
      }
    break;
  }

  fill(0);
  stroke(255);
  strokeWeight(1);
  rect(-100, height-100, 2*width, height);

  //album art in bottom player
  imageMode(CORNER);
  albumArt.resize(75,75);
  image(albumArt, 10, height/1.135)

  //album details
  fill(200,0,0);
  noStroke();
  textFont(songFont);
  textAlign(CENTER,CENTER);
  textSize(20);
  text("G-RAW DUB", 155, height-73);
  fill(255);
  textSize(16);
  text("skrillex", 126, height-45);
  text("bangarang", 140, height-25);
  
  fill(255);
  textAlign(CENTER,CENTER);
  textFont("sans-serif");
  textSize(16);
  text("01:00", width/1.515, height/1.07);
  
  //dynamic timestamp generation for seek-bar
  if(floor(currentTimeStamp)<10)
  {
    text("00:0"+floor(currentTimeStamp), width/3, height/1.07);
  }
  else
  {
    if(floor(currentTimeStamp)>=60)
    {
      text("01:0"+(floor(currentTimeStamp)-60), width/3, height/1.07);
    }
    else
    {
      text("00:"+floor(currentTimeStamp), width/3, height/1.07); 
    }
  }
}

//custom function for generating effects & visuals
function vizEffects()
{
  //code for yellow-rectangle generation
  if((currentTimeStamp>=6.2 && currentTimeStamp<=7.5) || (currentTimeStamp>=12.2 && currentTimeStamp<=13.6) || (currentTimeStamp>=18.3 && currentTimeStamp<=19.6) || (currentTimeStamp>=24.5 && currentTimeStamp<=25.7) || (currentTimeStamp>=30.5 && currentTimeStamp<=31.7) || (currentTimeStamp>=36.8 && currentTimeStamp<=38.0) || (currentTimeStamp>=42.9 && currentTimeStamp<=44.0))
  {
    for(let i=0; i<25; i++)
    {
      let rect_trans = random(50,200);
      fill(255,255,0,rect_trans);
      noStroke();
      rect(random(0,width), random(0,height), random(0,100), random(0,100));
    }
    
    fill(0);
    noStroke();
    ellipse(width/2, height/2.5, 300);
  }

  //code for white ellipses generation
  if((currentTimeStamp>=20.0 && currentTimeStamp<=20.85))
  {
    for(let i=0; i<25; i++)
    {
      fill(255,(i+1)*10);
      noStroke();
      ellipse(random(0,width), random(0,height), 100);
    }

    fill(0);
    noStroke();
    ellipse(width/2, height/2.5, 200);
  }

  //code for red-green ellipses generation
  if((currentTimeStamp>=29.1 && currentTimeStamp<=30.6))
  {
    for(i=0; i<=20; i++)
    {
      fill(random(100,220),0,0,random(100,256));
      noStroke();
      ellipse(random(0,width), random(0,height), 50)
    }
    for(i=0; i<=20; i++)
    {
      fill(0,random(100,220),0,random(100,256));
      noStroke();
      ellipse(random(0,width), random(0,height), 50)
    }

    fill(0);
    noStroke();
    ellipse(width/2, height/2.5, 300);
  }

  //code for drop countdown generation
  if((currentTimeStamp>=45.9 && currentTimeStamp<=49.0))
  {
    fill(255);
    noStroke();
    textAlign(CENTER,CENTER);
    textFont(songFont);
    textSize(450);
    text("3", width/5, height/2.75);
    if((currentTimeStamp>=46.7 && currentTimeStamp<=49.0))
    {
      text("2", width/2, height/2.75);
    }
    if((currentTimeStamp>=47.5 && currentTimeStamp<=49.0))
    {
      text("1", width/1.25, height/2.75);
    }
  }

  //mapping getPeaks() result to mimic bass-line, mids & highs of audio
  vizRad_Highs = map(soundWaveForms[soundIndex], 0.2, 1, -height/3, height/3);
  vizRad_Mids = map(soundWaveForms[soundIndex], 0.05, 0.2, -height/5, height/5);
  vizRad_Lows = map(soundWaveForms[soundIndex], -1, 0.05, -height/10, height/10);

  if(currentTimeStamp>=49.1)
  {
    //generating getPeaks() visualizer post drop
    stroke(random(0,256), random(0,256), random(0,256), random(100,200));
    noFill();
    ellipse(width/2, height/2.5, 2*vizRad_Highs, 2*vizRad_Lows);
    ellipse(width/2, height/2.5, 2*vizRad_Highs, 2*vizRad_Mids);
  }

  noFill();
  strokeWeight(5);

  //generating getPeaks()-mapped ellipses for visualizer
  if(soundWaveForms[soundIndex]<=0.05)
  {
    stroke(random(100,256),0,0);
    ellipse(width/2, height/2.5, 2*vizRad_Lows);
  }
  else if(soundWaveForms[soundIndex]>0.05 && soundWaveForms[soundIndex]<=0.2)
  {
    stroke(0,0,random(100,256));
    ellipse(width/2, height/2.5, 2*vizRad_Mids);
  }
  else
  {
    stroke(0,random(100,256),0);
    ellipse(width/2, height/2.5, 2*vizRad_Highs);
  }
  
  soundIndex++;
}

//function to play audio
function playMusic()
{
  if(projectSound.isPlaying())
  {
    projectSound.pause();
    playButton.changeButtonName("▶");
  }
  else
  {
    projectSound.play();
    playButton.changeButtonName("▮▮");
  }
}

//function to stop audio
function stopMusic()
{
  projectSound.stop()
  playButton.changeButtonName("▶");
  soundIndex=0;
}