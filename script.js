let hasShownLeftMessage = false;
let rightClickCount = 0;

const leftMessage = '对不起嘛，可能是这几次生气我有点烦 然后早上其实没事 但我也不知道为啥就没给你发 原来我早上醒来都给你发 我感觉可能是这几天的问题 这几天有时候视频 我就没想着信息发给你早上';

const rightMessages = [
    '不原意吗（奶茶）',
    '真的不能吗（汉堡）',
    '呜呜呜~（小蛋糕）',
    '必须选择原谅（全部）'
];

// 创建消息显示元素
const messageBox = document.createElement('div');
messageBox.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    font-size: 18px;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
`;
document.body.appendChild(messageBox);

// 显示消息的函数
function showMessage(text) {
    messageBox.textContent = text;
    messageBox.style.transform = 'translateX(-50%) translateY(0)';
    messageBox.style.opacity = '1';
    
    setTimeout(() => {
        messageBox.style.transform = 'translateX(-50%) translateY(-20px)';
        messageBox.style.opacity = '0';
    }, 10000);
}

// 更新按钮样式的函数
function updateButtonStyles(button, isExpand, clickCount) {
    const screenWidth = window.innerWidth;
    const scaleRatio = screenWidth > 1024 ? 0.25 : 0.15;
    const scale = isExpand ? 1 + (clickCount * scaleRatio) : 1 - (clickCount * 0.15);
    
    button.style.transform = `scale(${scale})`;
    if (!isExpand) {
        button.style.opacity = Math.max(0.3, 1 - (clickCount * 0.2));
    }
    
    // 添加脉冲动画效果
    button.style.animation = 'pulse 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
}

const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// 添加脉冲动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

leftBtn.addEventListener('click', function() {
    if (!hasShownLeftMessage) {
        updateButtonStyles(this, true, 1);
        showMessage(leftMessage);
        hasShownLeftMessage = true;
        
        // 添加波纹效果
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }
});

rightBtn.addEventListener('click', function() {
    rightClickCount++;
    if (rightClickCount <= 4) {
        updateButtonStyles(this, false, rightClickCount);
        updateButtonStyles(leftBtn, true, rightClickCount);
        this.textContent = rightMessages[rightClickCount - 1];
        
        // 添加波纹效果
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);

        // 当显示最后一条消息时，将按钮完全透明
        if (rightClickCount === 4) {
            setTimeout(() => {
                this.style.opacity = '0';
            }, 3000);
        }
    }
});

// 添加触摸支持
rightBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.click();
});

leftBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.click();
});