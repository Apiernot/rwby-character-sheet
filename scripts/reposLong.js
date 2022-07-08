on('ready',()=>{

    // Remove capacity used
    const removeAur = (msg)=>{
        //sendChat('myFunc','myFunc was called by '+msg.who+' ('+msg.playerid+')');

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get aura attribute
            var chaAur = findObjs({ type: 'attribute', characterid: character.id, name: 'aura' })[0];

            // Get cap attribute
            var chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];

            // Get hp attribute
            var chaHp = findObjs({ type: 'attribute', characterid: character.id, name: 'health' })[0];

            // Get hp max and current
            var hpMax = parseInt(chaHp.get('max'));
            var hpCurrent = parseInt(chaHp.get('current'));

            // Calcul new hp
            var calcul = 1 + hpCurrent;
            var newHp = (calcul > hpMax) ? hpMax : calcul;

            // Set to health the new value
            chaHp.set('current', newHp);

            // Set max aura
            chaAur.set('current', chaAur.get('max'));

            // Set max cap
            chaCap.set('current', chaCap.get('max'));

            // Verification
            // sendChat('System', 'new aura calculed = @{'+msg.who+'|aura}');

        }
    };

    // Check all messages
    on('chat:message',msg=>{

        // Look for this message
        const textToCheck = "repos long";

        if (msg.content.includes(textToCheck)) {
            // sendChat(msg.who, 'Results was: '+msg.inlinerolls[0].expression);
            // sendChat(msg.who, 'Total was: '+msg.inlinerolls[0].results.total);
            removeAur(msg);
        }
    });
});