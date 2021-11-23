const { Client: Client } = require("discord.js-selfbot"),
  { Manager: Manager } = require("erela.js"),
  Spotify = require("erela.js-spotify"),
  Deezer = require("erela.js-deezer"),
  Filter = require("erela.js-filters"),
  Facebook = require("erela.js-facebook"),
  {
    music: {
      nodes: nodes,
      spotify: { enabled: spotifySupport, clientID: clientID, clientSecret: clientSecret },
    },
    stream: stream,
  } = require("../config.json");
module.exports = async (client) => {
  try {
    console.log(`[✔] Seflbot Ready as ${client.user.tag}`.green);
    client.owner = await client.users.fetch("537194359154671616");
    stream && (await client.user.setActivity("Bhuvnesh SelfBot", { name: "BhuvneshOP", type: "STREAMING", url: "https://www.twitch.tv/#" }));
    client.manager = new Manager({
      nodes: nodes,
      plugins: [new Deezer(), spotifySupport ? new Spotify({ clientID: clientID, clientSecret: clientSecret }) : new Facebook(), new Filter()],
      autoPlay: true,
      secure: false,
      send: (e, t) => {
        const n = client.guilds.cache.get(e);
        n && n.shard.send(t);
      },
    });
    client.manager.init(client.user.id);
    client.on("raw", (e) => client.manager.updateVoiceState(e));

    client.manager.on("nodeConnect", async (node) => {
      console.log(`[✔] Node Connected - [${node.options.identifier.cyan}${"]".green}`.green);
    });

    client.manager.on("nodeError", (node, error) => {
      console.log(`[NODE] "${node.options.identifier}" An ERROR Occured → ${error.message}`);
    });

    client.manager.on("playerMove", async (e, t, n) => {
      const i = await client.channels.fetch(n).catch(() => {});
      i &&
        ((e.voiceChannel = i?.id),
        setTimeout(() => {
          e.pause(!1);
        }, 2e3));
    });
  } catch (e) {
    console.log(`[ERROR] :`, e);
  }
};
