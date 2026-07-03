/**
 * 智能表单数据模拟助手 - 后台脚本
 * 负责右键上下文菜单的创建和管理
 */

class ContextMenuManager {
    constructor() {
        this.menuItems = {};
        this.init();
    }

    /**
     * 初始化右键菜单
     */
    async init() {
        try {
            // console.log('开始初始化右键菜单...');
            
            // 先清除所有现有菜单项（避免重复创建）
            await chrome.contextMenus.removeAll();
            // console.log('已清除现有菜单项');
            
            // 创建一级菜单
            const parentId = await this.createParentMenu();
            // console.log('一级菜单创建完成:', parentId);
            
            // 创建二级菜单和三级菜单
            await this.createSubMenus(parentId);
            
            // 验证菜单创建结果
            const menuStructure = this.getMenuStructure();
            let expectedItems = 0;
            let actualItems = 0;
            
            for (const [category, subItems] of Object.entries(menuStructure)) {
                expectedItems += Object.keys(subItems).length;
            }
            
            actualItems = Object.keys(this.menuItems).length;
            
            // console.log('菜单创建验证结果:', {
            //     expectedItems: expectedItems,
            //     actualItems: actualItems,
            //     success: expectedItems === actualItems
            // });
            
            if (expectedItems === actualItems) {
                // console.log('✅ 智能表单数据模拟助手右键菜单已成功初始化');
            } else {
                // console.error('❌ 菜单创建不完整，部分菜单项可能创建失败');
                // console.log('已创建的菜单项:', Object.keys(this.menuItems));
            }
        } catch (error) {
            console.error('右键菜单初始化失败:', error);
        }
    }

    /**
     * 创建一级菜单
     */
    createParentMenu() {
        return new Promise((resolve) => {
            chrome.contextMenus.create({
                id: 'smart-form-filler',
                title: '智能模拟数据',
                contexts: ['editable'] // 只在可编辑区域显示
            }, () => {
                resolve('smart-form-filler');
            });
        });
    }

    /**
     * 创建二级和三级菜单
     */
    async createSubMenus(parentId) {
        const menuStructure = this.getMenuStructure();
        
        for (const [category, subItems] of Object.entries(menuStructure)) {
            // 创建二级菜单
            const categoryId = await this.createCategoryMenu(parentId, category);
            
            // 创建三级菜单
            for (const [itemName, itemConfig] of Object.entries(subItems)) {
                await this.createItemMenu(categoryId, itemName, itemConfig);
            }
        }
    }

    /**
     * 创建二级分类菜单
     */
    createCategoryMenu(parentId, category) {
        return new Promise((resolve) => {
            const categoryId = `category-${category}`;
            chrome.contextMenus.create({
                id: categoryId,
                parentId: parentId,
                title: category,
                contexts: ['editable']
            }, () => {
                resolve(categoryId);
            });
        });
    }

    /**
     * 创建三级具体项菜单
     */
    createItemMenu(parentId, itemName, itemConfig) {
        return new Promise((resolve) => {
            // 使用自增ID确保唯一性
            const categoryBase = parentId.replace('category-', '');
            
            // 生成基础ID
            const baseId = `item-${categoryBase}-${itemName.replace(/[^a-zA-Z0-9]/g, '')}`;
            
            // 添加自增计数器确保唯一性
            let counter = 1;
            let finalItemId = baseId;
            
            // 检查是否已存在相同ID的菜单项
            while (this.menuItems[finalItemId]) {
                finalItemId = `${baseId}-${counter}`;
                counter++;
            }
            
            // console.log('创建菜单项:', {
            //     itemId: finalItemId,
            //     parentId: parentId,
            //     itemName: itemName,
            //     itemConfig: itemConfig,
            //     counter: counter
            // });
            
            chrome.contextMenus.create({
                id: finalItemId,
                parentId: parentId,
                title: itemName,
                contexts: ['editable']
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error('创建菜单项失败:', chrome.runtime.lastError);
                } else {
                    this.menuItems[finalItemId] = itemConfig;
                    // console.log('菜单项创建成功:', finalItemId, '配置:', itemConfig);
                }
                resolve(finalItemId);
            });
        });
    }

    /**
     * 定义菜单结构（全中文界面）
     */
    getMenuStructure() {
        return {
            '姓名/名称': {
                '随机中文名': { type: 'chinese_name' },
                '随机英文名': { type: 'english_name' },
                '随机密码': { type: 'password' },
                '用户名': { type: 'username' },
            },
            '金额/价格': {
                '小金额(1w以内)': { type: 'small_price' },
                '大金额': { type: 'large_price' },
                '小数字(1w以内)': { type: 'small_number' },
                '大数字': { type: 'large_number' }
            },
            '联系方式': {
                '随机手机号': { type: 'phone' },
                '6位验证码': { type: 'captcha', length: 6 },
                '邮编': { type: 'zip_code' },
                '随机邮箱': { type: 'email' },
                '随机QQ号': { type: 'qq' },
                '随机微信号': { type: 'wechat' }
            },
            '个人相关': {
                '身份证号': { type: 'id_card' },
                '银行卡号': { type: 'bank_card' },
                '性别': { type: 'gender' },
                '年龄': { type: 'age' },
                '身高': { type: 'tall' },
                '体重': { type: 'weight' },
                '学历情况': { type: 'education' },
                '婚姻状况': { type: 'marital' },
                '毕业院校': { type: 'school' },
                '所学专业': { type: 'major' },
                '兴趣爱好': { type: 'hobby' },
                '特长技能': { type: 'specialty' }
            },
            '地址信息': {
                '详细地址': { type: 'address' },
                '省': { type: 'province' },
                '市': { type: 'city' },
                '区': { type: 'district' },
                '街道': { type: 'street' },
            },
            '时间日期': {
                '随机历史日期(过去)': { type: 'past_date' },
                '随机未来日期': { type: 'future_date' },
                '通用日期格式': { type: 'date_format' },
                '通用时间格式': { type: 'time_format' }
            },
            
            '公司职位': {
                '中文公司名': { type: 'chinese_company' },
                '英文公司名': { type: 'english_company' },
                '中文职位': { type: 'chinese_position' },
                '英文职位': { type: 'english_position' }
            },
            '描述信息': {
                '中文描述': { type: 'chinese_description' },
                '英文描述': { type: 'english_description' },
                '随机中文文本': { type: 'random_chinese_text' },
                '随机英文文本': { type: 'random_english_text' }
            },
            '系统/管理/业务': { 
                '组织角色': { type: 'role_type' },
                '业务状态': { type: 'status_type' },
                '优先级': { type: 'priority' },
                '风险级别': { type: 'risk_level' },
                '是否判定': { type: 'yes_no_type' },
                '人物关系': { type: 'relationship_type' },
                '随机网址': { type: 'url' }
            }
        };
    }

    /**
     * 处理菜单点击事件
     */
    handleMenuClick(info, tab) {
        // console.log('菜单点击事件:', {
        //     menuItemId: info.menuItemId,
        //     parentMenuItemId: info.parentMenuItemId,
        //     storedMenuItems: Object.keys(this.menuItems)
        // });
        
        // 尝试从存储的菜单项中查找
        let menuItem = this.menuItems[info.menuItemId];
        
        // 如果没有找到，可能是三级菜单，尝试通过parentId查找
        if (!menuItem && info.parentMenuItemId) {
            const parentId = info.parentMenuItemId;
            // 查找所有以parentId开头的菜单项
            for (const [itemId, itemConfig] of Object.entries(this.menuItems)) {
                if (itemId.startsWith(parentId)) {
                    menuItem = itemConfig;
                    break;
                }
            }
        }
        
        if (!menuItem) {
            // console.error('未找到对应的菜单项配置:', info.menuItemId);
            return;
        }
        
        // console.log('找到菜单项配置:', menuItem);
        
        // 执行填充操作
        this.executeFill(tab.id, info.frameId, menuItem);
    }

    /**
     * 执行数据填充
     */
    executeFill(tabId, frameId, menuItem) {
        // 向内容脚本发送消息
        chrome.tabs.sendMessage(tabId, {
            action: 'fillSelectedField',
            menuItem: menuItem,
            frameId: frameId
        }, (response) => {
            if (chrome.runtime.lastError) {
                console.error('发送消息失败:', chrome.runtime.lastError);
            } else if (response && response.success) {
                // console.log('数据填充成功');
            }
        });
    }
}

// 创建菜单管理器实例
const menuManager = new ContextMenuManager();

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    menuManager.handleMenuClick(info, tab);
});

// 插件安装时的初始化
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // console.log('智能表单数据模拟助手已安装');
        
        // 显示欢迎消息
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome.html')
        });
    } else if (details.reason === 'update') {
        // console.log('智能表单数据模拟助手已更新到版本:', chrome.runtime.getManifest().version);
    }
});

// 标签页更新时重新初始化菜单
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // 可以在这里添加标签页更新后的处理逻辑
    }
});