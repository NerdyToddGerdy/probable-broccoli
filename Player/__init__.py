from Gear import Inventory, Weapon, get_random_name, get_quality, Armor


class Player:
    def __init__(self, name, team, health=10, max_damage=3, min_damage=1, level=1, xp=0):
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
        print(f"HELMET: {self.inventory.helmet.name}")
        print(f"CHEST: {self.inventory.chest.name}")
        print(f"WEAPON: {self.inventory.weapon.name}")
        print(f"WEAPON QUALITY: {get_quality(self.inventory.weapon.quality_level)}")
        print(f"MAX_DAMAGE: {self.max_damage}")
        print(f"BOOTS: {self.inventory.boots.name}")
        print(f"TRINKET: {self.inventory.trinket.name}")

    def set_weapon(self, level, quality_level: int = None):
        self.inventory.weapon = Weapon(level, quality_level=quality_level)
        self.set_damage()

    def set_damage(self):
        self.max_damage = self.inventory.weapon.damage

# TODO: Add docstrings
