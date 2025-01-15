// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// cypress/support/e2e.js

// 禁用未捕獲的異常導致測試失敗
Cypress.on('uncaught:exception', (err, runnable) => {
    // 返回 false 阻止 Cypress 把未捕獲的異常變成測試失敗
    return false
})

// // 在每個測試前載入 CDN
// beforeEach(() => {
//     cy.visit('/', {
//         onBeforeLoad: (win) => {
//             // 創建 script 標籤載入 Tailwind
//             let tailwindScript = win.document.createElement('script')
//             tailwindScript.src = 'https://cdn.tailwindcss.com'
//             win.document.head.appendChild(tailwindScript)

//             // 創建 script 標籤載入 Swiper
//             let swiperScript = win.document.createElement('script')
//             swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
//             win.document.head.appendChild(swiperScript)

//             // 載入 Swiper CSS
//             let swiperStyle = win.document.createElement('link')
//             swiperStyle.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
//             swiperStyle.rel = 'stylesheet'
//             win.document.head.appendChild(swiperStyle)
//         }
//     })

//     // 等待外部資源載入完成
//     cy.wait(1000)
// })