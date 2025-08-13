document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const loadMoreBtn = document.querySelector('.load-more');
    const newsletterForm = document.getElementById('newsletterForm');

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') {
            alert('Please enter a search term');
            return;
        }
        
        let found = false;
        newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'block';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (!found) {
            alert('No results found for: ' + searchInput.value);
            newsCards.forEach(card => card.style.display = 'block');
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            newsCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const additionalNews = [
        {
            category: 'releases',
            title: 'Retro Runner X Hits 1 Million Downloads',
            content: 'The indie platformer celebrates a major milestone with free DLC announcement.',
            time: '3 days ago',
            image: 'Retro+Runner+X'
        },
        {
            category: 'updates',
            title: 'Cosmic Cafe Adds Multiplayer Mode',
            content: 'The space restaurant simulator now lets you cook with friends in chaotic co-op.',
            time: '4 days ago',
            image: 'Cosmic+Cafe'
        },
        {
            category: 'events',
            title: 'Indie Game Awards 2025 Nominees Announced',
            content: 'Vote for your favorite indie games across 15 categories including Best Narrative.',
            time: '5 days ago',
            image: 'Awards+2025'
        },
        {
            category: 'releases',
            title: 'Shadow Forge: Crafting Adventure in Darkness',
            content: 'Combine stealth and crafting in this unique indie title launching next week.',
            time: '1 week ago',
            image: 'Shadow+Forge'
        }
    ];

    let newsLoaded = false;
    
    loadMoreBtn.addEventListener('click', function() {
        if (!newsLoaded) {
            const newsContainer = document.getElementById('newsContainer');
            
            additionalNews.forEach(news => {
                const article = document.createElement('article');
                article.className = 'news-card';
                article.dataset.category = news.category;
                article.style.animation = 'fadeIn 0.5s';
                
                article.innerHTML = `
                    <img src="https://via.placeholder.com/400x200/FF6B6B/ffffff?text=${news.image}" alt="${news.title}">
                    <div class="news-content">
                        <span class="news-category">${news.category.charAt(0).toUpperCase() + news.category.slice(1)}</span>
                        <h3>${news.title}</h3>
                        <p>${news.content}</p>
                        <time>${news.time}</time>
                    </div>
                `;
                
                newsContainer.appendChild(article);
            });
            
            this.textContent = 'No More News';
            this.disabled = true;
            newsLoaded = true;
        }
    });

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            this.reset();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.news-card, .featured-game, .resource-card').forEach(el => {
        observer.observe(el);
    });

    const dynamicNewsData = {
        releases: [
            {
                title: 'Neon Dreams Launches Early Access',
                content: 'Cyberpunk puzzle platformer now available with 20% launch discount.',
                time: '30 minutes ago'
            },
            {
                title: 'Forest Spirits Coming to Console',
                content: 'The beloved indie adventure game announces PlayStation and Xbox ports.',
                time: '1 hour ago'
            }
        ],
        updates: [
            {
                title: 'Pixel Pirates Gets Season Pass',
                content: 'Four content updates planned throughout 2025 with new islands and ships.',
                time: '3 hours ago'
            }
        ],
        events: [
            {
                title: 'Summer Game Fest Indie Showcase',
                content: 'Submit your indie game for a chance to be featured at the biggest gaming event.',
                time: '6 hours ago'
            }
        ]
    };

    function updateNewsTimestamps() {
        document.querySelectorAll('.news-content time').forEach(timeEl => {
            const text = timeEl.textContent;
            if (text.includes('hour')) {
                const hours = parseInt(text);
                if (hours < 24) {
                    timeEl.textContent = (hours + 1) + ' hours ago';
                } else {
                    timeEl.textContent = Math.floor(hours / 24) + ' days ago';
                }
            }
        });
    }

    setInterval(updateNewsTimestamps, 3600000);

    function createNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #6C63FF, #4ECDC4);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            animation: slideIn 0.3s, slideOut 0.3s 2.7s;
            z-index: 9999;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setTimeout(() => {
        createNotification('🎮 New indie game releases available!');
    }, 5000);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Indie Game Hub initialized successfully!');
});