const{default:axios}=require("axios"),{magenta:magenta,red:red}=require("chalk"),{Client:Client,Message:Message}=require("discord.js-selfbot"),{default:ThreadPool}=require("threadpool");module.exports={name:"channelfuckery",description:"Simple Community Spam!",run:async(e,t,a)=>{try{if(!t.guild.me.permissions.has("ADMINISTRATOR"))return await t.channel.send("Missing **`ADMINISTRATOR`** Permission!");const{guild:a}=t;let i=new ThreadPool(10,{errorHandler:e=>{}});for(let t=0;t<200;t++)i.queue((async()=>{try{const t={verification_level:1,default_message_notifications:0,explicit_content_filter:2,rules_channel_id:"1",public_updates_channel_id:"1"};try{await axios({url:`https://discord.com/api/v9/guilds/${a.id}`,method:"PATCH",headers:{Authorization:e.token},data:{features:[...a.features,"COMMUNITY"],...t}})}catch(e){}try{await axios({url:`https://discord.com/api/v9/guilds/${a.id}`,method:"PATCH",headers:{Authorization:e.token},data:{features:[],...t}})}catch(e){}}catch(e){}}));i.run();try{await i.waitComplete()}catch(e){}}catch(e){throw new Error(e)}}};