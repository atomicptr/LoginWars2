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
            pve: ["Lumberer Ascalon", "Fractal", "Malchor", "Fractal 1-10"],
            pvp: ["Kills", "Reward", "War Necro", "Thief Mes"],
            wvw: ["Ruins", "Creature", "Camp", "Defender"]
        },
        "2": {
            pve: ["Lumberer Jungle", "Forger", "Metrica", "Fractal 1-10"],
            pvp: ["Kills", "Capture", "War Engi", "Ranger Engi"],
            wvw: ["Land", "Guard", "Camp", "Tower"]
        },
        "3": {
            pve: ["Miner Wastes", "Activity", "Brisban", "Fractal 1-10"],
            pvp: ["Rank", "Defender", "Ele Mes", "Guard Thief"],
            wvw: ["Creature", "Ruins", "Tower", "Defender"]
        },
        "4": {
            pve: ["Forager Ascalon", "Vista Ascalon", "Fields", "Fractal 1-10"],
            pvp: ["Defender", "Capture", "Engi Thief", "Ranger Engi"],
            wvw: ["Spender", "Land", "Camp", "Keep"]
        },
        "5": {
            pve: ["Lumberer Ascalon", "Forger", "Caledon", "Fractal 11-20"],
            pvp: ["Reward", "Kills", "War Guard", "Ranger Engi"],
            wvw: ["Ruins", "Land", "Keep", "Defender"]
        },
        "6": {
            pve: ["Miner Shiverpeaks", "Fractal", "Snowden", "Fractal 1-10"],
            pvp: ["Rank", "Reward", "Ranger Thief", "Engi Ele"],
            wvw: ["Caravan", "Kills", "Camp", "Tower"]
        },
        "7": {
            pve: ["Forager Kryta", "Vista Orr", "Wayfarer", "Fractal 1-10"],
            pvp: ["Capture", "Reward", "War Ranger", "Guard Necro"],
            wvw: ["Land", "Guard", "Defender", "Tower"]
        },
        "8": {
            pve: ["Lumberer Ascalon", "Forger", "Fields", "Fractal 21-30"],
            pvp: ["Defender", "Capture", "Ranger Mes", "Guard Engi"],
            wvw: ["Land", "Spender", "Camp", "Keep"]
        },
        "9": {
            pve: ["Miner Jungle", "Activity", "Timberline", "Fractal 1-10"],
            pvp: ["Rank", "Defender", "War Engi", "Ranger Necro"],
            wvw: ["Ruins", "Guard", "Keep", "Camp"]
        },
        "10": {
            pve: ["Lumberer Shiverpeaks", "Vista Ascalon", "Metrica", "Fractal 31-40"],
            pvp: ["Kills", "Rank", "Ele Mes", "Guard Thief"],
            wvw: ["Caravan", "Kills", "Defender", "Keep"]
        },
        "11": {
            pve: ["Miner Jungle", "Fractal", "Frostgorge", "Fractal 1-10"],
            pvp: ["Capture", "Reward", "Engi Thief", "Ele Necro"],
            wvw: ["Land", "Caravan", "Camp", "Tower"]
        },
        "12": {
            pve: ["Forager Jungle", "Forger", "Southsun", "Fractal 1-10"],
            pvp: ["Capture", "Defender", "War Thief", "Guard Ranger"],
            wvw: ["Spender", "Guard", "Tower", "Defender"]
        },
        "13": {
            pve: ["Lumberer Kryta", "Vista Kryta", "Snowden", "Fractal 21-30"],
            pvp: ["Rank", "Defender", "Engi Mes", "Guard Ele"],
            wvw: ["Land", "Spender", "Camp", "Defender"]
        },
        "14": {
            pve: ["Lumberer Ascalon", "Fractal", "Fields", "Fractal 1-10"],
            pvp: ["Reward", "Kills", "War Ele", "Engi Necro"],
            wvw: ["Kills", "Land", "Keep", "Camp"]
        },
        "15": {
            pve: ["Forager Ascalon", "Activity", "Bloodtide", "Fractal 1-10"],
            pvp: ["Defender", "Rank", "Thief Ele", "Guard Mes"],
            wvw: ["Land", "Caravan", "Camp", "Defender"]
        },
        "16": {
            pve: ["Lumberer Kryta", "Vista Ascalon", "Metrica", "Fractal 1-10"],
            pvp: ["Kills", "Capture", "War Mes", "Ranger Necro"],
            wvw: ["Land", "Guard", "Tower", "Camp"]
        },
        "17": {
            pve: ["Lumberer Jungle", "Activity", "Dredgehaunt", "Fractal 1-10"],
            pvp: ["Kills", "Defender", "Thief Necro", "Ele Ranger"],
            wvw: ["Caravan", "Land", "Tower", "Defender"]
        },
        "18": {
            pve: ["Forager Jungle", "Forger", "Plains", "Fractal 1-10"],
            pvp: ["Reward", "Capture", "War Necro", "Thief Mes"],
            wvw: ["Land", "Guard", "Defender", "Camp"]
        },
        "19": {
            pve: ["Lumberer Ascalon", "Activity", "Kessex", "Golem"],
            pvp: ["Reward", "Rank", "War Guard", "Ranger Engi"],
            wvw: ["Kills", "Ruins", "Camp", "Defender"]
        },
        "20": {
            pve: ["Miner Ascalon", "Vista Maguuma", "Frostgorge", "SB"],
            pvp: ["Rank", "Defender", "Ranger Thief", "Engi Ele"],
            wvw: ["Guard", "Caravan", "Keep", "Tower"]
        },
        "21": {
            pve: ["Lumberer Kryta", "Fractal", "Metrica", "Fractal 1-10"],
            pvp: ["Kills", "Rank", "War Ranger", "Guard Necro"],
            wvw: ["Ruins", "Kills", "Tower", "Camp"]
        },
        "22": {
            pve: ["Miner Shiverpeaks", "Vista Wastes", "Snowden", "Shatterer"],
            pvp: ["Reward", "Capture", "Ranger Mes", "Guard Engi"],
            wvw: ["Guard", "Caravan", "Keep", "Camp"]
        },
        "23": {
            pve: ["Forager Ascalon", "Forger", "Kessex", "SB"],
            pvp: ["Kills", "Rank", "War Engi", "Ranger Necro"],
            wvw: ["Land", "Creature", "Tower", "Defender"]
        },
        "24": {
            pve: ["Miner Shiverpeaks", "Vista Orr", "Sparkfly", "Fractal 11-20"],
            pvp: ["Capture", "Reward", "Ele Mes", "Guard Thief"],
            wvw: ["Ruins", "Land", "Defender", "Keep"]
        },
        "25": {
            pve: ["Lumberer Wastes", "Fractal", "Harathi", "Wurm"],
            pvp: ["Reward", "Capture", "Engi Thief", "Ele Necro"],
            wvw: ["Guard", "Ruins", "Keep", "Camp"]
        },
        "26": {
            pve: ["Forager Kryta", "Vista Kryta", "Wayfarer", "Jormag"],
            pvp: ["Capture", "Defender", "War Thief", "Guard Ranger"],
            wvw: ["Ruins", "Land", "Tower", "Camp"]
        },
        "27": {
            pve: ["Miner Ascalon", "Vista Shiverpeaks", "Harathi", "Fractal 1-10"],
            pvp: ["Defender", "Rank", "Engi Mes", "Guard Ele"],
            wvw: ["Caravan", "Creature", "Defender", "Camp"]
        },
        "28": {
            pve: ["Lumberer Kryta", "Forger", "Queensdale", "Golem"],
            pvp: ["Capture", "Rank", "War Ele", "Engi Necro"],
            wvw: ["Spender", "Caravan", "Camp", "Keep"]
        },
        "29": {
            pve: ["Forager Ascalon", "Activity", "Marches", "Jormag"],
            pvp: ["Capture", "Reward", "Thief Ele", "Guard Mes"],
            wvw: ["Land", "Kills", "Defender", "Tower"]
        },
        "30": {
            pve: ["Forager Orr", "Vista Wastes", "Plains", "Fractal 11-20"],
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
