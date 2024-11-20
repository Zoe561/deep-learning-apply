var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        // 當視窗寬度 >= 640px
        640: {
            slidesPerView: 2,
            spaceBetween: 16,
        },
        // 當視窗寬度 >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 16,
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 創建導航欄
    const nav = document.createElement('nav');
    nav.className = 'fixed top-0 left-0 right-0 bg-white shadow-md z-50';
    
    // 導航項目
    const navItems = [
        { id: "intro", label: "個人簡介" },
        { id: "tech", label: "技術經歷" },
        { id: "schedule", label: "時間安排" },
        { id: "thoughts", label: "技術思考" },
        { id: "emotion", label: "情緒處理" },
        { id: "sharing", label: "開發心得" },
        { id: "social", label: "社會連結" },
        { id: "extra", label: "補充說明" }
    ];

    const navContent = `
        <div class="max-w-4xl mx-auto px-4">
            <div class="flex items-center justify-between h-16">
                <span class="text-2xl font-semibold text-gray-800">課程申請</span>
                <div class="hidden md:flex space-x-4">
                    ${navItems.map(item => `
                        <button 
                            onclick="scrollToSection('${item.id}')"
                            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
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
    scrollButton.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 hidden';
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