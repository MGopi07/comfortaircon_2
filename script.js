/**
 * Comfort Aircon - HVAC & Air Conditioning Web Application JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic'
        });
    }

    // Elements
    const mainNav = document.getElementById('mainNav');
    const estServiceSelect = document.getElementById('estService');
    const estPricePreview = document.getElementById('estPricePreview');
    const estimateForm = document.getElementById('estimateForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const modalAppointmentForm = document.getElementById('modalAppointmentForm');
    const actionToast = document.getElementById('actionToast');
    const toastMessage = document.getElementById('toastMessage');
    
    // Initialize Bootstrap Toast
    let toastInstance = null;
    if (actionToast && typeof bootstrap !== 'undefined') {
        toastInstance = new bootstrap.Toast(actionToast);
    }

    function showNotification(msg) {
        if (toastMessage) {
            toastMessage.textContent = msg;
        }
        if (toastInstance) {
            toastInstance.show();
        } else {
            alert(msg);
        }
    }

    // 1. Sticky Navbar Scroll listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // 2. Dynamic Price & Solution Preview in Estimate Form
    const servicePrices = {
        'split-ac': 'Official Inverter Split Solutions',
        'vrf-system': 'Toshiba Commercial VRF Engineering',
        'cassette-ac': 'Architectural Ceiling Cassette Systems',
        'ductable-ac': 'Concealed Ductable HVAC Integration',
        'bulk-sales': 'Turnkey Enterprise HVAC Proposals'
    };

    if (estServiceSelect && estPricePreview) {
        estServiceSelect.addEventListener('change', (e) => {
            const selectedVal = e.target.value;
            if (servicePrices[selectedVal]) {
                estPricePreview.textContent = servicePrices[selectedVal];
            }
        });
    }

    // 3. Form Submission Handlers
    if (estimateForm) {
        estimateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('estName').value;
            showNotification(`Thank you ${name}! Your HVAC consultation request has been submitted. Our engineering team will contact you shortly.`);
            estimateForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            showNotification(`Subscribed successfully! Engineering insights and HVAC updates will be sent to ${emailInput.value}`);
            newsletterForm.reset();
        });
    }

    if (modalAppointmentForm) {
        const modalLocationSelect = document.getElementById('modalLocationSelect');
        const modalOtherLocationBox = document.getElementById('modalOtherLocationBox');
        const modalMessageArea = document.getElementById('modalMessageArea');
        const modalMsgCount = document.getElementById('modalMsgCount');

        if (modalLocationSelect && modalOtherLocationBox) {
            modalLocationSelect.addEventListener('change', (e) => {
                if (e.target.value === 'Other') {
                    modalOtherLocationBox.style.display = 'block';
                    const input = modalOtherLocationBox.querySelector('input');
                    if (input) input.required = true;
                } else {
                    modalOtherLocationBox.style.display = 'none';
                    const input = modalOtherLocationBox.querySelector('input');
                    if (input) input.required = false;
                }
            });
        }

        if (modalMessageArea && modalMsgCount) {
            modalMessageArea.addEventListener('input', (e) => {
                modalMsgCount.textContent = `${e.target.value.length} / 500 characters`;
            });
        }

        modalAppointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification(`Enquiry submitted successfully! Our HVAC specialist will follow up shortly.`);
            const modalEl = document.getElementById('appointmentModal');
            if (modalEl && typeof bootstrap !== 'undefined') {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
            modalAppointmentForm.reset();
            if (modalOtherLocationBox) modalOtherLocationBox.style.display = 'none';
            if (modalMsgCount) modalMsgCount.textContent = '0 / 500 characters';
        });
    }

    // 4. Smooth Scroll for Navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('hvacNavbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }

                    const navHeight = mainNav ? mainNav.offsetHeight : 70;
                    const targetPosition = targetElem.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. Product Category Filter & 3-Card Slider Logic
    const filterBtns = document.querySelectorAll('.product-filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    const productSliderWrapper = document.querySelector('.product-slider-wrapper');
    const productPrevBtn = document.getElementById('productPrevBtn');
    const productNextBtn = document.getElementById('productNextBtn');

    if (filterBtns.length > 0 && productItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                productItems.forEach(item => {
                    const category = item.getAttribute('data-category') || '';
                    if (filter === 'all' || category.includes(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (productSliderWrapper) {
                    productSliderWrapper.scrollTo({ left: 0, behavior: 'smooth' });
                }
            });
        });
    }

    if (productSliderWrapper && productPrevBtn && productNextBtn) {
        const getStep = () => {
            const visibleItem = productSliderWrapper.querySelector('.product-item:not([style*="display: none"])');
            if (!visibleItem) return productSliderWrapper.clientWidth / 3;
            const track = productSliderWrapper.querySelector('.product-slider-track');
            const gap = track ? parseFloat(window.getComputedStyle(track).gap) || 16 : 16;
            return visibleItem.offsetWidth + gap;
        };

        const slideNext = () => {
            const maxScroll = productSliderWrapper.scrollWidth - productSliderWrapper.clientWidth;
            if (productSliderWrapper.scrollLeft >= maxScroll - 15) {
                productSliderWrapper.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                productSliderWrapper.scrollBy({ left: getStep(), behavior: 'smooth' });
            }
        };

        const slidePrev = () => {
            if (productSliderWrapper.scrollLeft <= 15) {
                productSliderWrapper.scrollTo({ left: productSliderWrapper.scrollWidth, behavior: 'smooth' });
            } else {
                productSliderWrapper.scrollBy({ left: -getStep(), behavior: 'smooth' });
            }
        };

        productNextBtn.addEventListener('click', slideNext);
        productPrevBtn.addEventListener('click', slidePrev);

        // Auto-moving (Auto-play every 4.5 seconds for comfortable reading)
        let autoPlayTimer = setInterval(slideNext, 4500);

        // Pause auto-moving on hover & touch interaction
        productSliderWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        productSliderWrapper.addEventListener('mouseleave', () => {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(slideNext, 4500);
        });
        productSliderWrapper.addEventListener('touchstart', () => clearInterval(autoPlayTimer), { passive: true });
        productSliderWrapper.addEventListener('touchend', () => {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(slideNext, 4500);
        }, { passive: true });
    }

    // 5. Hero Interactive Climate Mode Selector
    const modePills = document.querySelectorAll('.hero-mode-pill');
    const heroWidgetIcon = document.getElementById('heroWidgetIcon');
    const heroWidgetBadge = document.getElementById('heroWidgetBadge');
    const heroWidgetText = document.getElementById('heroWidgetText');

    const modeData = {
        'cool': {
            icon: 'fa-solid fa-snowflake fa-spin-pulse',
            badge: 'Rapid Chill Active',
            text: '18°C • Turbo Cooling',
            badgeClass: 'badge-soft-blue'
        },
        'optimal': {
            icon: 'fa-solid fa-wind fa-bounce',
            badge: 'Optimal Climate',
            text: '21°C • Balanced Breeze',
            badgeClass: 'badge-soft-blue'
        },
        'eco': {
            icon: 'fa-solid fa-leaf fa-pulse',
            badge: 'Air Purification',
            text: '100% HEPA Air Fresh',
            badgeClass: 'badge-soft-success'
        }
    };

    if (modePills.length > 0) {
        modePills.forEach(pill => {
            pill.addEventListener('click', () => {
                modePills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const mode = pill.getAttribute('data-mode');
                if (modeData[mode] && heroWidgetText) {
                    heroWidgetIcon.className = modeData[mode].icon;
                    heroWidgetBadge.className = `${modeData[mode].badgeClass} d-block mb-1`;
                    heroWidgetBadge.style.cssText = 'font-size: 0.7rem; padding: 2px 8px;';
                    heroWidgetBadge.textContent = modeData[mode].badge;
                    heroWidgetText.textContent = modeData[mode].text;
                }
            });
        });
    }

    // 6. Live Temperature Simulator Controls (+ / -)
    let currentTemp = 18;
    const liveTempDisplay = document.getElementById('liveTempDisplay');
    const tempMinusBtn = document.getElementById('tempMinusBtn');
    const tempPlusBtn = document.getElementById('tempPlusBtn');

    function updateTempDisplay(val) {
        currentTemp = Math.max(16, Math.min(26, val));
        if (liveTempDisplay) {
            liveTempDisplay.textContent = `${currentTemp}°C`;
        }
        if (heroWidgetText) {
            heroWidgetText.textContent = `${currentTemp}°C • Custom Chill`;
        }
    }

    if (tempMinusBtn) {
        tempMinusBtn.addEventListener('click', () => updateTempDisplay(currentTemp - 1));
    }
    if (tempPlusBtn) {
        tempPlusBtn.addEventListener('click', () => updateTempDisplay(currentTemp + 1));
    }

    // 7. Scroll Reveal & Number Counter Animation
    const revealElems = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealElems.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animate number stats if present inside entry
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(numElem => {
                        if (!numElem.getAttribute('data-animated')) {
                            numElem.setAttribute('data-animated', 'true');
                            const targetVal = parseFloat(numElem.getAttribute('data-count-target'));
                            const decimals = parseInt(numElem.getAttribute('data-decimals') || '0', 10);
                            const suffix = numElem.getAttribute('data-suffix') || '';
                            let startVal = 0;
                            const duration = 1500;
                            const startTime = performance.now();

                            function step(currentTime) {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                                const currentVal = startVal + (targetVal - startVal) * easeOutProgress;
                                
                                numElem.textContent = (decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal).toLocaleString()) + suffix;
                                
                                if (progress < 1) {
                                    requestAnimationFrame(step);
                                }
                            }
                            requestAnimationFrame(step);
                        }
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElems.forEach(el => revealObserver.observe(el));
    } else {
        revealElems.forEach(el => el.classList.add('revealed'));
    }

    // 8. Energy Savings Calculator Slider Logic
    const usageRangeSlider = document.getElementById('usageRangeSlider');
    const usageHoursLabel = document.getElementById('usageHoursLabel');
    const monthlySavingsVal = document.getElementById('monthlySavingsVal');
    const annualSavingsVal = document.getElementById('annualSavingsVal');

    if (usageRangeSlider) {
        usageRangeSlider.addEventListener('input', (e) => {
            const hours = parseInt(e.target.value, 10);
            if (usageHoursLabel) usageHoursLabel.textContent = `${hours} Hours/Day`;
            
            // Calc savings: ~ ₹6 saved per hour of 5-star inverter operation vs old non-inverter
            const monthlySavings = Math.round(hours * 30 * 6);
            const annualSavings = monthlySavings * 12;

            if (monthlySavingsVal) monthlySavingsVal.textContent = `₹${monthlySavings.toLocaleString()}/mo`;
            if (annualSavingsVal) annualSavingsVal.textContent = `₹${annualSavings.toLocaleString()}/yr`;
        });
    }

    // 9. Product Quick Specs Modal Populator
    const quickSpecBtns = document.querySelectorAll('.btn-quick-spec');
    const specModalName = document.getElementById('specModalName');
    const specModalBrand = document.getElementById('specModalBrand');
    const specModalDesc = document.getElementById('specModalDesc');
    const specModalHighlights = document.getElementById('specModalHighlights');
    const specModalImg = document.getElementById('specModalImg');

    quickSpecBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const brand = btn.getAttribute('data-brand');
            const desc = btn.getAttribute('data-desc');
            const specs = btn.getAttribute('data-specs');
            const img = btn.getAttribute('data-img');

            if (specModalName) specModalName.textContent = name || '';
            if (specModalBrand) specModalBrand.textContent = brand || '';
            if (specModalDesc) specModalDesc.textContent = desc || '';
            if (specModalHighlights) specModalHighlights.textContent = specs || '';
            if (specModalImg && img) specModalImg.src = img;
        });
    });

    // 10. Interactive Blog Category Filter Pills
    const blogFilterPills = document.querySelectorAll('.blog-filter-pill');
    blogFilterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            blogFilterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // 11. Product Enquire Now Button Modal Pre-population
    const productEnquireBtns = document.querySelectorAll('.btn-enquire-product');
    productEnquireBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prodName = btn.getAttribute('data-product-name');
            const modalTitle = document.querySelector('#appointmentModal .modal-title');
            if (modalTitle && prodName) {
                modalTitle.innerHTML = `<i class="fa-solid fa-file-invoice-dollar me-2 text-primary-blue"></i>Enquire: ${prodName}`;
            }
        });
    });

    // 12. Service Area Pin Code & Locality Search Tool
    const areaSearchBtn = document.getElementById('areaSearchBtn');
    const areaSearchInput = document.getElementById('areaSearchInput');
    const areaSearchResult = document.getElementById('areaSearchResult');

    if (areaSearchBtn && areaSearchInput && areaSearchResult) {
        const coveredKeywords = [
            'pondicherry', 'puducherry', 'lawspet', 'white town', 'muthialpet', 'saram',
            'reddiarpalayam', 'villianur', 'kalapet', 'ariyankuppam', 'bahour', 'thavalakuppam',
            'villupuram', 'tindivanam', 'vikravandi', 'valavanur', 'gingee', 'mailam',
            'cuddalore', 'panruti', 'neyveli', 'chidambaram', 'nellikuppam', 'vadalur',
            'auroville', 'marakkanam', 'sedarapet', '605001', '605002', '605003', '605004',
            '605005', '605006', '605007', '605008', '605009', '605010', '605011', '605014',
            '605602', '604001', '607001', '607002', '607003', '607801', '608001'
        ];

        function checkArea() {
            const query = areaSearchInput.value.trim().toLowerCase();
            if (!query) {
                areaSearchResult.className = 'area-search-result notice';
                areaSearchResult.innerHTML = '<i class="fa-solid fa-circle-info me-1"></i> Please enter a town, area name, or pin code to check.';
                return;
            }

            const isMatch = coveredKeywords.some(keyword => query.includes(keyword) || keyword.includes(query));

            if (isMatch) {
                areaSearchResult.className = 'area-search-result success';
                areaSearchResult.innerHTML = `<strong><i class="fa-solid fa-circle-check text-success me-1"></i> Yes! We provide full service in "${areaSearchInput.value.trim()}".</strong><br>Direct Carrier showroom dispatch, same-day site visit & 24/7 technical support available.<br><div class="mt-2 d-flex gap-2 flex-wrap"><a href="tel:04132242111" class="btn btn-sm btn-dark rounded-pill px-3"><i class="fa-solid fa-phone me-1"></i> Call 0413-2242111</a><a href="https://wa.me/919843020486?text=Hi%20Comfort%20Aircon%2C%20I%20am%20from%20${encodeURIComponent(areaSearchInput.value.trim())}%20and%20would%20like%20to%20enquire%20about%20Carrier%20AC%20sales" target="_blank" class="btn btn-sm btn-success rounded-pill px-3"><i class="fa-brands fa-whatsapp me-1"></i> WhatsApp Booking</a></div>`;
            } else {
                areaSearchResult.className = 'area-search-result notice';
                areaSearchResult.innerHTML = `<strong><i class="fa-solid fa-truck-fast text-primary me-1"></i> Special Delivery Available for "${areaSearchInput.value.trim()}"!</strong><br>We serve all surrounding areas in Puducherry and Tamil Nadu via express dispatch. Call our engineering team at <a href="tel:04132242111" class="fw-bold text-dark text-decoration-none">0413-2242111</a> or WhatsApp us for instant scheduling.`;
            }
        }

        areaSearchBtn.addEventListener('click', checkArea);
        areaSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkArea();
            }
        });
    }

    // 10. Hero GSAP ScrollTrigger 120-Frame Canvas Sequence Animation
    const heroCanvas = document.getElementById('heroSequenceCanvas');
    const heroSection = document.getElementById('home');
    const heroCanvasContainer = document.getElementById('heroCanvasContainer');
    const heroProgressBar = document.getElementById('heroCanvasProgressBar');
    const heroHint = document.getElementById('heroCanvasHint');

    if (heroCanvas && heroSection) {
        const TOTAL_FRAMES = 120;
        const images = [];
        let currentFrameIndex = 0;

        const getFramePath = (i) => `frames/frame_${String(i + 1).padStart(4, '0')}.jpg`;

        const ctx = heroCanvas.getContext('2d');

        function renderFrame(index) {
            if (!ctx) return;
            let img = images[index];
            if (!img || !img.complete || img.naturalWidth === 0) {
                for (let i = index - 1; i >= 0; i--) {
                    if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
                        img = images[i];
                        break;
                    }
                }
            }
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const w = heroCanvas.width;
            const h = heroCanvas.height;

            ctx.clearRect(0, 0, w, h);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const ratio = Math.max(w / img.naturalWidth, h / img.naturalHeight);
            const drawW = img.naturalWidth * ratio;
            const drawH = img.naturalHeight * ratio;
            const shiftX = (w - drawW) / 2;
            const shiftY = (h - drawH) / 2;

            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, shiftX, shiftY, drawW, drawH);
        }

        function resizeCanvas() {
            const rect = heroCanvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            heroCanvas.width = Math.round(rect.width * dpr);
            heroCanvas.height = Math.round(rect.height * dpr);
            renderFrame(currentFrameIndex);
        }

        // Preload frame 0 immediately
        const firstImg = new Image();
        firstImg.src = getFramePath(0);
        firstImg.onload = () => {
            resizeCanvas();
            renderFrame(0);
        };
        images[0] = firstImg;

        // Preload remaining frames
        for (let i = 1; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            images[i] = img;
        }

        window.addEventListener('resize', resizeCanvas);

        // GSAP ScrollTrigger
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            const mm = gsap.matchMedia();

            mm.add('(min-width: 992px)', () => {
                ScrollTrigger.create({
                    trigger: heroSection,
                    start: 'top top',
                    end: '+=1600',
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(self.progress * (TOTAL_FRAMES - 1)));
                        if (idx !== currentFrameIndex) {
                            currentFrameIndex = idx;
                            renderFrame(idx);
                            if (heroProgressBar) {
                                heroProgressBar.style.width = ((idx + 1) / TOTAL_FRAMES * 100) + '%';
                            }
                        }
                        if (self.progress > 0.02 && heroHint) {
                            heroHint.classList.add('faded');
                        }
                    }
                });
            });

            mm.add('(max-width: 991.98px)', () => {
                ScrollTrigger.create({
                    trigger: heroSection,
                    start: 'top top',
                    end: '+=1200',
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(self.progress * (TOTAL_FRAMES - 1)));
                        if (idx !== currentFrameIndex) {
                            currentFrameIndex = idx;
                            renderFrame(idx);
                            if (heroProgressBar) {
                                heroProgressBar.style.width = ((idx + 1) / TOTAL_FRAMES * 100) + '%';
                            }
                        }
                        if (self.progress > 0.02 && heroHint) {
                            heroHint.classList.add('faded');
                        }
                    }
                });
            });
        }

        // Drag to scrub support
        let isDragging = false;
        let dragStartX = 0;
        let dragStartFrame = 0;

        function onDragStart(e) {
            isDragging = true;
            dragStartX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            dragStartFrame = currentFrameIndex;
            if (heroHint) heroHint.classList.add('faded');
        }

        function onDragMove(e) {
            if (!isDragging) return;
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const delta = clientX - dragStartX;
            let target = (dragStartFrame + Math.round(delta / 3)) % TOTAL_FRAMES;
            if (target < 0) target += TOTAL_FRAMES;
            currentFrameIndex = target;
            renderFrame(target);
            if (heroProgressBar) {
                heroProgressBar.style.width = ((target + 1) / TOTAL_FRAMES * 100) + '%';
            }
        }

        function onDragEnd() {
            isDragging = false;
        }

        const showcaseEl = heroCanvas.closest('.hero-canvas-showcase');
        if (showcaseEl) {
            showcaseEl.addEventListener('mousedown', onDragStart);
            window.addEventListener('mousemove', onDragMove);
            window.addEventListener('mouseup', onDragEnd);

            showcaseEl.addEventListener('touchstart', onDragStart, { passive: true });
            window.addEventListener('touchmove', onDragMove, { passive: true });
            window.addEventListener('touchend', onDragEnd);
        }
    }

    // 13. Testimonial Auto Slider Card (Reference 1 Layout)
    const testimonialTrack = document.getElementById('testimonialSliderTrack');
    const testimonialDots = document.getElementById('testimonialSliderDots');
    const testimonialPrevBtn = document.getElementById('testimonialPrevBtn');
    const testimonialNextBtn = document.getElementById('testimonialNextBtn');

    if (testimonialTrack) {
        const tCards = testimonialTrack.querySelectorAll('.testimonial-slide-card');
        const totalCards = tCards.length;
        let currentTIndex = 0;
        let tAutoSlideTimer = null;

        function getVisibleCount() {
            return window.innerWidth >= 768 ? 2 : 1;
        }

        function getMaxIndex() {
            return Math.max(0, totalCards - getVisibleCount());
        }

        function updateTestimonialSlider() {
            const maxIdx = getMaxIndex();
            if (currentTIndex > maxIdx) currentTIndex = 0;
            if (currentTIndex < 0) currentTIndex = maxIdx;

            const firstCard = tCards[0];
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                const gap = 20; // 20px gap
                const shift = currentTIndex * (cardWidth + gap);
                testimonialTrack.style.transform = `translateX(-${shift}px)`;
            }

            // Update dots
            if (testimonialDots) {
                const dots = testimonialDots.querySelectorAll('.t-dot');
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentTIndex);
                });
            }
        }

        function buildDots() {
            if (!testimonialDots) return;
            testimonialDots.innerHTML = '';
            const maxIdx = getMaxIndex();
            for (let i = 0; i <= maxIdx; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = `t-dot ${i === currentTIndex ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    currentTIndex = i;
                    updateTestimonialSlider();
                    resetTimer();
                });
                testimonialDots.appendChild(dot);
            }
        }

        function nextTestimonial() {
            const maxIdx = getMaxIndex();
            currentTIndex = (currentTIndex >= maxIdx) ? 0 : currentTIndex + 1;
            updateTestimonialSlider();
        }

        function prevTestimonial() {
            const maxIdx = getMaxIndex();
            currentTIndex = (currentTIndex <= 0) ? maxIdx : currentTIndex - 1;
            updateTestimonialSlider();
        }

        function startTimer() {
            if (!tAutoSlideTimer) {
                tAutoSlideTimer = setInterval(nextTestimonial, 3500);
            }
        }

        function stopTimer() {
            if (tAutoSlideTimer) {
                clearInterval(tAutoSlideTimer);
                tAutoSlideTimer = null;
            }
        }

        function resetTimer() {
            stopTimer();
            startTimer();
        }

        if (testimonialNextBtn) testimonialNextBtn.addEventListener('click', () => { nextTestimonial(); resetTimer(); });
        if (testimonialPrevBtn) testimonialPrevBtn.addEventListener('click', () => { prevTestimonial(); resetTimer(); });

        const sliderBox = document.querySelector('.testimonial-slider-container');
        if (sliderBox) {
            sliderBox.addEventListener('mouseenter', stopTimer);
            sliderBox.addEventListener('mouseleave', startTimer);

            // Touch Swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            sliderBox.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopTimer();
            }, { passive: true });
            sliderBox.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 45) {
                    nextTestimonial();
                } else if (touchEndX - touchStartX > 45) {
                    prevTestimonial();
                }
                startTimer();
            }, { passive: true });
        }

        window.addEventListener('resize', () => {
            buildDots();
            updateTestimonialSlider();
        });

        buildDots();
        updateTestimonialSlider();
        startTimer();
    }

    // 13.5 Regional Service Areas Auto Slider (2 cards per slide group, automatic sliding)
    const areaTrack = document.getElementById('areaSliderTrack');
    const areaSliderContainer = document.querySelector('.area-slider-container');
    const areaPrevBtn = document.getElementById('areaPrevBtn');
    const areaNextBtn = document.getElementById('areaNextBtn');

    if (areaTrack && !window.__areaSliderInitialized) {
        window.__areaSliderInitialized = true;
        const slideGroups = areaTrack.querySelectorAll('.area-slide-group, .area-slide-single');
        const totalAreaSlides = slideGroups.length > 0 ? slideGroups.length : 4;
        let currentAreaSlide = 0;
        let areaTimer = null;

        function updateAreaDots() {
            const dots = document.querySelectorAll('#areaSliderDots .area-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentAreaSlide);
            });
            const tabs = document.querySelectorAll('.area-tabs-nav .area-tab-btn');
            tabs.forEach((tab, idx) => {
                tab.classList.toggle('active', idx === currentAreaSlide);
            });
            const counter = document.getElementById('areaSlideCounter');
            if (counter) {
                const names = ['Pondicherry', 'Villupuram', 'Cuddalore', 'Nearby Areas'];
                counter.textContent = `${currentAreaSlide + 1} of ${totalAreaSlides} · ${names[currentAreaSlide] || ''}`;
            }
        }

        function goToAreaSlide(index) {
            currentAreaSlide = (index + totalAreaSlides) % totalAreaSlides;
            areaTrack.style.transform = `translateX(-${currentAreaSlide * 100}%)`;
            updateAreaDots();
        }

        function nextAreaSlide() {
            goToAreaSlide(currentAreaSlide + 1);
        }

        function prevAreaSlide() {
            goToAreaSlide(currentAreaSlide - 1);
        }

        function startAreaTimer() {
            stopAreaTimer();
            areaTimer = setInterval(nextAreaSlide, 3800);
        }

        function stopAreaTimer() {
            if (areaTimer) {
                clearInterval(areaTimer);
                areaTimer = null;
            }
        }

        function resetAreaTimer() {
            stopAreaTimer();
            startAreaTimer();
        }

        // Arrow navigation buttons
        if (areaNextBtn) {
            areaNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextAreaSlide();
                resetAreaTimer();
            });
        }

        if (areaPrevBtn) {
            areaPrevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevAreaSlide();
                resetAreaTimer();
            });
        }

        // Dot navigation buttons
        const areaDotsContainer = document.getElementById('areaSliderDots');
        if (areaDotsContainer) {
            areaDotsContainer.querySelectorAll('.area-dot').forEach((dot, idx) => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    goToAreaSlide(idx);
                    resetAreaTimer();
                });
            });
        }

        // Tab button navigation
        const areaTabBtns = document.querySelectorAll('.area-tabs-nav .area-tab-btn');
        areaTabBtns.forEach((tab, idx) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                goToAreaSlide(idx);
                resetAreaTimer();
            });
        });

        // Pause on mouse hover & resume on leave
        if (areaSliderContainer) {
            areaSliderContainer.addEventListener('mouseenter', stopAreaTimer);
            areaSliderContainer.addEventListener('mouseleave', startAreaTimer);
        }

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        areaTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAreaTimer();
        }, { passive: true });

        areaTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 40) {
                nextAreaSlide();
            } else if (touchEndX - touchStartX > 40) {
                prevAreaSlide();
            }
            startAreaTimer();
        }, { passive: true });

        // Initialize state & start auto sliding
        goToAreaSlide(0);
        startAreaTimer();
    }

    // 9.55 Services 3-Card Auto Slider
    const servicesTrack = document.getElementById('servicesSliderTrack');
    const servicesSliderOuter = document.getElementById('servicesSliderOuter');
    const servicesPrevBtn = document.getElementById('servicesPrevBtn');
    const servicesNextBtn = document.getElementById('servicesNextBtn');
    const servicesDots = document.querySelectorAll('#servicesSliderDots .services-dot');

    if (servicesTrack && !window.__servicesSliderInitialized) {
        window.__servicesSliderInitialized = true;

        let currentServiceIdx = 0;
        const totalServices = 8;
        let serviceTimer = null;
        let isSliding = false;

        function getItemsPerView() {
            if (window.innerWidth < 640) return 1;
            if (window.innerWidth < 992) return 2;
            return 3;
        }

        function updateServiceCardStyles() {
            const perView = getItemsPerView();
            const gap = 24;
            const items = servicesTrack.querySelectorAll('.services-slide-item');
            const cardWidth = `calc((100% - ${(perView - 1) * gap}px) / ${perView})`;
            items.forEach(item => {
                item.style.width = cardWidth;
                item.style.flex = `0 0 ${cardWidth}`;
            });
            applyServiceTransform(currentServiceIdx, false);
        }

        function applyServiceTransform(idx, animate = true) {
            const perView = getItemsPerView();
            const gapPart = (24 / perView) * idx;
            servicesTrack.style.transition = animate ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
            servicesTrack.style.transform = `translateX(calc(-1 * (${idx} * 100% / ${perView} + ${gapPart}px)))`;

            const activeDotIdx = idx % totalServices;
            servicesDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeDotIdx);
            });
        }

        function nextServiceSlide() {
            if (isSliding) return;
            isSliding = true;
            currentServiceIdx++;
            applyServiceTransform(currentServiceIdx, true);
        }

        function prevServiceSlide() {
            if (isSliding) return;
            isSliding = true;
            if (currentServiceIdx === 0) {
                currentServiceIdx = totalServices - 1;
            } else {
                currentServiceIdx--;
            }
            applyServiceTransform(currentServiceIdx, true);
        }

        servicesTrack.addEventListener('transitionend', () => {
            isSliding = false;
            if (currentServiceIdx >= totalServices) {
                currentServiceIdx = 0;
                applyServiceTransform(0, false);
            }
        });

        if (servicesNextBtn) {
            servicesNextBtn.addEventListener('click', () => {
                nextServiceSlide();
                restartServiceTimer();
            });
        }

        if (servicesPrevBtn) {
            servicesPrevBtn.addEventListener('click', () => {
                prevServiceSlide();
                restartServiceTimer();
            });
        }

        servicesDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                if (isSliding) return;
                isSliding = true;
                currentServiceIdx = i;
                applyServiceTransform(currentServiceIdx, true);
                restartServiceTimer();
            });
        });

        function startServiceTimer() {
            stopServiceTimer();
            serviceTimer = setInterval(nextServiceSlide, 3800);
        }

        function stopServiceTimer() {
            if (serviceTimer) clearInterval(serviceTimer);
        }

        function restartServiceTimer() {
            stopServiceTimer();
            startServiceTimer();
        }

        if (servicesSliderOuter) {
            servicesSliderOuter.addEventListener('mouseenter', stopServiceTimer);
            servicesSliderOuter.addEventListener('mouseleave', startServiceTimer);
        }

        // Mobile touch swipe support
        let touchStart = 0;
        let touchEnd = 0;
        servicesTrack.addEventListener('touchstart', (e) => {
            stopServiceTimer();
            touchStart = e.touches[0].screenX;
        }, { passive: true });

        servicesTrack.addEventListener('touchend', (e) => {
            touchEnd = e.changedTouches[0].screenX;
            if (touchStart - touchEnd > 40) {
                nextServiceSlide();
            } else if (touchEnd - touchStart > 40) {
                prevServiceSlide();
            }
            startServiceTimer();
        }, { passive: true });

        window.addEventListener('resize', updateServiceCardStyles);
        updateServiceCardStyles();
        startServiceTimer();
    }

    // 9.6 Home Signature: Hero Rotating Subline
    const heroRotatingEl = document.getElementById('heroRotatingSubline');
    if (heroRotatingEl) {
        const rotatingPhrases = [
            '5-Star Inverter Split ACs',
            'Toshiba Commercial VRF Systems',
            'Architectural Cassette Units',
            'Concealed Ductable Climate Care',
            'Factory Certified 10-Yr Warranty'
        ];
        let currentPhraseIdx = 0;
        setInterval(() => {
            heroRotatingEl.classList.add('fade-out');
            setTimeout(() => {
                currentPhraseIdx = (currentPhraseIdx + 1) % rotatingPhrases.length;
                heroRotatingEl.textContent = rotatingPhrases[currentPhraseIdx];
                heroRotatingEl.classList.remove('fade-out');
            }, 350);
        }, 3600);
    }
});

// Refresh AOS positions on full window load to account for loaded images
window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});
