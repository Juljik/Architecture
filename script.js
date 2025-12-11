// Функционал для фильтрации портфолио
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация активных кнопок фильтра
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок в той же колонке
            const column = this.closest('.filter-column');
            const buttonsInColumn = column.querySelectorAll('.filter-btn');
            buttonsInColumn.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс на нажатую кнопку
            this.classList.add('active');
            
            // Здесь можно добавить логику фильтрации изображений портфолио
            filterPortfolio();
        });
    });
    
    function filterPortfolio() {
        // Собираем активные фильтры
        const activeFilters = {
            year: getActiveFilterValue('data-year'),
            type: getActiveFilterValue('data-type'),
            size: getActiveFilterValue('data-size'),
            material: getActiveFilterValue('data-material'),
            status: getActiveFilterValue('data-status')
        };
        
        console.log('Активные фильтры:', activeFilters);
        // Здесь будет логика фильтрации изображений портфолио
        // В реальном проекте здесь будет обращение к базе данных или массиву проектов
    }
    
    function getActiveFilterValue(dataAttribute) {
        const activeButton = document.querySelector(`.filter-btn.active[${dataAttribute}]`);
        return activeButton ? activeButton.getAttribute(dataAttribute) : 'all';
    }
    
    // Заглушка для видео, если оно не загружено
    const mainVideo = document.getElementById('mainVideo');
    if (mainVideo) {
        mainVideo.addEventListener('error', function() {
            console.log('Видео не загружено. Убедитесь, что файл video/main-video.mp4 существует.');
            // Можно показать заглушку или фоновое изображение
            this.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        });
    }
    // Функционал навигационного меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Переключение мобильного меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
          // Закрытие меню при клике на ссылку (на мобильных)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            // Удаляем активный класс у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
        });
    });
    
    // Активная ссылка при скролле
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Закрытие меню при клике вне его области (для мобильных)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
    
    // Проверка загрузки изображений
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Изображение ${this.src} не загружено.`);
            // Замена на placeholder
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + 
                      this.width + '" height="' + this.height + 
                      '" viewBox="0 0 100 100" preserveAspectRatio="none">' +
                      '<rect width="100" height="100" fill="%23f0f0f0"/>' +
                      '<text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23aaa" font-family="sans-serif" font-size="10">' +
                      this.alt + '</text></svg>';
        });
    });
});