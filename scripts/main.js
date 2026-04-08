let itemsId = 0

let taskStr = "Default Text";

const searchBtn = document.getElementById("searchBtn");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list-to");
const doingL = document.getElementById("list-doing");
const doneL = document.getElementById("list-done");
const searchInput = document.getElementById("search");

addBtn.addEventListener("click" , e => {

    
  console.log("Görev ekleniyor...");
  const item = document.createElement("li");
  const input = document.createElement("input");
  const line = document.createElement("hr");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const arrowBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  let task = document.createElement("p");
  
  item.appendChild(input);
  list.append(item);
  input.focus();
  input.addEventListener("keydown", e => {
    
    if(e.key === "Enter" && (input.value !== "")){



      task.textContent = input.value;
      task.classList.add("taskText");
      item.removeChild(input);
      item.append(task);
      


      

      
      itemsId += 1; 
      console.log("\"" + task.textContent + "\" başarıyla eklendi! ");
      deleteBtn.classList = "deleteBtn";
      editBtn.classList = "editBtn";
      arrowBtn.classList = "arrowBtn";


      item.append(arrowBtn);
      item.append(editBtn);
      item.append(deleteBtn);

      
      item.append(line);

    }



  })

deleteBtn.addEventListener("click" , e => {
  
    if (confirm("Bu görevi silmekten emin misiniz?") == true) {
      item.remove();
      console.log("\"" + task.textContent + "\" başarıyla silindi!");
  } else {
      console.log("\"" + task.textContent + "\" silme işlemi iptal edildi!");
  }

})
  
doneBtn.addEventListener("click" , e => {

  console.log("\"" + task.textContent + "\" başarıyla tamamlandı!");
  item.removeChild(doneBtn);
  doneL.append(item);



})

arrowBtn.addEventListener("click" , e => {
  console.log("\"" + task.textContent + "\" başarıyla taşındı!");
  doneBtn.classList = "checkBtn";
  item.removeChild(arrowBtn);
  item.insertBefore(doneBtn, item.children[2]);
  doingL.append(item);
})

editBtn.addEventListener("click", e => {

  const editInput = document.createElement("input");
  
  
  const currentTaskTextElement = item.querySelector(".taskText");
  editInput.value = currentTaskTextElement.textContent; 
  
  
  item.replaceChild(editInput, currentTaskTextElement); 
  editInput.focus();

  editInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && editInput.value !== "") {
      
      
      
      const newTextElement = document.createElement("p");
      newTextElement.textContent = editInput.value;
      newTextElement.classList.add("taskText");

      item.replaceChild(newTextElement, editInput);
      
      console.log("\"" + newTextElement.textContent + "\" başarıyla güncellendi!");
    }
  });

})

})

searchBtn.addEventListener("click" , e => {
  searchTask();
})

searchInput.addEventListener("input", e => {
  if (searchInput.value.trim() === "") {
    clearHighlights(); 
  }
});

searchInput.addEventListener("keydown" , e => {

  if(e.key === "Enter" && searchInput.value.toLowerCase().trim() != ""){
  
    searchTask();

  }
})


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
