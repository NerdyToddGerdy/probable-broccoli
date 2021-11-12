from Gear import Inventory, Weapon, get_random_name


class Player:
    def __init__(self, name, team, health=10, max_damage=3, min_damage=1):
        self.name: str = name
        self.health: int = health
        self.min_damage: int = min_damage
        self.max_damage: int = max_damage
        self.team: str = team
        self.inventory: Inventory = Inventory()  # must have weapon, armor, helmet, boots, trinket

    def view_inventory(self):
        print(f"HELMET: {self.inventory.helmet.name}")
        print(f"ARMOR: {self.inventory.armor.name}")
        print(f"WEAPON: {self.inventory.weapon.name}")
        print(f"BOOTS: {self.inventory.boots.name}")
        print(f"TRINKET: {self.inventory.trinket.name}")

    def set_weapon(self, quality=None, damage=None, name=get_random_name()):
        self.inventory.weapon = Weapon(quality=quality, damage=damage, name=name, )
