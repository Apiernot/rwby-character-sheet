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
            var capMax = parseInt(chaCap.get('max'));

            // Get agi attribute
            var chaAgi = findObjs({ type: 'attribute', characterid: character.id, name: 'agility' })[0];
            var agi = parseInt(chaAgi.get('current'));

            // Calcul new cap
            var calcul = agi + 1 + cap;
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
        const textToCheck = "reload cap during the dodge";

        if (msg.content.includes(textToCheck)) {
            // sendChat(msg.who, 'Results was: '+msg.inlinerolls[0].expression);
            // sendChat(msg.who, 'Total was: '+msg.inlinerolls[0].results.total);
            removeAur(msg);
        }
    });
});