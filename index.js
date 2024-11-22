var swiper = new Swiper(".mySwiper", {
    
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 2,
        },
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 創建導航欄
    const nav = document.createElement('nav');
    nav.className = 'fixed top-0 left-0 right-0 bg-[#d0e3cc]/[0.9] shadow-md z-50';
    
    // 導航項目
    const navItems = [
        { id: "intro", label: "個人簡介" },
        { id: "tech", label: "技術經歷" },
        { id: "schedule", label: "時間安排" },
        { id: "thoughts", label: "技術思考" },
        { id: "emotion", label: "情緒處理" },
        { id: "sharing", label: "開發心得" },
        { id: "social", label: "社會連結" },
        { id: "extra", label: "想說的話" }
    ];

    const navContent = `
        <div class="max-w-4xl mx-auto px-4">
            <div class="flex items-center justify-between h-16">
                <span class="text-2xl font-semibold text-gray-800">深度學習</span>
                <div class="hidden md:flex space-x-4">
                    ${navItems.map(item => `
                        <button 
                            onclick="scrollToSection('${item.id}')"
                            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            ${item.label}
                        </button>
                    `).join('')}
                </div>
                <button id="mobile-menu-button" class="md:hidden text-gray-600 hover:text-gray-900">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 bg-white">
                ${navItems.map(item => `
                    <button
                        onclick="scrollToSection('${item.id}')"
                        class="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium"
                    >
                        ${item.label}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    nav.innerHTML = navContent;
    document.body.insertBefore(nav, document.body.firstChild);

    // 移動端菜單切換
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // 回到頂部按鈕
    const scrollButton = document.createElement('button');
    scrollButton.className = 'fixed bottom-4 right-4 bg-[#dba159] text-white p-2 rounded-full shadow-lg hover:bg-[#8b6b3d] transition-colors duration-200 hidden';
    scrollButton.innerHTML = `
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
    `;
    document.body.appendChild(scrollButton);

    // 監聽滾動事件
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.remove('hidden');
        } else {
            scrollButton.classList.add('hidden');
        }
    });

    // 回到頂部功能
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// 滾動到指定區段
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const offset = 80; // 導航欄高度
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    // 關閉移動端菜單
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.add('hidden');
}

(function() {
    // 等待 DOM 完全加載
    document.addEventListener('DOMContentLoaded', function() {
        // 使用事件委派，監聽所有 demo-button 的點擊事件
        document.addEventListener('click', function(e) {
            // 檢查被點擊的元素是否有 demo-button class
            if (e.target.closest('.demo-button')) {
                const button = e.target.closest('.demo-button');
                handleDemoButtonClick(button);
            }
        });
    });

    // 處理按鈕點擊的函數
    function handleDemoButtonClick(button) {
        // 從 data-url 屬性獲取 URL
        const demoUrl = button.dataset.url;
        
        if (!demoUrl) {
            console.error('No URL provided for this demo button');
            return;
        }

        // 驗證 URL
        if (isValidUrl(demoUrl)) {
            // 開啟新視窗
            const newWindow = window.open(demoUrl, '_blank');
            
            // 確保新視窗成功開啟並設置安全選項
            if (newWindow) {
                newWindow.opener = null;
            }
        } else {
            console.error('Invalid URL provided:', demoUrl);
        }
    }

    // URL 驗證函數
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            console.error('Invalid URL:', e);
            return false;
        }
    }
})();