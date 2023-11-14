import { useState } from 'react'

import { VideoPlayer } from './video-player'
// import {}

const song0 = {
  url: 'https://www.youtube.com/watch?v=_Tk9_kPpO1U',
  title: 'Je Chhau Timi - Swoopna Suman x Samir Shrestha',
  scripts: [
    {
      actor: '',
      nepali: 'गाजल त्यो तिम्रो मेटाईदेऊ न',
      type: 'Verse 1',
      timestamp: [20, 23],
      nepaliRoman: "Gājala tyō timrō mēṭā'īdē'ū na",
      en: 'Wipe off your gaajal',
      lit: 'Gaajal / that / yours / wipe off na'
    },
    {
      actor: '',
      nepali: 'तिम्रो आँखाको रंग हेर्न मन छ',
      type: 'Verse 1',
      timestamp: [24, 27],
      nepaliRoman: 'Timrō ām̐khākō raṅga hērna mana cha',
      en: 'I love to see the color of your eyes',
      lit: 'your / the eyes of / the color / to see / the heart / is'
    },
    {
      actor: '',
      nepali: 'बाँधेको केश फुकाइदेऊ न',
      type: 'Verse 1',
      timestamp: [30, 33],
      nepaliRoman: "Bām̐dhēkō kēśa phukā'idē'ū na",
      en: 'Free your tied up hair',
      lit: 'Tied up / hair / blow na'
    },
    {
      actor: '',
      nepali: 'हावाले उडाको मन पर्छ',
      type: 'Verse 1',
      timestamp: [34, 38],
      nepaliRoman: 'Hāvālē uḍākō mana parcha',
      en: 'I like it when the wind blows your hair',
      lit: 'By wind / fly away / the heart / must'
    },
    {
      actor: '',
      nepali: 'नढाक न मुहार श्रृंगारले',
      type: 'Pre-Chorus',
      timestamp: [40.5, 48],
      // nepaliRoman: 'Nadhaaka na muhar sringaar le',
      nepaliRoman: 'Naḍhāka na muhāra śr̥ṅgāralē',
      en: "Don't cover your face with makeup",
      lit: 'cover / no / the face / with makeup'
    },
    {
      actor: '',
      nepali: 'नढाक न मुहार श्रृंगारले',
      type: 'Pre-Chorus',
      timestamp: [49, 52],
      // nepaliRoman: 'Nadhaaka na muhar sringaar le',
      nepaliRoman: 'Naḍhāka na muhāra śr̥ṅgāralē',
      en: "Don't cover your face with makeup",
      lit: 'cover / no / the face / with makeup'
    },
    {
      actor: '',
      nepali: 'चन्द्रमामा पनि दाग हुन्छ',
      type: 'Pre-Chorus',
      timestamp: [52.8, 56],
      nepaliRoman: 'Candramāmā pani dāga huncha',
      en: 'Even the moon has spots',
      lit: 'on the moon / too / stain / happens'
    },
    {
      actor: '',
      nepali: 'चन्द्रमामा पनि दाग हुन्छ',
      type: 'Pre-Chorus',
      timestamp: [56.5, 61],
      nepaliRoman: 'Candramāmā pani dāga huncha',
      en: 'Even the moon has spots',
      lit: 'on the moon / too / stain / happens'
    },
    {
      actor: '',
      nepali: 'भाग्यमानी सबै तिम्रो मुस्कान हेर्न पाउने',
      type: 'Chorus',
      timestamp: [62.8, 71],
      // nepaliRoman: 'bhagya maani sabai timro muskaan herrna Paaune',
      nepaliRoman: "Bhāgyamānī sabai timrō muskāna hērna pā'unē",
      en: 'Everyone is lucky enough to see your smile',
      lit: 'lucky / everyone / yours / a smile / to see / get'
    },
    {
      actor: '',
      nepali: 'जे छौ, जसो छौ तिमी',
      type: 'Chorus',
      timestamp: [72, 75],
      nepaliRoman: 'Jē chau, jasō chau timī',
      en: 'You are what you are',
      lit: 'whatever / you are / as / you are / you'
    },
    {
      actor: '',
      nepali: 'त्यही नै हो मलाई चाहिने',
      type: 'Chorus',
      timestamp: [75.5, 80],
      nepaliRoman: "Tyahī nai hō malā'ī cāhinē",
      en: "That's what I need",
      lit: 'thats it (त्यही नै हो) / to me / want'
    },
    {
      actor: '',
      nepali: 'छिछोलेर अंधेरो लाई उज्यालो देखाउने',
      type: 'Verse 2',
      timestamp: [98, 103],
      nepaliRoman: "Chichōlēra andhērō lā'ī ujyālō dēkhā'unay",
      en: 'To shed light on the darkness',
      lit: 'sneak up / the dark / to / bright / to show'
    },
    {
      actor: '',
      nepali: 'चम्किला जूनकीरी झैँ आँखा',
      type: 'Verse 2',
      timestamp: [102.7, 106],
      nepaliRoman: 'Camkilā jūnakīrī jhaim̐ ām̐khā',
      en: 'Eyes like glittering firefly',
      lit: 'Shining / firefly / like / eyes'
    },
    {
      actor: '',
      nepali: 'गहिरो समुन्द्र भए जिन्दगी मेरो',
      type: 'Verse 2',
      timestamp: [106, 110],
      nepaliRoman: "Gahirō samundra bha'ē jindagī mērō",
      en: 'My life is a deep sea',
      lit: 'deep / sea /  happened / the life / my'
    },
    {
      actor: '',
      nepali: 'किनारा देखाउने तिम्रो हात',
      type: 'Verse 2',
      timestamp: [110.7, 114],
      nepaliRoman: "Kinārā dēkhā'unē timrō hāta",
      en: 'Your hand that shows the edge',
      lit: 'edge / to show / yours / the hand'
    },
    {
      actor: '',
      nepali: 'सुरिलो त के छ र गीत मेरो',
      type: 'Pre-Chorus',
      timestamp: [116.5, 124],
      nepaliRoman: 'Surilō ta kē cha ra gīta mērō',
      en: 'What is the melody and the song is mine',
      lit: 'smooth / so / what / is / and / song / my'
    },
    {
      actor: '',
      nepali: 'सुरिलो त के छ र गीत मेरो',
      type: 'Pre-Chorus',
      timestamp: [124.8, 128],
      nepaliRoman: 'Surilō ta kē cha ra gīta mērō',
      en: 'What is the melody and the song is mine',
      lit: 'smooth / so / what / is / and / song / my'
    },
    {
      actor: '',
      nepali: 'जति तिम्रो आवाज हुन्छ',
      type: 'Pre-Chorus',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'जति तिम्रो आवाज हुन्छ',
      type: 'Pre-Chorus',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'आशा यही हो सधैं तिम्रो साथ पाउने',
      type: 'Chorus',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'जे छौ, जसो छौ तिमी',
      type: 'Chorus',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'त्यही नै हो मलाई चाहिने',
      type: 'Chorus',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Chorus',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Refrain',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Refrain',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Refrain',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Refrain',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Refrain',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Refrain',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Refrain',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी हौ मलाई चाहिने',
      type: 'Refrain',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'पर्वा नगर यो दुनियाँको',
      type: 'Verse 3',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी मै बसेको छ दुनियाँ मेरो',
      type: 'Verse 3',
      timestamp: [100, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'पर्वा नगर यो दुनियाँको',
      type: 'Verse 3',
      timestamp: [100, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी मै बसेको छ दुनियाँ मेरो',
      type: 'Verse 3',
      timestamp: [100, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'पर्वा नगर यो दुनियाँको',
      type: 'Verse 3',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी मै बसेको छ दुनियाँ मेरो',
      type: 'Verse 3',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'पर्वा नगर यो दुनियाँको',
      type: 'Verse 3',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'तिमी मै बसेको छ दुनियाँ मेरो',
      type: 'Verse 3',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'जे छौ, जसो छौ तिमी',
      type: 'Outro',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    },
    {
      actor: '',
      nepali: 'त्यही नै हो मलाई चाहिने',
      type: 'Outro',
      timestamp: [200, 26],
      nepaliRoman: '',
      en: '',
      lit: ''
    }
  ]
}

const song1 = {
  title: '非洲人翻唱【一剪梅】【雪花飘飘】xuě huā piāo piāo 太好听了',
  url: 'https://www.youtube.com/watch?v=w9cngtAe7XY?t=0',
  scripts: [
    // {
    //   actor: 'Bobo',
    //   timestamp: [0, 1],
    //   pinyin: 'Hello dàjiā hǎo',
    //   hanzi: 'Hello 大 家 好',
    //   en: 'Hello everyone',
    //   lit: 'Hello big home good'
    // },
    // {
    //   actor: 'Bobo',
    //   timestamp: [1, 2],
    //   hanzi: '我们 又 来 了',
    //   pinyin: 'wǒmen yòu láile',
    //   en: 'We are here again',
    //   lit: 'Us (我们) again (又) come (来) up (了)'
    // },
    // {
    //   actor: 'Bobo',
    //   timestamp: [3, 5],
    //   hanzi: '虽然 今天 的 天气 很 热',
    //   pinyin: 'suīrán jīntiān de tiānqì hěn rè',
    //   en: "Although today's weather is hot",
    //   lit: 'Although (虽然) today (今天) of (的) weather (天气) very (很) hot (热)'
    // },
    {
      actor: 'Boan',
      timestamp: [39, 45],
      hanzi: '真 情 像 草 原 广 阔',
      pinyin: 'zhēn qíng xiàng cǎo yuán guǎng kuò',
      en: 'My love is as wide as a grassland',
      lit: 'true love (真情) like (像) grassland (草原) vast (广阔)'
    },
    {
      actor: 'Boan',
      timestamp: [45, 51],
      hanzi: '层 层 风 雨 不 能 阻 隔',
      pinyin: 'céng céng fēng yǔ bù néng zǔ gé',
      en: 'Layers upon layer of wind and rain cannot separate us',
      lit: 'layer layer (层层) wind rain (风雨) cannot(不能) block (阻隔)'
    },
    {
      actor: 'Boan',
      timestamp: [52, 58],
      hanzi: '总   有  云  开  日 出  时  候',
      pinyin: 'zǒng yǒu yún kāi rì chū shí hou',
      en: 'The clouds eventually clear and the sun shines',
      lit: 'There is awalys (总有) cloud (云) open (开) at sunrise (日出时候)'
    },
    {
      actor: 'Boan',
      timestamp: [59, 65],
      hanzi: '万 丈 阳 光 照 耀 你 我',
      pinyin: 'wàn zhàng yáng guāng zhào yào nǐ wǒ',
      en: 'The sun shines on you and me',
      // lit: 'true love (真情) like (像) grassland (草原) vast (广阔)'
      lit: ``
    },
    {
      actor: 'Boan',
      timestamp: [66, 71],
      hanzi: '真   情   像    梅  花  开  过',
      pinyin: 'zhēn qíng xiàng méi huā kāi guò',
      en: 'My love is like a blossoming plum flower'
    },
    {
      actor: 'Boan',
      timestamp: [72, 78],
      pinyin: 'lěng lěng bīng xuě bù néng yān mò',
      hanzi: '冷   冷   冰   雪  不 能   淹  没',
      en: 'The cold snow will never cover it'
    },
    {
      actor: 'Boan',
      timestamp: [79, 85],
      pinyin: 'jiù zài zuì lěng zhī tóu zhàn fàng',
      hanzi: '就  在  最  冷   枝  头  绽   放',
      en: 'It blooms on the coldest day'
    },
    {
      actor: 'Boan',
      timestamp: [86, 92],
      pinyin: 'kàn jiàn chūn tiān zǒu xiàng nǐ wǒ',
      hanzi: '看  见   春   天   走  向    你 我',
      en: 'And leads us to the spring'
    },
    {
      actor: 'Boana',
      timestamp: [93, 99],
      pinyin: 'Xuěhuā piāo piāo běi fēng xiāoxiāo',
      hanzi: '雪花飘飘 北风萧萧',
      en: 'Snowflakes are fluttering, the north wind is blowing'
    },
    {
      actor: 'Boana',
      timestamp: [100, 106],
      en: 'The world is boundless',
      hanzi: '天地 一片 苍茫',
      pinyin: 'tiāndì yīpiàn cāngmáng'
    },
    {
      actor: 'Boana',
      timestamp: [107, 113],
      en: 'A Jian Hanmei stands proudly in the snow',
      hanzi: '一翦寒梅 傲立雪中',
      pinyin: 'yī jiǎn hánméi ào lì xuě zhōng'
    },
    {
      actor: 'Boana',
      timestamp: [114, 120],
      en: "Only for Yi Ren's fragrance",
      hanzi: '只为 伊人 飘香',
      pinyin: 'zhǐ wèi yīrén piāo xiāng'
    },
    {
      actor: 'Boan',
      timestamp: [120, 126],
      en: 'love my love no regrets',
      hanzi: '爱我所爱 无怨无悔',
      pinyin: 'ài wǒ suǒ ài wú yuàn wú huǐ'
    },
    {
      actor: 'Boan',
      timestamp: [127, 140],
      en: 'Keep this love in mind',
      hanzi: '此情 长留 心间',
      pinyin: 'cǐ qíng zhǎng liú xīn jiān'
    },
    {
      actor: 'Boan',
      timestamp: [167, 174],

      pinyin: 'Xuěhuā piāo piāo běi fēng xiāoxiāo',
      hanzi: '雪花飘飘 北风萧萧',
      en: 'Snowflakes are fluttering, the north wind is blowing'
    },
    {
      actor: 'Boana',
      timestamp: [174, 181],
      en: 'The world is boundless',
      hanzi: '天地 一片 苍茫',
      pinyin: 'tiāndì yīpiàn cāngmáng'
    },
    {
      actor: 'Boana',
      timestamp: [181, 187],
      en: 'A Jian Hanmei stands proudly in the snow',
      hanzi: '一翦寒梅 傲立雪中',
      pinyin: 'yī jiǎn hánméi ào lì xuě zhōng'
    },
    {
      actor: 'Boana',
      timestamp: [187, 194],
      en: "Only for Yi Ren's fragrance",
      hanzi: '只为 伊人 飘香',
      pinyin: 'zhǐ wèi yīrén piāo xiāng'
    },
    {
      actor: 'Boan',
      timestamp: [194, 201],
      en: 'love my love no regrets',
      hanzi: '爱我所爱 无怨无悔',
      pinyin: 'ài wǒ suǒ ài wú yuàn wú huǐ'
    },
    {
      actor: 'Boan',
      timestamp: [201, 215],
      en: 'Keep this love in mind',
      hanzi: '此情 长留 心间',
      pinyin: 'cǐ qíng zhǎng liú xīn jiān'
    }
  ]
}
const song2 = {
  title: '爱的代价 (Ai De Dai Jia)',
  url: 'https://www.youtube.com/watch?v=TApHGRBvF00?t=0',
  scripts: [
    {
      actor: 'Boan',
      timestamp: [18, 23],
      hanzi: '还 记得 年少 时 的 梦 吗',
      pinyin: 'hái jìdé niánshào shí de mèng ma ',
      en: 'Do you still remember the dream when you were young',
      lit: 'still (还) to remember (记得) young (年少) time (时) of (的) dream (梦) question-particle (吗)'
    },
    {
      actor: 'Boan',
      timestamp: [23, 27],
      hanzi: '像 朵 永远 不 凋零 的 花',
      pinyin: 'xiàng duǒ yóngyuǎn bù diāolíng de huā ',
      en: 'Like a flower that never withers',
      lit: 'like (像) flower (朵)  forever (永远) not (不) withered/to decay (凋零) of (的)  flower (花)'
    },
    {
      actor: 'Boan',
      timestamp: [27, 31],

      pinyin: 'péi wǒ jīngguò nà fēngchuīyǔdǎ',
      hanzi: '陪 我 经过 那 风吹雨打',
      en: ' Accompany me through the wind and rain',
      lit: 'to accompany (陪) I/me (我) to go through (经过) that (那)  lit. windswept and battered by rain; to undergo hardship (idiom) (风吹雨打)'
    },
    {
      actor: 'Boan',
      timestamp: [31, 33],
      pinyin: 'kàn shì shì wú cháng',
      hanzi: '看 世事 无常',
      en: 'Look at the impermenance of the world',
      lit: 'to see (看)  things of the world (世事) impermanence (无常)'
    },
    {
      actor: 'Boan',
      timestamp: [33, 35],
      pinyin: 'kàn cāng sāng biàn huà ',
      hanzi: '看 沧桑 变化',
      en: 'Look at the great changes of life',
      lit: 'to see (看)  great changes (沧桑) change (变化)'
    },
    {
      actor: 'Bono',
      timestamp: [35, 40],
      pinyin: 'nàxiē wéi ài suǒ fùchū de dàijià',
      hanzi: '那些 为 爱 所 付出 的 代价',
      en: 'The price paid for love',
      lit: 'those (那些), for (为) to love (爱) actually (所) to pay (付出) of (的) price (代价)'
    },
    {
      actor: 'Bono',
      timestamp: [40, 44],
      pinyin: 'shì yóng yuǎn dōu nán wàng de ā  ',
      hanzi: '是 永远 都 难忘 的 啊',
      en: 'It will never be forgotten',
      lit: 'is(是) forever(永远) entirely(都) unfortettable(难忘) of(的) 	modal particle ending sentence(啊)'
    },
    {
      actor: 'Bono',
      timestamp: [44, 47],
      pinyin: 'suóyǒu zhēnxīn de chīxīn de huà',
      hanzi: '所有 真心 的 痴心 的 话',
      // en: 'Have the true heart of the crazy heart of the words',
      en: 'All sincere and infatuated words',
      lit: 'to possess (所有) sincere(真心) of (的) infatuation(痴心) of (的) words (话)'
    },
    {
      actor: 'Bono',
      timestamp: [47, 54],
      pinyin: 'yǒng zài wǒ xīnzhōng suīrán yǐ méiyǒu tā',
      hanzi: '永 在 我 心中 虽然 已 没有 他',
      en: 'Though he is no more in my heart',
      lit: 'forever (永), located (在), I (我), in ones heart (心中), although (虽然), already (已), to not have (没有), him (他)'
    },
    {
      actor: 'Bobo',
      timestamp: [54, 58],
      pinyin: 'zǒu ba zǒu ba',
      hanzi: '走 吧 走 吧',
      en: "Let's go let's go",
      lit: 'to walk (走), modal particle indicating suggestion or surmise (吧)'
    },
    {
      actor: 'Bobo',
      timestamp: [58, 62],
      pinyin: 'rén zǒng yào xué zhe zì jǐ zhǎngdà ',
      hanzi: '人 总要 学 着 自己 长大',
      en: 'One must learn to grow up',
      lit: 'person (人), nevertheless (总要),  to learn (学), 	aspect particle indicating action in progress (着),  oneself (自己),  to grow up (长大)'
    },
    {
      actor: 'Bobo',
      timestamp: [62, 66],
      pinyin: 'zǒu ba zǒu ba',
      hanzi: '走  吧 走  吧',
      en: "Let's go let's go",
      lit: 'to walk (走), modal particle indicating suggestion or surmise (吧)'
    },
    {
      actor: 'Bobo',
      timestamp: [66, 71],
      pinyin: 'rén shēng nán miǎn jīng lì kǔ tòng zhēng zhá ',
      hanzi: '人生 难免 经历 苦痛 挣扎',
      en: "Let's go let's go",
      lit: 'life(人生), hard to avoid (难免), expereince(经历), pain(苦痛), to struggle (挣扎)'
    }
  ]
}

const book1 = {
  title:
    "Chinese Audiobook with Text. Harry Potter and the Philosopher's Stone, Chapter 1.",
  url: 'https://www.youtube.com/watch?v=NLu0JW6VtGM&t=0',
  scripts: [
    {
      hanzi: '哈利-波特与魔法石',
      timestamp: [0, 4],
      pinyin: 'Hā lì-bō tè yǔ mófǎ shí',
      en: "Harry Potter and the Philosopher's Stone",
      lit: 'Harry Potter (哈利-波特) and (与:yǔ) magic (魔法:mófǎ) stone (石:shí)'
    },
    {
      hanzi: '第一章',
      timestamp: [5, 7],
      pinyin: 'dì yī zhāng',
      en: 'Chapter 1',
      lit: 'No. (第) one (一) chapter (章)'
    },
    {
      timestamp: [8, 11],
      hanzi: '大难不死的男孩',
      pinyin: 'Dà nàn bùsǐ de nánhái',
      en: 'The boy who lived',
      lit: 'survived (大:big 难:disaster 不:no 死:die) of (的) boy (男:male 孩:child)'
    },
    {
      timestamp: [12, 26],
      hanzi:
        '家住女贞路4号的德思礼夫妇总是得意地说他们是非常规矩的人家，拜托，拜托了。',
      pinyin:
        'Jiāzhù nǚ zhēn lù 4 hào de dé sī lǐ fūfù zǒng shì déyì dì shuō tāmen shì fēicháng guījǔ de rénjiā, bàituō, bàituōle.',
      en: 'Mr and Mrs Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.',
      lit: 'home (家:Jiā) live (住:zhù) privet (女贞), road (路), No.4 (4号的), Mr and Mrs. Dursleys (德思礼:désīlǐ:dursley 夫妇:fūfù:couple 总:zǒng:total), please (拜托:bàituō)'
    },
    {
      timestamp: [26, 36],
      hanzi: '他们从来跟神秘吉怪的事不沾边，因为他们根本不相信那些邪门歪道。',
      pinyin:
        'Tāmen cónglái gēn shénmì jí guài de shì bù zhānbiān, yīnwèi tāmen gēnběn bù xiāngxìn nàxiē xiéménwāidào.',
      en: "They were the last people you'd expect to be involved in anything strange or mysterious, because they just didn't hold with such nonsense."
    },
    {
      timestamp: [37, 47],
      hanzi: '弗农•德思礼先生在一家名叫格朗宁的公司做主管，公司生产钻机。',
      pinyin:
        'Fú nóng•dé sī lǐ xiānshēng zài yījiā míng jiào gé lǎng níng de gōngsī zuò zhǔguǎn, gōngsī shēngchǎn zuànjī.',
      en: 'Mr Dursley was the director of a firm called Grunnings, which made drills.'
    },
    {
      timestamp: [48, 57],
      hanzi: '他高大魁梧，胖得几乎连脖子都没了，却蓄着一脸大胡子。',
      pinyin:
        'Tā gāodà kuíwú, pàng dé jīhū lián bózi dōu méiliǎo, què xùzhe yī liǎn dà húzi.',
      en: 'He was a big, beefy man with hardly any neck, although he did have a very large moustache.',
      lit: 'Him (他:tā), tall (高大:gāodà), tall and sturdy (魁梧:kuíwú), fat (胖:pàng), to obtain (得:dé), almost/nearly (几乎:jīhū), to join/connect (连: lián), neck: (脖子:bó zi), all; both (都:dōu), cease to exist (没了:méile), bold/unafraid (脸大:liǎn dà), mustache (大胡子:húzi)'
    }
  ]
}

const medias = [song0, song2, song1, book1]

export function ListenPage () {
  const [mediaIndex, setMediaIndex] = useState(0)

  return (
    <VideoPlayer
      mediaIndex={mediaIndex}
      setMediaIndex={setMediaIndex}
      media={medias[mediaIndex % medias.length]}
    />
  )
}
