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
          <em>${this.body}</em><br>
          <strong>Due at:</strong> ${new Date(this.dueDate)}<br>
          <strong>Time Needed:</strong> ${this.estHours} hours<br>
          <strong>Location:</strong> ${this.location}<br>
        </div>
        <div class="extra content">
          <button data-noteid='${this.id}' data-listid='${this.listId}' class="delete-note-button ui negative mini basic button">Delete</button>
          <button data-noteid='${this.id}' data-listid='${this.listId}' class="complete-note-button ui positive basic button">Mark Complete</button>
          <button data-noteid='${this.id}' data-listid='${this.listId}' class="edit-note-button ui yellow mini basic button">Edit</button>
        </div>
      </div>
    </div>`;
  }
}