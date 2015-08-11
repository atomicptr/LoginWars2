var getDailies = function(day) {
    this.dailyNames = {}

    this.dailyNames.pve = {
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
        "Vista Kryta": "Vista: Kryta",
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
        "Dredgehaunt": "Events: Dredgehaunt Cliffs",
        "Marches": "Events: Iron Marches",

        // Boss
        "Wurm": "Boss: Jungle Wurm",
        "FE": "Boss: Fire Elemental",
        "Golem": "Boss: Inquest Golem Mark II",
        "SB": "Boss: Shadow Behemoth",
        "Jormag": "Boss: Claw of Jormag",
        "Megades": "Boss: Megadestroyer",
        "Maw": "Boss: Frozen Maw",
        "Shatterer": "Boss: Shatterer"
    };

    this.dailyNames.pvp = {
        // PvP
        "Defender": "PvP Defender",
        "Rank": "PvP Rank Points",
        "Kills": "PvP Player Kills",
        "Capture": "PvP Capture",
        "Reward": "PvP Reward Earner",
        "War Necro": "Win: Warrior/Necro",
        "War Engi": "Win: Warrior/Engineer",
        "Ranger Engi": "Win: Ranger/Engineer",
        "Ele Mes": "Win: Ele/Mesmer",
        "Guard Thief": "Win: Guardian/Thief",
        "Thief Mes": "Win: Thief/Mesmer",
        "Engi Thief": "Win: Engineer/Thief",
        "War Guard": "Win: Warrior/Guardian",
        "Ranger Thief": "Win: Ranger/Thief",
        "Engi Ele": "Win: Engineer/Ele",
        "War Ranger": "Win: Warrior/Ranger",
        "Guard Necro": "Win: Guardian/Necro",
        "Ranger Mes": "Win: Ranger/Mesmer",
        "Guard Engi": "Win: Guardian/Engineer",
        "Ranger Necro": "Win: Ranger/Necro",
        "Ele Necro": "Win: Ele/Necro",
        "War Thief": "Win: Warrior/Thief",
        "Guard Ranger": "Win: Guardian/Ranger",
        "Engi Mes": "Win: Engineer/Mesmer",
        "Guard Ele": "Win: Guardian/Ele",
        "War Ele": "Win: Warrior/Ele",
        "Engi Necro": "Win: Engineer/Necro",
        "Thief Ele": "Win: Thief/Ele",
        "Guard Mes": "Win: Guardian/Mesmer",
        "War Mes": "Win: Warrior/Mesmer",
        "Thief Necro": "Win: Thief/Necro",
        "Ele Ranger": "Win: Ele/Ranger"
    };

    this.dailyNames.wvw = {
        // wvw
        "Land": "Capture: Land",
        "Ruins": "Capture: Ruins",
        "Camp": "Capture: Camp",
        "Tower": "Capture: Tower",
        "Spender": "WvW Big Spender",
        "Keep": "Capture: Keep",
        "Creature": "Daily Creature Slayer",
        "Guard": "Daily Guard Killer",
        "Caravan": "Caravan Disruptor",
        "Defender": "Objective Defender",
        "Kills": "Player Kills"
    };

    // daily data is from gw2timer.com
    this.dailyData = {
        "1": {
        	pve: ["Forager Ascalon", "Activity", "Southsun", "Wurm"],
        	pvp: ["Defender", "Rank", "War Necro", "Thief Mes"],
        	wvw: ["Land", "Ruins", "Camp", "Tower"]
        },
        "2": {
        	pve: ["Forager Jungle", "Forger", "Frostgorge", "Jormag"],
        	pvp: ["Rank", "Reward", "War Engi", "Ranger Engi"],
        	wvw: ["Creature", "Land", "Defender", "Camp"]
        },
        "3": {
        	pve: ["Lumberer Kryta", "Fractal", "Marches", "Fractal 11-20"],
        	pvp: ["Rank", "Kills", "Ele Mes", "Guard Thief"],
        	wvw: ["Creature", "Caravan", "Keep", "Tower"]
        },
        "4": {
        	pve: ["Miner Shiverpeaks", "Vista Ascalon", "Wayfarer", "Shatterer"],
        	pvp: ["Reward", "Defender", "Engi Thief", "Ranger Engi"],
        	wvw: ["Spender", "Land", "Tower", "Defender"]
        },
        "5": {
        	pve: ["Lumberer Jungle", "Vista Kryta", "Dredgehaunt", "Maw"],
        	pvp: ["Capture", "Kills", "War Guard", "Ranger Engi"],
        	wvw: ["Ruins", "Guard", "Camp", "Defender"]
        },
        "6": {
        	pve: ["Forager Ascalon", "Activity", "Snowden", "SB"],
        	pvp: ["Defender", "Capture", "Ranger Thief", "Engi Ele"],
        	wvw: ["Ruins", "Creature", "Defender", "Camp"]
        },
        "7": {
        	pve: ["Lumberer Ascalon", "Fractal", "Southsun", "Golem"],
        	pvp: ["Capture", "Reward", "War Ranger", "Guard Necro"],
        	wvw: ["Creature", "Land", "Defender", "Tower"]
        },
        "8": {
        	pve: ["Miner Jungle", "Vista Orr", "Kessex", "FE"],
        	pvp: ["Rank", "Kills", "Ranger Mes", "Guard Engi"],
        	wvw: ["Ruins", "Kills", "Camp", "Defender"]
        },
        "9": {
        	pve: ["Lumberer Ascalon", "Forger", "Ashford", "Fractal 11-20"],
        	pvp: ["Defender", "Capture", "War Engi", "Ranger Necro"],
        	wvw: ["Creature", "Land", "Camp", "Keep"]
        },
        "10": {
        	pve: ["Miner Jungle", "Vista Ascalon", "Brisban", "Wurm"],
        	pvp: ["Rank", "Reward", "Ele Mes", "Guard Thief"],
        	wvw: ["Ruins", "Spender", "Defender", "Tower"]
        },
        "11": {
        	pve: ["Lumberer Wastes", "Fractal", "Caledon", "Fractal 1-10"],
        	pvp: ["Capture", "Rank", "Engi Thief", "Ele Necro"],
        	wvw: ["Kills", "Ruins", "Keep", "Defender"]
        },
        "12": {
        	pve: ["Lumberer Kryta", "Vista Shiverpeaks", "Harathi", "Fractal 21-30"],
        	pvp: ["Reward", "Kills", "War Thief", "Guard Ranger"],
        	wvw: ["Ruins", "Kills", "Defender", "Camp"]
        },
        "13": {
        	pve: ["Miner Shiverpeaks", "Forger", "Wayfarer", "Fractal 1-10"],
        	pvp: ["Rank", "Capture", "Engi Mes", "Guard Ele"],
        	wvw: ["Creature", "Caravan", "Keep", "Camp"]
        },
        "14": {
        	pve: ["Forager Kryta", "Vista Ascalon", "Brisban", "Fractal 1-10"],
        	pvp: ["Defender", "Rank", "War Ele", "Engi Necro"],
        	wvw: ["Ruins", "Guard", "Tower", "Keep"]
        },
        "15": {
        	pve: ["Forager Ascalon", "Activity", "Malchor", "Fractal 1-10"],
        	pvp: ["Kills", "Defender", "Thief Ele", "Guard Mes"],
        	wvw: ["Creature", "Caravan", "Defender", "Camp"]
        },
        "16": {
        	pve: ["Miner Kryta", "Vista Shiverpeaks", "Maelstrom", "Fractal 1-10"],
        	pvp: ["Kills", "Capture", "War Mes", "Ranger Necro"],
        	wvw: ["Land", "Guard", "Tower", "Defender"]
        },
        "17": {
        	pve: ["Lumberer Shiverpeaks", "Vista Kryta", "Cursed", "Fractal 1-10"],
        	pvp: ["Reward", "Defender", "Thief Necro", "Ele Ranger"],
        	wvw: ["Ruins", "Kills", "Keep", "Camp"]
        },
        "18": {
        	pve: ["Forager Ascalon", "Forger", "Southsun", "Fractal 1-10"],
        	pvp: ["Defender", "Capture", "War Necro", "Thief Mes"],
        	wvw: ["Spender", "Ruins", "Defender", "Camp"]
        },
        "19": {
        	pve: ["Miner Shiverpeaks", "Fractal", "Harathi", "Fractal 1-10"],
        	pvp: ["Reward", "Kills", "War Guard", "Ranger Engi"],
        	wvw: ["Ruins", "Guard", "Keep", "Tower"]
        },
        "20": {
        	pve: ["Miner Shiverpeaks", "Vista Kryta", "Sparkfly", "Wurm"],
        	pvp: ["Capture", "Rank", "Ranger Thief", "Engi Ele"],
        	wvw: ["Creature", "Guard", "Camp", "Defender"]
        },
        "21": {
        	pve: ["Forager Orr", "Vista Orr", "Gendarran", "Fractal 31-40"],
        	pvp: ["Reward", "Capture", "War Ranger", "Guard Necro"],
        	wvw: ["Land", "Spender", "Tower", "Camp"]
        },
        "22": {
        	pve: ["Lumberer Jungle", "Fractal", "Straits", "FE"],
        	pvp: ["Defender", "Rank", "Ranger Mes", "Guard Engi"],
        	wvw: ["Ruins", "Kills", "Camp", "Defender"]
        },
        "23": {
        	pve: ["Miner Ascalon", "Forger", "Kessex", "Fractal 11-20"],
        	pvp: ["Reward", "Capture", "War Engi", "Ranger Necro"],
        	wvw: ["Land", "Creature", "Keep", "Tower"]
        },
        "24": {
        	pve: ["Lumberer Ascalon", "Activity", "Wayfarer", "Megades"],
        	pvp: ["Defender", "Capture", "Ele Mes", "Guard Thief"],
        	wvw: ["Land", "Guard", "Tower", "Camp"]
        },
        "25": {
        	pve: ["Forager Kryta", "Forger", "Snowden", "Golem"],
        	pvp: ["Kills", "Defender", "Engi Thief", "Ele Necro"],
        	wvw: ["Spender", "Kills", "Defender", "Camp"]
        },
        "26": {
        	pve: ["Lumberer Jungle", "Vista Shiverpeaks", "Fields", "Jormag"],
        	pvp: ["Defender", "Capture", "War Thief", "Guard Ranger"],
        	wvw: ["Land", "Caravan", "Defender", "Tower"]
        },
        "27": {
        	pve: ["Miner Orr", "Activity", "Queensdale", "Fractal 21-30"],
        	pvp: ["Reward", "Kills", "Engi Mes", "Guard Ele"],
        	wvw: ["Ruins", "Kills", "Keep", "Camp"]
        },
        "28": {
        	pve: ["Forager Jungle", "Fractal", "Bloodtide", "SB"],
        	pvp: ["Defender", "Rank", "War Ele", "Engi Necro"],
        	wvw: ["Ruins", "Creature", "Tower", "Camp"]
        },
        "29": {
        	pve: ["Miner Shiverpeaks", "Forger", "Harathi", "Golem"],
        	pvp: ["Capture", "Reward", "Thief Ele", "Guard Mes"],
        	wvw: ["Kills", "Land", "Defender", "Tower"]
        },
        "30": {
        	pve: ["Lumberer Ascalon", "Vista Shiverpeaks", "Metrica", "FE"],
        	pvp: ["Capture", "Rank", "War Mes", "Guard Necro"],
        	wvw: ["Guard", "Ruins", "Defender", "Camp"]
        },
        "31": {
        	pve: ["Miner Shiverpeaks", "Vista Jungle", "Sparkfly", "Fractal 1-10"],
        	pvp: ["Capture", "Defender", "Thief Necro", "Ele Ranger"],
        	wvw: ["Guard", "Land", "Keep", "Camp"]
        }
    };

    // check if an entry exists without a name
    for(var d in this.dailyData) {
        function check(data, type) {
            data[type].forEach(function(daily) {
                var name = this.dailyNames[type][daily];

                if(!name) {
                    console.warn("Name not found for: " + daily + " in: " + type);
                }
            });
        }

        var data = this.dailyData[d];

        for(var type in data) {
            check(data, type);
        }
    }

    // if day is not defined use current day instead
    if(day == undefined) {
        day = new Date().getDate();
    }

    var result = this.dailyData[day];

    for(var key in result) {
        for(var i = 0; i < result[key].length; i++) {
            var tmp = result[key][i];
            result[key][i] = this.dailyNames[key][tmp] ? this.dailyNames[key][tmp] : tmp;
        }
    }

    return result;
};
