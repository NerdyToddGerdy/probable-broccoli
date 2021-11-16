from random import randint
from typing import List

GEAR_ADJECTIVE_LIST: List[str] = "Ancient Archaic Astral Aged Antiquated Blessed Corrupt Devilish Evil Hallowed " \
                                   "Holy Ethereal Forgotten Forbidden Heirloom Mystic Malevolent Rare Spectral " \
                                   "Seraphic Sanctified Treasured Timeworn Unusual Unique Wicked".split(' ')

GEAR_NAME_LIST: List[str] = "Amulet;Bones;Bracelet;Book;Coin;Chalice;Claw;Charm;Carving;Diadem;Dagger;Etching" \
                              ";Emblem;Figurine;Gold " \
                              "Tooth;Goblet;Earring;Horn;Idol;Knife;Mask;Necklace;Parchment;Pottery;Scroll;Skull" \
                              ";Stein;Totem;Trinket;Talisman;Vial;Vase".split(';')


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


def get_quality(quality_level):
    return quality_switcher.get(quality_level, default)()


def get_random_name() -> str:
    adj = GEAR_ADJECTIVE_LIST[randint(0, len(GEAR_ADJECTIVE_LIST) - 1)]
    noun = GEAR_NAME_LIST[randint(0, len(GEAR_NAME_LIST) - 1)]
    return f"{adj} {noun}"


class Item:
    def __init__(self, level: int, quality_level: int = 1, armor=0):
        self.name: str = get_random_name()
        self.quality_level: int = quality_level
        self.armor: int = armor
        self.level: int = level


class Weapon(Item):
    def __init__(self, level: int, quality_level=1):
        super().__init__(level, quality_level=quality_level)
        self.damage = self.calculate_damage()
        self.quality_name = get_quality(quality_level)

    def calculate_damage(self) -> int:
        return self.level * self.quality_level


class Armor(Item):
    def __init__(self, level: int, quality_level=1):
        super(Armor, self).__init__(level, quality_level=quality_level)
        self.armor = self.calculate_armor()
        self.quality_name = get_quality(quality_level)

    def calculate_armor(self):
        return self.quality_level * self.level


class Inventory:
    def __init__(self, weapon=Weapon(1), chest=Armor(1), helmet=Armor(2), boots=Armor(3), trinket=Item(4)):
        self.weapon: Weapon = weapon
        self.chest: Armor = chest
        self.helmet: Armor = helmet
        self.boots: Armor = boots
        self.trinket: Item = trinket

# TODO: Add docstrings
