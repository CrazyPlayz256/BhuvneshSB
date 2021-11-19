const { default: axios } = require("axios");
const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "checkinvite",
  description: "Shows Details of Invite Code!",
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
        embed.setDescription(`A Invite Code Must Provided!\n\`\`\`${prefix}checkinvite <InviteCode>\n${" ".repeat(prefix.length)}             ^^^^^^^^^^\`\`\``);
      }
      // try {
      const req = await axios({ method: "GET", url: `https://discord.com/api/v9/invites/${inviteCode}`, headers: { "Content-Type": "application/json" } });

      if (req.status === 404) {
        embed.setDescription(`Invalid Invite Code!`);
      } else {
        embed.setDescription(`Invite Code: \`${inviteCode}\``);
        embed.addField("Guild ID:", req.data.guild.id, true);
        embed.addField("Guild Name:", req.data.guild.name, true);
        embed.addField("Expires At:", req.data.expires_at ? `<t:${new Date(req.data.expires_at).getTime() / 1000}:f> (<t:${new Date(req.data.expires_at).getTime() / 1000}:R>)` : "Never");
        embed.addField("Join Guild:", `\`\`\`${prefix}joinguild ${inviteCode}\`\`\``);
      }

      await send(message, embed, client);
    } catch (err) {
      throw new Error(err);
    }
  },
};
