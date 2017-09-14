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

    return `<div class="list-container ui card">
      <h2 class="center aligned segment">${this.title}
      <button class="delete-list-button circular ui basic icon button" data-listid="${this.id}"><i class="trash outline icon center aligned segment"></i></button></h2>
      <div class="ui divider"></div><div class="ui divider"></div>

      <div>${this.notesHTML()}</div>
      </div>`;

  }

}