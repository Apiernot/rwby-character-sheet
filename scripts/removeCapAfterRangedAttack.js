on('ready',()=>{

    // Remove capacity used
    const removeCap = (msg)=>{
        //sendChat('myFunc','myFunc was called by '+msg.who+' ('+msg.playerid+')');

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get capacity attribute
            var chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];

            // Set the new value
            var chaCapValue = chaCap.get('current') - 1;
            chaCap.set('current', chaCapValue);

            // Verification
            // sendChat('System', 'new capacity calculed = @{'+msg.who+'|capacity}');

        }
    };

    // Check all messages
    on('chat:message',msg=>{

        // Look for this message
        const textToCheck = "makes a ranged attack";

        if(msg.content.includes(textToCheck)){
            removeCap(msg);
        }
    });
});