class Note {
  constructor(noteJSON) {
  	
// -------------------fix camel case shit---------------------


  	// needs adding to 
  	this.title = noteJSON.title
    this.body = noteJSON.body
    this.estHours = noteJSON.est_hours
    this.location = noteJSON.location
    this.dueDate = noteJSON.due_date
    this.id = noteJSON.id
  }

  render() {
    return `<li data-noteid='${this.id}' data-props='${JSON.stringify(this)}' class='note-element'>
    <h3>${this.title}</h3>
    ${this.body}<br>
    Due at: ${new Date(this.dueDate)}<br>


    <i data-action='delete-note' class="em em-scream_cat"></i>
    </li>`;
  }
}