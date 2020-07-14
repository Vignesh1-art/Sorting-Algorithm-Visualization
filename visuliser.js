var w=0;
var h=0;
var ctx;
var no_of_bars;
var rand_arr=[];
var rcolors=[];
var bar_height;
var bar_width=20;
var slp_time=20;
var flag=false;
window.onload=function initilize_canvas(){
var canvas= document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width=w = theDiv.clientWidth;
no_of_bars=Math.floor((w/this.bar_width)/2);
this.console.log(no_of_bars);
canvas.height=h = theDiv.clientHeight;
this.bar_height=h;
ctx. fillStyle = "hsl(36, 100%, 60%)";
ctx. fillRect(0, 0,w,h);
this.create_random_array();
rcolors=this.create_colors();
this.draw_bars();
}
function randomize(){
    if(flag==true)
    return;
    ctx. fillStyle = "hsl(36, 100%, 60%)";
    ctx. fillRect(0, 0,w,h);
    this.create_random_array();
    rcolors=this.create_colors();
    this.draw_bars(); 
}

function isInRange(value1,value2,range){
    if((value1+range)<value2 || (value1-range)>value2){
        return false;
    }
    return true;
}

function create_colors(){
var i;
var prev_hue=-1;
var col_arr=[];
for(i=0;i<no_of_bars;i++){
    var hue=Math.floor(Math.random() * 360);
    min=40;
    max=70;
    var sat=Math.floor(Math.random()*(max - min))+min;
    range=50;
    if(!(isInRange(36,hue,range)) && !(isInRange(prev_hue,hue,range))){ 
        prev_hue=hue;
        var col = "hsl("+hue+", 100%,"+sat+"%)";
        col_arr.push(col);        
    }
    else{
        i--;
    }  
}
return col_arr;
}
function refresh_canvas(){
    ctx. fillStyle = "hsl(36, 100%, 60%)";
    ctx. fillRect(0, 0,w,h);   
}

function create_random_array(){
    var array=[]; 
    var i;
    var rnd_num;
    for(i=0;i<no_of_bars;i++){
        array.push(i);
    }
    i=0; 
    var len=array.length;
    while(i<=len){
        rnd_num=Math.floor(Math.random()*array.length);
        rand_arr[i]=array[rnd_num];
        array.splice(rnd_num,1);
        i++;
    }
}

function draw_bars(){
    refresh_canvas();
    var position=0;

    var i=0;
    var y_pos;
    
    for(i=0;i<no_of_bars;i++){ 
        position=i*bar_width*2;
        y_pos=rand_arr[i]*10*1.5;
        ctx. fillStyle=rcolors[rand_arr[i]];
        ctx. fillRect(position,y_pos,bar_width,bar_height-y_pos);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
function pass_line(pos){
    var position=pos*bar_width*2;
    ctx.fillStyle="black";
    ctx.fillRect(position+7,0,5,h);
}



async function bubble_sort(){
    var i,j,t;
   flag=true;
    console.log("function start point");
    for(i=0;i<no_of_bars;i++){
        

        for(j=0;j<no_of_bars-i-1;j++){
            
            if(rand_arr[j]>rand_arr[j+1]){
                t=rand_arr[j+1];
                rand_arr[j+1]=rand_arr[j];
                rand_arr[j]=t;
                 draw_bars();
                 pass_line(j);
                 await sleep(slp_time);

            }

        }

    }
    draw_bars();
    flag=false;
}

async function selection_sort(){
    var i, j, min_idx,t;
    flag=true;
    for (i = 0; i < no_of_bars-1; i++)  
    {   
        min_idx = i;  
        for (j = i+1; j < no_of_bars; j++) { 
        if (rand_arr[j] < rand_arr[min_idx]){
            min_idx = j;   
        }
        draw_bars();
        pass_line(j);
        await sleep(slp_time);
    }
        t=rand_arr[min_idx];
        rand_arr[min_idx]=rand_arr[i];
        rand_arr[i]=t;
        draw_bars();


    } 
    flag=false; 
}
async function insertion_sort(){
    var i, key, j;  
    for (i = 1; i < no_of_bars; i++) 
    {  
        key = rand_arr[i];  
        j = i - 1;  
        while (j >= 0 && rand_arr[j] > key) 
        {  
            rand_arr[j + 1] = rand_arr[j];  
            j = j - 1;  
        draw_bars();
          pass_line(j);
           await sleep(slp_time);
        }  
        rand_arr[j + 1] = key;  
        draw_bars();
    }  
    
}

function select_sortalgo(){
   if( document.getElementById("algos").value=="bsort"){
       bubble_sort();
   }
   else if(document.getElementById("algos").value=="ssort"){
       selection_sort();
   }
   else if(document.getElementById("algos").value=="isort"){
    insertion_sort();
   }
   else{
       alert("This algorithm not yet added or error occured");
   }

}

