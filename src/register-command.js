require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CLIENT_ID = process.env.CLIENT_ID;

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

// an array of values for the '/color-mix' command
const primaryColors = [
    {
        name: 'red',
        value: 'red',
    },
    {
        name: 'green',
        value: 'green',
    },
    {
        name: 'blue',
        value: 'blue',
    },
]

// an array of objects. this will be the list of commands with their descriptions. add/remove commands here.
const commands = [
    {
        name: 'hey', // this will be the name of the command
        description: 'Replies with "Hey!"' // this will show up below the name of the command as a description
    },
    {
        name: 'marco',
        description: 'polo'
    },
    {
        name: 'add',
        description: 'Add two numbers.', 
        // options define the parameters that a user can/must provide
        options: [
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    },
    {
        name: 'color-mix',
        description: 'Mix two primary colors together.',
        options: [
            {
                name: 'first-color',
                description: 'The first color.',
                type: ApplicationCommandOptionType.String,
                choices: primaryColors, // choices define the available values that a user can choose from a list
                required: true,
            },
            {
                name: 'second-color',
                description: 'The second color.',
                type: ApplicationCommandOptionType.String,
                choices: primaryColors,
                required: true,
            },
        ]
    },
    {
        name: 'source',
        description: 'Embeds my Github repo.'
    }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

// function that registers the slash command
(async () => {
    try {
        console.log(`Registering ${commands.length} slash commands...`)

        await rest.put(
            Routes.applicationCommands(CLIENT_ID), // commands are global
            { body: commands }
        )
        console.log('Slash commands registered successfully!')

    } catch (error) {
        console.log(`An error occurred: ${error}`)
    }
})();