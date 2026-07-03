/**
 * 高级随机数据生成器 - 基于C# MockData库转换
 * 提供更自然的填充间隔和绝对随机模式
 */

class AdvancedMockDataGenerator {
    constructor() {
        // 常量定义
        this.NUMBER_MAX = 100000;
        this.NUMBER_MIN = -100000;
        
        // 姓氏库
        this.LAST_NAME = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和萧尹湛汪祁毛禹狄米贝成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫白房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊";
        this.LAST_NAME_DOUBLE = ["百里", "东方", "独孤", "端木", "宰父", "辗迟", "诸葛", "长孙", "宇文", "尉迟", "西门", "轩辕", "完颜", "司马", "司徒", "南宫", "欧阳"];
        
        // 国家库
        this.MAIN_COUNTRY = ["中国", "日本", "印度", "沙特阿拉伯", "韩国", "朝鲜", "菲律宾", "新加坡", "哈萨克斯坦", "印度尼西亚", "伊拉克", "阿富汗", "巴基斯坦", "土耳其", "俄罗斯", "英国", "法国", "德国", "意大利", "挪威", "冰岛", "丹麦", "乌克兰", "波兰", "荷兰", "希腊", "西班牙", "葡萄牙", "埃及", "南非", "埃塞俄比亚", "刚果共和国", "津巴布韦", "马达加斯加", "澳大利亚", "新西兰", "图瓦卢", "巴布亚新几内亚", "美国", "加拿大", "墨西哥", "哥斯达黎加", "古巴", "牙买加", "巴西", "智利", "阿根廷", "秘鲁"];
        this.MAIN_COUNTRY_CODE = ["CN", "JP", "IN", "SAU", "KR", "KP", "PH", "SG", "KZ", "ID", "IQ", "AF", "PK", "TR", "RU", "GB", "FR", "DE", "IT", "NO", "IS", "DK", "UA", "PL", "NL", "GR", "ES", "PT", "EG", "ZA", "ET", "CG", "ZW", "MG", "AU", "NZ", "TUV", "PG", "US", "CA", "MX", "CR", "CU", "JM", "BR", "CL", "AR", "PE"];
        this.MAIN_CURRENCY_CODE = ["CNY", "MOP", "HKD", "JPY", "INR", "SAR", "KRW", "KPW", "PHP", "SGD", "KZT", "IDR", "IQD", "AFN", "PKR", "TRY", "RUB", "GBP", "EUR", "EUR", "EUR", "NOK", "ISK", "DKK", "UAH", "PLN", "EUR", "EUR", "EUR", "EUR", "EGP", "ZAR", "ETB", "XAF", "ZWL", "MGA", "AUD", "NZD", "AUD", "PGK", "USD", "CAD", "MXN", "CRC", "CUP", "JMD", "BRL", "CLP", "ARS", "PEN"];
        this.MAIN_FIX_DOMAIN = ["com", "cn", "net", "co.jp", "co.uk", "edu", "org", "top", "gov", "mil", "art", "firm", "info", "vip"];
        
        // 省市数据
        this.provincesCities = {
            "北京市": ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区"],
            "天津市": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "滨海新区", "宁河区", "静海区", "蓟州区"],
            "河北省": ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"],
            "山西省": ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"],
            "内蒙古自治区": ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"],
            "辽宁省": ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"],
            "吉林省": ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州"],
            "黑龙江省": ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区"],
            "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"],
            "江苏省": ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"],
            "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"],
            "安徽省": ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市"],
            "福建省": ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"],
            "江西省": ["南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市"],
            "山东省": ["济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市"],
            "河南省": ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市", "济源市"],
            "湖北省": ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施土家族苗族自治州", "仙桃市", "潜江市", "天门市", "神农架林区"],
            "湖南省": ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州"],
            "广东省": ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"],
            "广西壮族自治区": ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"],
            "海南省": ["海口市", "三亚市", "三沙市", "儋州市", "五指山市", "琼海市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"],
            "重庆市": ["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "綦江区", "大足区", "渝北区", "巴南区", "黔江区", "长寿区", "江津区", "合川区", "永川区", "南川区", "璧山区", "铜梁区", "潼南区", "荣昌区", "开州区", "梁平区", "武隆区", "城口县", "丰都县", "垫江县", "忠县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"],
            "四川省": ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"],
            "贵州省": ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"],
            "云南省": ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"],
            "西藏自治区": ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区"],
            "陕西省": ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"],
            "甘肃省": ["兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州"],
            "青海省": ["西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"],
            "宁夏回族自治区": ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"],
            "新疆维吾尔自治区": ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区", "石河子市", "阿拉尔市", "图木舒克市", "五家渠市", "北屯市", "铁门关市", "双河市", "可克达拉市", "昆玉市", "胡杨河市", "新星市"],
            "台湾省": ["高雄", "台北", "台中", "台南", "基隆", "新竹"],
            "香港": ["九龙", "元朗"],
            "澳门": ["澳门半岛"]
        };
    }

    /**
     * 智能获取父级元素中的label文本信息（支持多种UI框架）
     * 使用公共工具库中的方法，避免重复代码
     */
    getParentLabelText(element) {
        return globalThis.commonUtils.getParentLabelText(element);
    }

    /**
     * 获取随机数生成器
     */
    getRandom() {
        return Math.random();
    }

    /**
     * 获取随机整数
     */
    getRandomInt(min, max) {
        return Math.floor(this.getRandom() * (max - min + 1)) + min;
    }

    /**
     * 获取全名
     */
    getFullName(lastLen = 2, lang = 'CN') {
        let result = '';
        switch (lang) {
            case 'CN':
                result = this.getFirstName(lang) + this.getLastName(lastLen, lang);
                break;
            case 'EN':
                result = this.getLastName(lastLen, lang) + " " + this.getFirstName(lang);
                break;
            default:
                result = "不支持该语言";
                break;
        }
        return result;
    }

    /**
     * 获取姓氏
     */
    getFirstName(lang = 'CN') {
        let result = '';
        switch (lang) {
            case 'CN':
                const length = this.LAST_NAME.length;
                const index = this.getRandomInt(0, length + this.LAST_NAME_DOUBLE.length - 1);
                if (index >= length) return this.LAST_NAME_DOUBLE[index - length];
                result = this.LAST_NAME[index];
                break;
            case 'EN':
                const len = this.getRandomInt(4, 8);
                result = this.getWord(len, false, lang).replace(/ /g, "");
                break;
            default:
                result = "不支持该语言";
                break;
        }
        return result;
    }

    /**
     * 获取名字
     */
    getLastName(length = 2, lang = 'CN') {
        let result = '';
        switch (lang) {
            case 'CN':
                result = this.getChineseWord(length).join("");
                break;
            case 'EN':
                const len = this.getRandomInt(4, 12);
                result = this.getWord(len, false, lang).replace(/ /g, "");
                break;
            default:
                result = "不支持该语言";
                break;
        }
        return result;
    }

    /**
     * 获取身高（字符串）
     */
    getTallStr() {
        return this.getTall() + "cm";
    }

    /**
     * 获取身高（数值）
     */
    getTall() {
        return 120 + Math.round(this.getRandom() * 100);
    }

    /**
     * 获取体重（字符串）
     */
    getWeightStr() {
        return this.getWeight() + "kg";
    }

    /**
     * 获取体重（数值）
     */
    getWeight() {
        return 40 + Math.round(this.getRandom() * 60);
    }

    /**
     * 获取邮箱
     */
    getEmail() {
        const mail = this.getRandomInt(5, 18);
        const value = this.getRandomInt(3, 8);
        return `${this.getRandomizer(mail, true, false, true, true)}@${this.getRandomizer(value, true)}.com`;
    }

    /**
     * 获取详细地址
     */
    getAddress() {
        // 常见的街道名前缀
        const streetPrefixes = ["解放", "人民", "建设", "文化", "新华", "东风", "胜利", "和平", "民主", "自由", "团结", "前进", "光明", "幸福", "繁荣", "和谐", "创新", "发展", "科技", "创业"];
        
        // 常见的街道名后缀
        const streetSuffixes = ["大街", "大道", "路", "街", "巷", "弄", "胡同", "里"];
        
        // 常见的路名前缀
        const roadPrefixes = ["中山", "延安", "北京", "上海", "广州", "深圳", "南京", "杭州", "成都", "重庆", "武汉", "西安", "长沙", "沈阳", "青岛", "大连", "苏州", "无锡", "宁波", "福州"];
        
        // 常见的路名后缀
        const roadSuffixes = ["路", "大道", "大街", "街"];
        
        // 生成街道名
        const streetPrefix = streetPrefixes[this.getRandomInt(0, streetPrefixes.length - 1)];
        const streetSuffix = streetSuffixes[this.getRandomInt(0, streetSuffixes.length - 1)];
        const streetName = streetPrefix + streetSuffix;
        
        // 生成路名
        const roadPrefix = roadPrefixes[this.getRandomInt(0, roadPrefixes.length - 1)];
        const roadSuffix = roadSuffixes[this.getRandomInt(0, roadSuffixes.length - 1)];
        const roadName = roadPrefix + roadSuffix;
        
        // 生成门牌号和房间号
        const doorNumber = this.getRandomInt(1, 888).toString().padStart(3, '0');
        const roomNumber = this.getRandomInt(101, 2808).toString();
        
        return `${streetName}${roadName}${doorNumber}号${roomNumber}室`;
    }

    /**
     * 获取电话号码
     */
    getPhone() {
        const x = this.getRandomInt(10, 1000);
        const xx = x < 100 ? this.getRandomInt(10000000, 99999999) : this.getRandomInt(1000000, 9999999);
        return `0${x}-${xx}`;
    }

    /**
     * 获取手机号码
     */
    getTelPhone() {
        const xx = this.getRandomInt(10000, 99999);
        const xxx = this.getRandomInt(10000, 99999);
        return `1${xx}${xxx}`;
    }

    /**
     * 获取座机号码
     */
    getLandlinePhone() {
        // 生成区号（3-4位）
        const areaCode = this.getRandomInt(10, 899);
        // 生成电话号码（7-8位）
        const phoneNumber = this.getRandomInt(1000000, 99999999);
        return `${areaCode}-${phoneNumber}`;
    }


    /**
     * 获取身份证
     */
    getID(is18 = true) {
        const x = this.getRandomInt(110000, 770000);
        const format = is18 ? "yyyyMMdd" : "yyMMdd";
        const xx = this.getDateTimeFormat(format);
        const xxx = this.getRandomInt(100, 999);
        const y = this.getRandomInt(0, 11);
        if (y === 10) {
            return `${x}${xx}${xxx}X`;
        }
        return `${x}${xx}${xxx}${y}`;
    }
    getID2() {
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
     * 生成省份
     */
    generateProvince() {
        const provinceKeys = Object.keys(this.provincesCities);
        return provinceKeys[this.getRandomInt(0, provinceKeys.length - 1)];
    }

    /**
     * 生成城市
     */
    generateCity() {
        const provinceKeys = Object.keys(this.provincesCities);
        const randomProvince = provinceKeys[this.getRandomInt(0, provinceKeys.length - 1)];
        const cities = this.provincesCities[randomProvince];
        return cities[this.getRandomInt(0, cities.length - 1)];
    }

    /**
     * 生成区县
     */
    generateDistrict() {
        const provinceKeys = Object.keys(this.provincesCities);
        const randomProvince = provinceKeys[this.getRandomInt(0, provinceKeys.length - 1)];
        
        if (['北京市', '天津市', '上海市', '重庆市'].includes(randomProvince)) {
            const districts = this.provincesCities[randomProvince];
            return districts[this.getRandomInt(0, districts.length - 1)];
        } else {
            const commonDistricts = ["朝阳区", "海淀区", "西城区", "东城区", "丰台区", "石景山区", "通州区", "顺义区", "昌平区", "大兴区", "房山区", "门头沟区", "怀柔区", "平谷区", "密云区", "延庆区"];
            return commonDistricts[this.getRandomInt(0, commonDistricts.length - 1)];
        }
    }

    /**
     * 生成街道
     */
    generateStreet() {
        const commonStreets = ["长安街", "王府井大街", "西单北大街", "东单北大街", "建国门外大街", "朝阳门外大街", "复兴门外大街", "阜成门外大街", "德胜门外大街", "安定门外大街", "广渠门外大街", "左安门外大街", "右安门外大街", "永定门外大街"];
        return commonStreets[this.getRandomInt(0, commonStreets.length - 1)];
    }


    /**
     * 生成身份证号
     */
    generateIDCard() {
        return getRandomInt(1,10) > 5 ? this.getID(true) : this.getID2();
    }


    /**
     * 获取指定长度的文字
     */
    getWord(length, hasMark = false, lang = 'CN') {
        let markLength = 0;
        if (hasMark) {
            if (length < 10) markLength = 1;
            else markLength = Math.floor(length / 10);
        }
        const wordLength = length - markLength;
        let result = '';

        switch (lang) {
        case 'CN':
            const strList = this.getChineseWord(wordLength);
            if (hasMark) {
                const marks = Array.from({length: markLength - 1}, (_, i) => i % 5 === 3 ? "。" : "，");
                for (let i = 1; i < marks.length; i++) {
                    const size = Math.floor(strList.length / (markLength - 1));
                    const index = this.getRandomInt((i - 1) * size + 1, i * size);
                    strList.splice(index, 0, marks[i]);
                }
                strList.push("。");
            }
            result = strList.join('');
            break;
            case 'EN':
                if (hasMark) length = length - 1;
                const resultSB = [];
                let hadMark = 0;
                while (resultSB.join('').length < length) {
                    const needLength = length - resultSB.join('').length;
                    const createLength = needLength > 5 ? (needLength > 10 ? this.getRandomInt(4, 10) : this.getRandomInt(1, needLength)) : needLength;
                    let createWord = this.getRandomizer(createLength, false, false, true, false);
                    if (resultSB.length === 0) createWord = createWord[0].toUpperCase() + createWord.slice(1);
                    const isMark = this.getRandom() > 0.4 && hadMark < markLength && hasMark;
                    const spaceOrMark = isMark ? (this.getRandom() > 0.2 ? "." : ",") : " ";
                    resultSB.push(createWord + spaceOrMark);
                    if (isMark) hadMark++;
                }
                result = resultSB.join('').trim().replace(/[,.]$/, '');
                if (hasMark) result = result + ".";
                break;
            default:
                result = "不支持该语言";
                break;
        }
        return result;
    }

    /**
     * 获取中文文字
     */
    getChineseWord(wordLength) {
        // 简化的中文生成（实际项目中可以使用更复杂的中文生成算法）
        const commonChars = "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严";
        const result = [];
        for (let i = 0; i < wordLength; i++) {
            result.push(commonChars[this.getRandomInt(0, commonChars.length - 1)]);
        }
        return result;
    }

    /**
     * 获取日期时间格式（当前日期前20年到后20年范围）
     */
    getDateTimeFormat(format) {
        const currentYear = new Date().getFullYear();
        const year = this.getRandomInt(currentYear - 20, currentYear + 20);
        const month = this.getRandomInt(1, 12).toString().padStart(2, '0');
        const day = this.getRandomInt(1, 28).toString().padStart(2, '0');
        
        switch (format) {
            case "yyyy-MM-dd":
                return `${year}-${month}-${day}`;
            case "yy-MM-dd":
                return `${year.toString().slice(-2)}-${month}-${day}`;
            case "yyyyMMdd":
                return `${year}${month}${day}`;
            case "yyMMdd":
                return `${year.toString().slice(-2)}${month}${day}`;
            default:
                return `${year}${month}${day}`;
        }
    }

    /**
     * 随机生成数字、符号、字母组合
     */
    getRandomizer(intLength, booNumber = false, booSign = false, booSmallword = false, booBigword = false) {
        if (intLength <= 0 || (!booNumber && !booSign && !booSmallword && !booBigword)) return "";
        
        let strB = "";
        let intResultRound = 0;
        
        while (intResultRound < intLength) {
            const intA = this.getRandomInt(1, 4);
            
            if (intA === 1 && booNumber) {
                strB = this.getRandomInt(0, 9) + strB;
                intResultRound++;
                continue;
            }
            
            if (intA === 2 && booSign) {
                const signType = this.getRandomInt(1, 4);
                let charCode;
                switch (signType) {
                    case 1: charCode = this.getRandomInt(33, 47); break;
                    case 2: charCode = this.getRandomInt(58, 64); break;
                    case 3: charCode = this.getRandomInt(91, 96); break;
                    case 4: charCode = this.getRandomInt(123, 126); break;
                }
                strB = String.fromCharCode(charCode) + strB;
                intResultRound++;
                continue;
            }
            
            if (intA === 3 && booSmallword) {
                strB = String.fromCharCode(this.getRandomInt(97, 122)) + strB;
                intResultRound++;
                continue;
            }
            
            if (intA === 4 && booBigword) {
                strB = String.fromCharCode(this.getRandomInt(65, 90)) + strB;
                intResultRound++;
                continue;
            }
        }
        
        return strB;
    }

    /**
     * 获取验证码
     */
    getCode(length = 6, mixin = false) {
        return mixin ? this.getRandomizer(length, true, false, true, true) : this.getRandomizer(length, true);
    }

    /**
     * 获取密码
     */
    getPassword(min = 8, max = 16) {
        if (min < 8 || max < 8) throw new Error("最大最小值不能小于8");
        if (max < min) throw new Error("最大值不能小于最小值");
        
        const len = this.getRandomInt(min, max);
        const xLen = this.getRandomInt(2, Math.floor(len / 2));
        const yLen = this.getRandomInt(1, Math.floor(len / 2));
        const zLen = len - xLen - yLen;
        
        const x = this.getRandomizer(xLen, false, false, true, false);
        const y = this.getRandomArr(["~", "!", "@", "#", "$", "%", "^", "_"], yLen).join('');
        const z = this.getRandomizer(zLen, true);
        
        const result = x.substring(0, Math.floor(xLen / 2)).toUpperCase() + 
                      x.substring(Math.floor(xLen / 2)) + y + z;
        
        return result.split('').sort(() => 0.5 - Math.random()).join('');
    }

    /**
     * 从数组中随机获取元素
     */
    getRandomArr(source, count) {
        if (count >= source.length) return source;
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(source[this.getRandomInt(0, source.length - 1)]);
        }
        return result;
    }

    /**
     * 智能表单数据生成（兼容现有接口）
     */
    generateMockData(type, options = {}) {
        switch (type) {
            case 'chinese_name':
                return this.getFullName(2, 'CN');
            case 'english_name':
                return this.getFullName(2, 'EN');
            case 'price':
                return (this.getRandom() * 10000 + 1).toFixed(2);
            case 'phone':
                return this.getTelPhone();
            case 'captcha':
                return this.getCode(6);
            case 'email':
                return this.getEmail();
            case 'qq':
                return this.getRandomInt(10000, 999999999).toString();
            case 'id_card':
                return this.generateIDCard();
            case 'address':
                return this.getAddress();
            case 'password':
                return this.getPassword();
            case 'date':
                return this.getDateTimeFormat("yyyy-MM-dd");
            case 'chinese_description':
                return this.getWord(20, true, 'CN');
            case 'english_description':
                return this.getWord(20, true, 'EN');
            case 'chinese_company':
                return this.getFullName(2, 'CN') + "科技有限公司";
            case 'english_company':
                return this.getFullName(2, 'EN') + " Technology Inc.";
            case 'tall':
                return this.getTallStr();
            case 'weight':
                return this.getWeightStr();
            case 'username':
                // 用户名可以是英文、数字、下划线的组合
                const usernameLength = this.getRandomInt(6, 16);
                return this.getRandomizer(usernameLength, true, false, true, false);
            case 'checkbox':
                // 复选框返回true表示勾选
                return true;
            case 'radio':
                // 单选按钮返回true表示选中
                return true;
            case 'random_chinese_text':
                return this.getWord(20, true, 'CN');
            case 'random_english_text':
                return this.getWord(20, true, 'EN');
            case 'month_format':
                return this.getDateTimeFormat("yyyy-MM");
            case 'date_format':
                return this.getDateTimeFormat("yyyy-MM-dd");
            case 'price_format':
                return (this.getRandom() * 1000 + 1).toFixed(2);
            case 'time_format':
                return this.getDateTimeFormat("HH:mm:ss");
            case 'year_format':
                return this.getDateTimeFormat("yyyy");
            case 'phone_format':
                return this.getTelPhone();
            case 'email_format':
                return this.getEmail();
            case 'id_card_format':
                return this.generateIDCard();
            case 'province':
                return this.generateProvince();
            case 'city':
                return this.generateCity();
            case 'district':
                return this.generateDistrict();
            case 'street':
                return this.generateStreet();
            default:
                // 其次使用公共的。相同的case完全可以在上面写，从而覆盖commonUtils的逻辑
                return globalThis.commonUtils.generateMockDataWithOptions(type, options);
        }
    }

    /**
     * 带选项的智能表单数据生成
     */
    generateMockDataWithOptions(type, options = {}) {
        // 高级模式可以支持更多的配置选项
        switch (type) {
            case 'captcha':
                // 支持自定义验证码长度
                const length = options.length || 6;
                return this.getCode(length);
            case 'word':
                // 支持自定义单词长度和语言
                const wordLength = options.length || 10;
                const isChinese = options.language === 'CN' || options.language === 'chinese';
                return this.getWord(wordLength, false, isChinese ? 'CN' : 'EN');
            case 'number':
                // 支持自定义数字范围
                const min = options.min || 1;
                const max = options.max || 100;
                return this.getRandomInt(min, max).toString();
            case 'phone':
                // 支持不同类型的电话号码
                const phoneType = options.type || 'mobile';
                if (phoneType === 'landline') {
                    return this.getLandlinePhone();
                }
                return this.getTelPhone();
            default:
                // 对于不支持选项的类型，回退到基本的generateMockData方法
                return this.generateMockData(type, options);
        }
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

    /**
     * 输入类型检测（增强版）- 使用公共工具库，避免重复代码
     */
    detectInputType(element) {
        var elType = globalThis.commonUtils.getElementType(element);
        if(elType !== '') return elType;
        
        // 第二步：构建字段文本信息
        let fieldText = (element.id + ' ' + element.name + ' ' + element.placeholder + ' ' + 
                        element.className + ' ' + element.title + ' ' + element.getAttribute('data-type') + ' ' +
                        element.getAttribute('aria-label') + ' ' + element.getAttribute('label')).toLowerCase();
        
        // 智能获取父级元素中的label文本信息（支持多种UI框架）
        const parentLabels = this.getParentLabelText(element);
        if (parentLabels) {
            fieldText += ' ' + parentLabels.toLowerCase();
        }
        
        // 检查是否为英文字段
        const isEnglishField = /[a-zA-Z]/.test(fieldText) && !/[\u4e00-\u9fff]/.test(fieldText);
        
        // 第三步：使用公共工具库进行字段类型识别（高优先级）
        const fieldType = globalThis.commonUtils.detectFieldTypeByText(fieldText, isEnglishField);
        if (fieldType) {
            return fieldType;
        }
        
        // 第四步：检查placeholder中的格式模式（中优先级）
        if (element.placeholder) {
            const placeholderFormatType = globalThis.commonUtils.detectPlaceholderFormatCommon(element.placeholder);
            if (placeholderFormatType) {
                return placeholderFormatType;
            }
        }
        
        // 第五步：根据输入框格式特征匹配（中优先级）
        if (/code|verify|captcha/.test(fieldText)) return 'captcha';
        if (/phone|mobile|tel/.test(fieldText)) return 'phone';
        if (/email|mail/.test(fieldText)) return 'email';
        if (/password|pwd/.test(fieldText)) return 'password';
        
        // 第六步：结合placeholder的通用关键词匹配（低优先级）
        const combinedText = fieldText + (element.placeholder ? ' ' + element.placeholder.toLowerCase() : '');
        const combinedType = globalThis.commonUtils.detectFieldTypeByText(combinedText, isEnglishField);
        if (combinedType) {
            return combinedType;
        }
        
        // 兜底策略 - 随机文本
        return isEnglishField ? 'random_english_text' : 'random_chinese_text';
    }
}

// 创建全局实例并注册到注册表
if (typeof globalThis !== 'undefined') {
    globalThis.generatorRegistry = globalThis.generatorRegistry || {};
    globalThis.generatorRegistry['advanced'] = new AdvancedMockDataGenerator();

    // 保持向后兼容性
    globalThis.advancedMockDataGenerator = globalThis.generatorRegistry['advanced'];
}