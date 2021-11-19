const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "avatar",
  description: "Shows Avatar of User",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: true }));

      const member = message.mentions.members.first() || message.guild.member(args[0]) || message.member;

      const av = member.user.displayAvatarURL({ dynamic: true });

      embed.setAuthor(member.user.tag, av);
      embed.setDescription(`**[Download](${av.concat("?size=4096")})**`);
      embed.setImage(av.concat("?size=4096"));

      await send(message, embed, client);
    } catch (err) {
      throw new Error(err);
    }
  },
};
