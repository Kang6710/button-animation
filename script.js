document.querySelector('.right-btn').addEventListener('click', function() {
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    
    leftBtn.classList.add('expand');
    rightBtn.classList.add('shrink');
});

// 添加触摸支持
document.querySelector('.right-btn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    
    leftBtn.classList.add('expand');
    rightBtn.classList.add('shrink');
});