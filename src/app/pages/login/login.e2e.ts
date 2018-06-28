import { browser, by, element } from 'protractor';
import 'tslib';

describe('Login', () => {

  beforeEach(async () => {
    /**
     * Change hash depending on router LocationStrategy.
     */
    await browser.get('/');
    // await element(by.linkText('Home')).click();
  });

  it('should have a title', async () => {
    const subject = await browser.getTitle();
    const result  = 'Phrase Localizer';
    expect(subject).toEqual(result);
  });

  it('should have `Phrase Localizer` h2', async () => {
    const subject = await element(by.tagName('h2')).getAttribute('textContent');
    const result  = 'Phrase Localizer';
    expect(subject).toEqual(result);
  });

  it('should have `Log In` h4', async () => {
    const subject = await element(by.tagName('h4')).getAttribute('textContent');
    const result  = 'Log In';
    expect(subject).toEqual(result);
  });

  it('should have `Email` input', async () => {
    const subject = await element(by.name('email'));
    const subjectPlaceholder: string = await element(by.name('email')).getAttribute('placeholder');
    const result  = 'Email';
    expect(!!subject).toBeTruthy();
    expect(subjectPlaceholder).toBeTruthy(result);
  });

  it('should have `Password` input', async () => {
    const subject = await element(by.name('password'));
    const subjectPlaceholder: string = await element(by.name('password'))
      .getAttribute('placeholder');
    const result  = 'Password';
    expect(!!subject).toBeTruthy();
    expect(subjectPlaceholder).toBeTruthy(result);
  });

  it('should have `LOGIN` button', async () => {
    const subject = await element(by.tagName('button'));
    const subjectInnerText: string = await element(by.tagName('button')).getAttribute('innerText');
    const result  = 'LOGIN';
    expect(!!subject).toBeTruthy();
    expect(subjectInnerText).toBeTruthy(result);
  });

  it('should click `LOGIN` button', async () => {
    const button = await element(by.tagName('button'));
    const expected = browser.ExpectedConditions;
    browser.wait(expected.elementToBeClickable(button));
    button.click().then(() => {
      console.log('button clicked!');
    });
  });
});
