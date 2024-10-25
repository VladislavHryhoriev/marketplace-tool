export const getTokenRozetka = async () => {
	const username = process.env.ROZETKA_USERNAME;
	const password = process.env.ROZETKA_PASSWORD!;

	const token_time = Number(localStorage.getItem('token_time'));
	const token = localStorage.getItem('token');

	if (Date.now() - token_time < 1000 * 60 * 60 * 24 && token) {
		return token;
	}

	const response = await fetch(`/api/sites`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: username,
			password: Buffer.from(password).toString('base64'),
		}),
	});

	const json = await response.json();

	localStorage.setItem('token', json.content.access_token);
	localStorage.setItem('token_time', Date.now().toString());

	return json.content.access_token;
};
