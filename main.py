# This is a sample Python script.

import sys
# Press ⇧⌘F11 to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
from random import randint, choice
from typing import List

from Player import Player


def random_damage(pidx: int) -> int:
    return randint(player_list[pidx].min_damage, player_list[pidx].max_damage)


def select_opponent_index(p_list: List[Player], p_index: int) -> int:
    # grab random number in length of list that isn't p_index
    return choice([idx for idx in range(0, len(p_list)) if p_list[idx].team != player_list[p_index].team])


def attack(o_index: int, p_index):
    opponent = player_list[o_index]
    round_damage: int = random_damage(p_index)
    print(f"{player_list[p_index].name} deal {round_damage} damage")
    opponent.health -= round_damage
    print(f"{opponent.name}'s health is {opponent.health}")
    if opponent.health < 1:
        print(f"{opponent.name} has been defeated")
        player_list.pop(o_index)
    current_teams = [[j for j in player_list if j.team == t_name] for t_name in {x.team for x in player_list}]
    if len(current_teams) == 1:
        print(f'Only Team {player_list[0].team} is left with {len(current_teams[0])} players')
        sys.exit()


enemy_adjectives: List[str] = "Addicted;Alarming;Addled;Agile;Aggressive;Apathetic;Angry;Antagonistic;Arch;Astute" \
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

enemy_nouns: List[str] = "IRegretzu;twigglesmang;zkill_hero;doogstream;steve".split(';')


def create_enemy_name() -> str:
    # Get Adjective from list
    adj = enemy_adjectives[randint(0, len(enemy_adjectives) - 1)]
    # Get Noun from list
    noun = enemy_nouns[randint(0, len(enemy_nouns) - 1)]
    return f"{adj} {noun}"


if __name__ == '__main__':

    player_list: List[Player] = [
        Player('Todd', "A", health=30),
    ]
    player_list[0].set_weapon(4, quality_level=5)
    player_list[0].view_inventory()
    enemy_count = randint(2, 5)
    for num in range(enemy_count):
        name: str = create_enemy_name()
        enemy_player = Player(name, 'B')
        player_list.append(Player(name, 'B'))

    teams: List[List[Player]] = [[j for j in player_list if j.team == t_name] for t_name in {x.team for x in player_list}]

    while True:
        # current_teams: List[List[Player]] = [[j for j in player_list if j.team == t_name] for t_name in
        #                              {x.team for x in player_list}]
        for i, p in enumerate(player_list):
            opp_index: int = select_opponent_index(player_list, i)
            attack(opp_index, i)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/

# TODO: Add docstrings
