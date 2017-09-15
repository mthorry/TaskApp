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
		this.listsNode.addEventListener('click', this.handleListsNodeButtons.bind(this))

// elements and event listener for filter form
		//this.filterForm = document.getElementById('filter-form')
		this.filterInput = document.getElementById('filter-input')
		this.filterInput.addEventListener('keyup', this.handleFilter)
		//this.filterForm.addEventListener('submit')

	}

	fetchAndLoadLists() {
		this.adapter.getLists()
    	.then( listsJSON => listsJSON.forEach( list => this.lists.unshift( new List(list) )))
      	.then( this.render.bind(this) )
      	.catch( (error) => console.log(error) )
	}

	handleAddList() {
		event.preventDefault()
		const title = this.listTitle.value;

		const listInfo = {
			title: title,
			userId: 1
		}
		this.adapter.createList(listInfo)
		.then( (listJSON) => this.lists.unshift(new List(listJSON)) )
		.then( this.render.bind(this) )
		.then( () => this.listTitle.value = "" )
		.then(this.populateListSelector.bind(this))
	}

	handleFilter(event) {

	}

	

// may have to call with bind to alleviate 'this' confusion
	findListIndexById(id) {
		for (var i = 0; i < this.lists.length; i++) {
			if (this.lists[i].id === id) {
				return i; // i is the list's index in this.lists
			}
		}
	}

	findNoteIndexById(id) {
		for (var i = 0; i < this.lists.length; i++) {
			for (var j = 0; j < this.lists[i].notes.length; j++)	{
				if (this.lists[i].notes[j].id === id) {

					return j; // j is just the index of the note in its list's 'notes' array
				
				}
			}
		}
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
	    	this.lists[this.findListIndexById(noteJSON.list.id)].notes.unshift(new Note(noteJSON))
	    })
	    .then(  this.render.bind(this) )
	    .then( () => this.noteTitle.value = '', 
	      this.noteBody.value = '',
	      this.noteBody.value = '',
	      this.noteEstHours.value = '',
	      this.noteDueDate.value = '',
	      this.noteLocation.value = '')
	      
	}

// nested event handlers for buttons in listsNode (aka lists-container)

	handleDeleteNote(event) {
		const noteId = event.target.dataset.noteid
      	const listId = event.target.dataset.listid
      	this.adapter.deleteNote(listId, noteId)
      	.then( resp => this.removeDeletedNote(resp) )
	}

	handleDeleteList(event) {
		const listId = event.target.dataset.listid
		this.adapter.deleteList(listId)
      	.then( resp => this.removeDeletedList(resp) )
	}

	handleCompleteNote(event) {
		const noteId = event.target.dataset.noteid
      	const listId = event.target.dataset.listid
      	this.adapter.completeNote(listId, noteId)
      	.then( resp => this.updateCompletedNote(resp) )		
	}

	handleEditNote(event) {

	}

//bind this?
	handleListsNodeButtons(event) {
	  	if (event.target.className.includes('delete-note-button')) {
	  		this.handleDeleteNote(event)
		} else if (event.target.className.includes('delete-list-button')) {
	      	this.handleDeleteList(event);
		} else if (event.target.className.includes('complete-note-button')) { // fill in
			this.handleCompleteNote(event)
		}
	}

	removeDeletedList(deleteResponse) {
// fix index/id issue
	   let list = this.lists[this.findListIndexById(deleteResponse.id)]
	   this.lists = this.lists.filter((list) => { return list.id !== deleteResponse.id})
	   this.render()
	}

	removeDeletedNote(deleteResponse) {
	   let list = this.lists[this.findListIndexById(deleteResponse.list.id)]
	   list.notes = list.notes.filter( note => note.id !== deleteResponse.id )
	   this.render()
	}

	updateCompletedNote(completeResponse) {

		// completeResponse is a note-like object
		// has the note's id in completeRespose.id (?)



		
		// get note via:
		// this.lists[this.findListIndexById(completeResponse.list.id)].notes[this.findNoteIndexById(completeResponse.id)]
		
// modify the appropriate notes array using splice
			// 	array.splice(start)
			// 	array.splice(start, deleteCount)
			// 	array.splice(start, deleteCount, item1, item2, ...)
		const list = this.lists[this.findListIndexById(completeResponse.list.id)].notes
		const note = this.lists[this.findListIndexById(completeResponse.list.id)].notes[this.findNoteIndexById(completeResponse.id)]
		const noteId = this.findNoteIndexById(completeResponse.id)
		list.splice(list.length-1, 0, list.splice(noteId, 1)[0])			

		this.render()

		// find the note
		// render as completed (move / different color?)


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



	listsHTML() {
		return this.lists.map( list => list.render() ).join('')
	}

	render() {
		this.populateListSelector();
		this.listsNode.innerHTML = `${this.listsHTML()}`
	}
}