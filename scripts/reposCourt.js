on('ready',()=>{

    // Remove capacity used
    const removeAur = (msg)=>{
        //sendChat('myFunc','myFunc was called by '+msg.who+' ('+msg.playerid+')');

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get result of message
            var resultDice = parseInt(msg.inlinerolls[0].results.total);

            // Get aura attribute
            var chaAur = findObjs({ type: 'attribute', characterid: character.id, name: 'aura' })[0];
            var aur = parseInt(chaAur.get('current'));

            // Get aura max
            var auraMax = parseInt(chaAur.get('max'));

            // Calcul new aura
            var calcul = resultDice + aur;
            var newAura = (calcul > auraMax) ? auraMax : calcul;

            // Set the new value
            chaAur.set('current', newAura);

            // Get cap attribute
            var chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];
            var capMax = chaCap.get('max');

            // Set max cap
            chaCap.set('current', capMax);

            // Verification
            // sendChat('System', 'new aura calculed = @{'+msg.who+'|aura}');

        }
    };

    // Check all messages
    on('chat:message',msg=>{

        // Look for this message
        const textToCheck = "repos court";

        if (msg.content.includes(textToCheck)) {
            // sendChat(msg.who, 'Results was: '+msg.inlinerolls[0].expression);
            // sendChat(msg.who, 'Total was: '+msg.inlinerolls[0].results.total);
            removeAur(msg);
        }
    });
});