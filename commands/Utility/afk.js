const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "afk",
  description: "Sets AFK!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: true }));

      if (args[0] === "off" || args[0] === "disable") {
        client.afk = { enabled: false, msg: undefined };
        embed.setDescription(`Disabled AFK Mode!`);
        return await send(message, embed, client);
      }

      const afkStatus = args.join(" ");

      client.afk = { enabled: true, msg: afkStatus };

      embed.setDescription(`AFK Mode Enabled! - **\`${afkStatus}\`**`);

      await send(message, embed, client);
    } catch (err) {
      throw new Error(err);
    }
  },
};
