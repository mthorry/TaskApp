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
    return `
    <div id="note-${this.id}" class="note">
    <li data-noteid='${this.id}' data-props='${JSON.stringify(this)}' class='note-element'>
    <h3>${this.title}</h3>
    <em>${this.body}</em><br>
    <strong>Due at:</strong> ${new Date(this.dueDate)}<br>
    <strong>Time Needed:</strong> ${this.estHours} hours<br>
    <strong>Location:</strong> ${this.location}<br>
    </li>
    </div>`;
  }
}