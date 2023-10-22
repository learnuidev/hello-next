// const nodeFetech = require("node-fetch");
import nodeFetch from "node-fetch";
import fs from "fs";

const allChars = [
  {
    hanzi: "一",
  },
  {
    hanzi: "二",
  },
  {
    hanzi: "三",
  },
  {
    hanzi: "十",
  },
  {
    hanzi: "干",
  },
  {
    hanzi: "半",
  },
  {
    hanzi: "人",
  },
  {
    hanzi: "从",
  },
  {
    hanzi: "个",
  },
  {
    hanzi: "入",
  },
  {
    hanzi: "什",
  },
  {
    hanzi: "午",
  },
  {
    hanzi: "年",
  },
  {
    hanzi: "口",
  },
  {
    hanzi: "中",
  },
  {
    hanzi: "叫",
  },
  {
    hanzi: "八",
  },
  {
    hanzi: "只",
  },
  {
    hanzi: "介",
  },
  {
    hanzi: "儿",
  },
  {
    hanzi: "四",
  },
  {
    hanzi: "兄",
  },
  {
    hanzi: "兑",
  },
  {
    hanzi: "说",
  },
  {
    hanzi: "计",
  },
  {
    hanzi: "认",
  },
  {
    hanzi: "识",
  },
  {
    hanzi: "马",
  },
  {
    hanzi: "吗",
  },
  {
    hanzi: "骂",
  },
  {
    hanzi: "乙",
  },
  {
    hanzi: "乞",
  },
  {
    hanzi: "吃",
  },
  {
    hanzi: "气",
  },
  {
    hanzi: "飞",
  },
  {
    hanzi: "况",
  },
  {
    hanzi: "日",
  },
  {
    hanzi: "旧",
  },
  {
    hanzi: "旦",
  },
  {
    hanzi: "但",
  },
  {
    hanzi: "早",
  },
  {
    hanzi: "唱",
  },
  {
    hanzi: "电",
  },
  {
    hanzi: "七",
  },
  {
    hanzi: "化",
  },
  {
    hanzi: "白",
  },
  {
    hanzi: "百",
  },
  {
    hanzi: "今",
  },
  {
    hanzi: "千",
  },
  {
    hanzi: "舌",
  },
  {
    hanzi: "话",
  },
  {
    hanzi: "活",
  },
  {
    hanzi: "乱",
  },
  {
    hanzi: "汽",
  },
  {
    hanzi: "月",
  },
  {
    hanzi: "用",
  },
  {
    hanzi: "胖",
  },
  {
    hanzi: "朋",
  },
  {
    hanzi: "明",
  },
  {
    hanzi: "习",
  },
  {
    hanzi: "句",
  },
  {
    hanzi: "勺",
  },
  {
    hanzi: "的",
  },
  {
    hanzi: "了",
  },
  {
    hanzi: "子",
  },
  {
    hanzi: "寸",
  },
  {
    hanzi: "时",
  },
  {
    hanzi: "过",
  },
  {
    hanzi: "付",
  },
  {
    hanzi: "讨",
  },
  {
    hanzi: "才",
  },
  {
    hanzi: "牙",
  },
  {
    hanzi: "卜",
  },
  {
    hanzi: "上",
  },
  {
    hanzi: "下",
  },
  {
    hanzi: "卡",
  },
  {
    hanzi: "吓",
  },
  {
    hanzi: "占",
  },
  {
    hanzi: "点",
  },
  {
    hanzi: "让",
  },
  {
    hanzi: "止",
  },
  {
    hanzi: "正",
  },
  {
    hanzi: "是",
  },
  {
    hanzi: "目",
  },
  {
    hanzi: "自",
  },
  {
    hanzi: "面",
  },
  {
    hanzi: "身",
  },
  {
    hanzi: "谢",
  },
  {
    hanzi: "弋",
  },
  {
    hanzi: "代",
  },
  {
    hanzi: "戈",
  },
  {
    hanzi: "手",
  },
  {
    hanzi: "我",
  },
  {
    hanzi: "或",
  },
  {
    hanzi: "看",
  },
  {
    hanzi: "担",
  },
  {
    hanzi: "拍",
  },
  {
    hanzi: "提",
  },
  {
    hanzi: "找",
  },
  {
    hanzi: "木",
  },
  {
    hanzi: "本",
  },
  {
    hanzi: "体",
  },
  {
    hanzi: "末",
  },
  {
    hanzi: "米",
  },
  {
    hanzi: "来",
  },
  {
    hanzi: "呆",
  },
  {
    hanzi: "休",
  },
  {
    hanzi: "桌",
  },
  {
    hanzi: "相",
  },
  {
    hanzi: "禾",
  },
  {
    hanzi: "和",
  },
  {
    hanzi: "种",
  },
  {
    hanzi: "香",
  },
  {
    hanzi: "几",
  },
  {
    hanzi: "机",
  },
  {
    hanzi: "心",
  },
  {
    hanzi: "想",
  },
  {
    hanzi: "息",
  },
  {
    hanzi: "总",
  },
  {
    hanzi: "怕",
  },
  {
    hanzi: "己",
  },
  {
    hanzi: "记",
  },
  {
    hanzi: "已",
  },
  {
    hanzi: "包",
  },
  {
    hanzi: "土",
  },
  {
    hanzi: "坐",
  },
  {
    hanzi: "吐",
  },
  {
    hanzi: "肚",
  },
  {
    hanzi: "在",
  },
  {
    hanzi: "走",
  },
  {
    hanzi: "起",
  },
  {
    hanzi: "不",
  },
  {
    hanzi: "还",
  },
  {
    hanzi: "坏",
  },
  {
    hanzi: "杯",
  },
  {
    hanzi: "么",
  },
  {
    hanzi: "公",
  },
  {
    hanzi: "台",
  },
  {
    hanzi: "去",
  },
  {
    hanzi: "丢",
  },
  {
    hanzi: "法",
  },
  {
    hanzi: "寺",
  },
  {
    hanzi: "等",
  },
  {
    hanzi: "门",
  },
  {
    hanzi: "们",
  },
  {
    hanzi: "问",
  },
  {
    hanzi: "间",
  },
  {
    hanzi: "简",
  },
  {
    hanzi: "司",
  },
  {
    hanzi: "词",
  },
  {
    hanzi: "母",
  },
  {
    hanzi: "每",
  },
  {
    hanzi: "也",
  },
  {
    hanzi: "他",
  },
  {
    hanzi: "地",
  },
  {
    hanzi: "小",
  },
  {
    hanzi: "东",
  },
  {
    hanzi: "尔",
  },
  {
    hanzi: "你",
  },
  {
    hanzi: "您",
  },
  {
    hanzi: "大",
  },
  {
    hanzi: "太",
  },
  {
    hanzi: "犬",
  },
  {
    hanzi: "哭",
  },
  {
    hanzi: "臭",
  },
  {
    hanzi: "然",
  },
  {
    hanzi: "狗",
  },
  {
    hanzi: "决",
  },
  {
    hanzi: "快",
  },
  {
    hanzi: "块",
  },
  {
    hanzi: "羊",
  },
  {
    hanzi: "着",
  },
  {
    hanzi: "样",
  },
  {
    hanzi: "美",
  },
  {
    hanzi: "力",
  },
  {
    hanzi: "加",
  },
  {
    hanzi: "边",
  },
  {
    hanzi: "办",
  },
  {
    hanzi: "为",
  },
  {
    hanzi: "另",
  },
  {
    hanzi: "云",
  },
  {
    hanzi: "运",
  },
  {
    hanzi: "动",
  },
  {
    hanzi: "会",
  },
  {
    hanzi: "丁",
  },
  {
    hanzi: "打",
  },
  {
    hanzi: "可",
  },
  {
    hanzi: "哥",
  },
  {
    hanzi: "河",
  },
  {
    hanzi: "奇",
  },
  {
    hanzi: "骑",
  },
  {
    hanzi: "椅",
  },
  {
    hanzi: "以",
  },
  {
    hanzi: "内",
  },
  {
    hanzi: "肉",
  },
  {
    hanzi: "两",
  },
  {
    hanzi: "再",
  },
  {
    hanzi: "同",
  },
  {
    hanzi: "周",
  },
  {
    hanzi: "王",
  },
  {
    hanzi: "全",
  },
  {
    hanzi: "主",
  },
  {
    hanzi: "住",
  },
  {
    hanzi: "注",
  },
  {
    hanzi: "玉",
  },
  {
    hanzi: "国",
  },
  {
    hanzi: "回",
  },
  {
    hanzi: "因",
  },
  {
    hanzi: "嗯",
  },
  {
    hanzi: "行",
  },
  {
    hanzi: "得",
  },
  {
    hanzi: "往",
  },
  {
    hanzi: "金",
  },
  {
    hanzi: "钟",
  },
  {
    hanzi: "天",
  },
  {
    hanzi: "关",
  },
  {
    hanzi: "送",
  },
  {
    hanzi: "开",
  },
  {
    hanzi: "算",
  },
  {
    hanzi: "并",
  },
  {
    hanzi: "耳",
  },
  {
    hanzi: "闻",
  },
  {
    hanzi: "联",
  },
  {
    hanzi: "系",
  },
  {
    hanzi: "女",
  },
  {
    hanzi: "妈",
  },
  {
    hanzi: "好",
  },
  {
    hanzi: "始",
  },
  {
    hanzi: "西",
  },
  {
    hanzi: "要",
  },
  {
    hanzi: "如",
  },
  {
    hanzi: "她",
  },
  {
    hanzi: "楼",
  },
  {
    hanzi: "又",
  },
  {
    hanzi: "汉",
  },
  {
    hanzi: "对",
  },
  {
    hanzi: "没",
  },
  {
    hanzi: "取",
  },
  {
    hanzi: "最",
  },
  {
    hanzi: "曼",
  },
  {
    hanzi: "慢",
  },
  {
    hanzi: "支",
  },
  {
    hanzi: "皮",
  },
  {
    hanzi: "书",
  },
  {
    hanzi: "有",
  },
  {
    hanzi: "随",
  },
  {
    hanzi: "友",
  },
  {
    hanzi: "发",
  },
  {
    hanzi: "六",
  },
  {
    hanzi: "言",
  },
  {
    hanzi: "信",
  },
  {
    hanzi: "文",
  },
  {
    hanzi: "这",
  },
  {
    hanzi: "父",
  },
  {
    hanzi: "交",
  },
  {
    hanzi: "校",
  },
  {
    hanzi: "风",
  },
  {
    hanzi: "网",
  },
  {
    hanzi: "那",
  },
  {
    hanzi: "哪",
  },
  {
    hanzi: "衣",
  },
  {
    hanzi: "袋",
  },
  {
    hanzi: "被",
  },
  {
    hanzi: "艮",
  },
  {
    hanzi: "很",
  },
  {
    hanzi: "银",
  },
  {
    hanzi: "长",
  },
  {
    hanzi: "报",
  },
  {
    hanzi: "服",
  },
  {
    hanzi: "元",
  },
  {
    hanzi: "远",
  },
  {
    hanzi: "玩",
  },
  {
    hanzi: "园",
  },
  {
    hanzi: "完",
  },
  {
    hanzi: "院",
  },
  {
    hanzi: "字",
  },
  {
    hanzi: "定",
  },
  {
    hanzi: "安",
  },
  {
    hanzi: "寄",
  },
  {
    hanzi: "宝",
  },
  {
    hanzi: "匕",
  },
  {
    hanzi: "比",
  },
  {
    hanzi: "它",
  },
  {
    hanzi: "此",
  },
  {
    hanzi: "些",
  },
  {
    hanzi: "能",
  },
  {
    hanzi: "夕",
  },
  {
    hanzi: "多",
  },
  {
    hanzi: "名",
  },
  {
    hanzi: "够",
  },
  {
    hanzi: "外",
  },
  {
    hanzi: "歹",
  },
  {
    hanzi: "死",
  },
  {
    hanzi: "少",
  },
  {
    hanzi: "吵",
  },
  {
    hanzi: "步",
  },
  {
    hanzi: "贝",
  },
  {
    hanzi: "员",
  },
  {
    hanzi: "贵",
  },
  {
    hanzi: "页",
  },
  {
    hanzi: "题",
  },
  {
    hanzi: "见",
  },
  {
    hanzi: "现",
  },
  {
    hanzi: "首",
  },
  {
    hanzi: "道",
  },
  {
    hanzi: "直",
  },
  {
    hanzi: "真",
  },
  {
    hanzi: "廿",
  },
  {
    hanzi: "甘",
  },
  {
    hanzi: "某",
  },
  {
    hanzi: "其",
  },
  {
    hanzi: "期",
  },
  {
    hanzi: "厂",
  },
  {
    hanzi: "厌",
  },
  {
    hanzi: "斤",
  },
  {
    hanzi: "听",
  },
  {
    hanzi: "近",
  },
  {
    hanzi: "诉",
  },
  {
    hanzi: "后",
  },
  {
    hanzi: "厚",
  },
  {
    hanzi: "反",
  },
  {
    hanzi: "饭",
  },
  {
    hanzi: "饱",
  },
  {
    hanzi: "饿",
  },
  {
    hanzi: "工",
  },
  {
    hanzi: "江",
  },
  {
    hanzi: "左",
  },
  {
    hanzi: "右",
  },
  {
    hanzi: "差",
  },
  {
    hanzi: "红",
  },
  {
    hanzi: "约",
  },
  {
    hanzi: "合",
  },
  {
    hanzi: "给",
  },
  {
    hanzi: "拿",
  },
  {
    hanzi: "穴",
  },
  {
    hanzi: "穿",
  },
  {
    hanzi: "空",
  },
  {
    hanzi: "深",
  },
  {
    hanzi: "式",
  },
  {
    hanzi: "试",
  },
  {
    hanzi: "刀",
  },
  {
    hanzi: "分",
  },
  {
    hanzi: "份",
  },
  {
    hanzi: "切",
  },
  {
    hanzi: "划",
  },
  {
    hanzi: "别",
  },
  {
    hanzi: "刚",
  },
  {
    hanzi: "班",
  },
  {
    hanzi: "前",
  },
  {
    hanzi: "召",
  },
  {
    hanzi: "绍",
  },
  {
    hanzi: "照",
  },
  {
    hanzi: "片",
  },
  {
    hanzi: "至",
  },
  {
    hanzi: "到",
  },
  {
    hanzi: "井",
  },
  {
    hanzi: "进",
  },
  {
    hanzi: "山",
  },
  {
    hanzi: "出",
  },
  {
    hanzi: "岁",
  },
  {
    hanzi: "亦",
  },
  {
    hanzi: "变",
  },
  {
    hanzi: "田",
  },
  {
    hanzi: "果",
  },
  {
    hanzi: "课",
  },
  {
    hanzi: "思",
  },
  {
    hanzi: "单",
  },
  {
    hanzi: "鱼",
  },
  {
    hanzi: "男",
  },
  {
    hanzi: "累",
  },
  {
    hanzi: "花",
  },
  {
    hanzi: "草",
  },
  {
    hanzi: "猫",
  },
  {
    hanzi: "药",
  },
  {
    hanzi: "宽",
  },
  {
    hanzi: "采",
  },
  {
    hanzi: "菜",
  },
  {
    hanzi: "受",
  },
  {
    hanzi: "爱",
  },
  {
    hanzi: "共",
  },
  {
    hanzi: "借",
  },
  {
    hanzi: "错",
  },
  {
    hanzi: "收",
  },
  {
    hanzi: "改",
  },
  {
    hanzi: "数",
  },
  {
    hanzi: "古",
  },
  {
    hanzi: "苦",
  },
  {
    hanzi: "做",
  },
  {
    hanzi: "者",
  },
  {
    hanzi: "猪",
  },
  {
    hanzi: "都",
  },
  {
    hanzi: "老",
  },
  {
    hanzi: "孝",
  },
  {
    hanzi: "教",
  },
  {
    hanzi: "五",
  },
  {
    hanzi: "语",
  },
  {
    hanzi: "广",
  },
  {
    hanzi: "床",
  },
  {
    hanzi: "店",
  },
  {
    hanzi: "应",
  },
  {
    hanzi: "兴",
  },
  {
    hanzi: "学",
  },
  {
    hanzi: "觉",
  },
  {
    hanzi: "亥",
  },
  {
    hanzi: "该",
  },
  {
    hanzi: "孩",
  },
  {
    hanzi: "水",
  },
  {
    hanzi: "冰",
  },
  {
    hanzi: "求",
  },
  {
    hanzi: "球",
  },
  {
    hanzi: "救",
  },
  {
    hanzi: "火",
  },
  {
    hanzi: "灯",
  },
  {
    hanzi: "烦",
  },
  {
    hanzi: "里",
  },
  {
    hanzi: "重",
  },
  {
    hanzi: "懂",
  },
  {
    hanzi: "黑",
  },
  {
    hanzi: "乍",
  },
  {
    hanzi: "作",
  },
  {
    hanzi: "昨",
  },
  {
    hanzi: "怎",
  },
  {
    hanzi: "窄",
  },
  {
    hanzi: "丰",
  },
  {
    hanzi: "青",
  },
  {
    hanzi: "请",
  },
  {
    hanzi: "情",
  },
  {
    hanzi: "表",
  },
  {
    hanzi: "生",
  },
  {
    hanzi: "星",
  },
  {
    hanzi: "姓",
  },
  {
    hanzi: "免",
  },
  {
    hanzi: "晚",
  },
  {
    hanzi: "家",
  },
  {
    hanzi: "象",
  },
  {
    hanzi: "像",
  },
  {
    hanzi: "头",
  },
  {
    hanzi: "实",
  },
  {
    hanzi: "买",
  },
  {
    hanzi: "卖",
  },
  {
    hanzi: "读",
  },
  {
    hanzi: "牛",
  },
  {
    hanzi: "特",
  },
  {
    hanzi: "件",
  },
  {
    hanzi: "告",
  },
  {
    hanzi: "先",
  },
  {
    hanzi: "洗",
  },
  {
    hanzi: "角",
  },
  {
    hanzi: "解",
  },
  {
    hanzi: "当",
  },
  {
    hanzi: "扫",
  },
  {
    hanzi: "事",
  },
  {
    hanzi: "史",
  },
  {
    hanzi: "使",
  },
  {
    hanzi: "更",
  },
  {
    hanzi: "便",
  },
  {
    hanzi: "石",
  },
  {
    hanzi: "硬",
  },
  {
    hanzi: "车",
  },
  {
    hanzi: "连",
  },
  {
    hanzi: "辆",
  },
  {
    hanzi: "较",
  },
  {
    hanzi: "轻",
  },
  {
    hanzi: "经",
  },
  {
    hanzi: "与",
  },
  {
    hanzi: "写",
  },
  {
    hanzi: "士",
  },
  {
    hanzi: "任",
  },
  {
    hanzi: "豆",
  },
  {
    hanzi: "喜",
  },
  {
    hanzi: "高",
  },
  {
    hanzi: "搞",
  },
  {
    hanzi: "亭",
  },
  {
    hanzi: "停",
  },
  {
    hanzi: "九",
  },
  {
    hanzi: "丸",
  },
  {
    hanzi: "执",
  },
  {
    hanzi: "热",
  },
  {
    hanzi: "京",
  },
  {
    hanzi: "景",
  },
  {
    hanzi: "影",
  },
  {
    hanzi: "尤",
  },
  {
    hanzi: "就",
  },
  {
    hanzi: "成",
  },
  {
    hanzi: "城",
  },
  {
    hanzi: "越",
  },
  {
    hanzi: "咸",
  },
  {
    hanzi: "感",
  },
  {
    hanzi: "钱",
  },
  {
    hanzi: "浅",
  },
  {
    hanzi: "巾",
  },
  {
    hanzi: "帅",
  },
  {
    hanzi: "师",
  },
  {
    hanzi: "市",
  },
  {
    hanzi: "带",
  },
  {
    hanzi: "邦",
  },
  {
    hanzi: "帮",
  },
  {
    hanzi: "常",
  },
  {
    hanzi: "非",
  },
  {
    hanzi: "雨",
  },
  {
    hanzi: "雪",
  },
  {
    hanzi: "冬",
  },
  {
    hanzi: "图",
  },
  {
    hanzi: "各",
  },
  {
    hanzi: "客",
  },
  {
    hanzi: "务",
  },
  {
    hanzi: "备",
  },
  {
    hanzi: "夏",
  },
  {
    hanzi: "令",
  },
  {
    hanzi: "冷",
  },
  {
    hanzi: "足",
  },
  {
    hanzi: "跑",
  },
  {
    hanzi: "路",
  },
  {
    hanzi: "跟",
  },
  {
    hanzi: "示",
  },
  {
    hanzi: "票",
  },
  {
    hanzi: "视",
  },
  {
    hanzi: "知",
  },
  {
    hanzi: "短",
  },
  {
    hanzi: "医",
  },
  {
    hanzi: "矮",
  },
  {
    hanzi: "侯",
  },
  {
    hanzi: "候",
  },
  {
    hanzi: "弓",
  },
  {
    hanzi: "张",
  },
  {
    hanzi: "虫",
  },
  {
    hanzi: "虽",
  },
  {
    hanzi: "强",
  },
  {
    hanzi: "弱",
  },
  {
    hanzi: "弟",
  },
  {
    hanzi: "第",
  },
  {
    hanzi: "隹",
  },
  {
    hanzi: "谁",
  },
  {
    hanzi: "推",
  },
  {
    hanzi: "难",
  },
  {
    hanzi: "准",
  },
  {
    hanzi: "夭",
  },
  {
    hanzi: "笑",
  },
  {
    hanzi: "立",
  },
  {
    hanzi: "位",
  },
  {
    hanzi: "音",
  },
  {
    hanzi: "意",
  },
  {
    hanzi: "站",
  },
  {
    hanzi: "拉",
  },
  {
    hanzi: "接",
  },
  {
    hanzi: "亲",
  },
  {
    hanzi: "新",
  },
  {
    hanzi: "杀",
  },
  {
    hanzi: "条",
  },
  {
    hanzi: "乐",
  },
  {
    hanzi: "茶",
  },
  {
    hanzi: "乃",
  },
  {
    hanzi: "扔",
  },
  {
    hanzi: "奶",
  },
  {
    hanzi: "及",
  },
  {
    hanzi: "尸",
  },
  {
    hanzi: "呢",
  },
  {
    hanzi: "户",
  },
  {
    hanzi: "所",
  },
  {
    hanzi: "声",
  },
  {
    hanzi: "欠",
  },
  {
    hanzi: "吹",
  },
  {
    hanzi: "歌",
  },
  {
    hanzi: "软",
  },
  {
    hanzi: "次",
  },
  {
    hanzi: "欢",
  },
  {
    hanzi: "亡",
  },
  {
    hanzi: "忘",
  },
  {
    hanzi: "忙",
  },
  {
    hanzi: "万",
  },
  {
    hanzi: "方",
  },
  {
    hanzi: "放",
  },
  {
    hanzi: "房",
  },
  {
    hanzi: "巴",
  },
  {
    hanzi: "吧",
  },
  {
    hanzi: "把",
  },
  {
    hanzi: "色",
  },
  {
    hanzi: "而",
  },
  {
    hanzi: "需",
  },
  {
    hanzi: "且",
  },
  {
    hanzi: "姐",
  },
  {
    hanzi: "宜",
  },
  {
    hanzi: "丙",
  },
  {
    hanzi: "病",
  },
  {
    hanzi: "疼",
  },
  {
    hanzi: "氏",
  },
  {
    hanzi: "纸",
  },
  {
    hanzi: "低",
  },
  {
    hanzi: "北",
  },
  {
    hanzi: "南",
  },
  {
    hanzi: "垂",
  },
  {
    hanzi: "睡",
  },
  {
    hanzi: "海",
  },
  {
    hanzi: "毒",
  },
  {
    hanzi: "洋",
  },
  {
    hanzi: "鲜",
  },
  {
    hanzi: "原",
  },
  {
    hanzi: "源",
  },
  {
    hanzi: "愿",
  },
  {
    hanzi: "川",
  },
  {
    hanzi: "州",
  },
  {
    hanzi: "洲",
  },
  {
    hanzi: "弃",
  },
  {
    hanzi: "育",
  },
  {
    hanzi: "充",
  },
  {
    hanzi: "流",
  },
  {
    hanzi: "统",
  },
  {
    hanzi: "齐",
  },
  {
    hanzi: "济",
  },
  {
    hanzi: "剂",
  },
  {
    hanzi: "清",
  },
  {
    hanzi: "精",
  },
  {
    hanzi: "消",
  },
  {
    hanzi: "治",
  },
  {
    hanzi: "落",
  },
  {
    hanzi: "露",
  },
  {
    hanzi: "满",
  },
  {
    hanzi: "酒",
  },
  {
    hanzi: "配",
  },
  {
    hanzi: "醒",
  },
  {
    hanzi: "尊",
  },
  {
    hanzi: "酷",
  },
  {
    hanzi: "酸",
  },
  {
    hanzi: "波",
  },
  {
    hanzi: "胡",
  },
  {
    hanzi: "湖",
  },
  {
    hanzi: "永",
  },
  {
    hanzi: "泳",
  },
  {
    hanzi: "脉",
  },
  {
    hanzi: "承",
  },
  {
    hanzi: "兰",
  },
  {
    hanzi: "之",
  },
  {
    hanzi: "乏",
  },
  {
    hanzi: "派",
  },
  {
    hanzi: "游",
  },
  {
    hanzi: "施",
  },
  {
    hanzi: "族",
  },
  {
    hanzi: "旅",
  },
  {
    hanzi: "良",
  },
  {
    hanzi: "浪",
  },
  {
    hanzi: "郎",
  },
  {
    hanzi: "娘",
  },
  {
    hanzi: "姑",
  },
  {
    hanzi: "沙",
  },
  {
    hanzi: "省",
  },
  {
    hanzi: "眼",
  },
  {
    hanzi: "睛",
  },
  {
    hanzi: "沉",
  },
  {
    hanzi: "染",
  },
  {
    hanzi: "究",
  },
  {
    hanzi: "杂",
  },
  {
    hanzi: "余",
  },
  {
    hanzi: "除",
  },
  {
    hanzi: "途",
  },
  {
    hanzi: "汇",
  },
  {
    hanzi: "巨",
  },
  {
    hanzi: "距",
  },
  {
    hanzi: "涨",
  },
  {
    hanzi: "湾",
  },
  {
    hanzi: "引",
  },
  {
    hanzi: "弹",
  },
  {
    hanzi: "淡",
  },
  {
    hanzi: "润",
  },
  {
    hanzi: "渐",
  },
  {
    hanzi: "汗",
  },
  {
    hanzi: "平",
  },
  {
    hanzi: "幸",
  },
  {
    hanzi: "赶",
  },
  {
    hanzi: "超",
  },
  {
    hanzi: "趣",
  },
  {
    hanzi: "聚",
  },
  {
    hanzi: "汁",
  },
  {
    hanzi: "泼",
  },
  {
    hanzi: "演",
  },
  {
    hanzi: "勿",
  },
  {
    hanzi: "物",
  },
  {
    hanzi: "易",
  },
  {
    hanzi: "踢",
  },
  {
    hanzi: "汤",
  },
  {
    hanzi: "场",
  },
  {
    hanzi: "杨",
  },
  {
    hanzi: "扬",
  },
  {
    hanzi: "持",
  },
  {
    hanzi: "待",
  },
  {
    hanzi: "征",
  },
  {
    hanzi: "微",
  },
  {
    hanzi: "据",
  },
  {
    hanzi: "投",
  },
  {
    hanzi: "指",
  },
  {
    hanzi: "龙",
  },
  {
    hanzi: "技",
  },
  {
    hanzi: "鼓",
  },
  {
    hanzi: "护",
  },
  {
    hanzi: "扁",
  },
  {
    hanzi: "编",
  },
  {
    hanzi: "偏",
  },
  {
    hanzi: "遍",
  },
  {
    hanzi: "篇",
  },
  {
    hanzi: "骗",
  },
  {
    hanzi: "控",
  },
  {
    hanzi: "按",
  },
  {
    hanzi: "招",
  },
  {
    hanzi: "括",
  },
  {
    hanzi: "掉",
  },
  {
    hanzi: "托",
  },
  {
    hanzi: "挥",
  },
  {
    hanzi: "损",
  },
  {
    hanzi: "折",
  },
  {
    hanzi: "爪",
  },
  {
    hanzi: "抓",
  },
  {
    hanzi: "瓜",
  },
  {
    hanzi: "孤",
  },
  {
    hanzi: "爬",
  },
  {
    hanzi: "拥",
  },
  {
    hanzi: "抢",
  },
  {
    hanzi: "探",
  },
  {
    hanzi: "兆",
  },
  {
    hanzi: "挑",
  },
  {
    hanzi: "跳",
  },
  {
    hanzi: "逃",
  },
  {
    hanzi: "扩",
  },
  {
    hanzi: "批",
  },
  {
    hanzi: "混",
  },
  {
    hanzi: "毕",
  },
  {
    hanzi: "措",
  },
  {
    hanzi: "展",
  },
  {
    hanzi: "授",
  },
  {
    hanzi: "延",
  },
  {
    hanzi: "挺",
  },
  {
    hanzi: "庭",
  },
  {
    hanzi: "抱",
  },
  {
    hanzi: "扰",
  },
  {
    hanzi: "抬",
  },
  {
    hanzi: "扮",
  },
  {
    hanzi: "粉",
  },
  {
    hanzi: "拾",
  },
  {
    hanzi: "术",
  },
  {
    hanzi: "格",
  },
  {
    hanzi: "标",
  },
  {
    hanzi: "林",
  },
  {
    hanzi: "禁",
  },
  {
    hanzi: "际",
  },
  {
    hanzi: "梦",
  },
  {
    hanzi: "麻",
  },
  {
    hanzi: "摩",
  },
  {
    hanzi: "楚",
  },
  {
    hanzi: "蛋",
  },
  {
    hanzi: "森",
  },
  {
    hanzi: "查",
  },
  {
    hanzi: "集",
  },
  {
    hanzi: "案",
  },
  {
    hanzi: "未",
  },
  {
    hanzi: "味",
  },
  {
    hanzi: "妹",
  },
  {
    hanzi: "根",
  },
  {
    hanzi: "极",
  },
  {
    hanzi: "勾",
  },
  {
    hanzi: "构",
  },
  {
    hanzi: "购",
  },
  {
    hanzi: "沟",
  },
  {
    hanzi: "村",
  },
  {
    hanzi: "树",
  },
  {
    hanzi: "板",
  },
  {
    hanzi: "版",
  },
  {
    hanzi: "材",
  },
  {
    hanzi: "析",
  },
  {
    hanzi: "束",
  },
  {
    hanzi: "整",
  },
  {
    hanzi: "辛",
  },
  {
    hanzi: "辣",
  },
  {
    hanzi: "核",
  },
  {
    hanzi: "刻",
  },
  {
    hanzi: "咳",
  },
  {
    hanzi: "嗽",
  },
  {
    hanzi: "松",
  },
  {
    hanzi: "架",
  },
  {
    hanzi: "枪",
  },
  {
    hanzi: "档",
  },
  {
    hanzi: "光",
  },
  {
    hanzi: "梯",
  },
  {
    hanzi: "朵",
  },
  {
    hanzi: "棵",
  },
  {
    hanzi: "柿",
  },
  {
    hanzi: "橡",
  },
  {
    hanzi: "植",
  },
  {
    hanzi: "置",
  },
  {
    hanzi: "值",
  },
  {
    hanzi: "罗",
  },
  {
    hanzi: "保",
  },
  {
    hanzi: "价",
  },
  {
    hanzi: "界",
  },
  {
    hanzi: "养",
  },
  {
    hanzi: "阶",
  },
  {
    hanzi: "专",
  },
  {
    hanzi: "传",
  },
  {
    hanzi: "转",
  },
  {
    hanzi: "何",
  },
  {
    hanzi: "供",
  },
  {
    hanzi: "港",
  },
  {
    hanzi: "暴",
  },
  {
    hanzi: "爆",
  },
  {
    hanzi: "伤",
  },
  {
    hanzi: "优",
  },
  {
    hanzi: "仅",
  },
  {
    hanzi: "夜",
  },
  {
    hanzi: "液",
  },
  {
    hanzi: "依",
  },
  {
    hanzi: "假",
  },
  {
    hanzi: "倒",
  },
  {
    hanzi: "致",
  },
  {
    hanzi: "室",
  },
  {
    hanzi: "屋",
  },
  {
    hanzi: "似",
  },
  {
    hanzi: "仍",
  },
  {
    hanzi: "促",
  },
  {
    hanzi: "伙",
  },
  {
    hanzi: "伴",
  },
  {
    hanzi: "估",
  },
  {
    hanzi: "倍",
  },
  {
    hanzi: "俩",
  },
  {
    hanzi: "伪",
  },
  {
    hanzi: "尹",
  },
  {
    hanzi: "伊",
  },
  {
    hanzi: "康",
  },
  {
    hanzi: "争",
  },
  {
    hanzi: "静",
  },
  {
    hanzi: "净",
  },
  {
    hanzi: "减",
  },
  {
    hanzi: "律",
  },
  {
    hanzi: "建",
  },
  {
    hanzi: "健",
  },
  {
    hanzi: "君",
  },
  {
    hanzi: "群",
  },
  {
    hanzi: "向",
  },
  {
    hanzi: "响",
  },
  {
    hanzi: "尚",
  },
  {
    hanzi: "躺",
  },
  {
    hanzi: "趟",
  },
  {
    hanzi: "品",
  },
  {
    hanzi: "噪",
  },
  {
    hanzi: "操",
  },
  {
    hanzi: "澡",
  },
  {
    hanzi: "器",
  },
  {
    hanzi: "突",
  },
  {
    hanzi: "曾",
  },
  {
    hanzi: "增",
  },
  {
    hanzi: "号",
  },
  {
    hanzi: "亏",
  },
  {
    hanzi: "污",
  },
  {
    hanzi: "考",
  },
  {
    hanzi: "巧",
  },
  {
    hanzi: "由",
  },
  {
    hanzi: "油",
  },
  {
    hanzi: "聘",
  },
  {
    hanzi: "抽",
  },
  {
    hanzi: "黄",
  },
  {
    hanzi: "害",
  },
  {
    hanzi: "拜",
  },
  {
    hanzi: "峰",
  },
  {
    hanzi: "否",
  },
  {
    hanzi: "舍",
  },
  {
    hanzi: "哈",
  },
  {
    hanzi: "命",
  },
  {
    hanzi: "善",
  },
  {
    hanzi: "吉",
  },
  {
    hanzi: "叶",
  },
  {
    hanzi: "吸",
  },
  {
    hanzi: "于",
  },
  {
    hanzi: "乎",
  },
  {
    hanzi: "呼",
  },
  {
    hanzi: "呀",
  },
  {
    hanzi: "含",
  },
  {
    hanzi: "嘴",
  },
  {
    hanzi: "确",
  },
  {
    hanzi: "售",
  },
  {
    hanzi: "啦",
  },
  {
    hanzi: "咱",
  },
  {
    hanzi: "哦",
  },
  {
    hanzi: "咖",
  },
  {
    hanzi: "啡",
  },
  {
    hanzi: "排",
  },
  {
    hanzi: "罪",
  },
  {
    hanzi: "靠",
  },
  {
    hanzi: "喝",
  },
  {
    hanzi: "渴",
  },
  {
    hanzi: "歇",
  },
  {
    hanzi: "结",
  },
  {
    hanzi: "组",
  },
  {
    hanzi: "具",
  },
  {
    hanzi: "惧",
  },
  {
    hanzi: "线",
  },
  {
    hanzi: "级",
  },
  {
    hanzi: "续",
  },
  {
    hanzi: "织",
  },
  {
    hanzi: "职",
  },
  {
    hanzi: "终",
  },
  {
    hanzi: "细",
  },
  {
    hanzi: "维",
  },
  {
    hanzi: "焦",
  },
  {
    hanzi: "蕉",
  },
  {
    hanzi: "熊",
  },
  {
    hanzi: "继",
  },
  {
    hanzi: "世",
  },
  {
    hanzi: "绝",
  },
  {
    hanzi: "负",
  },
  {
    hanzi: "赖",
  },
  {
    hanzi: "懒",
  },
  {
    hanzi: "纪",
  },
  {
    hanzi: "练",
  },
  {
    hanzi: "纳",
  },
  {
    hanzi: "络",
  },
  {
    hanzi: "丝",
  },
  {
    hanzi: "纯",
  },
  {
    hanzi: "顿",
  },
  {
    hanzi: "吨",
  },
  {
    hanzi: "绩",
  },
  {
    hanzi: "综",
  },
  {
    hanzi: "缓",
  },
  {
    hanzi: "暖",
  },
  {
    hanzi: "纷",
  },
  {
    hanzi: "纠",
  },
  {
    hanzi: "宿",
  },
  {
    hanzi: "缩",
  },
  {
    hanzi: "互",
  },
  {
    hanzi: "缘",
  },
  {
    hanzi: "制",
  },
  {
    hanzi: "刑",
  },
  {
    hanzi: "型",
  },
  {
    hanzi: "形",
  },
  {
    hanzi: "研",
  },
  {
    hanzi: "则",
  },
  {
    hanzi: "厕",
  },
  {
    hanzi: "测",
  },
  {
    hanzi: "创",
  },
  {
    hanzi: "列",
  },
  {
    hanzi: "例",
  },
  {
    hanzi: "残",
  },
  {
    hanzi: "烈",
  },
  {
    hanzi: "副",
  },
  {
    hanzi: "福",
  },
  {
    hanzi: "富",
  },
  {
    hanzi: "幅",
  },
  {
    hanzi: "剧",
  },
  {
    hanzi: "刘",
  },
  {
    hanzi: "判",
  },
  {
    hanzi: "归",
  },
  {
    hanzi: "刺",
  },
  {
    hanzi: "刷",
  },
  {
    hanzi: "刮",
  },
  {
    hanzi: "俞",
  },
  {
    hanzi: "偷",
  },
  {
    hanzi: "输",
  },
  {
    hanzi: "愉",
  },
  {
    hanzi: "紧",
  },
  {
    hanzi: "索",
  },
  {
    hanzi: "素",
  },
  {
    hanzi: "责",
  },
  {
    hanzi: "达",
  },
  {
    hanzi: "选",
  },
  {
    hanzi: "造",
  },
  {
    hanzi: "适",
  },
  {
    hanzi: "退",
  },
  {
    hanzi: "遇",
  },
  {
    hanzi: "偶",
  },
  {
    hanzi: "寓",
  },
  {
    hanzi: "追",
  },
  {
    hanzi: "官",
  },
  {
    hanzi: "管",
  },
  {
    hanzi: "馆",
  },
  {
    hanzi: "饺",
  },
  {
    hanzi: "饮",
  },
  {
    hanzi: "迷",
  },
  {
    hanzi: "透",
  },
  {
    hanzi: "述",
  },
  {
    hanzi: "迎",
  },
  {
    hanzi: "印",
  },
  {
    hanzi: "即",
  },
  {
    hanzi: "却",
  },
  {
    hanzi: "脚",
  },
  {
    hanzi: "遗",
  },
  {
    hanzi: "逐",
  },
  {
    hanzi: "逛",
  },
  {
    hanzi: "违",
  },
  {
    hanzi: "避",
  },
  {
    hanzi: "邀",
  },
  {
    hanzi: "激",
  },
  {
    hanzi: "疑",
  },
  {
    hanzi: "予",
  },
  {
    hanzi: "预",
  },
  {
    hanzi: "序",
  },
  {
    hanzi: "野",
  },
  {
    hanzi: "舒",
  },
  {
    hanzi: "无",
  },
  {
    hanzi: "既",
  },
  {
    hanzi: "概",
  },
  {
    hanzi: "击",
  },
  {
    hanzi: "毛",
  },
  {
    hanzi: "丈",
  },
  {
    hanzi: "夫",
  },
  {
    hanzi: "规",
  },
  {
    hanzi: "肤",
  },
  {
    hanzi: "失",
  },
  {
    hanzi: "跌",
  },
  {
    hanzi: "铁",
  },
  {
    hanzi: "升",
  },
  {
    hanzi: "久",
  },
  {
    hanzi: "乡",
  },
  {
    hanzi: "玄",
  },
  {
    hanzi: "幽",
  },
  {
    hanzi: "率",
  },
  {
    hanzi: "利",
  },
  {
    hanzi: "程",
  },
  {
    hanzi: "斗",
  },
  {
    hanzi: "科",
  },
  {
    hanzi: "料",
  },
  {
    hanzi: "称",
  },
  {
    hanzi: "积",
  },
  {
    hanzi: "税",
  },
  {
    hanzi: "季",
  },
  {
    hanzi: "移",
  },
  {
    hanzi: "私",
  },
  {
    hanzi: "秀",
  },
  {
    hanzi: "必",
  },
  {
    hanzi: "秘",
  },
  {
    hanzi: "密",
  },
  {
    hanzi: "租",
  },
  {
    hanzi: "粗",
  },
  {
    hanzi: "秋",
  },
  {
    hanzi: "秒",
  },
  {
    hanzi: "稍",
  },
  {
    hanzi: "队",
  },
  {
    hanzi: "防",
  },
  {
    hanzi: "阿",
  },
  {
    hanzi: "啊",
  },
  {
    hanzi: "限",
  },
  {
    hanzi: "降",
  },
  {
    hanzi: "舞",
  },
  {
    hanzi: "处",
  },
  {
    hanzi: "陈",
  },
  {
    hanzi: "阵",
  },
  {
    hanzi: "陆",
  },
  {
    hanzi: "附",
  },
  {
    hanzi: "障",
  },
  {
    hanzi: "阻",
  },
  {
    hanzi: "陪",
  },
  {
    hanzi: "邮",
  },
  {
    hanzi: "邻",
  },
  {
    hanzi: "郊",
  },
  {
    hanzi: "理",
  },
  {
    hanzi: "量",
  },
  {
    hanzi: "望",
  },
  {
    hanzi: "环",
  },
  {
    hanzi: "弄",
  },
  {
    hanzi: "皇",
  },
  {
    hanzi: "泉",
  },
  {
    hanzi: "貌",
  },
  {
    hanzi: "卑",
  },
  {
    hanzi: "牌",
  },
  {
    hanzi: "啤",
  },
  {
    hanzi: "脾",
  },
  {
    hanzi: "基",
  },
  {
    hanzi: "社",
  },
  {
    hanzi: "礼",
  },
  {
    hanzi: "祝",
  },
  {
    hanzi: "竟",
  },
  {
    hanzi: "境",
  },
  {
    hanzi: "镜",
  },
  {
    hanzi: "压",
  },
  {
    hanzi: "均",
  },
  {
    hanzi: "坚",
  },
  {
    hanzi: "域",
  },
  {
    hanzi: "培",
  },
  {
    hanzi: "圣",
  },
  {
    hanzi: "址",
  },
  {
    hanzi: "填",
  },
  {
    hanzi: "堵",
  },
  {
    hanzi: "垃",
  },
  {
    hanzi: "圾",
  },
  {
    hanzi: "丑",
  },
  {
    hanzi: "羞",
  },
  {
    hanzi: "塑",
  },
  {
    hanzi: "逆",
  },
  {
    hanzi: "股",
  },
  {
    hanzi: "胜",
  },
  {
    hanzi: "胞",
  },
  {
    hanzi: "腿",
  },
  {
    hanzi: "脱",
  },
  {
    hanzi: "阅",
  },
  {
    hanzi: "肥",
  },
  {
    hanzi: "爸",
  },
  {
    hanzi: "肯",
  },
  {
    hanzi: "阴",
  },
  {
    hanzi: "肿",
  },
  {
    hanzi: "冲",
  },
  {
    hanzi: "膏",
  },
  {
    hanzi: "胳",
  },
  {
    hanzi: "朝",
  },
  {
    hanzi: "潮",
  },
  {
    hanzi: "韩",
  },
  {
    hanzi: "赢",
  },
  {
    hanzi: "背",
  },
  {
    hanzi: "肌",
  },
  {
    hanzi: "胶",
  },
  {
    hanzi: "乘",
  },
  {
    hanzi: "剩",
  },
  {
    hanzi: "骨",
  },
  {
    hanzi: "滑",
  },
  {
    hanzi: "区",
  },
  {
    hanzi: "欧",
  },
  {
    hanzi: "义",
  },
  {
    hanzi: "议",
  },
  {
    hanzi: "希",
  },
  {
    hanzi: "凶",
  },
  {
    hanzi: "曲",
  },
  {
    hanzi: "典",
  },
  {
    hanzi: "胸",
  },
  {
    hanzi: "齿",
  },
  {
    hanzi: "龄",
  },
  {
    hanzi: "离",
  },
  {
    hanzi: "脑",
  },
  {
    hanzi: "恼",
  },
  {
    hanzi: "功",
  },
  {
    hanzi: "势",
  },
  {
    hanzi: "助",
  },
  {
    hanzi: "历",
  },
  {
    hanzi: "努",
  },
  {
    hanzi: "劲",
  },
  {
    hanzi: "穷",
  },
  {
    hanzi: "勇",
  },
  {
    hanzi: "通",
  },
  {
    hanzi: "桶",
  },
  {
    hanzi: "痛",
  },
  {
    hanzi: "疗",
  },
  {
    hanzi: "症",
  },
  {
    hanzi: "瘦",
  },
  {
    hanzi: "搜",
  },
  {
    hanzi: "疯",
  },
  {
    hanzi: "疾",
  },
  {
    hanzi: "业",
  },
  {
    hanzi: "亚",
  },
  {
    hanzi: "显",
  },
  {
    hanzi: "普",
  },
  {
    hanzi: "严",
  },
  {
    hanzi: "恶",
  },
  {
    hanzi: "卫",
  },
  {
    hanzi: "武",
  },
  {
    hanzi: "丽",
  },
  {
    hanzi: "导",
  },
  {
    hanzi: "民",
  },
  {
    hanzi: "异",
  },
  {
    hanzi: "将",
  },
  {
    hanzi: "装",
  },
  {
    hanzi: "奖",
  },
  {
    hanzi: "状",
  },
  {
    hanzi: "射",
  },
  {
    hanzi: "寻",
  },
  {
    hanzi: "耐",
  },
  {
    hanzi: "冠",
  },
  {
    hanzi: "节",
  },
  {
    hanzi: "爷",
  },
  {
    hanzi: "范",
  },
  {
    hanzi: "艺",
  },
  {
    hanzi: "瓦",
  },
  {
    hanzi: "瓶",
  },
  {
    hanzi: "饼",
  },
  {
    hanzi: "著",
  },
  {
    hanzi: "若",
  },
  {
    hanzi: "苹",
  },
  {
    hanzi: "苏",
  },
  {
    hanzi: "协",
  },
  {
    hanzi: "胁",
  },
  {
    hanzi: "藏",
  },
  {
    hanzi: "吕",
  },
  {
    hanzi: "宫",
  },
  {
    hanzi: "营",
  },
  {
    hanzi: "劳",
  },
  {
    hanzi: "荣",
  },
  {
    hanzi: "论",
  },
  {
    hanzi: "评",
  },
  {
    hanzi: "讯",
  },
  {
    hanzi: "讲",
  },
  {
    hanzi: "证",
  },
  {
    hanzi: "谈",
  },
  {
    hanzi: "训",
  },
  {
    hanzi: "访",
  },
  {
    hanzi: "误",
  },
  {
    hanzi: "订",
  },
  {
    hanzi: "诊",
  },
  {
    hanzi: "诺",
  },
  {
    hanzi: "诚",
  },
  {
    hanzi: "详",
  },
  {
    hanzi: "谊",
  },
  {
    hanzi: "县",
  },
  {
    hanzi: "谅",
  },
  {
    hanzi: "凉",
  },
  {
    hanzi: "度",
  },
  {
    hanzi: "席",
  },
  {
    hanzi: "府",
  },
  {
    hanzi: "底",
  },
  {
    hanzi: "座",
  },
  {
    hanzi: "庆",
  },
  {
    hanzi: "矿",
  },
  {
    hanzi: "破",
  },
  {
    hanzi: "础",
  },
  {
    hanzi: "碍",
  },
  {
    hanzi: "码",
  },
  {
    hanzi: "库",
  },
  {
    hanzi: "庄",
  },
  {
    hanzi: "脏",
  },
  {
    hanzi: "唐",
  },
  {
    hanzi: "糖",
  },
  {
    hanzi: "领",
  },
  {
    hanzi: "零",
  },
  {
    hanzi: "项",
  },
  {
    hanzi: "须",
  },
  {
    hanzi: "修",
  },
  {
    hanzi: "彩",
  },
  {
    hanzi: "额",
  },
  {
    hanzi: "彦",
  },
  {
    hanzi: "颜",
  },
  {
    hanzi: "顺",
  },
  {
    hanzi: "顾",
  },
  {
    hanzi: "频",
  },
  {
    hanzi: "顶",
  },
  {
    hanzi: "硕",
  },
  {
    hanzi: "态",
  },
  {
    hanzi: "志",
  },
  {
    hanzi: "念",
  },
  {
    hanzi: "恋",
  },
  {
    hanzi: "蛮",
  },
  {
    hanzi: "恩",
  },
  {
    hanzi: "怨",
  },
  {
    hanzi: "宛",
  },
  {
    hanzi: "腕",
  },
  {
    hanzi: "碗",
  },
  {
    hanzi: "德",
  },
  {
    hanzi: "急",
  },
  {
    hanzi: "隐",
  },
  {
    hanzi: "稳",
  },
  {
    hanzi: "悲",
  },
  {
    hanzi: "串",
  },
  {
    hanzi: "患",
  },
  {
    hanzi: "虑",
  },
  {
    hanzi: "虚",
  },
  {
    hanzi: "虎",
  },
  {
    hanzi: "忍",
  },
  {
    hanzi: "企",
  },
  {
    hanzi: "众",
  },
  {
    hanzi: "食",
  },
  {
    hanzi: "餐",
  },
  {
    hanzi: "伞",
  },
  {
    hanzi: "谷",
  },
  {
    hanzi: "容",
  },
  {
    hanzi: "欲",
  },
  {
    hanzi: "复",
  },
  {
    hanzi: "阳",
  },
  {
    hanzi: "申",
  },
  {
    hanzi: "审",
  },
  {
    hanzi: "神",
  },
  {
    hanzi: "智",
  },
  {
    hanzi: "暗",
  },
  {
    hanzi: "辰",
  },
  {
    hanzi: "晨",
  },
  {
    hanzi: "震",
  },
  {
    hanzi: "晴",
  },
  {
    hanzi: "暑",
  },
  {
    hanzi: "怪",
  },
  {
    hanzi: "性",
  },
  {
    hanzi: "怀",
  },
  {
    hanzi: "惊",
  },
  {
    hanzi: "惜",
  },
  {
    hanzi: "忆",
  },
  {
    hanzi: "悔",
  },
  {
    hanzi: "憾",
  },
  {
    hanzi: "怖",
  },
  {
    hanzi: "怜",
  },
  {
    hanzi: "贯",
  },
  {
    hanzi: "惯",
  },
  {
    hanzi: "华",
  },
  {
    hanzi: "克",
  },
  {
    hanzi: "党",
  },
  {
    hanzi: "掌",
  },
  {
    hanzi: "堂",
  },
  {
    hanzi: "甫",
  },
  {
    hanzi: "葡",
  },
  {
    hanzi: "萄",
  },
  {
    hanzi: "缺",
  },
  {
    hanzi: "筷",
  },
  {
    hanzi: "傅",
  },
  {
    hanzi: "博",
  },
  {
    hanzi: "膊",
  },
  {
    hanzi: "薄",
  },
  {
    hanzi: "产",
  },
  {
    hanzi: "质",
  },
  {
    hanzi: "厅",
  },
  {
    hanzi: "厉",
  },
  {
    hanzi: "励",
  },
  {
    hanzi: "危",
  },
  {
    hanzi: "厨",
  },
  {
    hanzi: "登",
  },
  {
    hanzi: "段",
  },
  {
    hanzi: "锻",
  },
  {
    hanzi: "政",
  },
  {
    hanzi: "效",
  },
  {
    hanzi: "故",
  },
  {
    hanzi: "散",
  },
  {
    hanzi: "攻",
  },
  {
    hanzi: "败",
  },
  {
    hanzi: "敢",
  },
  {
    hanzi: "聪",
  },
  {
    hanzi: "敌",
  },
  {
    hanzi: "敬",
  },
  {
    hanzi: "警",
  },
  {
    hanzi: "傲",
  },
  {
    hanzi: "熬",
  },
  {
    hanzi: "局",
  },
  {
    hanzi: "居",
  },
  {
    hanzi: "层",
  },
  {
    hanzi: "尝",
  },
  {
    hanzi: "偿",
  },
  {
    hanzi: "属",
  },
  {
    hanzi: "尼",
  },
  {
    hanzi: "届",
  },
  {
    hanzi: "尺",
  },
  {
    hanzi: "尽",
  },
  {
    hanzi: "迟",
  },
  {
    hanzi: "屏",
  },
  {
    hanzi: "权",
  },
  {
    hanzi: "观",
  },
  {
    hanzi: "双",
  },
  {
    hanzi: "摄",
  },
  {
    hanzi: "戏",
  },
  {
    hanzi: "敲",
  },
  {
    hanzi: "叔",
  },
  {
    hanzi: "督",
  },
  {
    hanzi: "戚",
  },
  {
    hanzi: "椒",
  },
  {
    hanzi: "血",
  },
  {
    hanzi: "益",
  },
  {
    hanzi: "温",
  },
  {
    hanzi: "监",
  },
  {
    hanzi: "临",
  },
  {
    hanzi: "篮",
  },
  {
    hanzi: "蓝",
  },
  {
    hanzi: "盛",
  },
  {
    hanzi: "盖",
  },
  {
    hanzi: "盟",
  },
  {
    hanzi: "盐",
  },
  {
    hanzi: "盒",
  },
  {
    hanzi: "宣",
  },
  {
    hanzi: "宁",
  },
  {
    hanzi: "守",
  },
  {
    hanzi: "灾",
  },
  {
    hanzi: "宗",
  },
  {
    hanzi: "奥",
  },
  {
    hanzi: "祭",
  },
  {
    hanzi: "察",
  },
  {
    hanzi: "擦",
  },
  {
    hanzi: "赛",
  },
  {
    hanzi: "寒",
  },
  {
    hanzi: "塞",
  },
  {
    hanzi: "春",
  },
  {
    hanzi: "奉",
  },
  {
    hanzi: "棒",
  },
  {
    hanzi: "举",
  },
  {
    hanzi: "择",
  },
  {
    hanzi: "播",
  },
  {
    hanzi: "释",
  },
  {
    hanzi: "译",
  },
  {
    hanzi: "悉",
  },
  {
    hanzi: "羽",
  },
  {
    hanzi: "翻",
  },
  {
    hanzi: "扇",
  },
  {
    hanzi: "旁",
  },
  {
    hanzi: "童",
  },
  {
    hanzi: "竞",
  },
  {
    hanzi: "章",
  },
  {
    hanzi: "端",
  },
  {
    hanzi: "帝",
  },
  {
    hanzi: "商",
  },
  {
    hanzi: "橘",
  },
  {
    hanzi: "费",
  },
  {
    hanzi: "佛",
  },
  {
    hanzi: "聊",
  },
  {
    hanzi: "贸",
  },
  {
    hanzi: "留",
  },
  {
    hanzi: "债",
  },
  {
    hanzi: "贴",
  },
  {
    hanzi: "战",
  },
  {
    hanzi: "赔",
  },
  {
    hanzi: "财",
  },
  {
    hanzi: "贫",
  },
  {
    hanzi: "贷",
  },
  {
    hanzi: "贡",
  },
  {
    hanzi: "参",
  },
  {
    hanzi: "类",
  },
  {
    hanzi: "央",
  },
  {
    hanzi: "英",
  },
  {
    hanzi: "映",
  },
  {
    hanzi: "换",
  },
  {
    hanzi: "奋",
  },
  {
    hanzi: "夺",
  },
  {
    hanzi: "莫",
  },
  {
    hanzi: "模",
  },
  {
    hanzi: "幕",
  },
  {
    hanzi: "膜",
  },
  {
    hanzi: "羡",
  },
  {
    hanzi: "慕",
  },
  {
    hanzi: "存",
  },
  {
    hanzi: "李",
  },
  {
    hanzi: "享",
  },
  {
    hanzi: "亮",
  },
  {
    hanzi: "漂",
  },
  {
    hanzi: "熟",
  },
  {
    hanzi: "孙",
  },
  {
    hanzi: "获",
  },
  {
    hanzi: "献",
  },
  {
    hanzi: "默",
  },
  {
    hanzi: "独",
  },
  {
    hanzi: "融",
  },
  {
    hanzi: "犯",
  },
  {
    hanzi: "狂",
  },
  {
    hanzi: "猜",
  },
  {
    hanzi: "检",
  },
  {
    hanzi: "验",
  },
  {
    hanzi: "险",
  },
  {
    hanzi: "脸",
  },
  {
    hanzi: "签",
  },
  {
    hanzi: "斯",
  },
  {
    hanzi: "甚",
  },
  {
    hanzi: "断",
  },
  {
    hanzi: "斩",
  },
  {
    hanzi: "暂",
  },
  {
    hanzi: "丘",
  },
  {
    hanzi: "乒",
  },
  {
    hanzi: "乓",
  },
  {
    hanzi: "兵",
  },
  {
    hanzi: "宾",
  },
  {
    hanzi: "军",
  },
  {
    hanzi: "农",
  },
  {
    hanzi: "辑",
  },
  {
    hanzi: "载",
  },
  {
    hanzi: "裁",
  },
  {
    hanzi: "戴",
  },
  {
    hanzi: "舟",
  },
  {
    hanzi: "船",
  },
  {
    hanzi: "般",
  },
  {
    hanzi: "搬",
  },
  {
    hanzi: "抗",
  },
  {
    hanzi: "航",
  },
  {
    hanzi: "盘",
  },
  {
    hanzi: "封",
  },
  {
    hanzi: "佳",
  },
  {
    hanzi: "挂",
  },
  {
    hanzi: "革",
  },
  {
    hanzi: "鞋",
  },
  {
    hanzi: "街",
  },
  {
    hanzi: "策",
  },
  {
    hanzi: "符",
  },
  {
    hanzi: "箱",
  },
  {
    hanzi: "笨",
  },
  {
    hanzi: "笔",
  },
  {
    hanzi: "答",
  },
  {
    hanzi: "巩",
  },
  {
    hanzi: "筑",
  },
  {
    hanzi: "恐",
  },
  {
    hanzi: "委",
  },
  {
    hanzi: "威",
  },
  {
    hanzi: "婚",
  },
  {
    hanzi: "媒",
  },
  {
    hanzi: "妇",
  },
  {
    hanzi: "妻",
  },
  {
    hanzi: "妨",
  },
  {
    hanzi: "围",
  },
  {
    hanzi: "困",
  },
  {
    hanzi: "固",
  },
  {
    hanzi: "圆",
  },
  {
    hanzi: "卷",
  },
  {
    hanzi: "券",
  },
  {
    hanzi: "圈",
  },
  {
    hanzi: "窗",
  },
  {
    hanzi: "帘",
  },
  {
    hanzi: "布",
  },
  {
    hanzi: "币",
  },
  {
    hanzi: "闹",
  },
  {
    hanzi: "冒",
  },
  {
    hanzi: "帽",
  },
  {
    hanzi: "套",
  },
  {
    hanzi: "录",
  },
  {
    hanzi: "绿",
  },
  {
    hanzi: "兼",
  },
  {
    hanzi: "赚",
  },
  {
    hanzi: "歉",
  },
  {
    hanzi: "谦",
  },
  {
    hanzi: "初",
  },
  {
    hanzi: "彻",
  },
  {
    hanzi: "补",
  },
  {
    hanzi: "裤",
  },
  {
    hanzi: "裙",
  },
  {
    hanzi: "衫",
  },
  {
    hanzi: "衬",
  },
  {
    hanzi: "袜",
  },
  {
    hanzi: "略",
  },
  {
    hanzi: "画",
  },
  {
    hanzi: "雷",
  },
  {
    hanzi: "甲",
  },
  {
    hanzi: "鼻",
  },
  {
    hanzi: "畏",
  },
  {
    hanzi: "喂",
  },
  {
    hanzi: "针",
  },
  {
    hanzi: "镇",
  },
  {
    hanzi: "钢",
  },
  {
    hanzi: "键",
  },
  {
    hanzi: "铅",
  },
  {
    hanzi: "钥",
  },
  {
    hanzi: "匙",
  },
  {
    hanzi: "乔",
  },
  {
    hanzi: "骄",
  },
  {
    hanzi: "桥",
  },
  {
    hanzi: "鸟",
  },
  {
    hanzi: "鸡",
  },
  {
    hanzi: "岛",
  },
  {
    hanzi: "鸭",
  },
  {
    hanzi: "灵",
  },
  {
    hanzi: "烟",
  },
  {
    hanzi: "炎",
  },
  {
    hanzi: "炼",
  },
  {
    hanzi: "烧",
  },
  {
    hanzi: "绕",
  },
  {
    hanzi: "浇",
  },
  {
    hanzi: "部",
  },
  {
    hanzi: "隔",
  },
  {
    hanzi: "款",
  },
  {
    hanzi: "资",
  },
  {
    hanzi: "货",
  },
  {
    hanzi: "赞",
  },
  {
    hanzi: "雕",
  },
  {
    hanzi: "调",
  },
  {
    hanzi: "设",
  },
  {
    hanzi: "罚",
  },
  {
    hanzi: "剑",
  },
  {
    hanzi: "允",
  },
  {
    hanzi: "许",
  },
  {
    hanzi: "谋",
  },
  {
    hanzi: "煤",
  },
  {
    hanzi: "灭",
  },
  {
    hanzi: "炸",
  },
  {
    hanzi: "储",
  },
  {
    hanzi: "伟",
  },
  {
    hanzi: "侧",
  },
  {
    hanzi: "侵",
  },
  {
    hanzi: "伦",
  },
  {
    hanzi: "轮",
  },
  {
    hanzi: "亿",
  },
  {
    hanzi: "迅",
  },
  {
    hanzi: "速",
  },
  {
    hanzi: "迫",
  },
  {
    hanzi: "荐",
  },
  {
    hanzi: "菌",
  },
  {
    hanzi: "团",
  },
  {
    hanzi: "闭",
  },
  {
    hanzi: "闪",
  },
  {
    hanzi: "喊",
  },
  {
    hanzi: "启",
  },
  {
    hanzi: "罢",
  },
  {
    hanzi: "摆",
  },
  {
    hanzi: "握",
  },
  {
    hanzi: "摇",
  },
  {
    hanzi: "抵",
  },
  {
    hanzi: "援",
  },
  {
    hanzi: "搭",
  },
  {
    hanzi: "忽",
  },
  {
    hanzi: "惠",
  },
  {
    hanzi: "甜",
  },
  {
    hanzi: "墙",
  },
  {
    hanzi: "碰",
  },
  {
    hanzi: "坦",
  },
  {
    hanzi: "胆",
  },
  {
    hanzi: "朗",
  },
  {
    hanzi: "肠",
  },
  {
    hanzi: "销",
  },
  {
    hanzi: "锋",
  },
  {
    hanzi: "雄",
  },
  {
    hanzi: "截",
  },
  {
    hanzi: "替",
  },
  {
    hanzi: "潜",
  },
  {
    hanzi: "泪",
  },
  {
    hanzi: "涉",
  },
  {
    hanzi: "漫",
  },
  {
    hanzi: "婆",
  },
  {
    hanzi: "洁",
  },
  {
    hanzi: "浓",
  },
  {
    hanzi: "岸",
  },
  {
    hanzi: "废",
  },
  {
    hanzi: "触",
  },
  {
    hanzi: "麦",
  },
  {
    hanzi: "珍",
  },
  {
    hanzi: "珠",
  },
  {
    hanzi: "旗",
  },
  {
    hanzi: "祖",
  },
  {
    hanzi: "敏",
  },
  {
    hanzi: "繁",
  },
  {
    hanzi: "紫",
  },
  {
    hanzi: "梅",
  },
  {
    hanzi: "闲",
  },
  {
    hanzi: "杰",
  },
  {
    hanzi: "棉",
  },
  {
    hanzi: "横",
  },
  {
    hanzi: "纵",
  },
  {
    hanzi: "杆",
  },
  {
    hanzi: "刊",
  },
  {
    hanzi: "肝",
  },
  {
    hanzi: "腰",
  },
  {
    hanzi: "肺",
  },
  {
    hanzi: "胃",
  },
  {
    hanzi: "谓",
  },
  {
    hanzi: "诗",
  },
  {
    hanzi: "询",
  },
  {
    hanzi: "诞",
  },
  {
    hanzi: "诸",
  },
  {
    hanzi: "奔",
  },
  {
    hanzi: "尖",
  },
  {
    hanzi: "夸",
  },
  {
    hanzi: "跨",
  },
  {
    hanzi: "垮",
  },
  {
    hanzi: "挎",
  },
  {
    hanzi: "扣",
  },
  {
    hanzi: "撞",
  },
  {
    hanzi: "摸",
  },
  {
    hanzi: "拔",
  },
  {
    hanzi: "振",
  },
  {
    hanzi: "拖",
  },
  {
    hanzi: "拼",
  },
  {
    hanzi: "拆",
  },
  {
    hanzi: "扎",
  },
  {
    hanzi: "乳",
  },
  {
    hanzi: "浮",
  },
  {
    hanzi: "泥",
  },
  {
    hanzi: "湿",
  },
  {
    hanzi: "沿",
  },
  {
    hanzi: "泡",
  },
  {
    hanzi: "炮",
  },
  {
    hanzi: "灰",
  },
  {
    hanzi: "晓",
  },
  {
    hanzi: "曹",
  },
  {
    hanzi: "遭",
  },
  {
    hanzi: "糟",
  },
  {
    hanzi: "糕",
  },
  {
    hanzi: "粮",
  },
  {
    hanzi: "凡",
  },
  {
    hanzi: "洞",
  },
  {
    hanzi: "铜",
  },
  {
    hanzi: "铺",
  },
  {
    hanzi: "锁",
  },
  {
    hanzi: "赏",
  },
  {
    hanzi: "账",
  },
  {
    hanzi: "贺",
  },
  {
    hanzi: "茄",
  },
  {
    hanzi: "驾",
  },
  {
    hanzi: "驶",
  },
  {
    hanzi: "驻",
  },
  {
    hanzi: "乌",
  },
  {
    hanzi: "塔",
  },
  {
    hanzi: "坡",
  },
  {
    hanzi: "壁",
  },
  {
    hanzi: "勤",
  },
  {
    hanzi: "幼",
  },
  {
    hanzi: "蒙",
  },
  {
    hanzi: "豪",
  },
  {
    hanzi: "毫",
  },
  {
    hanzi: "尾",
  },
  {
    hanzi: "耗",
  },
  {
    hanzi: "径",
  },
  {
    hanzi: "衡",
  },
  {
    hanzi: "徒",
  },
  {
    hanzi: "趋",
  },
  {
    hanzi: "逼",
  },
  {
    hanzi: "返",
  },
  {
    hanzi: "迁",
  },
  {
    hanzi: "猛",
  },
  {
    hanzi: "仔",
  },
  {
    hanzi: "仪",
  },
  {
    hanzi: "俗",
  },
  {
    hanzi: "俱",
  },
  {
    hanzi: "傻",
  },
  {
    hanzi: "妙",
  },
  {
    hanzi: "奴",
  },
  {
    hanzi: "怒",
  },
  {
    hanzi: "愤",
  },
  {
    hanzi: "磨",
  },
  {
    hanzi: "鬼",
  },
  {
    hanzi: "魔",
  },
  {
    hanzi: "嘛",
  },
  {
    hanzi: "唯",
  },
  {
    hanzi: "滴",
  },
  {
    hanzi: "摘",
  },
  {
    hanzi: "燃",
  },
  {
    hanzi: "腐",
  },
  {
    hanzi: "宏",
  },
  {
    hanzi: "辈",
  },
  {
    hanzi: "插",
  },
  {
    hanzi: "毁",
  },
  {
    hanzi: "鼠",
  },
  {
    hanzi: "舆",
  },
  {
    hanzi: "舅",
  },
  {
    hanzi: "番",
  },
  {
    hanzi: "滔",
  },
  {
    hanzi: "稻",
  },
  {
    hanzi: "稿",
  },
  {
    hanzi: "蹈",
  },
  {
    hanzi: "跃",
  },
  {
    hanzi: "陷",
  },
  {
    hanzi: "焰",
  },
  {
    hanzi: "阎",
  },
  {
    hanzi: "掐",
  },
  {
    hanzi: "馅",
  },
  {
    hanzi: "饰",
  },
  {
    hanzi: "册",
  },
  {
    hanzi: "岗",
  },
  {
    hanzi: "卒",
  },
  {
    hanzi: "碎",
  },
  {
    hanzi: "醉",
  },
  {
    hanzi: "翠",
  },
  {
    hanzi: "粹",
  },
  {
    hanzi: "糊",
  },
  {
    hanzi: "览",
  },
  {
    hanzi: "鉴",
  },
  {
    hanzi: "锅",
  },
  {
    hanzi: "窝",
  },
  {
    hanzi: "祸",
  },
  {
    hanzi: "涡",
  },
  {
    hanzi: "殊",
  },
  {
    hanzi: "殖",
  },
  {
    hanzi: "裂",
  },
  {
    hanzi: "滚",
  },
  {
    hanzi: "讼",
  },
  {
    hanzi: "颂",
  },
  {
    hanzi: "翁",
  },
  {
    hanzi: "嗡",
  },
  {
    hanzi: "叹",
  },
  {
    hanzi: "喷",
  },
  {
    hanzi: "哇",
  },
  {
    hanzi: "娃",
  },
  {
    hanzi: "嫌",
  },
  {
    hanzi: "娱",
  },
  {
    hanzi: "奏",
  },
  {
    hanzi: "壮",
  },
  {
    hanzi: "嘉",
  },
  {
    hanzi: "牵",
  },
  {
    hanzi: "倾",
  },
  {
    hanzi: "宇",
  },
  {
    hanzi: "宙",
  },
  {
    hanzi: "宅",
  },
  {
    hanzi: "诧",
  },
  {
    hanzi: "畅",
  },
  {
    hanzi: "伸",
  },
  {
    hanzi: "凭",
  },
  {
    hanzi: "伍",
  },
  {
    hanzi: "仿",
  },
  {
    hanzi: "旋",
  },
  {
    hanzi: "狠",
  },
  {
    hanzi: "艰",
  },
  {
    hanzi: "恨",
  },
  {
    hanzi: "忧",
  },
  {
    hanzi: "恢",
  },
  {
    hanzi: "惨",
  },
  {
    hanzi: "渗",
  },
  {
    hanzi: "泛",
  },
  {
    hanzi: "洪",
  },
  {
    hanzi: "池",
  },
  {
    hanzi: "漏",
  },
  {
    hanzi: "渡",
  },
  {
    hanzi: "踱",
  },
  {
    hanzi: "粱",
  },
  {
    hanzi: "梁",
  },
  {
    hanzi: "桃",
  },
  {
    hanzi: "榜",
  },
  {
    hanzi: "镑",
  },
  {
    hanzi: "傍",
  },
  {
    hanzi: "磅",
  },
  {
    hanzi: "膀",
  },
  {
    hanzi: "肩",
  },
  {
    hanzi: "捐",
  },
  {
    hanzi: "柜",
  },
  {
    hanzi: "矩",
  },
  {
    hanzi: "炬",
  },
  {
    hanzi: "拒",
  },
  {
    hanzi: "捕",
  },
  {
    hanzi: "揭",
  },
  {
    hanzi: "撤",
  },
  {
    hanzi: "扶",
  },
  {
    hanzi: "夹",
  },
  {
    hanzi: "侠",
  },
  {
    hanzi: "峡",
  },
  {
    hanzi: "\b狭",
  },
  {
    hanzi: "挟",
  },
  {
    hanzi: "栋",
  },
  {
    hanzi: "冻",
  },
  {
    hanzi: "盗",
  },
  {
    hanzi: "欣",
  },
  {
    hanzi: "祥",
  },
  {
    hanzi: "氧",
  },
  {
    hanzi: "氛",
  },
  {
    hanzi: "盆",
  },
  {
    hanzi: "忠",
  },
  {
    hanzi: "尉",
  },
  {
    hanzi: "慰",
  },
  {
    hanzi: "悬",
  },
  {
    hanzi: "轨",
  },
  {
    hanzi: "辅",
  },
  {
    hanzi: "耀",
  },
  {
    hanzi: "恍",
  },
  {
    hanzi: "晃",
  },
  {
    hanzi: "辉",
  },
  {
    hanzi: "晕",
  },
  {
    hanzi: "昌",
  },
  {
    hanzi: "昏",
  },
  {
    hanzi: "晒",
  },
  {
    hanzi: "旺",
  },
  {
    hanzi: "宴",
  },
  {
    hanzi: "牢",
  },
  {
    hanzi: "踏",
  },
  {
    hanzi: "践",
  },
  {
    hanzi: "堆",
  },
  {
    hanzi: "墨",
  },
  {
    hanzi: "埋",
  },
  {
    hanzi: "墓",
  },
  {
    hanzi: "戒",
  },
  {
    hanzi: "械",
  },
  {
    hanzi: "渠",
  },
  {
    hanzi: "柱",
  },
  {
    hanzi: "栏",
  },
  {
    hanzi: "烂",
  },
  {
    hanzi: "炒",
  },
  {
    hanzi: "炉",
  },
  {
    hanzi: "烤",
  },
  {
    hanzi: "阔",
  },
  {
    hanzi: "辞",
  },
  {
    hanzi: "宰",
  },
  {
    hanzi: "辜",
  },
  {
    hanzi: "辨",
  },
  {
    hanzi: "辩",
  },
  {
    hanzi: "辫",
  },
  {
    hanzi: "纲",
  },
  {
    hanzi: "绪",
  },
  {
    hanzi: "赌",
  },
  {
    hanzi: "赠",
  },
  {
    hanzi: "皆",
  },
  {
    hanzi: "谐",
  },
  {
    hanzi: "楷",
  },
  {
    hanzi: "矛",
  },
  {
    hanzi: "盾",
  },
  {
    hanzi: "循",
  },
  {
    hanzi: "眠",
  },
  {
    hanzi: "氓",
  },
  {
    hanzi: "盲",
  },
  {
    hanzi: "丧",
  },
  {
    hanzi: "酋",
  },
  {
    hanzi: "奠",
  },
  {
    hanzi: "蹲",
  },
  {
    hanzi: "遵",
  },
  {
    hanzi: "递",
  },
  {
    hanzi: "仓",
  },
  {
    hanzi: "苍",
  },
  {
    hanzi: "沧",
  },
  {
    hanzi: "舱",
  },
  {
    hanzi: "舰",
  },
  {
    hanzi: "欺",
  },
  {
    hanzi: "咨",
  },
  {
    hanzi: "呛",
  },
  {
    hanzi: "咬",
  },
  {
    hanzi: "哲",
  },
  {
    hanzi: "吊",
  },
  {
    hanzi: "吞",
  },
  {
    hanzi: "忝",
  },
  {
    hanzi: "舔",
  },
  {
    hanzi: "添",
  },
  {
    hanzi: "爽",
  },
  {
    hanzi: "奈",
  },
  {
    hanzi: "崇",
  },
  {
    hanzi: "卧",
  },
  {
    hanzi: "扑",
  },
  {
    hanzi: "撑",
  },
  {
    hanzi: "拨",
  },
  {
    hanzi: "挤",
  },
  {
    hanzi: "挡",
  },
  {
    hanzi: "扭",
  },
  {
    hanzi: "描",
  },
  {
    hanzi: "挖",
  },
  {
    hanzi: "押",
  },
  {
    hanzi: "披",
  },
  {
    hanzi: "彼",
  },
  {
    hanzi: "玻",
  },
  {
    hanzi: "璃",
  },
  {
    hanzi: "禽",
  },
  {
    hanzi: "恰",
  },
  {
    hanzi: "悄",
  },
  {
    hanzi: "悟",
  },
  {
    hanzi: "籍",
  },
  {
    hanzi: "藉",
  },
  {
    hanzi: "荒",
  },
  {
    hanzi: "慌",
  },
  {
    hanzi: "谎",
  },
  {
    hanzi: "薪",
  },
  {
    hanzi: "疏",
  },
  {
    hanzi: "蔬",
  },
  {
    hanzi: "薯",
  },
  {
    hanzi: "逻",
  },
  {
    hanzi: "酱",
  },
  {
    hanzi: "昔",
  },
  {
    hanzi: "醋",
  },
  {
    hanzi: "腊",
  },
  {
    hanzi: "猎",
  },
  {
    hanzi: "蜡",
  },
  {
    hanzi: "烛",
  },
  {
    hanzi: "蛇",
  },
  {
    hanzi: "猴",
  },
  {
    hanzi: "犹",
  },
  {
    hanzi: "剪",
  },
  {
    hanzi: "箭",
  },
  {
    hanzi: "竹",
  },
  {
    hanzi: "煎",
  },
  {
    hanzi: "煮",
  },
  {
    hanzi: "瞧",
  },
  {
    hanzi: "盼",
  },
  {
    hanzi: "瞅",
  },
  {
    hanzi: "揪",
  },
  {
    hanzi: "愁",
  },
  {
    hanzi: "慧",
  },
  {
    hanzi: "肃",
  },
  {
    hanzi: "寿",
  },
  {
    hanzi: "艳",
  },
  {
    hanzi: "钻",
  },
  {
    hanzi: "铃",
  },
  {
    hanzi: "琴",
  },
  {
    hanzi: "顽",
  },
  {
    hanzi: "颗",
  },
  {
    hanzi: "裹",
  },
  {
    hanzi: "倡",
  },
  {
    hanzi: "仰",
  },
  {
    hanzi: "匹",
  },
  {
    hanzi: "劝",
  },
  {
    hanzi: "叉",
  },
  {
    hanzi: "兔",
  },
  {
    hanzi: "斜",
  },
  {
    hanzi: "枝",
  },
  {
    hanzi: "柴",
  },
  {
    hanzi: "梨",
  },
  {
    hanzi: "躲",
  },
  {
    hanzi: "豫",
  },
  {
    hanzi: "漠",
  },
  {
    hanzi: "洒",
  },
  {
    hanzi: "牺",
  },
  {
    hanzi: "牲",
  },
  {
    hanzi: "厘",
  },
  {
    hanzi: "厄",
  },
  {
    hanzi: "脆",
  },
  {
    hanzi: "跪",
  },
  {
    hanzi: "踩",
  },
  {
    hanzi: "扼",
  },
  {
    hanzi: "挣",
  },
  {
    hanzi: "抄",
  },
  {
    hanzi: "捉",
  },
  {
    hanzi: "摔",
  },
  {
    hanzi: "拐",
  },
  {
    hanzi: "掏",
  },
  {
    hanzi: "捡",
  },
  {
    hanzi: "矣",
  },
  {
    hanzi: "挨",
  },
  {
    hanzi: "唉",
  },
  {
    hanzi: "诶",
  },
  {
    hanzi: "埃",
  },
  {
    hanzi: "垄",
  },
  {
    hanzi: "宠",
  },
  {
    hanzi: "袭",
  },
  {
    hanzi: "拢",
  },
  {
    hanzi: "聋",
  },
  {
    hanzi: "庞",
  },
  {
    hanzi: "笼",
  },
  {
    hanzi: "绒",
  },
  {
    hanzi: "绘",
  },
  {
    hanzi: "姨",
  },
  {
    hanzi: "粥",
  },
  {
    hanzi: "弯",
  },
  {
    hanzi: "闷",
  },
  {
    hanzi: "阁",
  },
  {
    hanzi: "闯",
  },
  {
    hanzi: "腾",
  },
  {
    hanzi: "壶",
  },
  {
    hanzi: "壳",
  },
  {
    hanzi: "馒",
  },
  {
    hanzi: "饲",
  },
  {
    hanzi: "幻",
  },
  {
    hanzi: "畜",
  },
  {
    hanzi: "搐",
  },
  {
    hanzi: "蓄",
  },
  {
    hanzi: "誉",
  },
  {
    hanzi: "譬",
  },
  {
    hanzi: "袖",
  },
  {
    hanzi: "裸",
  },
  {
    hanzi: "萨",
  },
  {
    hanzi: "铲",
  },
  {
    hanzi: "锦",
  },
  {
    hanzi: "链",
  },
  {
    hanzi: "轰",
  },
  {
    hanzi: "桑",
  },
  {
    hanzi: "嗓",
  },
  {
    hanzi: "叠",
  },
  {
    hanzi: "缀",
  },
  {
    hanzi: "纤",
  },
  {
    hanzi: "纽",
  },
  {
    hanzi: "纹",
  },
  {
    hanzi: "缴",
  },
  {
    hanzi: "迹",
  },
  {
    hanzi: "迪",
  },
  {
    hanzi: "巡",
  },
  {
    hanzi: "辽",
  },
  {
    hanzi: "遥",
  },
  {
    hanzi: "淘",
  },
  {
    hanzi: "汰",
  },
  {
    hanzi: "津",
  },
  {
    hanzi: "荡",
  },
  {
    hanzi: "漾",
  },
  {
    hanzi: "泽",
  },
  {
    hanzi: "沼",
  },
  {
    hanzi: "涂",
  },
  {
    hanzi: "淋",
  },
  {
    hanzi: "涌",
  },
  {
    hanzi: "汹",
  },
  {
    hanzi: "兹",
  },
  {
    hanzi: "滋",
  },
  {
    hanzi: "磁",
  },
  {
    hanzi: "慈",
  },
  {
    hanzi: "岩",
  },
  {
    hanzi: "癌",
  },
  {
    hanzi: "董",
  },
  {
    hanzi: "荷",
  },
  {
    hanzi: "艾",
  },
  {
    hanzi: "哎",
  },
  {
    hanzi: "萌",
  },
  {
    hanzi: "芽",
  },
  {
    hanzi: "萧",
  },
  {
    hanzi: "潇",
  },
  {
    hanzi: "鲁",
  },
  {
    hanzi: "莽",
  },
  {
    hanzi: "晶",
  },
  {
    hanzi: "莹",
  },
  {
    hanzi: "隆",
  },
  {
    hanzi: "郑",
  },
  {
    hanzi: "郁",
  },
  {
    hanzi: "疫",
  },
  {
    hanzi: "瘟",
  },
  {
    hanzi: "苗",
  },
  {
    hanzi: "瘤",
  },
  {
    hanzi: "溜",
  },
  {
    hanzi: "遛",
  },
  {
    hanzi: "涛",
  },
  {
    hanzi: "铸",
  },
  {
    hanzi: "畴",
  },
  {
    hanzi: "祷",
  },
  {
    hanzi: "祈",
  },
  {
    hanzi: "筹",
  },
  {
    hanzi: "筛",
  },
  {
    hanzi: "狮",
  },
  {
    hanzi: "屈",
  },
  {
    hanzi: "眉",
  },
  {
    hanzi: "尿",
  },
  {
    hanzi: "履",
  },
  {
    hanzi: "覆",
  },
  {
    hanzi: "腹",
  },
  {
    hanzi: "腺",
  },
  {
    hanzi: "胎",
  },
  {
    hanzi: "胚",
  },
  {
    hanzi: "腔",
  },
  {
    hanzi: "肾",
  },
  {
    hanzi: "旨",
  },
  {
    hanzi: "脂",
  },
  {
    hanzi: "肪",
  },
  {
    hanzi: "稽",
  },
  {
    hanzi: "黎",
  },
  {
    hanzi: "稀",
  },
  {
    hanzi: "诱",
  },
  {
    hanzi: "饵",
  },
  {
    hanzi: "盈",
  },
  {
    hanzi: "孕",
  },
  {
    hanzi: "魂",
  },
  {
    hanzi: "坛",
  },
  {
    hanzi: "尘",
  },
  {
    hanzi: "堡",
  },
  {
    hanzi: "垒",
  },
  {
    hanzi: "杜",
  },
  {
    hanzi: "驱",
  },
  {
    hanzi: "呕",
  },
  {
    hanzi: "殴",
  },
  {
    hanzi: "躯",
  },
  {
    hanzi: "枢",
  },
  {
    hanzi: "抠",
  },
  {
    hanzi: "抑",
  },
  {
    hanzi: "拟",
  },
  {
    hanzi: "捷",
  },
  {
    hanzi: "仙",
  },
  {
    hanzi: "仁",
  },
  {
    hanzi: "俄",
  },
  {
    hanzi: "伯",
  },
  {
    hanzi: "伏",
  },
  {
    hanzi: "佩",
  },
  {
    hanzi: "伐",
  },
  {
    hanzi: "侦",
  },
  {
    hanzi: "赴",
  },
  {
    hanzi: "贪",
  },
  {
    hanzi: "俊",
  },
  {
    hanzi: "峻",
  },
  {
    hanzi: "骏",
  },
  {
    hanzi: "竣",
  },
  {
    hanzi: "毅",
  },
  {
    hanzi: "粒",
  },
  {
    hanzi: "粘",
  },
  {
    hanzi: "役",
  },
  {
    hanzi: "徐",
  },
  {
    hanzi: "瑞",
  },
  {
    hanzi: "斑",
  },
  {
    hanzi: "呈",
  },
  {
    hanzi: "呵",
  },
  {
    hanzi: "嘿",
  },
  {
    hanzi: "衰",
  },
  {
    hanzi: "囊",
  },
  {
    hanzi: "堪",
  },
  {
    hanzi: "夌",
  },
  {
    hanzi: "凌",
  },
  {
    hanzi: "陵",
  },
  {
    hanzi: "棱",
  },
  {
    hanzi: "柔",
  },
  {
    hanzi: "棋",
  },
  {
    hanzi: "棍",
  },
  {
    hanzi: "浆",
  },
  {
    hanzi: "舛",
  },
  {
    hanzi: "鳞",
  },
  {
    hanzi: "磷",
  },
  {
    hanzi: "舜",
  },
  {
    hanzi: "瞬",
  },
  {
    hanzi: "赤",
  },
  {
    hanzi: "赫",
  },
  {
    hanzi: "岂",
  },
  {
    hanzi: "凯",
  },
  {
    hanzi: "凤",
  },
  {
    hanzi: "凰",
  },
  {
    hanzi: "讽",
  },
  {
    hanzi: "飙",
  },
  {
    hanzi: "飓",
  },
  {
    hanzi: "飘",
  },
  {
    hanzi: "凝",
  },
  {
    hanzi: "姿",
  },
  {
    hanzi: "钦",
  },
  {
    hanzi: "锐",
  },
  {
    hanzi: "姆",
  },
  {
    hanzi: "妆",
  },
  {
    hanzi: "嫩",
  },
  {
    hanzi: "牧",
  },
  {
    hanzi: "迈",
  },
  {
    hanzi: "逢",
  },
  {
    hanzi: "缝",
  },
  {
    hanzi: "蓬",
  },
  {
    hanzi: "缤",
  },
  {
    hanzi: "滨",
  },
  {
    hanzi: "泄",
  },
  {
    hanzi: "屉",
  },
  {
    hanzi: "浴",
  },
  {
    hanzi: "溶",
  },
  {
    hanzi: "浩",
  },
  {
    hanzi: "糙",
  },
  {
    hanzi: "雅",
  },
  {
    hanzi: "雚",
  },
  {
    hanzi: "灌",
  },
  {
    hanzi: "罐",
  },
  {
    hanzi: "拓",
  },
  {
    hanzi: "抚",
  },
  {
    hanzi: "撒",
  },
  {
    hanzi: "携",
  },
  {
    hanzi: "摊",
  },
  {
    hanzi: "抛",
  },
  {
    hanzi: "劫",
  },
  {
    hanzi: "劣",
  },
  {
    hanzi: "勒",
  },
  {
    hanzi: "霸",
  },
  {
    hanzi: "孛",
  },
  {
    hanzi: "勃",
  },
  {
    hanzi: "脖",
  },
  {
    hanzi: "鹏",
  },
  {
    hanzi: "鸣",
  },
  {
    hanzi: "割",
  },
  {
    hanzi: "辖",
  },
  {
    hanzi: "豁",
  },
  {
    hanzi: "瞎",
  },
  {
    hanzi: "愈",
  },
  {
    hanzi: "悠",
  },
  {
    hanzi: "惑",
  },
  {
    hanzi: "翔",
  },
  {
    hanzi: "翼",
  },
  {
    hanzi: "恭",
  },
  {
    hanzi: "谱",
  },
  {
    hanzi: "疆",
  },
  {
    hanzi: "僵",
  },
  {
    hanzi: "仇",
  },
  {
    hanzi: "催",
  },
  {
    hanzi: "霍",
  },
  {
    hanzi: "霉",
  },
  {
    hanzi: "雾",
  },
  {
    hanzi: "勋",
  },
  {
    hanzi: "筋",
  },
  {
    hanzi: "胀",
  },
  {
    hanzi: "臂",
  },
  {
    hanzi: "慎",
  },
  {
    hanzi: "悦",
  },
  {
    hanzi: "恒",
  },
  {
    hanzi: "昆",
  },
  {
    hanzi: "晋",
  },
  {
    hanzi: "昂",
  },
  {
    hanzi: "旬",
  },
  {
    hanzi: "陶",
  },
  {
    hanzi: "邪",
  },
  {
    hanzi: "贩",
  },
  {
    hanzi: "贤",
  },
  {
    hanzi: "贼",
  },
  {
    hanzi: "婴",
  },
  {
    hanzi: "嫁",
  },
  {
    hanzi: "妥",
  },
  {
    hanzi: "娇",
  },
  {
    hanzi: "妖",
  },
  {
    hanzi: "沃",
  },
  {
    hanzi: "渔",
  },
  {
    hanzi: "滞",
  },
  {
    hanzi: "浸",
  },
  {
    hanzi: "浑",
  },
  {
    hanzi: "丞",
  },
  {
    hanzi: "蒸",
  },
  {
    hanzi: "函",
  },
  {
    hanzi: "涵",
  },
  {
    hanzi: "茫",
  },
  {
    hanzi: "莲",
  },
  {
    hanzi: "蒂",
  },
  {
    hanzi: "缔",
  },
  {
    hanzi: "芬",
  },
  {
    hanzi: "芳",
  },
  {
    hanzi: "纺",
  },
  {
    hanzi: "绵",
  },
  {
    hanzi: "攀",
  },
  {
    hanzi: "拳",
  },
  {
    hanzi: "泰",
  },
  {
    hanzi: "寨",
  },
  {
    hanzi: "鼎",
  },
  {
    hanzi: "痕",
  },
  {
    hanzi: "痴",
  },
  {
    hanzi: "疲",
  },
  {
    hanzi: "颇",
  },
  {
    hanzi: "颁",
  },
  {
    hanzi: "颈",
  },
  {
    hanzi: "兽",
  },
  {
    hanzi: "唤",
  },
  {
    hanzi: "呜",
  },
  {
    hanzi: "哀",
  },
  {
    hanzi: "衷",
  },
  {
    hanzi: "吻",
  },
  {
    hanzi: "匆",
  },
  {
    hanzi: "逸",
  },
  {
    hanzi: "斥",
  },
  {
    hanzi: "卵",
  },
  {
    hanzi: "卸",
  },
  {
    hanzi: "御",
  },
  {
    hanzi: "徽",
  },
  {
    hanzi: "螺",
  },
  {
    hanzi: "亩",
  },
  {
    hanzi: "虹",
  },
  {
    hanzi: "蜜",
  },
  {
    hanzi: "蜂",
  },
  {
    hanzi: "寂",
  },
  {
    hanzi: "寞",
  },
  {
    hanzi: "骚",
  },
  {
    hanzi: "驰",
  },
  {
    hanzi: "狼",
  },
  {
    hanzi: "狈",
  },
  {
    hanzi: "狱",
  },
  {
    hanzi: "谨",
  },
  {
    hanzi: "坑",
  },
  {
    hanzi: "绳",
  },
  {
    hanzi: "蝇",
  },
  {
    hanzi: "龟",
  },
  {
    hanzi: "奄",
  },
  {
    hanzi: "淹",
  },
  {
    hanzi: "俺",
  },
  {
    hanzi: "掩",
  },
  {
    hanzi: "拘",
  },
  {
    hanzi: "拦",
  },
  {
    hanzi: "抹",
  },
  {
    hanzi: "朱",
  },
  {
    hanzi: "株",
  },
  {
    hanzi: "框",
  },
  {
    hanzi: "朴",
  },
  {
    hanzi: "卓",
  },
  {
    hanzi: "炭",
  },
  {
    hanzi: "碳",
  },
  {
    hanzi: "桂",
  },
  {
    hanzi: "槽",
  },
  {
    hanzi: "枚",
  },
  {
    hanzi: "柳",
  },
  {
    hanzi: "晰",
  },
  {
    hanzi: "柏",
  },
  {
    hanzi: "泊",
  },
  {
    hanzi: "崩",
  },
  {
    hanzi: "溃",
  },
  {
    hanzi: "溪",
  },
  {
    hanzi: "滩",
  },
  {
    hanzi: "雇",
  },
  {
    hanzi: "溢",
  },
  {
    hanzi: "隘",
  },
  {
    hanzi: "淀",
  },
  {
    hanzi: "宪",
  },
  {
    hanzi: "踪",
  },
  {
    hanzi: "辟",
  },
  {
    hanzi: "殿",
  },
  {
    hanzi: "屡",
  },
  {
    hanzi: "掘",
  },
  {
    hanzi: "搏",
  },
  {
    hanzi: "抖",
  },
  {
    hanzi: "扯",
  },
  {
    hanzi: "耻",
  },
  {
    hanzi: "歧",
  },
  {
    hanzi: "肢",
  },
  {
    hanzi: "肖",
  },
  {
    hanzi: "削",
  },
  {
    hanzi: "俏",
  },
  {
    hanzi: "屑",
  },
  {
    hanzi: "梢",
  },
  {
    hanzi: "捎",
  },
  {
    hanzi: "宵",
  },
  {
    hanzi: "哨",
  },
  {
    hanzi: "哼",
  },
  {
    hanzi: "燕",
  },
  {
    hanzi: "咽",
  },
  {
    hanzi: "姻",
  },
  {
    hanzi: "姜",
  },
  {
    hanzi: "奸",
  },
  {
    hanzi: "旱",
  },
  {
    hanzi: "塌",
  },
  {
    hanzi: "垫",
  },
  {
    hanzi: "颖",
  },
  {
    hanzi: "穆",
  },
  {
    hanzi: "逊",
  },
  {
    hanzi: "逝",
  },
  {
    hanzi: "誓",
  },
  {
    hanzi: "掀",
  },
  {
    hanzi: "毙",
  },
  {
    hanzi: "葬",
  },
  {
    hanzi: "芝",
  },
  {
    hanzi: "萝",
  },
  {
    hanzi: "罩",
  },
  {
    hanzi: "署",
  },
  {
    hanzi: "芯",
  },
  {
    hanzi: "葱",
  },
  {
    hanzi: "惩",
  },
  {
    hanzi: "忌",
  },
  {
    hanzi: "惹",
  },
  {
    hanzi: "匿",
  },
  {
    hanzi: "匪",
  },
  {
    hanzi: "砸",
  },
  {
    hanzi: "砖",
  },
  {
    hanzi: "碑",
  },
  {
    hanzi: "砍",
  },
  {
    hanzi: "砂",
  },
  {
    hanzi: "纱",
  },
  {
    hanzi: "绑",
  },
  {
    hanzi: "缠",
  },
  {
    hanzi: "廉",
  },
  {
    hanzi: "帆",
  },
  {
    hanzi: "帐",
  },
  {
    hanzi: "贱",
  },
  {
    hanzi: "贾",
  },
  {
    hanzi: "贿",
  },
  {
    hanzi: "赂",
  },
  {
    hanzi: "匀",
  },
  {
    hanzi: "凑",
  },
  {
    hanzi: "奢",
  },
  {
    hanzi: "契",
  },
  {
    hanzi: "窃",
  },
  {
    hanzi: "侈",
  },
  {
    hanzi: "仲",
  },
  {
    hanzi: "辱",
  },
  {
    hanzi: "侮",
  },
  {
    hanzi: "侨",
  },
  {
    hanzi: "轿",
  },
  {
    hanzi: "轴",
  },
  {
    hanzi: "敦",
  },
  {
    hanzi: "醇",
  },
  {
    hanzi: "酬",
  },
  {
    hanzi: "廷",
  },
  {
    hanzi: "艇",
  },
  {
    hanzi: "剥",
  },
  {
    hanzi: "刹",
  },
  {
    hanzi: "乖",
  },
  {
    hanzi: "竭",
  },
  {
    hanzi: "爹",
  },
  {
    hanzi: "栽",
  },
  {
    hanzi: "枯",
  },
  {
    hanzi: "棚",
  },
  {
    hanzi: "棘",
  },
  {
    hanzi: "杖",
  },
  {
    hanzi: "吏",
  },
  {
    hanzi: "仗",
  },
  {
    hanzi: "侣",
  },
  {
    hanzi: "侍",
  },
  {
    hanzi: "鞭",
  },
  {
    hanzi: "佐",
  },
  {
    hanzi: "髓",
  },
  {
    hanzi: "惰",
  },
  {
    hanzi: "愧",
  },
  {
    hanzi: "慨",
  },
  {
    hanzi: "溉",
  },
  {
    hanzi: "滥",
  },
  {
    hanzi: "沸",
  },
  {
    hanzi: "涯",
  },
  {
    hanzi: "泌",
  },
  {
    hanzi: "渣",
  },
  {
    hanzi: "滤",
  },
  {
    hanzi: "沫",
  },
  {
    hanzi: "汪",
  },
  {
    hanzi: "漆",
  },
  {
    hanzi: "膝",
  },
  {
    hanzi: "脊",
  },
  {
    hanzi: "腻",
  },
  {
    hanzi: "赋",
  },
  {
    hanzi: "芒",
  },
  {
    hanzi: "茅",
  },
  {
    hanzi: "荆",
  },
  {
    hanzi: "蔽",
  },
  {
    hanzi: "弊",
  },
  {
    hanzi: "憋",
  },
  {
    hanzi: "撇",
  },
  {
    hanzi: "撕",
  },
  {
    hanzi: "挫",
  },
  {
    hanzi: "挽",
  },
  {
    hanzi: "捧",
  },
  {
    hanzi: "挪",
  },
  {
    hanzi: "搅",
  },
  {
    hanzi: "抨",
  },
  {
    hanzi: "秤",
  },
  {
    hanzi: "萍",
  },
  {
    hanzi: "坪",
  },
  {
    hanzi: "塘",
  },
  {
    hanzi: "坠",
  },
  {
    hanzi: "陌",
  },
  {
    hanzi: "廊",
  },
  {
    hanzi: "雀",
  },
  {
    hanzi: "鸦",
  },
  {
    hanzi: "鹰",
  },
  {
    hanzi: "庙",
  },
  {
    hanzi: "鹿",
  },
  {
    hanzi: "庸",
  },
  {
    hanzi: "庶",
  },
  {
    hanzi: "蔗",
  },
  {
    hanzi: "遮",
  },
  {
    hanzi: "遣",
  },
  {
    hanzi: "谴",
  },
  {
    hanzi: "擅",
  },
  {
    hanzi: "颤",
  },
  {
    hanzi: "颠",
  },
  {
    hanzi: "巅",
  },
  {
    hanzi: "喘",
  },
  {
    hanzi: "唇",
  },
  {
    hanzi: "喉",
  },
  {
    hanzi: "咙",
  },
  {
    hanzi: "吼",
  },
  {
    hanzi: "剖",
  },
  {
    hanzi: "吁",
  },
  {
    hanzi: "臊",
  },
  {
    hanzi: "躁",
  },
  {
    hanzi: "藻",
  },
  {
    hanzi: "燥",
  },
  {
    hanzi: "灿",
  },
  {
    hanzi: "岭",
  },
  {
    hanzi: "煌",
  },
  {
    hanzi: "碧",
  },
  {
    hanzi: "魄",
  },
  {
    hanzi: "魅",
  },
  {
    hanzi: "铝",
  },
  {
    hanzi: "铭",
  },
  {
    hanzi: "钉",
  },
  {
    hanzi: "锡",
  },
  {
    hanzi: "曝",
  },
  {
    hanzi: "瓣",
  },
  {
    hanzi: "弧",
  },
  {
    hanzi: "弥",
  },
  {
    hanzi: "霞",
  },
  {
    hanzi: "霜",
  },
  {
    hanzi: "厢",
  },
  {
    hanzi: "媳",
  },
  {
    hanzi: "媚",
  },
  {
    hanzi: "屠",
  },
  {
    hanzi: "诈",
  },
  {
    hanzi: "谣",
  },
  {
    hanzi: "肆",
  },
  {
    hanzi: "髦",
  },
  {
    hanzi: "碟",
  },
  {
    hanzi: "碌",
  },
  {
    hanzi: "磊",
  },
  {
    hanzi: "蘑",
  },
  {
    hanzi: "菇",
  },
  {
    hanzi: "芦",
  },
  {
    hanzi: "菊",
  },
  {
    hanzi: "芭",
  },
  {
    hanzi: "蕾",
  },
  {
    hanzi: "蕴",
  },
  {
    hanzi: "缆",
  },
  {
    hanzi: "揽",
  },
  {
    hanzi: "拌",
  },
  {
    hanzi: "叛",
  },
  {
    hanzi: "捏",
  },
  {
    hanzi: "撰",
  },
  {
    hanzi: "熙",
  },
  {
    hanzi: "攘",
  },
  {
    hanzi: "壤",
  },
  {
    hanzi: "镶",
  },
  {
    hanzi: "嚷",
  },
  {
    hanzi: "曰",
  },
  {
    hanzi: "啸",
  },
  {
    hanzi: "呐",
  },
  {
    hanzi: "嘲",
  },
  {
    hanzi: "喻",
  },
  {
    hanzi: "哗",
  },
  {
    hanzi: "哑",
  },
  {
    hanzi: "哄",
  },
  {
    hanzi: "瞩",
  },
  {
    hanzi: "嘱",
  },
  {
    hanzi: "叮",
  },
  {
    hanzi: "柬",
  },
  {
    hanzi: "澜",
  },
  {
    hanzi: "烫",
  },
  {
    hanzi: "洽",
  },
  {
    hanzi: "衍",
  },
  {
    hanzi: "澄",
  },
  {
    hanzi: "橙",
  },
  {
    hanzi: "凳",
  },
  {
    hanzi: "蹬",
  },
  {
    hanzi: "瞪",
  },
  {
    hanzi: "睁",
  },
  {
    hanzi: "盯",
  },
  {
    hanzi: "趁",
  },
  {
    hanzi: "膨",
  },
  {
    hanzi: "彰",
  },
  {
    hanzi: "皱",
  },
  {
    hanzi: "虐",
  },
  {
    hanzi: "秩",
  },
  {
    hanzi: "募",
  },
  {
    hanzi: "勉",
  },
  {
    hanzi: "勘",
  },
  {
    hanzi: "涝",
  },
  {
    hanzi: "捞",
  },
  {
    hanzi: "唠",
  },
  {
    hanzi: "叨",
  },
  {
    hanzi: "韵",
  },
  {
    hanzi: "瓷",
  },
  {
    hanzi: "嵌",
  },
  {
    hanzi: "岳",
  },
  {
    hanzi: "虾",
  },
  {
    hanzi: "蚊",
  },
  {
    hanzi: "愚",
  },
  {
    hanzi: "蠢",
  },
  {
    hanzi: "旭",
  },
  {
    hanzi: "隙",
  },
  {
    hanzi: "赐",
  },
  {
    hanzi: "坝",
  },
  {
    hanzi: "堤",
  },
  {
    hanzi: "灶",
  },
  {
    hanzi: "删",
  },
  {
    hanzi: "丛",
  },
  {
    hanzi: "巫",
  },
  {
    hanzi: "耸",
  },
  {
    hanzi: "叙",
  },
  {
    hanzi: "驭",
  },
  {
    hanzi: "骤",
  },
  {
    hanzi: "驳",
  },
  {
    hanzi: "骇",
  },
  {
    hanzi: "驮",
  },
  {
    hanzi: "驯",
  },
  {
    hanzi: "巢",
  },
  {
    hanzi: "辐",
  },
  {
    hanzi: "辙",
  },
  {
    hanzi: "敷",
  },
  {
    hanzi: "敞",
  },
  {
    hanzi: "敛",
  },
  {
    hanzi: "肇",
  },
  {
    hanzi: "玫",
  },
  {
    hanzi: "瑰",
  },
  {
    hanzi: "槐",
  },
  {
    hanzi: "栓",
  },
  {
    hanzi: "耍",
  },
  {
    hanzi: "儒",
  },
  {
    hanzi: "仆",
  },
  {
    hanzi: "僧",
  },
  {
    hanzi: "蹭",
  },
  {
    hanzi: "愣",
  },
  {
    hanzi: "懈",
  },
  {
    hanzi: "闸",
  },
  {
    hanzi: "阐",
  },
  {
    hanzi: "禅",
  },
  {
    hanzi: "隶",
  },
  {
    hanzi: "逮",
  },
  {
    hanzi: "逗",
  },
  {
    hanzi: "逾",
  },
  {
    hanzi: "遂",
  },
  {
    hanzi: "谜",
  },
  {
    hanzi: "讶",
  },
  {
    hanzi: "渊",
  },
  {
    hanzi: "泣",
  },
  {
    hanzi: "潭",
  },
  {
    hanzi: "沾",
  },
  {
    hanzi: "泻",
  },
  {
    hanzi: "冤",
  },
  {
    hanzi: "枉",
  },
  {
    hanzi: "枣",
  },
  {
    hanzi: "梳",
  },
  {
    hanzi: "枕",
  },
  {
    hanzi: "耽",
  },
  {
    hanzi: "缉",
  },
  {
    hanzi: "咧",
  },
  {
    hanzi: "鄙",
  },
  {
    hanzi: "恕",
  },
  {
    hanzi: "饶",
  },
  {
    hanzi: "爵",
  },
  {
    hanzi: "嚼",
  },
  {
    hanzi: "喇",
  },
  {
    hanzi: "叭",
  },
  {
    hanzi: "扒",
  },
  {
    hanzi: "撼",
  },
  {
    hanzi: "挠",
  },
  {
    hanzi: "掠",
  },
  {
    hanzi: "摧",
  },
  {
    hanzi: "瘫",
  },
  {
    hanzi: "痪",
  },
  {
    hanzi: "稚",
  },
  {
    hanzi: "秧",
  },
  {
    hanzi: "绣",
  },
  {
    hanzi: "萎",
  },
  {
    hanzi: "妄",
  },
  {
    hanzi: "娶",
  },
  {
    hanzi: "嫂",
  },
  {
    hanzi: "艘",
  },
  {
    hanzi: "妒",
  },
  {
    hanzi: "嫉",
  },
  {
    hanzi: "矫",
  },
  {
    hanzi: "厦",
  },
  {
    hanzi: "丹",
  },
  {
    hanzi: "婉",
  },
  {
    hanzi: "惋",
  },
  {
    hanzi: "怡",
  },
  {
    hanzi: "冶",
  },
  {
    hanzi: "怠",
  },
  {
    hanzi: "恳",
  },
  {
    hanzi: "甩",
  },
  {
    hanzi: "佣",
  },
  {
    hanzi: "倦",
  },
  {
    hanzi: "巷",
  },
  {
    hanzi: "佑",
  },
  {
    hanzi: "赁",
  },
  {
    hanzi: "俯",
  },
  {
    hanzi: "俘",
  },
  {
    hanzi: "虏",
  },
  {
    hanzi: "丐",
  },
  {
    hanzi: "钙",
  },
  {
    hanzi: "衔",
  },
  {
    hanzi: "钩",
  },
  {
    hanzi: "弘",
  },
  {
    hanzi: "夷",
  },
  {
    hanzi: "帖",
  },
  {
    hanzi: "帕",
  },
  {
    hanzi: "兜",
  },
  {
    hanzi: "丫",
  },
  {
    hanzi: "凸",
  },
  {
    hanzi: "凹",
  },
  {
    hanzi: "裕",
  },
  {
    hanzi: "袍",
  },
  {
    hanzi: "痒",
  },
  {
    hanzi: "瘾",
  },
  {
    hanzi: "馈",
  },
  {
    hanzi: "蚀",
  },
  {
    hanzi: "韧",
  },
  {
    hanzi: "寡",
  },
  {
    hanzi: "酿",
  },
  {
    hanzi: "酝",
  },
  {
    hanzi: "墅",
  },
  {
    hanzi: "牡",
  },
  {
    hanzi: "馨",
  },
  {
    hanzi: "殷",
  },
  {
    hanzi: "尴",
  },
  {
    hanzi: "尬",
  },
  {
    hanzi: "炫",
  },
  {
    hanzi: "毯",
  },
  {
    hanzi: "昧",
  },
  {
    hanzi: "猩",
  },
  {
    hanzi: "臣",
  },
  {
    hanzi: "耕",
  },
  {
    hanzi: "歪",
  },
  {
    hanzi: "缸",
  },
  {
    hanzi: "窑",
  },
  {
    hanzi: "窍",
  },
  {
    hanzi: "窜",
  },
  {
    hanzi: "窥",
  },
  {
    hanzi: "窟",
  },
  {
    hanzi: "窿",
  },
  {
    hanzi: "窒",
  },
  {
    hanzi: "窘",
  },
  {
    hanzi: "榨",
  },
  {
    hanzi: "柄",
  },
  {
    hanzi: "杠",
  },
  {
    hanzi: "桩",
  },
  {
    hanzi: "栖",
  },
  {
    hanzi: "朽",
  },
  {
    hanzi: "橱",
  },
  {
    hanzi: "槛",
  },
  {
    hanzi: "棺",
  },
  {
    hanzi: "椰",
  },
  {
    hanzi: "桨",
  },
  {
    hanzi: "揉",
  },
  {
    hanzi: "抒",
  },
  {
    hanzi: "捣",
  },
  {
    hanzi: "拱",
  },
  {
    hanzi: "扳",
  },
  {
    hanzi: "搁",
  },
  {
    hanzi: "捂",
  },
  {
    hanzi: "攒",
  },
  {
    hanzi: "搓",
  },
  {
    hanzi: "揣",
  },
  {
    hanzi: "捆",
  },
  {
    hanzi: "沐",
  },
  {
    hanzi: "浏",
  },
  {
    hanzi: "涤",
  },
  {
    hanzi: "沽",
  },
  {
    hanzi: "浊",
  },
  {
    hanzi: "渺",
  },
  {
    hanzi: "汛",
  },
  {
    hanzi: "涕",
  },
  {
    hanzi: "沛",
  },
  {
    hanzi: "瀑",
  },
  {
    hanzi: "溅",
  },
  {
    hanzi: "淌",
  },
  {
    hanzi: "沮",
  },
  {
    hanzi: "溯",
  },
  {
    hanzi: "鲨",
  },
  {
    hanzi: "涮",
  },
  {
    hanzi: "淆",
  },
  {
    hanzi: "沏",
  },
  {
    hanzi: "潦",
  },
  {
    hanzi: "僚",
  },
  {
    hanzi: "俭",
  },
  {
    hanzi: "阀",
  },
  {
    hanzi: "侃",
  },
  {
    hanzi: "伺",
  },
  {
    hanzi: "倚",
  },
  {
    hanzi: "僻",
  },
  {
    hanzi: "劈",
  },
  {
    hanzi: "倘",
  },
  {
    hanzi: "倔",
  },
  {
    hanzi: "咐",
  },
  {
    hanzi: "吩",
  },
  {
    hanzi: "哺",
  },
  {
    hanzi: "喧",
  },
  {
    hanzi: "咏",
  },
  {
    hanzi: "嗜",
  },
  {
    hanzi: "哆",
  },
  {
    hanzi: "嗦",
  },
  {
    hanzi: "嗅",
  },
  {
    hanzi: "鳄",
  },
  {
    hanzi: "刁",
  },
  {
    hanzi: "叼",
  },
  {
    hanzi: "啃",
  },
  {
    hanzi: "吭",
  },
  {
    hanzi: "唾",
  },
  {
    hanzi: "唬",
  },
  {
    hanzi: "菩",
  },
  {
    hanzi: "茂",
  },
  {
    hanzi: "蒜",
  },
  {
    hanzi: "荧",
  },
  {
    hanzi: "藤",
  },
  {
    hanzi: "蔓",
  },
  {
    hanzi: "蔑",
  },
  {
    hanzi: "苛",
  },
  {
    hanzi: "暮",
  },
  {
    hanzi: "矢",
  },
  {
    hanzi: "荫",
  },
  {
    hanzi: "茎",
  },
  {
    hanzi: "蔼",
  },
  {
    hanzi: "蘸",
  },
  {
    hanzi: "礁",
  },
  {
    hanzi: "磋",
  },
  {
    hanzi: "砌",
  },
  {
    hanzi: "磕",
  },
  {
    hanzi: "怯",
  },
  {
    hanzi: "恤",
  },
  {
    hanzi: "惕",
  },
  {
    hanzi: "慑",
  },
  {
    hanzi: "慷",
  },
  {
    hanzi: "惭",
  },
  {
    hanzi: "惦",
  },
  {
    hanzi: "悼",
  },
  {
    hanzi: "绰",
  },
  {
    hanzi: "绎",
  },
  {
    hanzi: "绸",
  },
  {
    hanzi: "绞",
  },
  {
    hanzi: "缅",
  },
  {
    hanzi: "绽",
  },
  {
    hanzi: "纬",
  },
  {
    hanzi: "缚",
  },
  {
    hanzi: "绷",
  },
  {
    hanzi: "绯",
  },
  {
    hanzi: "绅",
  },
  {
    hanzi: "缕",
  },
  {
    hanzi: "搂",
  },
  {
    hanzi: "掺",
  },
  {
    hanzi: "拧",
  },
  {
    hanzi: "拯",
  },
  {
    hanzi: "扛",
  },
  {
    hanzi: "拎",
  },
  {
    hanzi: "拙",
  },
  {
    hanzi: "拽",
  },
  {
    hanzi: "撬",
  },
  {
    hanzi: "捅",
  },
  {
    hanzi: "拣",
  },
  {
    hanzi: "揍",
  },
  {
    hanzi: "搀",
  },
  {
    hanzi: "捶",
  },
  {
    hanzi: "拴",
  },
  {
    hanzi: "拄",
  },
  {
    hanzi: "抡",
  },
  {
    hanzi: "捍",
  },
  {
    hanzi: "晤",
  },
  {
    hanzi: "旷",
  },
  {
    hanzi: "曙",
  },
  {
    hanzi: "腥",
  },
  {
    hanzi: "膳",
  },
  {
    hanzi: "膛",
  },
  {
    hanzi: "朦",
  },
  {
    hanzi: "胧",
  },
  {
    hanzi: "婿",
  },
  {
    hanzi: "姥",
  },
  {
    hanzi: "絮",
  },
  {
    hanzi: "嬉",
  },
  {
    hanzi: "嫦",
  },
  {
    hanzi: "娥",
  },
  {
    hanzi: "媲",
  },
  {
    hanzi: "凄",
  },
  {
    hanzi: "婪",
  },
  {
    hanzi: "彬",
  },
  {
    hanzi: "焚",
  },
  {
    hanzi: "灼",
  },
  {
    hanzi: "焕",
  },
  {
    hanzi: "烘",
  },
  {
    hanzi: "焊",
  },
  {
    hanzi: "熄",
  },
  {
    hanzi: "烁",
  },
  {
    hanzi: "炖",
  },
  {
    hanzi: "炊",
  },
  {
    hanzi: "灸",
  },
  {
    hanzi: "煲",
  },
  {
    hanzi: "耿",
  },
  {
    hanzi: "痰",
  },
  {
    hanzi: "痹",
  },
  {
    hanzi: "煽",
  },
  {
    hanzi: "翅",
  },
  {
    hanzi: "翘",
  },
  {
    hanzi: "戳",
  },
  {
    hanzi: "雁",
  },
  {
    hanzi: "鹤",
  },
  {
    hanzi: "寝",
  },
  {
    hanzi: "寥",
  },
  {
    hanzi: "谬",
  },
  {
    hanzi: "诀",
  },
  {
    hanzi: "诵",
  },
  {
    hanzi: "讳",
  },
  {
    hanzi: "诫",
  },
  {
    hanzi: "诽",
  },
  {
    hanzi: "谤",
  },
  {
    hanzi: "讹",
  },
  {
    hanzi: "谍",
  },
  {
    hanzi: "讥",
  },
  {
    hanzi: "秃",
  },
  {
    hanzi: "颓",
  },
  {
    hanzi: "秉",
  },
  {
    hanzi: "黏",
  },
  {
    hanzi: "秽",
  },
  {
    hanzi: "稠",
  },
  {
    hanzi: "稼",
  },
  {
    hanzi: "锈",
  },
  {
    hanzi: "锤",
  },
  {
    hanzi: "钞",
  },
  {
    hanzi: "锯",
  },
  {
    hanzi: "钳",
  },
  {
    hanzi: "钧",
  },
  {
    hanzi: "钓",
  },
  {
    hanzi: "豹",
  },
  {
    hanzi: "酌",
  },
  {
    hanzi: "酣",
  },
  {
    hanzi: "酥",
  },
  {
    hanzi: "酗",
  },
  {
    hanzi: "酵",
  },
  {
    hanzi: "烹",
  },
  {
    hanzi: "孪",
  },
  {
    hanzi: "弈",
  },
  {
    hanzi: "卉",
  },
  {
    hanzi: "甸",
  },
  {
    hanzi: "畔",
  },
  {
    hanzi: "畸",
  },
  {
    hanzi: "瞄",
  },
  {
    hanzi: "睹",
  },
  {
    hanzi: "瞒",
  },
  {
    hanzi: "眨",
  },
  {
    hanzi: "睦",
  },
  {
    hanzi: "睬",
  },
  {
    hanzi: "盹",
  },
  {
    hanzi: "瞻",
  },
  {
    hanzi: "赡",
  },
  {
    hanzi: "赎",
  },
  {
    hanzi: "贞",
  },
  {
    hanzi: "贬",
  },
  {
    hanzi: "贮",
  },
  {
    hanzi: "屯",
  },
  {
    hanzi: "赃",
  },
  {
    hanzi: "陨",
  },
  {
    hanzi: "阱",
  },
  {
    hanzi: "陡",
  },
  {
    hanzi: "陋",
  },
  {
    hanzi: "堕",
  },
  {
    hanzi: "廓",
  },
  {
    hanzi: "隧",
  },
  {
    hanzi: "遏",
  },
  {
    hanzi: "迭",
  },
  {
    hanzi: "迄",
  },
  {
    hanzi: "逞",
  },
  {
    hanzi: "琢",
  },
  {
    hanzi: "筐",
  },
  {
    hanzi: "筒",
  },
  {
    hanzi: "篷",
  },
  {
    hanzi: "笛",
  },
  {
    hanzi: "筝",
  },
  {
    hanzi: "簇",
  },
  {
    hanzi: "竿",
  },
  {
    hanzi: "罕",
  },
  {
    hanzi: "凿",
  },
  {
    hanzi: "墟",
  },
  {
    hanzi: "垦",
  },
  {
    hanzi: "坟",
  },
  {
    hanzi: "紊",
  },
  {
    hanzi: "虔",
  },
  {
    hanzi: "剃",
  },
  {
    hanzi: "刨",
  },
  {
    hanzi: "剔",
  },
  {
    hanzi: "竖",
  },
  {
    hanzi: "幢",
  },
  {
    hanzi: "帜",
  },
  {
    hanzi: "觅",
  },
  {
    hanzi: "孵",
  },
  {
    hanzi: "馁",
  },
  {
    hanzi: "馋",
  },
  {
    hanzi: "饥",
  },
  {
    hanzi: "冗",
  },
  {
    hanzi: "弦",
  },
  {
    hanzi: "弛",
  },
  {
    hanzi: "躬",
  },
  {
    hanzi: "靶",
  },
  {
    hanzi: "靴",
  },
  {
    hanzi: "鞠",
  },
  {
    hanzi: "粪",
  },
  {
    hanzi: "粽",
  },
  {
    hanzi: "舵",
  },
  {
    hanzi: "舶",
  },
  {
    hanzi: "皂",
  },
  {
    hanzi: "挚",
  },
  {
    hanzi: "擎",
  },
  {
    hanzi: "掰",
  },
  {
    hanzi: "岔",
  },
  {
    hanzi: "崛",
  },
  {
    hanzi: "崭",
  },
  {
    hanzi: "峙",
  },
  {
    hanzi: "屿",
  },
  {
    hanzi: "屹",
  },
  {
    hanzi: "崖",
  },
  {
    hanzi: "蛙",
  },
  {
    hanzi: "卦",
  },
  {
    hanzi: "卤",
  },
  {
    hanzi: "闺",
  },
  {
    hanzi: "阂",
  },
  {
    hanzi: "蹦",
  },
  {
    hanzi: "踹",
  },
  {
    hanzi: "趴",
  },
  {
    hanzi: "踊",
  },
  {
    hanzi: "跤",
  },
  {
    hanzi: "狡",
  },
  {
    hanzi: "猾",
  },
  {
    hanzi: "猖",
  },
  {
    hanzi: "惫",
  },
  {
    hanzi: "囱",
  },
  {
    hanzi: "囚",
  },
  {
    hanzi: "熏",
  },
  {
    hanzi: "歼",
  },
  {
    hanzi: "殃",
  },
  {
    hanzi: "顷",
  },
  {
    hanzi: "颊",
  },
  {
    hanzi: "匠",
  },
  {
    hanzi: "斧",
  },
  {
    hanzi: "鹅",
  },
  {
    hanzi: "鸽",
  },
  {
    hanzi: "徘",
  },
  {
    hanzi: "徊",
  },
  {
    hanzi: "衅",
  },
  {
    hanzi: "盏",
  },
  {
    hanzi: "祀",
  },
  {
    hanzi: "袱",
  },
  {
    hanzi: "兢",
  },
  {
    hanzi: "魁",
  },
  {
    hanzi: "冈",
  },
  {
    hanzi: "裔",
  },
  {
    hanzi: "昼",
  },
  {
    hanzi: "孔",
  },
  {
    hanzi: "啥",
  },
  {
    hanzi: "咋",
  },
  {
    hanzi: "呻",
  },
  {
    hanzi: "吟",
  },
  {
    hanzi: "吴",
  },
  {
    hanzi: "嗨",
  },
  {
    hanzi: "噢",
  },
  {
    hanzi: "澳",
  },
  {
    hanzi: "涩",
  },
  {
    hanzi: "洛",
  },
  {
    hanzi: "浙",
  },
  {
    hanzi: "沈",
  },
  {
    hanzi: "浦",
  },
  {
    hanzi: "屁",
  },
  {
    hanzi: "棕",
  },
  {
    hanzi: "杭",
  },
  {
    hanzi: "宋",
  },
  {
    hanzi: "椎",
  },
  {
    hanzi: "雌",
  },
  {
    hanzi: "蝴",
  },
  {
    hanzi: "蝶",
  },
  {
    hanzi: "眯",
  },
  {
    hanzi: "眶",
  },
  {
    hanzi: "玛",
  },
  {
    hanzi: "菲",
  },
  {
    hanzi: "莱",
  },
  {
    hanzi: "疤",
  },
  {
    hanzi: "圳",
  },
  {
    hanzi: "侄",
  },
  {
    hanzi: "掷",
  },
  {
    hanzi: "嗎",
  },
  {
    hanzi: "請問",
  },
  {
    hanzi: "哪裡",
  },
  {
    hanzi: "美國人",
  },
  {
    hanzi: "中國人",
  },
  {
    hanzi: "你呢",
  },
  {
    hanzi: "喜歡",
  },
  {
    hanzi: "漢堡",
  },
];

function listRelatedNodes({ term }) {
  return nodeFetch(
    "https://traverse.link/alley-d0944/us-central1/searchElastic",
    {
      method: "POST",
      body: JSON.stringify({
        data: {
          what: "searchCardSubscriptions",
          term: term,
          size: 4000,
          order: null,
          enrolledCourses: [
            "/Mandarin_Blueprint/pecg0a9a8xx61npmr268d5fp",
            "/Mandarin_Blueprint/lj1rbfp5cswvq62f07ufzvkl",
            "/Mandarin_Blueprint/jcx1fc713tom0sdryepektgx",
            "/Mandarin_Blueprint/msgv3wnte8y9ir6teetyb0rq",
            "/Mandarin_Blueprint/669vmslpowgvq7tfdph1hnej",
            "/Mandarin_Blueprint/gkeb479bxzq9cqv73j1paepu",
            "/Mandarin_Blueprint/o1c8sby90k3nhyq50jlpxese",
            "/Mandarin_Blueprint/ia8c1tca3m5b2j3x3nfcs6gj",
            "/Mandarin_Blueprint/whvhyh40zkth22l9n5oncq0h",
            "/Mandarin_Blueprint/hczjk0icoxaz1qao1uloxs1q",
            "/Mandarin_Blueprint/jyjwgmpzkbqii6x34vf8p4u7",
            "/Mandarin_Blueprint/1lw66zk7rgcpwez87edv1vex",
            "/Mandarin_Blueprint/b1inuv3i06vjzz6ftllm9qtc",
            "/Mandarin_Blueprint/nez0f9k1gg03n1zizpya61vk",
            "/Mandarin_Blueprint/nrysm2ov1tl97udnzs57yytp",
            "/Mandarin_Blueprint/q0tqsyiqqdkyw7fmxesekr9s",
            "/Mandarin_Blueprint/tr19qy3ena6vp39z1usw9su4",
            "/Mandarin_Blueprint/fpp8tmxpipgem59mj84wr3ft",
            "/Mandarin_Blueprint/0t0y05f4jhos3sabu7ncjmi3",
            "/Mandarin_Blueprint/r60yn9zv161hltcrl0xjrgud",
            "/Mandarin_Blueprint/fizi0ue4vw4l6w9k7a5ck176",
            "/Mandarin_Blueprint/m2azx5ms1roolk17f9ak0tn3",
            "/Mandarin_Blueprint/j7dky8zpsm01sjd98951h2ef",
            "/Mandarin_Blueprint/qvwbvzcdyrhu7ar8akjbi5xh",
            "/Mandarin_Blueprint/qtn5lk9ylmwrlw71v3z0moyb",
            "/Mandarin_Blueprint/2awd7xmq0z8szgm44u43ixpj",
            "/Mandarin_Blueprint/1v8cxy4iz4sx1zajp19jambe",
            "/Mandarin_Blueprint/fk3haeofh8z80g2g0jsv5z48",
            "/Mandarin_Blueprint/n05t7uc1ccdhdv3fed8as17t",
            "/Mandarin_Blueprint/syoz4a8owoxxg2dmokhs1gh5",
            "/Mandarin_Blueprint/58fy0pf90yigk0q41oga36xl",
            "/Mandarin_Blueprint/lpoigxr4uxv4lmcct9vrbxjc",
            "/Mandarin_Blueprint/p2zxjvvyijn05m9h2lqtzctr",
            "/Mandarin_Blueprint/6lmo73h4mibxlv0m29jw3bx4",
            "/Mandarin_Blueprint/29ucnawadubwaz5rrbnsc8nz",
            "/Mandarin_Blueprint/jewucp07wndrbe2pzrbb9f0l",
            "/Mandarin_Blueprint/s37bxp7q80ib1hcgo74k25sp",
            "/Mandarin_Blueprint/omaukerdhspvdv05nlnu5p1k",
            "/Mandarin_Blueprint/fwxr20m4fmquzq9jv3g8bs23",
            "/Mandarin_Blueprint/563nbvhlhcw835cb6hl4yrw5",
            "/Mandarin_Blueprint/zp52kqjzl1nbixd0xy3esiw8",
            "/Mandarin_Blueprint/bza0iebp7f4e84op8lxkeuj5",
            "/Mandarin_Blueprint/bqjdt34tnd95yfqk79zeeln3",
            "/Mandarin_Blueprint/4zcwt2bj5cti4498cs1gnmou",
            "/Mandarin_Blueprint/cky2uc97b16143vafxpzempm",
            "/Mandarin_Blueprint/t38sd5xu8za7kbonstb9yqds",
            "/Mandarin_Blueprint/2i2rk5i3npn8bsjezv33uie6",
            "/Mandarin_Blueprint/3d5c7wp9baw480d0s4z7wk8v",
            "/Mandarin_Blueprint/xkne6bvfazw9bh30rt54u65e",
            "/Mandarin_Blueprint/4u4rclj2otuk2e34a3rmc3ck",
            "/Mandarin_Blueprint/nacat4mk5spug4n4j90suunm",
            "/Mandarin_Blueprint/ipx302zr3p1mo9h3jn5ec793",
            "/Mandarin_Blueprint/efd3pudof0ay9wai84abbh4e",
            "/Mandarin_Blueprint/4pfgx1d4757f8xzuiek17clr",
            "/Mandarin_Blueprint/znsjt92wvp98yinegu036qtr",
            "/Mandarin_Blueprint/h82y5ppak7009a2xq0ycf2s3",
            "/Mandarin_Blueprint/w5mxeohdepl2breffitk9vc8",
            "/Mandarin_Blueprint/kows2k3vz3h7q8rfr5ntwbcx",
            "/Mandarin_Blueprint/hreecn0q3o0y8l4p62t3amcn",
            "/Mandarin_Blueprint/om547iq3eqyf7g8bga6htp0o",
            "/Mandarin_Blueprint/xt45l73hnv2m6svawpe7dzho",
            "/Mandarin_Blueprint/504oxfvr9lvbixk6l7b66lqm",
            "/Mandarin_Blueprint/swoq5zpflmt546ioureuy78s",
            "/Mandarin_Blueprint/3oqjtpnvt4rf5ko6qt4blwhw",
            "/Mandarin_Blueprint/qr1n2hyx7zp4yfs8lcvfjnrt",
            "/Mandarin_Blueprint/g8u1itbutw9etw33ikwc12zd",
            "/Mandarin_Blueprint/6zlqzrzaupbxipxbvb9vvwor",
            "/Mandarin_Blueprint/2r5j11xdez5qkr6jhrenj5ui",
            "/Mandarin_Blueprint/osj74i7f6cl5h0erpf3s2tkx",
            "/Mandarin_Blueprint/yu92m4oe2bgwb10efx59kc46",
            "/Mandarin_Blueprint/ocduclbv65qxrybatq1z5qrx",
            "/Mandarin_Blueprint/pxm2w8kogj4ylprrjkouqwst",
            "/Mandarin_Blueprint/bgupfqsa6ft8xbheg7f2bmwa",
            "/Mandarin_Blueprint/pegrofgaw3cam1jf33rj9jo1",
            "/Mandarin_Blueprint/yk7dw6asyze1tbajr1wolvko",
            "/Mandarin_Blueprint/m0af76b71q37ppdce4hjnvgy",
            "/Mandarin_Blueprint/x38kr241laaqaifoluextaht",
            "/Mandarin_Blueprint/9kw34xjsom7271ll3thxdvdm",
            "/Mandarin_Blueprint/65s80gfws6h3mxutznd8sfai",
            "/Mandarin_Blueprint/5ew2r24ruxwlbo0h1dothloa",
            "/Mandarin_Blueprint/sppsr13xc08af64ppzge0py6",
            "/Mandarin_Blueprint/2n3hf0dv4fyt64he5gr34ak8",
            "/Mandarin_Blueprint/xqire2mmdpwg1qfpczu4ag7e",
            "/Mandarin_Blueprint/d3gwlk9t6yf2tkwqr5k0sa5k",
            "/Mandarin_Blueprint/ksr0zbgsc0fknz9gsdy2we9g",
            "/Mandarin_Blueprint/cb0oi60ba5sfkts9vgn8vsod",
            "/Mandarin_Blueprint/8h0yqt1g6m44e8rvc6psdh5l",
            "/Mandarin_Blueprint/d3311yj815ocgsvmprs338as",
            "/Mandarin_Blueprint/76ugqbk2pc5dn2bfkiuhra2r",
            "/Mandarin_Blueprint/5xr7bbbhu8qn88q7hyv9l17t",
            "/Mandarin_Blueprint/adsh3xfv1cfi1lx3q3fx5vlb",
            "/Mandarin_Blueprint/6ixwiu1u110x70cil0hngj12",
            "/Mandarin_Blueprint/9m004r35s9q5yj8gqc3gxoy6",
            "/Mandarin_Blueprint/ytj6mem5eq2iu0jfb0brv243",
            "/Mandarin_Blueprint/wcp85hdeud1jcnhl2y4nzfpu",
            "/Mandarin_Blueprint/g4bb3yu96wjj8jiiu6002lfq",
            "/Mandarin_Blueprint/ezlrmuhotiua2i9chg5jb59w",
            "/Mandarin_Blueprint/4znqf6ce0v7b4biag93qiiep",
          ],
          searchBin: false,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzZDA3YmJjM2Q3NWM2OTQyNzUxMGY2MTc0ZWIyZjE2NTQ3ZDRhN2QiLCJ0eXAiOiJKV1QifQ.eyJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvZGVmYXVsdC11c2VyPXM5Ni1jIiwidXNlck5hbWUiOiJmV0lXc1pNUXJ3VDJNSHY2cnBrbG9SWkdZTXUxIiwiZnJlZVBsYW4iOnRydWUsInBsYW4iOiJGcmVlIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2FsbGV5LWQwOTQ0IiwiYXVkIjoiYWxsZXktZDA5NDQiLCJhdXRoX3RpbWUiOjE2OTUyMTc0NjcsInVzZXJfaWQiOiJmV0lXc1pNUXJ3VDJNSHY2cnBrbG9SWkdZTXUxIiwic3ViIjoiZldJV3NaTVFyd1QyTUh2NnJwa2xvUlpHWU11MSIsImlhdCI6MTY5NzkzNzIxMywiZXhwIjoxNjk3OTQwODEzLCJlbWFpbCI6ImxlYXJudWlkZXZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDA5MTcyNjU5MzUzNDAyNjg3NTEiXSwiZW1haWwiOlsibGVhcm51aWRldkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.nIF6hoN6-pqSjL6nQftCZHd5Uro9yKnZqcnF8HzD0s_NbQN6eAJdbAcY3OOqqvwElt5TgAU9qfAOCxIkOBiiEAV5gc2_PF0HicNS3nApy2RJY5HOSd8i16lSRdY55yr1fhBM3mzcyk_cid4qekjm2JapoatNRcVL1pNJ-udXDDoj8Lp-pdtE67O5a8049wAyF6cj1G9OveQNnkzCV7RDAVsOIYtjj28QBHvuQiBHWp_Xn1IBEq13G8sS18kHSyy2p-GAB7SScYrXScHL4yDhe3P-akAfl8_5B_4Jx4tjORnMKwHMvbd24LipPCoOixNYMJld-NaTjXukiyS1mcuQTQ`,
      },
    }
  ).then((res) => {
    // console.log("RES", res);
    return res.json();
  });
}

async function listRelatedNodesBatch({ title, from, to }) {
  const res = await Promise.all(
    allChars?.slice(from, to).map((item) => {
      return listRelatedNodes({ term: item?.hanzi });
    })
  );

  return res;
}

const level = 23;
const from = level * 50;
const to = (level + 1) * 50;

const levelTitle = `level-${from}-${to}`;

listRelatedNodesBatch({
  title: levelTitle,
  from,
  to,
}).then((items) => {
  // console.log("ITEMS", items);
  fs.writeFile(`traverse/${levelTitle}.json`, JSON.stringify(items), () => {
    console.log("SUCCESS");
    return items;
  });

  return items;
});
