import { Application } from 'spectron';
import electronPath from 'electron';
import path from 'path';
import homeSels from '../selectors/home/home.selectors';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  beforeAll(async () => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', '..', 'app')],
    });
    return this.app.start();
  });

  afterAll(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('should open window', async () => {
    const { client, browserWindow } = this.app;

    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).toBe('Zen Focus');
  });

  it('should have a countdown timer', async () => {
    const { client } = this.app;
    const countdown = await client.isExisting(homeSels.countdownTimer);
    expect(countdown).toBe(true);
  });

  it('should have a title bar', async () => {
    const { client } = this.app;
    const titleBar = await client.isExisting(homeSels.titleBar);
    expect(titleBar).toBe(true);
  });

  it('should have a rounds progress bar', async () => {
    const { client } = this.app;
    const rounds = await client.isExisting(homeSels.rounds);
    expect(rounds).toBe(true);
  });
});
