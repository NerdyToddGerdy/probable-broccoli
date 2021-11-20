import os.path
import random

import yaml


def get_random_gear(category: str = "Armor") -> str:
    """
    Get a string representing a random piece of gear

    :param category: Type of item you wish to get [Weapon, Head, Body, Foot, Trinket]
    :return: String representing a random type of gear of a given category
    """
    _location = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(_location, 'adjectives.yaml'), 'r') as adj_fh:
        adj_list = yaml.safe_load(adj_fh)
    with open(os.path.join(_location, 'nouns.yaml'), 'r') as noun_fh:
        noun_dict = yaml.safe_load(noun_fh)
    adj = random.choice(adj_list)
    noun = random.choice(noun_dict.get(category, ['Item']))
    return f"{adj} {noun}"


def get_quality_name(quality_level: int) -> str:
    """
    Retrieve the quality name from the quality switcher
    :param quality_level: int: switch case quality level
    :return: str: the quality name of the switch case
    """
    _location = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(_location, 'quality.yaml'), 'r') as qual_fh:
        quals = yaml.safe_load(qual_fh)
        return random.choice([quality.get('name', 'Mysterious')
                              for quality in quals
                              if quality.get('value', 1) == quality_level])


class Item:
    def __init__(self, level: int, stat: str, quality_level: int = 1):
        """
        Creates an Item
        :param level: int: current level of Collected Item
        :param quality_level: int: quality of the gear piece being created
        """
        self.name: str = get_random_gear()
        self.quality_level: int = quality_level
        self.quality_name: str = get_quality_name(quality_level)
        self.stat: str = stat
        self.level: int = level
        self.stat_number: int = self.calculate_stat()

    def calculate_stat(self) -> int:
        """
        Calculates the stat point of an Item
        :return: int: Returns the value of calculated damage
        """
        return self.level * self.quality_level


class Weapon(Item):
    def __init__(self, level: int, quality_level: int = 1):
        """
        Creates a Weapon Item
        :param level: int: current level of weapon
        :param quality_level: int: quality of the gear piece being created
        """
        super().__init__(level, stat='damage', quality_level=quality_level)
        self.name = get_random_gear('Weapon')


class Armor(Item):
    def __init__(self, level: int, location: str = 'Body', quality_level: int = 1):
        """
        Creates an Armor Item
        :param level: int: current level of Armor
        :param location: str: Where the armor is to be worn ['Head', 'Body', 'Foot']
        :param quality_level: int: quality of the armor piece being created
        """
        super().__init__(level, stat='armor', quality_level=quality_level)
        self.name = get_random_gear(location)


class Trinket(Weapon):
    def __init__(self, level: int, quality_level: int = 1):
        """
        Create a Trinket Item which can be used as a weapon
        :param level: current level of weapon
        :param quality_level: quality of the item being created
        """
        super().__init__(level=level, quality_level=quality_level)
        self.name = get_random_gear('Trinket')


class Inventory:
    def __init__(self, weapon=Weapon(1), chest=Armor(1, 'Body'), helmet=Armor(2, 'Head'),
                 boots=Armor(3, 'Foot'), trinket=Trinket(4)):
        """
        Creates an inventory list
        :param weapon: Weapon: Weapon to be used - default: random level 1 Weapon
        :param chest:  Armor: Chest piece used by character - default: random level 1 Armor piece
        :param helmet: Armor: Head piece used by character - default: random level 1 Armor piece
        :param boots: Armor: Boot piece used by the character - default: random level 1 Armor piece
        :param trinket: Trinket: Item piece used by the character - default: random level 1 Item piece
        """
        self.weapon: Weapon = weapon
        self.chest: Armor = chest
        self.helmet: Armor = helmet
        self.boots: Armor = boots
        self.trinket: Trinket = trinket

    # TODO: use the players class to choose type of Item,
