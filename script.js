document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const introCover = document.getElementById('intro-cover');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    // 1. Cover Open Animation
    openBtn.addEventListener('click', () => {
        // Fire Confetti
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#cba135', '#4a121a']
        });

        // Slide Down Effect
        introCover.style.transform = 'translateY(100vh)';
        introCover.style.opacity = '0';

        // Show Main
        mainContent.classList.remove('hidden');

        // Play Music from second 28
        bgMusic.currentTime = 28;
        bgMusic.play().catch(err => console.log('Autoplay blocked:', err));

        // Start Auto Scroll (M2a5ar 300ms 3shan el iPhone maysh3lsh kol haga sawa w ye3l2)
        setTimeout(() => {
            startAutoScroll();
        }, 300);

        // Hide overlay from DOM after transition
        setTimeout(() => {
            introCover.style.display = 'none';
        }, 1000);
    });

    // 2. Swiper Initialization (3D Coverflow)
    if (typeof Swiper !== 'undefined') {
        new Swiper('.mySwiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }

    // 3. Countdown Timer
    var countDownDate = new Date("Oct 19, 2026 19:00:00").getTime();

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown-timer").innerHTML = "IT'S TIME!";
        }
    }, 1000);

    // 4. Music Toggle logic
    let isPlaying = false;
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                isPlaying = true;
            } else {
                bgMusic.pause();
                isPlaying = false;
            }
        });
    }

    // 5. Gallery Slider Logic
    let currentIndex = 0;
    const cards = document.querySelectorAll('.gallery-card');
    const dots = document.querySelectorAll('.gallery-dots .dot');

    function updateGallery(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next', 'hidden-card');
            
            if (i === index) {
                card.classList.add('active');
            } else if (i === (index - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (i === (index + 1) % cards.length) {
                card.classList.add('next');
            } else {
                card.classList.add('hidden-card');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateGallery(currentIndex);
    }

    if (cards.length > 0) {
        let slideInterval = setInterval(nextSlide, 3000);

        const container = document.getElementById('galleryContainer');
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(slideInterval));
            container.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3000));
        }

        updateGallery(currentIndex);
    }
});
function startAutoScroll() {
    let stopped = false;
    let scrollInterval;

    function startScrolling() {
        if (stopped) return;

        // بنستخدم setInterval بمسافات زمنية صغيرة (مثلاً كل 20 ملي ثانية) 
        // الطريقة دي أثبتت كفاءة عالية جداً مع آيفون وسافاري لأنها مش بتعتمد على requestAnimationFrame اللي بيتعطل
        scrollInterval = setInterval(() => {
            if (stopped) {
                clearInterval(scrollInterval);
                return;
            }

            const currentScroll = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            if (currentScroll >= maxScroll - 2) {
                stopped = true;
                clearInterval(scrollInterval);
                return;
            }

            // بنحرك الصفحة خطوة صغيرة
            window.scrollBy(0, 1);
        }, 25); // كل 25 مللي ثانية خطوة، هتديك حركة سلسة جداً في الآيفون وكل الموبايلات
    }

    // تأخير بسيط جداً بعد الضغط عشان الآيفون يفتح الصفحة ويجهز الـ DOM
    setTimeout(() => {
        startScrolling();
    }, 800);

    function stopScroll() {
        if (stopped) return;
        stopped = true;
        clearInterval(scrollInterval);
    }

    // أي حركة من المستخدم (لمس، سكرول بالماوس، أو تاتش) توقف الأوتو سكرول فوراً عشان يسيب لليوزر التحكم
    window.addEventListener('touchstart', stopScroll, { passive: true, once: true });
    window.addEventListener('touchmove', stopScroll, { passive: true, once: true });
    window.addEventListener('wheel', stopScroll, { passive: true, once: true });
    window.addEventListener('mousedown', stopScroll, { passive: true, once: true });
}



// --- Firebase Configuration (مربوط بقاعدتك الجديدة) ---
const firebaseConfig = {
    apiKey: "AIzaSyCfFK13FQLqViYnKkv-0AmVVjiPLoLT1dg",
    authDomain: "nourhanda-ali-wedding.firebaseapp.com",
    databaseURL: "https://nourhanda-ali-wedding-default-rtdb.firebaseio.com",
    projectId: "nourhanda-ali-wedding",
    storageBucket: "nourhanda-ali-wedding.appspot.com",
    messagingSenderId: "1000557505963",
    appId: "1:1000557505963:web:1517e398618d33b53ff6ee"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// Guestbook Logic
const guestForm = document.getElementById('guestbook-form');
const guestNameInput = document.getElementById('guest-name');
const guestMessageInput = document.getElementById('guest-message');
const wishesContainer = document.getElementById('wishes-container');

if (guestForm) {
    guestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = guestNameInput.value.trim();
        const message = guestMessageInput.value.trim();

        if (!name || !message) return;

        const timestamp = new Date().toLocaleString();

        // Push to Firebase Realtime Database
        db.ref('wishes').push({
            name: name,
            message: message,
            date: timestamp
        }, (error) => {
            if (!error) {
                guestNameInput.value = '';
                guestMessageInput.value = '';
            } else {
                alert('حصلت مشكلة، حاول تاني.');
            }
        });
    });

    // Listen for wishes in real-time
}

if (wishesContainer) {
    db.ref('wishes').on('value', (snapshot) => {
        wishesContainer.innerHTML = '';
        const data = snapshot.val();
        if (data) {
            const wishes = Object.values(data).reverse(); // أحدث التهنئات فوق
            wishes.forEach(wish => {
                const wishDiv = document.createElement('div');
                wishDiv.className = 'wish-item';
                wishDiv.innerHTML = `
                    <div class="wish-header">
                        <span class="wish-author">${escapeHtml(wish.name)}</span>
                        <span class="wish-date">${escapeHtml(wish.date)}</span>
                    </div>
                    <div class="wish-text">${escapeHtml(wish.message)}</div>
                `;
                wishesContainer.appendChild(wishDiv);
            });
        }
    });
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}