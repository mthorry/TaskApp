class ListsAdapter {
	constructor() {
		this.baseUrl = 'http://localhost:3000/api/v1/lists'
		this.notesUrl = 'http://localhost:3000/api/v1/notes'
	}

	getLists() {
		return fetch(this.baseUrl).then(response => response.json())
	}

	createList(listInfo) {
		const convertedListInfo = {
			title: listInfo.title,
			user_id: listInfo.userId
		}
		
		const listCreateParams = {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify(convertedListInfo)
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

	    const listUrl = this.baseUrl + `/${noteInfo["listId"]}`

	    return fetch(listUrl, noteCreateParams).then(resp => resp.json())
	}

	deleteNote(listId, noteId) {
// instead take in note's id and list 
// so tha twe can go to list and update/patch it
		
	    const deleteUrl = `${this.notesUrl}/${noteId}` // needs to be listId not noteId
	    const noteDeleteParams = {
	      method: 'DELETE',
	      headers: {
	        'Content-Type':'application/json'
	      }
	    }
	    return fetch(deleteUrl, noteDeleteParams).then(response => response.json())
	}

	deleteList(listId) {
		const deleteUrl = `${this.baseUrl}/${listId}`
		const listDeleteParams = {
	      method: 'DELETE',
	      headers: {
	        'Content-Type':'application/json'
	      }
	    }
	    return fetch(deleteUrl, listDeleteParams).then(response => response.json())
	}

	completeNote(listId, noteId) {

		const convertedNoteInfo = {
	      time_completed: new Date(),
	      id: noteId	
	    }

		const completeURL = `${this.notesUrl}/${noteId}`

		const noteCompleteParams = {
			method: 'PATCH',
			headers: {
	        	'Content-Type':'application/json'
			},
			body: JSON.stringify(convertedNoteInfo)
		}
		return fetch(completeURL, noteCompleteParams).then(response => response.json())
	}
	
}