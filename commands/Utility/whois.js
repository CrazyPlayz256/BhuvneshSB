const { default: axios } = require("axios");
const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "whois",
  description: "Shows Information About Member!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: true }));

      const user = args[0] ? message.mentions.members.first() || message.guild.member(args[0]) : message.member;

      if (!user) {
        embed.setDescription(`Unknown User - ${args[0]}`);
        return await send(message, embed, client);
      }

      const { id, joinedTimestamp, user: mUser, nickname, guild } = user;
      const { createdTimestamp, username } = mUser;
      const joinedTime = `<t:${Math.round(joinedTimestamp / 1000)}:f> (<t:${Math.round(joinedTimestamp / 1000)}:R>)`;
      const createdTime = `<t:${Math.round(createdTimestamp / 1000)}:f> (<t:${Math.round(createdTimestamp / 1000)}:R>)`;
      const icon = user.user.displayAvatarURL({ dynamic: true });

      const req = await axios({ method: "GET", url: `https://discord.com/api/v9/users/${user.id}`, headers: { Authorization: client.token } });
      const bannerCode = req.data.banner;
      let banner;
      if (bannerCode) {
        banner = `https://cdn.discordapp.com/banners/${user.id}/${bannerCode}${bannerCode.startsWith("a_") ? ".gif" : ".png"}?size=4096`;
      }

      const perms = {
        CREATE_INSTANT_INVITE: "Create Invite",
        KICK_MEMBERS: "Kick Members",
        BAN_MEMBERS: "Ban Members",
        ADMINISTRATOR: "Administrator",
        MANAGE_CHANNELS: "Manage Channels",
        MANAGE_GUILD: "Manage Guild",
        ADD_REACTIONS: "React Messages",
        VIEW_AUDIT_LOG: "Audit Access",
        MANAGE_MESSAGES: "Manage Messages",
        EMBED_LINKS: "Embeds Links",
        ATTACH_FILES: "Attach Files",
        MENTION_EVERYONE: "Mention Everyone",
        USE_EXTERNAL_EMOJIS: "External Emoji",
        CHANGE_NICKNAME: "Change Nick",
        MANAGE_NICKNAMES: "Manage Nick",
        MANAGE_ROLES: "Manage Roles",
        MANAGE_WEBHOOKS: "Manage Webhooks",
        MANAGE_EMOJIS: "Manage Emojis",
      };

      const userperms = user.permissions.toArray();

      const finalPerms = [];
      userperms.map((p) => {
        if (perms[p]) finalPerms.push(perms[p]);
      });

      const roles = user.roles;

      const rolesOrdered = roles.cache.sort((a, b) => a.rawPosition < b.rawPosition);

      embed.setAuthor(mUser.username, icon);
      embed.setThumbnail(icon);
      embed.addField("__General information__", `**Name:** ${username}\n**ID:** ${id}${nickname ? `\n**Nickname:** ${nickname}` : ""}\n**Account created:**\n${createdTime}\n**Server joined:**\n${joinedTime}`);
      embed.addField("__Permissions__", `${finalPerms.join(", ")}`);
      embed.addField("__Roles info__", `**Total Roles:** ${roles.cache.size}\n**Highest Role:** ${roles.highest.toString()}\n**Roles:**\n${rolesOrdered.size < 40 ? rolesOrdered.map((e) => e.toString()).join(", ") : "Too Many Roles To Mention!"}`);
      embed.setImage(banner);

      await send(message, embed, client);
    } catch (err) {
      throw new Error(err);
    }
  },
};
