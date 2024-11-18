const express = require('express');
const app = express();

let tasks = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const css = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    background-color: #f8e6e6; 
    color: #333;
    line-height: 1.6;
    margin: 20px; 
   }
   
   h1 {
    color: #c7458f; 
    text-align: center;
    margin-bottom: 30px;
   }
   
   h2 {
    color: #c7458f;
    margin-bottom: 10px;
    text-align: center;
   }
   
   #taskList {
    list-style: none;
    padding: 0;
   }
   
   #taskList li {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    display: flex; 
    align-items: center; 
   }
   
   #taskList li span {
    flex-grow: 1; 
    margin-right: 10px;
   }
   
   #taskList li .completed {
    text-decoration: line-through;
    color: #aaa;
   }
   
   #taskList li form {
    margin: 0;
   }
   
   #taskList li button {
    background-color: #c7458f;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 5px;
   }
   
   #taskList li button:hover {
    background-color: #a73a78;
   }
   
   form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
   }
   
   form input[type="text"] {
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    box-sizing: border-box;
   }
   
   form button[type="submit"] {
    background-color: #c7458f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
   }
   
   form button[type="submit"]:hover {
    background-color: #a73a78;
   }
  `;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Список задач</title>
      <style>${css}</style>
    </head>
    <body>
      <h1>Список задач</h1>
      <ul id="taskList">
        ${tasks
          .map(
            (task, index) => `
              <li>
                <span class="${task.completed ? 'completed' : ''}">${
              task.text
            }</span> 
                <form method="POST" action="/delete/${index}"><button type="submit">Удалить</button></form>
                <form method="POST" action="/toggle/${index}"><button type="submit">Отметить как выполненную</button></form>
              </li>
            `
          )
          .join('')}
      </ul>

      <h2>Добавить задачу</h2>
      <form method="POST" action="/add">
        <input type="text" name="task" placeholder="Введите задачу">
        <button type="submit">Добавить</button>
      </form>
    </body>
    </html>
  `);
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push({ text: task, completed: false });
  }
  res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

app.post('/toggle/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    tasks[index].completed = !tasks[index].completed;
  }
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
