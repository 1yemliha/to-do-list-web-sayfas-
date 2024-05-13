const taskInput = document.getElementById('taskInput'); // HTML içindeki 'taskInput' id'li elementi seçer ve bu değişkene atar.
const taskList = document.getElementById('taskList'); // HTML içindeki 'taskList' id'li elementi seçer ve bu değişkene atar.
let tasks = []; // Boş bir dizi oluşturur ve 'tasks' adında bir değişkene atar. Bu dizi görevleri depolamak için kullanılacak.

function addTask() { 
  const taskText = taskInput.value.trim(); // 'taskInput' elementinin değerini alır ve baştaki ve sondaki boşlukları kaldırır.
  if (taskText !== '') { 
    const task = { 
      id: Date.now(), // Şu anki zamanın  değerini kullanarak görevin benzersiz olmasını sağlar.
      text: taskText, // Görev metnini kullanıcı tarafından girilen değere ayarlar.
      completed: false 
    };
    tasks.push(task); // Oluşturulan görev nesnesini 'tasks' dizisine ekler.
    renderTasks(); // Görev listesini güncellemek için 'renderTasks' fonksiyonunu çağırır.
    taskInput.value = ''; // Girdi alanının değerini boşaltır.
  }
}

function renderTasks() { 
  taskList.innerHTML = ''; // Görev listesi içeriğini temizler.
  tasks.forEach(task => { // 'tasks' dizisindeki her bir görev için bir döngü oluşturur.
    const li = document.createElement('li'); // Yeni bir liste öğesi oluşturur.
    li.innerHTML = `
      <span>${task.text}</span> 
      <button onclick="editTask(${task.id})">Edit</button> 
      <button onclick="completeTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button> 
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    if (task.completed) {
      li.classList.add('completed'); 
    }
    taskList.appendChild(li); // List öğesini görev listesine ekler
  });
}


function editTask(id) {
  const task = tasks.find(task => task.id === id); // ID'si verilen görevi bulur
  const newText = prompt('Edit the task:', task.text); 
  if (newText !== null) { // Eğer yeni metin null değilse (kullanıcı iptal etmediyse)
    task.text = newText; // Görev metnini yeni metinle günceller
    renderTasks(); // Görevleri yeniden render etmek için 'renderTasks' fonksiyonunu çağırır
  }
}


function completeTask(id) {
  const task = tasks.find(task => task.id === id); 
  task.completed = !task.completed; // Görevin tamamlanma durumunu tersine çevirir (tamamlanmışsa tamamlanmamış, tamamlanmamışsa tamamlanmış yapar)
  renderTasks(); 
}


function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id); // ID'si verilen görevi 'tasks' dizisinden filtreleyerek kaldırır
  renderTasks();
}


function showAllTasks() {
  renderTasks(); 
}

function showCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed); 
  taskList.innerHTML = ''; 
  completedTasks.forEach(task => { 
    const li = document.createElement('li'); 
    li.innerHTML = `
      <span>${task.text}</span> 
      <button onclick="editTask(${task.id})">Edit</button> 
      <button onclick="completeTask(${task.id})">Undo</button> 
      <button onclick="deleteTask(${task.id})">Delete</button> 
    `;
    li.classList.add('completed'); // Liste öğesine 'completed' sınıfını ekler
    taskList.appendChild(li); 
  });
}

function showIncompleteTasks() {
  const incompleteTasks = tasks.filter(task => !task.completed); 
  taskList.innerHTML = '';
  incompleteTasks.forEach(task => { 
    const li = document.createElement('li'); 
    li.innerHTML = `
      <span>${task.text}</span> 
      <button onclick="editTask(${task.id})">Edit</button> 
      <button onclick="completeTask(${task.id})">Complete</button> 
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}
