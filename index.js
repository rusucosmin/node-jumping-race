const parrot=require('node-parrot-drone');
const keypress = require('keypress')
const drone=new parrot.Wifi;

///start keypress
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.name == 'up') {
    forward();
  } else if (key && key.name == 'down') {
    backward();
  } else if (key && key.name == 'right') {
    turnRight();
  } else if (key && key.name == 'left') {
    turnLeft();
  }
  if (key && key.ctrl && key.name == 'c') {
    process.exit();
  }
});

drone.connect();

function createPCMDMessage(project, commandClass) {
  return drone.message.build(
    project.info.id,
    commandClass.info.id,
    commandClass.PCMD
  );
}

function forward() {
  console.log("forward()");
  const project=drone.projects.jpsumo;
  const commandClass=project.Piloting;

  commandClass.PCMD.flag.value = 1;
  commandClass.PCMD.speed.value = 100;
  commandClass.PCMD.turn.value = 0;

  const PCMDMessage = createPCMDMessage(project, commandClass);
  drone.message.send(PCMDMessage);
}

function backward() {
  console.log("backward()");
  const project=drone.projects.jpsumo;
  const commandClass=project.Piloting;

  commandClass.PCMD.flag.value = 1;
  commandClass.PCMD.speed.value = -50;
  commandClass.PCMD.turn.value = 0;

  const PCMDMessage = createPCMDMessage(project, commandClass);
  drone.message.send(PCMDMessage);
}

function turnRight() {
  console.log("turnRight()");
  const project = drone.projects.jpsumo;
  const commandClass = project.Piloting;

  commandClass.PCMD.flag.value = 1;
  commandClass.PCMD.speed.value = 100;
  commandClass.PCMD.turn.value = 25;

  const msg = createPCMDMessage(project, commandClass);
  drone.message.send(msg);
}

function turnLeft() {
  console.log("turnLeft()");
  const project = drone.projects.jpsumo;
  const commandClass = project.Piloting;

  commandClass.PCMD.flag.value = 1;
  commandClass.PCMD.speed.value = 100;
  commandClass.PCMD.turn.value = -25;

  const msg = createPCMDMessage(project, commandClass);
  drone.message.send(msg);
}

drone.on(
  'connected',
  function(){
    console.log('CONNECTED\n\n')
  }
);
