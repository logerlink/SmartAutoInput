/**
 * 智能表单数据模拟助手 - 公共工具函数库
 * 提取自utils.js和advancedMockData.js的公共逻辑部分
 */

class CommonUtils {
    constructor() {
        // 公共常量或配置可以在这里定义
        // 中文姓名库（三字姓名占大多数，使用通用姓名）
        this.chineseNames = [
            // 两字姓名
            '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
            '刘明', '陈华', '杨光', '黄强', '林峰', '徐静', '朱婷', '马超',
            '高飞', '郑云', '冯军', '于伟', '何芳', '吕燕', '施文', '孔祥',
            '张伟', '王芳', '李娜', '刘洋', '陈明', '杨丽', '黄伟', '周强',
            '徐敏', '孙静', '马涛', '朱军', '胡强', '林娟', '郭明', '何伟',
            '高敏', '梁超', '谢芳', '唐勇', '董丽', '袁伟', '邓静',
            
            // 三字姓名（占大多数，通用姓名）
            '张小明', '李大伟', '王美丽', '赵建国', '钱学森', '孙丽华', '周志强', '吴秀兰',
            '刘德明', '陈小春', '杨玉华', '黄晓光', '林志远', '徐志国', '朱自明', '马化龙',
            '高圆圆', '郑成功', '冯小军', '于谦和', '何明亮', '吕良才', '施文华', '孔祥瑞',
            '张艺文', '王家明', '李连成', '刘青云', '陈道远', '杨丽萍', '黄波涛', '周润泽',
            '吴京华', '徐峥嵘', '孙红霞', '马伊宁', '朱一凡', '胡歌德', '林更新', '郭德明',
            '何冰雪', '高亚东', '梁朝辉', '谢霆宇', '唐嫣然', '董洁玉', '袁泉清', '邓超然',
            '张国强', '王志文', '李冰洁', '刘晓云', '陈坤明', '杨紫萱', '黄磊磊', '周迅捷',
            '吴彦斌', '徐静怡', '孙俪娜', '马思远', '朱丹丹', '胡军强', '林心如', '郭富强',
            '何家明', '高曙光', '梁家栋', '谢娜娜', '唐国强', '董璇璇', '袁弘毅', '邓伦伦',
            '张嘉文', '王凯旋', '李小璐', '刘诗雨', '陈乔安', '杨颖颖', '黄轩轩', '周杰文',
            '吴亦辰', '徐璐璐', '孙楠楠', '马天宇', '朱迅捷', '胡彦斌', '林俊杰', '郭碧云',
            '何穗穗', '高以翔', '梁静茹', '谢依霖', '唐艺昕', '董子健', '袁姗姗', '邓紫琪',
            '张一鸣', '王源源', '李易峰', '刘浩然', '陈伟霆', '杨洋洋', '黄子韬', '周冬雨',
            '吴磊磊', '徐娇娇', '孙怡怡', '马可可', '朱正廷', '胡一天', '林允儿', '郭京飞',
            '何润泽', '高伟光', '梁咏琪', '谢孟伟', '唐禹哲', '董成鹏', '袁成杰', '邓家佳',
            '张若昀', '王俊凯', '李荣浩', '刘雯雯', '陈赫赫', '杨超越', '黄景瑜', '周渝民',
            '吴尊尊', '徐海乔', '孙耀威', '马伯骞', '朱梓骁', '胡夏夏', '林宥嘉', '郭采洁',
            '何晟铭', '高瀚宇', '梁洛施', '谢楠楠', '唐诗咏', '董洁洁', '袁冰妍', '邓萃雯',
            '张钧甯', '王鸥鸥', '李沁沁', '刘亦菲', '陈妍希', '杨蓉蓉', '黄圣依', '周笔畅'
        ];
        
        // 英文姓名库（通用英文姓名）
        this.englishNames = [
            'John Smith', 'Jane Doe', 'Michael Johnson', 'Sarah Williams',
            'David Brown', 'Emily Davis', 'Robert Wilson', 'Lisa Miller',
            'James Taylor', 'Mary Anderson', 'William Thomas', 'Jennifer Moore',
            'Christopher Lee', 'Amanda White', 'Daniel Harris', 'Jessica Martin',
            'Matthew Thompson', 'Olivia Garcia', 'Andrew Martinez', 'Sophia Robinson',
            'Kevin Clark', 'Emma Rodriguez', 'Brian Lewis', 'Ashley Walker',
            'Steven Hall', 'Megan Young', 'Richard King', 'Lauren Scott',
            'Thomas Johnson', 'Susan Davis', 'Mark Wilson', 'Karen Miller',
            'Paul Taylor', 'Nancy Anderson', 'George Thomas', 'Betty Moore',
            'Edward Lee', 'Dorothy White', 'Charles Harris', 'Helen Martin',
            'Joseph Thompson', 'Margaret Garcia', 'Donald Martinez', 'Donna Robinson',
            'Ronald Clark', 'Carol Rodriguez', 'Kenneth Lewis', 'Michelle Walker',
            'Gary Hall', 'Sandra Young', 'Eric King', 'Kimberly Scott'
        ];
        
        // 省份城市库（更详细的地址数据）
        this.provinces = [
            '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省',
            '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省',
            '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省',
            '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区'
        ];
        
        this.cities = [
            // 直辖市和主要城市
            '北京市', '天津市', '上海市', '重庆市',
            '石家庄市', '太原市', '呼和浩特市', '沈阳市', '长春市', '哈尔滨市',
            '南京市', '杭州市', '合肥市', '福州市', '南昌市', '济南市', '郑州市',
            '武汉市', '长沙市', '广州市', '南宁市', '海口市', '成都市', '贵阳市',
            '昆明市', '拉萨市', '西安市', '兰州市', '西宁市', '银川市', '乌鲁木齐市'
        ];
        
        this.districts = [
            // 各区县
            '朝阳区', '海淀区', '西城区', '东城区', '丰台区', '石景山区', '通州区', '顺义区',
            '浦东新区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '黄浦区',
            '天河区', '越秀区', '荔湾区', '海珠区', '白云区', '黄埔区', '番禺区', '花都区',
            '西湖区', '上城区', '下城区', '江干区', '拱墅区', '滨江区', '萧山区', '余杭区',
            '鼓楼区', '玄武区', '秦淮区', '建邺区', '栖霞区', '雨花台区', '江宁区', '浦口区'
        ];
        
        this.streets = [
            '人民路', '解放路', '中山路', '建设路', '文化路', '科技路', '和平路', '幸福路',
            '光明路', '胜利路', '前进路', '团结路', '友谊路', '民主路', '自由路', '平等路',
            '新华路', '中华路', '长江路', '黄河路', '珠江路', '淮海路', '延安路', '北京路',
            '南京路', '上海路', '广州路', '深圳路', '杭州路', '成都路', '武汉路', '西安路'
        ];
        
        this.roadTypes = ['大道', '大街', '路', '街', '巷', '弄', '胡同', '里'];
        this.buildingNumbers = ['号', '栋', '幢', '座', '单元'];
        
        // 公司名称库
        this.companies = [
            '科技有限公司', '信息技术有限公司', '软件开发有限公司', '网络科技有限公司',
            '电子科技有限公司', '智能科技有限公司', '数据科技有限公司', '创新科技有限公司',
            '多亿科技有限公司', '肯德信息技术有限公司', '黑作软件开发有限公司', '姆超网络科技有限公司',
            '麦当电子科技有限公司', '里里智能科技有限公司', '星巴数据科技有限公司', '大洋创新科技有限公司'
        ];
    }

    /**
     * 智能获取父级元素中的label文本信息（支持多种UI框架）
     * 这个方法在utils.js和advancedMockData.js中完全相同
     */
    getParentLabelText(element) {
        // 常见UI框架的表单项选择器配置
        const formItemSelectors = [
            // Element UI
            { formItem: '.el-form-item', label: '.el-form-item__label' },
            // Ant Design
            { formItem: '.ant-form-item', label: '.ant-form-item-label' },
            // Bootstrap
            { formItem: '.form-group', label: 'label' },
            // Vuetify
            { formItem: '.v-input', label: '.v-label' },
            // Material-UI
            { formItem: '.MuiFormControl-root', label: '.MuiFormLabel-root' },
            // PrimeNG
            { formItem: '.p-field', label: 'label' },
            // Chakra UI
            { formItem: '.chakra-form-control', label: '.chakra-form__label' },
            // Tailwind CSS 常见模式
            { formItem: '[class*="form-group"]', label: 'label' }
        ];
        
        // 首先尝试UI框架特定的选择器
        for (const { formItem, label } of formItemSelectors) {
            const formItemElement = element.closest(formItem);
            if (formItemElement) {
                const labelElement = formItemElement.querySelector(label);
                if (labelElement?.textContent?.trim()) {
                    return labelElement.textContent.trim();
                }
            }
        }
        
        // 如果UI框架选择器失败，尝试通用查找策略
        const genericStrategies = [
            // 1. 查找最近的label元素
            () => {
                const label = element.closest('label');
                return label?.textContent?.trim();
            },
            // 2. 查找前一个兄弟元素中的label
            () => {
                let sibling = element.previousElementSibling;
                while (sibling) {
                    if (sibling.tagName === 'LABEL') {
                        return sibling.textContent?.trim();
                    }
                    if (sibling.querySelector('label')) {
                        return sibling.querySelector('label')?.textContent?.trim();
                    }
                    sibling = sibling.previousElementSibling;
                }
                return null;
            },
            // 3. 查找父元素中的label
            () => {
                const parentLabel = element.parentElement?.querySelector('label');
                return parentLabel?.textContent?.trim();
            },
            // 4. 向上遍历祖先元素查找包含"label"字样的元素
            () => {
                let ancestor = element.parentElement;
                while (ancestor && ancestor !== document.body) {
                    const labels = ancestor.querySelectorAll('[class*="label"], [id*="label"], [for]');
                    for (const label of labels) {
                        if (label.textContent?.trim()) {
                            return label.textContent.trim();
                        }
                    }
                    ancestor = ancestor.parentElement;
                }
                return null;
            },
            // 5. 查找包含"标题"、"名称"等文本的相邻元素
            () => {
                const siblings = [
                    element.previousElementSibling,
                    element.nextElementSibling,
                    element.parentElement?.firstElementChild,
                    element.parentElement?.lastElementChild
                ];
                
                for (const sibling of siblings) {
                    if (sibling?.textContent?.trim() && 
                        /标题|名称|标题|label|title|caption|heading/i.test(sibling.textContent)) {
                        return sibling.textContent.trim();
                    }
                }
                return null;
            }
        ];
        
        // 按顺序尝试通用策略
        for (const strategy of genericStrategies) {
            const result = strategy();
            if (result) {
                return result;
            }
        }
        
        return '';
    }

    /**
     * 通用的表单填充辅助方法
     * 支持多种表单元素类型，包括输入框、下拉框、复选框、单选按钮等
     */
    fillFormElementHelper(element, value) {
        try {
            // 确保值为字符串类型，避免数字类型在某些框架中无法正确处理
            const stringValue = String(value);
            
            if (element.tagName === 'SELECT') {
                // 处理下拉框
                for (let i = 0; i < element.options.length; i++) {
                    if (element.options[i].text.includes(stringValue) || element.options[i].value.includes(stringValue)) {
                        element.selectedIndex = i;
                        break;
                    }
                }
                element.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
            } else if (element.tagName === 'INPUT' && (element.type === 'checkbox' || element.type === 'radio')) {
                // 处理复选框和单选按钮
                const shouldCheck = value === true || value === 'true' || value === '1';
                element.checked = shouldCheck;
                element.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
                element.dispatchEvent(new Event('click', { bubbles: true, composed: true }));
            } else {
                // 处理普通输入框和文本域
                element.value = stringValue;
                ['input', 'change', 'blur'].forEach(eventType => {
                    element.dispatchEvent(new Event(eventType, { bubbles: true, composed: true }));
                });
            }
        } catch (error) {
            console.error('表单填充失败:', error);
        }
    }

    /**
     * 通用的字段类型识别方法
     * 提取自detectPlaceholderFormat和detectInputType的公共逻辑
     * @param {string} text - 要识别的文本
     * @param {boolean} isEnglishField - 是否为英文字段
     * @returns {string|null} - 识别出的字段类型，未识别返回null
     */
    detectFieldTypeByText(text, isEnglishField = false) {
    if (!text || text.trim() === '') return null;
    
    const textLower = text.toLowerCase();
    
    // ================= 1. 强特征个人隐私与账号类 =================
    if (/身份证|id.*card|identity|证件号|身份证号|公民身份|护照|驾照|驾驶证|passport|driver.*license/.test(textLower)) {
        return 'id_card';
    }
    if (/银行卡.*号|卡号|bank.*card|credit.*card|信用卡|借记卡|账户.*号|account.*no|iban|银行账户|账户/.test(textLower)) {
        return 'bank_card';
    }
    if (/微信号|微信id|wechat|wxid|wechat.*id|微信.*账号/.test(textLower)) {
        return 'wechat';
    }
    if (/qq|qq号|qq号码|腾讯qq|tencent.*qq|q号/.test(textLower)) {
        return 'qq';
    }
    if (/手机|电话|phone|mobile|tel|电话号码|手机号|手机号码|联系电话|收货人.*电话|紧急.*联系.*电话|座机|固定电话|telephone|cellphone|contact.*no/.test(textLower)) {
        return 'phone';
    }
    if (/邮箱|email|mail|电子邮箱|电子邮件|e-mail|mailbox/.test(textLower)) {
        return 'email';
    }
    if (/密码|password|pwd|pass|secret|确认.*密码|支付密码|登录密码|pin.*code/.test(textLower)) {
        return 'password';
    }
    if (/验证码|captcha|code|verify|verification|security.*code|短信验证码|动态验证码|otp|token/.test(textLower)) {
        return 'captcha';
    }

    // ================= 2. 独立抽离：具有强特征/约定俗成的业务标识（从 large_number 中解放） =================
    if (/uuid|guid/.test(textLower)) {
        return 'uuid'; // 独立类型：36位唯一标识符
    }
    if (/商品.*条码|条形码|barcode/.test(textLower)) {
        return 'barcode'; // 独立类型：通常是13位 EAN 条码
    }
    if (/sku.*id|spu.*id|sku编码|spu编码|商品.*编码/.test(textLower)) {
        return 'sku_spu'; // 独立类型：电商货品唯一代码
    }
    if (/发票.*号|发票号码|invoice.*no/.test(textLower)) {
        return 'invoice_no'; // 独立类型：发票号（国内通常为8位或20位数字）
    }
    if (/车牌|车牌号|plate.*number|车牌号码|机动车号/.test(textLower)) {
        return 'license_plate';
    }
    if (/ip地址|ip.*address|ip网段|ipv4|ipv6|主机ip/.test(textLower)) {
        return 'ip_address';
    }
    if (/物料.*编码|物料.*号|物料.*代码|货位.*编码|库位.*编码|条码.*标签|material.*no|material.*code|sku.*code/.test(textLower)) {
        return 'material_code'; // 独立类型：物料/货位专属编码（如：MAT-10023 或 LOC-A1-02）
    }
    if (/物料.*名称|物料.*品名|商品.*品名|物料.*规格|规格.*型号|specifications|material.*name/.test(textLower)) {
        return 'material_name_spec'; // 独立类型：物料名称与规格（如：不锈钢螺丝 M6*16）
    }
    if (/计量.*单位|主.*单位|库存.*单位|发料.*单位|unit.*of.*measure|uom/.test(textLower)) {
        return 'material_uom'; // 独立类型：ERP 计量单位（如：pcs, 件, 吨, 箱）
    }
    if (/仓库.*名称|库房.*名称|存储.*仓库|收货.*仓库|出库.*仓库|wh.*name|warehouse/.test(textLower)) {
        return 'warehouse_name'; // 独立类型：仓库名称（如：综合成品仓、一号原材料库）
    }
    if (/库存.*状态|质检.*状态|物料.*状态|批次.*状态|inventory.*status/.test(textLower)) {
        return 'inventory_status'; // 独立类型：仓储专用状态（如：合格、待检、不合格、冻结）
    }
    if (/货位|库位|排架|仓位|储位|storage.*location|bin.*location/.test(textLower)) {
        return 'storage_location'; // 独立类型：具体货位（如：A区03排4层02号）
    }
    if (/供应商.*名称|生产.*厂商|制造.*商|vendor.*name|supplier/.test(textLower)) {
        return 'supplier_company'; // 独立类型：工业级供应商/厂商名称
    }

    if (/车架号|vin.*码|vin|车身.*号|底盘号|chassis.*no/.test(textLower)) {
        return 'car_vin'; // 独立类型：17位国际标准车架号（VIN）
    }
    if (/发动机.*号|发动机.*编码|engine.*no|motor.*no/.test(textLower)) {
        return 'engine_no'; // 独立类型：汽车发动机号
    }
    if (/车型|车辆.*型号|汽车.*型号|维保.*车型|car.*model|vehicle.*type/.test(textLower)) {
        return 'car_model'; //独立类型：特定汽车车型（如：2024款 奔驰C200L）
    }
    if (/汽车.*厂商|汽车.*品牌|主机厂|车企|汽车.*制造|car.*brand|oem/.test(textLower)) {
        return 'car_brand'; // 独立类型：汽车品牌/厂商名称（如：比亚迪、保时捷、广汽本田）
    }
    if (/配件.*编码|配件.*号|汽配.*编码|零件.*号|part.*no|part.*code/.test(textLower)) {
        return 'car_part_code'; // 独立类型：标准汽配零件号（如：4F0-616-039）
    }
    if (/配件.*名称|汽配.*名称|零件.*名称|更换.*配件|part.*name/.test(textLower)) {
        return 'car_part_name'; // 独立类型：汽配零件名称与规格（如：前制动刹车片、机油滤清器）
    }
    if (/行驶.*里程|维保.*里程|公里数|当前.*里程|mileage|odometer/.test(textLower)) {
        return 'car_mileage'; // 独立类型：车辆行驶里程数（如：65200 km）
    }
    if (/维保.*项目|维修.*项目|保养.*项目|故障.*描述|故障.*现象|repair.*item|diagnostic/.test(textLower)) {
        return 'car_repair_item'; // 独立类型：车辆故障或维保工单项目（如：更换变速箱油、火花塞积碳清洗）
    }
    if (/车.*颜色|汽车.*颜色|车身.*颜色|车色|car.*color|vehicle.*color/.test(textLower)) {
        return 'car_color';
    }

    // ================= 3. 确定性枚举与状态属性类 =================
    if (/性别|性別|男女|gender|sex|male|female/.test(textLower)) {
        return 'gender';
    }
    if (/求职状态|求職狀態|在职状态|在職狀態|工作状态|工作狀態|job_status|employment_status|求职.*意向|离职.*状态|在校.*状态/.test(textLower)) {
        return 'job_status';
    }
    if (/状态|狀態|情况|情況|status|state|phase|stage|status_type|设备.*状态|订单.*状态|支付.*状态|状态.*开关|审核.*结果|审批.*进度/.test(textLower)) {
        return 'status_type';
    }
    if (/支付.*方式|付款方式|买单|買單|pay|payment|method|pay_method|结算.*渠道|收款.*方式|网银|微信支付|支付宝/.test(textLower)) {
        return 'payment_method';
    }
    if (/是否.*及格|是否.*同意.*条款|是否.*开通|是否.*必填|is_|是否.*启用|是否.*有效|是否.*包邮|是否.*首次|boolean|checked|switch/.test(textLower)) {
        return 'yes_no_type';
    }
    if (/与本人.*关系|家属关系|亲属关系|relationship|紧急.*联系人.*关系|亲属|家属/.test(textLower)) {
        return 'relationship_type';
    }
    if (/优先级|優先級|紧迫|紧要|程度|priority|urgency|重要性|缓急|级别/.test(textLower)) {
        return 'priority';
    }
    if (/风险|風險|危险|危險|risk|hazard|danger|risk_level|安全等级|漏洞.*级别|风控/.test(textLower)) {
        return 'risk_level';
    }
    if (/血型|blood|type|abo/.test(textLower)) {
        return 'blood_type';
    }
    if (/星座|星象|constellation|horoscope/.test(textLower)) {
        return 'constellation';
    }

    // ================= 4. 社交 / 人口普查属性类 =================
    if (/民族|族别|族別|nation/.test(textLower)) {
        return 'nation';
    }
    if (/籍贯|籍贯|老家|出生地|户籍|戶籍|native|place|常住地|祖籍|户口.*所在地/.test(textLower)) {
        return 'native';
    }
    if (/政治面貌|党派|黨派|political|party|党员|共青团员|群众/.test(textLower)) {
        return 'political';
    }
    if (/婚姻.*状态|婚姻.*狀態|婚姻|婚况|婚況|marital|status|marriage|已婚|未婚|离婚|丧偶/.test(textLower)) {
        return 'marital';
    }

    // ================= 5. 教育与职场类 =================
    if (/学历|學歷|学位|學位|文化程度|education|degree|最高学历|本科|硕士|博士|大专|高中/.test(textLower)) {
        return 'education';
    }
    if (/毕业.*学校|毕业.*學校|毕业院校|畢業院校|学校|學校|大学|大學|school|university|college|学院|中小学|机构/.test(textLower)) {
        return 'school';
    }
    if (/毕业.*专业|毕业.*專業|专业|專業|学科|學科|major|profession|discipline|研究方向/.test(textLower)) {
        return 'major';
    }
    if (/职业|occupation|job|职位|position|行业|industry|职务|job_title|角色|role|职称|部门|工种|名衔/.test(textLower)) {
        return 'job';
    }
    if (/特长|特長|技能|专长|專長|specialty|skill|ability|核心能力|掌握技术|证书/.test(textLower)) {
        return 'specialty';
    }
    if (/兴趣.*爱好|兴趣.*愛好|兴趣|興趣|爱好|愛好|嗜好|hobby|interest|休闲休闲|偏好/.test(textLower)) {
        return 'hobby';
    }

    // ================= 6. 地理与实体类 =================
    if (/公司|企业|上班地点|商户|工商|Company|企业名称|单位|组织|机构|店铺|商铺|vendor|merchant|firm/.test(textLower)) {
        return isEnglishField ? 'english_company' : 'chinese_company';
    }
    if (/地址|address|addr|location|住址|收货地址|配送地址|省市区|详细.*地址|国家|省份|城市|县区|街道|门牌号|区域|zone|region/.test(textLower)) {
        return 'address';
    }
    if (/邮政.*编码|邮政编码|zip.*code|邮编|postal.*code/.test(textLower)) {
        return 'zip_code';
    }
    if (/网址|url|website|link|链接|主页|homepage|视频.*链接|网址.*链接|域名|domain/.test(textLower)) {
        return 'url';
    }

    if (/生肖|属相|zodiac/.test(textLower)) {
        return 'zodiac_animal'; // 独立类型：可用于生成 "龙"、"虎" 等十二生肖
    }

    if (/季度|周期|quarter|period/.test(textLower)) {
        return 'quarter_period'; // 独立类型：可按您的要求生成类似 "2026Q1" 的特定格式
    }

    if (/国籍|nationality/.test(textLower)) {
        return 'nationality'; // 独立类型：可用于生成国家名称，如 "中国"、"美国"
    }
    if (/种族|ethnicity/.test(textLower)) {
        return 'ethnicity'; // 独立类型：可用于生成特定族群，如 "亚裔"、"高加索人"
    }

    if (/运动|健身|体育|项目|爱好.*运动|sport|sports|fitness|workout|exercise/.test(textLower)) {
        return 'sports_type'; // 新增类型：可用于生成 "羽毛球"、"跑步"、"游泳" 等运动项目
    }
    if (/衣服.*尺码|衣服.*尺寸|上衣.*尺码|外套.*尺码|裤子.*尺码|服装.*尺寸|clothing.*size|apparel.*size/.test(textLower)) {
        return isEnglishField ? 'english_clothing_size' : 'chinese_clothing_size'; // 独立类型：生成国际标准尺码（如 S, M, L, XL）
    }
    if (/鞋码|鞋子.*尺码|鞋号|shoe.*size|footwear.*size/.test(textLower)) {
        return isEnglishField ? 'english_shoe_size' : 'chinese_shoe_size'; // 独立类型：生成鞋码（如 38, 42 或 US 8.5）
    }

    // ================= 电商场景高频扩充：约定俗成的强特征字段 =================
    if (/快递公司|物流.*渠道|承运商|carrier|logistic.*company/.test(textLower)) {
        return 'logistic_company'; // 独立类型：生成 "顺丰速运", "中通快递" 等
    }
    if (/售后.*类型|退换.*类型|退款.*类型|after.*sales.*type/.test(textLower)) {
        return 'after_sales_type'; // 独立类型：生成 "仅退款", "退货退款", "换货"
    }
    if (/优惠券.*类型|券.*种类|coupon.*type/.test(textLower)) {
        return 'coupon_type'; // 独立类型：生成 "满减券", "折扣券", "立减券"
    }
    if (/店铺.*类型|商户.*类型|shop.*type|store.*type/.test(textLower)) {
        return 'shop_type'; // 独立类型：生成 "旗舰店", "专营店", "自营"
    }

    // ================= 7. 时间日期与经济金融类 =================
    if (/时间|date|time|生日|birthday|出生|创建|更新|发起|开始|结束|发货|签收|保修|有效|截止|时段|打卡|日程|年份|月份|日期|datetime|timestamp/.test(textLower)) {
        return 'date';
    }
    if (/金额|价格|price|amount|money|cost|fee|总金额|单价|优惠券.*金额|实付.*金额|退款.*金额|运费|预计.*预算|税率|开销|计费|充值|提现|尾款|定金|折后价|税后|薪资|工钱|salary/.test(textLower)) {
        return 'price';
    }

    // ================= 8. 数字与量化度量类 =================
    if (/年龄|age|岁数/.test(textLower)) {
        return 'age';
    }
    if (/身高|height|tall|身长/.test(textLower)) {
        return 'tall';
    }
    if (/体重|weight|磅数|公斤数/.test(textLower)) {
        return 'weight';
    }
    if (/文件大小|字节|视频大小|图片大小|存储.*容量|存储容量|运行.*内存|ram|rom|磁盘空间|size|bytes/.test(textLower)) {
        return 'large_number';
    }
    if (/编号|编号.*号|serial.*number|id.*number|订单.*编号|支付.*交易号|物流.*单号|设备.*序列号|imei|学号|工号|准考证.*号|纳税人.*识别号|合同.*号|快递单号|运单号|sn码/.test(textLower)) {
        return 'large_number'; // 各种自定义的长编号流水号
    }
    if (/数量|个数|quantity|count|number|级别|level|grade|年级|班级|考试.*座位号|考试.*时长|折扣.*比例|满意.*度.*评分|排序.*序号|屏幕.*尺寸|计数|频次|点击量|浏览量|pv|uv|天数|件数|打折|得分|score/.test(textLower)) {
        return 'small_number';
    }
    if (/代码|code|编码|coding|计划.*代码|批次|batch|客房.*代码|提取码|激活码|券码|兑换码|coupon.*code/.test(textLower)) {
        return 'code_number';
    }

    // ================= 9. 独立抽离：软硬件系统环境类（从 description 中解放） =================
    if (/操作.*系统|固件.*版本|os.*version|linux|windows|android|ios/.test(textLower)) {
        return 'os_type'; // 独立类型：生成诸如 "iOS 17.4" 或 "Ubuntu 22.04"
    }
    if (/产品.*品牌|产品.*型号|产品.*颜色|手机.*品牌|品牌.*型号|brand|model/.test(textLower)) {
        return 'device_brand'; // 独立类型：生成诸如 "Apple iPhone 15" 或 "Sony WH-1000XM4"
    }

    // ================= 10. 名字与文本泛化类（较低优先级） =================
    if (/姓名|名称|name|title|用户.*姓名|收货人.*姓名|教师.*姓名|紧急.*联系人|联系人|昵称|别名|姓名.*拼音|收款人|付款人|.*人|明星|歌手|演员|humer|star|singer|actor|alias|nickname/.test(textLower)) {
        return isEnglishField ? 'english_name' : 'chinese_name';
    }
    if (/角色|权限|權限|类型|類型|role|permission|type|role_type|群组|组织架构/.test(textLower)) {
        return 'role_type';
    }
    
    // ================= 11. 兜底描述备注类（最低优先级） =================
    if (/描述|description|desc|remark|note|备注|说明|介绍|个人.*简介|type|category|lots|网络.*制式|发票.*类型|退款.*原因|证件.*类型|行业.*类型|核心.*诉求.*意向|意见反馈|文本|详情|正文|摘要|评论|留言|content|summary|comment/.test(textLower)) {
        return isEnglishField ? 'english_description' : 'chinese_description';
    }
    
    return null;
}

    /**
     * 通用的placeholder格式检测方法
     * 提取自detectPlaceholderFormat的格式识别逻辑
     * @param {string} placeholder - placeholder文本
     * @returns {string|null} - 格式类型标识，未识别到格式返回null
     */
    detectPlaceholderFormatCommon(placeholder) {
        if (!placeholder || placeholder.trim() === '') return null;
        
        const placeholderText = placeholder.trim();
        
        // 1. 月份格式识别：YYYYMM (如202504 → 2025年04月)
        if (/^\d{6}$/.test(placeholderText) && 
            parseInt(placeholderText.substring(4, 6)) >= 1 && 
            parseInt(placeholderText.substring(4, 6)) <= 12) {
            return 'month_format';
        }
        
        // 2. 日期格式识别：YYYY-MM-DD、YYYY/MM/DD、YYYY.MM.DD
        if (/^\d{4}[-./]\d{1,2}[-./]\d{1,2}$/.test(placeholderText)) {
            return 'date_format';
        }
        
        // 3. 金额格式识别：¥1,234.56、1,234.56元、1,234.56
        if (/^[¥￥]?\d{1,3}(,\d{3})*(\.\d{1,2})?[元]?$/.test(placeholderText) ||
            /^\d{1,3}(,\d{3})*(\.\d{1,2})?[元]?$/.test(placeholderText)) {
            return 'price_format';
        }
        
        // 4. 时间格式识别：HH:mm、HH:mm:ss
        if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(placeholderText)) {
            return 'time_format';
        }
        
        // 5. 年份格式识别：YYYY年
        if (/^\d{4}年$/.test(placeholderText)) {
            return 'year_format';
        }
        
        // 6. 手机号格式识别：11位数字
        if (/^\d{11}$/.test(placeholderText)) {
            return 'phone_format';
        }
        
        // 7. 邮箱格式识别：包含@符号
        if (/^[^@]+@[^@]+\.[^@]+$/.test(placeholderText)) {
            return 'email_format';
        }
        
        // 8. 身份证格式识别：15位或18位数字
        if (/^\d{15}$|^\d{17}[\dxX]$/.test(placeholderText)) {
            return 'id_card_format';
        }
        
        return null;
    }

    /**
     * 通用的随机数生成器
     */
    getRandom() {
        return Math.random();
    }

    /**
     * 通用的随机整数生成器
     */
    getRandomInt(min, max) {
        return Math.floor(this.getRandom() * (max - min + 1)) + min;
    }

    /**
     * 从数组中随机获取元素
     */
    getRandomFromArray(array) {
        if (!array || array.length === 0) return null;
        return array[this.getRandomInt(0, array.length - 1)];
    }

    /**
     * 生成随机字符串
     */
    generateRandomString(length, includeNumbers = true, includeSymbols = false, includeLowercase = true, includeUppercase = true) {
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        let charset = '';
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;
        if (includeLowercase) charset += lowercase;
        if (includeUppercase) charset += uppercase;
        
        if (charset.length === 0) charset = lowercase + uppercase;
        
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset[this.getRandomInt(0, charset.length - 1)];
        }
        return result;
    }

    /**
     * 格式化日期为字符串
     */
    formatDate(date, format = 'yyyy-MM-dd') {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return format
            .replace('yyyy', year)
            .replace('MM', month)
            .replace('dd', day);
    }
    /**
     * 生成模拟数据（带选项） 公共
     */
    generateMockDataWithOptions(type, options = {}) {
        switch (type) {
            case 'checkbox':
                // 复选框返回true表示勾选
                return true;
            case 'radio':
                // 单选按钮返回true表示选中
                return true;
            case 'select':
                return this.generateSelect();
            case 'chinese_name':
                return this.generateChineseName();
            case 'english_name':
                return this.generateEnglishName();
            case 'small_price':
                return this.generateSmallPrice();
            case 'large_price':
                return this.generateLargePrice();
            case 'small_number':
                return this.generateSmallNumber();
            case 'large_number':
                return this.generateLargeNumber();
            case 'price':
                return this.generatePrice();
            case 'phone':
                return this.generatePhone();
            case 'captcha':
                return this.generateCaptcha(options.length);
            case 'email':
                return this.generateEmail();
            case 'qq':
                return this.generateQQ();
            case 'id_card':
                return this.generateIDCard();
            case 'address':
                return this.generateAddress();
            case 'password':
                return this.generatePassword();
            case 'date':
                return this.generateDate();
            case 'chinese_description':
                return this.generateChineseDescription();
            case 'english_description':
                return this.generateEnglishDescription();
            case 'chinese_company':
                return this.generateCompanyName(false);
            case 'english_company':
                return this.generateCompanyName(true);
            case 'chinese_position':
                return this.generatePosition(false);
            case 'english_position':
                return this.generatePosition(true);
            case 'url':
                return this.generateURL();
            case 'random_chinese_text':
                return this.generateRandomChineseText();
            case 'random_english_text':
                return this.generateRandomEnglishText();
            // 新增：placeholder格式类型
            case 'month_format':
                return this.generateMonthFormat();
            case 'date_format':
                return this.generateDateFormat();
            case 'price_format':
                return this.generatePriceFormat();
            case 'time_format':
                return this.generateTimeFormat();
            case 'year_format':
                return this.generateYearFormat();
            case 'phone_format':
                return this.generatePhone();
            case 'email_format':
                return this.generateEmail();
            case 'id_card_format':
                return this.generateIDCard();
            // 新增：高级模式兼容类型
            case 'username':
                return this.generateUsername();
            case 'zip_code':
                return this.generateZipCode();
            case 'age':
                return this.generateAge();
            case 'gender':
                return this.generateGender();
            case 'tall':
                return this.generateTall();
            case 'weight':
                return this.generateWeight();
            // 新增：省市街道区类型
            case 'province':
                return this.generateProvince();
            case 'city':
                return this.generateCity();
            case 'district':
                return this.generateDistrict();
            case 'street':
                return this.generateStreet();
            // 新增：日期类型
            case 'past_date':
                return this.generatePastDate();
            case 'future_date':
                return this.generateFutureDate();
            case 'wechat':
                return this.generateWechat();
            case 'license_plate':
                return this.generateLicensePlate();
            case 'ip_address':
                return this.generateIpAddress();    
            case 'uuid':
                return this.generateUuid();
            case 'barcode':
                return this.generateBarcode();
            case 'sku_spu':
                return this.generateSkuSpu();
            case 'invoice_no':
                return this.generateInvoiceNo();
            case 'os_type':
                return this.generateOsType();
            case 'device_brand':
                return this.generateDeviceBrand();
            case 'zodiac_animal':
                return this.generateZodiacAnimal();
            case 'quarter_period':
                return this.generateQuarterPeriod();
            case 'nationality':
                return this.generateNationality();
            case 'ethnicity':
                return this.generateEthnicity();
            case 'sports_type':
                return this.generateSportsType();
             case 'chinese_clothing_size':
                return this.generateClothingSize(false);
            case 'chinese_shoe_size':
                return this.generateShoeSize(false);
            case 'english_clothing_size':
                return this.generateClothingSize(true);
            case 'english_shoe_size':
                return this.generateShoeSize(true);
            case 'logistic_company':
                return this.generateLogisticCompany();
            case 'after_sales_type':
                return this.generateAfterSalesType();
            case 'coupon_type':
                return this.generateCouponType();
            case 'shop_type':
                return this.generateShopType();
            case 'material_code':
                return this.generateMaterialCode();
            case 'material_name_spec':
                return this.generateMaterialNameSpec();
            case 'material_uom':
                return this.generateMaterialUom();
            case 'warehouse_name':
                return this.generateWarehouseName();
            case 'inventory_status':
                return this.generateInventoryStatus();
            case 'storage_location':
                return this.generateStorageLocation();
            case 'supplier_company':
                return this.generateSupplierCompany();
            case 'car_vin':
                return this.generateCarVin();
            case 'engine_no':
                return this.generateEngineNo();
            case 'car_model':
                return this.generateCarModel();
            case 'car_brand':
                return this.generateCarBrand();
            case 'car_part_code':
                return this.generateCarPartCode();
            case 'car_part_name':
                return this.generateCarPartName();
            case 'car_mileage':
                return this.generateCarMileage();
            case 'car_repair_item':
                return this.generateCarRepairItem();
            case 'car_color':
                return this.generateCarColor();
            // 新增：存储容量、职位、编码、银行卡类型
            case 'byte_number':
                return this.generateByteNumber();
            case 'job':
                return this.generateJob();
            case 'job_status': {
                const a = ['在职-暂无跳槽意向', '在职-急寻新机会', '离职-随时到岗', '在校应届生', '自由职业者', '创业中', '退休', '待业/正在寻找新方向'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'code_number':
                return this.generateCodeNumber();
            case 'bank_card':
                return this.generateBankCard();
            // 新增：状态类型、支付方式、是否类型、关系类型
            case 'status_type':{
                const a = ['未完成', '进行中', '已完成', '已取消', '未知'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'nation': { // 56个民族精选
                const a = ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族', '黎族', '高山族', '畲族', '高山族', '拉祜族', '水族'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'native': { // 籍贯
                const a = ['北京市', '上海市', '天津市', '重庆市', '广东省广州市', '广东省深圳市', '浙江省杭州市', '江苏省南京市', '江苏省苏州市', '山东省青岛市', '四川省成都市', '湖北省武汉市', '陕西省西安市', '福建省厦门市', '湖南省长沙市', '河南省郑州市', '辽宁省大连市', '安徽省合肥市'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'political': { // 政治面貌
                const a = ['中共党员', '中共预备党员', '共青团员', '群众', '无党派民主人士', '其他'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'marital': { // 婚姻状况
                const a = ['未婚', '已婚', '离异', '丧偶', '再婚', '分居', '恋爱中', '不便透露'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'blood_type': { // 血型
                const a = ['A型', 'B型', 'AB型', 'O型', 'AB型'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'school': { // 知名高校扩充
                const a = ['清华大学', '北京大学', '复旦大学', '上海交通大学', '浙江大学', '南京大学', '中国科学技术大学', '华中科技大学', '武汉大学', '西安交通大学', '中山大学', '四川大学', '哈尔滨工业大学', '同济大学', '北京航空航天大学', '南开大学', '厦门大学', '山东大学', '吉林大学', '东南大学'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'major': { // 热门专业扩充
                const a = ['计算机科学与技术', '软件工程', '人工智能', '数据科学与大数据技术', '工商管理', '金融学', '经济学', '机械工程', '自动化', '汉语言文学', '英语', '法学', '临床医学', '土木工程', '电子信息工程', '通信工程', '环境科学', '新闻学', '数字媒体技术', '统计学'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'hobby': { // 兴趣爱好扩充
                const a = ['篮球', '足球', '羽毛球', '网球', '游泳', '健身', '跑步', '摄影', '旅游', '徒步', '看电影', '听音乐', '吉他', '钢琴', '玩游戏', '看书', '写作', '烹饪', '烘焙', '手工DIY', '画画', '跳舞', '剧本杀', '钓鱼', '露营', '乐高'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'specialty': { // 特长技能扩充
                const a = ['全栈开发', '视频剪辑与特效', '熟练UI设计', '擅长公众演讲', '英语同声传译', '日语N1', '钢琴十级', '高级数据分析', '精通高并发架构', '擅长文案策划', '危机公关处理', '熟练掌握三维建模', '速读与快速记忆', '精通跨境电商运营', '擅长团队组织协调'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'education': {
                const a = ['博士后', '博士', '硕士', '本科（双一流）', '本科（一本）', '本科（二本）', '大专', '高职/非全日制', '高中', '中专/职高', '初中及以下'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'role_type': {
                const a = ['超级管理员', '系统管理员', '运营总监', '普通运营', '财务总监', '出纳/财务人员', '技术负责人', '开发工程师', '测试工程师', '产品经理', '客服主管', '普通客服', '普通用户', 'VIP会员', '访客'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'priority': {
                const a = ['P0-紧急致命', 'P1-高优先级', 'P2-正常处理', 'P3-低优先级', 'P4-优化建议', '最高级', '次高级', '普通', '较低'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'risk_level': {
                const a = ['极高风险', '高风险', '中风险', '低风险', '零风险', '安全安全', '核心监控中', '合规豁免'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'constellation': {
                const a = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
                return a[Math.floor(Math.random() * a.length)];
            }
            case 'payment_method':
                {
                    const a = ['银行卡', '支付宝', '微信', '现金', '信用卡', '其他'];
                    return a[Math.floor(Math.random() * a.length)];
                }
            case 'yes_no_type':
                return Math.random() > 0.5 ? '是' : '否';
            case 'relationship_type':
                {
                    const a = ['父亲', '母亲', '配偶', '子女', '兄弟姐妹', '朋友', '同事', '其他'];
                return a[Math.floor(Math.random() * a.length)];
                }
            default:
                return this.generateRandomChineseText();
        }
    }
    /**
     * 获取元素类型
     */
    getElementType(element){
        // 特殊处理：如果是复选框或单选按钮，直接返回对应类型
        if (!element || typeof element.hasAttribute !== 'function') return 'unknown';

        // 1. 特殊处理：如果是复选框或单选按钮，直接返回对应类型
        if (element.type === 'checkbox' || element.tagName === 'CHECKBOX') {
            return 'checkbox';
        }
        if (element.type === 'radio' || element.tagName === 'RADIO') {
            return 'radio';
        }

        // 2. 判断原生 HTML 下拉框
        if (element.tagName === 'SELECT') {
            return 'select';
        } 

        // 3. 判断所有主流框架魔改的下拉框
        if (element.tagName === 'INPUT') {
            const className = element.className || '';
            const placeholderText = element.placeholder || '';

            // 兼容 Element、AntD、Arco Design 等多选框内部的活动 input
            const isInputItselfSelect = className.includes('select__input') || 
                                        className.includes('selection-search') || 
                                        className.includes('select-search');

            // 精准匹配常见框架外壳：.el-select, .ant-select, .arco-select, .form-select, .v-select
            const isFrameworkSelectContainer = element.closest(
                '.el-select, .ant-select, .arco-select, .form-select, .v-select, [class*="-select"]'
            ) !== null;

            // 🌟 特征 C：行为特征降级兜底
            // 只要是只读输入框，且提示词包含“选择”、“请选”或英文“select”
            const hasSelectBehavior = element.readOnly && 
                (placeholderText.includes('选') || placeholderText.toLowerCase().includes('select'));

            // 三者满足其一，它就是 100% 的下拉框类型
            if (isInputItselfSelect || isFrameworkSelectContainer || hasSelectBehavior) {
                return 'select';
            }
        }

        // 第一步：根据输入类型属性检测（最高优先级）
        const inputType = element.type ? element.type.toLowerCase() : '';
        switch (inputType) {
            case 'email': return 'email';
            case 'tel': case 'phone': return 'phone';
            case 'password': return 'password';
            case 'date': case 'datetime': case 'datetime-local': return 'date';
            case 'number': case 'range': return 'price';
            case 'url': return 'url';
        }
        return '';
    }

    getControlRoot(element) {
            if (!element) return null;

            return element.closest(
                [
                    // Element
                    '.el-select',
                    '.el-input',
                    '.el-cascader',

                    // Ant
                    '.ant-select',
                    '.ant-input',
                    '.ant-picker',

                    // Arco
                    '.arco-select',
                    '.arco-input',

                    // Naive UI
                    '.n-select',
                    '.n-input',

                    // fallback
                    '[class*="select"]',
                    '[class*="input"]',
                    '[class*="picker"]'
                ].join(',')
            );
        }


    // #region Mock 生成函数

    /**
     * 智能模糊匹配 - 根据输入框属性推断数据类型
     * 使用公共工具库中的方法，避免重复代码
     * @param {HTMLElement} element - 输入框元素
     * @returns {string} - 数据类型标识
     */
    detectInputType(element) {
        var type = this.getElementType(element)
        if(type !== '') return type;
        
        // 第一步：构建字段文本信息
        let fieldText = (element.id + ' ' + element.name + ' ' + 
                        (element.labels ? Array.from(element.labels).map(label => label.textContent).join(' ') : '')).toLowerCase();
        
        // 增强：智能获取父级元素中的label文本信息
        const parentLabels = this.getParentLabelText(element);
        if (parentLabels) {
            fieldText += ' ' + parentLabels.toLowerCase();
        }
        
        // 检查是否为英文字段
        const isEnglishField = /[a-zA-Z]/.test(fieldText) && !/[\u4e00-\u9fff]/.test(fieldText);
        
        // 第二步：使用公共工具库进行字段类型识别（最高优先级）
        const fieldType = globalThis.commonUtils.detectFieldTypeByText(fieldText, isEnglishField);
        if (fieldType) {
            return fieldType;
        }
        
        // 第三步：检查placeholder中的格式模式（中优先级）
        if (element.placeholder) {
            const placeholderFormatType = this.detectPlaceholderFormat(element.placeholder);
            if (placeholderFormatType) {
                return placeholderFormatType;
            }
        }
        
        // 第四步：根据输入框格式特征匹配（中优先级）
        if (element.maxLength && element.maxLength <= 6) {
            return 'captcha';
        }
        if (element.maxLength && element.maxLength <= 11 && /phone|mobile|tel/.test(fieldText)) {
            return 'phone';
        }
        if (element.maxLength && element.maxLength <= 25 && /email|mail/.test(fieldText)) {
            return 'email';
        }
        if (element.maxLength && element.maxLength <= 20 && /code|verify|captcha/.test(fieldText)) {
            return 'captcha';
        }
        if (element.maxLength && element.maxLength <= 128 && /password|pwd/.test(fieldText)) {
            return 'password';
        }
        
        // 第五步：结合placeholder的通用关键词匹配（低优先级）
        const combinedText = fieldText + (element.placeholder ? ' ' + element.placeholder.toLowerCase() : '');
        const combinedType = globalThis.commonUtils.detectFieldTypeByText(combinedText, isEnglishField);
        if (combinedType) {
            return combinedType;
        }
        
        // 第六步：兜底策略 - 随机文本
        return isEnglishField ? 'random_english_text' : 'random_chinese_text';
    }

    /**
     * 检测placeholder中的格式模式
     * 使用公共工具库中的方法，避免重复代码
     * @param {string} placeholder - placeholder文本
     * @returns {string|null} - 格式类型标识，未识别到格式返回null
     */
    detectPlaceholderFormat(placeholder) {
        if (!placeholder || placeholder.trim() === '') {
            return null;
        }
        
        const placeholderText = placeholder.trim();
        const placeholderLower = placeholderText.toLowerCase();
        
        // 第一步：使用公共工具库检测字段类型
        const fieldType = globalThis.commonUtils.detectFieldTypeByText(placeholderLower);
        if (fieldType) {
            return fieldType;
        }
        
        // 第二步：使用公共工具库检测placeholder格式
        const formatType = globalThis.commonUtils.detectPlaceholderFormatCommon(placeholderText);
        if (formatType) {
            return formatType;
        }
        
        // 第三步：特殊处理用户名匹配（不在公共逻辑中）
        if (/用户名|账号|account|login.*name|user.*id/.test(placeholderLower)) {
            return 'username';
        }
        
        return null;
    }

    /**
     * 生成随机中文姓名
     */
    generateChineseName() {
        return this.chineseNames[Math.floor(Math.random() * this.chineseNames.length)];
    }

    /**
     * 生成随机英文姓名
     */
    generateEnglishName() {
        return this.englishNames[Math.floor(Math.random() * this.englishNames.length)];
    }

    /**
     * 生成随机金额
     */
    generatePrice() {
        return (Math.random() * 10000 + 1).toFixed(2);
    }

    generateSmallPrice() {
        return (Math.random() * 5000).toFixed(2);
    }

    generateLargePrice() {
        return (Math.random() * 1000000 + 10000).toFixed(2);
    }

    generateSmallNumber() {
        return Math.floor(Math.random() * 10000) + 1;
    }

    generateLargeNumber() {
        return Math.floor(Math.random() * 999999999) + 10000;
    }

    /**
     * 生成随机手机号
     */
    generatePhone() {
        const prefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139',
                         '150', '151', '152', '153', '155', '156', '157', '158', '159',
                         '180', '181', '182', '183', '184', '185', '186', '187', '188', '189'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = Math.random().toString().substring(2, 11);
        return prefix + suffix.substring(0, 8);
    }

    /**
     * 生成验证码
     */
    generateCaptcha(length = 6) {
        // 确保length是有效的数字
        const validLength = parseInt(length) || 6;
        // 限制length在合理范围内（1-20位）
        const safeLength = Math.max(1, Math.min(20, validLength));
        return Math.random().toString().substring(2, 2 + safeLength);
    }

    /**
     * 生成邮箱地址
     */
    generateEmail() {
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'qq.com'];
        const names = ['john', 'jane', 'mike', 'sarah', 'david', 'emily', 'robert', 'lisa'];
        const name = names[Math.floor(Math.random() * names.length)];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${name}${Math.floor(Math.random() * 1000)}@${domain}`;
    }

    /**
     * 生成QQ号
     */
    generateQQ() {
        return Math.floor(Math.random() * 9000000000 + 10000).toString();
    }

    /**
     * 生成身份证号（支持18位和15位格式）
     */
    generateIDCard() {
        // 常见地区码（前6位）
        const areaCodes = [
            '110101', '110102', '110105', '110106', // 北京
            '310101', '310104', '310105', '310106', // 上海
            '440103', '440104', '440105', '440106', // 广州
            '440304', '440305', '440306', '440307', // 深圳
            '330102', '330103', '330104', '330105', // 杭州
            '320102', '320104', '320105', '320111', // 南京
            '510104', '510105', '510106', '510107', // 成都
            '420102', '420103', '420104', '420105', // 武汉
            '610102', '610103', '610104', '610112', // 西安
            '500101', '500102', '500103', '500104'  // 重庆
        ];
        
        // 随机选择地区码
        const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
        
        // 生成随机出生日期（1950年-2005年出生）
        const birthYear = Math.floor(Math.random() * 55) + 1950;
        const birthMonth = Math.floor(Math.random() * 12) + 1;
        const birthDay = Math.floor(Math.random() * 28) + 1; // 避免2月31日问题
        
        const birthDate = `${birthYear}${birthMonth.toString().padStart(2, '0')}${birthDay.toString().padStart(2, '0')}`;
        
        // 随机顺序号（3位）
        const randomNum = Math.floor(Math.random() * 998) + 1;
        const sequenceCode = randomNum.toString().padStart(3, '0');
        
        // 生成17位号码（前17位）
        const baseCode = areaCode + birthDate + sequenceCode;
        
        // 计算校验码（第18位）
        const checkCode = this.calculateIDCardCheckCode(baseCode);
        
        // 随机选择生成18位或15位身份证号
        if (Math.random() > 0.1) {
            // 18位身份证号
            return baseCode + checkCode;
        } else {
            // 15位身份证号（去掉年份的前两位和校验码）
            return areaCode + birthDate.substring(2) + sequenceCode;
        }
    }
    
    /**
     * 计算身份证校验码
     */
    calculateIDCardCheckCode(baseCode) {
        // 权重系数
        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // 校验码对应表
        const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += parseInt(baseCode.charAt(i)) * weights[i];
        }
        
        const mod = sum % 11;
        return checkCodes[mod];
    }

    /**
     * 生成详细地址（省市区街道门牌号）
     */
    generateAddress() {
        const province = this.provinces[Math.floor(Math.random() * this.provinces.length)];
        const city = this.cities[Math.floor(Math.random() * this.cities.length)];
        const district = this.districts[Math.floor(Math.random() * this.districts.length)];
        const street = this.streets[Math.floor(Math.random() * this.streets.length)];
        const roadType = this.roadTypes[Math.floor(Math.random() * this.roadTypes.length)];
        const buildingNumber = this.buildingNumbers[Math.floor(Math.random() * this.buildingNumbers.length)];
        const number = Math.floor(Math.random() * 200) + 1;
        
        // 随机选择地址格式
        const formats = [
            `${province}${city}${district}${street}${roadType}${number}${buildingNumber}`,
            `${province}${city}${district}${street}${number}${buildingNumber}`,
            `${city}${district}${street}${roadType}${number}${buildingNumber}`,
            `${province}${city}${street}${number}${buildingNumber}`,
            `${city}${district}${street}${number}${buildingNumber}`
        ];
        
        return formats[Math.floor(Math.random() * formats.length)];
    }

    /**
     * 生成随机密码
     */
    generatePassword(length = 12) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    /**
     * 生成随机日期（当前日期前20年到后20年范围）
     */
    generateDate() {
        const currentDate = new Date();
        const start = new Date(currentDate.getFullYear() - 20, 0, 1);
        const end = new Date(currentDate.getFullYear() + 20, 11, 31);
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    }

    /**
     * 生成中文描述文本
     */
    generateChineseDescription() {
        const words = ['这是一个', '测试用的', '随机生成的', '描述文本', '用于前端', '表单测试', '功能验证', '数据填充'];
        const length = Math.floor(Math.random() * 15) + 5;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += words[Math.floor(Math.random() * words.length)];
        }
        return result;
    }

    /**
     * 生成英文描述文本
     */
    generateEnglishDescription() {
        const sentences = [
            'This is a test description for form filling and validation purposes.',
            'Sample text used for automated form data generation and testing.',
            'Generated description content for frontend development testing.',
            'Mock data description used in form validation scenarios.',
            'Automated test description for user interface form filling.',
            'Random generated English text for form automation testing.',
            'Description content for smart form data filling functionality.',
            'Testing description used in web form validation processes.',
            'Automated description generation for form completion testing.',
            'Sample description text for frontend form validation testing.'
        ];
        return sentences[Math.floor(Math.random() * sentences.length)];
    }

    /**
     * 生成公司名称
     */
    generateCompanyName(isEnglish = false) {
        if (isEnglish) {
            const companies = [
                'Tech Solutions Inc.',
                'Software Development Co.',
                'Data Analytics Corporation',
                'Network Systems Ltd.',
                'Information Technology Group',
                'Smart Innovations LLC',
                'Innovative Technologies Corp.',
                'Digital Solutions Company',
                'Web Development Partners',
                'Mobile Applications Inc.'
            ];
            return companies[Math.floor(Math.random() * companies.length)];
        } else {
            const prefixes = ['北京', '上海', '广州', '深圳', '杭州', '南京'];
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const company = this.companies[Math.floor(Math.random() * this.companies.length)];
            return prefix + company;
        }
    }
    /**
     * 生成职位名称
     */
    generatePosition(isEnglish = false) {
        const positions = isEnglish ? 
            [
                'Software Engineer',
                'Product Manager', 
                'UX Designer',
                'Data Analyst',
                'Project Manager',
                'Frontend Developer',
                'Backend Developer',
                'Full Stack Developer',
                'DevOps Engineer',
                'QA Engineer'
            ] :
            ['软件工程师', '产品经理', 'UI设计师', '数据分析师', '项目经理'];
        return positions[Math.floor(Math.random() * positions.length)];
    }

    /**
     * 生成网址
     */
    generateURL() {
        const domains = ['example.com', 'test-site.org', 'demo-app.net', 'mock-data.tech'];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `https://www.${domain}`;
    }

    /**
     * 生成随机中文文本（从预定义短语列表中选择）
     */
    generateRandomChineseText() {
        const phrases = [
            '这是一个测试文本',
            '用于表单数据填充',
            '随机生成的中文内容',
            '测试用的描述信息',
            '自动填充的示例文本',
            '表单验证测试数据',
            '智能填充功能演示',
            '前端开发测试用例',
            '用户体验优化测试',
            '自动化测试数据'
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    /**
     * 生成随机英文文本（从预定义短语列表中选择）
     */
    generateRandomEnglishText() {
        const phrases = [
            'This is a test text',
            'Used for form data filling',
            'Random generated English content',
            'Sample description for testing',
            'Auto fill demonstration text',
            'Form validation test data',
            'Smart fill feature demo',
            'Frontend development test case',
            'User experience optimization test',
            'Automated testing data'
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    /**
     * 生成用户名（从预定义列表中选择）
     */
    generateUsername() {
        const usernames = [
            'johnsmith', 'janedoe', 'mikejohnson', 'sarahwilson', 'davidbrown',
            'emilydavis', 'robertlee', 'lisawang', 'jameschen', 'maryzhang',
            'williamliu', 'jenniferli', 'michaelzhou', 'susanchen', 'danielwu',
            'amandalin', 'christopherhu', 'michelleli', 'kevinzhang', 'rebeccaliu',
            'testuser', 'demoaccount', 'sampleuser', 'mockuser', 'autouser'
        ];
        return usernames[Math.floor(Math.random() * usernames.length)];
    }

    /**
     * 生成邮编
     */
    generateZipCode() {
        return Math.floor(Math.random() * 800000) + 100000;
    }

    /**
     * 生成年龄
     */
    generateAge() {
        return Math.floor(Math.random() * 53) + 18; // 18-70岁
    }

    /**
     * 生成身高
     */
    generateTall() {
        return (120 + Math.floor(Math.random() * 81)) + 'cm'; // 120-200cm
    }

    /**
     * 生成体重
     */
    generateWeight() {
        return (40 + Math.floor(Math.random() * 61)) + 'kg'; // 40-100kg
    }

    /**
     * 生成省份
     */
    generateProvince() {
        const provinces = ['北京市', '上海市', '广州市', '深圳市', '杭州市', '南京市', '成都市', '武汉市', '西安市', '重庆市'];
        return provinces[Math.floor(Math.random() * provinces.length)];
    }

    /**
     * 生成城市
     */
    generateCity() {
        const cities = ['朝阳区', '海淀区', '浦东新区', '徐汇区', '天河区', '玄武区', '锦江区', '江汉区', '雁塔区', '渝中区'];
        return cities[Math.floor(Math.random() * cities.length)];
    }

    /**
     * 生成区县
     */
    generateDistrict() {
        const districts = ['东城区', '西城区', '黄浦区', '静安区', '越秀区', '鼓楼区', '青羊区', '硚口区', '碑林区', '江北区'];
        return districts[Math.floor(Math.random() * districts.length)];
    }

    /**
     * 生成街道
     */
    generateStreet() {
        const streets = ['人民路', '解放路', '中山路', '建设路', '文化路', '和平路', '新华路', '胜利路', '光明路', '幸福路'];
        return streets[Math.floor(Math.random() * streets.length)];
    }

    /**
     * 生成过去日期（当前日期前20年到昨天）
     */
    generatePastDate() {
        const currentDate = new Date();
        const start = new Date(currentDate.getFullYear() - 20, 0, 1);
        const end = new Date(currentDate.getTime() - 1); // 昨天
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    }

    /**
     * 生成未来日期（明天到当前日期后20年）
     */
    generateFutureDate() {
        const currentDate = new Date();
        const start = new Date(currentDate.getTime() + 86400000); // 明天
        const end = new Date(currentDate.getFullYear() + 20, 11, 31);
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    }

    /**
     * 生成月份格式数据（YYYYMM → YYYY年MM月，当前日期前20年到后20年范围）
     */
    generateMonthFormat() {
        const currentYear = new Date().getFullYear();
        const year = Math.floor(Math.random() * 41) + currentYear - 20; // 前后20年范围
        const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
        return `${year}年${month}月`;
    }

    /**
     * 生成日期格式数据（YYYY-MM-DD，当前日期前20年到后20年范围）
     */
    generateDateFormat() {
        const currentYear = new Date().getFullYear();
        const year = Math.floor(Math.random() * 41) + currentYear - 20; // 前后20年范围
        const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
        const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0'); // 避免2月31日问题
        return `${year}-${month}-${day}`;
    }

    /**
     * 生成金额格式数据（带千分位分隔符）
     */
    generatePriceFormat() {
        const amount = (Math.random() * 10000 + 1).toFixed(2);
        // 添加千分位分隔符
        return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * 生成时间格式数据（HH:mm 或 HH:mm:ss）
     */
    generateTimeFormat() {
        const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
        const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        const second = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        
        // 随机选择是否包含秒
        return Math.random() > 0.5 ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
    }

    /**
     * 生成年份格式数据（当前日期前20年到后20年范围）
     */
    generateYearFormat() {
        const currentYear = new Date().getFullYear();
        const year = Math.floor(Math.random() * 21) + currentYear - 10; // 前后10年范围（年份通常不需要太宽的范围）
        return `${year}年`;
    }

    /**
     * 生成性别（更真实的概率分布）
     */
    generateGender() {
        const random = Math.random();
        if (random < 0.485) {
            return '男';
        } else if (random < 0.97) {
            return '女';
        } else {
            return '其他';
        }
    }

    /**
     * 生成存储容量格式数据
     */
    generateByteNumber() {
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const sizeUnit = sizes[Math.floor(Math.random() * sizes.length)];
        const sizeValue = Math.random() * 1024;
        return sizeValue.toFixed(sizeUnit === 'B' ? 0 : 1) + sizeUnit;
    }

    /**
     * 生成职业名称
     */
    generateJob() {
        const jobs = ['理发师', '程序员', '收银员', '医生', '护士', '教师', '工程师', '设计师', '销售员', '厨师', '司机', '保安', '清洁工', '电工', '水管工', '会计', '律师', '建筑师', '摄影师', '记者'];
        return jobs[Math.floor(Math.random() * jobs.length)];
    }

    /**
     * 生成编码格式数据
     */
    generateCodeNumber() {
        const prefixLetters = this.generateRandomString(2, true, false, true, true);
        const numbers = Math.floor(Math.random() * 900000000 + 100000000).toString();
        return prefixLetters + numbers;
    }

    /**
     * 生成银行卡号
     */
    generateBankCard() {
        let cardNumber = '';
        for (let i = 0; i < 16; i++) {
            cardNumber += Math.floor(Math.random() * 10).toString();
            if ((i + 1) % 4 === 0 && i < 15) {
                cardNumber += ' ';
            }
        }
        return cardNumber;
    }

    /**
     * 生成随机微信号
     * 规则：微信号通常以字母开头，6-20位，允许字母、数字、下划线、减号
     */
    generateWechat() {
        const prefixes = ['wxid_', 'v_', 'user_', 'echo_', 'sky_'];
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_-';
        let result = randomPrefix;
        // 随机补齐 8 到 12 位
        const length = Math.floor(Math.random() * 5) + 8; 
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * 生成随机中国车牌号
     * 支持：普通蓝牌/黄牌，以及新能源绿牌
     */
    generateLicensePlate() {
        const provinces = '京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼';
        const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // 排除 I 和 O，防止与 1 和 0 混淆
        const mixChars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        const digits = '0123456789';
        
        const province = provinces.charAt(Math.floor(Math.random() * provinces.length));
        const cityLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        
        // 50% 概率生成新能源车牌（6位），50% 概率生成普通车牌（5位）
        const isNewEnergy = Math.random() > 0.5;
        let sequence = '';
        
        if (isNewEnergy) {
            // 新增能源车牌：普通小型车第一位常为 D/F，后5位数字；或大型车最后一位为 D/F
            const isSmallEV = Math.random() > 0.5;
            if (isSmallEV) {
                sequence += Math.random() > 0.5 ? 'D' : 'F';
                for (let i = 0; i < 5; i++) sequence += digits.charAt(Math.floor(Math.random() * digits.length));
            } else {
                for (let i = 0; i < 5; i++) sequence += digits.charAt(Math.floor(Math.random() * digits.length));
                sequence += Math.random() > 0.5 ? 'D' : 'F';
            }
        } else {
            // 普通车牌 5 位
            for (let i = 0; i < 5; i++) {
                sequence += mixChars.charAt(Math.floor(Math.random() * mixChars.length));
            }
        }
        
        return `${province}${cityLetter}·${sequence}`;
    }

    /**
     * 生成随机 IP 地址 (IPv4)
     */
    generateIpAddress() {
        const res = [];
        for (let i = 0; i < 4; i++) {
            // 规避掉一些全 0 或 255 的极端情况，生成 1~254 的数字
            res.push(Math.floor(Math.random() * 254) + 1);
        }
        return res.join('.');
    }

    /**
     * 生成标准的 UUID (v4)
     * 格式：8-4-4-4-12 位的 16 进制字符串
     */
    generateUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 生成标准的商品条形码 (EAN-13 规范)
     * 格式：国内商品常以 690-699 开头，共 13 位纯数字
     */
    generateBarcode() {
        // 随机选择国内常用的前缀
        const prefixes = ['690', '691', '692', '693', '695'];
        let code = prefixes[Math.floor(Math.random() * prefixes.length)];
        
        // 补齐前 12 位
        for (let i = 0; i < 9; i++) {
            code += Math.floor(Math.random() * 10);
        }
        
        // 计算第 13 位校验码 (EAN-13 标准算法)
        let sumEvens = 0;
        let sumOdds = 0;
        for (let i = 0; i < 12; i++) {
            const digit = parseInt(code.charAt(i), 10);
            if (i % 2 === 0) {
                sumOdds += digit;
            } else {
                sumEvens += digit;
            }
        }
        const total = sumOdds + (sumEvens * 3);
        const checkDigit = (10 - (total % 10)) % 10;
        
        return code + checkDigit;
    }

    /**
     * 生成电商货品编码 (SKU / SPU ID)
     * 格式：业务前缀 + 日期/类目 + 随机序列
     */
    generateSkuSpu() {
        const types = ['SKU', 'SPU'];
        const prefix = types[Math.floor(Math.random() * types.length)];
        // 类目 ID (100-999)
        const categoryId = Math.floor(Math.random() * 900) + 100;
        // 随机 6 位流水号
        let serial = '';
        for (let i = 0; i < 6; i++) {
            serial += Math.floor(Math.random() * 10);
        }
        return `${prefix}-${categoryId}-${serial}`;
    }

    /**
     * 生成发票号码 (Invoice No)
     * 格式：符合国内电子发票/普票规范，通常为 8 位或 20 位纯数字
     */
    generateInvoiceNo() {
        let result = '';
        // 50% 概率生成新版 20 位电子发票号码，50% 概率生成传统 8 位发票号
        const length = Math.random() > 0.5 ? 20 : 8;
        // 首位不为 0
        result += Math.floor(Math.random() * 9) + 1;
        for (let i = 1; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }

    /**
     * 生成真实的操作系统环境 (OS Type)
     */
    generateOsType() {
        const osList = [
            'Windows 11 Home', 'Windows 10 Pro',
            'macOS 14.4 Sonoma', 'macOS 15.0 Sequoia',
            'iOS 17.5.1', 'iOS 18.0',
            'Android 14 (API 34)', 'Android 13',
            'Ubuntu 24.04 LTS', 'CentOS Stream 9'
        ];
        return osList[Math.floor(Math.random() * osList.length)];
    }

    /**
     * 生成常见的产品品牌与型号 (Device Brand)
     */
    generateDeviceBrand() {
        const devices = [
            'Apple iPhone 15 Pro Max (暗夜黑色)',
            'Apple MacBook Pro 16" (M3 Max)',
            '华为 Mate 60 Pro (雅川青)',
            '小米 14 Ultra (钛金属特别版)',
            'Sony WH-1000XM5 (无线降噪耳机)',
            'Dyson V15 Detect (无线吸尘器)',
            'DJI Mini 4 Pro (无人机)',
            'Lenovo ThinkPad X1 Carbon Gen 12',
            'Nintendo Switch (OLED版)',
            'Tesla Model 3 (焕新版)',
            'DELL XPS 13',
            'HP Spectre x360',
            'Asus ROG Zephyrus G14',
            'MSI GS66 Stealth 10SE',
            'LG Gram 17',
            'Alienware Area-51m',
            'Panasonic Toughbook F1',
            'Samsung Galaxy S24 Ultra',
            'Google Pixel 8 Pro',
            'OnePlus 12 Pro',
            'Xiaomi 14 Pro',
            'Huawei MatePad Pro 11',
            'HTC U13',
            'BlackBerry KEY2',
            'Palm Pre 3'
        ];
        return devices[Math.floor(Math.random() * devices.length)];
    }
    /**
     * 生成生肖/属相 (Zodiac Animal)
     */
    generateZodiacAnimal() {
        const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
        return animals[Math.floor(Math.random() * animals.length)];
    }

    /**
     * 生成特定季度格式 (Quarter Period)
     * 格式示例: 2026Q1
     */
    generateQuarterPeriod() {
        // 根据系统当前时间动态获取年份，或随机生成一个近几年的年份
        const currentYear = new Date().getFullYear(); // 2026
        const randomYearOffset = Math.floor(Math.random() * 3) - 1; // 随机 -1, 0, 1 年
        const targetYear = currentYear + randomYearOffset;
        
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        const randomQuarter = quarters[Math.floor(Math.random() * quarters.length)];
        
        return `${targetYear}${randomQuarter}`;
    }

    /**
     * 生成国籍 (Nationality)
     */
    generateNationality() {
        const countries = ['中国', '美国', '英国', '日本', '韩国', '加拿大', '澳大利亚', '德国', '法国', '新加坡'];
        return countries[Math.floor(Math.random() * countries.length)];
    }

    /**
     * 生成种族 (Ethnicity)
     */
    generateEthnicity() {
        const ethnicities = ['东亚裔 (East Asian)', '高加索人 (Caucasian)', '非裔 (African)', '拉丁裔 (Hispanic)', '南亚裔 (South Asian)'];
        return ethnicities[Math.floor(Math.random() * ethnicities.length)];
    }

    /**
     * 生成运动健身项目 (Sports Type)
     */
    generateSportsType() {
        const sports = ['羽毛球', '跑步', '游泳', '健身房力量训练', '篮球', '瑜伽', '网球', '骑行', '足球', '普拉提'];
        return sports[Math.floor(Math.random() * sports.length)];
    }
    /**
     * 1生成衣服尺码 (Clothing Size)
     */
    generateClothingSize(isEnglish = false) {
        // 电商中 80% 的衣服尺码采用国际标准字母
        const standardSizes = ['S', 'M', 'L', 'XL', 'XXL', 'XS'];
        // 20% 概率遇到中国本土传统身高胸围码（如 175/92A）
        const cnSizes = ['165/84A', '170/88A', '175/92A', '180/96A', '185/100A'];
        
        if (isEnglish || Math.random() > 0.2) {
            return standardSizes[Math.floor(Math.random() * standardSizes.length)];
        }
        return cnSizes[Math.floor(Math.random() * cnSizes.length)];
    }

    /**
     * 生成鞋码大小 (Shoe Size)
     */
    generateShoeSize(isEnglish = false) {
        if (isEnglish) {
            // 欧美常使用美码，步进 0.5
            const usSizes = ['US 6.0', 'US 7.0', 'US 7.5', 'US 8.5', 'US 9.0', 'US 10.0'];
            return usSizes[Math.floor(Math.random() * usSizes.length)];
        } else {
            // 国内常用欧码/标准码
            const cnSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44'];
            return cnSizes[Math.floor(Math.random() * cnSizes.length)];
        }
    }

    /**
     * 生成物流/快递公司 (Logistic Company)
     */
    generateLogisticCompany() {
        const companies = ['顺丰速运', '京东物流', '中通快递', '圆通速递', '韵达速递', '申通快递', '极兔速递', '邮政EMS'];
        return companies[Math.floor(Math.random() * companies.length)];
    }

    /**
     * 生成售后退款类型 (After Sales Type)
     */
    generateAfterSalesType() {
        const types = ['仅退款', '退货退款', '换货', '漏发补寄', '维修服务'];
        return types[Math.floor(Math.random() * types.length)];
    }

    /**
     * 生成优惠券类型 (Coupon Type)
     */
    generateCouponType() {
        const coupons = ['满减券', '店铺无门槛券', '品类折上折券', '满件打折券', '运费抵扣券', '新客专享立减券'];
        return coupons[Math.floor(Math.random() * coupons.length)];
    }

    /**
     * 生成店铺类型 (Shop Type)
     */
    generateShopType() {
        const shopTypes = ['天猫官方旗舰店', '京东自营', '淘宝个人店', '拼多多品牌好店', '企业专营店', '海外代购店'];
        return shopTypes[Math.floor(Math.random() * shopTypes.length)];
    }
    /**
     * 生成物料或货位编码 (Material Code)
     */
    generateMaterialCode() {
        const isLocation = Math.random() > 0.5;
        if (isLocation) {
            // 生成货位编码格式：库区-排-货架-层
            const zones = ['A', 'B', 'C', 'W'];
            const zone = zones[Math.floor(Math.random() * zones.length)];
            const row = String(Math.floor(Math.random() * 20) + 1).padStart(2, '0');
            const level = Math.floor(Math.random() * 5) + 1;
            const bin = String(Math.floor(Math.random() * 10) + 1).padStart(2, '0');
            return `LOC-${zone}${row}-${level}-${bin}`;
        } else {
            // 生成工业物料通用前缀编码
            const prefixes = ['MAT', 'RAW', 'HAL', 'FER'];
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const category = Math.floor(Math.random() * 80) + 10;
            const serial = Math.floor(Math.random() * 9000) + 1000;
            return `${prefix}-${category}-${serial}`;
        }
    }

    /**
     * 生成物料名称与规格 (Material Name & Spec)
     */
    generateMaterialNameSpec() {
        const materials = [
            { name: '六角不锈钢螺栓', spec: 'M8 × 25mm' },
            { name: '单面涂布白卡纸', spec: '300g / 787mm × 1092mm' },
            { name: '全铜芯阻燃电缆', spec: 'YJV-3×4+1×2.5' },
            { name: '高密度聚乙烯颗粒', spec: 'HDPE-5000S 工业级' },
            { name: '硅酸盐水泥', spec: 'P.O 42.5R 袋装' },
            { name: '冷轧碳素钢板', spec: '1.2mm × 1250mm × C' },
            { name: '铝合金型材', spec: '6063-T5 阳极氧化氧化' },
            { name: '集成电路芯片', spec: 'STM32F103C8T6 LQFP-48' }
        ];
        const item = materials[Math.floor(Math.random() * materials.length)];
        // 随机返回纯名称，或者“名称 (规格)”组合
        return Math.random() > 0.3 ? `${item.name} (${item.spec})` : item.name;
    }

    /**
     * 生成 ERP 标准计量单位 (Material UOM)
     */
    generateMaterialUom() {
        const uoms = ['PCS', '个', '件', '吨', '千克 (kg)', '箱', '卷', '双', '包', '米 (m)', '批'];
        return uoms[Math.floor(Math.random() * uoms.length)];
    }

    /**
     * 生成虚拟企业仓库名称 (Warehouse Name)
     */
    generateWarehouseName() {
        const prefixes = ['宝山区', '一号', '华东', '海外', '临港', '核心'];
        const types = ['原材料仓', '半成品库', '成品总仓', '包材备件库', '线边暂存仓', '退货待修库', '冷链库'];
        const p = prefixes[Math.floor(Math.random() * prefixes.length)];
        const t = types[Math.floor(Math.random() * types.length)];
        return `${p}${t}`;
    }

    /**
     * 生成仓储专用的库存状态 (Inventory Status)
     */
    generateInventoryStatus() {
        // 工业系统中 85% 是合格品，其余是异常状态
        const rand = Math.random();
        if (rand < 0.7) return '可用 (合格)';
        if (rand < 0.85) return '待检 (QC 锁中)';
        if (rand < 0.95) return '冻结 (盘点/质检异常)';
        return '不合格 (报废待转)';
    }

    /**
     * 生成可读的货位描述 (Storage Location)
     */
    generateStorageLocation() {
        const areas = ['A区立体架', 'B区重型货架', 'C区平面散货区', '危险品隔离区'];
        const area = areas[Math.floor(Math.random() * areas.length)];
        const row = Math.floor(Math.random() * 15) + 1;
        const column = Math.floor(Math.random() * 8) + 1;
        return `${area}-${row}排${column}位`;
    }

    /**
     * 生成工业供应商/制造厂商名称 (Supplier Company)
     */
    generateSupplierCompany() {
        const prefixes = ['远东', '泰科', '三一', '兆易', '鸿海', '中航', '拓普', '精工'];
        const industries = ['精密机械', '电子科技', '重工制造', '新材料', '冶金化工', '智能装备'];
        const suffixes = ['有限公司', '股份公司', '制造总厂'];
        const p = prefixes[Math.floor(Math.random() * prefixes.length)];
        const i = industries[Math.floor(Math.random() * industries.length)];
        const s = suffixes[Math.floor(Math.random() * suffixes.length)];
        return `${p}${i}${s}`;
    }
    /**
     * 生成 17 位国际标准车架号 (VIN)
     */
    generateCarVin() {
        const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789'; // 排除 I、O、Q 防混淆
        let vin = '';
        // 随机生成 17 位符合大体格式的字符串
        for (let i = 0; i < 17; i++) {
            vin += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return vin;
    }

    /**
     * 生成汽车发动机号 (Engine No)
     */
    generateEngineNo() {
        // 模拟常见发动机型号前缀 + 随机序列
        const prefixes = ['EA888-', 'B48B20-', 'BYD476-', '4G15-'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        let serial = '';
        for (let i = 0; i < 7; i++) {
            serial += Math.floor(Math.random() * 10);
        }
        return `${prefix}${serial}`;
    }

     /**
     * 底层核心数据：汽车品牌与车型的严格对应关系源
     * （抽离为类私有变量或静态静态对象，供所有汽车相关函数共享）
     */
    _getCarDataMap() {
        return {
            '比亚迪汽车': ['秦PLUS DM-i 120KM 旗舰型', '汉 EV 超长续航版', '宋PLUS DM-i 尊荣型', '海豹 荣耀版'],
            '梅赛德斯-奔驰': ['C200L 运动轿车', 'E300L 时尚型', 'GLC 300 动感型', 'A180L 轿车'],
            '宝马中国': ['325Li M运动套装', '530Li 领先型', 'X3 xDrive30i', 'i3 eDrive35L'],
            '一汽-大众': ['迈腾 380TSI 尊贵版', '速腾 200TSI 自动超越版', '探岳 330TSI 豪华版', '高尔夫 Pro'],
            '广汽丰田': ['卡罗拉 1.2T 双擎精英版', '凯美瑞 2.0G 豪华版', '汉兰达 2.5混动 两驱', '雷凌 双擎'],
            '特斯拉': ['Model Y 后轮驱动版', 'Model 3 焕新版', 'Model S Plaid'],
            '吉利汽车': ['星越L 2.0TD 智尊型', '帝豪 1.5L 豪华型', '博越L 尊贵型', '银河L7 旗舰版'],
            '一汽奥迪': ['A4L 40 TFSI 时尚动感型', 'A6L 45 TFSI 臻选动感型', 'Q5L 45 TFSI 豪华型'],
            '小米汽车': ['SU7 Max 创始版', 'SU7 Pro 长续航版', 'SU7 标准版'],
            '理想汽车': ['L7 Max 超配版', 'L8 Pro 舒适版', 'L9 Ultra 旗舰版'],
            '广汽本田': ['雅阁 1.5T 智享版', '飞度 1.5L 潮跑版', '皓影 两驱豪华版'],
            '长城汽车': ['哈弗H6 自动两驱max', '坦克300 征服者', '魏牌蓝山 DHT-PHEV'],
            '奇瑞汽车': ['瑞虎8 Pro 冠军版', '艾瑞泽8 1.6T 雅版'],
            '长安汽车': ['CS75 PLUS 尊贵型', 'UNI-V 1.5T 尊贵型'],
            '蔚来汽车': ['ET5T 75kWh 纯电旅行车', 'ES6 100kWh 量产版'],
            '小鹏汽车': ['G6 580 长续航 Pro', 'P7i 702 Max'],
            '保时捷': ['911 Carrera 3.0T', 'Macan 2.0T 标准版'],
            '宾利': ['欧陆 GT V8', '添越 V8 标准版']
        };
    }

    /**
     * 生成精确的汽车车型 (Car Model)
     * 格式：xxxx款 [标准品牌] [严格对应的车型及配置]
     */
    generateCarModel() {
        // 1. 动态生成汽车年款
        const currentYear = new Date().getFullYear(); // 2026
        const yearOffset = Math.floor(Math.random() * 4); // 随机 2023 - 2026 款
        const carYear = `${currentYear - yearOffset}款`;
        
        // 2. 获取严格对应的映射字典
        const brandModelMap = this._getCarDataMap();
        
        // 3. 随机抽取一个品牌
        const brandList = Object.keys(brandModelMap);
        const randomBrand = brandList[Math.floor(Math.random() * brandList.length)];
        
        // 4. 【核心】：通过抽中的品牌，去拿它名下绝对属于它的车系配置，确保 100% 一一对应
        const models = brandModelMap[randomBrand];
        const randomDetail = models[Math.floor(Math.random() * models.length)];
        
        // 5. 组装返回
        return `${carYear} ${randomBrand} ${randomDetail}`;
    }

    /**
     * 生成汽车厂商/品牌 (Car Brand)
     * 共享底层字典的 Key 值，确保单独生成的品牌与车型池数据完美契合
     */
    generateCarBrand() {
        const brandModelMap = this._getCarDataMap();
        const brandList = Object.keys(brandModelMap);
        return brandList[Math.floor(Math.random() * brandList.length)];
    }

    /**
     * 生成标准汽配零件号 (Car Part Code)
     */
    generateCarPartCode() {
        // 模拟常见 OEM 汽配零件号三段式或四段式编码格式
        const section1 = Math.floor(Math.random() * 800) + 100;
        const section2 = Math.floor(Math.random() * 800) + 100;
        const section3 = Math.floor(Math.random() * 800) + 100;
        const suffix = ['A', 'B', 'C', 'GR', 'S1'][Math.floor(Math.random() * 5)];
        return `${section1}-${section2}-${section3}-${suffix}`;
    }

    /**
     * 生成汽配零件名称 (Car Part Name)
     */
    generateCarPartName() {
        const parts = [
            '前轮陶瓷制动刹车片 (一对)', '高性能全合成机油 0W-20 4L', '原厂空气滤清器芯', 
            '免维护铅酸蓄电池 12V 60Ah', '原厂双铱金火花塞 (4支装)', '左前全LED大灯总成', 
            '静音无骨雨刮片套件', '前轮减震器总成', '变速箱油滤网垫片'
        ];
        return parts[Math.floor(Math.random() * parts.length)];
    }

    /**
     * 生成合理的车辆行驶里程 (Car Mileage)
     */
    generateCarMileage() {
        // 随机生成 5000 到 150000 公里之间的数
        const km = Math.floor(Math.random() * 145000) + 5000;
        // 50% 概率带单位
        return Math.random() > 0.5 ? `${km} km` : `${km}`;
    }

    /**
     * 生成标准的维修/保养/故障项目 (Car Repair Item)
     */
    generateCarRepairItem() {
        const items = [
            '常规小保养 (更换机油+机滤+安全检测)',
            '发动机节气门积碳清洗及初始化',
            '前轮定位及动平衡调整',
            '空调系统清洗及添加冷媒(R134a)',
            '故障灯排查：右前轮ABS传感器信号故障',
            '火花塞全套更换及点火系统测试',
            '车身右后翼子板凹陷修复及钣金喷漆',
            '更换前两侧制动盘及刹车油刹车线排空'
        ];
        return items[Math.floor(Math.random() * items.length)];
    }
    /**
     * 生成汽车专属颜色 (Car Color)
     * 涵盖基础色和高频汽车质感色/新能源专属色
     */
    generateCarColor() {
        const colors = [
            '珍珠白', '曜石黑', '流体银', '钛泽银', '星海蓝', 
            '极光绿', '碳晶灰', '暮光红', '香槟金', '海盐蓝',
            '暗夜紫', '远山青', '冰川蓝', '雅川青', '霞光橙'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    //endregion

}

// 创建全局实例
if (typeof globalThis !== 'undefined') {
    globalThis.commonUtils = new CommonUtils();

    // 统一的全局注册机制
    globalThis.generatorRegistry = globalThis.generatorRegistry || {};
    
    /**
     * 统一注册生成器实例
     * @param {string} key - 注册键名
     * @param {object} instance - 生成器实例
     */
    globalThis.registerGenerator = function(key, instance) {
        if (!globalThis.generatorRegistry) {
            globalThis.generatorRegistry = {};
        }
        globalThis.generatorRegistry[key] = instance;
    };
    
    /**
     * 获取注册的生成器实例
     * @param {string} key - 注册键名
     * @returns {object} - 生成器实例
     */
    globalThis.getGenerator = function(key) {
        return globalThis.generatorRegistry ? globalThis.generatorRegistry[key] : null;
    };
}