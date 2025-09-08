import { BookSidebar } from "./components/book-sidebar";

const sampleBook = {
  title:
    "How to Win the Premier League: The Inside Story of Football's Data Revolution",
  subtitle: "Instinct or Algorithm? The Battle for Football's Soul",
  author: "Ian Graham",

  totalRatings: 4545,
  averageRating: 4.4,
  lang: "en",
  sections: [
    {
      type: "introduction",
      index: null,
      title:
        "The Data Revolution: How a physicist's models helped build a modern football dynasty.",
      content:
        "This book is the first-hand account of Dr. Ian Graham, a theoretical physicist who became the Director of Research for Liverpool FC and was a central figure in the club's data-driven transformation. It chronicles the journey from being a skeptical outsider to becoming an integral part of the leadership team that ended Liverpool's 30-year league title drought. The narrative demystifies the role of data in modern football, showing it not as a cold, robotic overlord, but as a powerful tool to support human expertise in recruitment, tactics, and strategy.",
      start: 0,
      end: 126.48,
    },
    {
      type: "chapter",
      index: 1,
      title: "Beyond Moneyball: The complexity of football data.",
      content:
        "Graham explains that football is a far more complex sport to analyze than baseball (the subject of Moneyball) due to its fluid, continuous nature with 22 interconnected players. The key breakthrough was moving beyond basic stats to develop sophisticated mathematical models that could quantify a player's true impact. The most famous metric is Expected Goals (xG), which assigns a probability to every shot based on historical data. However, Graham's work went much further, creating models for Expected Goals Added (xGA) to measure overall contribution and Pitch Control to map the probability of controlling the ball anywhere on the pitch at any time.",
      start: 126.48,
      end: 251.64,
    },
    {
      type: "chapter",
      index: 2,
      title: "The Liverpool Blueprint: Data in action.",
      content:
        "The core of the book is a detailed case study of Liverpool's rise. Data was not used in a vacuum but was instrumental in key decisions: Identifying Jürgen Klopp: Data showed his Borussia Dortmund team consistently overperformed their xG, indicating a manager who created a system greater than the sum of its parts. Player Recruitment: Data identified undervalued talent that perfectly fit Klopp's system. Mohamed Salah was seen by many as a Chelsea flop, but data showed he was an elite chance-generator. Andy Robertson and Sadio Mané were also highlighted as undervalued assets with performance data among the best in Europe. Sustained Success: Graham uses data to show that Liverpool's 2019/20 title win was built on sustainable, repeatable dominance (evident in their crushing xG numbers) rather than luck.",
      start: 251.64,
      end: 392.75,
    },
    {
      type: "chapter",
      index: 3,
      title: "The Human Element: The perfect triangle.",
      content:
        "A central theme is that data alone wins nothing. Liverpool's success was forged by a perfect tripartite structure where data was one voice among experts: The Manager (Klopp): The leader, motivator, and tactical visionary. The Sporting Director (Michael Edwards): The negotiator and strategist who executed the plan. The Data Department (Graham): Provided objective evidence to inform decisions and challenge assumptions. Data was used to support human judgment, reduce costly transfer mistakes, and find marginal gains, not to replace the manager's intuition or the scouts' eyes.",
      start: 392.75,
      end: 519.49,
    },
    {
      type: "chapter",
      index: 4,
      title: "The Future is Now: Data as a necessity.",
      content:
        "Graham concludes that data science is now an indispensable part of elite football. The competitive edge will no longer come from simply having data, but from those clubs that can best integrate this information with traditional scouting and coaching expertise. The book argues that ignoring this revolution is a surefire way to be left behind.",
      start: 519.49,
      end: 651.01,
    },
    {
      type: "summary",
      index: null,
      title: "Final Summary",
      content:
        "The key message of this book is:How to Win the Premier League is the definitive insider's story of football's data revolution. It demonstrates that success at the highest level is achieved not by data or intuition alone, but by a powerful synthesis of both—where advanced analytics inform human expertise in recruitment, tactical planning, and decision-making to build a dominant team.Actionable advice:Focus on process over outcomes. A good decision backed by data can still lead to a bad result in the short term due to luck. Trusting the process (e.g., consistently creating high-value chances) is a better indicator of long-term success than just looking at the scoreline.Seek undervalued assets. The key to smart team building is not always buying the most obvious star, but finding players whose specific, data-proven skills are systematically undervalued by the market and perfectly fit your team's style of play.Build a culture of collaboration. The most successful organizations break down silos. For data to be effective, it must be in a constant dialogue with coaching, scouting, and executive leadership, with each discipline respecting the others' expertise.",
      start: 651.01,
      end: 792.84,
    },
  ],
};

const sampleBookZhEasy = {
  title: "如何赢得英超：足球数据革命的内幕故事",
  subtitle: "靠直觉还是靠算法？争夺足球灵魂的战争",
  author: "伊恩·格雷厄姆",

  totalRatings: 4545,
  averageRating: 4.4,
  lang: "英语",
  sections: [
    {
      type: "introduction",
      index: null,
      title: "数据革命：一位物理学家的模型如何帮助建立现代足球王朝",
      content:
        "这本书是伊恩·格雷厄姆博士的亲述。他本是理论物理学家，后来成为利物浦足球俱乐部的研究总监，是俱乐部利用数据取得成功的关键人物。书中讲述了他如何从一个怀疑者变成领导团队的一员，并帮助利物浦队时隔30年再次赢得联赛冠军。这本书解释了数据在现代足球中的作用：它不是冷冰冰的机器主宰，而是帮助专家们在买球员、定战术、做决策时的强大工具。",
      start: 0,
      end: 126.48,
    },
    {
      type: "chapter",
      index: 1,
      title: "不只是点球成金：足球数据的复杂性",
      content:
        "格雷厄姆解释说，足球比棒球（电影《点球成金》的主题）复杂得多，因为比赛不停顿，22个球员相互关联。关键的突破是超越了简单数据，开发了复杂的数学模型来衡量球员的真正作用。最著名的数据是“预期进球（xG）”，它根据历史数据计算每次射门的得分概率。但格雷厄姆的工作更深入，他还创建了“预期贡献进球（xGA）”和“控场概率”等模型。",
      start: 126.48,
      end: 251.64,
    },
    {
      type: "chapter",
      index: 2,
      title: "利物浦的成功蓝图：数据实战",
      content:
        "本书核心是详细研究利物浦队的崛起。数据在许多关键决策中起到了重要作用：1. 选择克洛普教练：数据显示他之前执教的球队表现总是超出预期，说明他能让团队发挥出超常水平。2. 购买球员：数据帮助找到了被低估但又非常适合克洛普战术的球员。比如萨拉赫，数据表明他创造机会的能力是世界级的。罗伯逊和马内也是数据发现的高性价比球员。3. 保持成功：数据证明利物浦的冠军是靠持续的强大实力（从碾压对手的xG数据可以看出）赢得的，而不是靠运气。",
      start: 251.64,
      end: 392.75,
    },
    {
      type: "chapter",
      index: 3,
      title: "人的因素：完美的三角组合",
      content:
        "本书一个重要观点是：光靠数据赢不了比赛。利物浦的成功源于一个完美的三角结构，数据只是专家意见中的一种：1. 主教练（克洛普）：领袖、激励者和战术设计者。2. 体育总监（迈克尔·爱德华兹）：负责谈判和战略的执行者。3. 数据部门（格雷厄姆）：提供客观证据来支持决策、挑战固有想法。数据是用来辅助人的判断、减少买人失误、寻找细微优势的，而不是取代教练的直觉或球探的观察。",
      start: 392.75,
      end: 519.49,
    },
    {
      type: "chapter",
      index: 4,
      title: "未来已来：数据成为必需品",
      content:
        "格雷厄姆总结说，数据科学现在已是顶级足球不可或缺的一部分。未来的优势不再仅仅来自于拥有数据，而在于哪些俱乐部能最好地将数据与传统球探、教练的专业知识结合起来。这本书认为，忽视这场革命的俱乐部注定会落后。",
      start: 519.49,
      end: 651.01,
    },
    {
      type: "summary",
      index: null,
      title: "最终总结",
      content:
        "本书的核心信息是：成功不能只靠数据或只靠直觉，而是要把两者强大地结合起来——用数据分析来帮助专家进行球员招募、战术规划和决策，从而打造一支强队。实用建议：1. 关注过程而非结果。一个好的决策即使有数据支持，短期内也可能因运气差而失败。信任过程（比如持续创造高分机会）比只看比分更能预测长期成功。2. 寻找被低估的球员。聪明建队的关键不总是买最耀眼的球星，而是找到那些被市场系统性低估、但其特定数据化能力又完美适合你球队打法的球员。3. 建立合作文化。最成功的组织会打破各部門之间的隔阂。要让数据有效，就必须与教练、球探和管理层不断对话，彼此尊重对方的专业知识。",
      start: 651.01,
      end: 792.84,
    },
  ],
};

const sampleBookZhMedium = {
  title: "如何赢得英超联赛：足球数据革命的内幕故事",
  subtitle: "本能还是算法？一场争夺足球灵魂的战争",
  author: "伊恩·格雷厄姆",

  totalRatings: 4545,
  averageRating: 4.4,
  lang: "英语",
  sections: [
    {
      type: "introduction",
      index: null,
      title: "数据革命：一位物理学家的模型如何助力打造现代足球王朝",
      content:
        "本书是伊恩·格雷厄姆博士的第一手叙述。他是一位理论物理学家，后来成为利物浦足球俱乐部的研究总监，并是该俱乐部数据驱动转型的核心人物。它记录了他从一个持怀疑态度的局外人，到成为结束利物浦30年联赛冠军荒的领导团队中不可或缺一员的旅程。本书阐明了数据在现代足球中的作用，表明它并非冷酷的机械主宰，而是一种强大的工具，用以在球员招募、战术和战略方面支持人类的专业知识。",
      start: 0,
      end: 126.48,
    },
    {
      type: "chapter",
      index: 1,
      title: "超越《点球成金》：足球数据的复杂性",
      content:
        "格雷厄姆解释说，足球是一项比棒球（《点球成金》的主题）分析起来复杂得多的运动，因为它具有流动性、连续性，且22名球员相互关联。关键的突破在于超越了基础统计数据，开发出能够量化球员真实影响力的复杂数学模型。最著名的指标是预期进球（xG），它根据历史数据为每次射门分配一个概率值。然而，格雷厄姆的工作远不止于此，他还创建了用于衡量整体贡献的预期进球附加值（xGA）模型，以及用于绘制在任何时间、球场任何位置控制球可能性的“球场控制”模型。",
      start: 126.48,
      end: 251.64,
    },
    {
      type: "chapter",
      index: 2,
      title: "利物浦蓝图：数据的实战应用",
      content:
        "本书的核心是对利物浦崛起之路的详细案例研究。数据的运用并非孤立进行，而是在关键决策中发挥了重要作用：识别尤尔根·克洛普：数据显示他的多特蒙德队持续表现优于其xG，这表明他是一位能打造出“1+1>2”体系的教练。球员招募：数据帮助识别了被低估且完美契合克洛普体系的球员。穆罕默德·萨拉赫被许多人视为切尔西的失败引援，但数据表明他是顶级的机会创造者。安德鲁·罗伯逊和萨迪奥·马内也被数据突出显示为表现数据位居欧洲前列却被低估的资产。持续成功：格雷厄姆用数据表明，利物浦2019/20赛季的冠军是建立在可持续、可重复的统治力基础上（从其碾压性的xG数据中可见），而非运气。",
      start: 251.64,
      end: 392.75,
    },
    {
      type: "chapter",
      index: 3,
      title: "人的因素：完美的三角结构",
      content:
        "一个核心主题是，仅靠数据无法赢得任何胜利。利物浦的成功源于一个完美的三方结构，其中数据是专家意见中的一种声音：主教练（克洛普）：领导者、激励者和战术远见家。体育总监（迈克尔·爱德华兹）：执行计划的谈判专家和战略家。数据部门（格雷厄姆）：提供客观证据以支持决策并挑战固有假设。数据的用途是支持人为判断、减少昂贵的转会失误并寻找边际收益，而非取代教练的直觉或球探的洞察力。",
      start: 392.75,
      end: 519.49,
    },
    {
      type: "chapter",
      index: 4,
      title: "未来已至：数据成为必需品",
      content:
        "格雷厄姆总结道，数据科学如今已成为精英足球不可或缺的一部分。竞争优势将不再仅仅来源于拥有数据，而是属于那些能最有效地将这些信息与传统球探和教练专业知识相结合的俱乐部。本书认为，忽视这场革命注定会落后于人。",
      start: 519.49,
      end: 651.01,
    },
    {
      type: "summary",
      index: null,
      title: "最终总结",
      content:
        "本书的核心信息是：《如何赢得英超联赛》是足球数据革命权威的内幕故事。它表明，最高水平的成功并非仅凭数据或直觉实现，而是通过两者强有力的结合——先进的分析学为人员在球员招募、战术规划和决策方面的专业知识提供信息，从而打造出一支统治级球队。可行建议：关注过程重于结果。一个有数据支持的优质决策，短期内仍可能因运气不佳而导致坏结果。信任过程（例如，持续创造高价值机会）比仅仅关注比分更能预示长期成功。寻找被低估的资产。明智的团队建设关键并非总是购买最耀眼的明星，而是寻找那些其特定的、经数据验证的能力被市场系统性低估，且完美契合你球队比赛风格的球员。建立协作文化。最成功的组织会打破部门壁垒。要让数据有效，它必须与教练、球探和高层领导持续对话，各领域尊重彼此的专业知识。",
      start: 651.01,
      end: 792.84,
    },
  ],
};

const sampleBookZhHard = {
  title: "如何赢得英超：足球数据革命的内部叙事",
  subtitle: "直觉抑或算法？一场关乎足球灵魂的博弈",
  author: "伊恩·格雷厄姆",

  totalRatings: 4545,
  averageRating: 4.4,
  lang: "英语",
  sections: [
    {
      type: "introduction",
      index: null,
      title: "数据革命：一位理论物理学家如何藉模型构建现代足球王朝",
      content:
        "本书是伊恩·格雷厄姆博士的亲历记述。身为理论物理学家，他后来出任利物浦足球俱乐部研究总监，并成为该俱乐部数据驱动转型的核心人物。此书详述了他从一名持怀疑态度的外部人士，转变为领导团队核心成员、并助力终结利物浦长达三十年顶级联赛冠军荒的历程。本书祛魅了数据在现代足球中的角色，揭示其并非冷酷的机械至高权威，而是一种强大的辅助工具，用以在球员招募、战术布置与战略制定层面赋能人类专业知识。",
      start: 0,
      end: 126.48,
    },
    {
      type: "chapter",
      index: 1,
      title: "超越《点球成金》：足球数据的复杂性与纵深",
      content:
        "格雷厄姆阐释道，由于足球运动具有流动性、连续性及22名球员动态互联的特性，其分析复杂度远高于棒球（《点球成金》的主题）。关键突破在于超越了基础统计数据，转而开发能够量化球员真实影响力的精密数学模型。其中最著名的指标是预期进球（xG），它依据历史数据为每一次射门赋值一个概率分数。然而，格雷厄姆的工作更具前瞻性，他进一步创建了旨在衡量整体贡献的预期进球附加值（xGA）模型，以及用于构象化任何时间点、球场任何位置控球可能性的“控场概率”模型。",
      start: 126.48,
      end: 251.64,
    },
    {
      type: "chapter",
      index: 2,
      title: "利物浦范式：数据驱动的实战策略",
      content:
        "本书核心是对利物浦复兴之路的详尽案例剖析。数据应用并非孤立存在，而是在多项关键决策中起到了基石作用：甄选尤尔根·克洛普：数据表明其执教的多特蒙德队长期表现显著超越预期进球值，印证了他作为一名能构建“体系大于个体之和”的教练特质。球员招募：数据精准定位了市场估值偏低且极度契合克洛普战术体系的球员。穆罕默德·萨拉赫曾被多数人视作切尔西的失败引援，但数据揭示其拥有精英级的创造机会能力。安德鲁·罗伯逊与萨迪奥·马内同样被数据标识为表现指标位居欧洲顶级却遭低估的优质资产。持续竞争优势：格雷厄姆运用数据论证，利物浦2019/20赛季的冠军成就源于其可持续、可复制的统治性表现（体现于其压倒性的预期进球数据），而非偶然运气。",
      start: 251.64,
      end: 392.75,
    },
    {
      type: "chapter",
      index: 3,
      title: "人性维度：卓越的铁三角架构",
      content:
        "一个核心论点是：数据本身无法赢得任何荣誉。利物浦的成功锻造于一个完美的三元结构之中，数据在此仅是专家话语体系中的一种声音：主帅（克洛普）：作为领袖、激励者与战术构想家。体育总监（迈克尔·爱德华兹）：作为谈判家与战略家，负责蓝图落地。数据部门（格雷厄姆）：提供客观证据以优化决策流程并挑战传统认知。数据的效用在于支撑人类判断、规避高代价的转会失误、探寻边际收益，而非取代主教练的直觉或球探的肉眼观察。",
      start: 392.75,
      end: 519.49,
    },
    {
      type: "chapter",
      index: 4,
      title: "当下即未来：数据已成为战略刚需",
      content:
        "格雷厄姆论断，数据科学现已成顶级足球不可或缺的组成部分。未来的竞争优势将不再源自于单纯占有数据，而是取决于哪些俱乐部能最卓越地将信息学与传统球探洞察、教练智慧进行深度融合。本书主张，漠视此革命浪潮必将导致无可避免的落后。",
      start: 519.49,
      end: 651.01,
    },
    {
      type: "summary",
      index: null,
      title: "核心摘要",
      content:
        "本书的核心主旨是：《如何赢得英超》是关于足球数据革命具有权威性的内部叙事。它论证了最高水平的成功并非通过数据或直觉单一实现，而是依赖于二者强有力的合成——即先进的分析学为球员招募、战术规划与决策制定中的人类专业知识提供信息依据，从而构建统治级团队。行动建议：聚焦过程优于结果。基于数据的优质决策可能因短期运气因素导致不利结果。坚信过程（如持续创造高期望值机会）比单纯审视赛果更能预示长期成功。探寻价值洼地资产。智慧团队建设的关键并非总是购入最显性的明星，而是发掘那些其特定、经数据验证的能力被市场系统性低估，且与你球队比赛哲学完美契合的球员。构筑协同文化。顶尖组织致力于打破部门壁垒。欲使数据发挥效能，其必须与教练组、球探网络及管理层保持持续对话，各专业领域相互尊重彼此专长。",
      start: 651.01,
      end: 792.84,
    },
  ],
};

const sampleBookZhMaoEasy = {
  title: "毛泽东的故事",
  subtitle: null,
  author: "石仲泉 陈登才",

  totalRatings: null,
  averageRating: null,
  lang: "中文",
  sections: [
    {
      type: "introduction",
      index: null,
      title: "人民领袖：从韶山冲走向天安门",
      content:
        "本书由中共党史专家石仲泉和陈登才撰写，通过一系列生动真实的故事，讲述了毛泽东同志从农家子弟成长为伟大无产阶级革命家、战略家和理论家的历程。书中不仅展现了他领导中国革命和建设的丰功伟绩，也刻画了他与人民群众的血肉联系、读书治学的孜孜不倦以及日常生活中的情感世界，为读者呈现了一位立体而亲切的人民领袖形象。",
      start: 0,
      end: null,
    },
    {
      type: "chapter",
      index: 1,
      title: "少年壮志：埋下革命火种",
      content:
        "本章讲述了毛泽东的童年和青年时代。从在韶山冲的私塾启蒙，到走出乡关赴湘乡求学；从在湖南省立图书馆的刻苦自学，到在湖南第一师范的求索生涯。故事重点描绘了他如何通过早期阅读和社会实践，逐步立下“改造中国与世界”的宏伟志向，并开始初步的社会活动与革命实践，为日后领导中国革命奠定了重要基础。",
      start: null,
      end: null,
    },
    {
      type: "chapter",
      index: 2,
      title: "星火燎原：开辟革命道路",
      content:
        "本章聚焦于毛泽东在土地革命战争时期的非凡实践与理论创造。从领导秋收起义、创建井冈山革命根据地，到提出“工农武装割据”思想；从古田会议确立建党建军原则，到指挥红军多次反“围剿”作战，以及艰苦卓绝的长征。一系列故事生动阐释了他如何将马列主义基本原理与中国革命具体实际相结合，成功开辟了“农村包围城市，武装夺取政权”的正确革命道路。",
      start: null,
      end: null,
    },
    {
      type: "chapter",
      index: 3,
      title: "延安岁月：走向成熟领导",
      content:
        "本章描绘了毛泽东在延安时期作为党的领袖走向全面成熟的故事。内容包括领导全党整风运动、撰写《实践论》《矛盾论》等光辉著作、在窑洞里指挥全国抗日斗争、以及开展大生产运动克服经济困难等。这些故事展现了他卓越的理论创造力、政治远见和领导艺术，毛泽东思想在这一时期得到系统总结和多方面展开而达到成熟。",
      start: null,
      end: null,
    },
    {
      type: "chapter",
      index: 4,
      title: "人民万岁：缔造新中国",
      content:
        "本章讲述了毛泽东领导中国人民夺取解放战争胜利、建立新中国的伟大历程。从赴重庆谈判展现和平诚意，到运筹帷幄指挥三大战役；从在西柏坡提出“两个务必”，到在天安门城楼上庄严宣告中华人民共和国成立。故事再现了那段波澜壮阔的历史，凸显了毛泽东作为新中国主要缔造者的历史地位和为人民服务的根本宗旨。",
      start: null,
      end: null,
    },
    {
      type: "chapter",
      index: 5,
      title: "读书生活：伟人的精神世界",
      content:
        "本章通过毛泽东终身与书为伴的故事，揭示其博大精深的精神世界。无论是战争年代马背上的吟诵，还是中南海菊香书屋里的批注；无论是对中国古籍的精通，还是对马列原著的钻研；无论是读《共产党宣言》上百遍，还是临终前仍索要书籍阅读。这些故事生动体现了他酷爱读书、勤于思考、善于批判吸收的鲜明特点，正是这种无止境的求知探索，滋养了他的思想与实践。",
      start: null,
      end: null,
    },
    {
      type: "summary",
      index: null,
      title: "精神永存",
      content:
        "本书通过一个个真实感人的故事，深刻表明毛泽东同志是伟大的马克思主义者，是中华民族空前的民族英雄。他的革命实践和光辉业绩已经载入中华民族的史册，他的科学思想和崇高精神永远是激励中国人民奋勇前进的强大动力。学习毛泽东的故事，有助于我们了解党的历史，继承革命传统，汲取智慧力量，为实现中华民族的伟大复兴而努力奋斗。",
      start: null,
      end: null,
    },
  ],
};

export default function BooksPage() {
  const sampleBook = sampleBookZhMaoEasy;
  return (
    <div className="min-h-screen bg-background">
      <BookSidebar />

      {/* Main content */}
      <div className="md:ml-64">
        <div className="pt-24 px-4 sm:px-0 lg:pl-20 max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 m:mb-4 leading-relaxed">
              {sampleBook.title}
            </h1>

            <h2 className="text-[16px] mt-10 font-bold mb-12">
              {sampleBook.author}
            </h2>

            <p className="text-xl font-light">{sampleBook.subtitle}</p>
          </div>

          <div className="mt-24 flex flex-col gap-12">
            {sampleBook.sections.map((section) => {
              return (
                <div key={JSON.stringify(section)}>
                  <div className="mb-12">
                    <p className="uppercase text-mid-grey text-sm font-medium font-cera-pro mb-4">
                      {section.type} {section.index}
                    </p>
                    <h3 className="font-bold inline transition font-cera-pro text-2xl text-midnight">
                      {section.title}
                    </h3>
                  </div>

                  <p className="font-serif text-[20px]">{section.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
