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

//------------ order by due date
//------------ order by completion
//------------ order by est hours

    return `<div class="list-container ui cards card">
      <h2>${this.title}</h2>
      <button class="delete-list-button ui negative basic button" data-listid="${this.id}">Delete List</button>
      <div>${this.notesHTML()}</div>
      </div>`;
  }

}