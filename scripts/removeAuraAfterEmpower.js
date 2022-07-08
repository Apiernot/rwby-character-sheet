on('ready',()=>{

    // Remove capacity used
    const removeAur = (msg)=>{
        //sendChat('myFunc','myFunc was called by '+msg.who+' ('+msg.playerid+')');

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get aura attribute
            var chaAur = findObjs({ type: 'attribute', characterid: character.id, name: 'aura' })[0];

            // Set the new value
            var chaAurValue = chaAur.get('current') - 1;
            chaAur.set('current', chaAurValue);

            // Verification
            // sendChat('System', 'new aura calculed = @{'+msg.who+'|aura}');

        }
    };

    // Check all messages
    on('chat:message',msg=>{

        // Look for this message
        const textToCheck = "spends 1 aura to empower";

        if(msg.content.includes(textToCheck)){
            removeAur(msg);
        }
    });
});