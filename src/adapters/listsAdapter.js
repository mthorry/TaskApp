class ListsAdapter {
	constructor() {
		this.baseUrl = 'http://localhost:3000/api/v1/lists'
	}

	getLists() {
		return fetch(this.baseUrl).then(response => response.json())
	}

	createList(listInfo) {
		
		const listCreateParams = {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify(listInfo)
		}

		return fetch(this.baseUrl, listCreateParams).then(resp => resp.json()) 
	}

	createNote(noteInfo) {

	    const convertedNoteInfo = {
	      title: noteInfo["title"],
	      body: noteInfo["body"],
	      est_hours: noteInfo["estHours"],
	      due_date: noteInfo["dueDate"],
	      location: noteInfo["location"],
	      list_id: noteInfo["listId"]
	    }

	    const noteCreateParams = {
	      method: 'PATCH',
	      headers: {
	        'Content-Type':'application/json'
	      },
	      body: JSON.stringify(convertedNoteInfo)
	    }

	    const listUrl = this.baseUrl += `/${noteInfo["listId"]}`

	    return fetch(listUrl, noteCreateParams).then(resp => resp.json())
	}
	
}