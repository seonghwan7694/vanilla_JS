var board = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
var tableID = Array(Array("00","01","02","03"),Array("10","11","12","13"),Array("20","21","22","23"),Array("30","31","32","33"));
var score;

// 게임 화면 초기화
init();
function init(){
  score=0;
  for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
        board[i][j]=0;
  for(var i=0;i<2;i++){
    var rand = parseInt(Math.random()*16);
    var y = parseInt(rand / 4);
    var x = rand % 4;
    if(board[y][x]==0) board[y][x]=getNewNum();
    else i--;
  }
  update();
}

function update() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      var cell = document.getElementById(tableID[i][j]);
      cell.innerHTML = board[i][j] == 0 ? "" : board[i][j];
      fill_cell(cell);
    }
  }
  document.getElementById("score").innerHTML = score;
}

// 키보드 입력 처리
document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e) {
  switch (e.keyCode) {
    case 38: // 위
      move_dir(0);
      break;
    case 40: // 아래
      move_dir(1);
      break;
    case 37: // 왼쪽
      move_dir(2);
      break;
    case 39: // 오른쪽
      move_dir(3);
      break;
  }
}

function fill_cell(cell) {
  var cellNum = parseInt(cell.innerHTML);
  switch (cellNum) {
    case 0:
    case 2:
      cell.style.color = "#684A23";
      cell.style.background = "#FBEDDC";
      break;
    case 4:
      cell.style.color = "#684A23";
      cell.style.background = "#F9E2C7";
      break;
    case 8:
      cell.style.color = "#684A23";
      cell.style.background = "#F6D5AB";
      break;
    case 16:
      cell.style.color = "#684A23";
      cell.style.background = "#F2C185";
      break;
    case 32:
      cell.style.color = "#684A23";
      cell.style.background = "#EFB46D";
      break;
    case 64:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#EBA24A";
      break;
    case 128:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E78F24";
      break;
    case 256:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E87032";
      break;
    case 512:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E85532";
      break;
    case 1024:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E84532";
      break;
    case 2048:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E83232";
      break;
    default:
      if (cellNum > 2048) {
        cell.style.color = "#FFFFFF";
        cell.style.background = "#E51A1A";
      } else {
        cell.style.color = "#684A23";
        cell.style.background = "#FBEDDC";
      }
      break;
  }
}

function move_dir(opt) {
  switch (opt) {
    case 0:
      move();
      break;
    case 1:
      rotate(2);
      move();
      rotate(2);
      break;
    case 2:
      rotate(1);
      move();
      rotate(3);
      break;
    case 3:
      rotate(3);
      move();
      rotate(1);
      break;
  }
  update();
}

function rotate(n) {
  while (n--) {
    var temp_board = Array(
      Array(0, 0, 0, 0),
      Array(0, 0, 0, 0),
      Array(0, 0, 0, 0),
      Array(0, 0, 0, 0)
    );
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        temp_board[i][j] = board[i][j];
      }
    }
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        board[j][3 - i] = temp_board[i][j];
      }
    }
  }
}

function move() {
  var is_moved = false;
  var is_plused = Array(
    Array(0, 0, 0, 0),
    Array(0, 0, 0, 0),
    Array(0, 0, 0, 0),
    Array(0, 0, 0, 0)
  );
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] == 0) continue;
      var temp_y = i - 1;
      while (temp_y > 0 && board[temp_y][j] == 0) temp_y--;
      if (board[temp_y][j] == 0) {
        board[temp_y][j] = board[i][j];
        board[i][j] = 0;
        is_moved = true;
      } else if (board[temp_y][j] != board[i][j]) {
        if (temp_y + 1 == i) continue;
        board[temp_y + 1][j] = board[i][j];
        board[i][j] = 0;
        is_moved = true;
      } else {
        if (is_plused[temp_y][j] == 0) {
          board[temp_y][j] *= 2;
          score += board[temp_y][j];
          board[i][j] = 0;
          is_plused[temp_y][j] = 1;
          is_moved = true;
        } else {
          board[temp_y][j] = board[i][j];
          board[i][j] = 0;
          is_moved = true;
        }
      }
    }
  }
  if (is_moved) generate_new_number();
  else check_game_over();
}

// 새로운 숫자 생성
function generate_new_number() {
  var zero_num = 0;
  for (var i = 0; i < 4; i++) { for (var j = 0; j < 4; j++) { if (board[i][j] == 0) zero_num++; } }

  while (true) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (board[i][j] == 0) {
          var rand = parseInt(Math.random() * zero_num);
          if (rand == 0) {
            board[i][j] = get_new_num();
            return;
          }
        }
      }
    }
  }
}

// 숫자 생성 확률
function get_new_num() {
  var rand = parseInt(Math.random() * 10);
  if (rand == 0) return 4;
  return 2;
}

// 최대 점수 얻기
function get_max_score() {
  var ret = 0;
  for (var i = 0; i < 4; i++) { for (var j = 0; j < 4; j++) { if (board[i][j] > ret) ret = board[i][j]; } }
  return ret;
}

// 게임 오버 체크
function check_game_over() {
  // 가로 체크
  for (var i = 0; i < 4; i++) {
    var col_value = board[i][0];
    if(col_value == 0) return;
    for (var j = 1; j < 4; j++) {
      if (board[i][j] == col_value || board[i][j] == 0) return;
      else col_value = board[i][j];
    }
  }

  // 세로 체크
  for (var i = 0; i < 4; i++) {
    var row_value = board[0][i];
    if (row_value == 0) return;
    for (var j = 1; j < 4; j++) {
      if (board[j][i] == row_value || board[j][i] == 0) return;
      else row_value = board[j][i];
    }
  }
  game_over();
}

// 게임 오버 처리
function game_over() {
  alert("게임오버");
  init();
}