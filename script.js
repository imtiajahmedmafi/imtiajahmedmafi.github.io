/**
 * ====================================================================
 * Imtiaj Ahmed Mafi - Portfolio Scripts
 * 
 * প্রিয় ইমতিয়াজ ভাই,
 * এই ফাইলের কোনো কোড আপনার পরিবর্তন করার প্রয়োজন নেই।
 * এটি স্বয়ংক্রিয়ভাবে ওয়েবসাইটের মোবাইল মেন্যু, কপি বাটন এবং স্মুথ
 * স্ক্রোলিং নিয়ন্ত্রণ করে। কোডগুলো খুব সহজ ও সুরক্ষিতভাবে লেখা।
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- ১. মোবাইল মেন্যু টগল (Mobile Navigation Menu Toggle) ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // মোবাইল মেন্যুর কোনো লিংকে ক্লিক করলে মেন্যু নিজে থেকেই বন্ধ হয়ে যাবে
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- ২. কপি টু ক্লিপবোর্ড (Copy to Clipboard with Toast Notification) ---
    window.copyToClipboard = function(text, label) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(`${label} ক্লিপবোর্ডে কপি করা হয়েছে!`);
            }).catch(err => {
                fallbackCopy(text, label);
            });
        } else {
            fallbackCopy(text, label);
        }
    };

    function fallbackCopy(text, label) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`${label} ক্লিপবোর্ডে কপি করা হয়েছে!`);
    }

    // Toast Message দেখানোর ফাংশন
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-message');
        if (toast && toastMsg) {
            toastMsg.innerText = message;
            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }
    }

    // --- ৩. ব্যাক টু টপ বাটন (Back to Top Button) ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- ৪. কন্টাক্ট ফর্ম হ্যান্ডলার (Contact Form Submission) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('sender-name').value;
            const email = document.getElementById('sender-email').value;
            const message = document.getElementById('sender-message').value;

            // ব্যবহারকারীর ইমেইল ক্লায়েন্টে সরাসরি পাঠানোর জন্য mailto লিংক প্রস্তুত করা
            const mailtoLink = `mailto:imtiajahmed129580@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent("Sender Email: " + email + "\n\nMessage:\n" + message)}`;
            
            showToast('আপনার ইমেইল অ্যাপ ওপেন হচ্ছে...');
            window.location.href = mailtoLink;
        });
    }

    // --- ৫. স্ক্রল করার সময় অ্যাক্টিভ ন্যাভ হাইলাইট (Active Nav State) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-cyan-400');
                        link.classList.remove('text-gray-300');
                    } else {
                        link.classList.remove('text-cyan-400');
                        link.classList.add('text-gray-300');
                    }
    // --- ৬. ইন্টারঅ্যাক্টিভ নেটওয়ার্ক টপোলজি ক্যানভাস (Interactive Network Topology Canvas) ---
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        });

        // মাউস পজিশন ট্র্যাকিং
        const mouse = { x: null, y: null, maxDist: 170 };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // নেটওয়ার্ক নোডস (Nodes)
        let nodes = [];
        const nodeCount = window.innerWidth < 768 ? 25 : 55;
        const colors = ['#06b6d4', '#38bdf8', '#3b82f6', '#10b981'];

        function initNodes() {
            nodes = [];
            const count = window.innerWidth < 768 ? 25 : 55;
            for (let i = 0; i < count; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    radius: Math.random() * 2 + 1.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    isHub: Math.random() > 0.75 // প্রধান হাব নোড যা একটু বেশি উজ্জ্বল
                });
            }
        }
        initNodes();

        function animateNetwork() {
            ctx.clearRect(0, 0, width, height);

            // নোডগুলোর মধ্যকার কানেকশন তার ও ডাটা লিংক আঁকা
            for (let i = 0; i < nodes.length; i++) {
                // নোড পজিশন আপডেট
                nodes[i].x += nodes[i].vx;
                nodes[i].y += nodes[i].vy;

                // স্ক্রিনের বাইরে গেলে উল্টো দিকে ঘুরে আসা
                if (nodes[i].x < 0 || nodes[i].x > width) nodes[i].vx *= -1;
                if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1;

                // নোড টু নোড কানেকশন লাইন
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        const opacity = (1 - dist / 130) * 0.22;
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                // মাউসের সাথে ইন্টারঅ্যাকশন লাইন (মাউস কাছে গেলে কানেক্ট হবে)
                if (mouse.x !== null && mouse.y !== null) {
                    const mdx = nodes[i].x - mouse.x;
                    const mdy = nodes[i].y - mouse.y;
                    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                    if (mdist < mouse.maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        const mOpacity = (1 - mdist / mouse.maxDist) * 0.45;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${mOpacity})`;
                        ctx.lineWidth = 1.4;
                        ctx.stroke();
                    }
                }

                // নোড পয়েন্ট ড্র করা
                ctx.beginPath();
                ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
                ctx.fillStyle = nodes[i].color;
                ctx.shadowColor = nodes[i].color;
                ctx.shadowBlur = nodes[i].isHub ? 12 : 5;
                ctx.fill();

                // হাব নোডের বাইরের পালস রিং
                if (nodes[i].isHub) {
                    ctx.beginPath();
                    ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius * 2.8, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(6, 182, 212, 0.25)`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // শ্যাডো রিসেট
            ctx.shadowBlur = 0;

            requestAnimationFrame(animateNetwork);
        }

        animateNetwork();
    }

});
