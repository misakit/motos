enchant();

var ARROW_TO_ANGLE_TABLE = {
  // 上下左右
  0x0001: 270,    // 下
  0x0002:   0,    // 右
  0x0004:  90,    // 上
  0x0008: 180,    // 左
  // 斜
  0x0006:  45,    // 右上
  0x0003: 315,    // 右下
  0x000c: 135,    // 左上
  0x0009: 225,    // 左下
};

// 移動速度
var SPEED = 2;

window.onload = function() {
  game = new Game(160, 160);
  game.fps = 20;
  game.preload('map0.png');
  game.onload = function() {
    map = new Map(16, 16);
    map.image = game.assets['map0.png'];
    map.loadData(
      [
        [9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 3, 3, 3, 3, 3, 3, 3, 9],
        [9, 3, 3, 3, 3, 3, 3, 3, 9],
        [9, 3, 3, 3, 3, 3, 3, 3, 9],
        [9, 3, 3, 3, 3, 3, 3, 3, 9],
        [9, 3, 3, 3, 3, 3, 3, 3, 9],
        [9, 3, 3, 3, 3, 3, 3, 3, 9],
        [9, 3, 3, 3, 3, 3, 3, 3, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9]
      ]
    );
    game.rootScene.addChild(map);
    var colMap = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    map.collisionData = colMap;

    player = new Sprite(8, 8);
    player.image = new Surface(8, 8);
    player.image.context.fillStyle = 'rgb(155, 187, 89)';
    player.image.context.fillRect(0, 0, 8, 8);
    player.x = 70;
    player.y = 70;
    game.rootScene.addChild(player);

    game.rootScene.addEventListener("enterframe", function(e){
      movePlayer();
    });
  };
  game.start();
};

function movePlayer() {
  var input = game.input;
  var arrowBit = (input.left << 3) | (input.up << 2) | (input.right << 1) | (input.down << 0);
  var angle = ARROW_TO_ANGLE_TABLE[ arrowBit ];
  if (angle !== undefined) {
    var vx = Math.cos(angle*Math.PI/180) * SPEED;
    var vy =-Math.sin(angle*Math.PI/180) * SPEED;
    player.moveBy(vx, vy);
    if (map.hitTest(player.x, player.y + 5) || map.hitTest(player.x + 3, player.y + 3)) {
      alert("OUT!");
    };
  };
};
