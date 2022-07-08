on('ready',()=>{

    const reloadCap = (msg)=>{

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

        }
    };

    const reloadCapDodge = (msg)=>{

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

        }
    };

    const removeAurAfterEmpower = (msg)=>{

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get aura attribute
            var chaAur = findObjs({ type: 'attribute', characterid: character.id, name: 'aura' })[0];

            // Set the new value
            var chaAurValue = chaAur.get('current') - 1;
            chaAur.set('current', chaAurValue);

        }
    };

    const removeAurEmpowerDefend = (msg)=>{

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get aura attribute
            var chaAur = findObjs({ type: 'attribute', characterid: character.id, name: 'aura' })[0];

            // Set the new value
            var chaAurValue = chaAur.get('current') - 1;
            chaAur.set('current', chaAurValue);

        }
    };

    const removeCapAfterBonusRangedAttack = (msg)=>{

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get capacity attribute
            var chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];

            // Set the new value
            var chaCapValue = chaCap.get('current') - 1;
            chaCap.set('current', chaCapValue);

        }
    };

    const removeCapAfterDust = (msg)=>{

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

        }
    };

    const removeCapAfterDustDefend = (msg)=>{

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

        }
    };

    const removeCapAfterRangedAttack = (msg)=>{

        // Get character played
        var character = findObjs({_type: 'character',name: msg.who})[0];

        if (character != null) {

            // Get capacity attribute
            var chaCap = findObjs({ type: 'attribute', characterid: character.id, name: 'capacity' })[0];

            // Set the new value
            var chaCapValue = chaCap.get('current') - 1;
            chaCap.set('current', chaCapValue);

        }
    };

    const reposCourt = (msg)=>{

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

        }
    };

    const reposLong = (msg)=>{

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

        }
    };


    // Check all messages
    on('chat:message',msg=>{

        var textToCheck = "";
        var errorTracker = "";

        try {

            errorTracker = "reloadCap";
            textToCheck = "recharge sa capacité";
            if (msg.content.includes(textToCheck)) {
                reloadCap(msg);
            }

            errorTracker = "reloadCapDodge";
            textToCheck = "reload cap during the dodge";
            if (msg.content.includes(textToCheck)) {
                reloadCapDodge(msg);
            }

            errorTracker = "removeAurAfterEmpower";
            textToCheck = "spends 1 aura to empower";
            if(msg.content.includes(textToCheck)){
                removeAurAfterEmpower(msg);
            }

            errorTracker = "removeAurEmpowerDefend";
            textToCheck = "Empowered";
            if (msg.inlinerolls) {
                if(msg.inlinerolls[0].expression.includes(textToCheck)){
                    removeAurEmpowerDefend(msg);
                }
            }

            errorTracker = "removeCapAfterBonusRangedAttack";
            textToCheck = "makes a ranged bonus attack";
            if(msg.content.includes(textToCheck)){
                removeCapAfterBonusRangedAttack(msg);
            }

            errorTracker = "removeCapAfterDust";
            textToCheck = "Dust Phial";
            if(msg.content.includes(textToCheck)){
                removeCapAfterDust(msg);
            }

            errorTracker = "removeCapAfterDustDefend";
            textToCheck = "attempts to defend with Dust";
            if(msg.content.includes(textToCheck)){
                removeCapAfterDustDefend(msg);
            }

            errorTracker = "removeCapAfterRangedAttack";
            textToCheck = "makes a ranged attack";
            if(msg.content.includes(textToCheck)){
                removeCapAfterRangedAttack(msg);
            }

            errorTracker = "reposCourt";
            textToCheck = "repos court";
            if (msg.content.includes(textToCheck)) {
                reposCourt(msg);
            }

            errorTracker = "reposLong";
            textToCheck = "repos long";
            if (msg.content.includes(textToCheck)) {
                reposLong(msg);
            }

        }
        catch {
            sendChat('System', 'Une erreur est survenue');
            sendChat('System', 'Fonction : ' + errorTracker);
        }

    });
});