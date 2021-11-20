# probable-broccoli
### AKA GerdyGame

[Todd Gerdy is streaming](https://www.twitch.tv/toadilicious) the development of this game on Twitch.

This game is inspired by [Clickpocalypse](http://minmaxia.com/clickpocalypse/). Check it out.  See also the developer's other apps at https://minmaxia.com/


To build my menus I used # https://pypi.org/project/simple-term-menu/

# Development Setup
## Mac
* Clone this repo, and `cd` into it
* Get [HomeBrew](https://brew.sh/) (The package manager MacOS should have)
* Ensure you have Python 3.10
```shell
brew install python@3.10
```
* Get pipx (The Python package manager for running python scripts in isolated environments)
```shell
    brew install pipx
    pipx ensurepath
 ```

* Get [Poetry](https://python-poetry.org/docs/) (Project package manager)
```shell
  pipx install poetry
  ```

* Use Poetry to install dependencies
```shell
poetry install
```

* Use Poetry to run the game
```shell
poetry run python main.py
```
