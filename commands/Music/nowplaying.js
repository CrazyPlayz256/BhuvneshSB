const{Client:Client,Message:Message,MessageEmbed:MessageEmbed}=require("discord.js-selfbot"),{send:send}=require("../../Utility/functions"),{porgressBar:porgressBar}=require("music-progress-bar");module.exports={name:"nowplaying",description:"Shows Info of Now Playing Music!",run:async(e,r,s)=>{try{const s=(new MessageEmbed).setColor(e.color).setFooter(`Made by ${e.owner.tag}`,e.owner.displayAvatarURL({dynamic:!0})),{guild:t}=r,o=e=>{let r=Math.floor(e/1e3/60<<0),s=Math.floor(e/1e3%60);return`${r<10?`0${r}`:r}:${s<10?`0${s}`:s}`},i=e.manager.players.get(t.id);if(!i)return s.setDescription("Music Not Playing!"),await send(r,s,e);const n=i?.queue.current;if(!n)return s.setDescription("No Playing Track found!"),await send(r,s,e);const a=porgressBar({currentPositon:Math.round(i.position/n.duration*14),endPositon:14,width:14},{format:"<bar>"}).split("🔘");a[0]=`[${a[0]}](https://discord.gg/dMaeevHysw "Support Server!")`,s.setThumbnail(n.displayThumbnail()).setTitle("Now Playing!").setDescription(`[${n?.title.slice(0,44).concat("...")}](${n.uri})`).addField("Progess",a.join("🔘")).addField("Duration",`[${o(i.position)} / ${o(n.duration)}]`),await send(r,s,e)}catch(e){throw new Error(e)}}};