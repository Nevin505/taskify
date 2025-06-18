const toDoList = [
  {
    id: 1,
    description: 'Buy groceries',
    status: 'todo',
    title: 'Groceries',
    level: 'Medium',
  },
  {
    id: 2,
    description: 'Finish homework',
    status: 'completed',
    title: 'Home Work',
    level: 'Easy',
  },
  {
    id: 3,
    description: 'Book a doctor appointment',
    status: 'todo',
    title: 'Appointment',
    level: 'Hard',
  },
  {
    id: 4,
    description: 'Pay electricity bill',
    status: 'completed',
    title: 'Bill',
    level: 'Medium',
  },
]
let lastAddedId = toDoList.pop().id;

function handleClick() {
  console.log("cliedke 1");
  
  const popUpModal = document.getElementById('popUpModal')
  if (popUpModal.classList.contains('close')) {
    popUpModal.classList.remove('close')
    popUpModal.classList.add('open')
    popUpModal.classList.remove('hidden')
  } else {
    popUpModal.classList.remove('open')
    popUpModal.classList.add('close')
    popUpModal.classList.add('hidden')
  }
}

function addToDo() {
  console.log("CLiked");
  
  const getToDoDescription = document.getElementById('todoDecription').value
   const getToDoTitle = document.getElementById('todoTitle').value
  const selectedRadioButton = document.querySelector(
    'input[type="radio"][name="todoStatus"]:checked'
  )?.value
  const complexeityLevel=document.querySelector('input[type="radio"][name="complexeityLevel"]:checked')?.value
  lastAddedId++;
  console.log("the selectedRadioButton", selectedRadioButton);
  console.log("the getToDoDescription", getToDoDescription);
  console.log("the complexeityLevel",complexeityLevel);
  
  
  
  toDoList.push({
    id: lastAddedId,
    title:getToDoTitle,
    description: getToDoDescription,
    status: selectedRadioButton,
  })
  getTodo();
}

const youtTodo = document.getElementById('todo')
const doing = document.getElementById('doing')
const completed = document.getElementById('completed')
const dragFunction = (id) => {
  const draggedElemnt = document.getElementById(id)

  draggedElemnt.addEventListener('dragstart', (ev) => {
    ev.dataTransfer.setData('text/plain', ev.target.id)
  })
}
function getTodo() {
  let todo = ''
  let doingTodo = ''
  let completedTodo = ''
  toDoList.forEach((singletodo) => {
    const insertedElemnet = `<div
          class="flex-1 border border-red-300 p-4 rounded-md h-fit"
          id=${singletodo.id}
          draggable="true"
        >
           <h1 class="text-2xl">${singletodo.title}</h1>
           <p class="max-w-lg">${singletodo.description}</p>
           <p class="px-4 py-2 rounded-3xl bg-blue-500 w-fit mt-4">Diffecult level</p>
        </div>`
    if (singletodo.status === 'todo') {
      todo += insertedElemnet
    } else if (singletodo.status === 'doing') {
      doingTodo += insertedElemnet
    } else {
      completedTodo += insertedElemnet
    }
  })
  if (todo) {
    youtTodo.innerHTML = todo
  }
  if (doingTodo) {
    doing.innerHTML = doingTodo
  }
  if (completedTodo) {
    completed.innerHTML = completedTodo
  }
  toDoList.forEach((singletodo) => {
    dragFunction(singletodo.id)
  })
}
getTodo()

doing.addEventListener('dragover', (evnt) => {
  evnt.preventDefault()
  evnt.dataTransfer.dropEffect = 'move'
})
doing.addEventListener('drop', (evnt) => {
  evnt.preventDefault()
  const data = evnt.dataTransfer.getData('text/plain')

   console.log("thje data",data);
  evnt.currentTarget.appendChild(document.getElementById(data))
})

completed.addEventListener('dragover', (evnt) => {
  evnt.preventDefault()
  evnt.dataTransfer.dropEffect = 'move'
})
completed.addEventListener('drop', (evnt) => {
  evnt.preventDefault()
  const data = evnt.dataTransfer.getData('text/plain');
  console.log("thje data",data);
  
  evnt.currentTarget.appendChild(document.getElementById(data))
})
