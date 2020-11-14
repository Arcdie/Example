npm i<br>
npm run dev<br>
<br>
<br>
GET https://localhost:3000/api/notifications/5fafe85e20139987e9c11ded<br>
Отдаст все оповещения пользователя<br>
<br>
POST https://localhost:3000/api/notifications<br>
Создаcт новое оповещение для всех или для одного<br>
<br>
{<br>
  typeNotification: Number,<br>
  headline: String,<br>
  description: String<br>
}<br>
