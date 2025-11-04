    import puppeteer from 'puppeteer';

    export default async function handler(req, res) {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle0' });
            const screenshotBuffer = await page.screenshot({ fullPage: true });
            await browser.close();

            res.setHeader('Content-Type', 'image/png');
            res.send(screenshotBuffer);
        } catch (error) {
            console.error('Screenshot failed:', error);
            res.status(500).json({ error: 'Failed to capture screenshot' });
        }
    }