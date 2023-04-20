// requires the .env config file, and assigns DISCORD_TOKEN to TOKEN constant. [$ npm install dotenv]
require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;

// requires the discord.js library. [$ npm install discord.js]
const { Client, IntentsBitField } = require('discord.js');

// creates a new client with intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// when client 'c' is ready, display a message to the console that the bot is live
client.on('ready', (c) => {
    console.log(`${c.user.tag} is live!`);
});

// listens to contents of a message sent in a Discord channel
client.on('messageCreate', (message) => {
    console.log(message.author + " says " + message.content); // logs the contents of the sent message

    // this ignores messages sent by the bot (returns a null value early), to avoid infinite loops. you could also use 'if(message.author.bot)' instead if you want to apply to all bots.
    if (message.author.id === client.user.id) return;

    // if the message contains 'Hello' or 'hello', reply with 'Sup
    if (message.content === 'hello') {
        message.reply('Sup');
    };

    if (message.content === 'holy hell') {
        message.reply('new response just dropped');
    };
});

// event listener. triggered when a slash command is run.
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // logs the name of the command that is triggered
    console.log("A /" + interaction.commandName + " command is triggered.");

    // if a '/hey' command is triggered, reply with 'Hey!'
    if (interaction.commandName === 'hey') {
        interaction.reply('Hey!');
    };

    // marco, polo
    if (interaction.commandName === 'marco') {
        interaction.reply('polo!');
    };
});

// runs the bot using the TOKEN constant
client.login(TOKEN)