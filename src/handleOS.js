import { EOL, cpus as getCpus, homedir, userInfo, arch } from "os";

export function handleOSCommands(args) {
  switch (args[0]) {
    case "--EOL":
      console.log(`EOL: ${JSON.stringify(EOL)}`);
      break;
    case "--cpus":
      const cpuInfo = getCpus(); // Renamed cpus to cpuInfo
      console.log(`Total CPUs: ${cpuInfo.length}`);
      cpuInfo.forEach((cpu, index) => {
        console.log(
          `CPU ${index + 1}: Model - ${cpu.model}, Speed - ${
            cpu.speed / 1000
          } GHz`
        );
      });
      break;
    case "--homedir":
      console.log(`Home Directory: ${homedir()}`);
      break;
    case "--username":
      console.log(`Current User Name: ${userInfo().username}`);
      break;
    case "--architecture":
      console.log(`Architecture: ${arch()}`);
      break;
    default:
      handleUnknownCommand();
      break;
  }
}
