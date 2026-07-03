/**
 * 动态模式切换脚本
 * 解决设置页面和content script之间的同步问题
 * 实现即时模式切换，无需重载插件
 */

class DynamicModeSwitcher {
    constructor() {
        this.init();
    }
    
    init() {
        // console.log('动态模式切换器已初始化');
        this.setupModeSync();
    }
    
    /**
     * 设置模式同步机制
     */
    setupModeSync() {
        // 监听来自插件的消息通知
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                if (request.action === 'SETTINGS_CHANGED') {
                    // console.log('【成功监听到】检测到设置变化，重新加载设置...');
                    
                    // 同步设置到localStorage
                    localStorage.setItem('smartFormFillerSettings', JSON.stringify(request.settings));
                    
                    // 执行重新加载逻辑
                    this.reloadSettings();
                }
            });
        }
        
        // 主要方案：页面第一次加载时，优先从插件的local存储里初始化设置（解决插件重装时的模式同步问题）
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['smartFormFillerSettings'], (result) => {
                if (result.smartFormFillerSettings) {
                    // console.log('从chrome.storage.local初始化设置');
                    localStorage.setItem('smartFormFillerSettings', JSON.stringify(result.smartFormFillerSettings));
                    this.reloadSettings();
                } else {
                    // 如果chrome.storage.local也没有设置，则检查localStorage是否有设置
                    const stored = localStorage.getItem('smartFormFillerSettings');
                    if (stored) {
                        // console.log('从localStorage加载设置');
                        this.reloadSettings();
                    }
                }
            });
        } else {
            // 如果没有chrome.storage支持，回退到localStorage
            const stored = localStorage.getItem('smartFormFillerSettings');
            if (stored) {
                // console.log('从localStorage加载设置（无chrome.storage支持）');
                this.reloadSettings();
            }
        }
        
        // 保留原有的localStorage监听作为备用方案
        window.addEventListener('storage', (e) => {
            if (e.key === 'smartFormFillerSettings') {
                // console.log('检测到localStorage设置变化，重新加载设置...');
                this.reloadSettings();
            }
        });
        
        // 定期检查设置变化（备用方案）
        this.startPeriodicCheck();
    }
    


    /**
     * 重新加载设置
     */
    reloadSettings() {
        try {
            const stored = localStorage.getItem('smartFormFillerSettings');
            if (stored) {
                const settings = JSON.parse(stored);
                // console.log('重新加载设置:', settings.dataMode);
                
                // 更新SettingsManager
                if (globalThis.settingsManager) {
                    const oldMode = globalThis.settingsManager.settings.dataMode;
                    globalThis.settingsManager.updateSettings(settings);
                    
                    if (oldMode !== settings.dataMode) {
                        // console.log(`模式已从 ${oldMode} 切换到 ${settings.dataMode}`);
                        this.notifyModeChange(settings.dataMode);
                    }
                }
            }
        } catch (error) {
            console.error('重新加载设置失败:', error);
        }
    }
    
    /**
     * 通知模式变化
     */
    notifyModeChange(newMode) {
        // console.log(`模式已切换到: ${newMode}`);
        
        // 触发重新扫描表单元素
        if (globalThis.floatingWidget && globalThis.floatingWidget.scanFormElements) {
            setTimeout(() => {
                globalThis.floatingWidget.scanFormElements();
            }, 100);
        }
    }
    
    /**
     * 开始定期检查
     */
    startPeriodicCheck() {
        let lastSettings = localStorage.getItem('smartFormFillerSettings');
        
        setInterval(() => {
            const currentSettings = localStorage.getItem('smartFormFillerSettings');
            if (currentSettings !== lastSettings) {
                // console.log('检测到设置变化（定期检查）');
                lastSettings = currentSettings;
                this.reloadSettings();
            }
        }, 2000); // 每2秒检查一次
    }
    
    /**
     * 强制切换到指定模式
     */
    forceSwitchMode(mode) {
        if (!['basic', 'advanced'].includes(mode)) {
            // console.error('无效的模式:', mode);
            return false;
        }
        
        try {
            // 更新localStorage
            const currentSettings = JSON.parse(localStorage.getItem('smartFormFillerSettings') || '{}');
            currentSettings.dataMode = mode;
            localStorage.setItem('smartFormFillerSettings', JSON.stringify(currentSettings));
            
            // 触发storage事件（跨页面同步）
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'smartFormFillerSettings',
                oldValue: localStorage.getItem('smartFormFillerSettings'),
                newValue: JSON.stringify(currentSettings)
            }));
            
            // console.log(`已强制切换到 ${mode} 模式`);
            return true;
        } catch (error) {
            console.error('强制切换模式失败:', error);
            return false;
        }
    }
    
    /**
     * 获取当前模式状态
     */
    getCurrentModeInfo() {
        const info = {
            localStorageMode: 'unknown',
            settingsManagerMode: 'unknown',
            actualGenerator: 'unknown',
            syncStatus: 'unknown'
        };
        
        try {
            // 从localStorage获取
            const stored = localStorage.getItem('smartFormFillerSettings');
            if (stored) {
                const settings = JSON.parse(stored);
                info.localStorageMode = settings.dataMode || 'basic';
            }
            
            // 从SettingsManager获取
            if (globalThis.settingsManager) {
                info.settingsManagerMode = globalThis.settingsManager.settings.dataMode;
                
                const generator = globalThis.settingsManager.getDataGenerator();
                // 使用注册表模式检测
                if (globalThis.generatorRegistry) {
                    info.actualGenerator = generator === globalThis.generatorRegistry['basic'] ? 'basic' :
                                          generator === globalThis.generatorRegistry['advanced'] ? 'advanced' : 'unknown';
                } else {
                    // 降级到旧的检测方式
                    info.actualGenerator = generator === globalThis.mockDataGenerator ? 'basic' :
                                          generator === globalThis.advancedMockDataGenerator ? 'advanced' : 'unknown';
                }
                
                info.syncStatus = info.localStorageMode === info.settingsManagerMode ? 'synced' : 'out-of-sync';
            }
        } catch (error) {
            console.error('获取模式信息失败:', error);
        }
        
        return info;
    }
}

// 初始化动态模式切换器
if (typeof globalThis.dynamicModeSwitcher === 'undefined') {
    globalThis.dynamicModeSwitcher = new DynamicModeSwitcher();
}

// 导出便捷函数
globalThis.switchToBasicMode = () => globalThis.dynamicModeSwitcher.forceSwitchMode('basic');
globalThis.switchToAdvancedMode = () => globalThis.dynamicModeSwitcher.forceSwitchMode('advanced');
globalThis.getModeInfo = () => globalThis.dynamicModeSwitcher.getCurrentModeInfo();

// console.log('动态模式切换器已就绪');
// console.log('使用 switchToBasicMode() 切换到基础模式');
// console.log('使用 switchToAdvancedMode() 切换到高级模式');
// console.log('使用 getModeInfo() 查看当前模式状态');