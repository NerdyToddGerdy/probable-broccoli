# This is a sample Python script.
import sys
# Press ⇧⌘F11 to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
from random import randint, choice
from typing import List

from simple_term_menu import TerminalMenu

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


def attack(o_index: int, p_index: int, is_battle: bool):
    """
    Attack the opposing player. If player is defeated, remove player.  If only one team remains, end battle.
    :param is_battle: Checks if the battle is over
    :param o_index: int: enemy index
    :param p_index: int: player's index
    """
    # get opponent info
    opponent = player_list[o_index]
    # get damage amount
    round_damage: int = random_damage(p_index)
    # deal damage
    print(f"{player_list[p_index].name} deal {round_damage} damage")
    opponent.current_health -= round_damage
    print(f"{opponent.name}'s health is {opponent.current_health}")
    # Check if opponent survived
    if opponent.current_health < 1:
        if opponent.team == 'A':
            print(f"{opponent.name} has fainted")
            opponent.current_health = 0
        else:
            print(f"{opponent.name} has been defeated")
            player_list.pop(o_index)

    # Check if other teams are around
    # current_teams = [[j for j in player_list if j.team == t_name] for t_name in {x.team for x in player_list}]
    # if len(current_teams) == 1:
    #     print(f'Only Team {player_list[0].team} is left with {len(current_teams[0])} players')
    #     is_battle = False


player_list: List[Player] = []


def get_xp(enemy_count: int, enemy_level: int) -> int:
    return enemy_count * enemy_level


def battle():
    # TODO: At beginning of battle, reset player list

    # Get Player
    # Calculate the number of enemies for the battle
    enemy_count = randint(2, 5)
    enemy_level = 1
    for num in range(enemy_count):
        name: str = create_enemy_name()
        player_list.append(Player(name, 'B', level=enemy_level))

    is_battle: bool = True

    xp = get_xp(enemy_count, enemy_level)
    while is_battle:

        # For each player in the player list, attack an opponent
        for i, p in enumerate(player_list):
            # Check if other teams are around
            print(f"##### {p.name}'s turn #####")
            # TODO: figure out how to handle the list of player lists can be less than 2 if team A cannot be deleted.
            current_teams = [[j for j in player_list if j.team == t_name] for t_name in
                             {x.team for x in player_list if x.current_health > 0}]
            if len(current_teams) == 1:
                if current_teams[0][0].team == 'A':
                    print(f'You Survived an encounter with {enemy_count} baddies for {xp} experience points')
                print(f'Only Team {player_list[0].team} is left with {len(current_teams[0])} players')
                player_list[0].add_xp(xp)
                is_battle = False
                break
            else:
                opp_index: int = select_opponent_index(player_list, i)
                if p.current_health > 0:
                    attack(opp_index, i, is_battle)
                else:
                    print(f"{p.name} has fainted and cannot attack")

    # Create Enemies
    # Start Battle
    # Add delay between rounds
    # Check if battle is over.
    pass


def main_menu():
    options = ["Player stats", "Inventory", "Battle", "Quit"]
    terminal_menu = TerminalMenu(options)
    menu_entry_index = terminal_menu.show()
    print(f"You have selected {options[menu_entry_index]}!")
    if menu_entry_index == 0:
        player_list[0].view_player_stats()
    elif menu_entry_index == 1:
        player_list[0].view_inventory()
    elif menu_entry_index == 2:
        battle()
    elif menu_entry_index == 3:
        print("Buh Bye!")
        sys.exit(1)


def start():
    # Game starts
    player_name = input("Hello Player! What is your name? \n")
    # Create a player. Give him a weapon
    player_list.append(
        Player(player_name, "A", health=30)
    )
    player_list[0].set_weapon(4, quality_level=5)
    while True:
        main_menu()




if __name__ == '__main__':
    start()
