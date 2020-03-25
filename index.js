const discord = require("discord.js")
const botConfig = require("./botconfig.json")

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("no files found..");
        return;
    }

    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is loaded!`);

        bot.commands.set(fileGet.help.name, fileGet);
    })
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("EncryptedWeb.site", {type: "WATCHING"})
});

bot.on("message", async message => {

    if (message.author.bot) return;
    	//checks if message is an dm
	if (message.channel.type === "dm") return message.channel.send("DM commands are not Enabled!");
	//set the prefix
    let prefix = botConfig.prefix;

   //splits the prefix from the command    
   var messageArray = message.content.split(" ");

   //if there is no prefix in the message, just ignore it
       var command = messageArray[0];
       if (!command.includes(prefix)) return;
   
   //Check for arguments (args[0] = first arg)
       var arguments = messageArray.slice(1);
   
   //check prefix lenght
       var commands = bot.commands.get(command.slice(prefix.length));
       if (commands) commands.run(bot, message, arguments);
    
   });
   

bot.login(botConfig.token)