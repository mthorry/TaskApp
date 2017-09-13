class List {
  constructor(listJSON) {
    this.notes = listJSON.notes.map(function(note) {
      return new Note(note);
    })


    //this.notes = listJSON.notes
    this.id = listJSON.id
    this.title = listJSON.title
    this.initBindingsAndEventListeners()
  }

  notesHTML() {
    return this.notes.map( function(note) {
      return note.render()
    }).join('')
  }

  render() {
    return `<ul>${this.notesHTML()}</ul>`
  }

  initBindingsAndEventListeners() {
  }

}