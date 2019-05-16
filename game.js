const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let gems = [];

const colors = {
  0: 'red',
  1: 'yellow',
  2: 'navy',
  3: 'aqua'
};

const game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet("gems", "assets/gems.png", {
        frameWidth: 100,
        frameHeight: 100
    });
}

function create ()
{
  for (var i=0; i<8; i++) {
    gems[i] = [];
    for (var j=0; j<8; j++) {
      gems[i][j] =
        {
          sprite: this.add.sprite(i*100+50, j*100-1000 , "gems"), // -1000 on initial y position so the gems slide in at start
          color: colors[Math.floor(Math.random()*4)],
          colorIndex: Math.floor(Math.random()*4) // remove when each gem has its own sprite/no longer using setframe
        };
      gems[i][j].sprite.setFrame(gems[i][j].colorIndex);
    }
  }
}

function update ()
{
  animateSprites();
}

function animateSprites() {
  for (var i=0; i<8; i++) {
    for (var j=0; j<8; j++) {
      let gem = gems[i][j];
      gem.sprite.x = Phaser.Math.Interpolation.Bezier([gem.sprite.x, i*100+50], .075);
      gem.sprite.y = Phaser.Math.Interpolation.Bezier([gem.sprite.y, j*100+50], .075);
    }
  }
}