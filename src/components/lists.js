class Lists {
	constructor() {
		this.lists = [];
		this.initBindingsAndEventListeners();
		this.adapter = new ListsAdapter();
		this.fetchAndLoadLists();
	}

	initBindingsAndEventListeners() {

// note creation form elements and event listener

		this.notesForm = document.getElementById('new-note-form')
	    this.noteTitle = document.getElementById('new-note-title')
	    this.noteBody = document.getElementById('new-note-body')
	    this.noteEstHours = document.getElementById('new-note-est-hours')
	    this.noteDueDate = document.getElementById('new-note-due-date') 
	    this.noteLocation = document.getElementById('new-note-location')
	    this.noteListId = document.getElementById('new-note-list-selector')
	    this.notesForm.addEventListener('submit',this.handleAddNote.bind(this))



// list creation form elements and event listener
		
		this.listForm = document.getElementById('new-list-form')
		this.listTitle = document.getElementById('new-list-title')
		this.listForm.addEventListener('submit', this.handleAddList.bind(this))

// lists node  (container) to be filled with lists

		this.listsNode = document.getElementById('lists-container')

// event listener for note delete - just listen to whole lists containr 
// and check for targets class = 'delete-note-button'
		this.listsNode.addEventListener('click', this.handleDeleteNote.bind(this))

	}

	fetchAndLoadLists() {
		this.adapter.getLists()
    	.then( listsJSON => listsJSON.forEach( list => this.lists.push( new List(list) )))
      	.then( this.render.bind(this) )
      	.catch( (error) => console.log(error) )
	}

	handleAddList() {
		event.preventDefault()
		const title = this.listTitle.value;

		const listInfo = {
			title: title
		}
		this.adapter.createList(listInfo)
		.then( (listJSON) => this.lists.push(new List(listJSON)) )
		.then( this.render.bind(this) )
		.then( () => this.listTitle.value = "" )
		.then(populateListSelector)
	}

	handleDeleteList() {

	}


	handleAddNote() {
	    event.preventDefault()
	    const title = this.noteTitle.value;
	    const body = this.noteBody.value;
	    const estHours = this.noteEstHours.value;
	    const dueDate = this.noteDueDate.value; // new Date(dueDate)
	    const location = this.noteLocation.value;
	    const listId = this.noteListId.value;
	    // add userId later

	    const noteInfo = {
	      title: title,
	      body: body,
	      estHours: estHours,
	      dueDate: dueDate,
	      location: location,
	      listId: listId
	    };
	    
	    this.adapter.createNote(noteInfo)
	    .then( (noteJSON) => {
	    	this.lists[noteJSON.list.id-1].notes.push(new Note(noteJSON))
	    })
	    .then(  this.render.bind(this) )
	    .then( () => this.noteTitle.value = '', 
	      this.noteBody.value = '',
	      this.noteBody.value = '',
	      this.noteEstHours.value = '',
	      this.noteDueDate.value = '',
	      this.noteLocation.value = '')
	      
	}

// 'THIS' MAY BE OFF IN NOTE HANDLER FUNCTIONS
	handleDeleteNote(event) {

	  	if (event.target.className === 'delete-note-button') {
	  		const noteId = event.target.dataset.noteid
	      	const listId = event.target.dataset.listid

	      	this.adapter.deleteNote(listId, noteId)
	      	.then( resp => this.removeDeletedNote(resp) )

		}
	    
	}

	  removeDeletedNote(deleteResponse) {
	  	let list = this.lists[deleteResponse.list.id-1]
	    list.notes = list.notes.filter( note => note.id !== deleteResponse.id )
	    this.render()
	  }


	populateListSelector() {
// reset selecotr options
		this.noteListId.innerHTML = ""
// populate selector
		this.lists.forEach((list) => {
			let option = document.createElement('option');
			option.value = list.id;
			option.innerText = list.title;
			this.noteListId.appendChild(option);
		})
	}



	removeDeletedList(deleteResponse) {

	}

	listsHTML() {
		return this.lists.map( list => list.render() ).join('')
	}

	render() {
		this.populateListSelector();
		this.listsNode.innerHTML = `${this.listsHTML()}`
	}
}