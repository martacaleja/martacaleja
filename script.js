// ===== VARIÁVEIS GLOBAIS =====
var activePaper = null;
var dStartX, dStartY, dOrigLeft, dOrigTop;
var maxZ = 20;

var scene = document.getElementById('scene');
var wallet = document.getElementById('wallet');
var cards = Array.from(document.querySelectorAll('#scene .card'));
var N = 5;
var CARD_W = 260;
var GAP = 50;
var ejectedX = [CARD_W, CARD_W + GAP, CARD_W + GAP * 2, CARD_W + GAP * 3, CARD_W + GAP * 4];
var WALLET_X = -180;
var GLOW = [
    'rgba(78,205,196,0.35)',
    'rgba(255,107,107,0.35)',
    'rgba(245,230,66,0.3)',
    'rgba(251,146,60,0.35)',
    'rgba(167,139,250,0.35)'
];
var wX = 0;
var cX = [0, 0, 0, 0, 0];
var cOp = [0, 0, 0, 0, 0];
var isOpen = false;
var floatY = 0;
var floatT = 0;
var lastTime = null;

var aboutCard = document.getElementById('aboutCard');
var miniNum = document.getElementById('miniNum');
var miniTitle = document.getElementById('miniTitle');
var miniSub = document.getElementById('miniSub');

var cardData = [
    { num: '01', title: 'Motion', sub: '3D & Film', bg: 'linear-gradient(160deg,#4ecdc4,#0b5e5a)', color: '#fff' },
    { num: '02', title: 'Editorial', sub: 'Print & Layout', bg: 'linear-gradient(160deg,#ff6b6b,#a82020)', color: '#fff' },
    { num: '03', title: 'Branding', sub: 'Identity Systems', bg: 'linear-gradient(160deg,#f5e642,#c8a800)', color: '#111' },
    { num: '04', title: 'Digital', sub: 'Web & Interactive', bg: 'linear-gradient(160deg,#fb923c,#a83205)', color: '#fff' },
    { num: '05', title: 'Programming', sub: 'Code & Dev', bg: 'linear-gradient(160deg,#a78bfa,#4c1d95)', color: '#fff' }
];

var wordList = ['branding', 'editorial', 'motion & 3D', 'digital', 'programming'];
var cyclingEl = document.querySelector('.does-cycling');
var typeEl;
var wordIdx = 0;

var worksOverlay = document.getElementById('worksOverlay');
var catOverlay = document.getElementById('catOverlay');
var catTitle = document.getElementById('catTitle');
var catNum = document.getElementById('catNum');
var catList = document.getElementById('catList');
var heroCardCat = ['motion', 'editorial', 'branding', 'digital', 'programming'];
var ALL_PROJ_IDS = ['projNailSalon', 'projMusicVideo', 'projFusion', 'projMonegros', 'projCentro', 'projLamb', 'projPizza'];

var catBg = {
    motion: 'linear-gradient(135deg,#020d0c 0%,#041a18 100%)',
    editorial: 'linear-gradient(135deg,#1a0505 0%,#2a0a0a 100%)',
    branding: 'linear-gradient(135deg,#0d0900 0%,#1f1600 100%)',
    digital: 'linear-gradient(135deg,#0d0800 0%,#211400 100%)',
    programming: 'linear-gradient(135deg,#0d0618 0%,#180a2e 100%)'
};

var catInfo = {
    motion: {
        title: 'Motion',
        num: '01',
        projects: [
            { id: 'projNailSalon', title: 'Nail Salon — 3D Environment', tags: ['3D', 'Blender', 'Animation', '2025'] },
            { id: 'projMusicVideo', title: 'Music Video', tags: ['Audiovisual', 'Editing', 'Visual Effects', '2025'] }
        ]
    },
    editorial: {
        title: 'Editorial',
        num: '02',
        projects: [
            { id: 'projFusion', title: 'Fusion Market — Event Brochure', tags: ['Editorial', 'Print', 'Typography', '2024'] }
        ]
    },
    branding: {
        title: 'Branding',
        num: '03',
        projects: [
            { id: 'projMonegros', title: 'Rebranding of the Festival Monegros', tags: ['Branding', 'Visual Identity', '2024'] },
            { id: 'projCentro', title: 'Visual Identity — Centro Paisagístico', tags: ['Branding', 'Logo Design', '2024'] }
        ]
    },
    digital: {
        title: 'Digital',
        num: '04',
        projects: [
            { id: 'projLamb', title: 'Lamb to the Slaughter — Interactive Web Album', tags: ['Interactive', 'Web Design', 'Illustration', '2025'] }
        ]
    },
    programming: {
        title: 'Programming',
        num: '05',
        projects: [
            { id: 'projPizza', title: 'Pizza Delivery Disaster', tags: ['Game Dev', 'Pixel Art', 'Processing', '2024'] }
        ]
    }
};

var currentCat = 'motion';

var cur = document.getElementById('cursor');
var ring = document.getElementById('cursor-ring');
var mx = window.innerWidth / 2;
var my = window.innerHeight / 2;
var rx = mx;
var ry = my;

// ===== TRADUÇÕES =====
const translations = {
    en: {
        navHome: "HOME",
        navWorks: "WORKS",
        navAbout: "ABOUT",
        navContact: "CONTACT",
        cornerLeft: "A COLLECTION OF VISUAL WORKS",
        cornerRight: "MARTA CALEJA 2026",
        scrollHint: "SCROLL TO EXPLORE",
        aboutTopBar: "ABOUT",
        aboutLocation: "PORTO, PT",
        aboutCourse: "DESIGN & MULTIMEDIA",
        aboutYear: "2026",
        doesTitle: "Marta Caleja\ndoes",
        doesWords: ["branding", "editorial", "motion & 3D", "digital", "programming"],
        aboutBio: "I'm a Design and Multimedia student creating visual and interactive experiences with intention, exploring how design, narrative, and interaction shape perception and engagement.",
        aboutHint: "Hover to explore",
        flipBackLabel: "Want to know more?",
        flipBackReadMore: "READ MORE",
        flipBackSub: "About me →",
        amTitle: "Marta Caleja",
        paperWho: "WHO",
        paperWhoText1: "Student of Design\nand Multimedia",
        paperWhoText2: "University of Coimbra",
        paperWhoText3: "Born 2005",
        paperWhoText4: "Vila Real, Portugal",
        paperBio: "BIO",
        paperBioText1: "My work sits at the intersection of design, digital media, and communication, exploring how visuals, interaction, and narrative can shape perception and engagement.",
        paperBioText2: "I see design as a strategic tool: a way to give form to messages, guide attention, and create meaningful relationships between brands, systems, and users.",
        paperContact: "CONTACT",
        paperResume: "RESUME",
        paperResumeText: "Want to see my full CV?",
        downloadCV: "DOWNLOAD CV",
        updated: "Updated",
        skillsSkillsets: "Skillsets",
        skillsSoftware: "Software",
        skillsLanguages: "Languages",
        skillsNative: "Native",
        skillsAdvanced: "Advanced",
        skillsBasic: "Basic",
        educationTitle: "Education",
        eduPeriod1: "2020 — 2023",
        eduDegree1: "Secondary in Visual Arts",
        eduSchool1: "Escola Secundária Camilo Castelo Branco\nVila Real",
        eduPeriod2: "2023 — Present",
        eduDegree2: "Bachelor's in Design and Multimedia",
        eduSchool2: "Faculdade de Ciências e Tecnologia\nUniversidade de Coimbra",
        clickToFlip: "CLICK TO FLIP →",
        clickToFlipBack: "← CLICK TO FLIP BACK",
        worksHeading: "SELECT A CATEGORY",
        worksLabelL: "MARTA CALEJA",
        worksLabelR: "PORTFOLIO 2026",
        worksClose: "✕ CLOSE",
        motion: "Motion",
        motionSub: "3D & Film",
        editorial: "Editorial",
        editorialSub: "Print & Layout",
        branding: "Branding",
        brandingSub: "Identity Systems",
        digital: "Digital",
        digitalSub: "Web & Interactive",
        programming: "Programming",
        programmingSub: "Code & Dev",
        backToWorks: "Back to Works",
        projectTitle: "Project Title",
        preview: "Preview",
        back: "Back",
        year: "Year",
        category: "Category",
        tools: "Tools",
        context: "Context",
        footerCopy: "Marta Caleja — 2026"
    },
    pt: {
        navHome: "INÍCIO",
        navWorks: "TRABALHOS",
        navAbout: "SOBRE",
        navContact: "CONTACTO",
        cornerLeft: "UMA COLEÇÃO DE TRABALHOS VISUAIS",
        cornerRight: "MARTA CALEJA 2026",
        scrollHint: "DESLIZE PARA EXPLORAR",
        aboutTopBar: "SOBRE",
        aboutLocation: "PORTO, PT",
        aboutCourse: "DESIGN E MULTIMÉDIA",
        aboutYear: "2026",
        doesTitle: "Marta Caleja\nfaz",
        doesWords: ["branding", "editorial", "movimento & 3D", "digital", "programação"],
        aboutBio: "Sou estudante de Design e Multimédia, a criar experiências visuais e interativas com propósito. Exploro como o design, a narrativa e a interação moldam a perceção e o envolvimento.",
        aboutHint: "Passe o rato para explorar",
        flipBackLabel: "Quer saber mais?",
        flipBackReadMore: "LER MAIS",
        flipBackSub: "Sobre mim →",
        amTitle: "Marta Caleja",
        paperWho: "QUEM SOU",
        paperWhoText1: "Estudante de Design\ne Multimédia",
        paperWhoText2: "Universidade de Coimbra",
        paperWhoText3: "Nasci em 2005",
        paperWhoText4: "Vila Real, Portugal",
        paperBio: "BIOGRAFIA",
        paperBioText1: "O meu trabalho situa-se na intersecção entre o design, os media digitais e a comunicação. Exploro como os elementos visuais, a interação e a narrativa podem moldar a perceção e o envolvimento.",
        paperBioText2: "Vejo o design como uma ferramenta estratégica: uma forma de dar corpo a mensagens, orientar a atenção e criar relações significativas entre marcas, sistemas e utilizadores.",
        paperContact: "CONTACTOS",
        paperResume: "CURRÍCULO",
        paperResumeText: "Quer ver o meu CV completo?",
        downloadCV: "DESCARREGAR CV",
        updated: "Atualizado",
        skillsSkillsets: "Competências",
        skillsSoftware: "Software",
        skillsLanguages: "Idiomas",
        skillsNative: "Nativo",
        skillsAdvanced: "Avançado",
        skillsBasic: "Básico",
        educationTitle: "Formação",
        eduPeriod1: "2020 — 2023",
        eduDegree1: "Ensino Secundário — Artes Visuais",
        eduSchool1: "Escola Secundária Camilo Castelo Branco\nVila Real",
        eduPeriod2: "2023 — Presente",
        eduDegree2: "Licenciatura em Design e Multimédia",
        eduSchool2: "Faculdade de Ciências e Tecnologia\nUniversidade de Coimbra",
        clickToFlip: "CLIQUE PARA VIRAR →",
        clickToFlipBack: "← CLIQUE PARA VOLTAR",
        worksHeading: "SELECIONE UMA CATEGORIA",
        worksLabelL: "MARTA CALEJA",
        worksLabelR: "PORTFÓLIO 2026",
        worksClose: "✕ FECHAR",
        motion: "Motion",
        motionSub: "3D & Filme",
        editorial: "Editorial",
        editorialSub: "Impressão & Layout",
        branding: "Branding",
        brandingSub: "Sistemas de Identidade",
        digital: "Digital",
        digitalSub: "Web & Interativo",
        programming: "Programação",
        programmingSub: "Código & Dev",
        backToWorks: "Voltar aos Trabalhos",
        projectTitle: "Título do Projeto",
        preview: "Pré-visualização",
        back: "Voltar",
        year: "Ano",
        category: "Categoria",
        tools: "Ferramentas",
        context: "Contexto",
        footerCopy: "Marta Caleja — 2026"
    }
};

var currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;

    // Atualizar botões ativos
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    var t = translations[lang];

    // Navegação
    document.getElementById('navHome').textContent = t.navHome;
    document.getElementById('navWorks').textContent = t.navWorks;
    document.getElementById('navAbout').textContent = t.navAbout;
    document.querySelector('.nav-contact').textContent = t.navContact;

    // Hero
    document.querySelector('.corner-left').textContent = t.cornerLeft;
    document.querySelector('.corner-right').textContent = t.cornerRight;
    document.querySelector('.scroll-hint span').textContent = t.scrollHint;

    // About flip card
    var frontTopbarSpans = document.querySelectorAll('.front-topbar span');
    if (frontTopbarSpans[1]) frontTopbarSpans[1].textContent = t.aboutTopBar;

    var frontBotbarSpans = document.querySelectorAll('.front-botbar span');
    if (frontBotbarSpans[1]) frontBotbarSpans[1].textContent = t.aboutLocation;
    if (frontBotbarSpans[2]) frontBotbarSpans[2].textContent = t.aboutCourse;
    if (frontBotbarSpans[3]) frontBotbarSpans[3].textContent = t.aboutYear;

    var doesTitle = document.querySelector('.does-title');
    if (doesTitle) doesTitle.innerHTML = t.doesTitle.replace(/\n/g, '<br>');

    var frontBio = document.querySelector('.front-bio');
    if (frontBio) frontBio.textContent = t.aboutBio;

    var frontHint = document.querySelector('.front-hint');
    if (frontHint) frontHint.innerHTML = t.aboutHint;

    var backLabel = document.querySelector('.back-label');
    if (backLabel) backLabel.textContent = t.flipBackLabel;

    var backReadmore = document.querySelector('.back-readmore');
    if (backReadmore) backReadmore.textContent = t.flipBackReadMore;

    var backSub = document.querySelector('.back-sub');
    if (backSub) backSub.textContent = t.flipBackSub;

    // Papers
    var papers = document.querySelectorAll('.paper');
    if (papers[0]) {
        papers[0].querySelector('.paper-tag').textContent = t.paperWho;
        var whoTexts = papers[0].querySelectorAll('.paper-text');
        if (whoTexts[0]) whoTexts[0].innerHTML = t.paperWhoText1.replace(/\n/g, '<br>') + '<br><strong>' + t.paperWhoText2 + '</strong>';
        if (whoTexts[1]) whoTexts[1].innerHTML = t.paperWhoText3 + '<br><strong>' + t.paperWhoText4 + '</strong>';
    }
    if (papers[1]) {
        papers[1].querySelector('.paper-tag').textContent = t.paperBio;
        var bioTexts = papers[1].querySelectorAll('.paper-text');
        if (bioTexts[0]) bioTexts[0].textContent = t.paperBioText1;
        if (bioTexts[1]) bioTexts[1].textContent = t.paperBioText2;
    }
    if (papers[2]) {
        papers[2].querySelector('.paper-tag').textContent = t.paperContact;
    }
    if (papers[3]) {
        papers[3].querySelector('.paper-tag').textContent = t.paperResume;
        var resumeText = papers[3].querySelector('.paper-text-dark');
        if (resumeText) resumeText.textContent = t.paperResumeText;
        var resumeBtn = papers[3].querySelector('.resume-btn');
        if (resumeBtn) resumeBtn.innerHTML = t.downloadCV + ' <span>→</span>';
        var updatedText = papers[3].querySelectorAll('.paper-text-dark')[1];
        if (updatedText) updatedText.innerHTML = t.updated + ' 2026';
    }

    // Skills section
    var skTitles = document.querySelectorAll('.sk-col-title');
    if (skTitles[0]) skTitles[0].textContent = t.skillsSkillsets;
    if (skTitles[1]) skTitles[1].textContent = t.skillsSoftware;
    if (skTitles[2]) skTitles[2].textContent = t.skillsLanguages;

    var langLevels = document.querySelectorAll('.sk-level');
    if (langLevels[0]) langLevels[0].innerHTML = '— ' + t.skillsNative;
    if (langLevels[1]) langLevels[1].innerHTML = '— ' + t.skillsAdvanced;
    if (langLevels[2]) langLevels[2].innerHTML = '— ' + t.skillsBasic;

    var eduTitle = document.querySelector('.edu-title');
    if (eduTitle) eduTitle.textContent = t.educationTitle;

    var eduBlocks = document.querySelectorAll('.edu-block');
    if (eduBlocks[0]) {
        var period1 = eduBlocks[0].querySelector('.edu-period');
        var degree1 = eduBlocks[0].querySelector('.edu-degree');
        var school1 = eduBlocks[0].querySelector('.edu-school');
        if (period1) period1.textContent = t.eduPeriod1;
        if (degree1) degree1.textContent = t.eduDegree1;
        if (school1) school1.innerHTML = t.eduSchool1.replace(/\n/g, '<br>');
    }
    if (eduBlocks[1]) {
        var period2 = eduBlocks[1].querySelector('.edu-period');
        var degree2 = eduBlocks[1].querySelector('.edu-degree');
        var school2 = eduBlocks[1].querySelector('.edu-school');
        if (period2) period2.textContent = t.eduPeriod2;
        if (degree2) degree2.textContent = t.eduDegree2;
        if (school2) school2.innerHTML = t.eduSchool2.replace(/\n/g, '<br>');
    }

    var clickHints = document.querySelectorAll('.paper-click-hint');
    if (clickHints[0]) clickHints[0].textContent = t.clickToFlip;
    if (clickHints[1]) clickHints[1].textContent = t.clickToFlipBack;

    // Works overlay
    var worksHeading = document.querySelector('.works-heading');
    if (worksHeading) worksHeading.textContent = t.worksHeading;

    var worksLabelL = document.querySelector('.works-label-l');
    if (worksLabelL) worksLabelL.textContent = t.worksLabelL;

    var worksLabelR = document.querySelector('.works-label-r');
    if (worksLabelR) worksLabelR.textContent = t.worksLabelR;

    var worksClose = document.getElementById('worksClose');
    if (worksClose) worksClose.innerHTML = t.worksClose;

    // Slots
    var slots = document.querySelectorAll('.slot');
    var slotTitles = [t.motion, t.editorial, t.branding, t.digital, t.programming];
    var slotSubs = [t.motionSub, t.editorialSub, t.brandingSub, t.digitalSub, t.programmingSub];
    slots.forEach(function(slot, i) {
        if (i < 5) {
            var titleDiv = slot.querySelector('.slot-title');
            var subDiv = slot.querySelector('.slot-sub');
            if (titleDiv) titleDiv.textContent = slotTitles[i];
            if (subDiv) subDiv.textContent = slotSubs[i];
        }
    });

    // Cat overlay
    var catBackBtn = document.querySelector('.cat-back-btn');
    if (catBackBtn) catBackBtn.innerHTML = t.backToWorks;

    var catListHeaderLeft = document.querySelector('.cat-list-header-left');
    if (catListHeaderLeft) catListHeaderLeft.textContent = t.projectTitle;

    var catListHeaderRight = document.querySelector('.cat-list-header-right');
    if (catListHeaderRight) catListHeaderRight.textContent = t.preview;

    var catFooterBack = document.querySelector('.cat-overlay-footer-back');
    if (catFooterBack) catFooterBack.innerHTML = t.backToWorks;

    var catFooterCopy = document.querySelector('.cat-overlay-footer-copy');
    if (catFooterCopy) catFooterCopy.textContent = t.footerCopy;

    // Proj buttons
    var projBackBtns = document.querySelectorAll('.proj-back-btn');
    projBackBtns.forEach(function(btn) {
        btn.textContent = t.back;
    });

    var projFooterCopies = document.querySelectorAll('.proj-footer-copy');
    projFooterCopies.forEach(function(copy) {
        copy.textContent = t.footerCopy;
    });

    // Meta labels
    var metaLabels = document.querySelectorAll('.proj-meta-label');
    if (metaLabels.length >= 4) {
        metaLabels[0].textContent = t.year;
        metaLabels[1].textContent = t.category;
        metaLabels[2].textContent = t.tools;
        metaLabels[3].textContent = t.context;
    }

    // Re-render cat list if open
    if (catOverlay && catOverlay.classList.contains('open')) {
        renderCatList(currentCat);
    }
}

// ===== FUNÇÕES =====
function expoOut(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function backOut(t) {
    var c = 2.70158;
    return 1 + c * Math.pow(t - 1, 3) + (c - 1) * Math.pow(t - 1, 2);
}

function applyWallet() {
    var rot = isOpen ? 0 : Math.sin(floatT * 1.5708) * 3;
    var sc = isOpen ? 1 : 1 + Math.sin(floatT * 1.5708 + Math.PI) * 0.015;
    wallet.style.transform = 'translateX(' + wX + 'px) translateY(' + floatY + 'px) rotate(' + rot + 'deg) scale(' + sc + ')';
    wallet.style.boxShadow = isOpen ?
        '0 40px 100px rgba(0,0,0,.95),0 8px 30px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,0.06)' :
        '0 ' + (40 + Math.sin(floatT * 1.5708) * 15) + 'px ' + (80 + Math.sin(floatT * 1.5708) * 20) + 'px rgba(0,0,0,.9),0 8px 30px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,0.06)';
}

function applyCard(i) {
    cards[i].style.transform = 'translateX(' + cX[i] + 'px)';
    cards[i].style.opacity = cOp[i];
}

function floatLoop(now) {
    if (!lastTime) lastTime = now;
    var dt = (now - lastTime) / 1000;
    lastTime = now;
    if (!isOpen) {
        floatT += dt;
        floatY = Math.sin(floatT * 1.5708) * 22;
    } else {
        floatY = 0;
    }
    applyWallet();
    requestAnimationFrame(floatLoop);
}

function animate(opts) {
    var t0 = performance.now();
    function tick(now) {
        var p = Math.min((now - t0) / opts.duration, 1);
        opts.onUpdate(opts.start + (opts.end - opts.start) * opts.easing(p));
        if (p < 1) {
            requestAnimationFrame(tick);
        } else if (opts.onDone) {
            opts.onDone();
        }
    }
    requestAnimationFrame(tick);
}

function openWallet() {
    if (isOpen) return;
    isOpen = true;
    animate({
        start: wX,
        end: WALLET_X,
        duration: 700,
        easing: expoOut,
        onUpdate: function(v) { wX = v; }
    });
    for (var i = N - 1; i >= 0; i--) {
        (function(ci) {
            setTimeout(function() {
                cards[ci].style.pointerEvents = 'all';
                animate({
                    start: 0,
                    end: ejectedX[ci],
                    duration: 700,
                    easing: backOut,
                    onUpdate: function(v) { cX[ci] = v; applyCard(ci); }
                });
                animate({
                    start: 0,
                    end: 1,
                    duration: 400,
                    easing: expoOut,
                    onUpdate: function(v) { cOp[ci] = v; applyCard(ci); }
                });
            }, ((N - 1) - ci) * 90);
        })(i);
    }
}

function closeWallet() {
    if (!isOpen) return;
    isOpen = false;
    cards.forEach(function(c) {
        c.style.filter = '';
        c.style.boxShadow = '';
    });
    for (var i = 0; i < N; i++) {
        (function(ci) {
            setTimeout(function() {
                cards[ci].style.pointerEvents = 'none';
                animate({
                    start: cX[ci],
                    end: 0,
                    duration: 600,
                    easing: expoOut,
                    onUpdate: function(v) { cX[ci] = v; applyCard(ci); }
                });
                setTimeout(function() {
                    animate({
                        start: 1,
                        end: 0,
                        duration: 300,
                        easing: expoOut,
                        onUpdate: function(v) { cOp[ci] = v; applyCard(ci); }
                    });
                }, 300);
            }, ci * 70);
        })(i);
    }
    setTimeout(function() {
        animate({
            start: wX,
            end: 0,
            duration: 700,
            easing: expoOut,
            onUpdate: function(v) { wX = v; }
        });
    }, 250);
}

function updateCard(i) {
    var d = cardData[i];
    aboutCard.style.background = d.bg;
    miniNum.textContent = d.num;
    miniTitle.textContent = d.title;
    miniSub.textContent = d.sub;
    miniTitle.style.color = d.color;
    miniSub.style.color = d.color;
    miniNum.style.color = d.color;
}

function typeText(text, cb) {
    var i = 0;
    typeEl.textContent = '';
    var iv = setInterval(function() {
        typeEl.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(iv);
            setTimeout(cb, 1400);
        }
    }, 80);
}

function eraseText(cb) {
    var iv = setInterval(function() {
        var t = typeEl.textContent;
        if (t.length === 0) {
            clearInterval(iv);
            cb();
        } else {
            typeEl.textContent = t.slice(0, -1);
        }
    }, 50);
}

function loopWords() {
    updateCard(wordIdx);
    typeText(wordList[wordIdx], function() {
        eraseText(function() {
            wordIdx = (wordIdx + 1) % wordList.length;
            loopWords();
        });
    });
}

function allProjOverlays() {
    return ALL_PROJ_IDS.map(function(id) {
        return document.getElementById(id);
    });
}

function renderCatList(cat) {
    var info = catInfo[cat];
    var bg = catBg[cat] || '#0a0a0a';
    if (info.projects.length === 0) {
        catList.innerHTML = '<div class="cat-empty">Coming soon</div>';
        return;
    }
    var html = '';
    info.projects.forEach(function(proj) {
        html += '<div class="proj-row" data-proj="' + proj.id + '" style="background:' + bg + ';">';
        html += '<div class="proj-row-left"><div class="proj-row-title">' + proj.title + '</div><div class="proj-row-tags">';
        proj.tags.forEach(function(t) {
            html += '<span class="proj-row-tag">' + t + '</span>';
        });
        html += '</div></div></div>';
    });
    catList.innerHTML = html;
    catList.querySelectorAll('.proj-row').forEach(function(row) {
        row.addEventListener('click', function() {
            var overlay = document.getElementById(row.getAttribute('data-proj'));
            if (overlay) {
                overlay.classList.add('open');
                overlay.scrollTop = 0;
            }
        });
    });
}

function openCat(cat) {
    currentCat = cat;
    catTitle.textContent = catInfo[cat].title;
    catNum.textContent = catInfo[cat].num;
    renderCatList(cat);
    catOverlay.classList.add('open');
    catOverlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

function goBackToWorks() {
    catOverlay.classList.remove('open');
    setTimeout(function() {
        worksOverlay.classList.add('open');
    }, 200);
}

function goBackToCat() {
    allProjOverlays().forEach(function(o) {
        o.classList.remove('open');
    });
}

// ===== EVENT LISTENERS =====
document.querySelectorAll('.paper').forEach(function(paper) {
    paper.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'A') return;
        activePaper = paper;
        paper.classList.add('dragging');
        maxZ++;
        paper.style.zIndex = maxZ;
        dStartX = e.clientX;
        dStartY = e.clientY;
        dOrigLeft = parseInt(paper.style.left) || 0;
        dOrigTop = parseInt(paper.style.top) || 0;
        e.preventDefault();
        e.stopPropagation();
    });
});

document.addEventListener('mousemove', function(e) {
    if (!activePaper) return;
    activePaper.style.left = (dOrigLeft + e.clientX - dStartX) + 'px';
    activePaper.style.top = (dOrigTop + e.clientY - dStartY) + 'px';
});

document.addEventListener('mouseup', function() {
    if (!activePaper) return;
    activePaper.classList.remove('dragging');
    activePaper = null;
});

scene.addEventListener('mouseenter', openWallet);
scene.addEventListener('mouseleave', closeWallet);

var SPREAD = 90;
cards.forEach(function(card, i) {
    card.addEventListener('mouseenter', function() {
        if (!isOpen) return;
        cards.forEach(function(other, j) {
            if (j === i) {
                other.style.transition = 'transform 0.4s cubic-bezier(.16,1,.3,1),filter 0.3s,box-shadow 0.3s';
                other.style.transform = 'translateX(' + ejectedX[i] + 'px) scale(1.07)';
                other.style.filter = 'none';
                other.style.boxShadow = '0 40px 80px rgba(0,0,0,.9),0 0 70px ' + GLOW[i];
                other.style.zIndex = 20;
            } else {
                var dir = j < i ? -1 : 1;
                var extra = Math.abs(j - i) * SPREAD * dir;
                other.style.transition = 'transform 0.4s cubic-bezier(.16,1,.3,1),filter 0.3s';
                other.style.transform = 'translateX(' + (ejectedX[j] + extra) + 'px)';
                other.style.filter = 'brightness(0.28) blur(1.5px)';
                other.style.zIndex = 5;
                other.style.boxShadow = 'none';
            }
        });
    });
    card.addEventListener('mouseleave', function() {
        if (!isOpen) return;
        cards.forEach(function(other, j) {
            other.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1),filter 0.35s,box-shadow 0.35s';
            other.style.transform = 'translateX(' + ejectedX[j] + 'px)';
            other.style.filter = 'none';
            other.style.boxShadow = 'none';
            other.style.zIndex = 9 - j;
        });
    });
});

cyclingEl.innerHTML = '<span class="does-word active" id="typeEl"></span>';
typeEl = document.getElementById('typeEl');
loopWords();

document.getElementById('paperFlipper').addEventListener('click', function() {
    this.classList.toggle('flipped');
});

document.getElementById('catBack').addEventListener('click', goBackToWorks);
document.getElementById('catFooterBack').addEventListener('click', goBackToWorks);
document.querySelectorAll('.proj-back-all').forEach(function(btn) {
    btn.addEventListener('click', goBackToCat);
});

cards.forEach(function(card, i) {
    card.addEventListener('click', function() {
        if (!isOpen) return;
        openCat(heroCardCat[i]);
    });
});

document.querySelectorAll('.slot').forEach(function(slot) {
    slot.addEventListener('click', function() {
        var cat = slot.getAttribute('data-cat');
        var c = slot.querySelector('.slot-card');
        c.classList.add('ejecting');
        setTimeout(function() {
            worksOverlay.classList.remove('open');
            openCat(cat);
            c.classList.remove('ejecting');
        }, 380);
    });
});

document.getElementById('navWorks').addEventListener('click', function(e) {
    e.preventDefault();
    allProjOverlays().forEach(function(o) {
        o.classList.remove('open');
    });
    catOverlay.classList.remove('open');
    worksOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
});

document.getElementById('worksClose').addEventListener('click', function() {
    worksOverlay.classList.remove('open');
    document.body.style.overflow = '';
});

document.getElementById('navHome').addEventListener('click', function(e) {
    e.preventDefault();
    [worksOverlay, catOverlay].concat(allProjOverlays()).forEach(function(o) {
        o.classList.remove('open');
    });
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('navAbout').addEventListener('click', function() {
    [worksOverlay, catOverlay].concat(allProjOverlays()).forEach(function(o) {
        o.classList.remove('open');
    });
    document.body.style.overflow = '';
});

document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    var anyProj = allProjOverlays().some(function(o) {
        return o.classList.contains('open');
    });
    if (anyProj) {
        goBackToCat();
    } else if (catOverlay.classList.contains('open')) {
        goBackToWorks();
    } else if (worksOverlay.classList.contains('open')) {
        worksOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ===== CURSOR PERSONALIZADO =====
document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
});

(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .slot, .card, .paper, .scrunch-wrap, .proj-row, .flip-card, .about-card-wrap').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
        cur.classList.add('hover');
        ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', function() {
        cur.classList.remove('hover');
        ring.classList.remove('hover');
    });
});

document.addEventListener('mousedown', function() {
    cur.classList.add('click');
    ring.classList.add('click');
});

document.addEventListener('mouseup', function() {
    cur.classList.remove('click');
    ring.classList.remove('click');
});

// ===== INICIALIZAR ANIMAÇÃO DO FLOAT =====
requestAnimationFrame(floatLoop);

// ===== CORRIGIR EMAIL =====
var emailLink = document.getElementById('emailLink');
if (emailLink) {
    emailLink.setAttribute('href', 'mailto:martacalejaa@gmail.com');
}

// ===== BOTÕES DE IDIOMA =====
document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        setLanguage(btn.dataset.lang);
    });
});

// ===== INICIAR COM INGLÊS =====
setLanguage('en');
