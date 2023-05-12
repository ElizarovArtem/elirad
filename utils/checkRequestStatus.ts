export async function checkStatus(response: Response) {
	if (response.status >= 200 && response.status < 300) {
		return;
	}

	throw response;
}
