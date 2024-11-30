
document.addEventListener('DOMContentLoaded', function () {
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

(function () {
    // 等待 DOM 完全加載
    document.addEventListener('DOMContentLoaded', function () {
        // 使用事件委派，監聽所有 demo-button 的點擊事件
        document.addEventListener('click', function (e) {
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

// cardTemplate.js
function createProjectCard({
    title,
    description,
    tags,
    badgeText,
    colorScheme = 'orange',
    links = [],
    imageUrl = 'https://via.placeholder.com/600x400'
}) {
    const colors = {
        orange: {
            badge: 'bg-orange-50/90 text-orange-700',
            overlay: 'from-orange-500/30 via-rose-500/50 to-rose-900/90',
            tagBg: 'bg-orange-300/20',
            tagText: 'text-orange-50',
            contentBg: 'from-orange-50/50'
        },
        amber: {
            badge: 'bg-amber-50/90 text-amber-900',
            overlay: 'from-amber-950/30 to-amber-950/80',
            tagBg: 'bg-amber-900/30',
            tagText: 'text-amber-50',
            contentBg: 'from-amber-50/50'
        }
    };

    const theme = colors[colorScheme];

    const tagsHtml = tags.map(tag => `
        <span class="px-2 py-1 text-xs ${theme.tagBg} ${theme.tagText} rounded-md backdrop-blur-sm">
            ${tag}
        </span>
    `).join('');

    const linksHtml = links.map(link => `
        <a href="${link.url}" 
           class="group flex items-center justify-between p-3 rounded-lg border border-${colorScheme}-200 hover:bg-${colorScheme}-50/70 transition duration-300">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-${colorScheme}-100 to-rose-100 flex items-center justify-center group-hover:from-${colorScheme}-200 group-hover:to-rose-200 transition duration-300">
                    ${link.icon}
                </div>
                <span class="text-sm font-medium text-${colorScheme}-900 group-hover:text-${colorScheme}-950">
                    ${link.label}
                </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" 
                 class="h-5 w-5 text-${colorScheme}-400 group-hover:text-${colorScheme}-600 transition-transform duration-300 group-hover:translate-x-1"
                 viewBox="0 0 20 20" 
                 fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </a>
    `).join('');

    return `
        <div class="swiper-slide">
            <div class="w-80 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl overflow-hidden">
                <div class="relative">
                    <img src="${imageUrl}" alt="${title}" class="w-full h-48 object-cover transition duration-300" />
                    <div class="absolute inset-0 bg-gradient-to-b ${theme.overlay}">
                        <span class="absolute top-4 left-4 px-3 py-1 text-xs font-medium ${theme.badge} rounded-full backdrop-blur-sm">
                            ${badgeText}
                        </span>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                        <h3 class="text-xl font-bold text-${colorScheme}-50 mb-1">${title}</h3>
                        <div class="flex gap-2">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-gradient-to-b ${theme.contentBg}">
                    <p class="text-${colorScheme}-950 text-sm leading-relaxed mb-6">
                        ${description}
                    </p>
                    <div class="space-y-3">
                        ${linksHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// sectionTemplate.js
function createSection({ id, title, content }) {
    return `
        <section id="${id}" class="bg-white rounded-lg shadow-sm p-6 transition duration-300 hover:shadow-md">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">${title}</h2>
            <div class="space-y-4 text-gray-600">
                ${content}
            </div>
        </section>
    `;
}

// 項目資料
const projectsData = [
    {
        title: '收納規劃應用',
        description: '開發一款收納管理應用，運用 SVG 技術實現互動式空間規劃功能。',
        tags: ['SVG', 'Auth0', 'Google OAuth 2.0'],
        badgeText: 'IT鐵人賽',
        colorScheme: 'orange',
        imageUrl: 'https://via.placeholder.com/600x400',
        links: [
            {
                url: 'https://ithelp.ithome.com.tw/users/20162350/ironman/8027',
                label: '鐵人賽文章',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                      </svg>`
            },
            {
                url: 'https://stackblitz.com/edit/stackblitz-starters-d6dksw',
                label: 'Demo',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd" />
                      </svg>`
            },
            {
                url: '#',
                label: '課程作業',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>`
            }
        ]
    },
    {
        title: 'Node.js 培訓課程',
        description: '完成為期三個月的後端開發實戰培訓，專注於 Node.js 技術棧的應用與實踐。',
        tags: ['Node.js', 'Express', 'RESTful API'],
        badgeText: '自主培訓',
        colorScheme: 'amber',
        imageUrl: 'https://via.placeholder.com/600x400',
        links: [
            {
                url: '#',
                label: '成果展示',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                      </svg>`
            },
            {
                url: '#',
                label: '專案規劃',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd" />
                      </svg>`
            }
        ]
    },
    {
        title: '咒語開發網頁小遊戲',
        description: '以指令產生網頁版跑跑薑餅人的小遊戲，圖片也使用AI生成。',
        tags: ['GPT', 'DALL-E', 'HTML'],
        badgeText: '自主學習',
        colorScheme: 'orange',
        imageUrl: 'image/running.png',
        links: [
            {
                url: '#',
                label: '成果展示',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                      </svg>`
            },
            {
                url: '#',
                label: '專案規劃',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd" />
                      </svg>`
            }
        ]
    },
    {
        title: '立委競選官網',
        description: 'The F2E 5th 前端& UI 修煉精神時光屋 mission1 比賽題目',
        tags: ['tailwind', '全遠端合作'],
        badgeText: '前端競賽',
        colorScheme: 'amber',
        imageUrl: 'https://via.placeholder.com/600x400',
        links: [
            {
                url: 'https://zoe561.github.io/thef2e2023-legislator-election-official-website/',
                label: '成果展示',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                      </svg>`
            },
            {
                url: 'https://2023.thef2e.com/users/12061579704051710124',
                label: '參賽資訊',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd" />
                      </svg>`
            }
        ]
    }
];

// 章節資料
const sectionsData = [
    {
        id: 'schedule',
        title: '如果參與這個訓練，會怎麼安排學習時間？',
        content: `
            <ul class="list-disc list-inside space-y-2">
                <li>平日：2~3天，一天2小時</li>
                <li>假日：1天，5~8小時</li>
                <li>每月選一個周末休息</li>
                <li>通常無法參與線下課程，剛入職不久特休不夠，最多可能每月出現一次，如果確定可以參加，會付全額場地費(不過如果可以有點彈性當然更好)</li>
            </ul>
        `
    },
    {
        id: 'thoughts',
        title: '軟體技術日新月異，如何確定選擇投入的領域是正確有回報的？',
        content: `
            <div class="space-y-4">
                <p>首先要定義什麼是「正確」、什麼是「有回報」的，不過定義「正確」這件事對我來說難度有點高，所以我決定先跳過定義正確這件事。</p>
                <p>至於「有回報」這件事我倒是可以定義，能滿足我對未知世界的好奇心，就能對我帶來回報，能夠為我帶來工作機會、能夠為我帶來加薪的機會、能夠讓我在需要的時候完成我的個人專案，就是有回報的。</p>
            </div>
        `
    },
    {
        id: 'emotion',
        title: '請描述一件產生明顯負面情緒的經歷，如何處理該情緒？',
        content: `
            <div class="space-y-4">
                <p>之前有一個很趕專案，大家被時程趕到身體出了狀況(眼睛出血或身體疼痛)，紛紛開始離職，最後只剩我一個人，我也出現了明顯的身體狀況，在上線期間幾乎無法喘過氣，因為恐慌跟焦慮。</p>
                <p>我會離開現場深呼吸後回來，有時候睡前開始慌張的話，我會把情緒化型為小鳥，自己則是坐在室內，面向一個大窗戶，看著情緒自己來去。</p>
            </div>
        `
    },
    {
        id: 'sharing',
        title: '關於這份申請網頁，分享一個開發時的技術心得',
        content: `
            <div class="space-y-4">
                <p>「為什麼 JavaScript 檔案要放在 </body> 標籤前？」</p>
                <p>因為太久沒有寫原生的 JS ，所以習慣性的把所有引用的部分放到上方，也就是 <Head></Head> 裡面，結果導致我的套件跟我的 script 無法正確生效。後來重新找了一下為什麼，才發現忘記要等 DOM 都載入之後，才能對 DOM 操作，所以改放到 </body> 上一行，解決這個問題。</p>
            </div>
        `
    },
    {
        id: 'social',
        title: '如何看待自身工作和整個社會群體的連結關係？',
        content: `
            <div class="space-y-4">
                <p>我的工作是簡化各式各樣的流程，讓資料可以容易的記錄、取得、閱讀跟訂正，減少紙本文件跟運輸碳排放，數位化也減少實體空間存放需求，讓資料更容易地被分析，提高經濟效益同時友善環境。</p>
            </div>
        `
    },
    {
        id: 'extra',
        title: '其他想要對我們說的事情？',
        content: `
            <p>謝謝你們提供的資源。</p>
            <p>我希望周一會議不要超過晚上10點，睡得太少我隔天會狀態不好。</p>
        `
    }
];
// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
    // 渲染項目卡片
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    projectsData.forEach(project => {
        swiperWrapper.innerHTML += createProjectCard(project);
    });

    // 渲染章節
    const main = document.querySelector('main');
    sectionsData.forEach(section => {
        main.innerHTML += createSection(section);
    });

    // 初始化 Swiper
    // initSwiper();


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
});
