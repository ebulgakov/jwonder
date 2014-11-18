[jWonder]
=======

Это jQuery-плагин для публикации ваших скриншотов на сайте.

## Подключение
Подключите на вашей странице библиотеку:
```html
<link rel="stylesheet" href="/css/jwonder.css">
<script src="/js/vendor/jquery.js"></script>
<script src="/js/jwonder.js"></script>
```
Подключите плагин:
```javascript
$("a.wonder").jwonder();
```
Оно заработало!

## Пополнительные параметры
```javascript
$("a.wonder").jwonder({
  color: "#000000", -- цвет фона браузера
  shadow: "#000000", -- цвет тени
  aChannel: "0.8", -- альфа-канал для фона
  target: "_self" -- тип открытия ссылки
});
```

License
----

MIT

**Free Software, Hell Yeah!**


[jWonder]: http://wonderbrowser.ru/
