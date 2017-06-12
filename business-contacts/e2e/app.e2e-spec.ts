import { BusinessContactsPage } from './app.po';

describe('business-contacts App', () => {
  let page: BusinessContactsPage;

  beforeEach(() => {
    page = new BusinessContactsPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
