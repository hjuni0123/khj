let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let plan = localStorage.getItem("plan") || "";

window.onload = function () {
  document.getElementById("plan").value = plan;
  renderTasks();
};

function addTask() {
  const input = document.getElementById("task-input");
  const task = input.value.trim();
  if (task) {
    taskList.push({ text: task, done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

function toggleDone(index) {
  taskList[index].done = !taskList[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function savePlan() {
  const text = document.getElementById("plan").value;
  localStorage.setItem("plan", text);
  alert("저장 완료!");
}

function renderTasks() {
  const ul = document.getElementById("task-list");
  ul.innerHTML = "";
  taskList.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");
    li.onclick = () => toggleDone(i);
    li.ondblclick = () => deleteTask(i);
    ul.appendChild(li);
  });
}

// 파일 업로드 및 미리보기
const fileInput = document.getElementById("file-input");
const preview = document.getElementById("preview");

if (fileInput) {
  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (!file) return;

    preview.innerHTML = "";

    const info = document.createElement("p");
    info.textContent = `파일 이름: ${file.name} / 용량: ${(file.size / 1024).toFixed(1)} KB`;
    preview.appendChild(info);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
}
