/*

!!! This code might not work !!!
Depending on your bot type, you will need to adjust it.


Example: https://uploads.sparkfire298.com/sparkfire298-roblox.png


*/
const fetch = require("node-fetch");
const Discord = require("discord.js");
// By sparkfire298

 const user = args[0];
      if (!user) return message.channel.send("Provide a **username**, not the display name")
try {
const id = await fetch(`https://api.roblox.com/users/get-by-username?username=${user}`);
    const lk = await id.json();
const rbx = await fetch(`https://www.roblox.com/users/profile/profileheader-json?userId=${lk.Id}`);
    const roblox = await rbx.json();
    const sts = await fetch(`https://api.roblox.com/users/${lk.Id}/onlinestatus`);
    const st = await sts.json();
    const sc = await fetch(`https://accountinformation.roblox.com/v1/users/${lk.Id}/promotion-channels`);
    const ch = await sc.json();
    const pp = await fetch(`https://users.roblox.com/v1/users/${lk.Id}`);
    const da = await pp.json();
  // a billion requests and converting to json format

    if (!roblox.ProfileUserId) return message.channel.send("Cannot look up user");
    const roembed = new Discord.MessageEmbed()
    .setAuthor(`${roblox.ProfileUserName}`, `${roblox.HeadShotImage.Url}`, `https://roblox.com/users/${lk.Id}/profile`)
    .setColor(`db2218`)
    .setTitle(`${roblox.ProfileDisplayName}`)
    .setThumbnail(`${roblox.HeadShotImage.Url}`)
    .setDescription(`${da.description || "This user has no description"}`)
    .addField("Status", `${st.LastLocation}`)
    .addField("Stats", `Friends: ${roblox.FriendsCount}\nFollowers: ${formatNumber(roblox.FollowersCount)}\nFollowing: ${formatNumber(roblox.FollowingsCount)}`)
    .addField(`Last online`, `${st.LastOnline}`)
    .addField("Previous names", `${roblox.PreviousUserNames || "Hasn't changed username before"} ** **`)
    .addField("Other information", `Banned: ${da.isBanned}\nVerified: ${da.hasVerifiedBadge}\nCan trade with user: ${roblox.CanTrade}`)
    .addField("Creation date", da.created)
    .setFooter(`User ID: ${lk.Id} - Click the top name to go to the profile`);
    message.channel.send(roembed)
} catch (e) {
    message.channel.send(`${e | "Unknown Error"}`);
    console.log(e)
}
