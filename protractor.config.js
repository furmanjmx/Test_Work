exports.config = {
  specs: ['./e2e/**/bookingTest.js'],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{
    browserName: 'chrome',
    shardTestFiles: false,
    maxInstances: 1
  }],
  framework: 'jasmine2',
  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: false
  },
};
