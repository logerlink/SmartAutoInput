/**
 * 智能表单数据模拟助手 - 工具函数库
 * 实现多分类智能模糊匹配与自动扩展功能
 * 完美兼容Vue2/Vue3/原生JS场景
 */

class MockDataGenerator {
    constructor() {
        
    }

    
    /**
     * 根据数据类型生成对应的模拟数据
     * @param {string} type - 数据类型标识
     * @returns {string} - 生成的模拟数据
     */
    generateMockData(type) {
        return this.generateMockDataWithOptions(type, {});
    }

    generateMockDataWithOptions(type, options = {}) {
        // 使用公共的
        return globalThis.commonUtils.generateMockDataWithOptions(type, options);
    }

    /**
     * 多场景兼容的表单填充方法
     * 完美适配Vue2/Vue3/原生JS场景
     * @param {HTMLElement} element - 要填充的表单元素
     * @param {string} value - 要填充的值
     */
    fillFormElement(element, value) {
        try {
            if (element.tagName === 'SELECT') {
                // 处理下拉框
                this.fillSelectElement(element, value);
            } else if (element.tagName === 'INPUT') {
                // 特殊处理复选框和单选按钮
                if (element.type === 'checkbox' || element.type === 'radio') {
                    this.fillCheckboxElement(element, value);
                } else {
                    // 处理普通输入框
                    this.fillInputElement(element, value);
                }
            } else if (element.tagName === 'TEXTAREA') {
                // 处理文本域
                this.fillInputElement(element, value);
            }
        } catch (error) {
            console.error('表单填充失败:', error);
        }
    }

    /**
     * 填充下拉框元素
     */
    fillSelectElement(select, value) {
        // 尝试通过文本匹配选择选项
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.includes(value) || select.options[i].value.includes(value)) {
                select.selectedIndex = i;
                break;
            }
        }
        
        // 派发事件确保框架响应
        select.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        select.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
    }

    /**
     * 填充复选框和单选按钮元素
     */
    fillCheckboxElement(checkbox, value) {
        // console.log('填充复选框:', { id: checkbox.id, name: checkbox.name, value: value });
        
        // 如果值为true，则勾选复选框/单选按钮
        const shouldCheck = value === true || value === 'true' || value === '1';
        
        // 方法1：直接设置checked属性
        checkbox.checked = shouldCheck;
        
        // 方法2：如果方法1无效，尝试设置defaultChecked
        checkbox.defaultChecked = shouldCheck;
        
        // 方法3：如果方法1和2都无效，尝试设置indeterminate状态
        if (shouldCheck) {
            checkbox.indeterminate = false;
        }
        
        // 方法4：尝试触发原生点击事件（模拟用户操作）
        try {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                detail: 1
            });
            checkbox.dispatchEvent(clickEvent);
        } catch (error) {
            console.warn('触发点击事件失败:', error);
        }
        
        // 方法5：派发完整的事件序列确保框架响应
        const events = ['focus', 'mousedown', 'mouseup', 'click', 'change', 'input'];
        events.forEach(eventType => {
            try {
                const event = new Event(eventType, { 
                    bubbles: true, 
                    cancelable: true,
                    composed: true 
                });
                checkbox.dispatchEvent(event);
            } catch (error) {
                console.warn(`派发${eventType}事件失败:`, error);
            }
        });
        
        // 方法6：对于某些框架，可能需要设置属性
        checkbox.setAttribute('checked', shouldCheck ? 'checked' : '');
        checkbox.setAttribute('aria-checked', shouldCheck ? 'true' : 'false');
        
        // 方法7：强制触发样式更新
        checkbox.style.display = 'none';
        checkbox.offsetHeight; // 触发重绘
        checkbox.style.display = '';
        
        // console.log('复选框填充完成，最终状态:', checkbox.checked);
    }

    /**
     * 填充输入框元素（核心兼容逻辑）
     */
    fillInputElement(input, value) {
        // 确保值为字符串类型，避免数字类型在某些框架中无法正确处理
        const stringValue = String(value);
        
        // 方法1：使用属性设置器绕过框架拦截
        try {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            if (setter) {
                setter.call(input, stringValue);
            } else {
                input.value = stringValue;
            }
        } catch (error) {
            // 备用方案：直接设置value
            input.value = stringValue;
        }

        // 方法2：依次派发关键事件，确保框架响应
        const events = ['input', 'change', 'blur'];
        events.forEach(eventType => {
            input.dispatchEvent(new Event(eventType, { 
                bubbles: true, 
                composed: true 
            }));
        });

        // 方法3：触发可能的框架特定事件
        const frameworkEvents = ['vue:input', 'vue:change', 'react:change', 'angular:input'];
        frameworkEvents.forEach(eventType => {
            try {
                input.dispatchEvent(new CustomEvent(eventType, { 
                    bubbles: true, 
                    composed: true,
                    detail: { value: value }
                }));
            } catch (e) {
                // 忽略不支持的自定义事件
            }
        });
    }
    detectInputType(element) {
        return globalThis.commonUtils.detectInputType(element);
    }
}

// 创建全局实例并注册到注册表
globalThis.generatorRegistry = globalThis.generatorRegistry || {};
globalThis.generatorRegistry['basic'] = new MockDataGenerator();

// 保持向后兼容性
globalThis.mockDataGenerator = globalThis.generatorRegistry['basic'];