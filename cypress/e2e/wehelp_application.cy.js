describe('WeHelp 申請網站測試', () => {
  beforeEach(() => {
    cy.visit('../../index.html')
    // 確保外部資源完全載入
    cy.wait(1000)
  })
  describe('基本內容測試', () => {
    it('網頁標題應該正確', () => {
      cy.title().should('eq', 'WeHelp Bootcamp 第六屆')
    })

    it('頁面載入時應該顯示課程申請標題', () => {
      cy.get('h1').contains('課程申請').should('be.visible')
    })
  })

  describe('導航列功能測試', () => {
    const navItems = [
      { text: '個人簡介', id: 'intro' },
      { text: '技術經歷', id: 'tech' },
      { text: '時間安排', id: 'schedule' },
      { text: '技術思考', id: 'thoughts' },
      { text: '情緒處理', id: 'emotion' },
      { text: '開發心得', id: 'sharing' },
      { text: '社會連結', id: 'social' },
      { text: '想說的話', id: 'extra' }
    ]

    it('導航列應固定在頁面頂部', () => {
      cy.get('nav').should('have.class', 'fixed')
      cy.get('nav').should('have.class', 'top-0')
    })

    navItems.forEach(({ text, id }) => {
      it(`點擊 "${text}" 應該滾動到對應區塊`, () => {
        cy.get('nav').contains(text).click()
        cy.get(`#${id}`).should('be.visible')
      })
    })

    it('背景應該有半透明效果', () => {
      cy.get('nav').should('have.class', 'bg-[#d0e3cc]/[0.9]')
    })
  })

  describe('專案卡片 Swiper 功能測試', () => {
    beforeEach(() => {
      cy.get('#tech').scrollIntoView()
    })

    it('應該顯示正確數量的專案卡片', () => {
      cy.get('.swiper-slide').should('have.length', 4)
    })

    it('每個專案卡片應包含必要資訊', () => {
      cy.get('.swiper-slide').each(($slide) => {
        // 檢查標題
        cy.wrap($slide).find('h3').should('exist')
        // 檢查描述
        cy.wrap($slide).find('p').should('exist')
        // 檢查標籤
        cy.wrap($slide).find('span[class*="px-2 py-1"]').should('exist')
        // 檢查連結
        cy.wrap($slide).find('a').should('exist')
      })
    })

    it('檢查特定專案資訊正確性', () => {
      // 檢查第一個專案
      cy.get('.swiper-slide').first().within(() => {
        cy.contains('收納規劃應用').should('exist')
        cy.contains('IT鐵人賽').should('exist')
        cy.contains('SVG').should('exist')
        cy.contains('Auth0').should('exist')
      })
    })
  })

  describe('RWD 響應式測試', () => {
    it('桌面版應顯示完整導航', () => {
      cy.viewport(1024, 768)
      cy.get('nav .md\\:flex').should('be.visible')
      cy.get('#mobile-menu-button').should('not.be.visible')
    })

    it('手機版應顯示漢堡選單', () => {
      cy.viewport('iphone-6')
      cy.get('#mobile-menu-button').should('be.visible')
      cy.get('nav .md\\:flex').should('not.be.visible')
    })

    it('手機版點擊漢堡選單應展開/收合', () => {
      cy.viewport('iphone-6')
      // 點擊前選單應該是隱藏的
      cy.get('#mobile-menu').should('have.class', 'hidden')

      // 點擊後選單應該顯示
      cy.get('#mobile-menu-button').click()
      cy.get('#mobile-menu').should('not.have.class', 'hidden')

      // 再次點擊應該隱藏
      cy.get('#mobile-menu-button').click()
      cy.get('#mobile-menu').should('have.class', 'hidden')
    })
  })

  describe('回到頂部按鈕測試', () => {
    it('初始時按鈕應該隱藏', () => {
      cy.get('button.fixed.bottom-4.right-4').should('have.class', 'hidden')
    })

    it('滾動後按鈕應該顯示', () => {
      cy.scrollTo(0, 500)
      cy.get('button.fixed.bottom-4.right-4').should('not.have.class', 'hidden')
    })

    it('點擊按鈕應該回到頂部', () => {
      cy.scrollTo(0, 500)
      cy.get('button.fixed.bottom-4.right-4').click()
      // 等待滾動動畫
      cy.wait(1000)
      cy.window().its('scrollY').should('eq', 0)
    })
  })

  describe('章節內容測試', () => {
    it('個人簡介應包含工作經驗描述', () => {
      cy.get('#intro').within(() => {
        cy.contains('工程師').should('exist')
        cy.contains('永豐金證券').should('exist')
      })
    })

    it('時間安排部分應包含具體時間規劃', () => {
      cy.get('#schedule').within(() => {
        cy.contains('平日').should('exist')
        cy.contains('假日').should('exist')
      })
    })

    it('開發心得應包含技術相關內容', () => {
      cy.get('#sharing').within(() => {
        cy.contains('JavaScript').should('exist')
        cy.contains('DOM').should('exist')
      })
    })
  })
})