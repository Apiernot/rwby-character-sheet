on('ready',()=>{

    // Remove capacity used
    const removeAur = (msg)=>{
        //sendChat('myFunc','myFunc was called by '+msg.who+' ('+msg.playerid+')');

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get cap attribute
            var chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];
            var cap = parseInt(chaCap.get('current'));

            // Get cap max
            chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];
            var capMax = parseInt(chaCap.get('max'));

            // Get dis attribute
            var chaDis = findObjs({ type: 'attribute', characterid: character.id, name: 'discipline' })[0];
            var dis = isNaN(parseInt(chaDis.get('current'))) ? 0 : parseInt(chaDis.get('current'));

            // Calcul new cap
            var calcul = dis + 1 + cap;
            var newCap = (calcul > capMax) ? capMax : calcul;

            // Set the new value
            chaCap.set('current', newCap);

            // Verification
            // sendChat('System', 'new aura calculed = @{'+msg.who+'|aura}');

        }
    };

    // Check all messages
    on('chat:message',msg=>{

        // Look for this message
        const textToCheck = "recharge sa capacité";

        if (msg.content.includes(textToCheck)) {
            // sendChat(msg.who, 'Results was: '+msg.inlinerolls[0].expression);
            // sendChat(msg.who, 'Total was: '+msg.inlinerolls[0].results.total);
            removeAur(msg);
        }
    });
});