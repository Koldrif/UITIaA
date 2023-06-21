Необходимо написать бэкенд (на чём угодно, не обязательно JS) с регистрацией и авторизацией пользователя. Должны быть реализованы access и refresh токены.

Прикрутить это всё к фронтенду (на React) и добавить страницу, которая будет доступна только авторизованному пользователю (если пользователь не авторизован, то должно перекидывать на страницу авторизации)

##### Пароль и логин - admin

##### При вводе неверного пароля и логина ничего не произойдет (но по сути будет переброс обратно на страницу авторизации)

##### Главная страница
![alt-текст](https://github.com/anastasia-dushanova/frontend/blob/main/main.png "Главная страница")

##### Успешная авторизация. Отображение имени пользователя, кнопки выхода из аккаунта, обновления профиля (чтобы оставаться на странице, т.к. время жизни accessToken 20 сек)
##### стала доступен контент для авторизованных пользователей Dashboard
![alt-текст](https://github.com/anastasia-dushanova/frontend/blob/main/auth.png "Успешный вход")

##### refreshToken хранится в куки при успешной авторизации
![alt-текст](https://github.com/anastasia-dushanova/frontend/blob/main/cookie.png "refreshToken")

##### Если разлогиниться, перебросят на главную страницу, и из куки удалиться refreshToken
![alt-текст](https://github.com/anastasia-dushanova/frontend/blob/main/logout.png "Выход из аккаунта")