const { Client: bhuvneshsb } = require("discord.js-selfbot");
const { token } = require("./config.json");
require("colors");
const fs = require("fs");
try {
  const bhuvsb = new bhuvneshsb();
  const handlers = fs.readdirSync("./handlers/");
  handlers.forEach((handler) => {
    require(`./handlers/${handler}`)(bhuvsb);
  });
  bhuvsb.login(process.env.TOKEN || token).catch((err) => console.log(`[×] Wrong Bot Token Provided.\n`.red, err));
} catch (err) {
  console.log("[ERROR], ", err);
}
