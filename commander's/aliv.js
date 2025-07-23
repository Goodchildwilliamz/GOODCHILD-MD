"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "test1", reaction: "😎", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*Hello* 👋 \n\n ' + "i'm a whatsapp bot multi-device created by Goodchild Tech";
    let d = '                                                                          ᴘᴏᴡᴇʀᴇᴅ ʙʏ GOODCHILD WILLIAMZ✨';
    let varmess = z + d;
    var mp4 ='https://files.catbox.moe/ifkhsp.jpg';
    await zk.sendMessage(dest, { video: { url: mp4 }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
