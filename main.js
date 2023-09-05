/*
current problem: the saved p from textarea is overlapping the options.
                therefore it throws an error when trying to edit.
*/




const addBtn = document.querySelector('#add'),
sample = document.querySelector('.pop-box'),
cal = document.querySelector('.cancel'),
saveBtn = document.querySelector('#save'),
board = document.querySelector('.board'),
text = document.querySelector('#note'),
del = document.querySelector('#delete');

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let updated = false, updateId;

addBtn.addEventListener("click", () => {
  sample.classList.add("show");
})

cal.addEventListener("click", () => {
  updated = false
  text.value = '';
  saveBtn.innerText = 'Save'
  sample.classList.remove("show");
})

saveBtn.addEventListener("click", e => {
  e.preventDefault();
  let noteCont = text.value;

  if(noteCont) {
    let dateObj = new Date(),
    tro = dateObj.getMonth()+'-'+(dateObj.getDate())+'-'+(dateObj.getFullYear());
    time = dateObj.getHours() + ":" + dateObj.getMinutes() ;
    dateTime = tro+'  |  '+time;

    let noteInfo = {
      content: noteCont,
      date: dateTime
    }
    if(!updated) {
      notes.push(noteInfo);
    } else {
      updated = false
      notes[updateId] = noteInfo
    }

    localStorage.setItem("notes", JSON.stringify(notes));

    console.log(noteInfo)
    cal.click()
  } 

  show()
})

function show() {
  document.querySelectorAll("#box").forEach(box => box.remove())
  notes.forEach((note, index) => {
    let result = `
      <div id="box">
        <div class="notCon">
          <p>${note.content}</p>
        </div>
        <div id="bottom">
          <div id="options">
            <div id="edit" onclick="upNote(${index}, '${note.content}')">edit</div>
            <div id="delete" onclick="delNote(${index})">delete</div>
          </div>
          <div id="date">${note.date}</div>
        </div>
      </div>`
    board.insertAdjacentHTML("afterbegin", result)
  })
}
show()

function delNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete the note?")
  if(!confirmDel) return;

  notes.splice(noteId, 1)
  localStorage.setItem("notes", JSON.stringify(notes));
  show()
}

function upNote(noteId, noteCont) {
  updated = true
  updateId = noteId
  addBtn.click()
  saveBtn.innerText = "Save Update";
  text.value = noteCont;
  console.log(noteId, noteCont)
}