export const fetchJson = async (method, url, body) => {
	const options = {
		mode: 'cors',
		method: method,
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
	};

	const response = await fetch(url, options);
	const json = await response.json();

	if (response.ok) return json;
	else throw new HTTPError(response.status, json);
};

class HTTPError extends Error {
	constructor(status, ...params) {
		super(...params);
		this.name = 'HTTPError';
		this.status = status;
	}
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const groupBy = (category, data) => {
	// resetting the data array
	if (typeof data === 'object') {
		data = Object.values(data).flat();
	}

	if (category === 'all') return { all: data };

	const groups = {};

	for (let card of data) {
		const target = card.info[category];

		if (!groups[target]) groups[target] = [card];
		else groups[target].push(card);
	}

	return groups;
};
