// DOM要素の取得
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileListPreview = document.getElementById('fileListPreview');
const uploadForm = document.getElementById('uploadForm');
const fileGrid = document.getElementById('fileGrid');

// モーダルの開閉処理
openModalBtn.addEventListener('click', () => modalOverlay.style.display = 'flex');
closeModalBtn.addEventListener('click', () => modalOverlay.style.display = 'none');
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = 'none';
});

// ドラッグ＆ドロップおよびクリック選択の挙動
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'));
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        updateFileList(fileInput.files);
    }
});

fileInput.addEventListener('change', () => {
    updateFileList(fileInput.files);
});

// 選択されたファイル名の一覧を表示する関数
function updateFileList(files) {
    fileListPreview.innerHTML = '';
    Array.from(files).forEach(file => {
        const li = document.createElement('li');
        li.textContent = `📄 ${file.name}`;
        fileListPreview.appendChild(li);
    });
}

// フォーム送信時の処理（画面へのカード追加）
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fileCount = fileInput.files.length;
    const firstFileName = fileInput.files[0].name;
    const displayTitle = fileCount > 1 ? `${firstFileName} ほか` : firstFileName;

    alert('【デモ動作】画面の一覧に新しくカードを追加します。');
    
    // 画面上への新しいカードの生成と追加
    const card = document.createElement('div');
    card.className = 'file-card';
    card.innerHTML = `
        <div>
            <h3>${displayTitle}</h3>
            <span class="count-badge">ファイル数: ${fileCount}個</span>
            <div class="meta">投稿者: ${document.getElementById('nickname').value} | ${document.getElementById('password').value ? 'パスワード保護あり' : 'パスワードなし'}</div>
            <div class="desc">${document.getElementById('description').value}</div>
        </div>
        <button class="btn-download" onclick="alert('ダウンロードリンク未設定です')">一括ダウンロード</button>
    `;
    fileGrid.appendChild(card);

    // 入力欄をクリアしてモーダルを閉じる
    uploadForm.reset();
    fileListPreview.innerHTML = '';
    modalOverlay.style.display = 'none';
});

// サンプルデータ用のダウンロード処理関数
function downloadFiles(title, correctPassword) {
    const pass = prompt('ダウンロードパスワードを入力してください:');
    if (pass === correctPassword) {
        alert(`「${title}」に含まれるすべてのファイルのダウンロードを開始します（デモ）`);
    } else {
        alert('パスワードが違います。');
    }
}
