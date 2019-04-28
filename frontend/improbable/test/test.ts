import * as puppeteer from 'puppeteer';
import * as httpServer from 'http-server';
import * as assert from 'assert';
import { Runner, Suite } from 'mocha';

var browser: puppeteer.Browser;

before(async () => {
    browser = await puppeteer.launch({
        args: [
            // Required for Docker version of Puppeteer
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // This will write shared memory files into /tmp instead of /dev/shm,
            // because Docker’s default for /dev/shm is 64MB
            '--disable-dev-shm-usage'
        ]
    });
});

after(() => {
    browser.close();
});

describe('client test', function () {
    var server = httpServer.createServer({ root: '.' });
    server.listen(8080);

    it('in browser', function (done) {
        (async () => {
            const page = await browser.newPage();
            await page.goto('http://localhost:8080/html/index.html');
            await page.pdf({ path: 'mocha.pdf' });

            var summary = await page.evaluate(() => {
                var suite = (window as any).suite;
                return {
                    total: suite.total,
                    failures: suite.failures
                };
            });

            assert(summary.failures === 0);
            assert(summary.total > 0);

            await page.close();
            await server.close();
            done();
        })();
    });
});