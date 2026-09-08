const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');
const heartsContainer = document.getElementById('hearts-container');

// Danh sách các câu nói hài hước cho nút "Không"
const noMessages = [
  "Không",
  "Bạn chắc chứ?",
  "Thật sự chắc chứ?",
  "Suy nghĩ lại đi!",
  "Cơ hội cuối cùng đó!",
  "Chắc là không đâu nhỉ?",
  "Bạn có thể sẽ hối hận đấy!",
  "Hãy suy nghĩ thêm một chút!",
  "Bạn hoàn toàn chắc chắn chứ?",
  "Có thể đây là một sai lầm đấy!",
  "Xin hãy có chút tình cảm!",
  "Đừng lạnh lùng như vậy!",
  "Đổi ý rồi chứ?",
  "Bạn không suy nghĩ lại sao?",
  "Đó là câu trả lời cuối cùng của bạn sao?",
  "Bạn đang làm tan nát trái tim tôi ;(",
  "Làm ơn mà? :((",
  "Được rồi, tôi sẽ hỏi thật nhẹ nhàng...",
  "Làm ơn nhé, xin bạn đấy?",
  "Tôi sắp khóc rồi...",
  "Đừng làm vậy với tôi :(",
  "Tôi sẽ cô đơn đến chết mất...",
  "Được rồi, tôi sẽ bắt đầu lại!"
];

let messageIndex = 0;
let yesBtnSize = 1;

noBtn.addEventListener('click', handleNoClick);
yesBtn.addEventListener('click', handleYesClick);

function handleNoClick() {
  messageIndex = (messageIndex + 1) % noMessages.length;
  const currentMessage = noMessages[messageIndex];
  noBtn.innerText = currentMessage;

  // Tăng kích thước nút "Có"
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  const newSize = currentSize * 1.2; // Tăng 20% sau mỗi lần nhấn
  yesBtn.style.fontSize = `${newSize}px`;
  
  // Tăng khoảng cách bên trong để nút rõ ràng hơn
  const currentPadding = parseFloat(window.getComputedStyle(yesBtn).paddingTop);
  yesBtn.style.padding = `${currentPadding * 1.5}px ${currentPadding * 2}px`;

  // Thu nhỏ nhẹ chữ trên nút "Không"
  const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
  if (noSize > 5) { // Kích thước tối thiểu để vẫn đọc được
    noBtn.style.fontSize = `${noSize * 0.9}px`;
  }
}

function handleYesClick() {
  questionScreen.classList.add('hidden');
  successScreen.classList.remove('hidden');
  
  // Bắt đầu màn ăn mừng
  createHearts();
  createLoveWords();
  createFloatingPhotos();
}

function createHearts() {
  const heartCount = 50;
  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '❤️';
      
      // Vị trí và thuộc tính chuyển động ngẫu nhiên
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 2 + 3 + 's';
      heart.style.fontSize = Math.random() * 20 + 20 + 'px';
      
      heartsContainer.appendChild(heart);
      
      // Xóa trái tim sau khi hiệu ứng kết thúc
      setTimeout(() => {
        heart.remove();
      }, 5000);
    }, i * 100);
  }
  
  // Tiếp tục tạo trái tim
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heartsContainer.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }, 300);
}

// Chữ tình yêu bay từ dưới lên, mỗi chữ một hướng và tốc độ ngẫu nhiên
function createLoveWords() {
  const words = [
    'iu cún><',
    'Vợ iuuu',
    'iu em mi><',
    'iu ebe mi',
    'i love you',
    '💗💗💗'
  ];

  const spawnWord = () => {
    const word = document.createElement('div');
    word.className = 'love-word';
    word.textContent = words[Math.floor(Math.random() * words.length)];

    const startX = Math.random() * 100;
    const drift = (Math.random() * 180 - 90).toFixed(0);
    const duration = (Math.random() * 3 + 4).toFixed(2);
    const size = (Math.random() * 0.65 + 1.05).toFixed(2);
    const delay = (Math.random() * 0.4).toFixed(2);

    word.style.left = `${startX}vw`;
    word.style.setProperty('--drift', `${drift}px`);
    word.style.setProperty('--duration', `${duration}s`);
    word.style.setProperty('--size', size);
    word.style.animationDelay = `${delay}s`;

    heartsContainer.appendChild(word);

    setTimeout(() => word.remove(), (Number(duration) + Number(delay) + 0.5) * 1000);
  };

  // Tạo nhiều chữ ngay khi bấm "Có"
  for (let i = 0; i < 18; i++) {
    setTimeout(spawnWord, i * 180);
  }

  // Sau đó tiếp tục bay liên tục
  setInterval(spawnWord, 450);
}


// Ảnh kỷ niệm bay liên tục từ dưới lên ở MỌI VỊ TRÍ màn hình.
// Spawn so le + né vị trí gần ảnh vừa xuất hiện để ảnh không dính thành cụm.
function createFloatingPhotos() {
  const photoContainer = document.getElementById('floating-photos');
  if (!photoContainer) return;

  const photos = Array.from(
    { length: 18 },
    (_, i) => `images/photo-${String(i + 1).padStart(2, '0')}.jpg`
  );
  let photoIndex = 0;
  const recentX = [];

  const pickSafeX = () => {
    // Thử nhiều vị trí ngẫu nhiên trên toàn màn hình.
    // Không chọn quá sát các ảnh vừa spawn để tạo cảm giác so le.
    for (let attempt = 0; attempt < 30; attempt++) {
      const x = Math.random() * 82 + 5; // 5–87vw
      const safe = recentX.every(oldX => Math.abs(x - oldX) >= 17);
      if (safe) {
        recentX.push(x);
        if (recentX.length > 5) recentX.shift();
        return x;
      }
    }

    // Nếu màn hình đang chật, vẫn chọn ngẫu nhiên một vị trí.
    const x = Math.random() * 82 + 5;
    recentX.push(x);
    if (recentX.length > 5) recentX.shift();
    return x;
  };

  const spawnPhoto = () => {
    const photo = document.createElement('img');
    photo.className = 'floating-photo';
    photo.src = photos[photoIndex % photos.length];
    photo.alt = '';
    photoIndex++;

    // Ảnh có thể xuất hiện bên trái, giữa hoặc bên phải.
    const startX = pickSafeX();
    const drift = Math.round(Math.random() * 120 - 60); // -60px → +60px
    const duration = (Math.random() * 1.2 + 7.6).toFixed(2);
    const width = Math.round(Math.random() * 15 + 155); // 155–170px
    const rotate = Math.round(Math.random() * 14 - 7);

    photo.style.left = `${startX}vw`;
    photo.style.width = `${width}px`;
    photo.style.setProperty('--photo-drift', `${drift}px`);
    photo.style.setProperty('--photo-duration', `${duration}s`);
    photo.style.setProperty('--photo-rotate', `${rotate}deg`);

    photoContainer.appendChild(photo);

    setTimeout(() => photo.remove(), (Number(duration) + 0.8) * 1000);
  };

  // Rải ảnh so le ngay từ đầu, không dồn thành một cục.
  for (let i = 0; i < 5; i++) {
    setTimeout(spawnPhoto, i * 850);
  }

  // Chạy liên tục toàn màn hình. Khoảng cách ~1.7 giây giúp ảnh không dính nhau.
  setInterval(spawnPhoto, 1700);
}
