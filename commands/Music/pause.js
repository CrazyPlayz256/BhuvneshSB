const{Client:Client,Message:Message,MessageEmbed:MessageEmbed}=require("discord.js-selfbot"),{send:send}=require("../../Utility/functions");module.exports={name:"pause",description:"Pauses The Player!",run:async(e,s,a)=>{try{const a=(new MessageEmbed).setColor(e.color).setFooter(`Made by ${e.owner.tag}`,e.owner.displayAvatarURL({dynamic:!0})),{guild:t}=s;let r=e.manager.players.get(t.id);if(!r)return a.setDescription("Music Not Playing!"),await send(s,a,e);r&&r.pause(!0),a.setDescription("Paused The Player!"),await send(s,a,e)}catch(e){throw new Error(e)}}};