/**
 * 智能表单数据模拟助手 - 内容脚本
 * 负责悬浮窗UI和页面表单填充逻辑
 */

// 确保SettingsManager已正确加载的安全检查
(function ensureSettingsManager() {
    // 如果SettingsManager未加载，尝试重新加载
    if (typeof globalThis.settingsManager === 'undefined' || globalThis.settingsManager === null) {
        console.warn('SettingsManager未正确加载，尝试重新初始化...');
        
        // 检查SettingsManager类是否已加载（注意：在content script中，类可能不会直接暴露给globalThis）
        // 由于manifest.json中settingsManager.js在content.js之前加载，所以应该已经可用
        try {
            if (typeof SettingsManager !== 'undefined') {
                globalThis.settingsManager = new SettingsManager();
                // console.log('SettingsManager已重新初始化');
                
                // 添加设置变化监听器
                globalThis.settingsManager.notifySettingsChanged = function() {
                    // console.log('设置已更新，重新初始化数据生成器...');
                    const generator = globalThis.settingsManager.getDataGenerator();
                    // console.log('当前数据生成器:', 
                    //         generator === globalThis.mockDataGenerator ? '基础模式' : 
                    //         generator === globalThis.advancedMockDataGenerator ? '高级模式' : '未知');
                };
            } else {
                console.warn('SettingsManager类未定义，等待manifest.json的正常加载顺序');
            }
        } catch (error) {
            console.warn('SettingsManager初始化失败，等待正常加载:', error);
        }
    }
})();

class FloatingWidget {
    constructor() {
        this.widget = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.currentData = null;
        this.init();
    }

    /**
     * 初始化悬浮窗
     */
    init() {
        // 创建悬浮窗容器
        this.widget = document.createElement('div');
        this.widget.id = 'smart-form-filler-widget';
        this.widget.innerHTML = this.getWidgetHTML();
        
        // 应用样式
        Object.assign(this.widget.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '10000',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '120px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '12px',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
        });

        // 添加到页面
        document.body.appendChild(this.widget);
        
        // 绑定事件
        this.bindEvents();
        
        // console.log('智能表单数据模拟助手悬浮窗已加载');
    }

    /**
     * 获取悬浮窗HTML结构
     */
    getWidgetHTML() {
        return `
            <div style="margin-bottom: 8px; font-weight: bold; color: #333; text-align: center;">
                智能填充
            </div>
            <div style="font-size: 10px; color: #666; text-align: center; margin-bottom: 8px;">
                当前模式: <span id="current-mode-display">检测中...</span>
            </div>
            <div style="display: flex; gap: 8px; flex-direction: column;">
                <button id="refill-btn" style="
                    padding: 6px 12px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 11px;
                    transition: background 0.3s;
                ">重新填充</button>
                <button id="repeat-btn" style="
                    padding: 6px 12px;
                    background: #2196F3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 11px;
                    transition: background 0.3s;
                ">重复填充</button>
            </div>
            <div style="
                margin-top: 8px;
                padding-top: 8px;
                border-top: 1px solid #eee;
                font-size: 10px;
                color: #666;
                text-align: center;
            ">
                拖拽移动
            </div>
        `;
    }

    /**
     * 更新模式显示
     */
    updateModeDisplay() {
        const modeDisplay = this.widget.querySelector('#current-mode-display');
        if (modeDisplay && globalThis.settingsManager) {
            const mode = globalThis.settingsManager.settings.dataMode || 'basic';
            const modeText = mode === 'basic' ? '简单模式' : '高级模式';
            const modeColor = mode === 'basic' ? '#007bff' : '#28a745';
            
            modeDisplay.textContent = modeText;
            modeDisplay.style.color = modeColor;
            modeDisplay.style.fontWeight = 'bold';
        }
    }

    /**
     * 绑定悬浮窗事件
     */
    bindEvents() {
        const refillBtn = this.widget.querySelector('#refill-btn');
        const repeatBtn = this.widget.querySelector('#repeat-btn');

        // 重新填充按钮事件
        refillBtn.addEventListener('click', () => {
            this.refillAllForms();
        });

        // 重复填充按钮事件
        repeatBtn.addEventListener('click', () => {
            this.repeatFill();
        });

        // 鼠标悬停效果
        refillBtn.addEventListener('mouseenter', () => {
            refillBtn.style.background = '#45a049';
        });
        refillBtn.addEventListener('mouseleave', () => {
            refillBtn.style.background = '#4CAF50';
        });

        repeatBtn.addEventListener('mouseenter', () => {
            repeatBtn.style.background = '#1976D2';
        });
        repeatBtn.addEventListener('mouseleave', () => {
            repeatBtn.style.background = '#2196F3';
        });

        // 拖拽功能
        this.enableDragging();
        
        // 初始更新模式显示
        this.updateModeDisplay();
    }

    /**
     * 启用拖拽功能
     */
    enableDragging() {
        this.widget.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON') return; // 按钮不触发拖拽
            
            this.isDragging = true;
            this.dragOffset.x = e.clientX - this.widget.offsetLeft;
            this.dragOffset.y = e.clientY - this.widget.offsetTop;
            
            document.addEventListener('mousemove', this.onMouseMove.bind(this));
            document.addEventListener('mouseup', this.onMouseUp.bind(this));
            
            this.widget.style.cursor = 'grabbing';
            this.widget.style.opacity = '0.8';
        });
    }

    onMouseMove(e) {
        if (!this.isDragging) return;
        
        this.widget.style.left = (e.clientX - this.dragOffset.x) + 'px';
        this.widget.style.top = (e.clientY - this.dragOffset.y) + 'px';
        this.widget.style.right = 'auto';
    }

    onMouseUp() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onMouseMove.bind(this));
        document.removeEventListener('mouseup', this.onMouseUp.bind(this));
        
        this.widget.style.cursor = 'grab';
        this.widget.style.opacity = '1';
    }

    /**
     * 检查是否有显示的dialog
     */
    hasVisibleDialog() {
        // 查找主流前端框架的dialog选择器
        const frameworkDialogs = document.querySelectorAll(`
            /* Quasar */ .q-dialog__inner:not(.q-dialog__inner--minimized),
            /* Element UI */ .el-dialog__wrapper:not([style*="display: none"]),
            /* Ant Design */ .ant-modal-root .ant-modal-wrap:not([style*="display: none"]),
            /* Bootstrap */ .modal.show, .modal.fade.show,
            /* LayUI */ .layui-layer:not([style*="display: none"]),
            /* Vuetify */ .v-dialog__container:not([style*="display: none"]),
            /* Material-UI */ .MuiModal-root:not([style*="display: none"]),
            /* PrimeVue */ .p-dialog-mask:not([style*="display: none"]),
            /* iView */ .ivu-modal-wrap:not([style*="display: none"]),
            /* Native HTML */ dialog[open],
            /* Generic */ .dialog:not([style*="display: none"]), .modal:not([style*="display: none"]),
            /* Baidu Login */ .tang-pass-pop-login, .passport-login-pop, .tang-pass-pop-login-merge, .passport-login-container
        `);
        
        const visibleDialogs = Array.from(frameworkDialogs).filter(dialog => {
            const style = window.getComputedStyle(dialog);
            // 1. 基础样式检查
            if (style.display === 'none' || style.visibility === 'hidden') {
                return false;
            }
            // dialog.offsetParent !== null; element会返回null
            
            // 2. 替代 offsetParent !== null：检查元素是否有实际的物理尺寸
            // 只要宽高都大于 0，说明它一定在屏幕上占位渲染了
            const rect = dialog.getBoundingClientRect();
            const hasSize = rect.width > 0 && rect.height > 0;
            return hasSize;
        });
        
        return visibleDialogs.length > 0;
    }

    /**
     * 获取dialog内的表单元素
     */
    getDialogFormElements() {
        const dialogElements = [];
        
        // 查找所有主流前端框架的dialog
        const allDialogs = document.querySelectorAll(`
            /* Quasar */ .q-dialog__inner:not(.q-dialog__inner--minimized),
            /* Element UI */ .el-dialog__wrapper:not([style*="display: none"]),
            /* Ant Design */ .ant-modal-root .ant-modal-wrap:not([style*="display: none"]),
            /* Bootstrap */ .modal.show, .modal.fade.show,
            /* LayUI */ .layui-layer:not([style*="display: none"]),
            /* Vuetify */ .v-dialog__container:not([style*="display: none"]),
            /* Material-UI */ .MuiModal-root:not([style*="display: none"]),
            /* PrimeVue */ .p-dialog-mask:not([style*="display: none"]),
            /* iView */ .ivu-modal-wrap:not([style*="display: none"]),
            /* Native HTML */ dialog[open],
            /* Generic */ .dialog:not([style*="display: none"]), .modal:not([style*="display: none"]),
            /* Baidu Login */ .tang-pass-pop-login, .passport-login-pop, .tang-pass-pop-login-merge, .passport-login-container
        `);
        
        allDialogs.forEach(dialog => {
            // 检查dialog是否可见
            if (!this.isElementVisible(dialog)) {
                return;
            }
            
            // 获取dialog内的表单元素
            const inputs = dialog.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="file"])');
            const textareas = dialog.querySelectorAll('textarea');
            const selects = dialog.querySelectorAll('select');
            
            const allElements = [...inputs, ...textareas, ...selects];
            const mode = globalThis.settingsManager.getDataGenerator();
            // console.log('当前模式:', mode);
            allElements.forEach((element, index) => {
                if (this.isElementVisible(element)) {
                    const type = mode.detectInputType(element);
                    dialogElements.push({
                        element: element,
                        type: type,
                        originalValue: element.value,
                        index: index,
                        isDialogElement: true,
                        dialogType: dialog.className || dialog.tagName
                    });
                }
            });
        });
        
        // console.log('dialog内的表单元素数量:', dialogElements.length, 'dialog类型:', dialogElements.map(el => el.dialogType));
        return dialogElements;
    }

    /**
     * 检查元素是否可见
     */
    isElementVisible(element) {
        if (!element) {
            return false;
        }
        
        const style = window.getComputedStyle(element);
        // 1. 基础样式检查
        if (style.display === 'none' || style.visibility === 'hidden') {
            return false;
        }
        // element.offsetParent !== null; element会返回null
        
        // 2. 替代 offsetParent !== null：检查元素是否有实际的物理尺寸
        // 只要宽高都大于 0，说明它一定在屏幕上占位渲染了
        const rect = element.getBoundingClientRect();
        const hasSize = rect.width > 0 && rect.height > 0;
        
        return hasSize;
    }

    /**
     * 检查当前是否在iframe中
     */
    isInIframe() {
        return window !== window.top;
    }

    /**
     * 获取页面中的所有iframe
     */
    getAllIframes() {
        return document.querySelectorAll('iframe');
    }

    /**
     * 向iframe发送填充数据
     */
    sendDataToIframe(iframe, data) {
        try {
            iframe.contentWindow.postMessage({
                type: 'SMART_FORM_FILL',
                action: 'FILL_ALL_FORMS',
                data: data,
                source: 'smart-form-filler'
            }, '*');
            // console.log('向iframe发送数据:', iframe.src, data);
            return true;
        } catch (error) {
            console.error('向iframe发送数据失败:', error);
            return false;
        }
    }

    /**
     * 扫描页面所有表单元素（支持iframe）
     */
    scanFormElements() {
        const formElements = [];
        // 优先检查是否有显示的dialog
        if (this.hasVisibleDialog()) {
            // console.log('检测到显示的dialog，严格只处理dialog内的表单元素');
            const dialogElements = this.getDialogFormElements();
            
            // 不再跳过iframe内的元素，因为现在支持iframe通信
            // console.log('dialog内的表单元素数量:', dialogElements.length);
            return dialogElements;
        }
        
        // 场景2：如果没有显示的dialog，检查是否在iframe中
        if (this.isInIframe()) {
            // console.log('在iframe中，扫描iframe内的表单元素');
            const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="file"])');
            const textareas = document.querySelectorAll('textarea');
            const selects = document.querySelectorAll('select');
            
            // 合并所有元素
            const allElements = [...inputs, ...textareas, ...selects];
            
            // console.log('iframe内扫描到的表单元素数量:', allElements.length);
            const mode = globalThis.settingsManager.getDataGenerator();
            // console.log('当前模式:', mode);
            
            allElements.forEach((element, index) => {
                if (this.isElementVisible(element)) {
                    // console.log(`处理iframe内第${index}个元素:`, {
                    //     id: element.id,
                    //     name: element.name,
                    //     type: element.type,
                    //     placeholder: element.placeholder,
                    //     visible: this.isElementVisible(element)
                    // });
                    
                    const type = mode.detectInputType(element);
                    formElements.push({
                        element: element,
                        type: type,
                        originalValue: element.value,
                        index: index,
                        isDialogElement: false,
                        inIframe: true
                    });
                }
            });
        } else {
            // 场景1：在主窗口且没有dialog，扫描整个页面的表单元素
            // console.log('在主窗口且没有dialog，扫描整个页面的表单元素');
            const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="file"])');
            const textareas = document.querySelectorAll('textarea');
            const selects = document.querySelectorAll('select');
            
            // 合并所有元素
            const allElements = [...inputs, ...textareas, ...selects];
            
            // console.log('扫描到的表单元素数量:', allElements.length);
            const mode = globalThis.settingsManager.getDataGenerator();
            // console.log('当前模式:', mode);
            
            allElements.forEach((element, index) => {
                // 不再跳过iframe内的元素
                if (this.isElementVisible(element)) {
                    // console.log(`处理第${index}个元素:`, {
                    //     id: element.id,
                    //     name: element.name,
                    //     type: element.type,
                    //     placeholder: element.placeholder,
                    //     visible: this.isElementVisible(element),
                    //     inIframe: element.closest('iframe') !== null
                    // });
                    
                    const type = mode.detectInputType(element);
                    formElements.push({
                        element: element,
                        type: type,
                        originalValue: element.value,
                        index: index,
                        isDialogElement: false,
                        inIframe: element.closest('iframe') !== null
                    });
                }
            });
        }
        
        // console.log('最终识别的表单元素:', formElements.map(item => ({
        //     id: item.element.id,
        //     type: item.type,
        //     elementType: item.element.type,
        //     isDialogElement: item.isDialogElement,
        //     inIframe: item.inIframe
        // })));

        
        
        return formElements;
    }

    getActiveFormElements(formElements) {
        var activeFormElements = [];
        var selectElements = [];
        for (let i = 0; i < formElements.length; i++) {
            const item = formElements[i];
            const element = item?.element; // 拿到真正的 DOM 元素
            if(item.type == 'select'){
                selectElements.push(item);
            }
            else if(this.isVivibleElement(item?.element)){
                activeFormElements.push(item);
            }
        }

        // console.log(activeFormElements)
        return {
            activeFormElements: activeFormElements,
            selectElements: selectElements
        };
    }

    isVivibleElement(element){
        // 安全检查：如果该项没有 element，或者不是真正的 DOM，直接过滤掉
        if (!element || typeof element.hasAttribute !== 'function') {
            return false;
        }
        const tagName = element.tagName;

        // 1. 处理标准表单元素
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)) {
            // 特别注意：select 元素原生没有 readOnly 属性，只有 disabled
            const isReadOnly = element.readOnly === true;
            const isDisabled = element.disabled === true;
            
            return !isReadOnly && !isDisabled;
        }

        // 2. 处理现代富文本/自定义输入框 (如 <div contenteditable="true">)
        const isEditable = element.hasAttribute('contenteditable') && 
                            element.getAttribute('contenteditable') !== 'false';
                            
        if (isEditable) {
            // 自定义组件通常通过类名（如 .is-disabled）或 aria 属性来标记禁用
            const isCustomDisabled = element.classList.contains('disabled') || 
                                    element.classList.contains('is-disabled') ||
                                    element.getAttribute('aria-disabled') === 'true';
                                    
            return !isCustomDisabled;
        }

        // 3. 既不是标准输入框也不是可编辑元素，直接过滤掉
        return false;
    }

    isPage(element){
        // 1. 获取输入框的提示词和当前值
        const placeholderText = element.placeholder || '';
        const currentValue = element.value || '';

        // 2. 获取当前输入框外层包裹容器的文本（用来抓取“每页显示”或“条/页”这种旁边的文字）
        const parentText = element.parentElement?.textContent || '';

        // 🚨 核心过滤：如果包含分页特征字眼，直接忽略
        const isPaginationText = 
            placeholderText.includes('条/页') || 
            placeholderText.toLowerCase().includes('page') ||
            currentValue.includes('条/页') ||
            parentText.includes('条/页') || 
            parentText.includes('每页');

        return isPaginationText;
    }

    /**
     * 自动处理 Element UI 下拉选择框的函数（支持单选、多选、自动收起）
     * @param {Object} item 你的 formElements 数组中的单项对象
     * @returns {Promise<void>}
     */
    handleSelectElement(item) {
        if (!item?.element || (item.element.readOnly && item.element.classList.contains('el-input__inner') == false) || item.element.disabled) return;
        
        // 1. 防重锁：防止外部方法并发重复调用
        if (item.element._isProcessing) return;

        const input = item?.element;
        const style = window.getComputedStyle(input);
        var isVisible = style.display !== 'none' && 
                style.visibility !== 'hidden' && 
                style.opacity !== '0' && 
                input.offsetHeight > 0;

        if (!isVisible || this.isPage(input)) return;
        if (!input || typeof input.hasAttribute !== 'function') return;

        // 上锁，进入处理流程
        item.element._isProcessing = true;

        // 打开下拉菜单
        input.click();
        
        setTimeout(() => {
            // 2. 获取当前层级最高、最新弹出的可见菜单
            const visibleDropdowns = Array.from(document.querySelectorAll(
                '.el-select-dropdown, .ant-select-dropdown, .arco-select-dropdown, [class*="select-dropdown"], [class*="select-menu"], [class*="dropdown-menu"]'
            )).filter(el => {
                const style = window.getComputedStyle(el);
                return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && el.offsetHeight > 0;
            });
            
            var dropdownMenu = visibleDropdowns.sort((a, b) => {
                const zA = parseInt(window.getComputedStyle(a).zIndex) || 0;
                const zB = parseInt(window.getComputedStyle(b).zIndex) || 0;
                return zA - zB;
            })[visibleDropdowns.length - 1];

            if (!dropdownMenu) {
                const dropdownId = input.getAttribute('aria-controls') || input.getAttribute('aria-owns');
                if (dropdownId) dropdownMenu = document.getElementById(dropdownId);
            }

            if (!dropdownMenu) {
                item.element._isProcessing = false; // 未找到菜单提前解锁
                return;
            }

            // 3. 跨框架识别多选模式
            const isMultiple = dropdownMenu.classList.contains('is-multiple') || 
                            dropdownMenu.classList.contains('ant-select-dropdown-multiple') ||
                            dropdownMenu.classList.contains('arco-select-dropdown-multiple') ||
                            dropdownMenu.querySelector('.el-icon-check, .anticon-check, [class*="icon-check"], [class*="-check"]') !== null;

            // 4. 获取所有可点击选项（严格过滤幽灵节点，确保元素真正有高宽）
            const options = Array.from(dropdownMenu.querySelectorAll(
                '.el-select-dropdown__item:not(.is-disabled), ' +
                '.ant-select-item-option:not(.ant-select-item-option-disabled), ' +
                '.arco-select-option:not([class*="disabled"]), ' +
                '[class*="select-item-option"]:not([class*="disabled"]), ' +
                '[class*="__item"]:not([class*="disabled"])'
            )).filter(opt => opt.offsetHeight > 0 && opt.offsetWidth > 0); // 【跨框架核心过滤】：排除不可见或尺寸为0的重叠子节点

            if (options.length === 0) {
                document.body.click();
                item.element._isProcessing = false;
                return;
            }

            let totalWaitTime = 0;

            if (isMultiple) {
                const maxSelectable = Math.min(options.length, 3); 
                const selectCount = Math.floor(Math.random() * maxSelectable) + 1; 
                const shuffled = [...options].sort(() => 0.5 - Math.random());
                const selectedOptions = shuffled.slice(0, selectCount);

                // 多选递增延迟
                selectedOptions.forEach((opt, i) => {
                    setTimeout(() => {
                        opt.click();
                    }, i * 150); 
                });
                totalWaitTime = selectCount * 150;
            } else {
                // 5. 【单选防重机制】：严格随机选一个，并通过时间戳彻底断绝任何冒泡带来的二次点击
                const randomIndex = Math.floor(Math.random() * options.length);
                const targetOption = options[randomIndex];
                
                const now = Date.now();
                // 如果这个 DOM 节点或其父节点在 200ms 内被点过，直接拦截
                if (!targetOption._lastClickedTime || (now - targetOption._lastClickedTime > 200)) {
                    targetOption._lastClickedTime = now;
                    targetOption.click();
                }
                totalWaitTime = 50; 
            }

            // 6. 统一收起与完全解锁
            setTimeout(() => {
                const menuStyle = window.getComputedStyle(dropdownMenu);
                const isMenuStillVisible = menuStyle.display !== 'none' && 
                                        menuStyle.visibility !== 'hidden' && 
                                        dropdownMenu.offsetHeight > 0;
                
                if (isMenuStillVisible) {
                    document.body.click();
                }

                // 给 UI 框架留出充足的内部状态渲染时间，随后解锁
                setTimeout(() => {
                    item.element._isProcessing = false;
                }, 300);

            }, totalWaitTime + 100);

        }, 300); 
    }

    /**
     * 重新填充所有表单（支持iframe）
    */
    async refillAllForms() {
        const elementDic = this.getActiveFormElements(this.scanFormElements());
        const formElements = elementDic.activeFormElements;
        const selectElements = elementDic.selectElements;
        const fillData = [];
        
        // console.log(`扫描到 ${formElements.length} 个表单元素，开始智能填充...`);
        
        // 分离iframe内外的元素
        const mainWindowElements = formElements.filter(item => !item.inIframe);
        const iframeElements = formElements.filter(item => item.inIframe);
        
        // console.log(`主窗口元素: ${mainWindowElements.length}, iframe元素: ${iframeElements.length}`);
        
        // 准备主窗口填充数据
        mainWindowElements.forEach(item => {
            const mockData = globalThis.settingsManager.getDataGenerator().generateMockData(item.type);
            // console.log(`主窗口元素 ${item.index} (${item.element.id}) 类型: ${item.type}, 生成数据:`, mockData);
            fillData.push({
                type: item.type,
                value: mockData,
                elementInfo: {
                    id: item.element.id,
                    name: item.element.name,
                    placeholder: item.element.placeholder
                },
                inIframe: false
            });
        });
        
        // 准备iframe填充数据
        iframeElements.forEach(item => {
            const mockData = globalThis.settingsManager.getDataGenerator().generateMockData(item.type);
            // console.log(`iframe元素 ${item.index} (${item.element.id}) 类型: ${item.type}, 生成数据:`, mockData);
            fillData.push({
                type: item.type,
                value: mockData,
                elementInfo: {
                    id: item.element.id,
                    name: item.element.name,
                    placeholder: item.element.placeholder
                },
                inIframe: true,
                iframeSrc: item.element.closest('iframe').src
            });
        });
        // todo：判断iframe是否可见
        // 处理下拉选择框
        var time = 1;
        for (let i = 0; i < selectElements.length; i++) {
            const element = selectElements[i];
            setTimeout(() => {
                this.handleSelectElement(element);
                
            }, time * 500);
            time++;
        }
        // console.log('填充数据准备完成:', fillData);
        
        // 执行主窗口批量填充
        const mainResults = await globalThis.settingsManager.fillFormElements(mainWindowElements, fillData.filter(d => !d.inIframe));
        
        // 处理iframe填充
        const iframeResults = [];
        if (iframeElements.length > 0 && !this.isInIframe()) {
            // 只在主窗口中向iframe发送数据
            const iframes = this.getAllIframes();
            // console.log(`发现 ${iframes.length} 个iframe，开始发送填充数据`);
            
            for (const iframe of iframes) {
                const iframeData = fillData.filter(d => d.inIframe && d.iframeSrc === iframe.src);
                if (iframeData.length > 0) {
                    const success = this.sendDataToIframe(iframe, iframeData);
                    iframeResults.push({
                        success: success,
                        iframeSrc: iframe.src,
                        elementCount: iframeData.length,
                        message: success ? '数据已发送到iframe' : '发送失败'
                    });
                }
            }
        }
        
        // 保存填充数据到session storage，建立索引映射
        const indexedData = {};
        formElements.forEach((item, index) => {
            if (fillData[index]) {
                indexedData[item.index] = fillData[index];
            }
        });
        this.currentData = indexedData;
        sessionStorage.setItem('smartFormFillData', JSON.stringify(indexedData));
        
        const totalSuccess = mainResults.filter(r => r.success).length + iframeResults.filter(r => r.success).length;
        this.showNotification(`成功填充了 ${totalSuccess} 个表单元素（主窗口:${mainResults.filter(r => r.success).length}, iframe:${iframeResults.filter(r => r.success).length}）`);
        
        return [...mainResults, ...iframeResults];
    }

    /**
     * 重复填充（使用上次的数据）
     */
    async repeatFill() {
        if (!this.currentData) {
            // 尝试从session storage恢复数据
            const storedData = sessionStorage.getItem('smartFormFillData');
            if (storedData) {
                this.currentData = JSON.parse(storedData);
                // console.log('从sessionStorage恢复的数据:', this.currentData);
            } else {
                this.showNotification('没有找到之前的填充数据，请先点击"重新填充"');
                return [];
            }
        }
        
        const formElements = this.scanFormElements();
        const fillData = [];
        
        // console.log('重复填充：扫描到的表单元素数量:', formElements.length);
        // console.log('重复填充：保存的数据:', this.currentData);
        
        formElements.forEach(item => {
            // 尝试通过索引匹配数据
            if (this.currentData[item.index]) {
                fillData.push({
                    type: this.currentData[item.index].type,
                    value: this.currentData[item.index].value,
                    elementInfo: this.currentData[item.index].elementInfo
                });
            } else {
                // 如果索引不匹配，尝试通过元素信息匹配（更灵活的匹配逻辑）
                const matchedData = Object.values(this.currentData).find(data => {
                    if (!data.elementInfo) return false;
                    
                    // 优先匹配id和name都相同的情况
                    if (data.elementInfo.id === item.element.id && 
                        data.elementInfo.name === item.element.name) {
                        return true;
                    }
                    
                    // 如果id相同，name为空或相同
                    if (data.elementInfo.id === item.element.id && 
                        (!data.elementInfo.name || data.elementInfo.name === item.element.name)) {
                        return true;
                    }
                    
                    // 如果name相同，id为空或相同
                    if (data.elementInfo.name === item.element.name && 
                        (!data.elementInfo.id || data.elementInfo.id === item.element.id)) {
                        return true;
                    }
                    
                    // 如果placeholder相同
                    if (data.elementInfo.placeholder === item.element.placeholder && 
                        data.elementInfo.placeholder) {
                        return true;
                    }
                    
                    return false;
                });
                
                if (matchedData) {
                    fillData.push({
                        type: matchedData.type,
                        value: matchedData.value,
                        elementInfo: matchedData.elementInfo
                    });
                }
            }
        });
        
        // console.log('重复填充数据:', fillData);
        
        if (fillData.length === 0) {
            this.showNotification('没有找到匹配的填充数据，请先点击"重新填充"');
            return [];
        }
        
        const results = await globalThis.settingsManager.fillFormElements(formElements, fillData);
        const successCount = results.filter(r => r.success).length;
        
        if (successCount === 0) {
            this.showNotification('重复填充失败，没有成功填充任何表单元素');
        } else {
            this.showNotification(`重复填充了 ${successCount} 个表单元素`);
        }
        
        return results;
    }

    /**
     * 显示通知消息
     */
    showNotification(message) {
        // 创建临时通知元素
        const notification = document.createElement('div');
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '60px',
            right: '20px',
            zIndex: '10001',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            fontSize: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // 3秒后自动消失
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * 销毁悬浮窗
     */
    destroy() {
        if (this.widget && this.widget.parentNode) {
            this.widget.parentNode.removeChild(this.widget);
        }
    }
}

// 监听来自主窗口的填充消息
window.addEventListener('message', (event) => {
    // 安全检查：验证消息来源和类型
    if (event.data && 
        event.data.source === 'smart-form-filler' && 
        event.data.type === 'SMART_FORM_FILL') {
        
        // console.log('收到填充消息:', event.data);
        
        switch (event.data.action) {
            case 'FILL_ALL_FORMS':
                // 处理批量填充
                if (event.data.data && Array.isArray(event.data.data)) {
                    handleIframeFill(event.data.data);
                }
                break;
                
            case 'FILL_SINGLE_FIELD':
                // 处理单个字段填充
                if (event.data.fieldData) {
                    handleSingleFieldFill(event.data.fieldData);
                }
                break;
        }
    }
});

/**
 * 处理iframe内的表单填充
 */
async function handleIframeFill(fillData) {
    // console.log('开始处理iframe填充数据:', fillData);
    
    // 等待依赖加载完成
    const waitForDependencies = () => {
        if (typeof globalThis.mockDataGenerator !== 'undefined' && 
            globalThis.mockDataGenerator !== null &&
            typeof globalThis.mockDataGenerator.generateMockData === 'function' &&
            typeof globalThis.settingsManager !== 'undefined' &&
            globalThis.settingsManager !== null) {
            
            // 扫描iframe内的表单元素
            const floatingWidget = new FloatingWidget();
            const formElements = floatingWidget.scanFormElements();
            
            // console.log(`iframe内扫描到 ${formElements.length} 个表单元素`);
            
            // 准备填充数据
            const iframeFillData = [];
            formElements.forEach((item, index) => {
                if (index < fillData.length) {
                    iframeFillData.push({
                        type: fillData[index].type,
                        value: fillData[index].value,
                        elementInfo: fillData[index].elementInfo
                    });
                }
            });
            
            // 执行填充
            globalThis.settingsManager.fillFormElements(formElements, iframeFillData)
                .then(results => {
                    // console.log('iframe填充完成:', results);
                    
                    // 向主窗口发送完成通知
                    if (window.parent !== window) {
                        window.parent.postMessage({
                            type: 'SMART_FORM_FILL_RESPONSE',
                            action: 'FILL_COMPLETE',
                            source: 'smart-form-filler',
                            results: results,
                            iframeUrl: window.location.href
                        }, '*');
                    }
                })
                .catch(error => {
                    console.error('iframe填充失败:', error);
                });
                
        } else {
            setTimeout(waitForDependencies, 100);
        }
    };
    
    waitForDependencies();
}

/**
 * 处理单个字段填充
 */
async function handleSingleFieldFill(fieldData) {
    // console.log('处理单个字段填充:', fieldData);
    
    // 等待依赖加载完成
    const waitForDependencies = () => {
        if (typeof globalThis.settingsManager !== 'undefined' && globalThis.settingsManager !== null) {
            
            // 查找目标元素
            const targetElement = document.querySelector(`#${fieldData.elementId}`) || 
                                document.querySelector(`[name="${fieldData.elementName}"]`) ||
                                document.activeElement;
            
            if (targetElement && 
                (targetElement.tagName === 'INPUT' || 
                 targetElement.tagName === 'TEXTAREA' || 
                 targetElement.tagName === 'SELECT')) {
                
                // 执行填充
                globalThis.settingsManager.fillFormElements([{ element: targetElement }], [{ value: fieldData.value }])
                    .then(results => {
                        // console.log('iframe单个字段填充完成:', results);
                    })
                    .catch(error => {
                        console.error('iframe单个字段填充失败:', error);
                    });
            }
                
        } else {
            setTimeout(waitForDependencies, 100);
        }
    };
    
    waitForDependencies();
}

// 页面加载完成后初始化悬浮窗
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded事件触发，开始初始化悬浮窗');
    
    // 等待MockDataGenerator和设置管理器加载完成
    const waitForDependencies = () => {
        // console.log('检查依赖状态:', {
        //     mockDataGenerator: typeof globalThis.mockDataGenerator,
        //     settingsManager: typeof globalThis.settingsManager,
        //     advancedMockDataGenerator: typeof globalThis.advancedMockDataGenerator,
        //     generatorRegistry: typeof globalThis.generatorRegistry,
        //     dynamicModeSwitcher: typeof globalThis.dynamicModeSwitcher
        // });
        
        // 关键修复：确保所有必需的依赖都已加载
        if (typeof globalThis.mockDataGenerator !== 'undefined' && 
            globalThis.mockDataGenerator !== null &&
            typeof globalThis.mockDataGenerator.generateMockData === 'function' &&
            typeof globalThis.settingsManager !== 'undefined' &&
            globalThis.settingsManager !== null &&
            typeof globalThis.generatorRegistry !== 'undefined' &&
            globalThis.generatorRegistry !== null &&
            typeof globalThis.dynamicModeSwitcher !== 'undefined' &&
            globalThis.dynamicModeSwitcher !== null) {
            
            // 额外检查：确保注册表中有基础模式和高级模式的生成器
            const hasBasicGenerator = globalThis.generatorRegistry['basic'] !== undefined;
            const hasAdvancedGenerator = globalThis.generatorRegistry['advanced'] !== undefined;
            
            // console.log('注册表检查结果:', {
            //     basic: hasBasicGenerator ? '✅ 已注册' : '❌ 未注册',
            //     advanced: hasAdvancedGenerator ? '✅ 已注册' : '❌ 未注册'
            // });
            
            if (hasBasicGenerator && hasAdvancedGenerator) {
                // 依赖已加载，初始化悬浮窗
                // console.log('所有依赖已加载，开始初始化悬浮窗');
                try {
                    globalThis.floatingWidget = new FloatingWidget();
        // console.log('智能表单数据模拟助手悬浮窗已成功初始化');
                    
                    // 通知popup插件已就绪
                    chrome.runtime.sendMessage({
                        action: 'pluginReady',
                        ready: true,
                        settings: globalThis.settingsManager.getSettingsSummary()
                    }).catch(error => {
                        // console.log('发送就绪消息失败（可能popup未打开）:', error);
                    });
                } catch (error) {
                    console.error('悬浮窗初始化失败:', error);
                }
            } else {
                // 注册表不完整，继续等待
                // console.log('注册表不完整，继续等待...');
                setTimeout(waitForDependencies, 100);
            }
        } else {
            // 等待100ms后重试，最多重试20次（总共2秒）
            // console.log('依赖未完全加载，等待重试...');
            setTimeout(waitForDependencies, 100);
        }
    };
    
    // 延迟初始化，确保页面完全加载
    setTimeout(() => {
        // console.log('开始等待依赖加载');
        waitForDependencies();
    }, 500);
});

// 监听页面变化（SPA应用）
let observer;
if (typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // 检查是否悬浮窗被移除
                const widget = document.getElementById('smart-form-filler-widget');
                if (!widget && globalThis.floatingWidget) {
                    // 重新创建悬浮窗
                    globalThis.floatingWidget = new FloatingWidget();
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FloatingWidget };
}

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('收到消息:', request.action);
    
    switch (request.action) {
        case 'checkStatus':
            // 检查插件状态
            const isReady = typeof globalThis.mockDataGenerator !== 'undefined' && 
                           globalThis.mockDataGenerator !== null &&
                           typeof globalThis.mockDataGenerator.generateMockData === 'function' &&
                           typeof globalThis.settingsManager !== 'undefined' &&
                           globalThis.settingsManager !== null;
            
            // console.log('状态检查结果:', { 
            //     ready: isReady, 
            //     mockDataGenerator: typeof globalThis.mockDataGenerator,
            //     settingsManager: typeof globalThis.settingsManager,
            //     advancedMockDataGenerator: typeof globalThis.advancedMockDataGenerator,
            //     floatingWidget: !!globalThis.floatingWidget 
            // });
            
            sendResponse({ 
                ready: isReady,
                version: '1.0.0',
                mockDataGeneratorAvailable: isReady,
                advancedMockDataGeneratorAvailable: globalThis.settingsManager?.isAdvancedModeAvailable() || false,
                settingsManagerAvailable: !!globalThis.settingsManager,
                floatingWidgetInitialized: !!globalThis.floatingWidget,
                settings: globalThis.settingsManager?.getSettingsSummary() || {}
            });
            break;
            
        case 'quickFillAll':
            // 快速填充所有表单
            try {
                if (!globalThis.floatingWidget) {
                    // console.log('悬浮窗未初始化，正在创建...');
                    globalThis.floatingWidget = new FloatingWidget();
                }
                globalThis.floatingWidget.refillAllForms().then(results => {
                    const formElements = globalThis.floatingWidget.scanFormElements();
                    sendResponse({ 
                        success: true, 
                        filledCount: results.filter(r => r.success).length,
                        totalElements: formElements.length,
                        results: results
                    });
                }).catch(error => {
                    sendResponse({ success: false, error: error.message });
                });
                return true; // 保持消息通道开放，等待异步操作完成
            } catch (error) {
                console.error('快速填充失败:', error);
                sendResponse({ success: false, error: error.message });
            }
            break;
            
        case 'repeatFill':
            // 重复填充
            try {
                if (!globalThis.floatingWidget) {
                    // console.log('悬浮窗未初始化，正在创建...');
                    globalThis.floatingWidget = new FloatingWidget();
                }
                globalThis.floatingWidget.repeatFill().then(results => {
                    const formElements = globalThis.floatingWidget.scanFormElements();
                    const filledCount = results.filter(r => r.success).length;
                    sendResponse({ 
                        success: true, 
                        filledCount: filledCount,
                        totalElements: formElements.length,
                        results: results
                    });
                }).catch(error => {
                    sendResponse({ success: false, error: error.message });
                });
                return true; // 保持消息通道开放，等待异步操作完成
            } catch (error) {
                console.error('重复填充失败:', error);
                sendResponse({ success: false, error: error.message });
            }
            break;
            
        case 'fillSelectedField':
            // 右键菜单填充选中字段
            try {
                if (!globalThis.floatingWidget) {
                    // console.log('悬浮窗未初始化，正在创建...');
                    globalThis.floatingWidget = new FloatingWidget();
                }
                
                // 获取当前选中的输入框
                let activeElement = document.activeElement;
                
                // 如果焦点元素不是表单元素，尝试查找鼠标位置附近的表单元素
                if (!activeElement || 
                    !(activeElement.tagName === 'INPUT' || 
                      activeElement.tagName === 'TEXTAREA' || 
                      activeElement.tagName === 'SELECT')) {
                    
                    // console.log('焦点元素不是表单元素，尝试查找鼠标位置附近的表单元素:', activeElement?.tagName);
                    
                    // 这里可以添加逻辑来查找鼠标位置附近的表单元素
                    // 但由于右键菜单点击时无法获取鼠标位置，我们尝试查找页面中的第一个可见表单元素
                    const visibleFormElements = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="file"]), textarea, select');
                    
                    for (const element of visibleFormElements) {
                        if (globalThis.floatingWidget.isElementVisible(element)) {
                            activeElement = element;
                            // console.log('找到可见的表单元素:', {
                            //     tagName: activeElement.tagName,
                            //     id: activeElement.id,
                            //     name: activeElement.name,
                            //     type: activeElement.type
                            // });
                            break;
                        }
                    }
                    
                    // 如果仍然没有找到合适的元素，返回错误
                    if (!activeElement || 
                        !(activeElement.tagName === 'INPUT' || 
                          activeElement.tagName === 'TEXTAREA' || 
                          activeElement.tagName === 'SELECT')) {
                        // console.error('没有找到可填充的表单元素，当前焦点元素:', document.activeElement?.tagName);
                        sendResponse({ 
                            success: false, 
                            error: '请先选中一个输入框、文本域或下拉框，或者确保页面中有可见的表单元素' 
                        });
                        return true;
                    }
                }
                
                // 检查元素是否可见（包括dialog检测）
                if (!globalThis.floatingWidget.isElementVisible(activeElement)) {
                    // console.log('元素不可见或被隐藏，跳过填充:', {
                    //     id: activeElement.id,
                    //     tagName: activeElement.tagName,
                    //     type: activeElement.type
                    // });
                    sendResponse({ 
                        success: false, 
                        error: '选中的元素不可见或被隐藏，无法填充' 
                    });
                    return true;
                }
                
                // 检查是否有显示的dialog，如果有则确保选中的元素在dialog内
                if (globalThis.floatingWidget.hasVisibleDialog()) {
                    const isInDialog = activeElement.closest(`
                        .q-dialog__inner:not(.q-dialog__inner--minimized),
                        .el-dialog__wrapper:not([style*="display: none"]),
                        .ant-modal-root .ant-modal-wrap:not([style*="display: none"]),
                        .modal.show, .modal.fade.show,
                        .layui-layer:not([style*="display: none"]),
                        .v-dialog__container:not([style*="display: none"]),
                        .MuiModal-root:not([style*="display: none"]),
                        .p-dialog-mask:not([style*="display: none"]),
                        .ivu-modal-wrap:not([style*="display: none"]),
                        dialog[open],
                        .dialog:not([style*="display: none"]), .modal:not([style*="display: none"]),
                        .tang-pass-pop-login, .passport-login-pop, .tang-pass-pop-login-merge, .passport-login-container
                    `) !== null;
                    if (!isInDialog) {
                        // console.log('检测到显示的dialog，但选中的元素不在dialog内，跳过填充');
                        sendResponse({ 
                            success: false, 
                            error: '检测到显示的dialog，请先在dialog内选择要填充的字段' 
                        });
                        return true;
                    }
                }
                
                // 检查是否在iframe内（跨域问题）
                if (activeElement.closest('iframe') !== null) {
                    // console.log('选中的元素在iframe内，跳过填充（跨域限制）');
                    sendResponse({ 
                        success: false, 
                        error: '无法填充iframe内的表单元素（跨域限制）' 
                    });
                    return true;
                }
                
                // 直接使用用户选择的类型，而不是重新检测输入框类型
                const userSelectedType = request.menuItem?.type;
                // console.log('右键菜单填充请求:', {
                //     menuItem: request.menuItem,
                //     userSelectedType: userSelectedType,
                //         activeElement: {
                //             tagName: activeElement.tagName,
                //             id: activeElement.id,
                //             name: activeElement.name,
                //             type: activeElement.type,
                //             placeholder: activeElement.placeholder,
                //             visible: globalThis.floatingWidget.isElementVisible(activeElement),
                //             inDialog: activeElement.closest(`
                //                 .q-dialog__inner:not(.q-dialog__inner--minimized),
                //                 .el-dialog__wrapper:not([style*="display: none"]),
                //                 .ant-modal-root .ant-modal-wrap:not([style*="display: none"]),
                //                 .modal.show, .modal.fade.show,
                //                 .layui-layer:not([style*="display: none"]),
                //                 .v-dialog__container:not([style*="display: none"]),
                //                 .MuiModal-root:not([style*="display: none"]),
                //                 .p-dialog-mask:not([style*="display: none"]),
                //                 .ivu-modal-wrap:not([style*="display: none"]),
                //                 dialog[open],
                //                 .dialog:not([style*="display: none"]), .modal:not([style*="display: none"]),
                //                 .tang-pass-pop-login, .passport-login-pop, .tang-pass-pop-login-merge, .passport-login-container
                //             `) !== null
                //         }
                // });
                
                if (!userSelectedType) {
                    // console.error('未获取到用户选择的类型，菜单项信息:', request.menuItem);
                    sendResponse({ 
                        success: false, 
                        error: '未获取到用户选择的类型，请检查菜单配置' 
                    });
                    return true;
                }
                
                // 生成对应的模拟数据，传递完整的menuItem配置
                const mockData = globalThis.settingsManager.getDataGenerator().generateMockDataWithOptions(
                    userSelectedType, 
                    request.menuItem
                );
                // console.log('生成的数据:', mockData, '类型:', userSelectedType, '配置:', request.menuItem);
                
                // 使用设置管理器进行填充
                globalThis.settingsManager.fillFormElements([{ element: activeElement }], [{ value: mockData }])
                    .then(results => {
                        // console.log('填充成功:', results[0]);
                        sendResponse({ 
                            success: true, 
                            message: `已填充: ${mockData}`,
                            result: results[0],
                            userSelectedType: userSelectedType,
                            generatedData: mockData
                        });
                    })
                    .catch(error => {
                        console.error('填充失败:', error);
                        sendResponse({ success: false, error: error.message });
                    });
                
                return true; // 保持消息通道开放，等待异步操作完成
            } catch (error) {
                console.error('右键填充失败:', error);
                sendResponse({ success: false, error: error.message });
            }
            break;
            
        case 'updateSettings':
            // 更新设置
            // console.log('收到updateSettings消息，开始处理...', request.settings);
            try {
                if (globalThis.settingsManager) {
                    // console.log('SettingsManager已初始化，开始更新设置');
                    globalThis.settingsManager.updateSettings(request.settings);
                    const updatedSettings = globalThis.settingsManager.getSettingsSummary();
                    // console.log('设置更新成功:', updatedSettings);
                    sendResponse({ 
                        success: true, 
                        message: '设置已更新',
                        settings: updatedSettings
                    });
                } else {
                    // console.error('SettingsManager未初始化，无法更新设置');
                    sendResponse({ success: false, error: '设置管理器未初始化' });
                }
            } catch (error) {
                console.error('更新设置失败:', error);
                sendResponse({ success: false, error: error.message });
            }
            break;
            
        case 'getSettings':
            // 获取当前设置
            try {
                if (globalThis.settingsManager) {
                    sendResponse({ 
                        success: true, 
                        settings: globalThis.settingsManager.getSettings(),
                        summary: globalThis.settingsManager.getSettingsSummary()
                    });
                } else {
                    sendResponse({ success: false, error: '设置管理器未初始化' });
                }
            } catch (error) {
                console.error('获取设置失败:', error);
                sendResponse({ success: false, error: error.message });
            }
            break;
            
        case 'SETTINGS_CHANGED':
            // 处理设置变化消息
            // console.log('收到SETTINGS_CHANGED消息，开始处理...', request.settings);
            try {
                if (globalThis.settingsManager) {
                    // console.log('SettingsManager已初始化，开始更新设置');
                    globalThis.settingsManager.updateSettings(request.settings);
                    const updatedSettings = globalThis.settingsManager.getSettingsSummary();
                    // console.log('设置更新成功:', updatedSettings);
                    
                    // 更新悬浮窗的模式显示
                    if (globalThis.floatingWidget && globalThis.floatingWidget.updateModeDisplay) {
                        globalThis.floatingWidget.updateModeDisplay();
                    }
                    
                    sendResponse({ 
                        success: true, 
                        message: '设置已更新',
                        settings: updatedSettings
                    });
                } else {
                    // console.error('SettingsManager未初始化，无法更新设置');
                    sendResponse({ success: false, error: '设置管理器未初始化' });
                }
            } catch (error) {
                console.error('更新设置失败:', error);
                sendResponse({ success: false, error: error.message });
            }
            break;
            
        default:
            sendResponse({ success: false, error: '未知操作' });
    }
    
    return true; // 保持消息通道开放，允许异步响应
});