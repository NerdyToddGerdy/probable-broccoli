from random import randint
from typing import List

WEAPON_ADJECTIVE_LIST: List[str] = "Ancient Archaic Astral Aged Antiquated Blessed Corrupt Devilish Evil Hallowed Holy Ethereal Forgotten Forbidden Heirloom Mystic Malevolent Rare Spectral Seraphic Sanctified Treasured Timeworn Unusual Unique Wicked".split(' ')
WEAPON_NAME_LIST: List[str] = "Amulet;Bones;Bracelet;Book;Coin;Chalice;Claw;Charm;Carving;Diadem;Dagger;Etching;Emblem;Figurine;Gold Tooth;Goblet;Earring;Horn;Idol;Knife;Mask;Necklace;Parchment;Pottery;Scroll;Skull;Stein;Totem;Trinket;Talisman;Vial;Vase".split(';')


def get_random_name() -> str:
    adj = WEAPON_ADJECTIVE_LIST[randint(0, len(WEAPON_ADJECTIVE_LIST) - 1)]
    noun = WEAPON_NAME_LIST[randint(0, len(WEAPON_NAME_LIST) - 1)]
    return f"{adj} {noun}"


class Item:
    def __init__(self, name: str = 'empty', quality: str = 'empty', damage: int = 1, armor=0):
        self.name: str = name
        self.quality: str = quality
        self.damage: int = damage
        self.armor: int = armor
        # TODO: Add level for calculating damage


class Weapon(Item):
    def __init__(self, name=get_random_name(), quality='test', damage=1,):
        super().__init__(name=name, quality=quality, damage=damage, armor=0)

    def calculate_damage(self):
        pass
        # TODO: using quality, and level, get damage amount


class Inventory:
    def __init__(self, weapon=Weapon(), armor=Item(), helmet=Item(), boots=Item(), trinket=Item()):
        self.weapon: Weapon = weapon
        self.armor: Item = armor
        self.helmet: Item = helmet
        self.boots: Item = boots
        self.trinket: Item = trinket
