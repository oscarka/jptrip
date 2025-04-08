// 日语发音功能
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到锚点
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // 更新活动链接
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 日语发音功能
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            speakJapanese(text);
        });
    });
    
    // 使用Web Speech API进行日语发音
    function speakJapanese(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            speechSynthesis.speak(utterance);
        } else {
            console.log('您的浏览器不支持语音合成API');
        }
    }
    
    // 监听滚动事件，更新活动导航链接
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('main section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    });
    
    // 图片加载错误处理
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/350x200?text=图片加载中';
            this.alt = '图片暂时无法显示';
        });
    });
    
    // 初始化 - 设置第一个导航链接为活动状态
    document.querySelector('nav a').classList.add('active');
});
