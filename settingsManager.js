/**
 * 智能表单数据模拟助手 - 设置管理器
 * 支持模式切换、填充间隔配置和自然填充模式
 */

class SettingsManager {
    constructor() {
        this.defaultSettings = {
            // 数据生成模式：'basic' - 使用utils.js, 'advanced' - 使用advancedMockData.js
            dataMode: 'basic',
            
            // 填充间隔配置（毫秒）
            fillInterval: {
                min: 100,    // 最小间隔
                max: 500,    // 最大间隔
                enabled: true // 是否启用间隔
            },
            
            // 自然填充模式
            naturalMode: {
                enabled: true,      // 是否启用自然填充
                humanLike: true,    // 是否模拟人类输入
                typingSpeed: 50,    // 打字速度（字符/秒）
                randomPauses: true  // 是否随机暂停
            },
            
            // 其他设置
            autoDetectPlaceholder: true, // 自动检测placeholder格式
            showFloatingWidget: true,    // 显示悬浮窗
            enableContextMenu: true      // 启用右键菜单
        };
        
        this.init();
    }

    /**
     * 初始化设置管理器
     */
    init() {
        this.loadSettings();
        this.setupStorageListener();
    }

    /**
     * 加载设置
     */
    loadSettings() {
        try {
            const stored = localStorage.getItem('smartFormFillerSettings');
            if (stored) {
                const parsed = JSON.parse(stored);
                this.settings = { ...this.defaultSettings, ...parsed };
            } else {
                this.settings = { ...this.defaultSettings };
                this.saveSettings();
            }
        } catch (error) {
            console.error('加载设置失败:', error);
            this.settings = { ...this.defaultSettings };
        }
    }

    /**
     * 保存设置
     */
    saveSettings() {
        try {
            localStorage.setItem('smartFormFillerSettings', JSON.stringify(this.settings));
            this.notifySettingsChanged();
        } catch (error) {
            console.error('保存设置失败:', error);
        }
    }

    /**
     * 获取当前设置
     */
    getSettings() {
        return { ...this.settings };
    }

    /**
     * 更新设置
     */
    updateSettings(newSettings) {
        const oldMode = this.settings.dataMode;
        this.settings = { ...this.settings, ...newSettings };
        this.saveSettings();
        
        // 如果模式发生变化，立即重新初始化数据生成器
        if (oldMode !== this.settings.dataMode) {
            // console.log(`模式已从 ${oldMode} 切换到 ${this.settings.dataMode}`);
            this.reinitializeDataGenerator();
        }
    }
    
    /**
     * 重新初始化数据生成器
     */
    reinitializeDataGenerator() {
        // console.log('重新初始化数据生成器...');
        const generator = this.getDataGenerator();
        // console.log('当前数据生成器:', 
            // generator === globalThis.mockDataGenerator ? '基础模式' : 
            // generator === globalThis.advancedMockDataGenerator ? '高级模式' : '未知');
    }

    /**
     * 重置为默认设置
     */
    resetToDefaults() {
        this.settings = { ...this.defaultSettings };
        this.saveSettings();
    }

    /**
     * 获取数据生成器实例
     */
    getDataGenerator() {
        // 1. 从注册表中获取最新模式，默认basic
        const currentMode = this.settings.dataMode || 'basic';
        
        // 2. 从注册表中取出对应的生成器
        if (globalThis.generatorRegistry && globalThis.generatorRegistry[currentMode]) {
            return globalThis.generatorRegistry[currentMode];
        }
        
        // 3. 如果注册表不存在或模式未找到，降级处理
        console.warn(`未找到模式: ${currentMode}，降级使用 basic`);
        
        // 4. 尝试使用旧的全局对象作为后备
        if (currentMode === 'advanced' && globalThis.advancedMockDataGenerator) {
            return globalThis.advancedMockDataGenerator;
        }
        
        if (globalThis.mockDataGenerator) {
            return globalThis.mockDataGenerator;
        }
        
        // 5. 最后的降级方案
        // console.error('所有数据生成器都不可用，创建临时降级生成器');
        return {
            detectInputType: () => 'text',
            generateMockData: () => 'fallback data',
            generateMockDataWithOptions: (type, options) => 'fallback data',
            fillFormElement: (element, value) => { element.value = value; }
        };
    }

    /**
     * 检查高级模式是否可用
     */
    isAdvancedModeAvailable() {
        return typeof globalThis.advancedMockDataGenerator !== 'undefined' && 
               globalThis.advancedMockDataGenerator !== null;
    }

    /**
     * 获取填充间隔时间
     */
    getFillDelay() {
        if (!this.settings.fillInterval.enabled) {
            return 0;
        }
        
        const { min, max } = this.settings.fillInterval;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 模拟自然输入
     */
    async simulateNaturalInput(element, value) {
        // 确保值为字符串类型，避免数字类型无法正确处理
        const stringValue = String(value);
        
        if (!this.settings.naturalMode.enabled) {
            // 直接填充
            this.getDataGenerator().fillFormElement(element, stringValue);
            return;
        }

        const generator = this.getDataGenerator();
        
        // 清空当前内容
        generator.fillFormElement(element, '');
        
        // 逐个字符输入
        for (let i = 0; i < stringValue.length; i++) {
            const currentValue = stringValue.substring(0, i + 1);
            generator.fillFormElement(element, currentValue);
            
            // 计算延迟时间
            const baseDelay = 1000 / this.settings.naturalMode.typingSpeed;
            let delay = baseDelay;
            
            // 添加随机变化
            if (this.settings.naturalMode.randomPauses) {
                delay *= (0.5 + Math.random()); // 50%-150%的变化
                
                // 偶尔添加较长暂停
                if (Math.random() < 0.05) {
                    delay += Math.random() * 500;
                }
            }
            
            await this.delay(delay);
        }
    }

    /**
     * 延迟函数
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 批量填充表单（支持自然模式和间隔）
     */
    async fillFormElements(formElements, fillData) {
        const results = [];
        
        for (let i = 0; i < formElements.length; i++) {
            const item = formElements[i];
            const data = fillData[i];
            
            if (!data) continue;
            
            try {
                // 添加填充间隔
                const intervalDelay = this.getFillDelay();
                if (intervalDelay > 0) {
                    await this.delay(intervalDelay);
                }
                
                // 执行填充
                if (this.settings.naturalMode.enabled && this.settings.naturalMode.humanLike) {
                    await this.simulateNaturalInput(item.element, data.value);
                } else {
                    this.getDataGenerator().fillFormElement(item.element, data.value);
                }
                
                results.push({
                    index: i,
                    success: true,
                    element: item.element,
                    value: data.value
                });
                
            } catch (error) {
                console.error(`填充元素 ${i} 失败:`, error);
                results.push({
                    index: i,
                    success: false,
                    error: error.message,
                    element: item.element
                });
            }
        }
        
        return results;
    }

    /**
     * 设置存储变化监听
     */
    setupStorageListener() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'smartFormFillerSettings') {
                this.loadSettings();
                this.notifySettingsChanged();
            }
        });
    }

    /**
     * 通知设置变化
     */
    notifySettingsChanged() {
        // 派发自定义事件，通知其他组件设置已更新
        window.dispatchEvent(new CustomEvent('smartFormFillerSettingsChanged', {
            detail: { settings: this.settings }
        }));
    }

    /**
     * 导出设置（已隐藏）
     */
    /*
    exportSettings() {
        return JSON.stringify(this.settings, null, 2);
    }
    */

    /**
     * 导入设置（已隐藏）
     */
    /*
    importSettings(settingsJson) {
        try {
            const imported = JSON.parse(settingsJson);
            this.updateSettings(imported);
            return { success: true };
        } catch (error) {
            // console.error('导入设置失败:', error);
            return { success: false, error: error.message };
        }
    }
    */

    /**
     * 获取设置摘要
     */
    getSettingsSummary() {
        return {
            dataMode: this.settings.dataMode,
            fillInterval: this.settings.fillInterval.enabled ? 
                `${this.settings.fillInterval.min}-${this.settings.fillInterval.max}ms` : '禁用',
            naturalMode: this.settings.naturalMode.enabled ? '启用' : '禁用',
            advancedAvailable: this.isAdvancedModeAvailable()
        };
    }
}

// 创建全局设置管理器实例
if (typeof globalThis !== 'undefined') {
    globalThis.settingsManager = new SettingsManager();
}