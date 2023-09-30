'use client'
import { VillageIcon } from '@/components/ui/icons'
import { dictionary } from './data/dictionary'

const languages = [
  { id: 'zh', title: 'Chinese' },
  { id: 'en', title: 'English' }
]

const props_old = `
一二三十丷半丿㇏人亻从𠂉午*口中丩八只乚儿兄兑讠㇉马乙乞气
冫日旦早七化丶白百㇇今千舌氵㇆月用勹⺈句勺亅了子寸辶才牙卜上下
占灬止正是目自身弋代戈手*我木本米呆相**已包士走
不么台去寺竹众门间司母也小尔大大羊力另云丁可奇门内两王主
玉口因个钅天关廾开耳公女西西又取曼支皮有了友二言义文父交长衣
衤艮长口元二完匕此夕多歹少贝页见首直甘甘其厂斤反饣工大纟约人
合穴刀刂分召至井山亦田果十口采一世父古共者孝五广心交水水求火
里重丰青生免豕象头买卖牛先角彐史更石车与士豆言高亭九丸执京景
乡尤成咸戈巾帅邦山兩文冬各令足示衤矢侯马虫虽弔佳天立音木亲乃
尸户欠亡方巴用而且丙疒氏垂`
const props = `
一二三丨十丷半丿㇏人亻从午*口中丩八只乚儿兄兑讠㇉马乙乞气
冫日旦早七化丶白百㇇今千舌氵㇆月用勹⺈句勺亅了子寸辶才牙卜上下
占灬止正是目自身弋代戈手*我木本米呆相**已包士走
不么台去寺竹众门间司母也小尔大大羊力另云丁可奇门内两王主
玉口因个钅天关廾开耳公女西西又取曼支皮有了友二言义文父交长衣
衤艮长口元二完匕此夕多歹少贝页见首直甘甘其厂斤反饣工大纟约人
合穴刀刂分召至井山亦田果十口采一世父古共者孝五广心交水水求火
里重丰青生免豕象头买卖牛先角彐史更石车与士豆言高亭九丸执京景
乡尤成咸戈巾帅邦山兩文冬各令足示衤矢侯马虫虽弔佳天立音木亲乃
尸户欠亡方巴用而且丙疒氏垂`

// level 1: end
// export const learnedCharacters = `一二三十干`
// level 2: end
// export const learnedCharacters = `一二三十干半人从个入`
// level 3: end
// export const learnedCharacters = `一二三十干半人从个入什午年口中叫`
// level 4: end
// export const learnedCharacters = `一二三十干半人从个入什午年口中叫八只介儿四兄兑`
// level 5: end
// export const learnedCharacters = `一二三十干半人从个入什午年口中叫八只介儿四兄兑说计认识马吗骂乙乞吃气`
// level 6
export const learnedCharacters = `一二三十干半人从个入什午年口中叫八只介儿四兄兑说计认识马吗骂乙乞吃气飞`
// level 1: end
// export const learnedProps = `一二三丨十`
// level 2: end
// export const learnedProps = `一二三丨十丷半丿㇏人亻从`
// level 3: end
// export const learnedProps = `一二三丨十丷半丿㇏人亻从𠂉午*口中丩`
// level 4: end
// export const learnedProps = `一二三丨十丷半丿㇏人亻从𠂉午*口中丩八只乚儿兄兑`
// level 5: end
// export const learnedProps = `一二三丨十丷半丿㇏人亻从𠂉午*口中丩八只乚儿兄兑讠㇉马乙乞气`
// level 6
export const learnedProps = `一二三丨十丷半丿㇏人亻从𠂉午*口中丩八只乚儿兄兑讠㇉马乙乞气冫`
const characters = `
一二三十干半人从个入什午年口中叫八只介儿四兄兑说计认识马吗骂乙乞吃气飞况日日旦但
早唱电七化白百今王舌话活乱汽月用胖朋明习句勺的了子寸时过付讨才牙上下卡吓占点让
止正是目自面身谢弋代戈手我或看担拍提找木本体末米来呆休桌相禾和种香几机心想息总怕
己记已包土坐吐肚在走起不还坏杯么公台去丢法寺等门们问间简司词母每也他地小东尔你您
大太大哭臭然狗决快块羊着样美力加边办为另云运动会丁打可哥河奇骑椅以内肉两再同周王
全主住注玉国回因嗯行得往金钟天关送开算并耳闻联系女妈好始西要如她楼又汉对没取最曼
慢支皮书有随友发六言信文这父交校风网那哪衣袋被良很银长报服元远玩园完院字定安睿宝
匕比它此些能夕多名够外歹死少吵步贝员贵页题见现首道直真甘甘某其期厂厌斤听近诉后厚
反饭饱饿工江左右差红约合给拿穴穿空深式试刀分份切划别刚班前召绍照片至到井进山出岁
亦变田果课思单鱼男累花草猫药宽采菜受爱共借错收改数古苦做者猪都老孝教五语广床店应
兴学觉亥该孩水冰求球救火灯烦里重懂黑乍作昨怎窄丰青请情表生星姓免晚家象像头实买卖
读牛特件告先洗角解当扫事史使更便石硬车连辆较轻经与写士任豆喜高搞亭停九丸执热京景
影尤就成城越威感钱浅巾帅师市带邦帮常非雨雪冬图各客务备夏令冷足跑路跟示票视知短医
矮侯候弓张虫虽强弱弟第住谁推难准天笑立位音意站拉接亲新杀条乐茶乃扔奶及戶呢户所声
欠吹歌软次欢亡忘忙万方放房巴吧把色而需且姐宜丙病疼氏纸低北南垂睡
`

const words = `
一 二 三 十 干 半 一半 人 从 年 人口 入口 中 叫 八 只 四 说 认识 马 吗 骂 吃 气 飞 旧 但 早 唱 电 七 白 今年 * ** ** * * * 用 胖 明白 𣸱明
明年的的话了儿子日子分子过过日子才上早上马上下一下下年卡吓一点儿点一点早点让是但是只是目的面上面下面谢谢代
手
我
或看拍提找木本身体米来来自上来下来过来果桌子和种香几个十几几百几车手机北机心担心想休息休息日总是怕自己记包面包
坐下吐肚子在正在走一起起来想起来看起来起飞不不用不过还还是坏杯子干杯什么什么的台去去年上去下去过去丢丢了丢人
看法 等 等等门门口我们人们问时间中间公司司机词母每(个)每年也他他们小小时小心东你你们您大大小大人太太太哭臭狗快快点儿块羊着一样什么样样子美加一边东边办办法为为了认为为什么另云远气动活动自动远动 会机会一会儿打打电话 打包可是哥哥哥们儿河骑椅子可以以为内心内两(个)再周周未住记住关注玉米中国中国人回回来回去因为嗯行不行行不行行了行为得记得 往钟点钟
天 今天明天每天白天天气关关心关门送开开心开门开会打开总算打算用关系联系女人美女女儿妈妈妈好妤吃妤𥘅早上妤下午妤只妤
还妤 妤妤 好看 开始 西 东西西边要快要主要想要要是她楼又对对来说 对不起对面没什么没关系从来没取最最好慢慢走 慢慢 书看书有有人只有没有有点儿还有随时朋友女朋友小朋友友好发信相信信息中文文化这个这儿这样这边这么文母交朋友风网上网那么那天那样
那边 那儿 那个哪个哪儿 大衣口袋袋子被被子很银行 长长大长相长得衣服说服元远 玩(儿)好玩公园 完 完美 完全宇汉宇一定决定不一定安
寄 宝宝比比如它它们一些有些这些那些能能力可能多很多多么好多够外面另外外国 外国人名宇有名死吓死少不少多少吵宝贝(儿
页 问题见看见见而再见明天见现在发现现金一直真认真菜个某些其他讨厌斤公斤听好听听力听见听话 听说近 最近 以后 然后 后后来最后 后天 后面厚反正相反米饭早饭午饭吃饭吃饱饿员工工人江左边左右右边差差不多差点（儿)红红包约约会合法给拿穿穿衣服天空有空 空空问 空气深 正式试武 刀子分分钟分手分开过分份(儿）月份一切切计划别别人 别的刚 刚刚 刚才班上班下班 加班以前 前 前天 前面 往前
介绍 拍照照相机 照片至少到没想到 回到 得到 找到进进来
击步 讲一步
讲大山出出来出大出国出发出现想出来岁元岁麥变化麥得如果课上
课 下课 单身简单鱼男人男朋友累花花园 草 草地
菜单占菜
受受到受不了爱可爱
𨃨𡛂
一共 借借口错 不错 没错 还不错 收 收到 收)
政 改变政天数苦做做饭做爱 叫做或者记者猪猪肉
老外老人
教
五口语语
汉语语洪床
起床 饭店 反应大学学习同学学学校自学
得该应该孩子女孩男孩小孩水水果冰冰水求要求
球打球救大灯烦哪里里那里公里里而重重要听得𢤦 纖听不𢤦里傕傕为𡈼𠷈
动作工作日昨天怎么怎么样窄清情情况表情手表
女生男生学生
生日生活发生生气大学生星星期姓您费姓？晚晚饭 晚上 家大家回家
国家 家人 想家 老家 大象像不像话 好像回头 头 头发 木头舌头其实
老实买
买单卖买卖外卖读读书牛
牛肉特别特占件告派产告先先生
洗 洗手问 了解 解决 当然 当时 打扫事事情 同事事儿出事怎么回事
使更随便大便小便石头硬上车下车公交车火车汽车开车打车自
行车电动车连辆此较轻年轻年轻人己经经过写女士
高兴停九热热情
热水 加热风景电彩影子电彩院尤共是就就是
算完成成长变成成为成人越越来越成
𢦓动感𠣕𢦓情
峩甸𣿭帅帅哥老师城市
带來若走糖常常𨯿常正常 𠤖常
非：
下雪 冬天地图各种各种各样客人 不客气 服务服务员那个时候 小时候 有时候出子虽然强弱兄弟弟弟第、
跑
推
跑步
走路
路上路口
豆火车票量
电影票电租知道
𥺼信
难过 难吃难看 难听准备
𤯵𡥪𤯵𡈼𤤌𡘾𠄌𥥆𥅽
介意同`

// export const learnedWords = `一 二 三 十 干 半 一半 人 从 年 半年`
// export const learnedWords = `一 二 三 十 干 半 一半 人 从 年 半年 人口 入口 中 叫 八 只 四 说 认识`
export const learnedWords = Object.keys(dictionary)
const wordsL1 = `一 二 三 十 干 半 一半 人 从 年 半年 人口 入口 中 叫 八 只 四 说 认识 马 吗 骂 吃 气 飞 旧 但 早 唱 电 七 白 今年 * ** ** * * * 用 胖 明白 𣸱明`

const modules = [
  {
    id: 'introduction',
    title: 'Introducing Yourself',
    lessons: [
      {
        title: '你',
        answer: 'nǐ',
        meaning: 'You',
        options: ['nǐ', 'hǎo', 'wǒ'],
        level: 1
      },
      {
        title: '好',
        answer: 'hǎo',
        meaning: 'Good',
        options: ['nǐ', 'hǎo', 'wǒ'],
        level: 1
      },
      {
        title: '你好',
        answer: 'nǐ hǎo',
        meaning: 'Hello',
        options: ['nǐ', 'nǐ hǎo', 'wǒ'],
        level: 1
      },
      {
        title: '我',
        answer: 'wǒ',
        meaning: 'I/me',
        options: ['nǐ', 'nǐ hǎo', 'wǒ'],
        level: 1
      },
      {
        title: '是',
        answer: 'shì',
        meaning: 'verb - to be',
        options: ['nǐ', 'nǐ hǎo', 'wǒ', 'shì'],
        level: 1
      },
      {
        title: '我是 Vishal',
        answer: 'wǒ shì Vishal',
        meaning: 'I am Vishal',
        options: ['nǐ', 'nǐ hǎo Vishal', 'wǒ shì Vishal', 'shì Vishal'],
        level: 1
      },
      {
        title: '你是 Andriana',
        answer: 'nǐ shì Andriana',
        meaning: 'You are Andriana',
        options: ['nǐ', 'nǐ hǎo Andriana', 'nǐ shì Andriana', 'shì Andriana'],
        level: 1
      }
    ]
  },
  {
    id: 'i-want-something',
    title: 'I Want Something',
    lessons: [
      {
        title: '要',
        answer: 'yào',
        meaning: 'to want/to ask for',
        examples: [
          {
            key: '我要 coffee',
            pinyin: 'wǒ yào coffee',
            meaning: 'I want coffee'
          }
        ],
        options: ['nǐ', 'hǎo', 'wǒ', '要'],
        level: 1
      },
      {
        title: '我要 coffee',
        answer: 'wǒ yào coffee',
        meaning: 'I want coffee',
        options: ['nǐ', 'hǎo', 'wǒ', '要'],
        level: 1
      },
      {
        title: '我要 汉堡包',
        answer: 'wǒ yào hàn bǎo bāo',
        meaning: 'I want a hamburger',
        options: ['nǐ', 'hǎo', 'wǒ', '要'],
        level: 1
      },
      {
        title: '我要 三明治',
        answer: 'wǒ yào sān míng zhì',
        meaning: 'I want a sandwich',
        options: ['nǐ', 'hǎo', 'wǒ', '要'],
        level: 1
      },
      {
        title: '我要 巧克力',
        answer: 'wǒ yào qiǎo kè lì',
        meaning: 'I want a chocolate',
        options: ['nǐ', 'hǎo', 'wǒ', '要'],
        level: 1
      },
      {
        title: '我要 冰水',
        answer: 'wǒ yào bīng shuǐ',
        meaning: 'I want ice water',
        options: ['nǐ', 'hǎo', 'wǒ', '要'],
        level: 1
      },
      {
        title: '我不要 冰水',
        answer: 'wǒ bù yào bīng shuǐ',
        meaning: 'I dont want ice water',
        options: ['nǐ', 'hǎo', 'wǒ', '要'],
        level: 1
      },
      {
        title: '不',
        answer: 'bù',
        meaning: 'no',
        options: ['nǐ', 'hǎo', 'wǒ', '要'],
        level: 1
      }
    ]
  }
]

const options = [
  { id: 'chinese', value: 'I want to learn chinese' },
  { id: 'ai', value: 'I want to learn ai' },
  { id: 'home-school', value: 'I want to learn home schooling' },
  { id: 'frameworks', value: 'I want to learn nextjs' },
  // { id: 'frameworks', value: 'I want to learn dynamodb' },
  {
    id: 'professional',
    value: 'I want to learn reactjs',
    tags: ['applied', 'professional', 'programming', 'real-world']
  },
  // { id: 'frameworks', value: 'I want to learn cloudwatch' },
  {
    id: 'html',
    value: 'I want to learn html',
    tags: ['html', 'foundation', 'template']
  },
  {
    id: 'tools',
    value: 'I want to learn chrome dev tools',
    tags: ['tools', 'productivity']
  },
  {
    id: 'js',
    value: 'I want to learn js',
    tags: ['js', 'foundation', 'automation']
  },

  {
    id: 'css',
    value: 'I want to learn css',
    tags: ['css', 'foundation', 'style sheet']
  },
  { id: 'architecture', value: 'I want to learn frontend architecture' }
  // 'butter chicken recipe'
]

export const hanziToPinyin = {
  三: 'sān'
} as any

export const places = [
  {
    id: 'null',
    component: VillageIcon
  },
  {
    id: '-a'
  },
  {
    id: '-ai'
  },
  {
    id: '-an'
  },
  {
    id: '-ang'
  },
  {
    id: '-ao'
  },
  {
    id: '-e'
  },
  {
    id: '-ei'
  },
  {
    id: '-en'
  },
  {
    id: '-eng'
  },
  {
    id: '-o'
  },
  {
    id: '-ong'
  },
  {
    id: '-ou'
  }
]

export const learnedPlaces = [
  {
    order: 1,
    component: VillageIcon,
    id: 'null',
    examples: [{ value: 'Childhood Home' }, { value: 'Sibsoo Village' }]
  },
  {
    order: 2,
    id: '-an',
    examples: [{ value: 'Aunties Chicken', country: 'Canada' }],
    relatedCharacters: [{ pinyin: 'gān', en: 'to dry' }]
  },
  {
    order: 3,
    id: '-en',
    examples: [{ value: 'Cambridge England house', country: 'England' }]
  },
  {
    order: 4,
    id: '-ong',
    examples: [
      {
        type: 'place',
        value: 'Dzong',
        description: 'Strong Fortress like Dzong',
        country: 'Bhutan'
      },
      {
        type: 'associations',
        value: 'Gym',
        description: 'A place where you go to get strong like the Gym'
      }
    ]
  },
  {
    order: 5,
    id: '-e',
    examples: [
      {
        type: 'associations',
        value: 'Explore the Mall',
        description: 'Exploring Exploring the Mall / Vietnam (hanoi) / NEw York'
      },
      {
        type: 'place',
        value: 'Exploring Wellington, India Home',
        description: 'Wellington is a place in Tamilnadu, India'
      },

      {
        type: 'associations',
        value: 'E-mail',
        description: 'E-mail might remind you of your Workplace'
      }
    ]
  },
  {
    order: 6,
    id: '-ou',
    examples: [
      {
        type: 'place',
        value: 'Ooty Wellington, India Home',
        description: 'Wellington is a place in Tamilnadu, India'
      }
    ]
  },
  {
    order: 7,
    id: '-a',
    examples: [
      {
        type: 'place',
        value: 'Alotra',
        description: 'Marseille, France'
      }
    ]
  },
  {
    order: 8,
    id: '-ao',
    examples: [
      {
        type: 'place',
        value: 'Sao Paolo Hotel',
        description: 'Sao Paolo, Hotel'
      }
    ]
  },
  {
    order: 9,
    id: '-ei',
    examples: [
      {
        type: 'place',
        value: 'Marseille',
        description: 'Kedge School Campus'
      }
    ]
  },
  {
    order: 10,
    id: '-o',
    examples: [
      {
        type: 'place',
        value: 'Obrizum Head Office',
        description: 'Cambridge, UK'
      }
    ]
  }
]

export const learnedActors = [
  {
    id: 'sh-',
    order: 1,
    value: 'sh-',
    actor: 'Shiva',
    actorType: 'male',
    actors: [{ value: 'Shiva' }, { value: 'Sherlock Holmes' }]
  },
  {
    id: 'g-',
    order: 2,
    value: 'g',
    relatedCharacters: [
      { value: 'gān', en: 'dry', id: 5 },
      { value: 'gè', en: 'individual', id: 9 }
    ],
    actor: 'Gerrard',
    actorType: 'male',
    actors: [
      {
        value: 'Gerrard',
        fullName: 'Steven Gerrard',
        team: 'liverpool'
      },
      { value: 'Graham Potter', type: 'Manager' }
    ]
  },
  {
    id: 'b-',
    order: 3,
    value: 'b',
    level: 2,
    relatedCharacters: [{ value: 'bàn', hanzi: '半', en: 'half', id: 6 }],
    actor: 'Brian Kim',
    actorType: 'male',
    actors: [
      {
        value: 'Bobby Firmino',
        team: 'liverpool'
      },
      {
        value: 'Boman Irani'
      }
    ]
  },
  {
    id: 'r-',
    level: 2,
    order: 4,
    value: 'r-',
    relatedCharacters: [{ value: 'rén', en: 'person' }],
    place: { id: 'en', location: 'Cambridge England house' },
    actor: 'Ruben',
    actorType: 'male',
    actors: [
      {
        value: 'Russel Peters'
      },
      {
        value: 'Rowan Atkinson'
      }
    ]
  },
  {
    id: 'c-',
    order: 5,
    value: 'c-',
    level: 2,
    actorType: 'male',
    relatedCharacters: [{ value: 'cōng', en: 'from' }],
    actor: 'Christiano Ronaldo',
    actors: [
      {
        value: 'Christiano Ronaldo'
      },
      {
        value: 'Casey Neistat'
      }
    ]
  },
  {
    id: 'ru-',
    level: 2,
    order: 6,
    value: 'ru-',
    actorType: 'fictional',

    actor: 'Rubeus Hagrid',
    relatedSets: [
      {
        id: 10,
        value: 'rù',
        en: 'to enter',
        setId: 'Sibsoo Village (null)',
        level: 2
      }
    ],
    actors: [
      {
        value: 'Rubeus Hagrid',
        type: 'fictional',
        valid: true
      }
      // {
      //   value: 'Ruben Soto',
      //   valid: false,
      //   explanation: 'Should be fictional character'
      // }
    ]
  },
  // Level 3 [7 - 11]
  {
    id: 'wu-',
    level: 3,
    order: 7,
    value: 'wu-',
    hanzi: '午',
    keyword: 'noon',
    actorType: 'fictional',
    actor: 'Walter White',
    relatedCharacters: [
      {
        id: 10,
        value: 'wǔ',
        en: '',
        setId: '',
        level: 3
      }
    ],
    actors: [
      {
        value: 'Walter White',
        type: 'fictional'
      }
    ],
    props: [
      {
        hanzi: '𠂉',
        value: 'Spaceship'
      }
    ]
  },
  {
    level: 3,
    id: 'ni-',
    order: 8,
    actorType: 'female',
    actor: 'Nicole Kidman',
    hanzi: '午',
    keyword: 'noon',

    actors: [
      {
        value: 'Nicole Kidman'
      },
      {
        value: 'Natelie Portman'
      }
    ]
  },
  {
    id: 'k-',
    level: 3,
    order: 9,
    actorType: 'male',
    actor: 'Kaka'
  },
  {
    id: 'zh-',
    level: 3,
    order: 10,
    actorType: 'male',
    actor: 'George Copsola'
  },
  {
    id: 'ji-',
    level: 3,
    order: 11,
    actorType: 'female',
    actor: 'Gillian'
  },
  {
    id: 'er-',
    actorId: 'er',
    order: 12,
    actorType: 'male',
    keyword: 'kid',
    actor: 'Erling Haaland',
    level: 4,
    actors: [
      {
        value: 'Nicole Kidman'
      },
      {
        value: 'Natelie Portman'
      }
    ]
  },

  {
    id: 's-',
    order: 13,
    value: 's',
    actorType: 'male',
    actor: 'Sarmad',
    level: 4
  },
  {
    id: 'xi-',
    order: 14,
    value: 'xi',
    actor: 'Shakira',
    actorType: 'female',
    level: 4
  },
  {
    id: 'du-',
    order: 15,
    value: 'du-',
    level: 4,
    actorType: 'fictional',
    actor: 'Donald Duck'
  }
]

const propsNew = {
  一: {
    id: '一',
    pinyin: 'yī',
    toneId: 1,
    en: 'one',
    props: [
      { title: 'Razor Blades' },
      { title: 'Cigars' },
      { title: 'Lead Pipes' },
      { title: 'Ruler' },
      { title: 'Pen' }
    ]
  },
  二: {
    id: '二',
    pinyin: 'èr',
    toneId: 4,
    en: 'two',
    props: [
      { title: 'Ski' },
      { title: 'Chopsticks' },
      { title: 'Newly Married Couples' },
      { title: 'Twins' }
    ]
  },
  三: {
    id: '三',
    pinyin: 'sān',
    toneId: 1,
    en: 'three',
    props: [{ title: 'Number three' }, { title: 'Road lane' }]
  },
  l: {},
  十: {},
  丷: {},
  半: {},
  丿: {},
  '㇏': {},
  人: {},
  亻: {},
  从: {}
}

export const scenesArr = []

export const propsArr = props
  .split('\n')
  .join('')
  .split('')
  .filter(item => item !== '*' || item.includes('�'))
  .map(item => ({
    hanzi: item
  }))

export const charsArr = characters
  .split('\n')
  .join('')
  .split('')
  .filter(item => item !== '*' || item.includes('�'))
  .map(item => ({
    hanzi: item
  }))
export const wordsArr = wordsL1
  .split('\n')
  .join('')
  .split(' ')
  .filter(item => !item.includes('*') || item.includes('�'))
  .map(item => ({
    hanzi: item
  }))

// console.log('PROPS', propsArr)
