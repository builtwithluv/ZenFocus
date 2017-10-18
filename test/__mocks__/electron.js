const mock = {
  require: jest.genMockFunction(),
  match: jest.genMockFunction(),
  app: jest.genMockFunction(),
  remote: jest.genMockFunction(),
  dialog: jest.genMockFunction()
};

mock.app.getPath = jest.genMockFunction();
mock.app.getAppPath = jest.genMockFunction();

mock.remote.app = jest.genMockFunction();
mock.remote.app.getPath = jest.genMockFunction();
mock.remote.app.getAppPath = jest.genMockFunction();

module.exports = mock;
