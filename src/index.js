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
    client.user.setPresence({ activities: [{ name: 'with test tubes' }], status: 'online' }); // sets the activity and status of the bot
});

// listens to contents of a message sent in a Discord channel
client.on('messageCreate', (message) => {
    console.log(message.author.tag + ' says "' + message.content + '".'); // logs the contents of the sent message

    // this ignores messages sent by the bot (returns a null value early), to avoid infinite loops. you could also use 'if(message.author.bot)' instead if you want to apply to all bots.
    if (message.author.id === client.user.id) return;

    // if the message is 'hello', reply with 'Sup!'
    if (message.content === 'hello') {
        message.reply('Sup!');
    };

    // if a message contains the phrase 'holy hell', reply with 'new response just dropped'
    if (message.content.includes('holy hell')) {
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

    // add two numbers
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value; // get the value of options
        const num2 = interaction.options.get('second-number').value;

        // add the two numbers together
        console.log(`inputs: ${num1}, ${num2}`);
        interaction.reply(`${num1} + ${num2} = ${num1 + num2}`);
    };

    // mixes two primary colors together
    if (interaction.commandName === 'color-mix') {
        const color1 = interaction.options.get('first-color').value;
        const color2 = interaction.options.get('second-color').value;
        let newColor = 'white';

        // this switch case determines the color result based on the two colors given by the user
        console.log(`inputs: ${color1}, ${color2}`);
        switch (color1) {
            case 'red':
                switch (color2) {
                    case 'red':
                        newColor = 'red';
                        break;
                    case 'green':
                        newColor = 'yellow';
                        break;
                    case 'blue':
                        newColor = 'purple';
                        break;
                }
                break;
            case 'green':
                switch (color2) {
                    case 'red':
                        newColor = 'yellow';
                        break;
                    case 'green':
                        newColor = 'green';
                        break;
                    case 'blue':
                        newColor = 'cyan';
                        break;
                }
                break;
            case 'blue':
                switch (color2) {
                    case 'red':
                        newColor = 'purple';
                        break;
                    case 'green':
                        newColor = 'cyan';
                        break;
                    case 'blue':
                        newColor = 'blue';
                        break;
                }
                break;
        }

        interaction.reply(`${color1} and ${color2} makes ${newColor}`);
    };
});

// runs the bot using the TOKEN constant
client.login(TOKEN)