class Notes {
  constructor() {
    this.notes = []
    this.initBindingsAndEventListeners()
    this.adapter = new NotesAdapter()
    this.fetchAndLoadNotes()
  }

  initBindingsAndEventListeners() {
    this.notesForm = document.getElementById('new-note-form')
    this.noteTitle = document.getElementById('new-note-title')
    this.noteBody = document.getElementById('new-note-body')
    this.noteEstHours = document.getElementById('new-note-est-hours')
    this.noteDueDate = document.getElementById('new-note-due-date') 
    this.noteLocation = document.getElementById('new-note-location')

    this.notesNode = document.getElementById('notes-container')
    this.notesForm.addEventListener('submit',this.handleAddNote.bind(this))
    this.notesNode.addEventListener('click',this.handleDeleteNote.bind(this))
  }

  fetchAndLoadNotes() {
    this.adapter.getNotes()
    .then( notesJSON => notesJSON.forEach( note => this.notes.push( new Note(note) )))
      .then( this.render.bind(this) )
      .catch( () => alert('The server does not appear to be running') )
  }

  handleAddNote() {
    event.preventDefault()
    const title = this.noteTitle.value;
    const body = this.noteBody.value;
    const estHours = this.noteEstHours.value;
    const dueDate = this.noteDueDate.value; // new Date(dueDate)
    const location = this.noteLocation.value;
    // add userId later

    const noteInfo = {
      title: title,
      body: body,
      estHours: estHours,
      dueDate: dueDate,
      location: location 
    };
    
    this.adapter.createNote(noteInfo)
    .then( (noteJSON) => this.notes.push(new Note(noteJSON)) )
    .then(  this.render.bind(this) )
    .then( () => this.noteTitle.value = '', 
      this.noteBody.value = '',
      this.noteBody.value = '',
      this.noteEstHours.value = '',
      this.noteDueDate.value = '',
      this.noteLocation.value = '')
      
  }

  handleDeleteNote() {
    if (event.target.dataset.action === 'delete-note' && event.target.parentElement.classList.contains("note-element")) {
      const noteId = event.target.parentElement.dataset.noteid
      this.adapter.deleteNote(noteId)
      .then( resp => this.removeDeletedNote(resp) )
    }
  }

  removeDeletedNote(deleteResponse) {
    this.notes = this.notes.filter( note => note.id !== deleteResponse.noteId )
    this.render()
  }

  notesHTML() {
    return this.notes.map( note => note.render() ).join('')
  }

  render() {
    this.notesNode.innerHTML = `<ul>${this.notesHTML()}</ul>`
  }
}