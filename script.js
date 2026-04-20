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

    /* --- 7. Search Feature --- */
    const searchIndex = [
        { title: "Degree Recommendation System", link: "#domain", keywords: "degree recommendation z-score eligibility kaweeshwara rules ai" },
        { title: "Student Budget Optimizer", link: "#domain", keywords: "budget optimizer finance cost savings dilshan prediction regression" },
        { title: "Scholarship & Financial Aid Matcher", link: "#domain", keywords: "scholarship loan financial aid matcher hettiarachchi eligibility" },
        { title: "Career Outcome Predictor", link: "#domain", keywords: "career outcome predictor skill gap job siriwardana guidance" },
        { title: "Research Gap Analysis", link: "#domain", keywords: "gap comparison table features" },
        { title: "Methodology Details", link: "#domain", keywords: "methodology solutions testing performance accuracy" },
        { title: "System Architecture", link: "#domain", keywords: "architecture diagram layer module structure ui backend" },
        { title: "Technologies Used", link: "#domain", keywords: "technologies stack python react frontend backend infrastructure devops" },
        { title: "Project Milestones", link: "#milestones", keywords: "milestones progress timeline presentation report viva" },
        { title: "Project Documents", link: "#documents", keywords: "documents proposal charter status report slides pdf" },
        { title: "Meet the Team", link: "#about", keywords: "team about members supervisors commercialization sliit" },
        { title: "Contact Information", link: "#contact", keywords: "contact email location phone address send message form" }
    ];

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const results = searchIndex.filter(item => {
                return item.title.toLowerCase().includes(query) || 
                       item.keywords.toLowerCase().includes(query);
            });

            if (results.length > 0) {
                results.forEach(res => {
                    const div = document.createElement('div');
                    div.className = 'search-result-item';
                    div.innerHTML = `<div class="search-result-title">${res.title}</div>
                                     <div class="search-result-context">Navigate to section</div>`;
                    div.addEventListener('click', () => {
                        window.location.hash = res.link;
                        searchResults.classList.remove('active');
                        searchInput.value = '';
                    });
                    searchResults.appendChild(div);
                });
            } else {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `<div class="search-result-context">No results found for "${query}"</div>`;
                searchResults.appendChild(div);
            }
            searchResults.classList.add('active');
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

});
