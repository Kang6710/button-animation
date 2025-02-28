let leftClickCount = 0;
let rightClickCount = 0;

const messages = [
    '你好，这是第一条消息！',
    '这是第二条有趣的消息~',
    '这是最后一条神秘消息...',
];

// 创建消息显示元素
const messageBox = document.createElement('div');
messageBox.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    font-size: 18px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
`;
document.body.appendChild(messageBox);

// 显示消息的函数
function showMessage(text) {
    messageBox.textContent = text;
    messageBox.style.opacity = '1';
    setTimeout(() => {
        messageBox.style.opacity = '0';
    }, 2000);
}

document.querySelector('.left-btn').addEventListener('click', function() {
    leftClickCount++;
    if (leftClickCount <= 3) {
        this.classList.add('expand');
        showMessage(messages[leftClickCount - 1]);
    }
});

document.querySelector('.right-btn').addEventListener('click', function() {
    rightClickCount++;
    if (rightClickCount <= 3) {
        this.classList.add('shrink');
        this.textContent = `点击了${rightClickCount}次`;
    }
});

// 添加触摸支持
document.querySelector('.left-btn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    leftClickCount++;
    if (leftClickCount <= 3) {
        this.classList.add('expand');
        showMessage(messages[leftClickCount - 1]);
    }
});

document.querySelector('.right-btn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    rightClickCount++;
    if (rightClickCount <= 3) {
        this.classList.add('shrink');
        this.textContent = `点击了${rightClickCount}次`;
    }
});