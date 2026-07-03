/**
 * 智能表单数据模拟助手 - 设置页面逻辑
 */

class SettingsPage {
    constructor() {
        this.currentSettings = null;
        this.init();
    }

    /**
     * 初始化设置页面
     */
    init() {
        this.bindEvents();
        this.loadCurrentSettings();
        // 延迟更新UI，确保设置完全加载后再更新界面
        setTimeout(() => {
            this.updateUI();
            // 强制同步模式选择器状态
            this.forceSyncModeSelector();
        }, 100);
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 保存按钮
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveSettings();
        });

        // 重置按钮
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetToDefaults();
        });

        // 数据模式切换事件
        const dataModeRadios = document.getElementsByName('dataMode');
        dataModeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateRecommendationBadge();
            });
        });

        // 范围滑块事件
        this.bindRangeEvents();

        // 复选框联动
        this.bindCheckboxDependencies();
    }

    /**
     * 绑定范围滑块事件
     */
    bindRangeEvents() {
        const ranges = [
            { id: 'intervalMin', valueId: 'intervalMinValue', suffix: 'ms' },
            { id: 'intervalMax', valueId: 'intervalMaxValue', suffix: 'ms' },
            { id: 'typingSpeed', valueId: 'typingSpeedValue', suffix: ' 字符/秒' }
        ];

        ranges.forEach(range => {
            const slider = document.getElementById(range.id);
            const valueSpan = document.getElementById(range.valueId);

            if (slider && valueSpan) {
                slider.addEventListener('input', () => {
                    valueSpan.textContent = slider.value + range.suffix;
                });
            }
        });
    }

    /**
     * 绑定复选框依赖关系
     */
    bindCheckboxDependencies() {
        // 填充间隔启用状态影响范围滑块
        const enableInterval = document.getElementById('enableInterval');
        const intervalMin = document.getElementById('intervalMin');
        const intervalMax = document.getElementById('intervalMax');

        if (enableInterval && intervalMin && intervalMax) {
            enableInterval.addEventListener('change', () => {
                const disabled = !enableInterval.checked;
                intervalMin.disabled = disabled;
                intervalMax.disabled = disabled;
            });
        }

        // 自然填充启用状态影响相关设置
        const enableNaturalMode = document.getElementById('enableNaturalMode');
        const typingSpeed = document.getElementById('typingSpeed');
        const enableRandomPauses = document.getElementById('enableRandomPauses');

        if (enableNaturalMode && typingSpeed && enableRandomPauses) {
            enableNaturalMode.addEventListener('change', () => {
                const disabled = !enableNaturalMode.checked;
                typingSpeed.disabled = disabled;
                enableRandomPauses.disabled = disabled;
            });
        }
    }

    /**
     * 加载当前设置
     */
    loadCurrentSettings() {
        // 默认设置
        this.currentSettings = {
            dataMode: 'basic',
            fillInterval: {
                min: 100,
                max: 500,
                enabled: true
            },
            naturalMode: {
                enabled: true,
                humanLike: true,
                typingSpeed: 50,
                randomPauses: true
            },
            autoDetectPlaceholder: true,
            showFloatingWidget: true,
            enableContextMenu: true
        };

        // 尝试从存储加载设置
        try {
            const stored = localStorage.getItem('smartFormFillerSettings');
            if (stored) {
                const parsed = JSON.parse(stored);
                // 深度合并设置，确保所有嵌套对象都被正确合并
                this.currentSettings = this.deepMerge(this.currentSettings, parsed);
                // console.log('从localStorage加载的设置:', this.currentSettings);
            } else {
                // localStorage为空时，尝试从chrome.storage.local恢复设置（解决插件重装时的模式同步问题）
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                    chrome.storage.local.get(['smartFormFillerSettings'], (result) => {
                        if (result.smartFormFillerSettings) {
                            // console.log('从chrome.storage.local恢复设置:', result.smartFormFillerSettings);
                            // 深度合并设置
                            this.currentSettings = this.deepMerge(this.currentSettings, result.smartFormFillerSettings);
                            // 同步回localStorage
                            localStorage.setItem('smartFormFillerSettings', JSON.stringify(result.smartFormFillerSettings));
                            // 更新UI
                            this.updateUI();
                        }
                    });
                }
            }
        } catch (error) {
            console.error('加载设置失败:', error);
        }
    }

    /**
     * 深度合并对象
     */
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    // 如果是对象，递归合并
                    result[key] = this.deepMerge(result[key] || {}, source[key]);
                } else {
                    // 否则直接赋值
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }



    /**
     * 强制同步模式选择器状态
     * 解决插件重装后模式显示不一致的问题
     */
    forceSyncModeSelector() {
        const dataModeRadios = document.getElementsByName('dataMode');
        const currentMode = this.currentSettings.dataMode;
        
        // console.log('强制同步模式选择器，当前模式:', currentMode);
        
        dataModeRadios.forEach(radio => {
            radio.checked = radio.value === currentMode;
            // console.log(`  选项 ${radio.value}: ${radio.checked ? '选中' : '未选中'}`);
        });
        
        // 更新推荐标签显示
        this.updateRecommendationBadge();
    }

    /**
     * 更新UI显示
     */
    updateUI() {
        // 数据模式
        const dataModeRadios = document.getElementsByName('dataMode');
        dataModeRadios.forEach(radio => {
            radio.checked = radio.value === this.currentSettings.dataMode;
        });

        // 更新推荐标签显示
        this.updateRecommendationBadge();

        // 填充间隔
        document.getElementById('enableInterval').checked = this.currentSettings.fillInterval.enabled;
        document.getElementById('intervalMin').value = this.currentSettings.fillInterval.min;
        document.getElementById('intervalMax').value = this.currentSettings.fillInterval.max;
        document.getElementById('intervalMinValue').textContent = this.currentSettings.fillInterval.min + 'ms';
        document.getElementById('intervalMaxValue').textContent = this.currentSettings.fillInterval.max + 'ms';

        // 自然填充模式
        document.getElementById('enableNaturalMode').checked = this.currentSettings.naturalMode.enabled;
        document.getElementById('typingSpeed').value = this.currentSettings.naturalMode.typingSpeed;
        document.getElementById('typingSpeedValue').textContent = this.currentSettings.naturalMode.typingSpeed + ' 字符/秒';
        document.getElementById('enableRandomPauses').checked = this.currentSettings.naturalMode.randomPauses;

        // 其他设置
        document.getElementById('autoDetectPlaceholder').checked = this.currentSettings.autoDetectPlaceholder;
        document.getElementById('showFloatingWidget').checked = this.currentSettings.showFloatingWidget;
        document.getElementById('enableContextMenu').checked = this.currentSettings.enableContextMenu;

        // 更新控件状态
        this.updateControlStates();
    }

    /**
     * 更新推荐标签显示
     */
    updateRecommendationBadge() {
        // 获取所有推荐标签
        const basicRadio = document.querySelector('input[name="dataMode"][value="basic"]');
        const advancedRadio = document.querySelector('input[name="dataMode"][value="advanced"]');
        
        if (!basicRadio || !advancedRadio) return;
        
        const basicBadge = basicRadio.parentNode.querySelector('.feature-badge');
        const advancedBadge = advancedRadio.parentNode.querySelector('.feature-badge');
        
        // 清除所有推荐标签
        if (basicBadge) basicBadge.style.display = 'none';
        if (advancedBadge) advancedBadge.style.display = 'none';
        
        // 根据当前选中的模式显示推荐标签
        if (basicRadio.checked && basicBadge) {
            basicBadge.style.display = 'inline-block';
            basicBadge.textContent = '当前选中';
        } else if (advancedRadio.checked && advancedBadge) {
            advancedBadge.style.display = 'inline-block';
            advancedBadge.textContent = '当前选中';
        }
    }

    /**
     * 更新控件状态
     */
    updateControlStates() {
        // 填充间隔控件
        const enableInterval = document.getElementById('enableInterval');
        const intervalMin = document.getElementById('intervalMin');
        const intervalMax = document.getElementById('intervalMax');

        if (enableInterval && intervalMin && intervalMax) {
            const disabled = !enableInterval.checked;
            intervalMin.disabled = disabled;
            intervalMax.disabled = disabled;
        }

        // 自然填充控件
        const enableNaturalMode = document.getElementById('enableNaturalMode');
        const typingSpeed = document.getElementById('typingSpeed');
        const enableRandomPauses = document.getElementById('enableRandomPauses');

        if (enableNaturalMode && typingSpeed && enableRandomPauses) {
            const disabled = !enableNaturalMode.checked;
            typingSpeed.disabled = disabled;
            enableRandomPauses.disabled = disabled;
        }
    }

    /**
     * 从UI获取当前设置
     */
    getSettingsFromUI() {
        return {
            dataMode: document.querySelector('input[name="dataMode"]:checked')?.value || 'basic',
            fillInterval: {
                min: parseInt(document.getElementById('intervalMin').value) || 100,
                max: parseInt(document.getElementById('intervalMax').value) || 500,
                enabled: document.getElementById('enableInterval').checked
            },
            naturalMode: {
                enabled: document.getElementById('enableNaturalMode').checked,
                humanLike: document.getElementById('enableNaturalMode').checked,
                typingSpeed: parseInt(document.getElementById('typingSpeed').value) || 50,
                randomPauses: document.getElementById('enableRandomPauses').checked
            },
            autoDetectPlaceholder: document.getElementById('autoDetectPlaceholder').checked,
            showFloatingWidget: document.getElementById('showFloatingWidget').checked,
            enableContextMenu: document.getElementById('enableContextMenu').checked
        };
    }

    /**
     * 保存设置
     */
    saveSettings() {
        try {
            const newSettings = this.getSettingsFromUI();
            
            // 验证设置
            if (newSettings.fillInterval.min >= newSettings.fillInterval.max) {
                this.showStatus('最小间隔时间不能大于等于最大间隔时间', 'error');
                return;
            }

            // 保存到localStorage
            localStorage.setItem('smartFormFillerSettings', JSON.stringify(newSettings));
            
            // 立即更新当前设置
            this.currentSettings = newSettings;
            
            // 发送消息到所有活动标签页的内容脚本
            this.notifyContentScripts(newSettings);
            
            // 同时保存到chrome.storage.local作为备用方案
            this.saveToChromeStorage(newSettings);
            
            // 显示成功消息
            this.showStatus('✅ 设置已保存成功！', 'success');
            
            // 5秒后隐藏状态消息，给用户更长时间查看
            setTimeout(() => {
                this.hideStatus();
            }, 5000);

        } catch (error) {
            console.error('保存设置失败:', error);
            this.showStatus('保存设置失败: ' + error.message, 'error');
        }
    }

    /**
     * 通知内容脚本设置已更改
     */
    notifyContentScripts(settings) {
        if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
            // 查询所有活动标签页
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach(tab => {
                    if (tab.id) {
                        try {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "SETTINGS_CHANGED",
                                settings: settings
                            }).catch(error => {
                                // 忽略连接错误（内容脚本可能未加载）
                                if (!error.message.includes('Receiving end does not exist')) {
                                    console.warn('发送消息到标签页失败:', tab.id, error);
                                }
                            });
                        } catch (error) {
                            // 忽略发送消息时的错误
                            console.warn('无法发送消息到标签页:', tab.id, error);
                        }
                    }
                });
            });
        }
    }



    /**
     * 保存设置到chrome.storage.local
     */
    saveToChromeStorage(settings) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ smartFormFillerSettings: settings }).catch(error => {
                console.warn('保存到chrome.storage.local失败:', error);
            });
        }
    }

    /**
     * 重置为默认设置
     */
    resetToDefaults() {
        if (confirm('确定要恢复默认设置吗？')) {
            this.currentSettings = {
                dataMode: 'basic',
                fillInterval: {
                    min: 100,
                    max: 500,
                    enabled: true
                },
                naturalMode: {
                    enabled: true,
                    humanLike: true,
                    typingSpeed: 50,
                    randomPauses: true
                },
                autoDetectPlaceholder: true,
                showFloatingWidget: true,
                enableContextMenu: true
            };

            localStorage.removeItem('smartFormFillerSettings');
            this.updateUI();
            this.showStatus('已恢复默认设置', 'success');
            
            setTimeout(() => {
                this.hideStatus();
            }, 3000);
        }
    }

    /**
     * 显示状态消息
     */
    showStatus(message, type = 'success') {
        const statusEl = document.getElementById('status');
        const statusText = document.getElementById('statusText');
        
        if (statusEl && statusText) {
            statusText.textContent = message;
            statusEl.className = 'status ' + type;
            statusEl.style.display = 'block';
        }
    }

    /**
     * 隐藏状态消息
     */
    hideStatus() {
        const statusEl = document.getElementById('status');
        if (statusEl) {
            statusEl.style.display = 'none';
        }
    }

    /**
     * 导出设置（已隐藏）
     */
    /*
    exportSettings() {
        const settings = this.getSettingsFromUI();
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'smart-form-filler-settings.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }
    */

    /**
     * 导入设置（已隐藏）
     */
    /*
    importSettings(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                this.currentSettings = { ...this.currentSettings, ...imported };
                localStorage.setItem('smartFormFillerSettings', JSON.stringify(this.currentSettings));
                this.updateUI();
                this.showStatus('设置导入成功', 'success');
            } catch (error) {
                this.showStatus('导入设置失败: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    }
    */
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new SettingsPage();
});