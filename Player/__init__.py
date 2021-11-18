from random import randint
from typing import List

from Gear import Inventory, Weapon, get_quality_name, Armor


class Player:
    def __init__(self, name: str, team: str, health=10, max_damage=3, min_damage=1, level=1, xp=0):
        """
        Create a character
        :param name: str: Name of the character
        :param team: str: team character is on
        :param health: Max health of character
        :param max_damage: Maximum damage character can inflict with current weapon
        :param min_damage: Minimum damage character can inflict with current weapon
        :param level: Current level of character
        :param xp: current xp of character
        """
        self.name: str = name
        self.health: int = health
        self.min_damage: int = min_damage
        self.max_damage: int = max_damage
        self.team: str = team
        self.inventory: Inventory = Inventory(chest=Armor(1))  # must have weapon, armor, helmet, boots, trinket
        self.level: int = level
        self.xp: int = xp
        self.next_level: int  # TODO: how to gain xp

    def view_inventory(self):
        """
        Prints current inventory information on screen
        """
        print(f"HELMET: {self.inventory.helmet.name}")
        print(f"CHEST: {self.inventory.chest.name}")
        print(f"WEAPON: {self.inventory.weapon.name}")
        print(f"WEAPON QUALITY: {get_quality_name(self.inventory.weapon.quality_level)}")
        print(f"MAX_DAMAGE: {self.max_damage}")
        print(f"BOOTS: {self.inventory.boots.name}")
        print(f"TRINKET: {self.inventory.trinket.name}")

    def set_weapon(self, level: int, quality_level: int = None):
        """
        Input current weapon
        :param level: int: level of weapon
        :param quality_level: int: quality level of weapon
        """
        self.inventory.weapon = Weapon(level, quality_level=quality_level)
        self.set_damage()

    def set_damage(self):
        """
        Set the max damage of character
        """
        self.max_damage = self.inventory.weapon.damage


ENEMY_ADJECTIVES: List[str] = "Addicted;Alarming;Addled;Agile;Aggressive;Apathetic;Angry;Antagonistic;Arch;Astute" \
                              ";Adversarial;Abhorrent;Abominable;Bloody;Brooding;Brave;Brazen;Broken;Base;Baleful" \
                              ";Confrontational;Clever;Cursed;Condemnable;Cryptic;Creepy;Craven;Caustic;Chaotic" \
                              ";Celestial;Dark;Dread;Disgruntled;Disgraced;Destitute;Disguised;Drunk;Dire;Dastardly" \
                              ";Disgusting;Disquieting;Dishonored;Depth " \
                              "Dwelling;Distinguished;Desperate;Detestable;Excommunicated;Excited;Enterprising;Eerie" \
                              ";Frost;Fire;Frightening;Forbidding;Fun-loving;Fiendish;Friendly;Fearsome;Furry;Fallen" \
                              ";Feeble;Frozen;Fabled;Fell;Futuristic;Frantic;Frenzied;Fearsome;Foreboding;Formidable" \
                              ";Forgotten;Ghoulish;Gruesome;Gloom;Horrendous;Hypnotized;Hateful;Improper;Impure" \
                              ";Impeccable;Intoxicated;Intolerable;Intelligent;Impolite;Imperfect;Incarcerated" \
                              ";Inflamed;Loathsome;Monumental;Menacing;Merciless;Massive;Magnanimous;Nightmarish" \
                              ";Organized;Orwellian;Ornery;Odious;Overqualified;Ostentatious;Opportunistic;Perilous" \
                              ";Predatory;Phase;Productive;Playful;Seductive;Scary;Spine-chilling;Special Needs;Soul " \
                              "Devouring;Sultry;Swollen;Serious;Secret;Shadow;Reptilian;Revolting;Repugnant" \
                              ";Threatening;Terrible;Troubling;Towering;Unhappy;Uncooperative;Unhealthy;Unhelpful" \
                              ";Untoward;Unholy;Unethical;Unprincipled;Unscrupulous;Undead;Were;Zombified".split(';')
# enemy_nouns: List[str] = "Angels;Adult Maggots;Archers;Accountants;Agents;Arsonists;Anteaters;Bunnies;Badgers;Boars
# ;Baboons;Bears;Bishops;Beetles;Basilisks;Bishops;Brigands;Bandits;Banshee;Beholders;Behemoths;Bugbears;Bigfoots
# ;Barbarians;Chickens;Cyclops;Chimeras;Crocodiles;Crickets;Chameleons;Donkeys;Dwarfs;Devils;Demigods;Demons;Dryads
# ;Executioners;Enchanters;Frogs;Fiends;Giant
# Ants;Ghosts;Gnomes;Goblins;Gophers;Giants;Gorgons;Griffins;Gargoyles;Ghouls;Golems;Harpies;Hydras;Hell
# Hounds;Hornets;Hostesses;Hags;Hippies;Iquanas;Kobolds;Kraken;Kelpies;Land Octopi;Lich
# Kings;Leviathans;Lizards;Librarians;Leeches;Lawyers;Lay
# Persons;Jabberwockies;Medusas;Manticores;Minotaurs;Mummies;Mimics;Mummies;Morticians;Mermaids;Mud Worms;Man
# Beasts;Mongrels;Nymphs;Nightshades;Necromancers;Ogres;Orcs;Phasms;Phantoms;Reapers;Snakes;Skeletons;Spiders;Slugs
# ;Students;Serpents;Sasquatch;Slimes;Skinheads;Silkies;Snipers;Sorcerers;Succubi;Sphinx;Toads;Trolls;Thieves
# ;Unicorns;Vampires;Weasels;Wombats;Wolves;Wasps;Weretoads;Werebeavers;Werewombats;Werefruitflies;Wizards;Warlocks
# ;Wargs;Wyverns;Wraiths;Witches;Warriors;Yetis;Zealots;Zombies".split(';')

ENEMY_NOUNS: List[str] = "IRegretzu;twigglesmang;zkill_hero;doogstream;steve".split(';')


def create_enemy_name() -> str:
    """
    Use Adjective list and noun list to create a name for the enemy
    :return: str: return a random enemy name
    """
    # Get Adjective from list
    adj = ENEMY_ADJECTIVES[randint(0, len(ENEMY_ADJECTIVES) - 1)]
    # Get Noun from list
    noun = ENEMY_NOUNS[randint(0, len(ENEMY_NOUNS) - 1)]
    return f"{adj} {noun}"