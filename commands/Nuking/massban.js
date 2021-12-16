const { Client: Client, Message: Message, MessageEmbed: MessageEmbed } = require("discord.js-selfbot"),
  { massban: massban, send: send } = require("../../Utility/functions"),
  { enableEmbed: enableEmbed } = require("../../config.json");
module.exports = {
  name: "massban",
  description: "Bans All Possible Members!",
  run: async (e, s, n) => {
    try {
      const n = new MessageEmbed().setColor(e.color).setFooter(`Made by ${e.owner.tag}`, e.owner.displayAvatarURL({ dynamic: !0 }));
      if (!s.guild.me.permissions.has("BAN_MEMBERS")) return await s.channel.send("Missing **`BAN_MEMBERS`** Permission!");
      const i = (await s.guild.members.fetch()).filter((e) => !0 === e.bannable);
      await massban(e, i).catch(() => {});
      n.setDescription(`Banning **${i.size}** With Full Speeeed!`);
      t.edit(enableEmbed && s.channel.permissionsFor(s.channel.guild.me).toArray().includes("EMBED_LINKS") ? n : n.description).catch(() => {});
    } catch (e) {
      throw new Error(e);
    }
  },
};
