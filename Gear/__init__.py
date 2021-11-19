from random import randint
from typing import List

GEAR_ADJECTIVE_LIST: List[str] = "Ancient Archaic Astral Aged Antiquated Blessed Corrupt Devilish Evil Hallowed " \
                                   "Holy Ethereal Forgotten Forbidden Heirloom Mystic Malevolent Rare Spectral " \
                                   "Seraphic Sanctified Treasured Timeworn Unusual Unique Wicked".split(' ')

GEAR_NAME_LIST: List[str] = "Amulet;Bones;Bracelet;Book;Coin;Chalice;Claw;Charm;Carving;Diadem;Dagger;Etching" \
                              ";Emblem;Figurine;Gold " \
                              "Tooth;Goblet;Earring;Horn;Idol;Knife;Mask;Necklace;Parchment;Pottery;Scroll;Skull" \
                              ";Stein;Totem;Trinket;Talisman;Vial;Vase".split(';')

# TODO: Figure out how to split this up by gear type.


def wretched():
    return "Wretched"


def garbage():
    return "Garbage"


def pathetic():
    return "Pathetic"


def flawed():
    return "Flawed"


def lesser():
    return "Lesser"


def inferior():
    return "Inferior"


def plain():
    return "Plain"


def common():
    return "Common"


def standard():
    return "Standard"


def refined():
    return "Refined"


def premium():
    return "Premium"


def superior():
    return "Superior"


def pristine():
    return "Pristine"


def perfect():
    return "Perfect"


def flawless():
    return "Flawless"


def heroic():
    return "Heroic"


def historic():
    return "Historic"


def fabled():
    return "Fabled"


def mythical():
    return "Mythical"


def sublime():
    return "Sublime"


def sacred():
    return "Sacred"


def glorius():
    return "Glorious"


def divine():
    return "Divine"


def godlike():
    return "Godlike"


def immortal():
    return "Immortal"


def eternal():
    return "Eternal"


def ethereal():
    return "Ethereal"


def astral():
    return "Astral"


def celestial():
    return "Celestial"


def cosmic():
    return "Cosmic"


def galactic():
    return "Galactic"


def transcendent():
    return "Transcendent"


def unique():
    return "Unique"


def default():
    return "ERROR"


quality_switcher = {
    1: wretched,
    2: garbage,
    3: pathetic,
    4: flawed,
    5: lesser,
    6: inferior,
    7: plain,
    8: common,
    9: standard,
    10: refined,
    11: premium,
    12: superior,
    13: pristine,
    14: perfect,
    15: flawless,
    16: heroic,
    17: historic,
    18: fabled,
    19: mythical,
    20: sublime,
    21: sacred,
    22: glorius,
    23: divine,
    24: godlike,
    25: immortal,
    26: eternal,
    27: ethereal,
    28: astral,
    29: celestial,
    30: cosmic,
    31: galactic,
    32: transcendent,
    40: unique
}


def get_quality_name(quality_level: int) -> str:
    """
    Retrieve the quality name from the quality switcher
    :param quality_level: int: switch case quality level
    :return: str: the quality name of the switch case
    """
    return quality_switcher.get(quality_level, default)()


def get_random_gear_name() -> str:
    """
    Creates and returns a gear name with an adjective and a noun
    :return: str: random gear name
    """
    adj = GEAR_ADJECTIVE_LIST[randint(0, len(GEAR_ADJECTIVE_LIST) - 1)]
    noun = GEAR_NAME_LIST[randint(0, len(GEAR_NAME_LIST) - 1)]
    return f"{adj} {noun}"


class Item:
    def __init__(self, level: int, stat: str, quality_level: int = 1):
        """
        Creates an Item
        :param level: int: current level of Collected Item
        :param quality_level: int: quality of the gear piece being created
        """
        self.name: str = get_random_gear_name()
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
    def __init__(self, level: int, quality_level=1):
        """
        Creates a Weapon Item
        :param level: int: current level of weapon
        :param quality_level: int: quality of the gear piece being created
        """
        super().__init__(level, stat='damage', quality_level=quality_level)


class Armor(Item):
    def __init__(self, level: int, quality_level=1):
        """
        Creates an Armor Weapon
        :param level: int: current level of Armor
        :param quality_level: int: quality of the armor piece being created
        """
        super(Armor, self).__init__(level, stat='armor', quality_level=quality_level)


class Inventory:
    def __init__(self, weapon=Weapon(1), chest=Armor(1), helmet=Armor(2), boots=Armor(3), trinket=Weapon(4)):
        """
        Creates an inventory list
        :param weapon: Weapon: Weapon to be used - default: random level 1 Weapon
        :param chest:  Armor: Chest piece used by character - default: random level 1 Armor piece
        :param helmet: Armor: Head piece used by character - default: random level 1 Armor piece
        :param boots: Armor: Boot piece used by the character - default: random level 1 Armor piece
        :param trinket: Weapon: Item piece used by the character - default: random level 1 Item piece
        """
        self.weapon: Weapon = weapon
        self.chest: Armor = chest
        self.helmet: Armor = helmet
        self.boots: Armor = boots
        self.trinket: Weapon = trinket

    # TODO: use the players class to choose type of Item,
