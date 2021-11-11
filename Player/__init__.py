class Player:

    def __init__(self, name, team, health=10, max_damage=3):
        self.name: str = name
        self.health: int = health
        self.max_damage: int = max_damage
        self.team: str = team
