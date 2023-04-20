require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CLIENT_ID = process.env.CLIENT_ID;

const { REST, Routes } = require('discord.js');

// an array of objects. this will be the list of commands with their descriptions. add/remove commands here.
const commands = [
    {
        name: 'hey', // this will be the name of the command, eg. /hey
        description: 'Replies with "Hey!"' // this will show up below the name of the command as a description
    },
    {
        name: 'marco',
        description: 'polo'
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

// function that registers the slash command
(async () => {
    try {
        console.log('Registering slash commands...')

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        )
        console.log('Slash commands registered successfully!')

    } catch (error) {
        console.log(`An error occurred: ${error}`)
    }
})();