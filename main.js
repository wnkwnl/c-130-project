creepy_music="";
pirate_pop="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scorerightWrist = 0;
scoreleftWrist = 0;
song_name = "";
creepy_music = "";
pirate_pop = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    creepy_music = loadSound("music2.mp3");
    pirate_pop = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_creepy_music = creepy_music.isPlaying();
    console.log(song_creepy_music);

    song_pirate_pop = pirate_pop.isPlaying();
    console.log(song_pirate_pop)

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        pirate_pop.stop();
        if(song_name == false){
            creepy_music.play();
        }
        else{
            console.log("Song Name:  Creepy Music");
            document.getElementById("song_id").innerHTML = "Song Name:Creepy Music ";
        }
    }
}
if(scorerightWrist > 0.2){
    circle(rightWrist_x,rightWrist_y,20);
    Peter_pan_song.stop();
    if(song_Harry_potter_theme == false){
        Harry_potter_theme_song.play();
    }
    else{
        console.log("Song Name: Harry Potter Theme Song");
        document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}