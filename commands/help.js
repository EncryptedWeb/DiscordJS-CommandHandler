const Discord = require('discord.js')
const Config = require('../botconfig.json')
const fs = require("fs");

exports.use = async (client, message, nothing, args, command) => {
    

    if (!args[0] || args[0] === '1') {
        let HelpEmbed = new Discord.RichEmbed()
            .setColor(RED)
            .setTitle(`help menu`)
            .setDescription(`basic commands`)
            .addField(`${Config.prefix}help`, "Shows this menu!")
            .addField(`${Config.prefix}kick`, "Kicks user, example: kick @EncryptedWeb#0123")
            .addField(`${Config.prefix}ban`, "Bans user, example: ban @EncryptedWeb#0123")
            .addField(`${Config.prefix}BugReport`, "Report a bug to the bot Developers.")
            .setFooter(Config.copyright)

        message.channel.send(HelpEmbed);
    };
}
module.exports.help = {
    name: 'help' 
  };
