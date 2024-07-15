document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from local storage
    loadTasks();
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addTask(taskInput.value);
      taskInput.value = '';
    });
  
    taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-task')) {
        deleteTask(e.target.parentElement);
      } else if (e.target.classList.contains('edit-task')) {
        editTask(e.target.parentElement);
      } else if (e.target.tagName === 'LI') {
        toggleComplete(e.target);
      }
    });
  
    function addTask(task) {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(task));
      createButtons(li);
      taskList.appendChild(li);
      saveTasks();
    }
  
    function deleteTask(taskItem) {
      taskList.removeChild(taskItem);
      saveTasks();
    }
  
    function editTask(taskItem) {
      const newTask = prompt('Edit task:', taskItem.firstChild.nodeValue);
      if (newTask) {
        taskItem.firstChild.nodeValue = newTask;
        saveTasks();
      }
    }
  
    function toggleComplete(taskItem) {
      taskItem.classList.toggle('completed');
      saveTasks();
    }
  
    function createButtons(taskItem) {
      const deleteBtn = document.createElement('button');
      deleteBtn.appendChild(document.createTextNode('Delete'));
      deleteBtn.classList.add('delete-task');
      taskItem.appendChild(deleteBtn);
  
      const editBtn = document.createElement('button');
      editBtn.appendChild(document.createTextNode('Edit'));
      editBtn.classList.add('edit-task');
      taskItem.appendChild(editBtn);
    }
  
    function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('li').forEach((taskItem) => {
        tasks.push({
          text: taskItem.firstChild.nodeValue,
          completed: taskItem.classList.contains('completed'),
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task.text));
        if (task.completed) {
          li.classList.add('completed');
        }
        createButtons(li);
        taskList.appendChild(li);
      });
    }
  });