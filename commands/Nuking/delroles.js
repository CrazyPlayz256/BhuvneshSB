const { default: axios } = require("axios"),
  { Client: Client, Message: Message } = require("discord.js-selfbot");
module.exports = {
  name: "deldoles",
  description: "Deletes All Possible Roles!",
  run: async (e, l, t) => {
    try {
      const e = (await l.guild.roles.fetch()).filter((e) => e.deletable),
        t = () => {
          e.filter((e) => !e.deleted).map(async (e) => {
            !e.deleted && e.deletable && (await e.delete().catch(() => {}));
          });
        };
      for (let e = 0; e < 100; e++) t();
    } catch (e) {
      throw new Error(e);
    }
  },
};
