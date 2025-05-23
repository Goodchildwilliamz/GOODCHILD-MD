"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
qconst { ezra } = require("../goodchild/williamz");

ezra({ nomCom: "channel", reaction: "💐", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Salut je m\'appelle *GOODCHILD-MD* \n\n ' + 'je suis un bot Whatsapp Multi-appareil voici la chaîne';
    let d = ' developpé par *frediezra255*';
    let varmess = z + d;
    var lien = 'https://whatsapp.com/255763755563';  // Remplacez cet URL par le lien que vous souhaitez envoyer
    await zk.sendMessage(dest, { text: varmess + "\n" + lien });
});

console.log("mon test");

});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *LUCKY-MD* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *Fredi*'
      let varmess=z+d
      var img='https://files.catbox.moe/ex1ytd.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
