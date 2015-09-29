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
        "Vista Wastes": "Vista: Maguuma Wastes",
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
        "Silverwastes": "Events: Silverwastes",
        "Dry": "Events: Dry Top",

        // Boss
        "Wurm": "Boss: Jungle Wurm",
        "FE": "Boss: Fire Elemental",
        "Golem": "Boss: Inquest Golem Mk II",
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
            pve: ["Lumberer Ascalon", "Fractal", "Malchor", "SB"],
            pvp: ["Kills", "Reward", "War Necro", "Thief Mes"],
            wvw: ["Ruins", "Creature", "Camp", "Defender"]
        },
        "2": {
            pve: ["Forager Jungle", "Forger", "Frostgorge", "Fractal 1-10"],
            pvp: ["Rank", "Reward", "War Engi", "Ranger Engi"],
            wvw: ["Creature", "Land", "Defender", "Camp"]
        },
        "3": {
            pve: ["Lumberer Kryta", "Fractal", "Marches", "Fractal 11-20"],
            pvp: ["Rank", "Kills", "Ele Mes", "Guard Thief"],
            wvw: ["Creature", "Caravan", "Keep", "Tower"]
        },
        "4": {
            pve: ["Miner Shiverpeaks", "Vista Ascalon", "Wayfarer", "Fractal 1-10"],
            pvp: ["Reward", "Defender", "Engi Thief", "Ranger Engi"],
            wvw: ["Spender", "Land", "Tower", "Defender"]
        },
        "5": {
            pve: ["Lumberer Jungle", "Vista Kryta", "Dredgehaunt", "Fractal 1-10"],
            pvp: ["Capture", "Kills", "War Guard", "Ranger Engi"],
            wvw: ["Ruins", "Guard", "Camp", "Defender"]
        },
        "6": {
            pve: ["Forager Ascalon", "Activity", "Snowden", "Fractal 1-10"],
            pvp: ["Defender", "Capture", "Ranger Thief", "Engi Ele"],
            wvw: ["Ruins", "Creature", "Defender", "Camp"]
        },
        "7": {
            pve: ["Lumberer Ascalon", "Fractal", "Southsun", "Fractal 1-10"],
            pvp: ["Capture", "Reward", "War Ranger", "Guard Necro"],
            wvw: ["Creature", "Land", "Defender", "Tower"]
        },
        "8": {
            pve: ["Miner Jungle", "Vista Orr", "Kessex", "Fractal 1-10"],
            pvp: ["Rank", "Kills", "Ranger Mes", "Guard Engi"],
            wvw: ["Ruins", "Kills", "Camp", "Defender"]
        },
        "9": {
            pve: ["Lumberer Ascalon", "Forger", "Ashford", "Fractal 11-20"],
            pvp: ["Defender", "Capture", "War Engi", "Ranger Necro"],
            wvw: ["Creature", "Land", "Camp", "Keep"]
        },
        "10": {
            pve: ["Miner Jungle", "Vista Ascalon", "Brisban", "Fractal 1-10"],
            pvp: ["Rank", "Reward", "Ele Mes", "Guard Thief"],
            wvw: ["Ruins", "Spender", "Defender", "Tower"]
        },
        "11": {
            pve: ["Lumberer Wastes", "Fractal", "Caledon", "Fractal 1-10"],
            pvp: ["Capture", "Rank", "Engi Thief", "Ele Necro"],
            wvw: ["Kills", "Ruins", "Keep", "Defender"]
        },
        "12": {
            pve: ["Forager Ascalon", "Vista Kryta", "Cursed", "Fractal 1-10"],
            pvp: ["Kills", "Capture", "War Thief", "Guard Ranger"],
            wvw: ["Caravan", "Guard", "Defender", "Camp"]
        },
        "13": {
            pve: ["Forager Jungle", "Activity", "Snowden", "Fractal 1-10"],
            pvp: ["Reward", "Capture", "Engi Mes", "Guard Ele"],
            wvw: ["Guard", "Land", "Defender", "Keep"]
        },
        "14": {
            pve: ["Miner Kryta", "Vista Jungle", "Kessex", "Fractal 1-10"],
            pvp: ["Reward", "Rank", "War Ele", "Engi Necro"],
            wvw: ["Spender", "Caravan", "Camp", "Defender"]
        },
        "15": {
            pve: ["Lumberer Kryta", "Vista Ascalon", "Sparkfly", "Fractal 1-10"],
            pvp: ["Rank", "Defender", "Thief Ele", "Guard Mes"],
            wvw: ["Caravan", "Kills", "Camp", "Tower"]
        },
        "16": {
            pve: ["Miner Shiverpeaks", "Fractal", "Fields", "Fractal 1-10"],
            pvp: ["Reward", "Capture", "War Mes", "Ranger Necro"],
            wvw: ["Ruins", "Land", "Keep", "Defender"]
        },
        "17": {
            pve: ["Lumberer Jungle", "Vista Kryta", "Harathi", "Fractal 1-10"],
            pvp: ["Defender", "Kills", "Thief Necro", "Ele Ranger"],
            wvw: ["Land", "Guard", "Defender", "Keep"]
        },
        "18": {
            pve: ["Miner Kryta", "Forger", "Bloodtide", "Fractal 1-10"],
            pvp: ["Defender", "Rank", "War Necro", "Thief Mes"],
            wvw: ["Ruins", "Spender", "Tower", "Defender"]
        },
        "19": {
            pve: ["Lumberer Kryta", "Activity", "Frostgorge", "Fractal 1-10"],
            pvp: ["Capture", "Reward", "War Guard", "Ranger Engi"],
            wvw: ["Guard", "Ruins", "Defender", "Camp"]
        },
        "20": {
            pve: ["Miner Shiverpeaks", "Vista Orr", "Fields", "Wurm"],
            pvp: ["Capture", "Rank", "Ranger Thief", "Engi Ele"],
            wvw: ["Land", "Caravan", "Defender", "Keep"]
        },
        "21": {
            pve: ["Lumberer Kryta", "Vista Shiverpeaks", "Silverwastes", "Maw"],
            pvp: ["Rank", "Kills", "War Ranger", "Guard Necro"],
            wvw: ["Spender", "Guard", "Camp", "Tower"]
        },
        "22": {
            pve: ["Miner Ascalon", "Activity", "Dry", "Golem"],
            pvp: ["Defender", "Reward", "Ranger Mes", "Guard Engi"],
            wvw: ["Guard", "Kills", "Defender", "Camp"]
        },
        "23": {
            pve: ["Forager Kryta", "Fractal", "Gendarran", "FE"],
            pvp: ["Capture", "Kills", "War Engi", "Ranger Necro"],
            wvw: ["Land", "Guard", "Camp", "Keep"]
        },
        "24": {
            pve: ["Forager Jungle", "Vista Ascalon", "Queensdale", "Fractal 1-10"],
            pvp: ["Defender", "Reward", "Ele Mes", "Guard Thief"],
            wvw: ["Caravan", "Spender", "Camp", "Defender"]
        },
        "25": {
            pve: ["Lumberer Wastes", "Forger", "Bloodtide", "Maw"],
            pvp: ["Reward", "Defender", "Engi Thief", "Ele Necro"],
            wvw: ["Land", "Kills", "Defender", "Tower"]
        },
        "26": {
            pve: ["Miner Shiverpeaks", "Vista Kryta", "Wayfarer", "FE"],
            pvp: ["Capture", "Rank", "War Thief", "Guard Ranger"],
            wvw: ["Spender", "Guard", "Camp", "Defender"]
        },
        "27": {
            pve: ["Lumberer Jungle", "Vista Orr", "Harathi", "Wurm"],
            pvp: ["Kills", "Reward", "Engi Mes", "Guard Ele"],
            wvw: ["Creature", "Kills", "Defender", "Tower"]
        },
        "28": {
            pve: ["Forager Ascalon", "Forger", "Kessex", "SB"],
            pvp: ["Kills", "Rank", "War Ele", "Engi Necro"],
            wvw: ["Land", "Kills", "Keep", "Camp"]
        },
        "29": {
            pve: ["Lumberer Kryta", "Fractal", "Maelstrom", "Maw"],
            pvp: ["Defender", "Reward", "Thief Ele", "Guard Mes"],
            wvw: ["Land", "Caravan", "Defender", "Tower"]
        },
        "30": {
            pve: ["Forager Orr", "Vista Wastes", "Ashford", "Fractal 11-20"],
            pvp: ["Capture", "Kills", "War Mes", "Guard Necro"],
            wvw: ["Spender", "Land", "Defender", "Camp"]
        },
        "31": {
            pve: ["Forager Ascalon", "Vista Shiverpeaks", "Sparkfly", "Fractal 1-10"],
            pvp: ["Defender", "Kills", "Thief Necro", "Ele Ranger"],
            wvw: ["Creature", "Land", "Keep", "Camp"]
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
