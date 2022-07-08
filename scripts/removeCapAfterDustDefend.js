on('ready',()=>{

    // Remove capacity used
    const removeCap = (msg)=>{
        //sendChat('myFunc','myFunc was called by '+msg.who+' ('+msg.playerid+')');

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get capacity attribute
            var chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];

            // Get the capacity boost
            var chaCapBoost = findObjs({ type: 'attribute', characterid: character.id, name: 'capboost' })[0];

            // Set the new value
            var chaCapValue = chaCap.get('current') - 1 - chaCapBoost.get('current');
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
        const textToCheck = "attempts to defend with Dust";

        if(msg.content.includes(textToCheck)){
            removeCap(msg);
        }
    });
});