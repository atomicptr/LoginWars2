var getDailies = function(day) {
    this.dailyNames = {
        // PvE
        // Gathering Achievements
        "Forager Ascalon": "Forager: Ascalon",
        "Lumberer Ascalon": "Lumberer: Ascalon",
        "Miner Ascalon": "Daily Ascalon Miner",
        "Forager Kryta": "Forager: Kryta",
        "Lumberer Kryta": "Lumberer: Kryta",
        "Miner Kryta": "Miner: Kryta",
        "Forager Jungle": "Forager: Maguuma Jungle",
        "Lumberer Jungle": "Lumberer: Maguuma Jungle",
        "Miner Jungle": "Miner: Maguuma Jungle",
        "Forager Orr": "Forager: Orr",
        "Lumberer Orr": "Lumberer: Orr",
        "Miner Orr": "Miner: Orr",
        "Forager Shiverpeaks": "Forager: Shiverpeaks",
        "Lumberer Shiverpeaks": "Lumberer: Shiverpeaks",
        "Miner Shiverpeaks": "Miner: Shiverpeaks",
        "Lumberer Wastes": "Lumberer: Silverwastes",

        // Vista, Activity Participation, Fractal, Mystic Forger
        "Vista Ascalon": "Vista: Ascalon",
        "Vista Kryta": "Vista: Kryta",
        "Vista Jungle": "Vista: Maguuma",
        "Vista Orr": "Vista: Orr",
        "Vista Shiverpeaks": "Vista: Shiverpeaks Mountain",
        "Activity": "Daily Activity",
        "Fractal": "Daily Fractal",
        "Fractal 1-10": "Fractal: 1-10",
        "Fractal 11-20": "Fractal: 11-20",
        "Fractal 21-30": "Fractal: 21-30",
        "Fractal 31-40": "Fractal: 31-40",
        "Forger": "Mystic Forger",

        // Event region
        "Southsun": "Events: Southsun Cove",
        "Gendarran": "Events: Gendarran Fields",
        "Bloodtide": "Events: Bloodtide Coast",
        "Harathi": "Events: Harathi Hinterlands",
        "Ashford": "Events: Plains of Ashford",
        "Frostgorge": "Events: Frostgorge Sound",
        "Fields": "Events: Fields of Ruin",
        "Sparkfly": "Events: Sparkly Fen",
        "Caledon": "Events: Caledon Forest",
        "Timberline": "Events: Timberline Falls",
        "Metrica": "Events: Metrica Province",
        "Wayfarer": "Events: Wayfarer Foothills",
        "Brisban" : "Events: Brisban Wildlands",
        "Malchor": "Events: Malchor Leaps",
        "Maelstrom": "Events: Maelstrom Mountains",
        "Cursed": "Events: Cursed Shore",
        "Straits": "Events: Straits of Devastation",
        "Kessex": "Events: Kessex Hills",
        "Snowden": "Events: Snowden Drifts",
        "Queensdale": "Events: Queensdale",

        // Boss
        "Wurm": "Boss: Jungle Wurm",
        "FE": "Boss: Fire Elemental",
        "Golem": "Boss: Inquest Golem Mark II",
        "SB": "Boss: Shadow Behemoth",
        "Jormag": "Boss: Claw of Jormag",
        "Megades": "Boss: Megadestroyer",

        // PvP
        "Defender": "Defender",
        "Rank": "PvP Rank Points",
        "Kills": "PvP Player Kills",
        "Capture": "PvP Capture",
        "Reward": "PvP Reward Earner",
        "War Necro": "Win: Warrior/Necromancer",
        "War Engi": "Win: Warrior/Engineer",
        "Ranger Engi": "Win: Ranger/Engineer",
        "Ele Mes": "Win: Elementalist/Mesmer",
        "Guard Thief": "Win: Guardian/Thief",
        "Thief Mes": "Win: Thief/Mesmer",
        "Engi Thief": "Win: Engineer/Thief",
        "War Guard": "Win: Warrior/Guardian",
        "Ranger Thief": "Win: Ranger/Guardian",
        "Engi Ele": "Win: Engineer/Elementalist",
        "War Ranger": "Win: Warrior/Ranger",
        "Guard Necro": "Win: Guardian/Necromancer",
        "Ranger Mes": "Win: Ranger/Mesmer",
        "Guard Engi": "Win: Guardian/Engineer",
        "Ranger Necro": "Win: Ranger/Necromancer",
        "Ele Necro": "Win: Elementalist/Necromancer",
        "War Thief": "Win: Warrior/Thief",
        "Guard Ranger": "Win: Guardian/Ranger",
        "Engi Mes": "Win: Engineer/Mesmer",
        "Guard Ele": "Win: Guardian/Elementalist",
        "War Ele": "Win: Warrior/Elementalist",
        "Engi Necro": "Win: Engineer/Necromancer",
        "Thief Ele": "Win: Thief/Elementalist",
        "Guard Mes": "Win: Guardian/Mesmer",
        "War Mes": "Win: Warrior/Mesmer",
        "Thief Necro": "Win: Thief/Necromancer",
        "Ele Ranger": "Win: Elementalist/Ranger",

        // wvw
        "Land": "Capture: Land",
        "Ruins": "Capture: Ruins",
        "Camp": "Capture: Camp",
        "Tower": "Capture: Tower",
        "Spender": "WvW Big Spender",
        "Keep": "Capture: Keep",
        "Creature": "Daily Creature Slayer",
        "Guard": "Daily Guard Killer",
        "Caravan": "Caravan Disruptor"
    };
    this.dailyData = {
        "pve":{
            "Forager Ascalon":[1,2,4,15,18],
            "Activity":[1,6,15,24,27],
            "Southsun":[1,18],
            "Wurm":[1,20],
            "Forger":[2,9,13,18,23,25,29],
            "Gendarran":[2,21],
            "Fractal 1-10":[2,3,4,6,7,8,9,11,13,14,15,16,17,18,19,31],
            "Lumberer Wastes":[3],
            "Fractal":[3,10,19,22,28],
            "Bloodtide":[3,28],
            "Vista Ascalon":[4,14],
            "Harathi":[4,12,19,29],
            "Forager Orr":[5,21],
            "Vista Shiverpeaks":[5,7,12,16,26,30],
            "Ashford":[5],
            "Fractal 11-20":[5,10,23],
            "Lumberer Ascalon":[6,24,30],
            "Frostgorge":[6],
            "Forager Jungle":[7,28],
            "Fields":[7,26],
            "Miner Jungle":[8,11],
            "Vista Orr":[8,11,21],
            "Sparkfly":[8,20,31],
            "Forager Kryta":[9,14,25],
            "Caledon":[9],
            "Lumberer Jungle":[10,22,26],
            "Timberline":[10],
            "Metrica":[11,30],
            "Lumberer Kryta":[12],
            "Fractal 21-30":[12,27],
            "Miner Shiverpeaks":[13,19,20,29,31],
            "Wayfarer":[13,24],
            "Brisban":[14],
            "Malchor":[15],
            "Miner Kryta":[16],
            "Maelstrom":[16],
            "Lumberer Shiverpeaks":[17],
            "Vista Kryta":[17,20],
            "Cursed":[17],
            "Fractal 31-40":[21],
            "Straits":[22],
            "FE":[22,30],
            "Miner Ascalon":[23],
            "Kessex":[23],
            "Megades":[24],
            "Snowden":[25],
            "Golem":[25,29],
            "Jormag":[26],
            "Miner Orr":[27],
            "Queensdale":[27],
            "SB":[28],
            "Vista Jungle":[31]
        },
        "pvp":{
            "Defender":[1,2,3,7,8,11,14,15,17,18,22,24,25,26,28,31],
            "Rank":[1,3,5,6,10,13,14,20,22,28,30],
            "War Necro":[1,18],
            "Thief Mes":[1,18],
            "Kills":[2,9,10,12,15,16,19,25,27],
            "War Engi":[2,9,23],
            "Ranger Engi":[2,4,5,19],
            "Ele Mes":[3,10,24],
            "Guard Thief":[3,10,24],
            "Capture":[4,5,8,13,16,18,20,21,23,24,26,29,30,31],
            "Reward":[4,6,7,9,11,12,17,19,21,23,27,29],
            "Engi Thief":[4,11,25],
            "War Guard":[5,19],
            "Ranger Thief":[6,20],
            "Engi Ele":[6,20],
            "War Ranger":[7,21],
            "Guard Necro":[7,21,30],
            "Ranger Mes":[8,22],
            "Guard Engi":[8,22],
            "Ranger Necro":[9,16,23],
            "Ele Necro":[11,25],
            "War Thief":[12,26],
            "Guard Ranger":[12,26],
            "Engi Mes":[13,27],
            "Guard Ele":[13,27],
            "War Ele":[14,28],
            "Engi Necro":[14,28],
            "Thief Ele":[15,29],
            "Guard Mes":[15,29],
            "War Mes":[16,30],
            "Thief Necro":[17,31],
            "Ele Ranger":[17,31]
        },
        "wvw":{
            "Land":[1,2,4,5,8,10,16,21,23,24,26,29,31],
            "Ruins":[1,2,7,12,14,17,18,19,22,27,28,30],
            "Camp":[1,2,3,6,7,8,11,12,13,15,17,18,20,21,22,24,25,27,28,30,31],
            "Tower":[1,4,5,9,10,14,16,19,21,23,24,26,28,29],
            "Defender":[2,4,6,7,9,11,12,15,16,18,20,22,25,26,29,30],
            "Spender":[3,4,11,18,21,25],
            "Kills":[3,5,12,17,22,25,27,29],
            "Keep":[3,5,8,10,13,14,17,19,23,27,31],
            "Creature":[6,7,10,13,15,20,23,28],
            "Guard":[6,8,9,14,16,19,20,24,30,31],
            "Caravan":[9,11,13,15,26]
        }
    };

    // if day is not defined use current day instead
    if(day == undefined) {
        day = new Date().getDate();
    }

    function insert(type) {
        var arr = [];

        for(var objective in this.dailyData[type]) {
            if(this.dailyData[type][objective].indexOf(day) > -1) {
                arr.push(this.dailyNames[objective]);
            }
        }

        return arr;
    }

    return {
        pve: insert("pve"),
        pvp: insert("pvp"),
        wvw: insert("wvw")
    }
};
