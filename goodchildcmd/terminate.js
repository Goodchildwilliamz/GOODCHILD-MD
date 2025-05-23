const { ezra } = require('../fredi/ezra');
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("../goodchilddatabase/banUser");
const { isGroupBanned, addGroupToBanList, removeGroupFromBanList } = require("../goodchilddatabase/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("../goodchilddatabase/onlyAdmin");
const { removeSudoNumber, addSudoNumber, issudo } = require("../goodchilddatabase/sudo");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

ezra({
  nomCom: "terminate",
  aliases: ["crash", "kill", "destroy", "paralyze"], 
  categorie: 'new',
  reaction: "📣"
}, async (dest, zk, commandeOptions) => {
  const { auteurMessage, ms, repondre, verifGroupe, infosGroupe, superUser } = commandeOptions;

  if (!verifGroupe) {
    repondre("✋🏿 ✋🏿this command is reserved for groups ❌");
    return;
  }

  const metadata = await zk.groupMetadata(dest);

  if (superUser || auteurMessage === metadata.owner) {
    repondre('*terminate command has been initialized and ready to kick some asses😀🤦*.');
    await zk.sendMessage(dest, {
      text: `\`\`\`Goodbye Group Admins 👋!\`\`\``,
    });
    await sleep(5000);

    try {
      const membresGroupe = verifGroupe ? await infosGroupe.participants : "";

      // Update group settings before removing members
      await zk.groupToggleEphemeral(dest, 86400);
      await zk.groupSettingUpdate(dest, "announcement");
      await zk.groupUpdateSubject(dest, "CRASHED BY  GOODCHILD MD  [williamz]");
      await zk.groupUpdateDescription(dest, "Crasher  by goodchild md");
      await zk.groupRevokeInvite(dest);

      // Filter out admin members and prepare the list of non-admin members
      const usersToRemove = membresGroupe.filter((member) => !member.admin);

      // Send a message notifying about the termination process
      await zk.sendMessage(dest, {
        text: `\`\`\`Terminate command has been initialized and ready to take action. GOODCHILD-MD will now kick ${usersToRemove.length} group members in a blink.\n\nGoodbye pals.\n\nThis process cannot be undone at this point!\`\`\``,
        mentions: usersToRemove.map((participant) => participant.id),
      }, {
        quoted: ms,
      });

      // Remove all non-admin members at once
      await zk.groupParticipantsUpdate(dest, usersToRemove.map((membre) => membre.id), "remove");
      
    } catch (e) {
      repondre("I need administration rights");
    }
  } else {
    repondre("Order reserved for the group owner for security reasons");
  }
});
