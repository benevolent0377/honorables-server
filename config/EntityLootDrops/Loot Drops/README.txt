================================================================================
                    ENTITY LOOT DROPS - CONFIGURATION GUIDE
================================================================================

OVERVIEW
--------
This mod provides a comprehensive system for customizing entity loot drops in
Minecraft. Configure drops with advanced conditions, NBT data checks, player
requirements, and competitive event tracking.

DIRECTORY STRUCTURE
-------------------
Loot Drops/
├── README.txt                              # This file
├── Normal Drops/                           # Always-active drop configurations
│   ├── README.txt                          # Normal Drops documentation
│   ├── Global_Hostile_Drops.json           # Main config (auto-regenerates)
│   ├── Global_Hostile_Drops.example        # Comprehensive reference
│   ├── NBT_Entity_Data_Examples.example    # NBT condition examples
│   └── Mobs/                               # Entity-specific configurations
│       ├── Zombie_Example.json             # Basic zombie drops
│       ├── Skeleton_Example.json           # Basic skeleton drops
│       ├── NBT_Zombie_Example.json         # NBT condition example
│       └── [custom folders]/               # Organize as needed
└── Event Drops/                            # Event-specific drop configurations
    ├── README.txt                          # Event Drops documentation
    ├── Winter/                             # Winter event
    │   ├── Winter_Event_Drops_Example.json
    │   ├── NBT_Entity_Data_Examples.example
    │   ├── Drop_Count.json                 # Auto-generated statistics
    │   └── Mobs/
    ├── Summer/                             # Summer event
    ├── Easter/                             # Easter event
    ├── Halloween/                          # Halloween event
    └── [custom events]/                    # Create your own events

QUICK START
-----------
1. Navigate to Normal Drops/ or Event Drops/ depending on your needs
2. Review the .example files for comprehensive property documentation
3. Edit .json files to configure your custom drops
4. Use /lootdrops reload to apply changes without restarting
5. For events, use /lootdrops event <name> on/off to control activation

CONFIGURATION FORMAT
--------------------
All configurations use JSON array format:

[
  {
    "itemId": "minecraft:diamond",
    "dropChance": 5.0,
    "minAmount": 1,
    "maxAmount": 3
  }
]

CORE PROPERTIES
---------------
Required:
  • itemId          - Minecraft item ID (e.g., "minecraft:diamond")
  • dropChance      - Percentage chance (0-100)
  • minAmount       - Minimum drop quantity
  • maxAmount       - Maximum drop quantity

Optional:
  • nbtData         - Custom NBT data for the dropped item
  • requirePlayerKill - Only drop if killed by player (default: true)
  • allowDefaultDrops - Allow vanilla drops alongside custom (default: true)
  • enableDropCount - Track drops for statistics (Event Drops only)

ADVANCED FEATURES
-----------------

1. NBT ENTITY DATA CONDITIONS
   Check entity NBT data before dropping items:
   • nbtEntityData      - NBT path (e.g., "Health", "ForgeCaps.mod:data.level")
   • nbtDataCondition   - Operator: "<", ">", "<=", ">=", "==", "!=", "contains"
   • nbtDataValue       - Value to compare (string, number, or boolean)
   • nbtEntityDrop      - Item to drop if condition is met
   • nbtEntityDropChance - Drop chance for NBT-specific drop
   • nbtEntityDropMin   - Minimum amount for NBT drop
   • nbtEntityDropMax   - Maximum amount for NBT drop

   Use Cases:
   - MMORPG mobs with level/health requirements
   - Boss mobs with phase-based drops
   - Custom modded entities with special data
   - Equipment-based conditional drops

2. PLAYER REQUIREMENTS
   Require specific player conditions:
   • requiredAdvancement - Player must have advancement
   • requiredEffect      - Player must have potion effect
   • requiredEquipment   - Player must have item equipped

3. ENVIRONMENTAL CONDITIONS
   Require specific world conditions:
   • requiredWeather    - "clear", "rain", or "thunder"
   • requiredTime       - "day", "night", "dawn", or "dusk"
   • requiredDimension  - Dimension ID (e.g., "minecraft:the_nether")
   • requiredBiome      - Biome ID (e.g., "minecraft:desert")

4. COMMAND EXECUTION
   Execute commands when drops occur:
   • command            - Command to execute on entity death
   • commandChance      - Percentage chance to execute (default: 100)
   • dropCommand        - Command to execute only when item drops
   • dropCommandChance  - Percentage chance for drop command (default: 100)
   • commandCoolDown    - Cooldown in seconds between executions

5. EXTRA VANILLA DROPS
   Increase vanilla drop quantities:
   • extraDropChance    - Percentage chance for extra drops (0-100)
   • extraAmountMin     - Minimum extra amount
   • extraAmountMax     - Maximum extra amount

6. MOD COMPATIBILITY
   Control which mods can trigger drops:
   • allowModIDs        - Array of allowed mod IDs
                          Empty array = all mods allowed

DROP COUNTING SYSTEM (Event Drops Only)
----------------------------------------
Track player statistics for competitive events:

Setup:
  1. Add "enableDropCount": true to drop configurations
  2. Enable event: /lootdrops event <name> on
  3. Enable counting: /lootdrops dropcount true
  4. Drop_Count.json is created automatically

Commands:
  • /lootdrops dropcount true/false  - Toggle drop counting
  • /lootdrops dropcount reset       - Reset all statistics
  • /lootdrops top [count]           - Global leaderboard
  • /lootdrops eventtop <event> [n]  - Event-specific leaderboard
  • /lootdrops playerstats <player>  - Player statistics
  • /lootdrops alltop                - Comprehensive leaderboard

Drop_Count.json Structure:
{
  "players": {
    "<uuid>": {
      "playerName": "PlayerName",
      "totalDrops": 15,
      "itemCounts": {
        "minecraft:diamond": 10,
        "minecraft:emerald": 5
      },
      "lastUpdated": "2024-01-15T10:30:00Z"
    }
  },
  "summary": {
    "totalItems": 15,
    "totalPlayers": 1,
    "itemBreakdown": {
      "minecraft:diamond": 10,
      "minecraft:emerald": 5
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}

NESTED FOLDER ORGANIZATION
--------------------------
Both Normal Drops/Mobs/ and Event Drops/[Event]/Mobs/ support unlimited
folder nesting for organization:

Examples:
  • Mobs/vanilla/undead/zombie_variants.json
  • Mobs/modded/thermal_expansion/machines.json
  • Mobs/by_biome/nether/nether_mobs.json
  • Mobs/by_difficulty/hard/elite_drops.json
  • Mobs/nbt_conditions/mmorpg/high_level.json
  • Mobs/events/competition/tier1/common.json

All .json files in any subfolder are automatically loaded.

FILE MANAGEMENT
---------------

Auto-Regenerating Files:
  • Global_Hostile_Drops.json - Regenerates if deleted

Safe to Delete:
  • All *_Example.json files
  • All .example files (reference documentation)
  • Custom .json files you create

Auto-Generated:
  • Drop_Count.json files (when drop counting is enabled)

Disabling Drops Without Deletion:
  1. Empty file: Replace content with []
  2. Zero chance: Set "dropChance": 0 and "nbtEntityDropChance": 0
  3. Rename: Change .json to .json.disabled
  4. For events: Use /lootdrops event <name> off

COMMANDS
--------
Configuration:
  • /lootdrops reload                    - Reload all configurations
  • /lootdrops event <name> on/off       - Toggle event
  • /lootdrops event list                - List all events
  • /lootdrops dropcount true/false      - Toggle drop counting
  • /lootdrops dropcount reset           - Reset statistics

Statistics:
  • /lootdrops top [count]               - Global leaderboard
  • /lootdrops eventtop <event> [count]  - Event leaderboard
  • /lootdrops playerstats <player>      - Player statistics
  • /lootdrops alltop                    - All events leaderboard

EXAMPLES
--------

Basic Drop:
{
  "itemId": "minecraft:diamond",
  "dropChance": 5.0,
  "minAmount": 1,
  "maxAmount": 3
}

NBT Condition Drop (MMORPG mob level check):
{
  "itemId": "minecraft:air",
  "dropChance": 0.0,
  "minAmount": 0,
  "maxAmount": 0,
  "nbtEntityData": "ForgeCaps.mmorpg:entity_data.level",
  "nbtDataCondition": ">",
  "nbtDataValue": "50",
  "nbtEntityDrop": "minecraft:nether_star",
  "nbtEntityDropChance": 100.0,
  "nbtEntityDropMin": 1,
  "nbtEntityDropMax": 1
}

Conditional Drop with Requirements:
{
  "itemId": "minecraft:emerald",
  "dropChance": 10.0,
  "minAmount": 1,
  "maxAmount": 5,
  "requiredWeather": "thunder",
  "requiredTime": "night",
  "requiredBiome": "minecraft:plains"
}

Event Drop with Counting:
{
  "itemId": "minecraft:gold_ingot",
  "dropChance": 15.0,
  "minAmount": 2,
  "maxAmount": 4,
  "enableDropCount": true
}

TROUBLESHOOTING
---------------
• Drops not working: Check console for JSON parsing errors
• NBT conditions failing: Use /data get entity to verify NBT paths
• Drop counting not working: Only works in Event Drops, not Normal Drops
• File not loading: Ensure .json extension and valid JSON syntax
• Event not active: Use /lootdrops event <name> on

BEST PRACTICES
--------------
• Use .example files as reference, don't edit them directly
• Organize Mobs/ folders by mod, biome, or difficulty
• Test drop chances on test server before production
• Use comments ("_comment") to document complex configurations
• Back up configurations before major changes
• Use /lootdrops reload instead of restarting server
• For competitions, reset drop counts before each event

SUPPORT
-------
For detailed examples and documentation:
• Review .example files in each directory
• Check Normal Drops/README.txt
• Check Event Drops/README.txt
• Examine example JSON files in Mobs/ folders

================================================================================
