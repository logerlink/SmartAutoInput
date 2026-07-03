/**
 * 智能表单数据模拟助手 - 弹出窗口脚本
 * 处理用户交互和与内容脚本的通信
 */

class PopupManager {
    constructor() {
        this.currentTab = null;
        this.init();
    }

    /**
     * 初始化弹出窗口
     */
    async init() {
        try {
            // 获取当前活动标签页
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            this.currentTab = tabs[0];
            
            // 绑定事件
            this.bindEvents();
            
            // 检查插件状态
            this.checkPluginStatus();
            
            // console.log('弹出窗口初始化完成');
        } catch (error) {
            console.error('弹出窗口初始化失败:', error);
            this.showStatus('初始化失败', 'error');
        }
    }

    /**
     * 绑定按钮事件
     */
    bindEvents() {
        const quickFillBtn = document.getElementById('quickFill');
        const repeatFillBtn = document.getElementById('repeatFill');
        const openSettingsBtn = document.getElementById('openSettings');

        // 快速填充按钮
        quickFillBtn.addEventListener('click', () => {
            this.quickFill();
        });

        // 重复填充按钮
        repeatFillBtn.addEventListener('click', () => {
            this.repeatFill();
        });

        // 打开设置按钮
        openSettingsBtn.addEventListener('click', () => {
            this.openSettings();
        });

        // 添加键盘快捷键支持
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.quickFill();
                        break;
                    case '2':
                        e.preventDefault();
                        this.repeatFill();
                        break;
                }
            }
        });
    }

    /**
     * 快速填充当前页面
     */
    async quickFill() {
        if (!this.currentTab) {
            this.showStatus('无法获取当前标签页', 'error');
            return;
        }

        this.showStatus('正在填充表单...', 'loading');

        try {
            // 添加重试机制
            let retryCount = 0;
            const maxRetries = 3;
            
            const sendMessageWithRetry = async () => {
                try {
                    // 向内容脚本发送填充命令
                    const response = await chrome.tabs.sendMessage(this.currentTab.id, {
                        action: 'quickFillAll'
                    });

                    if (response && response.success) {
                        this.showStatus(`成功填充了 ${response.filledCount} 个表单元素`, 'success');
                        
                        // 3秒后恢复就绪状态
                        setTimeout(() => {
                            this.showStatus('就绪', 'ready');
                        }, 3000);
                        return true;
                    } else {
                        this.showStatus('填充失败，请刷新页面重试', 'error');
                        return false;
                    }
                } catch (error) {
                    retryCount++;
                    if (retryCount < maxRetries) {
                        // 等待500ms后重试
                        this.showStatus(`重试填充中... (${retryCount}/${maxRetries})`, 'loading');
                        await new Promise(resolve => setTimeout(resolve, 500));
                        return await sendMessageWithRetry();
                    } else {
                        // 重试次数用尽
                        console.error('快速填充失败:', error);
                        this.showStatus('填充失败：内容脚本未加载，请刷新页面', 'error');
                        return false;
                    }
                }
            };
            
            await sendMessageWithRetry();
            
        } catch (error) {
            console.error('快速填充失败:', error);
            this.showStatus('填充失败：内容脚本未加载', 'error');
        }
    }

    /**
     * 重复上次填充
     */
    async repeatFill() {
        if (!this.currentTab) {
            this.showStatus('无法获取当前标签页', 'error');
            return;
        }

        this.showStatus('正在重复填充...', 'loading');

        try {
            // 添加重试机制
            let retryCount = 0;
            const maxRetries = 3;
            
            const sendMessageWithRetry = async () => {
                try {
                    const response = await chrome.tabs.sendMessage(this.currentTab.id, {
                        action: 'repeatFill'
                    });

                    if (response && response.success) {
                        this.showStatus(`重复填充了 ${response.filledCount} 个表单元素`, 'success');
                        
                        setTimeout(() => {
                            this.showStatus('就绪', 'ready');
                        }, 3000);
                        return true;
                    } else {
                        this.showStatus('重复填充失败，请先执行快速填充', 'error');
                        return false;
                    }
                } catch (error) {
                    retryCount++;
                    if (retryCount < maxRetries) {
                        // 等待500ms后重试
                        this.showStatus(`重试重复填充中... (${retryCount}/${maxRetries})`, 'loading');
                        await new Promise(resolve => setTimeout(resolve, 500));
                        return await sendMessageWithRetry();
                    } else {
                        // 重试次数用尽
                        console.error('重复填充失败:', error);
                        this.showStatus('重复填充失败：内容脚本未加载，请刷新页面', 'error');
                        return false;
                    }
                }
            };
            
            await sendMessageWithRetry();
            
        } catch (error) {
            console.error('重复填充失败:', error);
            this.showStatus('重复填充失败', 'error');
        }
    }

    /**
     * 打开设置页面
     */
    openSettings() {
        // 在新标签页中打开自定义设置页面
        chrome.tabs.create({
            url: chrome.runtime.getURL('settings.html'),
            active: true
        });
    }

    /**
     * 显示状态信息
     */
    showStatus(message, type = 'ready') {
        const statusText = document.getElementById('statusText');
        const loading = document.getElementById('loading');
        const status = document.getElementById('status');

        statusText.textContent = message;
        
        // 根据类型设置样式
        status.className = 'status';
        if (type === 'loading') {
            status.classList.add('loading-active');
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
            
            if (type === 'error') {
                status.style.background = 'rgba(244, 67, 54, 0.2)';
                status.style.border = '1px solid rgba(244, 67, 54, 0.3)';
            } else if (type === 'success') {
                status.style.background = 'rgba(76, 175, 80, 0.2)';
                status.style.border = '1px solid rgba(76, 175, 80, 0.3)';
            }
        }
    }

    /**
     * 检查插件状态
     */
    async checkPluginStatus() {
        if (!this.currentTab) return;

        try {
            // 添加重试机制，最多重试3次
            let retryCount = 0;
            const maxRetries = 3;
            
            const checkStatusWithRetry = async () => {
                try {
                    // console.log(`尝试检查插件状态 (第${retryCount + 1}次)`);
                    
                    // 尝试与内容脚本通信检查状态
                    const response = await chrome.tabs.sendMessage(this.currentTab.id, {
                        action: 'checkStatus'
                    });

                    // console.log('状态检查响应:', response);
                    
                    if (response && response.ready) {
                        this.showStatus('就绪', 'ready');
                        return true;
                    } else {
                        this.showStatus('内容脚本未就绪', 'warning');
                        return false;
                    }
                } catch (error) {
                    // console.log(`状态检查失败 (第${retryCount + 1}次):`, error);
                    retryCount++;
                    if (retryCount < maxRetries) {
                        // 等待500ms后重试
                        this.showStatus(`重试检查中... (${retryCount}/${maxRetries})`, 'loading');
                        await new Promise(resolve => setTimeout(resolve, 500));
                        return await checkStatusWithRetry();
                    } else {
                        // 重试次数用尽
                        // console.log('状态检查重试次数用尽');
                        this.showStatus('请在网页中刷新后使用', 'warning');
                        return false;
                    }
                }
            };
            
            await checkStatusWithRetry();
            
        } catch (error) {
            // 通信失败，可能是内容脚本未加载
            console.error('状态检查最终失败:', error);
            this.showStatus('请在网页中刷新后使用', 'warning');
        }
    }

    /**
     * 获取插件版本信息
     */
    getVersionInfo() {
        const manifest = chrome.runtime.getManifest();
        return {
            version: manifest.version,
            name: manifest.name,
            description: manifest.description
        };
    }
}

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'fillComplete':
            // 填充完成通知
            if (popupManager) {
                popupManager.showStatus(`填充完成: ${request.message}`, 'success');
            }
            sendResponse({ received: true });
            break;
            
        case 'fillError':
            // 填充错误通知
            if (popupManager) {
                popupManager.showStatus(`填充错误: ${request.message}`, 'error');
            }
            sendResponse({ received: true });
            break;
    }
    return true;
});

// 页面加载完成后初始化
let popupManager;
document.addEventListener('DOMContentLoaded', () => {
    popupManager = new PopupManager();
    
    // 显示版本信息
    const versionInfo = popupManager.getVersionInfo();
    // console.log(`智能表单数据模拟助手 v${versionInfo.version} 已加载`);
});

// 处理窗口关闭前的清理
window.addEventListener('beforeunload', () => {
    // 可以在这里添加清理逻辑
});