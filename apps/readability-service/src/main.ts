import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { Readability } from '@mozilla/readability';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

export async function article(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
	context.log(`Http function processed request for url "${request.url}"`);

	const url: string | undefined = request.query.get('url')?.toString();

	if (!url) {
		return {
			status: 400,
			jsonBody: {
				error: 'Param required: url.',
			},
		};
	}

	const fetchResponse = await axios.get(url);
	const html: string = fetchResponse.data;

	const dom = new JSDOM(html);
	const purify = DOMPurify(dom.window);
	const readability = new Readability(dom.window.document);
	const readable = readability.parse();

	if (!readable) {
		return {
			status: 500,
			jsonBody: {
				error: 'Unable to make the article readable.',
			},
		};
	}

	const purified = purify.sanitize(readable.content, { ALLOWED_TAGS: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'title'] });

	const turndownService = new TurndownService({ headingStyle: 'atx' });
	const content = turndownService.turndown(purified);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { textContent: _1, content: _2, ...readableWithoutContent } = readable;

	const result = {
		...readableWithoutContent,
		content,
	};

	return { body: JSON.stringify(result) };
}

app.http('article', {
	methods: ['GET'],
	authLevel: 'anonymous',
	handler: article,
});

// todo

// if (isDevelopment) {
// 	app.get('/__test__/test.html', (req, res) => {
// 		const text = readFileSync(resolve(__dirname, '../../../../../../apps/readability-service-e2e/__fixture__/Amélia.html'), 'utf8');
// 		res.send(text);
// 	});
// }
