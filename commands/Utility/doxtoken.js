const { default: axios } = require("axios");
const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "doxtoken",
  description: "Get Information of given Token!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: !0 }));

      if (!args[0]) {
        embed.setDescription(`Bruhh...! Token is Missing!`);
        return await send(message, embed, client);
      }

      const token = args[0];

      let tried = false;
      const doxToken = async (tkn) => {
        try {
          const res = await axios({ url: `https://discord.com/api/v9/users/@me`, headers: { Authorization: tkn } });

          const d = res.data;

          return {
            rawData: {
              Name: `${d.username}#${d.discriminator}`,
              ID: d.id,
              Email: d.email || `N/A`,
              Phone: d.phone || `N/A`,
              "Bot?": d.bot ? "Yes" : "No",
              "Token Locked?": d.verified ? "No" : "Yes",
              Premium: d.premium_type === 1 ? "Nitro Classic" : d.premium_type === 2 ? "Nitro Booster" : "None",
              "2fa Enabled": d.mfa_enabled ? "Yes" : "No",
              "NSFW Allowed": d.nsfw_allowed ? "Yes" : "No",
            },
            bannerURL: d.banner ? `https://cdn.discordapp.com/banners/${d.id}/${d.banner}${d.banner.startsWith("a_") ? ".gif" : ".png"}?size=4096` : null,
            avatarURL: d.avatar ? `https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}${d.avatar.startsWith("a_") ? ".gif" : ".png"}?size=4096` : null,
          };
        } catch (err) {
          if (!tried) {
            tried = true;
            return await doxToken(`Bot ${tkn}`);
          } else {
            return err.toString();
          }
        }
      };

      const res = await doxToken(token);

      if (typeof res === "string") {
        embed.setDescription(`Invalid Token!`);
        return await send(message, embed, client);
      }

      embed.setTitle("Token DoXing");
      embed.setImage(res.bannerURL);
      embed.setThumbnail(res.avatarURL);

      let rawStringData = [];
      for (const i in res.rawData) {
        rawStringData.push(`**__${i}__**: ${res.rawData[i]}`);
      }

      rawStringData = rawStringData.join("\n");

      embed.setDescription(rawStringData);

      return await send(message, embed, client);
    } catch (e) {
      throw new Error(e);
    }
  },
};
