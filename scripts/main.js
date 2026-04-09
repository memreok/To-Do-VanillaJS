let itemsId = 0;
let statId = -1;
itemsId = parseInt(localStorage.getItem("ItemCount")) || 0;
statId = parseInt("-" + localStorage.getItem("ItemCount")) || 0;

let taskStr = "Default Text";

const searchBtn = document.getElementById("searchBtn");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list-to");
const doingL = document.getElementById("list-doing");
const doneL = document.getElementById("list-done");
const searchInput = document.getElementById("search");

function createTaskElement(taskText, level = "level1") {
  const item = document.createElement("li");
  const line = document.createElement("hr");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const arrowBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  let task = document.createElement("p");
  
  task.textContent = taskText;
  task.classList.add("taskText");

  deleteBtn.classList = "deleteBtn";
  editBtn.classList = "editBtn";
  arrowBtn.classList = "arrowBtn";
  doneBtn.classList = "checkBtn";

  item.append(task);

  if (level === "level1") {
    item.append(arrowBtn);
  } else if (level === "level2") {
    item.append(doneBtn);
  }

  item.append(editBtn);
  item.append(deleteBtn);
  item.append(line);

  deleteBtn.addEventListener("click", e => {
    if (confirm("Bu görevi silmekten emin misiniz?") == true) {
      for(let i = 1; i <= itemsId; i++){
        // localStorage.key(i) YERİNE DOĞRUDAN getItem(i) KULLANIYORUZ
        const tmp = localStorage.getItem(i);

        if(tmp === task.textContent){
          item.remove();
          localStorage.removeItem(i);
          localStorage.removeItem("-" + i); // Silinince level statüsünü de temizle
          console.log("\"" + task.textContent + "\" başarıyla silindi!");
          break; 
        } 
      }
    } else {
      console.log("\"" + task.textContent + "\" silme işlemi iptal edildi!");
    }
  });

  doneBtn.addEventListener("click", e => {
    console.log("\"" + task.textContent + "\" başarıyla tamamlandı!");
    item.removeChild(doneBtn);
    doneL.append(item);

    for(let i = 1; i <= itemsId; i++){
      const tmp = localStorage.getItem(i);

      if(tmp === task.textContent){
        localStorage.setItem("-" + i , "level3");
        break; 
      }
    }
  });

  arrowBtn.addEventListener("click", e => {
    console.log("\"" + task.textContent + "\" başarıyla taşındı!");
    item.removeChild(arrowBtn);
    item.insertBefore(doneBtn, item.children[1]);
    doingL.append(item);

    for(let i = 1; i <= itemsId; i++){
          const tmp = localStorage.getItem(i);

          if(tmp === task.textContent){
            localStorage.setItem("-" + i , "level2");
            break; 
          }
    }
  });

  editBtn.addEventListener("click", e => {
    const editInput = document.createElement("input");
    const currentTaskTextElement = item.querySelector(".taskText");
    editInput.value = currentTaskTextElement.textContent; 
    
    item.replaceChild(editInput, currentTaskTextElement); 
    editInput.focus();

    editInput.addEventListener("keydown", e => {
      if (e.key === "Enter" && editInput.value !== "") {
        const newTextElement = document.createElement("p");

        for(let i = 1; i <= itemsId; i++){
          const tmp = localStorage.getItem(i);

          if(tmp === task.textContent){
            newTextElement.textContent = editInput.value;
            newTextElement.classList.add("taskText");
            item.replaceChild(newTextElement, editInput);
            localStorage.setItem(i, newTextElement.textContent);
            task.textContent = newTextElement.textContent; 
            break; 
          } 
        }
        console.log("\"" + newTextElement.textContent + "\" başarıyla güncellendi!");
      }
    });
  });

  return item;
}

addBtn.addEventListener("click", e => {
  console.log("Görev ekleniyor...");
  const item = document.createElement("li");
  const input = document.createElement("input");
  
  item.appendChild(input);
  list.append(item);
  input.focus();
  
  input.addEventListener("keydown", e => {
    if(e.key === "Enter" && (input.value !== "")){
      itemsId += 1; 
      
      localStorage.setItem("ItemCount", itemsId);
      localStorage.setItem(itemsId, input.value);
      localStorage.setItem("-" + itemsId,"level1" );

      console.log("\"" + input.value + "\" başarıyla eklendi! ");
      
      const newTaskElement = createTaskElement(input.value, "level1");
      list.replaceChild(newTaskElement, item);
    }
  });
});

searchBtn.addEventListener("click", e => {
  searchTask();
});

searchInput.addEventListener("input", e => {
  if (searchInput.value.trim() === "") {
    clearHighlights(); 
  }
});

searchInput.addEventListener("keydown", e => {
  if(e.key === "Enter" && searchInput.value.toLowerCase().trim() != ""){
    searchTask();
  }
});

function clearHighlights() {
  const allTaskTexts = document.querySelectorAll(".taskText");
  allTaskTexts.forEach(p => {
    p.innerHTML = p.textContent; 
  });
}

function searchTask() {
  let searchText = searchInput.value.toLowerCase().trim();
  console.log("Görev arama başladı...");
  
  clearHighlights(); 
  
  if (searchText == ""){
    return console.log("Aranan görev bulunamadı!");
  } else {
    const allTaskTexts = document.querySelectorAll(".taskText");
    
    allTaskTexts.forEach((p) => {
      const originalText = p.textContent;
      const tmp = originalText.toLowerCase();
      
      if(tmp.includes(searchText)){
        console.log("Aranan: \"" + searchText + "\" terimi başarıyla bulundu.");
        const regex = new RegExp(`(${searchText})`, "gi"); 
        p.innerHTML = originalText.replace(regex, "<mark>$1</mark>");
      }
    });
  }
}

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

  if(itemsId > 0){
    let itemcount = localStorage.getItem("ItemCount");
    for(let i = 1; i <= itemcount; i++){
      const data = localStorage.getItem(i);
      
      if(data !== null && (localStorage.getItem("-" + i) == "level1" )) {
        const loadedTaskElement = createTaskElement(data, "level1");
        list.append(loadedTaskElement);
      }
      if(data !== null && (localStorage.getItem("-" + i) == "level2" )) {
        const loadedTaskElement = createTaskElement(data, "level2");
        doingL.append(loadedTaskElement);
      }
      if(data !== null && (localStorage.getItem("-" + i) == "level3" )) {
        const loadedTaskElement = createTaskElement(data, "level3");
        doneL.append(loadedTaskElement);
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  if (!localStorage.getItem("firstVisit")) {
    itemsId = 0;
    localStorage.setItem("firstVisit", "true");
  }
});