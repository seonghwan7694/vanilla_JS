let score = 0, best = 0;
let board = Array(4).fill(0).map(() => new Array(4).fill(0));
let board_ID = Array(
  Array("00", "01", "02", "03"),
  Array("10", "11", "12", "13"),
  Array("20", "21", "22", "23"),
  Array("30", "31", "32", "33")
);
let vec_score = Array();
document.onkeyup = keyUpEventHandler;
function keyUpEventHandler(e){
  switch(e.keyCode){
    case 38 : move_dir(0); break;
    case 40 : move_dir(1); break;
    case 37 : move_dir(2); break;
    case 39 : move_dir(3); break;
  }
  score = get_max();
  document.getElementById("SCORE_SCORE").innerHTML = '' + score;
  if(score > best){
    best = score;
  document.getElementById("BEST_SCORE").innerHTML = '' + best;
  }
}

function get_max(){
  let res = board[0][0];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(board[i][j] > res){
        res = board[i][j];
      }
    }
  }
  return res;
}
function board_init(){
  score = 0;
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      board[i][j] = 0;
    }
  }

  for(let i = 0; i < 2; i++){
    let rand = parseInt(Math.random()*16);
    let x = parseInt(rand/4);
    let y = rand % 4;
    if(board[x][y] == 0) board[x][y] = getNewNum();
    else i--;
  }
  update();
}

function update(){
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      let cell = document.getElementById(board_ID[i][j]);
      cell.innerHTML = (board[i][j] == 0 ? "" : board[i][j]);
      coloring(cell);
    }
  }
}

function coloring(cell){
  var cellNum = parseInt(cell.innerHTML);
  switch(cellNum){
    case 0:
    case 2:
      cell.style.color="#684A23";
      cell.style.background="#FBEDDC";
      break;
    case 4:
      cell.style.color="#684A23";
      cell.style.background="#F9E2C7";
      break;
    case 8:
      cell.style.color="#684A23";
      cell.style.background="#F6D5AB";
      break;
    case 16:
      cell.style.color="#684A23";
      cell.style.background="#F2C185";
      break;
    case 32:
      cell.style.color="#684A23";
      cell.style.background="#EFB46D";
      break;
    case 64:
      cell.style.color="#FFFFFF";
      cell.style.background="#EBA24A";
      break;
    case 128:
      cell.style.color="#FFFFFF";
      cell.style.background="#E78F24";
      break;
    case 256:
      cell.style.color="#FFFFFF";
      cell.style.background="#E87032";
      break;
    case 512:
      cell.style.color="#FFFFFF";
      cell.style.background="#E85532";
      break;
    case 1024:
      cell.style.color="#FFFFFF";
      cell.style.background="#E84532";
      break;
    case 2048:
      cell.style.color="#FFFFFF";
      cell.style.background="#E83232";
      break;
    default:
      if(cellNum>2048){
          cell.style.color="#FFFFFF";
          cell.style.background="#E51A1A";
      }
      else{
          cell.style.color="#684A23";
          cell.style.background="#FBEDDC";
      }
      break;
  }
}
function generate(){
  let zeroNum = 0;
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(board[i][j] == 0) zeroNum++;
    }
  }
  while(true){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(board[i][j] == 0){
          let rand = parseInt(Math.random()*zeroNum);
          if(rand==0){
            board[i][j] = getNewNum();
            return;
          }
        }
      }
    }
  }
}

function getNewNum(){
  let rand = parseInt(Math.random()*10);
  if(rand == 0) return 4;
  return 2;
}

function chk_game_over(){
  for(let i = 0; i < 4; i++){
    let colCheck = board[i][0];
    if(colCheck == 0) return;
    for(let j = 1; j < 4; j++){
      if(board[i][j] == colCheck || board[i][j] == 0) return;
      else colCheck = board[i][j];
    }
  }
  for(let i = 0; i < 4; i++){
    let rowCheck = board[0][i];
    if(rowCheck == 0) return;
    for(let j = 1; j < 4; j++){
      if(board[j][i] == rowCheck || board[j][i] == 0) return;
      else rowCheck = board[j][i];
    }
  }
  game_over();
}

function move_dir(opt){
  switch(opt){
    case 0: move(); break;
    case 1: rotate(2); move(); rotate(2); break;
    case 2: rotate(1); move(); rotate(3); break;
    case 3: rotate(3); move(); rotate(1); break;
  }
  update();
}

function rotate(n){
  while(n--){
    let temp_board = Array(4).fill(0).map(() => new Array(4).fill(0));
    for(let i = 0; i < 4; i++)
      for(let j = 0; j < 4; j++)
        temp_board[i][j] = board[i][j];
    for(let i = 0; i < 4; i++)
      for(let j = 0; j < 4; j++)
        board[j][3-i] = temp_board[i][j];
  }
}

function move(){
  let isMoved = false;
  let isPlused = Array(4).fill(0).map(() => new Array(4).fill(0));
  for(let i = 1; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(board[i][j] == 0) continue;
      let tempY = i - 1;
      while(tempY > 0 && board[tempY][j] == 0) tempY--;
      if(board[tempY][j] == 0){
        board[tempY][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      }else if(board[tempY][j] != board[i][j]){
        if(tempY + 1 == i) continue;
        board[tempY+1][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      }else{
        if(isPlused[tempY][j] == 0){
          board[tempY][j] *= 2;
          score += board[tempY][j];
          board[i][j] = 0;
          isPlused[tempY][j] = 1;
          isMoved = true;
        }else{
          board[tempY+1][j] = board[i][j];
          board[i][j]=0;
          isMoved=true;
        }
      }
    }
  }
  if(isMoved) generate();
  else chk_game_over();
}
function game_over(){
  window.alert("GAME OVER");
}

board_init();
document.getElementById('btn').addEventListener('click', board_init);