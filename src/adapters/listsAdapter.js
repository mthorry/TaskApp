class ListsAdapter {
	constructor() {
		this.baseUrl = ''
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
	
}