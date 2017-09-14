class List {
  constructor(listJSON) {
    this.id = listJSON.id
    this.title = listJSON.title

    this.notes = listJSON.notes.map(function(note) {
      let temp = new Note(note)
      temp.listId = listJSON.id
      return temp;
    })

  }

  notesHTML() {
    return this.notes.map( function(note) {
      return note.render()
    }).join('')
  }

  render() {
    return `<div class="list-container">
      <h2>${this.title}</h2>
      <button class="delete-list-button ui negative basic button" data-listid="${this.id}">Delete List</button>
      <div>${this.notesHTML()}</div>
      </div>`;
  }

}