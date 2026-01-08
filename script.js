function openFullscreen(img) {
    const modal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const modalName = document.getElementById('modalName');
    const modalPosition = document.getElementById('modalPosition');
    
    fullscreenImage.src = img.src;
    // Prefer data attributes but fall back to the visible name/position in the member card.
    let name = img.dataset.name || '';
    let position = img.dataset.position || '';

    // If dataset missing or placeholder text, look up the values from the DOM.
    const memberCard = img.closest('.team-member');
    if ((!name || name.trim() === '') && memberCard) {
        const nameEl = memberCard.querySelector('.member-name');
        if (nameEl) name = nameEl.textContent.trim();
    }
    if ((!position || position.trim() === '' || position.trim().toLowerCase() === 'insert here') && memberCard) {
        const posEl = memberCard.querySelector('.member-position');
        if (posEl) position = posEl.textContent.trim();
    }

    modalName.textContent = name;
    modalPosition.textContent = position;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
    const modal = document.getElementById('fullscreenModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFullscreen();
    }
});

/* Gallery (documentation) functionality */
let galleryImages = [];
let currentGalleryIndex = 0;
let touchStartX = 0;

function buildGalleryData(){
    galleryImages = [];
    const imgs = document.querySelectorAll('.doc-item img');
    imgs.forEach((img, i) => {
        const captionEl = img.closest('figure')?.querySelector('figcaption');
        galleryImages.push({ src: img.src, caption: captionEl ? captionEl.textContent.trim() : '' });
    });
}

function openGallery(index){
    buildGalleryData();
    currentGalleryIndex = index || 0;
    showGalleryImage(currentGalleryIndex);
    const modal = document.getElementById('galleryModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // attach touch listeners for swipe
    modal.addEventListener('touchstart', onTouchStart);
    modal.addEventListener('touchend', onTouchEnd);
}

function closeGallery(){
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    modal.removeEventListener('touchstart', onTouchStart);
    modal.removeEventListener('touchend', onTouchEnd);
}

function showGalleryImage(index){
    const img = document.getElementById('galleryImage');
    const caption = document.getElementById('galleryCaption');
    if (!galleryImages.length) return;
    const item = galleryImages[(index+galleryImages.length) % galleryImages.length];
    img.src = item.src;
    caption.textContent = item.caption || '';
}

function nextImage(){
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    showGalleryImage(currentGalleryIndex);
}

function prevImage(){
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    showGalleryImage(currentGalleryIndex);
}

function onTouchStart(e){
    touchStartX = e.changedTouches[0].clientX;
}

function onTouchEnd(e){
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextImage(); else prevImage();
    }
}

// keyboard navigation for gallery
document.addEventListener('keydown', function(e){
    const modal = document.getElementById('galleryModal');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeGallery();
});

// Scroll to Top Button Functionality
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize scroll button click handler
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', scrollToTop);
    }
});

/* Image Modal Functionality */
function openModal(element) {
    const img = element.querySelector('.gallery-image');
    const caption = element.querySelector('.gallery-caption');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImage.src = img.src;
    modalCaption.textContent = caption.textContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking on the background
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal && modal.classList.contains('active') && event.key === 'Escape') {
        closeModal();
    }
});