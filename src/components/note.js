class Note {
  constructor(noteJSON) {
  	// needs adding to

    // converting out of snake case to camel case
  	this.title = noteJSON.title
    this.body = noteJSON.body
    this.estHours = noteJSON.est_hours
    this.location = noteJSON.location
    this.dueDate = noteJSON.due_date
    this.id = noteJSON.id

    // this.listId = noteJSON.list_id
  }

  render() {

//------------ conditional for iff complete

    return `
    <div id="note-${this.id}" class="note card">
      <div data-noteid='${this.id}' data-listid='${this.listId}' class='note-element content'>
        <h3 class="header">${this.title}</h3>
        <div class="description">
          ${this.body}<br>
          Due at: ${new Date(this.dueDate)}<br>
          Time Needed: ${this.estHours} hours<br>
          Location: ${this.location}<br>
        </div>
        <div class="extra content">
          <button data-noteid='${this.id}' data-listid='${this.listId}' class="delete-note-button ui inverted mini button red">Delete</button>
          <button data-noteid='${this.id}' data-listid='${this.listId}' class="complete-note-button ui inverted button green">Mark Complete</button>
          <button data-noteid='${this.id}' data-listid='${this.listId}' class="edit-note-button ui inverted mini button yellow">Edit</button>
        </div>
      </div>
    </div><div class="ui divider"></div>
`;
  }
}