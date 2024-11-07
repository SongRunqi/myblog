document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach(pre => {
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = '复制代码';
    
    // 添加点击事件
    copyButton.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (code) {
        try {
          await navigator.clipboard.writeText(code.innerText);
          copyButton.textContent = '已复制！';
          copyButton.classList.add('copied');
          
          // 2秒后恢复原状
          setTimeout(() => {
            copyButton.textContent = '复制代码';
            copyButton.classList.remove('copied');
          }, 2000);
        } catch (err) {
          copyButton.textContent = '复制失败';
          console.error('复制失败:', err);
        }
      }
    });
    
    // 将按钮添加到代码块
    pre.appendChild(copyButton);
  });
}); 