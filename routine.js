// Sistema de gerenciamento de rotinas com persistência em LocalStorage
const DEFAULT_ROUTINES = {
    estudo: [
        {
            id: 'est-1',
            title: 'Aulas Regulares na Escola',
            time: '07:30 - 12:00',
            period: 'Manhã',
            desc: 'Atenção total nas disciplinas, anotações organizadas e participação ativa.',
            completed: true
        },
        {
            id: 'est-2',
            title: 'Aulas Extracurriculares',
            time: '14:00 - 16:00',
            period: 'Tarde',
            desc: 'Atividades complementares e aprofundamento de conteúdos da semana.',
            completed: true
        },
        {
            id: 'est-3',
            title: 'Revisão & Organização de Material',
            time: '17:30 - 18:15',
            period: 'Fim de Tarde',
            desc: 'Conferir agenda escolar, fazer tarefas pendentes e preparar a mochila para o dia seguinte.',
            completed: false
        }
    ],
    trabalho: [
        {
            id: 'trab-1',
            title: 'Organização do Quarto',
            time: '08:00',
            period: 'Manhã',
            desc: 'Arrumar a cama, guardar roupas e manter a escrivaninha limpa para estudar.',
            completed: true
        },
        {
            id: 'trab-2',
            title: 'Apoio Pós-Refeições',
            time: '12:45',
            period: 'Tarde',
            desc: 'Ajudar a tirar a mesa, guardar mantimentos e lavar/secar a louça.',
            completed: true
        },
        {
            id: 'trab-3',
            title: 'Organização Geral da Casa',
            time: '18:30',
            period: 'Fim de Tarde',
            desc: 'Auxiliar na arrumação dos ambientes comuns antes do jantar.',
            completed: true
        }
    ],
    lazer: [
        {
            id: 'laz-1',
            title: 'Leitura Diária de Livros',
            time: '20:30 - 21:15',
            period: 'Noite',
            desc: 'Ler pelo menos 20 páginas de livros de ficção, fantasia ou aventura.',
            completed: true
        },
        {
            id: 'laz-2',
            title: 'Sessão Cinema & Séries',
            time: 'Sexta / Sábado',
            period: 'Fim de Semana',
            desc: 'Assistir filmes favoritos com pipoca para relaxar a mente.',
            completed: true
        },
        {
            id: 'laz-3',
            title: 'Pausa Desconectada',
            time: '16:30 - 17:15',
            period: 'Tarde',
            desc: 'Momento sem telas para descansar os olhos, ouvir música e recarregar as energias.',
            completed: false
        }
    ],
    hobby: [
        {
            id: 'hob-1',
            title: 'Pesquisa de Temas Livres',
            time: '19:00 - 19:45',
            period: 'Noite',
            desc: 'Explorar assuntos de curiosidade pessoal fora da grade obrigatória da escola.',
            completed: true
        },
        {
            id: 'hob-2',
            title: 'Documentários & Tutoriais',
            time: 'Sábado à tarde',
            period: 'Fim de Semana',
            desc: 'Assistir conteúdos educativos inspiradores sobre ciência, artes e cultura.',
            completed: true
        },
        {
            id: 'hob-3',
            title: 'Caderno de Mapas Mentais Criativos',
            time: 'Domingo',
            period: 'Manhã',
            desc: 'Criar resumos visuais coloridos e anotações criativas por puro prazer de aprender.',
            completed: false
        }
    ],
    esportes: [
        {
            id: 'esp-1',
            title: 'Aquecimento & Alongamento Aquático',
            time: '15:00 - 15:15',
            period: 'Tarde',
            desc: 'Preparação articular e respiratória antes de entrar na piscina.',
            completed: true
        },
        {
            id: 'esp-2',
            title: 'Treino Técnico de Natação',
            time: '15:15 - 16:00',
            period: 'Tarde',
            desc: 'Prática de nado crawl, costas e peito com foco em postura, respiração e ritmo.',
            completed: true
        },
        {
            id: 'esp-3',
            title: 'Séries de Resistência Cardiorrespiratória',
            time: 'Quarta & Sexta',
            period: 'Tarde',
            desc: 'Tiros moderados para ganho de fôlego, força muscular e condicionamento físico.',
            completed: true
        }
    ],
    saude: [
        {
            id: 'sau-1',
            title: 'Café da Manhã Nutritivo',
            time: '07:00',
            period: 'Manhã',
            desc: 'Refeição equilibrada com frutas frescas, fibras e proteínas para começar bem o dia.',
            completed: true
        },
        {
            id: 'sau-2',
            title: 'Meta de Hidratação (2L de Água)',
            time: 'Dia todo',
            period: 'Constante',
            desc: 'Manter a garrafinha sempre por perto, especialmente antes e depois da natação.',
            completed: true
        },
        {
            id: 'sau-3',
            title: 'Prato Colorido & Lanche Pré-Treino',
            time: '12:15 & 14:30',
            period: 'Tarde',
            desc: 'Almoço rico em verduras e vegetais + snack leve antes das atividades físicas.',
            completed: false
        }
    ]
};

function getRoutines(category) {
    const key = `anas_routine_${category}`;
    const stored = localStorage.getItem(key);
    if (!stored) {
        localStorage.setItem(key, JSON.stringify(DEFAULT_ROUTINES[category] || []));
        return DEFAULT_ROUTINES[category] || [];
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        return DEFAULT_ROUTINES[category] || [];
    }
}

function saveRoutines(category, routines) {
    localStorage.setItem(`anas_routine_${category}`, JSON.stringify(routines));
}

function initCategoryPage(category) {
    const form = document.getElementById('addRoutineForm');
    renderRoutines(category);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('routineTitle').value.trim();
            const time = document.getElementById('routineTime').value.trim() || 'Flexível';
            const period = document.getElementById('routinePeriod').value;
            const desc = document.getElementById('routineDesc').value.trim() || 'Nova atividade adicionada à rotina.';

            if (!title) return;

            const routines = getRoutines(category);
            routines.unshift({
                id: `${category}-${Date.now()}`,
                title,
                time,
                period,
                desc,
                completed: false
            });

            saveRoutines(category, routines);
            form.reset();
            renderRoutines(category);
        });
    }
}

function toggleRoutine(category, id) {
    const routines = getRoutines(category);
    const updated = routines.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveRoutines(category, updated);
    renderRoutines(category);
}

function deleteRoutine(category, id) {
    const routines = getRoutines(category);
    const updated = routines.filter(item => item.id !== id);
    saveRoutines(category, updated);
    renderRoutines(category);
}

function renderRoutines(category) {
    const listEl = document.getElementById('routineList');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const progressCount = document.getElementById('progressCount');

    if (!listEl) return;

    const routines = getRoutines(category);
    const total = routines.length;
    const completed = routines.filter(r => r.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressPercent) progressPercent.textContent = `${percent}% concluído`;
    if (progressCount) progressCount.textContent = `${completed} de ${total} rotinas`;

    if (total === 0) {
        listEl.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">Nenhuma rotina cadastrada ainda. Adicione uma nova ao lado!</p>`;
        return;
    }

    listEl.innerHTML = routines.map(item => `
        <div class="routine-item ${item.completed ? 'completed' : ''}">
            <div class="routine-left">
                <input 
                    type="checkbox" 
                    class="routine-checkbox" 
                    ${item.completed ? 'checked' : ''} 
                    onchange="toggleRoutine('${category}', '${item.id}')"
                    title="Marcar como concluída"
                >
                <div class="routine-info">
                    <h4 class="routine-title">${escapeHTML(item.title)}</h4>
                    <div class="routine-meta">
                        <span class="meta-pill">⏰ ${escapeHTML(item.time)}</span>
                        <span class="meta-pill period">✨ ${escapeHTML(item.period)}</span>
                    </div>
                    <p class="routine-desc">${escapeHTML(item.desc)}</p>
                </div>
            </div>
            <button class="btn-delete" onclick="deleteRoutine('${category}', '${item.id}')" title="Remover rotina">✕</button>
        </div>
    `).join('');
}

function updateDashboardCounts() {
    const categories = ['estudo', 'trabalho', 'lazer', 'hobby', 'esportes', 'saude'];
    categories.forEach(cat => {
        const badge = document.getElementById(`count-${cat}`);
        if (badge) {
            const routines = getRoutines(cat);
            const completed = routines.filter(r => r.completed).length;
            badge.textContent = `${completed}/${routines.length} rotinas`;
        }
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[match]));
}
