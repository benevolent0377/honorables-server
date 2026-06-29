Below is a consolidated export of the Honorables project based on everything we have established over the past several months. This is intended to serve as a high-level knowledge base for another coding/documentation agent. It omits obsolete decisions where possible and focuses on the current canonical architecture.

---

# Honorables

## Canonical Project Export (June 2026)

---

# Project Overview

Honorables is a heavily customized Minecraft Forge 1.20.1 cooperative RPG/server framework built primarily with KubeJS.

Its purpose is **not** to become another RPG modpack.

Instead, it attempts to transform Minecraft into a civilization simulator where:

* player specialization matters
* infrastructure matters
* production is the primary source of power
* quality is more important than rarity
* exploration creates opportunities rather than direct power
* progression is largely server-controlled rather than player-selected

Target player count:

* 1–8 concurrent players
* designed around cooperative multiplayer
* no MMORPG assumptions

---

# Core Design Philosophy

The project is built around several guiding principles.

## 1. Production > Loot

Players should become stronger primarily because they create better goods rather than because monsters drop stronger equipment.

Loot provides:

* materials
* rare components
* knowledge
* progression items

rather than complete endgame equipment.

---

## 2. Civilization over Individualism

Players are expected to become specialists.

Examples:

* Miner
* Warrior
* Naturalist
* Mage
* Adventurer

Each class fills an important niche within settlements.

---

## 3. Long-Term Progression

Progression is intentionally slow.

Players should:

* build infrastructure
* improve settlements
* explore
* increase production quality

rather than immediately rushing bosses.

---

## 4. Horizontal Growth

Traits, quality, abilities, infrastructure, equipment and professions all grow together.

No single progression system dominates.

---

# Technology Stack

Minecraft Forge 1.20.1

Major technologies:

* KubeJS
* MoreJS
* LootJS
* GameStages
* ItemStages
* RecipeStages
* Puffish Skills
* Puffish Attributes
* FTB Quests
* FTB Teams

---

# Major Gameplay Systems

The entire project consists of several major frameworks.

---

## Player Framework

Responsible for:

traits

abilities

classes

progression

persistent player history

runtime data

temporary effects

---

## World Framework

Responsible for:

regional quality

world progression

structures

resource generation

dungeons

exploration

---

## Industry Framework

Responsible for:

Immersive Engineering integration

quality preservation

production chains

processing losses

---

## Item Framework

Responsible for:

quality

perks

equipment penalties

crafting

Tetra integration

enchanting

---

## Progression Framework

Responsible for:

Puffish Skills

GameStages

FTB Quests

ability unlocks

subclasses

---

# Canonical Mod List

Core progression:

* KubeJS
* MoreJS
* LootJS
* Puffish Skills
* Puffish Attributes
* GameStages
* ItemStages
* RecipeStages
* FTB Quests
* FTB Teams

Terrain:

* Terralith
* Tectonic
* Regions Unexplored

Industry:

* Immersive Engineering

Equipment:

* Tetra
* ESO (Enchanting System Overhaul)

Combat:

* Iron's Spellbooks
* Brutal Bosses
* Legendary Monsters
* Born in Chaos
* L_Ender's Cataclysm

Dungeons:

* Dungeon Crawl
* Claustrophobic Dungeons
* Lootr
* Respawning Structures

Misc:

* Diet

Apotheosis has been removed.

EnchantJS has been removed.

---

# Player Classes

Five primary classes.

## Warrior

Generalist branches:

Combat

Defense

Tactics

Subclasses:

Warden removed.

Current subclasses:

Skirmisher

(two additional subclasses planned)

---

## Mage

Uses Iron's Spellbooks.

Honorables does NOT replace spellcasting.

Honorables controls:

spell access

passives

progression

GameStages

subclass identity

traits

---

## Miner

Subclasses:

Prospector

Blacksmith

Quarryman

---

## Naturalist

Formerly Farmer.

Subclasses include:

Farmer

Rancher

(one additional planned)

---

## Adventurer

Formerly Explorer.

Exploration-oriented.

Dungeon support.

Surveying.

Navigation.

---

# Puffish Skills Architecture

Puffish Skills is purely the frontend progression tree.

Backend logic remains inside KubeJS.

Tree layout:

Root

↓

Three Generalist Branches

↓

7 mandatory tiers

↓

Subclass selection

↓

Large subclass trees

↓

Mastery

Generalist branches are mandatory.

Every player completes all three branches before specializing.

---

# Skill Philosophy

Generalist trees teach fundamentals.

Subclass trees create identity.

Subclass trees are significantly larger.

Branch investment increases opportunity cost instead of hard-locking alternatives.

---

# Ability System

Custom framework.

Mage is the only exception.

Pipeline:

Ability

↓

Create Context

↓

Apply Augments

↓

Behavior.execute()

↓

Commit

Execution Context is temporary.

Behaviors never access player state directly.

Everything needed is inside Context.

After execution:

Context is discarded.

---

# Ability Components

Ability

Behavior

Augment

Execution Context

Runtime

Effects

Triggers

Cooldowns

Charges

---

# Ability Storage

Player NBT

```
honorables.abilities
```

Unlocked abilities:

```
honorables.abilities.<ability_id>
```

Presence means unlocked.

---

# Runtime Ability Storage

Pending runtime effects

```
honorables.abilities.$runtime.pending
```

Grouped by trigger type.

Example

```
pending

    onHit

        bleed

        fire

    onKill

        berserk

    onBlockBreak

        excavation
```

This organization exists because KubeJS events naturally dispatch by trigger.

---

# Trait System

Traits are the primary progression layer.

Attributes remain secondary.

Traits determine:

requirements

equipment penalties

abilities

progression

attribute scaling

quality bonuses

---

## Trait Structure

Each trait contains

base

active

modifier array

Example

```
honorables.traits.strength

    base

    active

    modifiers[]
```

---

## Active Value Rules

If modifier list is empty:

```
active = null
```

Consumers use:

base

otherwise

active

This prevents unnecessary recalculation.

---

# Trait Sources

Canonical factor categories:

vanilla_stats

player_events

player_history

stages

These replaced older naming.

---

# Player History

Persistent counters stored under

```
honorables.history
```

Examples:

boss kills

items forged

quality produced

quality lost

quality preserved

regions surveyed

structures discovered

etc.

These exist primarily for trait calculations.

---

# Quality Framework

The quality system is one of the central mechanics.

Quality exists only on items.

Stored as

```
honorables.quality
```

Float value.

Minimum:

1.00

---

## Quality Principles

Quality never increases continuously.

Instead it is calculated only during transformations.

Examples:

crafting

smelting

forging

repair

enchanting

processing

---

## Realization Principle

Quality can only:

be preserved

or

be diminished

after realization.

---

## Workability

Higher quality items retain greater potential during later transformations.

Late-game systems amplify this.

---

# Regional Quality

World quality is deterministic.

Uses Voronoi regions.

Each region contains capitals.

Categories include:

geological

botanical

agricultural

faunal

cultural/arcane

Distance from spawn increases average quality.

Nether and End use independent regional networks.

---

# Equipment Philosophy

Equipment progression comes from:

quality

Tetra modularity

perks

enchantments

traits

not random rarity.

---

# Equipment Penalties

Equipment requirements use:

base traits.

Penalties reduce:

active traits

attributes

or apply effects.

This prevents equipment lockouts while still discouraging misuse.

---

# Item Perks

Separate from player abilities.

Stored on equipment.

NBT-driven.

Passive.

Blacksmith specializes in physical perks.

Enchanter specializes in magical enhancements.

---

# Enchanting

Uses ESO.

Not Apotheosis.

Quality affects:

availability

maximum power

effectiveness

rather than replacing vanilla mechanics.

---

# Immersive Engineering Integration

Immersive Engineering forms the industrial backbone.

Primitive crafting preserves quality.

Primitive furnaces lose quality.

Industrial infrastructure minimizes loss.

Power progression is:

quality

*

infrastructure

not automation alone.

---

# Dungeon Philosophy

Dungeons exist primarily for:

materials

boss components

knowledge

exploration

not full equipment.

Structures regenerate using Respawning Structures.

Lootr provides per-player rewards.

---

# Boss Roles

Brutal Bosses

vanilla elite replacements

Legendary Monsters

hand-crafted encounters

Born in Chaos

roaming threats

Cataclysm

late-game pinnacle bosses

---

# Exploration

Exploration contributes to:

player history

traits

regional knowledge

quality discovery

future production

rather than raw combat power.

---

# Diet

Diet is dynamically controlled.

Food effects depend upon:

ingredients

nutrition

quality

rather than static item lists.

---

# Canonical File Organization

```
server_scripts

    honorables

        core

        player

            abilities

            augments

            behaviors

            runtime

            effects

        progression

        world

        items

        industry

        loot

        food

        integrations

        events

        utils
```

---

# Current Development Status

The current implementation roadmap is:

1.

Player framework

NBT

traits

runtime

commands

2.

Ability framework

contexts

behaviors

augments

runtime

3.

Progression integration

GameStages

Puffish Skills

FTB Quests

4.

Quality backend

regional quality

transformation logic

5.

World systems

exploration

dungeons

loot

6.

Industry integration

Immersive Engineering

7.

Equipment

perks

Tetra

ESO

8.

Diet

9.

Balancing

---

# Coding Philosophy

The project prioritizes:

* event-driven architecture over polling
* modular systems with explicit interfaces
* backend/frontend separation (KubeJS backend, Puffish Skills/FTB Quests frontend)
* data-oriented NBT storage
* deterministic world generation where practical
* composition over inheritance for abilities (Ability → Context → Augments → Behavior)
* trigger-first runtime organization for performance
* stable interfaces between player, world, industry, and progression systems

---

# Long-Term Vision

Honorables is intended to be a server framework rather than a conventional modpack. The end goal is a cohesive simulation in which player specialization, regional resources, infrastructure, production quality, exploration, and long-term progression interact to create an emergent economy and cooperative gameplay loop. Combat remains important, but it is one subsystem among many rather than the central source of progression.
