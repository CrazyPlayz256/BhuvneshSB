const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "setstatus",
  description: "Sets Status Specified!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: true }));
      const status = args[0]?.toLowerCase();

      const { prefix } = client;

      const list = ["online", "invisble", "dnd", "idle"];

      if (!status || list.includes(status)) {
        embed.setDescription(`No Status Specified!\n__**Example**__:\n**\`${prefix}setstatus [invisible/dnd/idle]\`**`);
      }
      if (!list.includes(status)) {
        embed.setDescription(`Invalid Status Specified!\n__**Example**__:\n**\`${prefix}setstatus [invisible/dnd/idle]\`**`);
      }

      client.user.setStatus(status);
      client.user.setActivity(null);

      embed.setDescription(`Status now **\`${status}\`**`);
      await send(message, embed, client);
    } catch (err) {
      throw new Error(err);
    }
  },
};