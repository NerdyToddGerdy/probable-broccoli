# This is a sample Python script.

import sys
# Press ⇧⌘F11 to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
from random import randint, choice
from typing import List

from Player import Player, create_enemy_name


def random_damage(pidx: int) -> int:
    """
    Calculates how much damage is done in battle
    :param pidx: int : player's ID in the player list
    :return:
    """
    return randint(player_list[pidx].min_damage, player_list[pidx].max_damage)


def select_opponent_index(p_list: List[Player], p_index: int) -> int:
    """
    Grabs a random index number from the p_index that isn't on the same team.
    :param p_list: List[Player]: A list of the Player objects
    :param p_index: int: the current player's index
    :return: int: return the id of the randomly selected player
    """

    return choice([idx for idx in range(0, len(p_list)) if p_list[idx].team != player_list[p_index].team])


def attack(o_index: int, p_index: int):
    """
    Attack the opposing player. If player is defeated, remove player.  If only one team remains, end battle.
    :param o_index: int: enemy index
    :param p_index: int: player's index
    """
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

    teams: List[List[Player]] = [
        [j for j in player_list if j.team == t_name] for t_name in {x.team for x in player_list}
    ]

    while True:
        for i, p in enumerate(player_list):
            opp_index: int = select_opponent_index(player_list, i)
            attack(opp_index, i)