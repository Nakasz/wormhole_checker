const readlineSync = require('readline-sync');
const axios = require('axios');

const rainbowColors = [
    '\x1b[31m', // Red
    '\x1b[33m', // Yellow
    '\x1b[32m', // Green
    '\x1b[36m', // Cyan
    '\x1b[34m', // Blue
    '\x1b[35m', // Magenta
];

const asciiArt = `
${rainbowColors[0]}                            .__           .__                  .__                   __                 
${rainbowColors[1]}__  _  _____________  _____ |  |__   ____ |  |   ____     ____ |  |__   ____   ____ |  | __ ___________ 
${rainbowColors[2]}\\ \\/ \\/ /  _ \\_  __ \\/     \\|  |  \\ /  _ \\|  | _/ __ \\  _/ ___\\|  |  \\_/ __ \\_/ ___\\|  |/ // __ \\_  __ \\
${rainbowColors[3]} \\     (  <_> )  | \\/  Y Y  \\   Y  (  <_> )  |_\\  ___/  \\  \\___|   Y  \\  ___/\\  \\___|    <\\  ___/|  | \\
${rainbowColors[4]}  \\/\\_/ \\____/|__|  |__|_|  /___|  /\\____/|____/\\___  >  \\___  >___|  /\\___  >\\___  >__|_ \\\\_\\___  >__|   
${rainbowColors[5]}                          \\/     \\/                 \\/     \\/     \\/     \\/    \\/       
                                                                                        ${rainbowColors[4]} x: @ins0mnia15
                                                                                        ${rainbowColors[5]} ${new Date().toLocaleDateString()}
`;


console.log(asciiArt);

// Chain IDs
const chains = {
    "EVM": 2,
    "Solana": 1,
    "Aptos": 22,
    "Terra": 3,
    "Osmosis": 20,
    "Injective": 19,
    "Sui": 21
};

async function fetchData(address, chainId) {
    try {

        const response = await axios.get(`https://prod-flat-files-min.wormhole.com/${address}_${chainId}.json`);

        return response.data;
    } catch (error) {

        throw new Error('Error fetching data:', error.message);
    }
}

const address = readlineSync.question('Enter the address: ');

const chainName = readlineSync.keyInSelect(Object.keys(chains), 'Select Chain ID:', { cancel: false });

if (chainName !== -1) {
    const selectedChain = Object.keys(chains)[chainName];
    const chainId = chains[selectedChain];

    fetchData(address, chainId)
        .then((data) => {
            
            console.log(data);
        })
        .catch((error) => {
            
            console.error(error);
        });
} else {
    console.log('Chain selection canceled.');
}
