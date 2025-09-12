// Экранные элементы
const mainScreen = document.getElementById('main-screen');
const docSelectScreen = document.getElementById('doc-select-screen');
const treasuryScreen = document.getElementById('treasury-screen'); // НОВЫЙ
const docViewerScreen = document.getElementById('doc-viewer-screen');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const homeBackBtn = document.getElementById('home-back-btn');
const treasuryBackBtn = document.getElementById('treasury-back-btn'); // НОВЫЙ
const treasuryBtn = document.getElementById('treasury-btn'); // НОВЫЙ
const fontSizeBtn = document.getElementById('font-size-btn');
const docButtons = document.querySelectorAll('.doc-btn');
const treasuryDocButtons = document.querySelectorAll('.treasury-doc-btn'); // НОВЫЙ
const docContent = document.getElementById('doc-content');

// Элементы управления музыкой
const backgroundMusic = document.getElementById('background-music');
const musicToggleBtnMain = document.getElementById('music-toggle-btn-main');
const musicToggleBtnSelect = document.getElementById('music-toggle-btn-select');
const musicToggleBtnTreasury = document.getElementById('music-toggle-btn-treasury'); // НОВЫЙ
const musicToggleBtnViewer = document.getElementById('music-toggle-btn-viewer');
const volumeSliderMain = document.getElementById('volume-slider-main');
const volumeSliderSelect = document.getElementById('volume-slider-select');
const volumeSliderTreasury = document.getElementById('volume-slider-treasury'); // НОВЫЙ
const volumeSliderViewer = document.getElementById('volume-slider-viewer');

let isMusicPlaying = false;

// Основные документы
const documents = [
  {
    title: 'Атэстацыя педагогаў',
    path: 'documents/doc1.pdf'
  },
  {
    title: 'Віртуальны метадычны кабінет', 
    path: 'documents/doc2.pdf'
  },
  {
    title: 'Абагульненне падагагічнага вопыту',
    path: 'documents/doc3.pdf'
  },
  {
    title: 'Перыядычныя выданні',
    path: 'documents/doc4.pdf'
  },
  {
    title: 'Метадычны партал',
    path: 'documents/doc5.pdf'
  },
  {
    title: 'У дапамогу педагогу дашкольнай адукацыі',
    path: 'documents/doc6.pdf'
  },
    {
    title: 'Нарматыўныя прававыя дакументы',
    path: 'documents/doc7.pdf'
  }
];

// НОВЫЕ документы для Метадычной скарбонки
const treasuryDocuments = [
  {
    title: 'Адукацыйная  галіна',
    path: 'documents/treasury/doc1.pdf'
  },
  {
    title: 'Вобразы мілыя роднага краю',
    path: 'documents/treasury/doc2.pdf'
  },
  {
    title: 'Гульні на тэму',
    path: 'documents/treasury/doc3.pdf'
  },
  {
    title: 'Дзень нараджэння',
    path: 'documents/treasury/doc4.pdf'
  },
  {
    title: 'Дзіця і прырода. На лясной палянцы',
    path: 'documents/treasury/doc5.pdf'
  },
  {
    title: 'Дыдактычныя гульні картатэка',
    path: 'documents/treasury/doc6.pdf'
  }
];

// Размер шрифта для документа
let currentFontSize = 1.4;

// Таймер бездействия (10 минут)
let inactivityTimer = null;
const INACTIVITY_LIMIT = 10 * 60 * 1000;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    showScreen(mainScreen);
  }, INACTIVITY_LIMIT);
}

['touchstart', 'click', 'mousemove', 'keydown'].forEach(event => {
  document.addEventListener(event, resetInactivityTimer, {passive: true});
});

// Плавный переход между экранами
function showScreen(targetScreen) {
  const currentScreen = document.querySelector('.screen:not(.hidden)');
  
  if (currentScreen) {
    currentScreen.classList.add('fade-out');
    
    setTimeout(() => {
      [mainScreen, docSelectScreen, treasuryScreen, docViewerScreen].forEach(s => s.classList.add('hidden'));
      currentScreen.classList.remove('fade-out');
      
      targetScreen.classList.remove('hidden');
      targetScreen.classList.add('fade-in');
      
      setTimeout(() => {
        targetScreen.classList.remove('fade-in');
      }, 500);
    }, 250);
  } else {
    [mainScreen, docSelectScreen, treasuryScreen, docViewerScreen].forEach(s => s.classList.add('hidden'));
    targetScreen.classList.remove('hidden');
  }
}

// Функция открытия PDF на весь экран
function openPDF(doc) {
  if (!doc) return;
  
  const pdfWindow = window.open('', '_blank', 'fullscreen=yes,scrollbars=yes');
  
  pdfWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>${doc.title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: #2c2c2c;
          font-family: 'Segoe UI', Arial, sans-serif;
          overflow: hidden;
        }
        
        .pdf-container {
          width: 100vw;
          height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        
        .top-bar {
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          z-index: 1000;
          font-size: 18px;
          font-weight: 500;
        }
        
        .document-title {
          font-size: 20px;
          font-weight: 600;
        }
        
        .controls {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .btn {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.3s;
          backdrop-filter: blur(10px);
        }
        
        .btn:hover {
          background: rgba(255,255,255,0.25);
          transform: translateY(-1px);
        }
        
        .close-btn {
          background: rgba(239,68,68,0.8);
          font-weight: bold;
        }
        
        .close-btn:hover {
          background: rgba(239,68,68,1);
        }
        
        .pdf-frame {
          width: 100%;
          height: calc(100vh - 60px);
          border: none;
          background: white;
        }
        
        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 18px;
          z-index: 10;
        }
      </style>
    </head>
    <body>
      <div class="pdf-container">
        <div class="top-bar">
          <div class="document-title">${doc.title}</div>
          <div class="controls">
            <button class="btn" onclick="window.print()">📄 Друк</button>
            <button class="btn" onclick="toggleFullscreen()">⛶ Поўны экран</button>
            <button class="btn close-btn" onclick="window.close()">✕ Зачыніць</button>
          </div>
        </div>
        <div class="loading" id="loading">Загрузка документа...</div>
        <iframe class="pdf-frame" 
                src="${doc.path}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH" 
                type="application/pdf"
                onload="hideLoading()">
        </iframe>
      </div>
      
      <script>
        function hideLoading() {
          document.getElementById('loading').style.display = 'none';
        }
        
        function toggleFullscreen() {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
              console.log('Не удалось войти в полноэкранный режим:', err);
            });
          } else {
            document.exitFullscreen();
          }
        }
        
        setTimeout(hideLoading, 3000);
        
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              window.close();
            }
          }
          if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
          }
        });
      </script>
    </body>
    </html>
  `);
  
  pdfWindow.document.close();
  
  setTimeout(() => {
    try {
      pdfWindow.moveTo(0, 0);
      pdfWindow.resizeTo(screen.width, screen.height);
    } catch (e) {
      console.log('Не удалось изменить размер окна:', e);
    }
  }, 500);
}

// Функция обновления названий кнопок
function updateButtonTitles() {
  const buttonsContainer = document.querySelector('.doc-buttons');
  
  docButtons.forEach((btn, index) => {
    if (documents[index] && !btn.classList.contains('special-btn')) {
      btn.textContent = documents[index].title;
    }
  });

  // Обновляем кнопки Метадычной скарбонки
  treasuryDocButtons.forEach((btn, index) => {
    if (treasuryDocuments[index]) {
      btn.textContent = treasuryDocuments[index].title;
    }
  });
  
  if (documents.length > 6) {
    buttonsContainer.classList.add('many-buttons');
  }
}

// Управление музыкой
function toggleMusic() {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    updateMusicButtons('🔇', true);
    isMusicPlaying = false;
  } else {
    backgroundMusic.play().catch(e => {
      console.log('Не удалось запустить музыку:', e);
    });
    updateMusicButtons('🎵', false);
    isMusicPlaying = true;
  }
}

function updateMusicButtons(icon, isMuted) {
  [musicToggleBtnMain, musicToggleBtnSelect, musicToggleBtnTreasury, musicToggleBtnViewer].forEach(btn => {
    if (btn) {
      btn.textContent = icon;
      if (isMuted) {
        btn.classList.add('muted');
      } else {
        btn.classList.remove('muted');
      }
    }
  });
}

function updateVolume(value) {
  const volume = value / 100;
  backgroundMusic.volume = volume;
  
  [volumeSliderMain, volumeSliderSelect, volumeSliderTreasury, volumeSliderViewer].forEach(slider => {
    if (slider) {
      slider.value = value;
    }
  });
}

function startMusicOnFirstInteraction() {
  if (!isMusicPlaying) {
    backgroundMusic.volume = 0.3;
    backgroundMusic.play().catch(e => {
      console.log('Автозапуск музыки заблокирован браузером');
    });
    isMusicPlaying = true;
    updateMusicButtons('🎵', false);
  }
}

// Обработчики событий для музыки
if (musicToggleBtnMain) {
  musicToggleBtnMain.addEventListener('click', toggleMusic);
}
if (musicToggleBtnSelect) {
  musicToggleBtnSelect.addEventListener('click', toggleMusic);
}
if (musicToggleBtnTreasury) {
  musicToggleBtnTreasury.addEventListener('click', toggleMusic);
}
if (musicToggleBtnViewer) {
  musicToggleBtnViewer.addEventListener('click', toggleMusic);
}

if (volumeSliderMain) {
  volumeSliderMain.addEventListener('input', (e) => updateVolume(e.target.value));
}
if (volumeSliderSelect) {
  volumeSliderSelect.addEventListener('input', (e) => updateVolume(e.target.value));
}
if (volumeSliderTreasury) {
  volumeSliderTreasury.addEventListener('input', (e) => updateVolume(e.target.value));
}
if (volumeSliderViewer) {
  volumeSliderViewer.addEventListener('input', (e) => updateVolume(e.target.value));
}

// Основные обработчики событий
startBtn.addEventListener('click', () => {
  startMusicOnFirstInteraction();
  showScreen(docSelectScreen);
});

if (homeBackBtn) {
  homeBackBtn.addEventListener('click', () => {
    showScreen(mainScreen);
  });
}

// НОВЫЙ обработчик для кнопки "Метадычная скарбонка"
if (treasuryBtn) {
  treasuryBtn.addEventListener('click', () => {
    showScreen(treasuryScreen);
  });
}

// НОВЫЙ обработчик для возврата из Метадычной скарбонки
if (treasuryBackBtn) {
  treasuryBackBtn.addEventListener('click', () => {
    showScreen(docSelectScreen);
  });
}

// Обработчики для основных кнопок документов
docButtons.forEach(btn => {
  if (!btn.classList.contains('special-btn')) {
    btn.addEventListener('click', () => {
      const docIdx = +btn.dataset.doc - 1;
      if (documents[docIdx]) {
        openPDF(documents[docIdx]);
      }
    });
  }
});

// НОВЫЕ обработчики для кнопок Метадычной скарбонки
treasuryDocButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const docIdx = +btn.dataset.treasury - 1;
    if (treasuryDocuments[docIdx]) {
      openPDF(treasuryDocuments[docIdx]);
    }
  });
});

// Обработчики для старого HTML просмотра (совместимость)
if (backBtn) {
  backBtn.addEventListener('click', () => {
    showScreen(docSelectScreen);
  });
}

if (fontSizeBtn) {
  fontSizeBtn.addEventListener('click', () => {
    currentFontSize = currentFontSize === 1.4 ? 1.9 : 1.4;
    if (docContent) {
      docContent.style.fontSize = `${currentFontSize}em`;
    }
  });
}

// Запуск
showScreen(mainScreen);
resetInactivityTimer();
setTimeout(updateButtonTitles, 100);

console.log("app.js загружен - многоуровневая версия");
