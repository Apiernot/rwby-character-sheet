on('ready',()=>{

    // Remove capacity used
    const removeCap = (msg)=>{
        //sendChat('myFunc','myFunc was called by '+msg.who+' ('+msg.playerid+')');

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get capacity attribute
            var chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];

            let phialIDs = findObjs({
                type: 'attribute',
                characterid: character.id
            });

            phialIDs = _.filter(phialIDs, _phi => {
                const textToCheck1 = "repeating_phials";
                const textToCheck2 = "phiname";
                const textToCheck3 = "phicapboost";
                if(_phi.get('name').includes(textToCheck1) && (_phi.get('name').includes(textToCheck2) || _phi.get('name').includes(textToCheck3))) {
                    return true;
                }
                return false;
            });

            // Get the name of the used Dust in the chat
            const nameDust = msg.content.split('uses a ')[1].split(' Dust Phial')[0];

            // Get the id of the used Dust
            let phialSameName = _.filter(phialIDs, _phi => {
                if(_phi.get('current').includes(nameDust)) {
                    return true;
                }
                return false;
            });
            phialSameName = phialSameName[0].get('name').split('_phiname')[0];

            // Get cap boost attribute
            var chaCapBoost = findObjs({ type: 'attribute', characterid: character.id, name: phialSameName+'_phicapboost' })[0];
            var capBoost = parseInt(chaCapBoost.get('current'));

            // Set the new value
            var chaCapValue = chaCap.get('current') - 2 - capBoost;
            chaCap.set('current', chaCapValue);

            // Return cap boost to 0
            chaCapBoost.set('current', '0');

            // Verification
            // sendChat('System', 'new capacity calculed = @{'+msg.who+'|capacity}');

        }
    };

    // Check all messages
    on('chat:message',msg=>{

        // Look for this message
        const textToCheck = "Dust Phial";

        if(msg.content.includes(textToCheck)){
            try {
                removeCap(msg);
            }
            catch {
                sendChat('System', 'Une erreur est survenue');
            }
        }
    });
});