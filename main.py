# This is a sample Python script.

import sys
# Press ⇧⌘F11 to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
from random import randint, choice
from typing import List

from Player import Player


def random_damage(pidx: int) -> int:
    return randint(1, player_list[pidx].max_damage)


def select_opponent_index(p_list: List[Player], p_index: int) -> int:
    # grab random number in length of list that isn't p_index
    return choice([idx for idx in range(0, len(p_list)) if p_list[idx].team != player_list[p_index].team])


def attack(o_index: int, p_index):
    opponent = player_list[o_index]
    round_damage: int = random_damage(p_index)
    print(f"{player_list[p_index].name} deals {round_damage} damage")
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
        Player('Bob', 'B'),
        Player('Regret', 'B'),
        Player('Steve', 'B')
    ]

    teams: List[List[Player]] = [[j for j in player_list if j.team == t_name] for t_name in {x.team for x in player_list}]

    while True:
        # current_teams: List[List[Player]] = [[j for j in player_list if j.team == t_name] for t_name in
        #                              {x.team for x in player_list}]
        for i, p in enumerate(player_list):
            opp_index: int = select_opponent_index(player_list, i)
            attack(opp_index, i)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
