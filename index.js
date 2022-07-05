var game_seq = [];
var user_seq = [];
var start = 0;
var lvl = 0;


$(document).on("keydown", function(){
    if(start == 0 ){
        generate_seq();
        start = 1;
    }
})


$("button").on("click", function(){
    var btn_no = this.textContent;
    user_seq.push(btn_no);
    animate_press(btn_no);

    check_ans(user_seq.length-1,btn_no);
})


function generate_seq(){
    lvl++;
    $("h1").text("Level "+lvl);
    user_seq = [];

    var x = Math.ceil(Math.random()*4);
    game_seq.push(x);

    sound(""+x);

    $(".d"+x).toggleClass("gen_press");
    setTimeout(function(){
        $(".d"+x).toggleClass("gen_press");
    },200)
}


function check_ans(c,y){
    if(game_seq[c] == user_seq[c]){
        sound(y);
        if(game_seq.length == user_seq.length){
            setTimeout(function(){
                generate_seq();
            },500) 
        }
    }
    else{
        sound(0); // 0 does not match so it plays the wrong sounds
        $("h1").text("Game Over");
        $("body").toggleClass("game-over");
        setTimeout(function(){
            $("body").toggleClass("game-over");
        },200)
        setTimeout(function(){
            $("h1").text("Press any key to restart");
            reset();
        },800)
    }
}


function animate_press(tc){
    $(".d"+tc).toggleClass("pressed");
    setTimeout(function(){
        $(".d"+tc).toggleClass("pressed");
    },100)
}

function reset(){
    game_seq = [];
    user_seq = [];
    start = 0;
    lvl = 0;
}

function sound(s){
    switch(s){
        case "1":var odo = new Audio("./sounds/green.mp3");odo.play();break;
        case "2":var odo = new Audio("./sounds/red.mp3");odo.play();break;
        case "3":var odo = new Audio("./sounds/yellow.mp3");odo.play();break;
        case "4":var odo = new Audio("./sounds/blue.mp3");odo.play();break;
        default :var odo = new Audio("./sounds/wrong.mp3");odo.play();break;
    }
}