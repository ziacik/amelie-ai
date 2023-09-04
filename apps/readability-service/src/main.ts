import { Readability } from '@mozilla/readability';
import axios from 'axios';
import express from 'express';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { resolve } from 'path';
import { env } from 'process';
import TurndownService from 'turndown';

import DOMPurify from 'dompurify';

const host = env['HOST'] ?? 'localhost';
const port = env['PORT'] ? Number(process.env['PORT']) : 3000;
const isDevelopment = env['NODE_ENV'] === 'development';

const app = express();
const turndownService = new TurndownService({ headingStyle: 'atx' });

app.get('/article', async (req, res) => {
	const url: string | undefined = req.query['url']?.toString();

	if (!url) {
		res.status(400).send('Param required: url.');
		return;
	}

	const fetchResponse = await axios.get(url);
	const html: string = fetchResponse.data;

	const dom = new JSDOM(html);
	const purify = DOMPurify(dom.window);
	const readability = new Readability(dom.window.document);
	const readable = readability.parse();

	if (!readable) {
		res.status(500).send('Unable to make the article readable.');
		return;
	}

	const purified = purify.sanitize(readable.content, { ALLOWED_TAGS: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'title'] });
	const content = turndownService.turndown(purified);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { textContent: _1, content: _2, ...readableWithoutContent } = readable;

	res.send({
		...readableWithoutContent,
		content,
	});
});

if (isDevelopment) {
	app.get('/__test__/test.html', (req, res) => {
		const text = readFileSync(resolve(__dirname, '../../../../../../apps/readability-service-e2e/__fixture__/Amélia.html'), 'utf8');
		res.send(text);
	});
}

app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
