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
