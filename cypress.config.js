module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};


// module.exports = {
//   e2e: {
//     setupNodeEvents(on, config) {
//       // 添加允許訪問本地文件的設定
//       on('before:browser:launch', (browser = {}, launchOptions) => {
//         if (browser.name === 'chrome' || browser.name === 'electron') {
//           launchOptions.args.push('--allow-file-access-from-files')
//         }
//         return launchOptions
//       })
//     },
//     experimentalModifyObstructiveThirdPartyCode: true,
//     supportFile: 'cypress/support/e2e.js',  // 添加支援文件路徑
//     chromeWebSecurity: false  // 允許載入 CDN 資源
//   },
// };