const parrot=require('node-parrot-drone');
const drone=new parrot.Wifi;

drone.connect();

function turnRight() {
  console.log("turnRight()");

}

function turnLeft() {
  console.log("turnLeft()");
}

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

drone.on(
  'connected',
  function(){
    console.log('CONNECTED\n\n')

    setInterval(function(){
      forward();
      //backward();
    }, 1000);

    const project=drone.projects.jpsumo;
    const commandClass=project.Piloting;

    //change the value of the args you want to change if applicable
    commandClass.Posture.type.value=1;

    console.log(commandClass.info);

    //build a message requesting all settings
    const MoveMessage=drone.message.build(
      project.info.id,
      commandClass.info.id,
      commandClass.Posture
    );
    drone.message.send(MoveMessage);
/*
    setInterval(
      flip,
      1000
    );
    */
  }
);

function move(){
  const project=drone.projects.jpsumo;
  const commandClass=project.Piloting;

  //change the value of the args you want to change if applicable
  commandClass.PCMD.flag.value=1;
  commandClass.PCMD.speed.value=-100;
  commandClass.PCMD.turn.value=0;

  //build a message requesting all settings
  const MoveMessage=drone.message.build(
    project.info.id,
    commandClass.info.id,
    commandClass.PCMD
  );
  drone.message.send(MoveMessage);
}

function flip(){
  const project=drone.projects.jpsumo;
  const commandClass=project.Piloting;

  //change the value of the args you want to change if applicable
  commandClass.Posture.type.value=Math.round(
    Math.random()*3
  );

  //build a message requesting all settings
  const MoveMessage=drone.message.build(
    project.info.id,
    commandClass.info.id,
    commandClass.Posture
  );
  drone.message.send(MoveMessage);
}

drone.on(
  'SpeedChanged',
  function(data){
    console.log(data)
  }
);
