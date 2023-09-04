import axios from 'axios';

describe('GET /readable', () => {
	it('fetches the specified url and simplifies the content', async () => {
		const res = await axios.get(`/article?url=http://localhost:3000/__test__/test.html`);
		expect(res.status).toBe(200);
		expect(res.data).toMatchSnapshot();
	});
});
