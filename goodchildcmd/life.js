"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ezra } = require("../goodchild/williamza");
ezra({ nomCom: "altest", reaction: "💐", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '🅼🆈 🅽🅰🅼🅴 🅸🆂 *GOODCHILD WILLIAMZ* WILLIAMZ \n\n ' + "i'm a whatsapp bot created ";
    let d = ' by *ғʀᴇᴅɪᴇᴢʀᴀ255*';
    let varmess = z + d;
    var img = 'https://files.catbox.moe/ex1ytd.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="😁"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Hi my name is *GOODCHILD MD* \n\n '+' I'm a Whatsapp bot '
      let d =' developed by *frediezra255*'
      let varmess=z+d
      var img='https://files.catbox.moe/ex1ytd.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
