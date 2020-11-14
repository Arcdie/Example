npm i<br>
npm run dev


GET https://localhost:3000/api/notifications/5fafe85e20139987e9c11ded
Отдаст все оповещения пользователя

POST https://localhost:3000/api/notifications
Создаcт новое оповещение для всех или для одного

{
  typeNotification: Number,
  headline: String,
  description: String
}
