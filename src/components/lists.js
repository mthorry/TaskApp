class Lists {
	constructor() {
		this.lists = [];
		this.initBindingsAndEventListeners();
		// rename adapters and add note adapter
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

		// will probably need to link both adapters ere, so this will be renamed
		this.adapter.createList(listInfo)
		.then( (listJSON) => this.lists.push(new List(listJSON)) )
		.then( this.render.bind(this) )
		.then( () => this.listTitle.value = "" )
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

	    // use camelcase here nad convert to snake case in adapter
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
// need to make sure adding to correct list
	    	this.lists[0].notes.push(new Note(noteJSON))
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
	  // handleDeleteNote() {
	  //   if (event.target.dataset.action === 'delete-note' && event.target.parentElement.classList.contains("note-element")) {
	  //     const noteId = event.target.parentElement.dataset.noteid
	  //     this.adapter.deleteNote(noteId)
	  //     .then( resp => this.removeDeletedNote(resp) )
	  //   }
	  // }

	  // removeDeletedNote(deleteResponse) {
	  //   this.notes = this.notes.filter( note => note.id !== deleteResponse.noteId )
	  //   this.render()
	  // }


	// THIS IS TO POPULATE HTML SELECTOR
	populateListSelector() {
		// <option value="INTERPOLATE LIST ID"> INTERPOLATE LIST NAME</option>
	}



	removeDeletedList(deleteResponse) {

	}

	listsHTML() {
		return this.lists.map( list => list.render() ).join('')
	}

	render() {
		this.listsNode.innerHTML = `${this.listsHTML()}`
	}
}