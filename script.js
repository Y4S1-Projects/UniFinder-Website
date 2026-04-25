document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Sticky Navbar & Scroll Spy & Back To Top --- */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;
        
        // Sticky Navbar
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back To Top Button
        if (currentScroll > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Scroll Spy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (currentScroll >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active-link');
            if (li.getAttribute('href') === `#${currentSectionId}`) {
                li.classList.add('active-link');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- 2. Hamburger Menu --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
        });
    });

    /* --- 3. Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* --- 4. Main Tabs (Domain Section) --- */
    const mainTabBtns = document.querySelectorAll('.tab-btn');
    const mainTabPanes = document.querySelectorAll('.tab-pane');

    mainTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            mainTabBtns.forEach(b => b.classList.remove('active'));
            mainTabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* --- 5. Sub Tabs (Methodology) --- */
    const subTabBtns = document.querySelectorAll('.sub-tab-btn');
    const subTabPanes = document.querySelectorAll('.sub-tab-pane');

    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            subTabBtns.forEach(b => b.classList.remove('active'));
            subTabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-subtarget');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* --- 6. SVG Neural Network Animation (Background) --- */
    const svgGroup = document.getElementById('network-nodes');
    if (svgGroup) {
        const width = 1000;
        const height = 600;
        const numNodes = 40;
        const nodes = [];

        // Generate nodes
        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1.5
            });
        }

        // Draw initial elements
        nodes.forEach((node, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', node.radius);
            circle.id = 'node-' + i;
            svgGroup.appendChild(circle);
        });

        const numLines = 50;
        const lines = [];
        for (let i = 0; i < numLines; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.id = 'line-' + i;
            svgGroup.appendChild(line);
            lines.push({
                el: line,
                n1: Math.floor(Math.random() * numNodes),
                n2: Math.floor(Math.random() * numNodes)
            });
        }

        // Animate
        function animateNetwork() {
            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                const circle = document.getElementById('node-' + i);
                if (circle) {
                    circle.setAttribute('cx', node.x);
                    circle.setAttribute('cy', node.y);
                }
            });

            lines.forEach(linePair => {
                const n1 = nodes[linePair.n1];
                const n2 = nodes[linePair.n2];
                const lineEl = linePair.el;
                
                // Only show line if nodes are close
                const dist = Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2));
                if (dist < 150) {
                    lineEl.setAttribute('x1', n1.x);
                    lineEl.setAttribute('y1', n1.y);
                    lineEl.setAttribute('x2', n2.x);
                    lineEl.setAttribute('y2', n2.y);
                    lineEl.setAttribute('opacity', 1 - (dist/150));
                } else {
                    lineEl.setAttribute('opacity', 0);
                }
            });

            requestAnimationFrame(animateNetwork);
        }

        animateNetwork();
    }

    /* --- 7. Enhanced Dynamic Search Feature --- */
    const sectionMeta = {
        home:          { link: '#home',          label: 'Home' },
        domain:        { link: '#domain',        label: 'Research Domain' },
        milestones:    { link: '#milestones',    label: 'Milestones' },
        documents:     { link: '#documents',     label: 'Documents' },
        presentations: { link: '#presentations', label: 'Presentations' },
        about:         { link: '#about',         label: 'About Us' },
        contact:       { link: '#contact',       label: 'Contact' }
    };
    const tabLabels = {
        'tab-background': 'Background',
        'tab-gap':        'Research Gap',
        'tab-problem':    'Problem & Objectives',
        'tab-methodology':'Methodology',
        'tab-architecture':'Architecture',
        'tab-tech':       'Technologies'
    };
    const subTabLabels = {
        member1: 'Degree Recommendation',
        member2: 'Budget Optimizer',
        member3: 'Scholarship & Loan',
        member4: 'Career Predictor'
    };

    function getAncestor(el, selector) {
        let cur = el;
        while (cur && cur !== document.body) {
            if (cur.matches && cur.matches(selector)) return cur;
            cur = cur.parentElement;
        }
        return null;
    }

    function buildSearchIndex() {
        const index = [];
        const seen = new Set();
        const selectors = [
            'h1','h2','h3','h4','h5',
            'p','li','td','th',
            '.badge','.arch-box','.mod-title','.mod-content',
            '.stat-label','.stat-number','.member-title','.member-id',
            '.doc-info h4','.doc-info p','.timeline-content h3',
            '.diff-item h5','.diff-item p','.supervisor-item h5',
            '.tech-badges .badge','label'
        ];

        document.querySelectorAll(selectors.join(',')).forEach(el => {
            if (el.closest('nav') || el.closest('footer')) return;
            const text = el.textContent.trim();
            if (!text || text.length < 3) return;

            const section = getAncestor(el, 'section');
            if (!section || !sectionMeta[section.id]) return;

            const tabPane    = getAncestor(el, '.tab-pane');
            const subTabPane = getAncestor(el, '.sub-tab-pane');

            const tabId    = tabPane    ? tabPane.id    : null;
            const subTabId = subTabPane ? subTabPane.id : null;

            let breadcrumb = sectionMeta[section.id].label;
            if (tabId    && tabLabels[tabId])    breadcrumb += ' › ' + tabLabels[tabId];
            if (subTabId && subTabLabels[subTabId]) breadcrumb += ' › ' + subTabLabels[subTabId];

            const key = section.id + '|' + (tabId||'') + '|' + (subTabId||'') + '|' + text.slice(0, 80);
            if (seen.has(key)) return;
            seen.add(key);

            index.push({ text, section: section.id, link: sectionMeta[section.id].link, tabId, subTabId, breadcrumb });
        });
        return index;
    }

    let dynamicIndex = [];
    setTimeout(() => { dynamicIndex = buildSearchIndex(); }, 200);

    const searchInput   = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchBtn     = document.getElementById('searchBtn');

    function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function highlightTerms(text, terms) {
        const pattern = new RegExp(`(${terms.map(escapeRegex).join('|')})`, 'gi');
        return text.replace(pattern, '<mark>$1</mark>');
    }

    function runSearch(rawQuery) {
        searchResults.innerHTML = '';
        const query = rawQuery.toLowerCase().trim();
        if (query.length < 2) { searchResults.classList.remove('active'); return; }

        const terms = query.split(/\s+/).filter(t => t.length > 0);
        const seen  = new Set();
        const scored = [];

        dynamicIndex.forEach(item => {
            const lower = item.text.toLowerCase();
            let score = 0;
            terms.forEach(term => {
                if (lower === term)            score += 12;
                else if (lower.startsWith(term)) score += 7;
                else if (lower.includes(term))   score += 3;
            });
            if (score === 0) return;

            const dedupeKey = item.section + '|' + item.tabId + '|' + item.text.slice(0, 60);
            if (seen.has(dedupeKey)) return;
            seen.add(dedupeKey);
            scored.push({ ...item, score });
        });

        scored.sort((a, b) => b.score - a.score);
        const top = scored.slice(0, 8);

        if (top.length > 0) {
            const hdr = document.createElement('div');
            hdr.className = 'search-result-header';
            hdr.textContent = `${scored.length} result${scored.length !== 1 ? 's' : ''} found`;
            searchResults.appendChild(hdr);

            top.forEach(res => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                const display   = res.text.length > 80 ? res.text.slice(0, 80) + '\u2026' : res.text;
                const highlighted = highlightTerms(display, terms);
                div.innerHTML = `<div class="search-result-title">${highlighted}</div>
                                 <div class="search-result-context">${res.breadcrumb}</div>`;

                div.addEventListener('click', () => {
                    // Activate correct tab first (so section has correct height)
                    if (res.tabId) {
                        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                        const btn  = document.querySelector(`[data-target="${res.tabId}"]`);
                        const pane = document.getElementById(res.tabId);
                        if (btn)  btn.classList.add('active');
                        if (pane) pane.classList.add('active');
                    }
                    if (res.subTabId) {
                        document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
                        document.querySelectorAll('.sub-tab-pane').forEach(p => p.classList.remove('active'));
                        const btn  = document.querySelector(`[data-subtarget="${res.subTabId}"]`);
                        const pane = document.getElementById(res.subTabId);
                        if (btn)  btn.classList.add('active');
                        if (pane) pane.classList.add('active');
                    }
                    // Scroll to section
                    const target = document.querySelector(res.link);
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    searchResults.classList.remove('active');
                    searchInput.value = '';
                });
                searchResults.appendChild(div);
            });

            if (scored.length > 8) {
                const more = document.createElement('div');
                more.className = 'search-result-item search-result-more';
                more.textContent = `+${scored.length - 8} more — refine your query`;
                searchResults.appendChild(more);
            }
        } else {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = `<div class="search-result-context">No results for "<strong>${query}</strong>"</div>`;
            searchResults.appendChild(div);
        }
        searchResults.classList.add('active');
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener('input',   e => runSearch(e.target.value));
        searchInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const first = searchResults.querySelector('.search-result-item');
                if (first) first.click();
            }
            if (e.key === 'Escape') {
                searchResults.classList.remove('active');
                searchInput.blur();
            }
        });
        if (searchBtn) {
            searchBtn.addEventListener('click', () => runSearch(searchInput.value));
        }
        document.addEventListener('click', e => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !(searchBtn && searchBtn.contains(e.target))) {
                searchResults.classList.remove('active');
            }
        });
    }

});
