[![Build status](https://ci.appveyor.com/api/projects/status/o2iahyyooqf1yg0y/branch/main?svg=true)](https://ci.appveyor.com/project/marinaustinovich/ahj-homeworks-events-game-with-goblins/branch/main)


### Игра с гоблинами

![](./pic/GracefulMiniatureBustard-small.gif)

#### Легенда

1. Гоблин появляется в рандомной точке — набор точек фиксирован — ровно на 1 секунду.
2. Если пользователь успел за это время кликнуть на этой точке, то:
    * пользователю засчитывается +1 балл,
    * гоблин пропадает из ячейки.
3. Если пользователь пропустил 5 появлений гоблинов, игра завершается.

Всё собирается через Webpack и выкладываться на GitHub Pages через CI.
