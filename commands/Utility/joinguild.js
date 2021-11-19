const { default: axios } = require("axios");
const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "joinguild",
  description: "Joins The Server by Guild ID!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: true }));

      const { prefix } = client;

      const inviteCode = args[0];

      if (!inviteCode) {
        embed.setDescription(`A Invite Code Must Provided!\n\`\`\`${prefix}joinguild <InviteCode>\n${" ".repeat(prefix.length)}             ^^^^^^^^^^\`\`\``);
      }

      const req = await axios({ method: "POST", url: `https://discord.com/api/v9/invites/${inviteCode}`, headers: { Authorization: client.token } });

      if (req.status === 404) {
        embed.setDescription(`Invalid Invite Code!`);
      } else {
        embed.setTitle(`Joined Guild :white_check_mark:`);
        embed.setDescription(`Invite Code: \`${inviteCode}\``);
        embed.addField("Guild ID:", req.data.guild.id, true);
        embed.addField("Guild Name:", req.data.guild.name, true);
      }
      await send(message, embed, client);
    } catch (err) {
      throw new Error(err);
    }
  },
};