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
    background-color: rgba(255, 255, 255, 0.9);
    color: #333;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
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
    }, 600000);
}

// 更新按钮样式的函数
function updateButtonStyles(button, isExpand, clickCount) {
    const screenWidth = window.innerWidth;
    const scaleRatio = screenWidth > 1024 ? 0.5 : 0.3;
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

// 创建烟花画布
const fireworksCanvas = document.createElement('canvas');
fireworksCanvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
`;
document.body.appendChild(fireworksCanvas);
const ctx = fireworksCanvas.getContext('2d');

// 设置画布尺寸
function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 烟花粒子类
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 4 + 2;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 8 + 3;
        this.dx = Math.cos(angle) * velocity;
        this.dy = Math.sin(angle) * velocity;
        this.alpha = 1;
        this.decay = Math.random() * 0.01 + 0.01;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += 0.1; // 重力效果
        this.alpha -= this.decay;
        return this.alpha > 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// 创建烟花效果
function createFirework(x, y) {
    const particles = [];
    const colors = ['#ff0', '#f0f', '#0ff', '#ff4081', '#00e676', '#FFA726', '#E91E63', '#9C27B0', '#3F51B5', '#03A9F4'];
    
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle(
            x,
            y,
            colors[Math.floor(Math.random() * colors.length)]
        ));
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
        particles.forEach((particle, index) => {
            if (particle.update()) {
                particle.draw();
            } else {
                particles.splice(index, 1);
            }
        });
    
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// 修改左按钮点击事件
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

        // 添加多个烟花效果
        const numFireworks = 10;
        const interval = 200;
        
        // 持续创建新的烟花
        const createRandomFirework = () => {
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight - Math.random() * 300;
            createFirework(x, y);
            
            // 随机间隔时间，范围在400-1200ms之间
            const nextInterval = Math.random() * 800 + 400;
            setTimeout(createRandomFirework, nextInterval);
        };
        
        createRandomFirework(); // 烟花之间的时间间隔

        for (let i = 0; i < numFireworks; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = window.innerHeight - Math.random() * 200;
                createFirework(x, y);
            }, i * interval);
        }
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