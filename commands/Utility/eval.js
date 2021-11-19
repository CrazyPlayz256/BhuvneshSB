const { Client, Message, MessageEmbed } = require("discord.js-selfbot");
const { send } = require("../../Utility/functions");

module.exports = {
  name: "eval",
  description: "The Most Powerfull Thing!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    try {
      const embed = new MessageEmbed().setColor(client.color).setFooter(`Made by ${client.owner.tag}`, client.owner.displayAvatarURL({ dynamic: true }));

      const content = message.content.split(" ").slice(1).join(" ");
      const result = new Promise((resolve) => resolve(eval(content)));
      return result
        .then(async (output) => {
          if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
          }
          if (output.includes(client.token)) {
            output = output.replace(client.token, "");
          }
          embed.setTitle(`COMPILED CODE RESULT`).setDescription(`\`\`\`js\n${output}\n\`\`\``);
          await send(message, embed, client);
        })
        .catch(async (err) => {
          err = err.toString();
          if (err.includes(client.token)) {
            err = err.replace(client.token, "");
          }
          embed.setTitle(`ERROR WHILE COMPILING`).setDescription(`\`\`\`js\n${err}\n\`\`\``);

          await send(message, embed, client);
        });

      // await send(message, embed);
    } catch (err) {
      throw new Error(err);
    }
  },
};
