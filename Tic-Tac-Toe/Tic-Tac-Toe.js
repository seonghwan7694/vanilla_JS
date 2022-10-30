let res, cnt = 0;
let flag = 1;

function judging_winner(){
  
  if(++cnt == 9){
    document.getElementById('print').innerHTML = 'Match Tie';
    setTimeout(function(){
      window.alert("Match Tie");
    }, 100);
  }

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      for(let k = 0; k < 4; k++){
        DFS(i, j, 0, k);
      }
      if(res === 'O'){
        document.getElementById('print').innerHTML = 'Player O won';
        setTimeout(function(){
          window.alert("Player O won");
        }, 100);
        return;
      }else if(res === 'X'){
        document.getElementById('print').innerHTML = 'Player X won';
        setTimeout(function(){
          window.alert("Player X won");
        }, 100);
        return;
      }
    }
  }
}

let dx = [-1, 1, 0, 0];
let dy = [0, 0, 1, -1];
let board = [
  ["b1", "b2", "b3"],
  ["b4", "b5", "b6"],
  ["b7", "b8", "b9"]
];

function DFS(x, y, depth, k){
  if(depth == 2){
    res = document.getElementById(board[x][y]).value;
    return;
  }
  let nx = x + dx[k];
  let ny = y + dy[k];
  if(nx < 0 || nx >= 3 || ny < 0 || ny >= 3) return;
  if(document.getElementById(board[x][y]).value === document.getElementById(board[nx][ny]).value){
    DFS(nx, ny, depth + 1, k);
  }
}


let boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  box.addEventListener('click', function(){
    if(flag == 1){
      document.getElementById('print').innerHTML = "Player X turn";
      box.value = 'O';
      flag = 0;
    }
    else{
      document.getElementById('print').innerHTML = "Player O turn";
      box.value = 'X';
      flag = 1;
    }
    box.disabled = true;
    judging_winner();
  });
})

btn.addEventListener('click', function(){
  location.reload();
});

