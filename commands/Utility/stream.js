const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "stream",
  description: "Sets Streaming Status!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: true }));

      client.user.setActivity(args[0] ? args.join(" ") : "Bhuvnesh Selfbot", { type: "STREAMING", url: "https://twitch.tv/#" });

      embed.setDescription(`Streaming **\`${args[0] ? args.join(" ") : "Bhuvnesh Selfbot"}\`**`);
      await send(message, embed, client);
    } catch (err) {
      throw new Error(err);
    }
  },
};