//------------------------------------ SISTEMA PRINCIPAL ----------------------------------------//
(function() {
    const loginContainer = document.querySelector('.login-container');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const loginForm = document.querySelector('#login-form');
    const adminForm = document.querySelector('#admin-form');
    const loginUsername = document.querySelector('#login-username');
    const adminUsername = document.querySelector('#admin-username');
    const adminPassword = document.querySelector('#admin-password');
    const signInLink = document.querySelector('.SignInLink');
    const allowedUsers = ['josue', 'mailson', 'moises', 'delrick', 'yohana'];
    let currentUser = null;
    let lastPage = 'dashboard';

    function formatDate(date) {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    }

    function getNextBusinessDay(year, month, day) {
        let date = new Date(year, month, day);
        let dayOfWeek = date.getDay();
        if (dayOfWeek === 6) {
            date.setDate(date.getDate() + 2);
        } else if (dayOfWeek === 0) {
            date.setDate(date.getDate() + 1);
        }
        return formatDate(date);
    }

    function getLastBusinessDayOfMonth() {
        const now = new Date();
        let date = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        let dayOfWeek = date.getDay();
        if (dayOfWeek === 6) {
            date.setDate(date.getDate() - 1);
        } else if (dayOfWeek === 0) {
            date.setDate(date.getDate() - 2);
        }
        return formatDate(date);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    loginUsername.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAdminLogin();
    });

    adminPassword.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleAdminLogin();
        }
    });

    signInLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.classList.remove('active');
    });

    function handleLogin() {
        const username = loginUsername.value.trim().toLowerCase();
        if (allowedUsers.includes(username)) {
            currentUser = username;
            loginContainer.style.display = 'none';
            dashboardContainer.style.display = 'block';
            loadUserPreferences();
            navigateTo('dashboard');
        } else if (username === 'adm') {
            loginContainer.classList.add('active');
            adminUsername.value = 'ADM';
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'Usuário inválido. Tente novamente.';
            loginForm.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 3000);
        }
    }

    function handleAdminLogin() {
        const password = adminPassword.value.trim();
        if (password === 'CTRLALTDELETE_SISTEMA') {
            currentUser = 'adm';
            loginContainer.style.display = 'none';
            dashboardContainer.style.display = 'block';
            loadUserPreferences();
            navigateTo('dashboard');
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'Senha incorreta. Tente novamente.';
            adminForm.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 3000);
        }
    }

    function loadUserPreferences() {
        if (currentUser) {
            const savedTheme = localStorage.getItem(`theme_${currentUser}`);
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode-variables');
                darkMode.querySelector('span:nth-child(1)').classList.remove('active');
                darkMode.querySelector('span:nth-child(2)').classList.add('active');
                document.documentElement.style.background = '#181a1e';
            } else {
                document.body.classList.remove('dark-mode-variables');
                darkMode.querySelector('span:nth-child(1)').classList.add('active');
                darkMode.querySelector('span:nth-child(2)').classList.remove('active');
                document.documentElement.style.background = '#f6f6f9';
            }
        }
    }

    const sideMenu = document.querySelector('aside');
    const menuBtn = document.querySelector('#menu-btn');
    const closeBtn = document.querySelector('#close-btn');
    const darkMode = document.querySelector('.dark-mode');
    const sidebarLinks = document.querySelectorAll('.sidebar a:not(.logout)');

    menuBtn.addEventListener('click', () => {
        sideMenu.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        sideMenu.style.display = 'none';
    });

    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode-variables');
        darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
        darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
        document.documentElement.style.background = document.body.classList.contains('dark-mode-variables') ? '#181a1e' : '#f6f6f9';
        if (currentUser) {
            localStorage.setItem(`theme_${currentUser}`, document.body.classList.contains('dark-mode-variables') ? 'dark' : 'light');
        }
    });

    const logoutLink = document.querySelector('.logout');
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'flex';
        dashboardContainer.style.display = 'none';
        loginUsername.value = '';
        adminPassword.value = '';
        loginContainer.classList.remove('active');
        document.documentElement.style.background = '#25252b';
        if (currentUser === 'josue') {
            localStorage.removeItem('josue_analytics_access_time');
        }
        currentUser = null;
        lastPage = 'dashboard';
    });

    function navigateTo(page) {
        if (page !== 'analytics') {
            lastPage = page;
        }

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        const mainContent = document.querySelector('#main-content');
        mainContent.innerHTML = '';

        const existingModal = document.querySelector('.protected-modal');
        if (existingModal) existingModal.remove();

        if (page === 'dashboard') {
            mainContent.innerHTML = `
                <h1>Dashboard</h1>
                <div class="dashboard-grid">
                    <div class="box animate-section" style="animation-delay: 0s"></div>
                    <div class="box animate-section" style="animation-delay: 0.05s"></div>
                    <div class="box animate-section" style="animation-delay: 0.1s"></div>
                    <div class="box animate-section" style="animation-delay: 0.15s"></div>
                    <div class="box animate-section" style="animation-delay: 0.2s"></div>
                    <div class="box animate-section" style="animation-delay: 0.25s"></div>
                    <div class="box animate-section" style="animation-delay: 0.3s"></div>
                    <div class="box animate-section" style="animation-delay: 0.35s"></div>
                    <div class="box animate-section" style="animation-delay: 0.4s"></div>
                </div>
            `;
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth();
            const envioImpostosDueDate = `15/${(currentMonth + 1).toString().padStart(2, '0')}`;
            const icmsDueDate = getNextBusinessDay(currentYear, currentMonth, 20);
            const dirbiDueDate = `20/${(currentMonth + 1).toString().padStart(2, '0')}`;
            const dctfwebDueDate = getLastBusinessDayOfMonth();
            console.log('Datas calculadas:', {
                envioImpostos: envioImpostosDueDate,
                icms: icmsDueDate,
                dirbi: dirbiDueDate,
                dctfweb: dctfwebDueDate
            });
            const envioImpostosElement = document.querySelector('.notification-envio .info small');
            const icmsElement = document.querySelector('.notification-icms .info small');
            const dirbiElement = document.querySelector('.notification-dirbi .info small');
            const dctfwebElement = document.querySelector('.notification-dctfweb .info small');
            console.log('Elementos selecionados:', {
                envioImpostos: envioImpostosElement,
                icms: icmsElement,
                dirbi: dirbiElement,
                dctfweb: dctfwebElement
            });
            if (envioImpostosElement) envioImpostosElement.textContent = `Vencimento: ${envioImpostosDueDate}`;
            if (icmsElement) icmsElement.textContent = `Vencimento: ${icmsDueDate}`;
            if (dirbiElement) dirbiElement.textContent = `Vencimento: ${dirbiDueDate}`;
            if (dctfwebElement) dctfwebElement.textContent = `Vencimento: ${dctfwebDueDate}`;
        } else if (page === 'analytics') {
            if (currentUser === 'adm') {
                loadAnalyticsContent(mainContent);
            } else if (currentUser === 'josue') {
                const lastAccessTime = localStorage.getItem('josue_analytics_access_time');
                const currentTime = Date.now();
                const fiveMinutes = 5 * 60 * 1000;

                if (lastAccessTime && (currentTime - parseInt(lastAccessTime)) < fiveMinutes) {
                    loadAnalyticsContent(mainContent);
                } else {
                    const modal = document.createElement('div');
                    modal.className = 'protected-modal animate-section';
                    modal.innerHTML = `
                        <div class="modal-content">
                            <span class="material-icons-sharp">fingerprint</span>
                            <h3>Autenticação de Administrador</h3>
                            <input type="password" id="analytics-password" placeholder="Digite a senha de administrador">
                            <div id="password-error" class="error-message"></div>
                            <button id="confirm-password-btn" class="btn">Confirmar</button>
                        </div>
                    `;
                    document.body.appendChild(modal);

                    const passwordInput = document.getElementById('analytics-password');
                    const confirmBtn = document.getElementById('confirm-password-btn');
                    const errorDiv = document.getElementById('password-error');

                    confirmBtn.addEventListener('click', () => {
                        if (passwordInput.value.trim() === 'CTRLALTDELETE_SISTEMA') {
                            localStorage.setItem('josue_analytics_access_time', Date.now().toString());
                            modal.classList.add('fade-out');
                            setTimeout(() => {
                                modal.remove();
                                loadAnalyticsContent(mainContent);
                            }, 400);
                        } else {
                            errorDiv.textContent = 'Senha incorreta. Tente novamente.';
                            setTimeout(() => errorDiv.textContent = '', 3000);
                        }
                    });

                    passwordInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            confirmBtn.click();
                        }
                    });

                    modal.addEventListener('click', (e) => {
                        if (e.target.classList.contains('protected-modal')) {
                            modal.classList.add('fade-out');
                            setTimeout(() => {
                                modal.remove();
                                navigateTo(lastPage);
                            }, 400);
                        }
                    });
                }
            } else {
                const modal = document.createElement('div');
                modal.className = 'protected-modal animate-section';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="material-icons-sharp">lock</span>
                        <p>Você não tem os Requisitos de Administrador</p>
                    </div>
                `;
                document.body.appendChild(modal);

                modal.addEventListener('click', (e) => {
                    if (e.target.classList.contains('protected-modal')) {
                        modal.classList.add('fade-out');
                        setTimeout(() => {
                            modal.remove();
                            navigateTo(lastPage);
                        }, 400);
                    }
                });
            }
        } 
        else if (page === 'apuration') {
            mainContent.innerHTML = `
                <h1>Apuration</h1>
                <div class="apuration-box animate-section" style="animation-delay: 0s; width: 100%; max-width: 800px; height: 400px; margin: 0 auto; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding);">
                </div>
            `;
        }
        else if (page === 'fortes-correction') {
            mainContent.innerHTML = `
                <h1>Fortes Correction</h1>
                <div class="fortes-correction-grid" style="display: flex; flex-direction: column; gap: 1.6rem;">
                    <div class="box animate-section" style="animation-delay: 0s; width: 100%; max-width: 800px; height: 200px; margin: 0 auto; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding);">
                    </div>
                    <div class="box animate-section" style="animation-delay: 0.1s; width: 100%; max-width: 800px; height: 400px; margin: 0 auto; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding);">
                    </div>
                </div>
            `;
        }
        else if (page === 'nfe-cfe-comparison') {
            createNfeCfeComparisonPage(mainContent);
        }
        else if (page === 'icms-withholding') {
            mainContent.innerHTML = `
                <h1>ICMS Withholding</h1>
                <div class="icms-withholding-box animate-section" style="animation-delay: 0s; width: 100%; max-width: 800px; height: 400px; margin: 0 auto; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding);">
                </div>
            `;
        }
        else if (page === 'dae') {
            mainContent.innerHTML = `
                <h1>DAE</h1>
                <div class="dae-box animate-section" style="animation-delay: 0s; width: 100%; max-width: 800px; height: 400px; margin: 0 auto; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding);">
                </div>
            `;
        }
        else if (page === 'sped') {
            createSpedPage(mainContent);
        }
    }

    function loadAnalyticsContent(mainContent) {
        mainContent.innerHTML = `
            <h1>Analytics</h1>
            <div class="analyse animate-section">
                <div class="apuracao">
                    <div class="status">
                        <div class="info">
                            <h3>Apuration</h3>
                            <h1>81%</h1>
                        </div>
                        <div class="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="percentage">
                                <p>+1%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="progress-card visits" id="progress-card">
                    <div class="status">
                        <div class="info">
                            <h3>Progress</h3>
                            <h1>0%</h1>
                            <div class="dropdown-list" id="progress-list"></div>
                        </div>
                        <div class="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="percentage">
                                <p>0%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="assistants searches" id="assistants-card">
                    <div class="status">
                        <div class="info">
                            <h3>Assistants</h3>
                            <h1>0%</h1>
                            <div class="dropdown-list" id="assistants-list"></div>
                        </div>
                        <div class="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="percentage">
                                <p>0%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="new-users animate-section">
                <div class="user-list">
                    <div class="user">
                        <img src="images/profile-2.png">
                        <h2>Josué</h2>
                        <p>54 Min Ago</p>
                    </div>
                    <div class="user">
                        <img src="images/profile-3.png">
                        <h2>Moises</h2>
                        <p>3 Hours Ago</p>
                    </div>
                    <div class="user">
                        <img src="images/profile-4.png">
                        <h2>Yohana</h2>
                        <p>6 Hours Ago</p>
                    </div>
                    <div class="user">
                        <img src="images/plus.png">
                        <h2>More</h2>
                        <p>New User</p>
                    </div>
                </div>
            </div>
            <div class="recent-orders animate-section">
                <h2>Monthly Archives</h2>
                <table id="archives-table">
                    <thead>
                        <tr>
                            <th>Files</th>
                            <th>Contributor</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <a href="#" id="show-all-btn">Show All</a>
            </div>
        `;
        createDropdownItems(progressItems, 'progress-list', 'progress-card', 'visits');
        createDropdownItems(assistantsItems, 'assistants-list', 'assistants-card', 'searches');
        waitForOrders(() => populateArchivesTable());

        // Registrar eventos para "Show All" e fechamento fora da tabela
        const showAllBtn = document.querySelector('#show-all-btn');
        const recentOrders = document.querySelector('.recent-orders');
        if (showAllBtn && recentOrders) {
            showAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const closeBtn = document.createElement('button');
                closeBtn.className = 'close-btn';
                closeBtn.innerHTML = 'X';
                closeBtn.addEventListener('click', () => {
                    waitForOrders(() => populateArchivesTable(false));
                    recentOrders.classList.remove('expanded');
                    closeBtn.remove();
                    document.removeEventListener('click', outsideClickHandler);
                });
                recentOrders.appendChild(closeBtn);
                waitForOrders(() => populateArchivesTable(true));
                setTimeout(() => recentOrders.classList.add('expanded'), 10);

                // Adicionar listener para cliques fora da tabela
                const outsideClickHandler = (e) => {
                    if (!recentOrders.contains(e.target) && e.target.id !== 'show-all-btn' && e.target.className !== 'close-btn') {
                        if (recentOrders.classList.contains('expanded')) {
                            waitForOrders(() => populateArchivesTable(false));
                            recentOrders.classList.remove('expanded');
                            const existingCloseBtn = recentOrders.querySelector('.close-btn');
                            if (existingCloseBtn) existingCloseBtn.remove();
                            document.removeEventListener('click', outsideClickHandler);
                        }
                    }
                };
                document.addEventListener('click', outsideClickHandler);
            });
        } else {
            console.error('Erro: showAllBtn ou recentOrders não encontrados após renderizar Analytics');
        }
    }

    const progressItems = [
        { name: 'Sitram', percentage: 75 },
        { name: 'ISS', percentage: 62 },
        { name: 'Doc', percentage: 88 },
        { name: 'NF-e Entrada', percentage: 45 },
        { name: 'NF-e Saída', percentage: 93 },
        { name: 'CF-e | NFC-e', percentage: 70 },
        { name: 'ICMS ST 1104', percentage: 55 },
        { name: 'MIT', percentage: 80 },
        { name: 'DIRBI', percentage: 67 },
        { name: 'EFD Fiscal', percentage: 85 },
        { name: 'EFD Contribuições', percentage: 60 }
    ];
    const assistantsItems = [
        { name: 'Josué', percentage: 78 },
        { name: 'Moises', percentage: 65 },
        { name: 'Yohana', percentage: 90 }
    ];

    function createDropdownItems(items, listId, cardId, circleClass) {
        const list = document.getElementById(listId);
        if (!list) return;
        const ul = document.createElement('ul');
        const title = document.querySelector(`#${cardId} h3`);
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.addEventListener('click', () => {
                document.querySelector(`#${cardId} h3`).textContent = item.name;
                document.querySelector(`#${cardId} h1`).textContent = `${item.percentage}%`;
                document.querySelector(`#${cardId} .percentage p`).textContent = `${item.percentage}%`;
                const circle = document.querySelector(`#${cardId} svg circle`);
                circle.style.strokeDashoffset = `calc(226 - (226 * ${item.percentage} / 100))`;
                list.classList.remove('show');
            });
            ul.appendChild(li);
        });
        list.appendChild(ul);

        title.addEventListener('click', (e) => {
            list.classList.toggle('show');
            const rect = title.getBoundingClientRect();
            const cardRect = document.querySelector(`#${cardId}`).getBoundingClientRect();
            let top = rect.bottom - cardRect.top + 2;
            let left = rect.left - cardRect.left;
            const dropdownWidth = 120;
            if (left + dropdownWidth > cardRect.right - cardRect.left) {
                left = (cardRect.right - cardRect.left) - dropdownWidth - 5;
            }
            if (left < 0) {
                left = 5;
            }
            list.style.top = `${top}px`;
            list.style.left = `${left}px`;
        });

        document.addEventListener('click', (e) => {
            if (!list.contains(e.target) && !title.contains(e.target)) {
                list.classList.remove('show');
            }
        });
    }

    function waitForOrders(callback, maxAttempts = 10, interval = 100) {
        let attempts = 0;
        const checkOrders = setInterval(() => {
            if (window.Orders && Array.isArray(window.Orders)) {
                clearInterval(checkOrders);
                callback();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkOrders);
                console.error('Erro: window.Orders não foi definido após várias tentativas');
                const tbody = document.querySelector('#archives-table tbody');
                if (tbody) {
                    tbody.innerHTML = '<tr><td colspan="4">Dados indisponíveis</td></tr>';
                }
            }
            attempts++;
        }, interval);
    }

    function populateArchivesTable(allItems = false) {
        const tbody = document.querySelector('#archives-table tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (!window.Orders || !Array.isArray(window.Orders)) {
            console.error('Erro: window.Orders não está definido ou não é um array');
            tbody.innerHTML = '<tr><td colspan="4">Dados indisponíveis</td></tr>';
            return;
        }
        const ordersToShow = allItems ? window.Orders : window.Orders.slice(0, 3);
        ordersToShow.forEach(order => {
            const tr = document.createElement('tr');
            const trContent = `
                <td>${order.productName}</td>
                <td>${order.productNumber}</td>
                <td>${order.paymentStatus}</td>
                <td class="${order.status === 'Divergence' ? 'danger' : order.status === 'Completed' ? 'success' : 'primary'}">${order.status}</td>
            `;
            tr.innerHTML = trContent;
            tbody.appendChild(tr);
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            navigateTo(page);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        console.log('index.js carregado');
    });
})();
//---------------------------------- FIM SISTEMA PRINCIPAL --------------------------------------//
//---------------------------------------- APURATION --------------------------------------------//
//---------------------------------------- FIM APURATION ----------------------------------------//
//--------------------------------------- FORTES CORRETION --------------------------------------//
//------------------------------------- FIM FORTES CORRETION ------------------------------------//

//--------------------------------------- ICMS Withholding --------------------------------------//
//------------------------------------- FIM ICMS Withholding ------------------------------------//
//--------------------------------------------- DAE ---------------------------------------------//
//------------------------------------------- FIM DAE -------------------------------------------//
//--------------------------------------------- SPED --------------------------------------------//

function createSpedPage(mainContent) {
    console.log('createSpedPage chamado'); // Log para verificar chamada
    mainContent.innerHTML = `
        <h1>SPED</h1>
        <div class="sped-box animate-section" style="animation-delay: 0s; width: 100%; max-width: 800px; height: 400px; margin: 0 auto; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding); cursor: pointer; display: flex; align-items: center; justify-content: center; pointer-events: auto !important; z-index: 1000;">
            <p>Arquivos SPED (.txt)</p>
        </div>
    `;

    const spedBox = document.querySelector('.sped-box');
    if (spedBox) {
        console.log('sped-box encontrado no DOM'); // Log para confirmar elemento
        spedBox.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita interferência de outros listeners
            console.log('Box clicado'); // Log para clique
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = '.txt';
            input.style.display = 'none';
            document.body.appendChild(input);
            console.log('Input de arquivo criado'); // Log para criação do input
            input.click();
            console.log('input.click() disparado'); // Log para disparo

            input.addEventListener('change', (e) => {
                console.log('Arquivos selecionados:', e.target.files); // Log para seleção
                const files = e.target.files;
                const paths = Array.from(files).map(file => file.name);
                localStorage.setItem('sped_paths', JSON.stringify(paths));
                console.log('Caminhos guardados:', paths);

                mainContent.innerHTML = `
                    <h1>SPED</h1>
                    <div class="sped-container" style="width: 100%; max-width: 800px; margin: 0 auto;">
                        <div class="sped-box box animate-section" style="animation-delay: 0s; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding);">
                            <h2>Sped Fiscal | Contribuições</h2>
                            <div class="sped-drop-area" id="sped-drop" style="border: 2px dashed var(--color-primary); padding: 1rem; text-align: center; margin-bottom: 1rem;">
                                Arraste arquivos de texto (.txt) aqui
                            </div>
                            <div class="sped-results" id="sped-results" style="display: none;">
                                <ul id="sped-results-list" style="list-style: none; padding: 0;"></ul>
                            </div>
                        </div>
                    </div>
                    <div class="progress-container" id="progress-container" style="width: 100%; max-width: 800px; margin: 1rem auto;">
                        <div class="progress-bar" id="progress-bar" style="width: 100%; height: 20px; background-color: #e0e0e0; border-radius: 10px; overflow: hidden;">
                            <div class="progress-fill" id="progress-fill" style="width: 0%; height: 100%; background-color: var(--color-primary); transition: width 0.3s;"></div>
                        </div>
                        <span class="progress-percentage" id="progress-percentage" style="display: block; text-align: center; margin-top: 0.5rem;">0%</span>
                    </div>
                `;

                const spedDrop = document.getElementById("sped-drop");
                const spedResultsList = document.getElementById("sped-results-list");
                const progressBar = document.getElementById("progress-fill");
                const progressPercentage = document.getElementById("progress-percentage");
                console.log('Configurando drop zone'); // Log para drop zone
                setupSpedDropZone(spedDrop, spedResultsList, document.getElementById("sped-box"), progressBar, progressPercentage);

                const dt = new DataTransfer();
                Array.from(files).forEach(file => dt.items.add(file));
                const event = new DragEvent('drop', { dataTransfer: dt });
                console.log('Simulando evento de drop'); // Log para drop
                spedDrop.dispatchEvent(event);
                document.body.removeChild(input);
            });
        });
    } else {
        console.error('Erro: sped-box não encontrado no DOM'); // Log para erro
    }
}

function setupSpedDropZone(dropArea, resultsList, box, progressBar, progressPercentage) {
    console.log('setupSpedDropZone chamado'); // Log para verificar chamada
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
        dropArea.style.borderColor = 'var(--color-success)';
        console.log('Dragover detectado'); // Log para dragover
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
        dropArea.style.borderColor = 'var(--color-primary)';
        console.log('Dragleave detectado'); // Log para dragleave
    });

    dropArea.addEventListener('drop', async (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        dropArea.style.borderColor = 'var(--color-primary)';
        resultsList.innerHTML = '';
        dropArea.style.display = 'none';
        const resultsArea = dropArea.parentElement.querySelector('.sped-results');
        resultsArea.style.display = 'block';
        box.classList.add('loaded');
        console.log('Drop detectado, arquivos:', e.dataTransfer.files); // Log para drop

        const files = e.dataTransfer.files;
        const promises = [];
        const totalFiles = files.length;
        let processedFiles = 0;

        if (files && files.length > 0) {
            for (let file of files) {
                if (file.name.endsWith('.txt') || file.type === 'text/plain') {
                    const fileNameLower = file.name.toLowerCase();
                    if (fileNameLower.includes('fiscal')) {
                        console.log(`Processando SPED Fiscal: ${file.name}`);
                        promises.push(processSpedFiscal(file, resultsList, progressBar, progressPercentage, totalFiles, () => processedFiles++));
                    } else if (fileNameLower.includes('contribuicao') || fileNameLower.includes('contribuições')) {
                        console.log(`Processando SPED Contribuições: ${file.name}`);
                        promises.push(processSpedContribuicao(file, resultsList, progressBar, progressPercentage, totalFiles, () => processedFiles++));
                    } else {
                        console.warn(`Arquivo ignorado (não contém 'FISCAL' ou 'CONTRIBUIÇÕES'): ${file.name}`);
                        const li = document.createElement('li');
                        li.textContent = `[ERRO] ${file.name}: Nome do arquivo não indica Fiscal ou Contribuições`;
                        resultsList.appendChild(li);
                        processedFiles++;
                    }
                } else {
                    console.warn(`Arquivo ignorado (não é .txt): ${file.name}`);
                    const li = document.createElement('li');
                    li.textContent = `[ERRO] ${file.name}: Formato inválido (apenas .txt é aceito)`;
                    resultsList.appendChild(li);
                    processedFiles++;
                }

                const progress = (processedFiles / totalFiles) * 100;
                progressBar.style.width = `${progress}%`;
                progressPercentage.textContent = `${Math.round(progress)}%`;
            }

            await Promise.all(promises);
            resultsArea.style.opacity = '1';
            console.log('Todos os arquivos processados'); // Log para conclusão
        } else {
            console.warn("Nenhum arquivo detectado no evento de drop.");
            const li = document.createElement('li');
            li.textContent = 'Nenhum arquivo detectado.';
            resultsList.appendChild(li);
        }
    });
}

const cests1 = [
    'AGUA MINERAL INDAIA 1,5L', 'AGUA MINERAL CRYSTAL COM GAS 500ML', 'AGUA INDAIA 20L', 'AGUA MINERAL NATURAGUA C/GAS 500ML',
    'AGUA NATURAGUA 20L', 'AGUA MINERAL NATURAGUA 5 L', 'AGUA MINERAL NATURAG', 'AGUA MINER INDAIA 5L', 'AGUA INDAIA 10L',
    'AGUA CLARA C/GAS 500ML', 'AGUA MINERAL SCHIN COM GAS 500ML', 'AGUA CLARA 1,5L', 'AGUA CLARA 500ML', 'AGUA 20L',
    'AGUA MINERAL C/GAS GRF PET 1,5L INDAIA', 'AGUA MINERAL INDAIA COM GAS 500ML', 'AM CRYSTAL 1,5L S/ GAS', 'AM CRYSTAL 500ML C/ GAS',
    'AGUA INDAIA OU NATURAGUA S/G 1,5 L', 'AGUA MINERAL NATURAGUA 500ML', 'AGUA MINERAL NATURAGUA 1,5L', 'AGUA MINERAL CRYSTAL SEM GAS 500ML',
    'AGUA MINERAL INDAIA 500ML', 'AGUA MINERAL CRYSTAL S/GAS 1,5L', 'AGUA MINERAL CRYSTAL 500ML', 'AGUA MINERAL C/GAS CRYSTAL 500ML',
    'AGUA MINERAL NATURAGUA 5L', 'AGUA BOA 20L', 'AGUA MINERAL CRYSTAL SEM GAS 1,5L', 'AGUA NIMERAL SCHIN C/GAS 300ML',
    'AGUA TONICA ANTARCTICA LT 350ML', 'AGUA ADICIONADA DE SAIS AGUA DA BOA 20 LTS', 'AGUA COM GAS NATURAGUA 500ML',
    'AGUA MINERAL NATURAL 1,5L', 'AGUA MINERAL SERRA GRANDE C/GAS 510ML', 'AGUA MINERAL SERRA GRANDE S/GAS 510ML',
    'AGUA INDAIA 500ML', 'AGUA MIN NATURAGUA 1 LT C/ GAS', 'AGUA COM GAS INDAIA 500ML', 'AGUA MINERAL LIMPIDA C/GAS 500ML',
    'AGUA MINERAL LIMPIDA S/GAS 1500 ML', 'AGUA MINERAL LIMPIDA S/GAS 5 L - AZUL', 'AGUA MIN C/ GAS 315 ML NATURAGUA',
    'AGUA MINERAL LIMPIDA 500ML', 'AGUA MINERAL SERRA GRANDE S/ GAS 510ML', 'AGUA MINERAL LIMPIDA S/ GAS 1,5L',
    'AGUA 10L NATURAGUA GARRAFAO', 'AGUA 20L NATURAGUA GARRAFAO', 'AGUA INDAIA 500ML S/G', 'AGUA MIN C/ GAS 500 ML PL PCT 12',
    'AGUA MIN 500 ML PL PCT 12 SL ECO', 'AGUA MIN 1500 ML PL PCT 6', 'AGUA MIN C/ GAS 315 ML PL PCT 12',
    'AGUA MIN NATURAGUA 5LT TIFFANY', 'AGUA MIN. ATHLETIC 700 ML', 'AGUA MINERAL NATURAGUA 500ML C/GAS',
    'AGUA MINERAL S/GAS GRF PET 6X1,5L INDAIA', 'AGUA MINERAL INDAIA 5L', 'AGUA NATURAGUA 1L C/ GAS',
    'NATURAGUA ATHLETIC 700 ML', 'AGUA MINERAL CRYSTAL C/GAS 500ML', 'AGUA MINERAL CRYSTAL 1500ML',
    'AGUA MINERAL NATURAGUA 1500ML', 'AGUA MINERAL NATURAGUA GARRAFAO 5L', 'AGUA CRYSTAL C/GAS 500ML',
    'AGUA CRYSTAL S/GAS 500ML', 'SAGRADA 20LT', 'AGUA NATURAGUA S/GAS 500ML', 'AGUA MINERAL NATURAGUA S/GAS 1,5L',
    'NATURAGUA COM GAS 315ML', 'AGUA NATURAGUA 20LT', 'AGUA MINERAL INDAIA C/ GAS 500ML', 'AM CRYS BR PET 1,5LS/G LP-',
    'AGUA MINERAL NATURAGUA 500ML PL PCT12', 'AGUA MIN 1500 ML', 'AGUA MIN - GARRAFAO 5 LT', 'AGUA CRYSTAL 1,5L',
    'CRISTAL-AGUA MINERAL C/ GAS 500ML', 'AGUA MINERAL GARRAFAO NATURAGUA 5L', 'AGUA SANTA JOANA 500ML',
    'NATURAGUA 500ML', 'AGUA SANTA JOANA 1,5L', 'AGUA MINERAL INDAIA COM GAS 330ML', 'AGUA NIMERAL ACQUALITY COM GAS 330ML',
    'AGUA MINERAL INDAIA 20L', 'AGUA MINERAL CRISTAL S/GAS 2L', 'AGUA MIN. ATHLETIC 700 ML PL PCT 12',
    'AGUA MINERAL INDAIA 500ML COM GAS', 'AGUA MINERAL INDAIA C GAS 500ML', 'AGUA MINERAL C GAS GRF PET 1,5L INDAIA',
    'AGUA MINERAL NATURAGUA C GAS 500ML', 'AGUA MINERAL NATURAGUA ATHLETIC 500ML', 'AGUA SAB H2OH LIMAO 500ML',
    'AGUA MINERAL NATURAGUA ATHLETIC 700ML', 'AM CRYS BR PET 1,5L S/G', 'AGUA MINERAL NATURAGUA C GAS 1L',
    'AGUA MINERAL CRYSTAL 350ML S GAS', 'AGUA MINERAL LIMPIDA S/ GAS PET 500ML', 'AGUA MINERAL LIMPIDA S/GAS PET 1,5L',
    'AGUA MINERAL CRYSTAL 1,5L', 'AGUA MINERAL ACQUALITY PET 510ML', 'AGUA MINERAL SEM GAS 1,5 PUREZA VITAL',
    'AGUA MINERAL CRYSTAL C GAS 500ML', 'AGUA MINERAL SCHINCARIOL C GAS 500ML', 'AGUA MIN 500 ML ATHLETIC PL PCT 12',
    'AGUA MINERAL C/GAS GRF PET 6X1,5L INDAIA', 'AGUA MINERAL S/GAS GRF PET 1X5L INDAIA'
].map(item => item.trim().toUpperCase());

const cests2 = [
    'FRISCO UVA JONES 18G', 'FRISCO CAJA SACHE 10X18X18G', 'FRISCO MANGA JONES 3 SACHE 10X18X18G', 'COCA COLA 2 LT',
    'GATORADE MOR/MARACUJA 500ML', 'MONST ZERO SUGAR LT 473ML', 'ENERGETICO NIGHT POWER 269ML', 'REFRI SPRITE PET 250ML',
    'REFRI FANTA UVA PET 250ML', 'BEBIDA LACTEA NESQUIK 180ML', 'REFRI SPRITE LT 350ML', 'MENTOS MONOPECA 120GR PURE FRESH 60X2GR',
    'AGUA DE COCO KEROCOCO 330ML', 'GATORADE LARANJA 500ML', 'BALY 2 LITROS MELANCIA PET.', 'BALY 2 LITROS TRADICIONAL',
    'AGUA DE COCO ACQUA COCO 290ML', 'CREME DE LEITE MIST DAMARE 200G C27', 'REFRIG. GUARANA ANTARCTICA 200ML',
    'REFRIG. FANTA 350ML UVA', 'ENERG. TNT FOCUS PINK 473ML', 'ENERG. TNT 269ML', 'ENERG. MONST 473ML LATA',
    'ENERG. RED BULL 250ML', 'AGUA DE COCO KERO COCO 330ML', 'REFRIG. SUKITA LARANJA LATA 350ML', 'CHA LEAO 10G CAMO/CID/MARAC.',
    'CERVEJA CORONITA 210ML', 'ENERG RED BULL 473ML LT', 'ENERG TNT ORIGINAL LT 473ML', 'CERVEJA BOHEMIA LATA 350ML',
    'GELEIA MOC. ITAGUARY 200G MORANGO', 'FANTA CAJU LT 350ML', 'REFRIGERANTE SÃO GERARDO SABOR CAJU 1L', 'R TANG MANGA 18G',
    'ADOCANTE SADIO SACARINA LIQ', 'FRISCO MANGA JONES 3 SACHE 18G', 'FRISCO CAJA SACHE 18G', 'GELATINA SOL UVA 20G',
    'GELATINA SOL MORANGO 20G', 'BEBIDA LACTEA UHT NATVILLE CHOCOLATE 200ML', 'MENTOS 3L PURE FRESH MINT 8,5GR',
    'REFRIGERANTE SÃO GERARDO SABOR CAJU 1L', 'CERVEJA LOKAL PILSEN LATA 350ML CX12', 'CERVEJA BUDWEISER GF 6X330ML',
    'CERVEJA PETRA PURO MALTE LT 350ML', 'CERVEJA BUDWEISER 330ML', 'AMC BR PET 1,5L S/G', 'STELLA ARTOIS LONG NECK 330ML',
    'MENTOS GF 288GR VITAMINADO 6X48GR', 'TRIDENT 8G HORTELA', 'SPRITE 2 L', 'SPRITE LT 350 ML', 'MONST MELAN LT 473 ML',
    'WHISKA RED LABEL 1L', '0001202701 - MONST ZERO SUGAR LT 473ML CX6', 'ENERGETICO MONSTER 473ML', 'ADOCANTE LINEA 75 ML',
    'ENERGETICO NIGHT POWER 2L', 'FRISCO 18G GUARANA', 'FRISCO ABACAXI JONES 18G', 'SUCO DEL VALLE MAIS TP 1LT PESSEGO',
    'R TANG UVA 18G', 'REFRESCO SABOR UVA 15X30G MARATA', 'REFRESCO SABOR MARACUJA 15X30G MARATA', 'REFRESCO SABOR CAJA 15X30G MARATA',
    'ISOTONICO IRONAGE LARANJA 500ML', 'SUCO DEL VALLE 100% SUCO DE UVA 1L', 'BALY TROPICAL 2 LITROS PET.',
    'SUCO DEL VALLE 100% SUCO DE UVA 1L', 'ENERGETICO TNT 269ML', 'SUSTAIN JR CHOCO SHC 500G', '- MONST PACIF PUNCH LT 473ML',
    'AGUA ISOT POWRADE MOUNTAIN BLAST 500ML', 'AMC PET 1,5L C G', 'AGUA MINERAL ACQUALITY C GAS PET 510ML', 'SPRITE LEMON FRESH 510ML',
    'MONST MANGO LT 473ML'
].map(item => item.trim().toUpperCase());

function processSpedFiscal(file, resultsList, progressBar, progressPercentage, totalFiles, incrementProcessedFiles) {
    return new Promise((resolve) => {
        console.log(`Iniciando processamento de ${file.name}`); // Log para processamento
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const lines = e.target.result.split('\n');
                const hasEmptyLastLine = lines[lines.length - 1] === '';
                const totalLines = lines.length;
                const produtos = {};
                const newLines = [];
                let processedLines = 0;

                for (const rawLine of lines) {
                    if (rawLine === '') {
                        newLines.push(rawLine);
                        processedLines++;
                        continue;
                    }
                    const fields = rawLine.split('|');
                    const tag = fields[1] || '';

                    if (tag === '0150') {
                        if (fields.length > 4 && fields[4] !== '1058') fields[4] = '1058';
                        if (fields.length > 9 && ['0', '1'].includes(fields[9])) fields[9] = '';
                        if (fields.length > 11 && ['0', '1'].includes(fields[11])) fields[11] = '';
                    } else if (tag === '0190') {
                        if (fields.length > 3 && !fields[3]) {
                            fields[3] = fields[2] === 'KG' ? 'QUILO' : 'UNIDADE';
                        }
                    } else if (tag === '0200') {
                        if (fields.length > 6) produtos[fields[2]] = fields[6];
                        if (fields.length > 7 && !fields[7]) fields[7] = '00';
                        if (fields.length > 13) {
                            const normalizedProduct = fields[3].trim().toUpperCase();
                            if (cests1.includes(normalizedProduct)) {
                                fields[13] = '0300300';
                            } else if (cests2.includes(normalizedProduct)) {
                                fields[13] = '0299900';
                            }
                        }
                    } else if (tag === 'C170') {
                        if (fields.length > 6) {
                            const novaUn = produtos[fields[3]];
                            if (novaUn && fields[6] !== novaUn) fields[6] = novaUn;
                        }
                        if (fields.length > 37 && !fields[37]) fields[37] = '1011501010001';
                    } else if (tag === 'C100') {
                        if (fields.length > 7 && !fields[7]) fields[7] = '1';
                        if (fields.length > 2 && fields[2] === '1') {
                            fields[2] = fields[3] === '1' ? '0' : '1';
                        }
                    } else if (tag === 'C191') {
                        if (fields.length > 4) {
                            fields[2] = '0';
                            fields[3] = '0';
                            fields[4] = '0';
                        }
                    }

                    newLines.push(fields.join('|'));

                    processedLines++;
                    const progress = ((incrementProcessedFiles() / totalFiles) + (processedLines / totalLines)) / totalFiles * 100;
                    progressBar.style.width = `${progress}%`;
                    progressPercentage.textContent = `${Math.round(progress)}%`;
                }

                if (!hasEmptyLastLine) newLines.push('');

                const blob = new Blob([newLines.join('\n')], { type: 'text/plain;charset=latin1' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `corrigido_${file.name}`;
                a.click();
                URL.revokeObjectURL(url);

                const li = document.createElement('li');
                li.textContent = `[OK] ${file.name} corrigido e baixado`;
                resultsList.appendChild(li);
                console.log(`Processamento de ${file.name} concluído`); // Log para conclusão
                resolve();
            } catch (error) {
                console.warn(`Erro ao processar ${file.name}: ${error.message}`);
                const li = document.createElement('li');
                li.textContent = `[ERRO] ${file.name}: ${error.message}`;
                resultsList.appendChild(li);
                resolve();
            }
        };
        reader.onerror = () => {
            console.warn(`Erro ao ler ${file.name}`);
            const li = document.createElement('li');
            li.textContent = `[ERRO] ${file.name}: Erro de leitura`;
            resultsList.appendChild(li);
            resolve();
        };
        reader.readAsText(file, 'latin1');
    });
}

function processSpedContribuicao(file, resultsList, progressBar, progressPercentage, totalFiles, incrementProcessedFiles) {
    return new Promise((resolve) => {
        console.log(`Iniciando processamento de ${file.name}`); // Log para processamento
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const lines = e.target.result.split('\n');
                const hasEmptyLastLine = lines[lines.length - 1] === '';
                const totalLines = lines.length;
                const produtos = {};
                const newLines = [];
                let processedLines = 0;

                for (const rawLine of lines) {
                    if (rawLine === '') {
                        newLines.push(rawLine);
                        processedLines++;
                        continue;
                    }
                    const fields = rawLine.split('|');
                    const tag = fields[1] || '';

                    if (tag === '0150') {
                        if (fields.length > 4 && fields[4] !== '1058') fields[4] = '1058';
                        if (fields.length > 9 && ['0', '1'].includes(fields[9])) fields[9] = '';
                        if (fields.length > 11 && ['0', '1'].includes(fields[11])) fields[11] = '';
                    } else if (tag === '0190') {
                        if (fields.length > 3 && !fields[3]) {
                            fields[3] = fields[2] === 'KG' ? 'QUILO' : 'UNIDADE';
                        }
                    } else if (tag === '0200') {
                        if (fields.length > 6) produtos[fields[2]] = fields[6];
                        if (fields.length > 7 && !fields[7]) fields[7] = '00';
                        if (fields.length > 13) {
                            const normalizedProduct = fields[3].trim().toUpperCase();
                            if (cests1.includes(normalizedProduct)) {
                                fields[13] = '0300300';
                            } else if (cests2.includes(normalizedProduct)) {
                                fields[13] = '0299900';
                            }
                        }
                    } else if (tag === 'C870') {
                        if (fields.length > 14 && !fields[14]) fields[14] = '1011501010001';
                    } else if (tag === 'C191') {
                        if (fields.length > 4) {
                            fields[2] = '0';
                            fields[3] = '0';
                            fields[4] = '0';
                        }
                    }

                    newLines.push(fields.join('|'));

                    processedLines++;
                    const progress = ((incrementProcessedFiles() / totalFiles) + (processedLines / totalLines)) / totalFiles * 100;
                    progressBar.style.width = `${progress}%`;
                    progressPercentage.textContent = `${Math.round(progress)}%`;
                }

                if (!hasEmptyLastLine) newLines.push('');

                const blob = new Blob([newLines.join('\n')], { type: 'text/plain;charset=latin1' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `corrigido_${file.name}`;
                a.click();
                URL.revokeObjectURL(url);

                const li = document.createElement('li');
                li.textContent = `[OK] ${file.name} corrigido e baixado`;
                resultsList.appendChild(li);
                console.log(`Processamento de ${file.name} concluído`); // Log para conclusão
                resolve();
            } catch (error) {
                console.warn(`Erro ao processar ${file.name}: ${error.message}`);
                const li = document.createElement('li');
                li.textContent = `[ERRO] ${file.name}: ${error.message}`;
                resultsList.appendChild(li);
                resolve();
            }
        };
        reader.onerror = () => {
            console.warn(`Erro ao ler ${file.name}`);
            const li = document.createElement('li');
            li.textContent = `[ERRO] ${file.name}: Erro de leitura`;
            resultsList.appendChild(li);
            resolve();
        };
        reader.readAsText(file, 'latin1');
    });
}

//------------------------------------------- FIM SPED ------------------------------------------//
//------------------------------------ NFe | CFe Comparasion ------------------------------------//

let sigetData = [];
let fortesData = [];

function createNfeCfeComparisonPage(mainContent) {
    console.log('createNfeCfeComparisonPage chamado');
    mainContent.innerHTML = `
        <h1>NFe | CFe Comparison</h1>
        <div class="nfe-cfe-grid" style="display: flex; flex-direction: column; gap: 1.6rem; max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <div class="box animate-section" style="animation-delay: 0s; width: 100%; max-width: 800px; height: 300px; margin: 0 auto; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding); position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center;" id="siget-box">
                <span class="box-label" id="siget-label">Siget</span>
                <svg id="siget-check" width="60" height="60" viewBox="0 0 24 24" fill="none" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <path d="M20 6L9 17L4 12" stroke="#00ff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="30" stroke-dashoffset="30"/>
                </svg>
                <input type="file" id="siget-file-input" accept=".txt,.csv,.xls,.xlsx,.xml" multiple style="display: none;">
            </div>
            <div class="box animate-section" style="animation-delay: 0.1s; width: 100%; max-width: 800px; height: 300px; margin: 0 auto; background-color: var(--color-white); border-radius: var(--card-border-radius); box-shadow: var(--box-shadow); padding: var(--card-padding); position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center;" id="fortes-box">
                <span class="box-label" id="fortes-label">Fortes</span>
                <svg id="fortes-check" width="60" height="60" viewBox="0 0 24 24" fill="none" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <path d="M20 6L9 17L4 12" stroke="#00ff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="30" stroke-dashoffset="30"/>
                </svg>
                <input type="file" id="fortes-file-input" accept=".txt,.csv,.xls,.xlsx,.xml" multiple style="display: none;">
            </div>
        </div>
    `;

    const sigetBox = document.getElementById('siget-box');
    const sigetFileInput = document.getElementById('siget-file-input');
    const sigetLabel = document.getElementById('siget-label');
    const sigetCheck = document.getElementById('siget-check');
    const fortesBox = document.getElementById('fortes-box');
    const fortesFileInput = document.getElementById('fortes-file-input');
    const fortesLabel = document.getElementById('fortes-label');
    const fortesCheck = document.getElementById('fortes-check');

    let sigetLoaded = false;
    let fortesLoaded = false;

    const checkBothLoaded = () => {
        if (sigetLoaded && fortesLoaded) {
            console.log('Ambos os boxes processados. Aguardando 3 segundos para abrir modal...');
            setTimeout(() => {
                showComparisonModal();
            }, 3000);
        }
    };

    // Configurar SIGET
    sigetBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        sigetBox.classList.add('dragover');
        console.log('Dragover em SIGET');
    });

    sigetBox.addEventListener('dragleave', () => {
        sigetBox.classList.remove('dragover');
        console.log('Dragleave em SIGET');
    });

    sigetBox.addEventListener('drop', (e) => {
        e.preventDefault();
        sigetBox.classList.remove('dragover');
        console.log('Drop em SIGET');
        const files = e.dataTransfer.files;
        processFiles(files, sigetLabel, sigetCheck, sigetData, () => {
            sigetLoaded = true;
            checkBothLoaded();
        });
    });

    sigetBox.addEventListener('click', () => {
        console.log('Clique em SIGET box');
        sigetFileInput.click();
    });

    sigetFileInput.addEventListener('change', () => {
        console.log('Arquivos selecionados via input em SIGET');
        processFiles(sigetFileInput.files, sigetLabel, sigetCheck, sigetData, () => {
            sigetLoaded = true;
            checkBothLoaded();
        });
    });

    // Configurar FORTES
    fortesBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        fortesBox.classList.add('dragover');
        console.log('Dragover em FORTES');
    });

    fortesBox.addEventListener('dragleave', () => {
        fortesBox.classList.remove('dragover');
        console.log('Dragleave em FORTES');
    });

    fortesBox.addEventListener('drop', (e) => {
        e.preventDefault();
        fortesBox.classList.remove('dragover');
        console.log('Drop em FORTES');
        const files = e.dataTransfer.files;
        processFiles(files, fortesLabel, fortesCheck, fortesData, () => {
            fortesLoaded = true;
            checkBothLoaded();
        });
    });

    fortesBox.addEventListener('click', () => {
        console.log('Clique em FORTES box');
        fortesFileInput.click();
    });

    fortesFileInput.addEventListener('change', () => {
        console.log('Arquivos selecionados via input em FORTES');
        processFiles(fortesFileInput.files, fortesLabel, fortesCheck, fortesData, () => {
            fortesLoaded = true;
            checkBothLoaded();
        });
    });

    function cleanKey(rawKey) {
        if (typeof rawKey !== 'string') {
            rawKey = String(rawKey);
        }
        const cleanedKey = rawKey.replace(/[^0-9]/g, '');
        if (rawKey !== cleanedKey) {
            console.log(`Chave com caracteres especiais: ${rawKey}, Chave limpa: ${cleanedKey}`);
        }
        return cleanedKey;
    }

    function formatXMLValue(value) {
        if (!value) return null;
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) return null;
        const formattedValue = parsedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        console.log(`Valor XML formatado: ${value} -> ${formattedValue}`);
        return formattedValue;
    }

    function formatSpreadsheetOrTextValue(value) {
        if (!value) {
            console.warn(`Valor nulo ou indefinido recebido`);
            return null;
        }
        const stringValue = String(value).trim().replace(/^R\$\s*/, ''); // Remove "R$" e espaços iniciais
        if (!stringValue) {
            console.warn(`Valor vazio após trim: ${stringValue}`);
            return null;
        }

        const ptBRRegex = /^(\d{1,3}(\.\d{3})*,\d{2})$/;
        if (ptBRRegex.test(stringValue)) {
            console.log(`Valor já em formato pt-BR: ${stringValue}`);
            return stringValue;
        }

        const cleanedValue = stringValue.replace(',', '.');
        const parsedValue = parseFloat(cleanedValue);
        if (isNaN(parsedValue)) {
            console.warn(`Valor inválido (não numérico): ${stringValue}`);
            return null;
        }

        const formattedValue = parsedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        console.log(`Valor formatado: ${stringValue} -> ${formattedValue}`);
        return formattedValue;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    }

    function processTextFile(file, dataArray) {
        return new Promise((resolve) => {
            console.log(`Iniciando leitura do arquivo de texto: ${file.name}`);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    console.log(`Arquivo de texto lido: ${file.name}`);
                    const lines = e.target.result.split('\n').filter(line => line.trim() !== '');
                    console.log(`Total de linhas no arquivo: ${lines.length}`);

                    lines.forEach((line, index) => {
                        const trimmedLine = line.trim();
                        console.log(`Processando linha ${index + 1}: ${trimmedLine}`);
                        // Separar por espaços ou tabulações (múltiplos espaços ou tabs)
                        const parts = trimmedLine.split(/\s+/).filter(part => part.trim() !== '');

                        let key = '', value = '', numeroNf = '', dhEmi = '', cnpj = '', type = 'NFe';

                        parts.forEach((part, partIndex) => {
                            if (!part) return;

                            // Detectar Chave (44 dígitos)
                            const cleanedKey = cleanKey(part);
                            if (/^\d{44}$/.test(cleanedKey)) {
                                key = cleanedKey;
                                type = cleanedKey.startsWith('CFe') ? 'CFe' : 'NFe';
                                console.log(`Chave detectada: ${key}, Tipo: ${type}, Posição: ${partIndex}`);
                                return;
                            }

                            // Detectar CNPJ (14 dígitos após limpeza)
                            const cleanedCnpj = cleanKey(part);
                            if (/^\d{14}$/.test(cleanedCnpj)) {
                                cnpj = cleanedCnpj;
                                console.log(`CNPJ detectado: ${cnpj}, Posição: ${partIndex}`);
                                return;
                            }

                            // Detectar Data de Emissão (DD/MM/YYYY)
                            const dateMatch = part.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                            if (dateMatch) {
                                dhEmi = formatDate(part);
                                console.log(`Data de Emissão detectada: ${dhEmi}, Posição: ${partIndex}`);
                                return;
                            }

                            // Detectar Nº NF-e (número inteiro)
                            const numeroNfMatch = part.match(/^\d+$/);
                            if (numeroNfMatch && !isNaN(parseInt(part))) {
                                numeroNf = part;
                                console.log(`Nº NF-e detectado: ${numeroNf}, Posição: ${partIndex}`);
                                return;
                            }

                            // Detectar Valor (com ou sem "R$")
                            const formattedValue = formatSpreadsheetOrTextValue(part);
                            if (formattedValue) {
                                value = formattedValue;
                                console.log(`Valor detectado: ${value}, Posição: ${partIndex}`);
                            }
                        });

                        if (key) {
                            dataArray.push({ key, numeroNf, dhEmi, cnpj, value, type });
                            console.log(`Linha válida - Chave: ${key}, Valor: ${value || 'Ausente'}, Nº NF-e: ${numeroNf}, Data: ${dhEmi}, CNPJ: ${cnpj}, Tipo: ${type}, Linha: ${index + 1}, Total de itens: ${dataArray.length}`);
                        } else {
                            console.warn(`Linha inválida no arquivo ${file.name}: ${trimmedLine}`);
                            if (!key) console.warn(`Chave não encontrada na linha ${index + 1}`);
                        }
                    });
                } catch (error) {
                    console.warn(`Erro ao processar arquivo de texto ${file.name}: ${error.message}`);
                }
                resolve();
            };
            reader.onerror = () => {
                console.warn(`Erro ao ler arquivo de texto: ${file.name}`);
                resolve();
            };
            reader.readAsText(file);
        });
    }

    function processFile(file, dataArray) {
        return new Promise((resolve) => {
            console.log(`Iniciando leitura do arquivo XML: ${file.name}`);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    console.log(`Arquivo XML lido: ${file.name}`);
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(e.target.result, "application/xml");
                    const errorNode = xml.querySelector("parsererror");
                    if (errorNode) {
                        console.warn(`Erro ao parsear XML: ${file.name}`);
                        resolve();
                        return;
                    }

                    let key, numeroNf, dhEmi, cnpj, value, type;
                    const nfeNamespace = "http://www.portalfiscal.inf.br/nfe";

                    let elem = xml.querySelector('nfeProc > protNFe > infProt > chNFe');
                    let valueElem = xml.querySelector('nfeProc > NFe > infNFe > total > ICMSTot > vNF');
                    let ide = xml.querySelector('nfeProc > NFe > infNFe > ide');
                    let emit = xml.querySelector('nfeProc > NFe > infNFe > emit');
                    if (elem && elem.textContent && valueElem && valueElem.textContent && ide && emit) {
                        key = elem.textContent.trim();
                        numeroNf = ide.getElementsByTagNameNS(nfeNamespace, 'cNF')[0]?.textContent.trim() || '';
                        dhEmi = ide.getElementsByTagNameNS(nfeNamespace, 'dhEmi')[0]?.textContent.trim().slice(0, 10) || '';
                        cnpj = emit.getElementsByTagNameNS(nfeNamespace, 'CNPJ')[0]?.textContent.trim() || '';
                        value = valueElem.textContent.trim();
                        type = 'NFe';
                        console.log(`NFe detectada - Chave: ${key}, Nº NFe: ${numeroNf}, Data: ${dhEmi}, CNPJ: ${cnpj}, Valor: ${value}`);
                    } else {
                        let infCFe = xml.querySelector('CFe > infCFe');
                        let valueCFe = xml.querySelector('CFe > infCFe > total > vCFe');
                        if (infCFe && infCFe.getAttribute('Id') && valueCFe && valueCFe.textContent) {
                            key = infCFe.getAttribute('Id').replace(/^CFe/, '').trim();
                            numeroNf = '';
                            dhEmi = '';
                            cnpj = '';
                            value = valueCFe.textContent.trim();
                            type = 'CFe';
                            console.log(`CFe detectada - Chave: ${key}, Valor: ${value}`);
                        }
                    }

                    const cleanedKey = cleanKey(key);
                    const formattedValue = formatXMLValue(value);
                    if (cleanedKey && /^\d{44}$/.test(cleanedKey)) {
                        dataArray.push({ key: cleanedKey, numeroNf, dhEmi, cnpj, value: formattedValue, type });
                        console.log(`Adicionado ao array - Chave: ${cleanedKey}, Valor: ${formattedValue || 'Ausente'}, Tipo: ${type}, Total de itens: ${dataArray.length}`);
                    } else {
                        console.warn(`Chave ou valor inválido no arquivo: ${file.name}`);
                    }
                } catch (error) {
                    console.warn(`Erro ao processar XML ${file.name}: ${error.message}`);
                }
                resolve();
            };
            reader.onerror = () => {
                console.warn(`Erro ao ler arquivo XML: ${file.name}`);
                resolve();
            };
            reader.readAsText(file);
        });
    }

    function processSpreadsheet(file, dataArray) {
        return new Promise((resolve) => {
            console.log(`Iniciando leitura da planilha: ${file.name}`);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    console.log(`Planilha lida: ${file.name}`);
                    const workbook = XLSX.read(e.target.result, { type: 'array' });
                    let valueColumn = null;
                    let cnpjColumn = null;
                    let numeroNfColumn = null;
                    let dateColumn = null;
    
                    const findColumn = (sheet, pattern) => {
                        const range = XLSX.utils.decode_range(sheet['!ref']);
                        for (let row = range.s.r; row <= range.e.r; row++) {
                            for (let col = range.s.c; col <= range.e.c; col++) {
                                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                                const cell = sheet[cellAddress];
                                if (cell && typeof cell.v === 'string') {
                                    if (pattern.test(cell.v.toLowerCase())) {
                                        console.log(`Coluna encontrada para ${pattern.source}: ${cellAddress} (coluna ${col})`);
                                        return col;
                                    }
                                }
                            }
                        }
                        console.log(`Coluna para ${pattern.source} não encontrada em ${file.name}.`);
                        return -1;
                    };
    
                    workbook.SheetNames.forEach(sheetName => {
                        console.log(`Processando aba: ${sheetName}`);
                        const sheet = workbook.Sheets[sheetName];
                        if (!sheet['!ref']) {
                            console.warn(`Aba ${sheetName} vazia ou inválida.`);
                            return;
                        }
    
                        const range = XLSX.utils.decode_range(sheet['!ref']);
                        if (valueColumn === null) valueColumn = findColumn(sheet, /valor|vlr|vltotal/i);
                        if (cnpjColumn === null) cnpjColumn = findColumn(sheet, /cnpj/i);
                        if (numeroNfColumn === null) numeroNfColumn = findColumn(sheet, /nº nf-e|numero nf-e|num|nfe/i);
                        if (dateColumn === null) dateColumn = findColumn(sheet, /data|emissão|dt/i);
    
                        // Fallback dinâmico: usar últimas colunas se não encontradas
                        if (valueColumn === -1) valueColumn = range.e.c;
                        if (cnpjColumn === -1) cnpjColumn = range.e.c - 1;
                        if (numeroNfColumn === -1) numeroNfColumn = range.e.c - 2;
                        if (dateColumn === -1) dateColumn = range.e.c - 3;
    
                        console.log(`Índices detectados - Chave: (dinâmica), Valor: ${valueColumn}, CNPJ: ${cnpjColumn}, Nº NF-e: ${numeroNfColumn}, Data: ${dateColumn}`);
    
                        for (let row = range.s.r + 1; row <= range.e.r; row++) {
                            let keyFound = false;
                            for (let col = range.s.c; col <= range.e.c; col++) {
                                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                                const cell = sheet[cellAddress];
                                if (cell) {
                                    const rawKey = String(cell.v).trim();
                                    const cleanedKey = cleanKey(rawKey);
                                    if (/^\d{44}$/.test(cleanedKey)) {
                                        console.log(`Chave encontrada: ${cleanedKey}, Linha: ${row + 1}, Coluna: ${col}`);
                                        keyFound = true;
    
                                        const valueCellAddress = XLSX.utils.encode_cell({ r: row, c: valueColumn });
                                        const valueCell = sheet[valueCellAddress];
                                        let value = valueCell ? String(valueCell.w || valueCell.v).trim() : null;
                                        const formattedValue = formatSpreadsheetOrTextValue(value) || '0,00'; // Aceitar valores ausentes
    
                                        const cnpjCellAddress = XLSX.utils.encode_cell({ r: row, c: cnpjColumn });
                                        const cnpjCell = sheet[cnpjCellAddress];
                                        let cnpj = cnpjCell ? cleanKey(String(cnpjCell.w || cnpjCell.v).trim()) : '';
    
                                        const numeroNfCellAddress = XLSX.utils.encode_cell({ r: row, c: numeroNfColumn });
                                        const numeroNfCell = sheet[numeroNfCellAddress];
                                        let numeroNf = numeroNfCell ? String(numeroNfCell.w || numeroNfCell.v).trim() : '';
    
                                        const dateCellAddress = XLSX.utils.encode_cell({ r: row, c: dateColumn });
                                        const dateCell = sheet[dateCellAddress];
                                        let dhEmi = dateCell ? formatDate(String(dateCell.w || dateCell.v).trim()) : '';
    
                                        const type = cleanedKey.startsWith('CFe') ? 'CFe' : 'NFe';
                                        dataArray.push({ key: cleanedKey, numeroNf, dhEmi, cnpj, value: formattedValue, type });
                                        console.log(`Chave válida - Chave: ${cleanedKey}, Valor: ${formattedValue}, Nº NF-e: ${numeroNf}, Data: ${dhEmi}, CNPJ: ${cnpj}, Tipo: ${type}, Linha: ${row + 1}, Total de itens: ${dataArray.length}`);
                                    } else if (!keyFound) {
                                        console.log(`Célula ignorada (não é chave de 44 dígitos): ${rawKey}, Linha: ${row + 1}, Coluna: ${col}`);
                                    }
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.warn(`Erro ao processar planilha ${file.name}: ${error.message}`);
                }
                resolve();
            };
            reader.onerror = () => {
                console.warn(`Erro ao ler planilha: ${file.name}`);
                resolve();
            };
            reader.readAsArrayBuffer(file);
        });
    }

    function processFiles(files, label, checkSvg, dataArray, callback) {
        if (!files || files.length === 0) {
            console.warn('Nenhum arquivo selecionado');
            return;
        }
        const promises = [];
        for (const file of files) {
            if (file.name.endsWith('.xml') || file.type === 'text/xml') {
                console.log(`Processando arquivo XML: ${file.name}`);
                promises.push(processFile(file, dataArray));
            } else if (file.name.endsWith('.txt') || file.type === 'text/plain') {
                console.log(`Processando arquivo de texto: ${file.name}`);
                promises.push(processTextFile(file, dataArray));
            } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || 
                       file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                       file.type === 'application/vnd.ms-excel') {
                console.log(`Processando planilha: ${file.name}`);
                promises.push(processSpreadsheet(file, dataArray));
            } else {
                console.warn(`Arquivo ignorado (não é XML, TXT ou planilha): ${file.name}`);
            }
        }
        Promise.all(promises).then(() => {
            console.log(`Processamento concluído. Dados:`, dataArray);
            animateLabelToCheck(label, checkSvg);
            callback();
        });
    }

    function animateLabelToCheck(label, checkSvg) {
        console.log('Iniciando animação do check. Estado inicial do SVG:', checkSvg.style.display);
        label.style.opacity = '0';
        label.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            label.style.display = 'none';
            const path = checkSvg.querySelector('path');
            path.setAttribute('stroke-dasharray', '30'); // Garantir que o dasharray esteja definido
            path.setAttribute('stroke-dashoffset', '-30'); // Estado inicial para animação
            checkSvg.style.display = 'block';
            checkSvg.style.opacity = '1';
            checkSvg.style.visibility = 'visible';
            checkSvg.style.zIndex = '10';
            checkSvg.style.position = 'absolute';
            checkSvg.style.top = '50%';
            checkSvg.style.left = '50%';
            checkSvg.style.transform = 'translate(-50%, -50%)';
            console.log('SVG configurado para exibição:', {
                display: checkSvg.style.display,
                opacity: checkSvg.style.opacity,
                visibility: checkSvg.style.visibility,
                zIndex: checkSvg.style.zIndex,
                top: checkSvg.style.top,
                left: checkSvg.style.left,
                transform: checkSvg.style.transform,
                strokeDasharray: path.getAttribute('stroke-dasharray'),
                strokeDashoffset: path.getAttribute('stroke-dashoffset')
            });
            setTimeout(() => {
                path.style.transition = 'stroke-dashoffset 0.5s ease-in-out'; // Adicionar transição CSS
                path.setAttribute('stroke-dashoffset', '0'); // Iniciar animação
                console.log('Animação de check escrita iniciada via CSS transition');
            }, 50); // Pequeno atraso para garantir renderização
        }, 300);
    }

    function formatValue(value) {
        if (!value) return '0,00';
        const cleaned = value.replace(/[^\d,.]/g, '').replace(/\.(?=\d{3})/g, '');
        const parsed = parseFloat(cleaned.replace(',', '.'));
        return isNaN(parsed) ? '0,00' : parsed.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function showComparisonModal() {
        console.log('Exibindo modal de comparação');
        const modal = document.createElement('div');
        modal.classList.add('modal-overlay');
        modal.innerHTML = `
            <div class="modal-content">
                <div class="tabs">
                    <div class="tab active" data-tab="quantidades">Quantidade de NFe | CFe</div>
                    <div class="tab" data-tab="valores">Valores de NFe | CFe</div>
                </div>
                <div id="quantidades-tab" class="tab-content">
                    <div class="column">
                        <h4 class="siget-title">Siget</h4>
                        <ul id="siget-only-list"></ul>
                    </div>
                    <div class="column">
                        <h4 class="fortes-title">Fortes</h4>
                        <ul id="fortes-only-list"></ul>
                    </div>
                </div>
                <div id="valores-tab" class="tab-content" style="display: none;">
                    <p>Aguardando comparação...</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const tabs = modal.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                showTab(tab.getAttribute('data-tab'), tab);
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('Fechando modal ao clicar fora');
                document.body.removeChild(modal);
                sigetData = [];
                fortesData = [];
                sigetLoaded = false;
                fortesLoaded = false;
                const mainContent = document.querySelector('#main-content');
                mainContent.innerHTML = '';
                createNfeCfeComparisonPage(mainContent);
            }
        });
        compareLists();
    }

    function showTab(tabId, element) {
        console.log(`Exibindo aba: ${tabId}`);
        document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
        const targetTab = document.getElementById(tabId + '-tab');
        targetTab.style.display = 'block';
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        element.classList.add('active');
        if (tabId === 'quantidades') {
            console.log('Reaplicando layout da aba Quantidade');
            targetTab.style.display = 'flex';
            targetTab.style.gap = '2rem';
            console.log('HTML de #quantidades-tab após troca:', targetTab.innerHTML);
            compareLists(); // Re-renderiza para garantir conteúdo atualizado
        }
    }

    function compareLists() {
        console.log('Comparando listas...');
        const sigetKeys = sigetData.map(item => item.key);
        const fortesKeys = fortesData.map(item => item.key);
    
        const sigetSet = new Set(sigetKeys);
        const fortesSet = new Set(fortesKeys);
    
        const sigetOnly = sigetData.filter(item => !fortesSet.has(item.key));
        const fortesOnly = fortesData.filter(item => !sigetSet.has(item.key));
    
        const quantidadesTab = document.getElementById('quantidades-tab');
        const sigetList = quantidadesTab.querySelector('#siget-only-list');
        const fortesList = quantidadesTab.querySelector('#fortes-only-list');
    
        // Garantir que a estrutura de colunas existe
        if (!quantidadesTab.querySelector('.column')) {
            console.warn('Estrutura de colunas ausente em #quantidades-tab. Recriando...');
            quantidadesTab.innerHTML = `
                <div class="column">
                    <h4 class="siget-title">Siget</h4>
                    <ul id="siget-only-list"></ul>
                </div>
                <div class="column">
                    <h4 class="fortes-title">Fortes</h4>
                    <ul id="fortes-only-list"></ul>
                </div>
            `;
        }
    
        sigetList.innerHTML = sigetOnly.length
            ? sigetOnly.map(item => `<li>Chave ${item.type}: ${item.key}${item.value ? ` - R$ ${item.value}` : ''}</li>`).join('')
            : '<li>Nenhuma chave exclusiva</li>';
        fortesList.innerHTML = fortesOnly.length
            ? fortesOnly.map(item => `<li>Chave ${item.type}: ${item.key}${item.value ? ` - R$ ${item.value}` : ''}</li>`).join('')
            : '<li>Nenhuma chave exclusiva</li>';
    
        console.log('HTML de #quantidades-tab após atualização:', quantidadesTab.innerHTML);
    
        const commonKeys = sigetKeys.filter(key => fortesSet.has(key));
        const fortesHasNoValues = fortesData.every(item => !item.value || item.value === '0,00');
        const valoresTab = document.getElementById('valores-tab');
    
        if (commonKeys.length === 0 || fortesHasNoValues) {
            valoresTab.innerHTML = `<p class="error-message">Informações de Valores Ausentes</p>`;
            console.log('Nenhuma chave comum ou valores ausentes em Fortes. Exibindo mensagem de erro.');
        } else {
            const divergentValues = commonKeys.map(key => {
                const sigetItem = sigetData.find(item => item.key === key);
                const fortesItem = fortesData.find(item => item.key === key);
                if (!sigetItem.value || !fortesItem.value) {
                    return { key, fortesValue: fortesItem.value || 'Ausente', sigetValue: sigetItem.value || 'Ausente', difference: 'Informações para comparação incompletas' };
                }
                const sigetValue = parseFloat(sigetItem.value.replace(/\./g, '').replace(',', '.'));
                const fortesValue = parseFloat(fortesItem.value.replace(/\./g, '').replace(',', '.'));
                const difference = sigetValue - fortesValue;
                return Math.abs(difference) > 0.01 ? { key, fortesValue, sigetValue, difference } : null;
            }).filter(item => item);
    
            if (divergentValues.length === 0) {
                valoresTab.innerHTML = `<p class="success-message">Todos os Valores nos Conformes</p>`;
                console.log('Todos os valores correspondem. Exibindo mensagem de conformidade.');
            } else {
                valoresTab.innerHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>Chave</th>
                                <th>Valor do Fortes</th>
                                <th>Valor do Siget</th>
                                <th>Diferença</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${divergentValues.map(item => `
                                <tr>
                                    <td>${item.key}</td>
                                    <td>${typeof item.fortesValue === 'number' ? 'R$ ' + item.fortesValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : item.fortesValue}</td>
                                    <td>${typeof item.sigetValue === 'number' ? 'R$ ' + item.sigetValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : item.sigetValue}</td>
                                    <td class="${typeof item.difference === 'number' ? (item.difference < 0 ? 'positivo' : 'dif') : 'dif'}">${typeof item.difference === 'number' ? 'R$ ' + item.difference.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 'Valores Ausentes para Comparação'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                console.log('Divergências encontradas. Tabela de valores renderizada.');
            }
        }
        console.log('Comparação concluída. Resultados renderizados.');
    }
}

//---------------------------------- FIM NFe | CFe Comparasion ----------------------------------//
//------------------------------------ Reminders ------------------------------------//

function showRemindersModal() {
    console.log('Exibindo modal de Reminders');
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');

    modal.innerHTML = `
        <div class="reminders-modal-content">
            <div class="calendar-content" id="calendar-content">
                ${generateCalendar()}
            </div>
            <div class="completed-goals" id="completed-goals"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Restaurar metas concluídas do localStorage
    const completedGoals = JSON.parse(localStorage.getItem('completedGoals') || '[]');
    const completedGoalsContainer = modal.querySelector('#completed-goals');
    completedGoals.forEach(goal => {
        const goalElement = document.createElement('div');
        goalElement.classList.add('completed-goal');
        goalElement.innerHTML = `
            <div class="content">
                <p>${goal.name}</p>
                <span class="completed-time">${goal.time}</span>
            </div>
        `;
        completedGoalsContainer.appendChild(goalElement);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            console.log('Fechando modal de Reminders ao clicar fora');
            document.body.removeChild(modal);
        }
    });
}

function generateCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const currentDay = today.getDate();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendarHTML = `
        <div class="calendar-header">
            <h3>${monthNames[month]} ${year}</h3>
        </div>
        <table class="calendar-table">
            <thead>
                <tr>
                    ${dayNames.map(day => `<th>${day}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
    `;

    let day = 1;
    let isFirstWeek = true;
    while (day <= daysInMonth) {
        calendarHTML += '<tr>';
        for (let i = 0; i < 7; i++) {
            const isNonWorkingDay = i === 0 || i === 6;
            const nonWorkingClass = isNonWorkingDay ? 'non-working-day' : '';
            if (isFirstWeek && i < firstDayOfMonth) {
                calendarHTML += '<td></td>';
            } else if (day <= daysInMonth) {
                const isToday = day === currentDay ? 'today' : '';
                calendarHTML += `<td class="${isToday} ${nonWorkingClass}">${day}</td>`;
                day++;
            } else {
                calendarHTML += '<td></td>';
            }
        }
        calendarHTML += '</tr>';
        isFirstWeek = false;
    }

    calendarHTML += `
            </tbody>
        </table>
    `;
    return calendarHTML;
}

function showGoalListModal() {
    console.log('Exibindo modal de lista de metas');
    const goalModal = document.createElement('div');
    goalModal.classList.add('goal-list-modal');
    const goals = [
        'Recolhimento de Relatórios - Siget',
        'ISS',
        'Recolhimento dos Arquivos de NF-e',
        'Download de CF-e',
        'Retenção de ICMS ST 1104',
        'Envio dos Impostos',
        'Ajuste de CFOP',
        'Ajuste de CST',
        'Comparação de Valores',
        'Transmissão de SPED Fiscal | Contribuições'
    ];

    goalModal.innerHTML = `
        <div class="goal-list-modal-content">
            <div class="goal-list-content">
                <h3>Selecione uma Meta</h3>
                <ul class="goal-list">
                    ${goals.map(goal => `<li>${goal}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    document.body.appendChild(goalModal);

    const goalItems = goalModal.querySelectorAll('.goal-list li');
    goalItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log(`Meta selecionada: ${item.textContent}`);
            addGoalNotification(item.textContent);
            document.body.removeChild(goalModal);
        });
    });

    goalModal.addEventListener('click', (e) => {
        if (e.target === goalModal) {
            console.log('Fechando modal de lista de metas ao clicar fora');
            document.body.removeChild(goalModal);
        }
    });
}

function addGoalNotification(goalName) {
    const remindersSection = document.querySelector('.dashboard-container .right-section .reminders');
    if (!remindersSection) {
        console.warn('Seção de reminders não encontrada');
        return;
    }

    const notificationId = `goal-${Date.now()}`;
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.setAttribute('data-id', notificationId);
    notification.innerHTML = `
        <div class="content">
            <div class="goal-info">
                <p>${goalName}</p>
                <small class="timer">00:00:00</small>
            </div>
            <input type="checkbox" class="goal-checkbox">
        </div>
    `;
    remindersSection.insertBefore(notification, remindersSection.querySelector('.add-reminder') || null);

    const checkbox = notification.querySelector('.goal-checkbox');
    startTimer(notificationId, notification.querySelector('.timer'), checkbox, goalName);
}

function startTimer(notificationId, timerElement, checkbox, goalName) {
    const storageKey = `timer-${notificationId}`;
    let elapsedTime = parseInt(localStorage.getItem(storageKey)) || 0;
    let isRunning = !checkbox.checked;

    function isWorkingHours() {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeInMinutes = hours * 60 + minutes;

        if (day >= 1 && day <= 4) {
            return timeInMinutes >= 8 * 60 && timeInMinutes < 18 * 60;
        } else if (day === 5) {
            return timeInMinutes >= 8 * 60 && timeInMinutes < 17 * 60;
        }
        return false;
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    }

    function updateTimer() {
        if (!isRunning || !isWorkingHours()) return;

        elapsedTime++;
        localStorage.setItem(storageKey, elapsedTime);
        timerElement.textContent = formatTime(elapsedTime);
    }

    checkbox.addEventListener('change', () => {
        isRunning = !checkbox.checked;
        if (!isRunning) {
            console.log(`Cronômetro pausado para meta ${notificationId}`);
            const notification = checkbox.closest('.notification');
            if (notification) {
                notification.remove();
                console.log(`Meta ${goalName} movida para o modal de calendário`);
                const completedGoals = JSON.parse(localStorage.getItem('completedGoals') || '[]');
                completedGoals.push({ name: goalName, time: formatTime(elapsedTime) });
                localStorage.setItem('completedGoals', JSON.stringify(completedGoals));
            }
        }
    });

    setInterval(updateTimer, 1000);
    updateTimer();
}

// Configurar eventos
document.addEventListener('DOMContentLoaded', () => {
    const remindersIcon = document.querySelector('.dashboard-container .right-section .reminders .header span');
    if (remindersIcon) {
        remindersIcon.addEventListener('click', () => {
            console.log('Ícone de Reminders clicado');
            showRemindersModal();
        });
    } else {
        console.warn('Ícone de Reminders não encontrado no DOM');
    }

    const addReminderButton = document.querySelector('.dashboard-container .right-section .reminders .add-reminder');
    if (addReminderButton) {
        addReminderButton.addEventListener('click', () => {
            console.log('Botão Add Reminder clicado na página principal');
            showGoalListModal();
        });
    } else {
        console.warn('Botão Add Reminders não encontrado no DOM');
    }

    document.querySelectorAll('.notification[data-id]').forEach(notification => {
        const notificationId = notification.getAttribute('data-id');
        const timerElement = notification.querySelector('.timer');
        const checkbox = notification.querySelector('.goal-checkbox');
        const goalName = notification.querySelector('.goal-info p').textContent;
        if (timerElement && checkbox) {
            startTimer(notificationId, timerElement, checkbox, goalName);
        }
    });
});
//---------------------------------- FIM Reminders ----------------------------------//