// https://paankopat.com/2023/03/25/j-chau-timi-lyrics-swoopna-suman-x-samir-shrestha/
const song = [
  {
    type: "Verse 1",
    lyrics: [
      "गाजल त्यो तिम्रो मेटाईदेऊ न",
      "तिम्रो आँखाको रंग हेर्न मन छ",
      "बाँधेको केश फुकाइदेऊ न",
      "हावाले उडाको मन पर्छ",
    ],
  },
  {
    type: "Pre-Chorus",
    lyrics: [
      "नढाक न मुहार श्रृंगारले",
      "नढाक न मुहार श्रृंगारले",
      "चन्द्रमामा पनि दाग हुन्छ",
      "चन्द्रमामा पनि दाग हुन्छ",
    ],
  },
  {
    type: "Chorus",
    lyrics: [
      "भाग्यमानी सबै तिम्रो मुस्कान हेर्न पाउने",
      "जे छौ, जसो छौ तिमी",
      "त्यही नै हो मलाई चाहिने",
    ],
  },
  {
    type: "Verse 2",
    lyrics: [
      "छिछोलेर अंधेरो लाई उज्यालो देखाउने",
      "चम्किला जूनकीरी झैँ आँखा",
      "गहिरो समुन्द्र भए जिन्दगी मेरो",
      "किनारा देखाउने तिम्रो हात",
    ],
  },
  {
    type: "Pre-Chorus",
    lyrics: [
      "सुरिलो त के छ र गीत मेरो",
      "सुरिलो त के छ र गीत मेरो",
      "जति तिम्रो आवाज हुन्छ",
      "जति तिम्रो आवाज हुन्छ",
    ],
  },
  {
    type: "Chorus",
    lyrics: [
      "आशा यही हो सधैं तिम्रो साथ पाउने",
      "जे छौ, जसो छौ तिमी",
      "त्यही नै हो मलाई चाहिने",
      "तिमी हौ मलाई चाहिने",
    ],
  },
  {
    type: "Refrain",
    lyrics: [
      "तिमी हौ मलाई चाहिने",
      "तिमी हौ मलाई चाहिने",
      "तिमी हौ मलाई चाहिने",
      "तिमी हौ मलाई चाहिने",
      "तिमी हौ मलाई चाहिने",
      "तिमी हौ मलाई चाहिने",
      "तिमी हौ मलाई चाहिने",
      "तिमी हौ मलाई चाहिने",
    ],
  },
  {
    type: "Verse 3",
    lyrics: [
      "पर्वा नगर यो दुनियाँको",
      "तिमी मै बसेको छ दुनियाँ मेरो",
      "पर्वा नगर यो दुनियाँको",
      "तिमी मै बसेको छ दुनियाँ मेरो",
      "पर्वा नगर यो दुनियाँको",
      "तिमी मै बसेको छ दुनियाँ मेरो",
      "पर्वा नगर यो दुनियाँको",
      "तिमी मै बसेको छ दुनियाँ मेरो",
    ],
  },
  {
    type: "Outro",
    lyrics: ["जे छौ, जसो छौ तिमी", "त्यही नै हो मलाई चाहिने"],
  },
];

const nepaliWords203Old = [
  {
    en: "I",
    nepali: "म",
    nepaliRoman: "Ma",
  },

  {
    en: "you (singular)",
    nepali: "तपाईं",
    nepaliRoman: "Tapaĩ",
  },
  {
    en: "he",
    nepali: "उनी",
    nepaliRoman: "Uni",
  },
  {
    en: "she",
    nepali: "उनी",
    nepaliRoman: "Uni",
  },
  {
    en: "we",
    nepali: "हामी",
    nepaliRoman: "Hāmī",
  },
  {
    en: "they",
    nepali: "उनीहरू",
    nepaliRoman: "Unīharū",
  },
  {
    en: "this",
    nepali: "यो",
    nepaliRoman: "Yo",
  },
  {
    en: "that",
    nepali: "त्यो",
    nepaliRoman: "Tyo",
  },
  {
    en: "here",
    nepali: "यहाँ",
    nepaliRoman: "Yahām̐",
  },
  {
    en: "there",
    nepali: "त्यहाँ",
    nepaliRoman: "Tyahām̐",
  },
  {
    en: "who",
    nepali: "को",
    nepaliRoman: "Ko",
  },
  {
    en: "what",
    nepali: "के",
    nepaliRoman: "Ke",
  },
  {
    en: "where",
    nepali: "कहाँ",
    nepaliRoman: "Kahām̐",
  },
  {
    en: "when",
    nepali: "कहिले",
    nepaliRoman: "Kahīle",
  },
  {
    en: "how",
    nepali: "कसरी",
    nepaliRoman: "Kasarī",
  },
  {
    en: "not",
    nepali: "होइन",
    nepaliRoman: "Ho'īn",
  },
  {
    en: "all",
    nepali: "सबै",
    nepaliRoman: "Sabaī",
  },
  {
    en: "many",
    nepali: "धेरै",
    nepaliRoman: "Dheraī",
  },
  {
    en: "some",
    nepali: "केही",
    nepaliRoman: "Kehī",
  },
  {
    en: "few",
    nepali: "केही",
    nepaliRoman: "Kehī",
  },
  {
    en: "other",
    nepali: "अरू",
    nepaliRoman: "Aru",
  },
  {
    en: "one",
    nepali: "एक",
    nepaliRoman: "Eka",
  },
  {
    en: "two",
    nepali: "दुई",
    nepaliRoman: "Dui",
  },
  {
    en: "three",
    nepali: "तीन",
    nepaliRoman: "Tīn",
  },
  {
    en: "four",
    nepali: "चार",
    nepaliRoman: "Chār",
  },
  {
    en: "five",
    nepali: "पाँच",
    nepaliRoman: "Pām̐čh",
  },
  {
    en: "big",
    nepali: "ठूलो",
    nepaliRoman: "Thulō",
  },
  {
    en: "long",
    nepali: "लामो",
    nepaliRoman: "Lāmō",
  },
  {
    en: "wide",
    nepali: "फेरी",
    nepaliRoman: "Pherī",
  },
  {
    en: "thick",
    nepali: "मोटो",
    nepaliRoman: "Motō",
  },
  {
    en: "heavy",
    nepali: "भारी",
    nepaliRoman: "Bhārī",
  },
  {
    en: "small",
    nepali: "सानो",
    nepaliRoman: "Sānō",
  },
  {
    en: "short",
    nepali: "सानो",
    nepaliRoman: "Sānō",
  },
  {
    en: "narrow",
    nepali: "संक्षेप",
    nepaliRoman: "Sanḳsepa",
  },
  {
    en: "thin",
    nepali: "पातलो",
    nepaliRoman: "Pātalō",
  },
  {
    en: "woman",
    nepali: "महिला",
    nepaliRoman: "Mahilā",
  },
  {
    en: "man",
    nepali: "मान्छे",
    nepaliRoman: "Mānchhe",
  },
  {
    en: "child",
    nepali: "बच्चा",
    nepaliRoman: "Bachchā",
  },
  {
    en: "wife",
    nepali: "पत्नी",
    nepaliRoman: "Patnī",
  },
  {
    en: "husband",
    nepali: "पति",
    nepaliRoman: "Pati",
  },
  {
    en: "mother",
    nepali: "आमा",
    nepaliRoman: "Āmā",
  },
  {
    en: "father",
    nepali: "बाबु",
    nepaliRoman: "Bābu",
  },
  {
    en: "animal",
    nepali: "जनावर",
    nepaliRoman: "Janāvar",
  },
  {
    en: "fish",
    nepali: "माछा",
    nepaliRoman: "Māchhā",
  },
  {
    en: "bird",
    nepali: "पक्षी",
    nepaliRoman: "Pakshī",
  },
  {
    en: "dog",
    nepali: "कुकुर",
    nepaliRoman: "Kukur",
  },
  {
    en: "louse",
    nepali: "पिडा",
    nepaliRoman: "Pidā",
  },
  {
    en: "snake",
    nepali: "साँप",
    nepaliRoman: "Sām̐p̌",
  },
  {
    en: "worm",
    nepali: "कीट",
    nepaliRoman: "Kīṭ",
  },
  {
    en: "tree",
    nepali: "रुख",
    nepaliRoman: "Rukha",
  },
  {
    en: "forest",
    nepali: "जङ्गल",
    nepaliRoman: "Jangala",
  },
  {
    en: "stick",
    nepali: "सल्ला",
    nepaliRoman: "Sallā",
  },
  {
    en: "fruit",
    nepali: "फलफूल",
    nepaliRoman: "Phalaphūlā",
  },
  {
    en: "seed",
    nepali: "बिउ",
    nepaliRoman: "Biu",
  },
  {
    en: "leaf",
    nepali: "पात",
    nepaliRoman: "Pāta",
  },
  {
    en: "root",
    nepali: "जड",
    nepaliRoman: "Jād",
  },
  {
    en: "bark (of a tree)",
    nepali: "फाल्नु",
    nepaliRoman: "Phālnū",
  },
  {
    en: "flower",
    nepali: "फूल",
    nepaliRoman: "Phūlā",
  },
  {
    en: "grass",
    nepali: "घाँस",
    nepaliRoman: "Ghām̐š",
  },
  {
    en: "rope",
    nepali: "डोरी",
    nepaliRoman: "Dorī",
  },
  {
    en: "skin",
    nepali: "चर्म",
    nepaliRoman: "Čarma",
  },
  {
    en: "meat",
    nepali: "मासु",
    nepaliRoman: "Māsu",
  },
  {
    en: "blood",
    nepali: "रक्त",
    nepaliRoman: "Rakt",
  },
  {
    en: "bone",
    nepali: "हाड",
    nepaliRoman: "Hād",
  },
  {
    en: "fat (noun)",
    nepali: "मोटो",
    nepaliRoman: "Motō",
  },
  {
    en: "egg",
    nepali: "अंडा",
    nepaliRoman: "Āṇḍa",
  },
  {
    en: "horn",
    nepali: "सिंग",
    nepaliRoman: "Singa",
  },
  {
    en: "tail",
    nepali: "पुछ्रो",
    nepaliRoman: "Puchhrō",
  },
  {
    en: "feather",
    nepali: "पंख",
    nepaliRoman: "Paṇkha",
  },
  {
    en: "hair",
    nepali: "बाल",
    nepaliRoman: "Bāla",
  },
  {
    en: "head",
    nepali: "टाउको",
    nepaliRoman: "Ṭāukō",
  },
  {
    en: "ear",
    nepali: "कान",
    nepaliRoman: "Kāna",
  },
  {
    en: "eye",
    nepali: "आँखा",
    nepaliRoman: "Ām̐khā",
  },
  {
    en: "nose",
    nepali: "नाक",
    nepaliRoman: "Nāka",
  },
  {
    en: "mouth",
    nepali: "मुख",
    nepaliRoman: "Mukha",
  },
  {
    en: "tooth",
    nepali: "दाँत",
    nepaliRoman: "Dām̐ṭ",
  },
  {
    en: "tongue",
    nepali: "जिभ",
    nepaliRoman: "Jibha",
  },
  {
    en: "fingernail",
    nepali: "पोखरी",
    nepaliRoman: "Pokharī",
  },
  {
    en: "foot",
    nepali: "पैतला",
    nepaliRoman: "Paitalā",
  },
  {
    en: "leg",
    nepali: "खुट्टा",
    nepaliRoman: "Khuṭṭā",
  },
  {
    en: "knee",
    nepali: "घुट्टा",
    nepaliRoman: "Ghūṭṭā",
  },
  {
    en: "hand",
    nepali: "हात",
    nepaliRoman: "Hāta",
  },
  {
    en: "wing",
    nepali: "खिड़की",
    nepaliRoman: "Khiṛakī",
  },
  {
    en: "belly",
    nepali: "पेट",
    nepaliRoman: "Peta",
  },
  {
    en: "guts",
    nepali: "पाचा",
    nepaliRoman: "Pāchā",
  },
  {
    en: "neck",
    nepali: "घाँस",
    nepaliRoman: "Ghām̐š",
  },
  {
    en: "back",
    nepali: "पछाडी",
    nepaliRoman: "Pachāḍī",
  },
  {
    en: "breast",
    nepali: "सिन्लो",
    nepaliRoman: "Siṇlō",
  },
  {
    en: "heart",
    nepali: "हृदय",
    nepaliRoman: "Hṛdaya",
  },
  {
    en: "liver",
    nepali: "कलेजा",
    nepaliRoman: "Kalejā",
  },
  {
    en: "to drink",
    nepali: "पिउनु",
    nepaliRoman: "Piunū",
  },
  {
    en: "to eat",
    nepali: "खानु",
    nepaliRoman: "Khānū",
  },
  {
    en: "to bite",
    nepali: "चोट्नु",
    nepaliRoman: "Čoṭnū",
  },
  {
    en: "to suck",
    nepali: "चुस्नु",
    nepaliRoman: "Čusnū",
  },
  {
    en: "to spit",
    nepali: "फुक्नु",
    nepaliRoman: "Phuknū",
  },
  {
    en: "to vomit",
    nepali: "उब्ज्नु",
    nepaliRoman: "Ubjnū",
  },
  {
    en: "to blow",
    nepali: "फुफ्क्नु",
    nepaliRoman: "Phufknū",
  },
  {
    en: "to breathe",
    nepali: "सास लिनु",
    nepaliRoman: "Sās linū",
  },
  {
    en: "to laugh",
    nepali: "हाँस्नु",
    nepaliRoman: "Hāsnū",
  },
  {
    en: "to see",
    nepali: "हेर्नु",
    nepaliRoman: "Heṛnū",
  },
  {
    en: "to hear",
    nepali: "सुन्नु",
    nepaliRoman: "Sunnū",
  },
  {
    en: "to know",
    nepali: "थाहा पाउनु",
    nepaliRoman: "Thāhā pāunū",
  },
  {
    en: "to think",
    nepali: "सोच्नु",
    nepaliRoman: "Sochnū",
  },
  {
    en: "to smell",
    nepali: "गन्ध लिनु",
    nepaliRoman: "Gandha linū",
  },
  {
    en: "to fear",
    nepali: "डर्नु",
    nepaliRoman: "Darnū",
  },
  {
    en: "to sleep",
    nepali: "सुत्नु",
    nepaliRoman: "Sutnū",
  },
  {
    en: "to live",
    nepali: "बस्नु",
    nepaliRoman: "Basnū",
  },
  {
    en: "to die",
    nepali: "मर्नु",
    nepaliRoman: "Marnū",
  },
  {
    en: "to kill",
    nepali: "मार्नु",
    nepaliRoman: "Mārnū",
  },
  {
    en: "to fight",
    nepali: "लड्नु",
    nepaliRoman: "Ladnū",
  },
  {
    en: "to hunt",
    nepali: "शिकार गर्नु",
    nepaliRoman: "Śikār garnū",
  },
  {
    en: "to hit",
    nepali: "मार्नु",
    nepaliRoman: "Mārnū",
  },
  {
    en: "to cut",
    nepali: "काट्नु",
    nepaliRoman: "Kāṭnū",
  },
  {
    en: "to split",
    nepali: "टुक्रा गर्नु",
    nepaliRoman: "Ṭukrā garnū",
  },
  {
    en: "to stab",
    nepali: "खोक्नु",
    nepaliRoman: "Khoknū",
  },
  {
    en: "to scratch",
    nepali: "खोक्नु",
    nepaliRoman: "Khoknū",
  },
  {
    en: "to dig",
    nepali: "खनु",
    nepaliRoman: "Khnū",
  },
  {
    en: "to swim",
    nepali: "तिर्नु",
    nepaliRoman: "Ṭirnū",
  },
  {
    en: "to fly",
    nepali: "उड्नु",
    nepaliRoman: "Udnū",
  },
  {
    en: "to walk",
    nepali: "हिँड्नु",
    nepaliRoman: "Hiṇdnū",
  },
  {
    en: "to come",
    nepali: "आउनु",
    nepaliRoman: "Āunū",
  },
  {
    en: "to lie (as in a bed)",
    nepali: "सुत्नु",
    nepaliRoman: "Sutnū",
  },
  {
    en: "to sit",
    nepali: "बस्नु",
    nepaliRoman: "Basnū",
  },
  {
    en: "to stand",
    nepali: "खडा हुनु",
    nepaliRoman: "Khaḍā hunū",
  },
  {
    en: "to turn (intransitive)",
    nepali: "फेरी जानु",
    nepaliRoman: "Pherī jānū",
  },
  {
    en: "to fall",
    nepali: "टुट्नु",
    nepaliRoman: "Ṭuṭnū",
  },
  {
    en: "to give",
    nepali: "दिनु",
    nepaliRoman: "Dinū",
  },
  {
    en: "to hold",
    nepali: "पक्राउनु",
    nepaliRoman: "Pakrāunū",
  },
  {
    en: "to squeeze",
    nepali: "दबाउनु",
    nepaliRoman: "Dabāunū",
  },
  {
    en: "to rub",
    nepali: "घिस्नु",
    nepaliRoman: "Ghisnū",
  },
  {
    en: "to wash",
    nepali: "मार्नु",
    nepaliRoman: "Mārnū",
  },
  {
    en: "to wipe",
    nepali: "पोछ्नु",
    nepaliRoman: "Pochnū",
  },
  {
    en: "to pull",
    nepali: "टान्नु",
    nepaliRoman: "Ṭānnū",
  },
  {
    en: "to push",
    nepali: "थिच्नु",
    nepaliRoman: "Thicnū",
  },
  {
    en: "to throw",
    nepali: "फाल्नु",
    nepaliRoman: "Phālnū",
  },
  {
    en: "to tie",
    nepali: "बाँध्नु",
    nepaliRoman: "Bām̐ḍhnū",
  },
  {
    en: "to sew",
    nepali: "सिल्नु",
    nepaliRoman: "Silnū",
  },
  {
    en: "to count",
    nepali: "गणना गर्नु",
    nepaliRoman: "Gaṇnā garnū",
  },
  {
    en: "to say",
    nepali: "भन्नु",
    nepaliRoman: "Bhaṇnū",
  },
  {
    en: "to sing",
    nepali: "गाउनु",
    nepaliRoman: "Gāunū",
  },
  {
    en: "to play",
    nepali: "खेल्नु",
    nepaliRoman: "Khelnū",
  },
  {
    en: "to float",
    nepali: "पार्नु",
    nepaliRoman: "Pārnū",
  },
  {
    en: "to flow",
    nepali: "बह्नु",
    nepaliRoman: "Bahūnū",
  },
  {
    en: "to freeze",
    nepali: "जम्नु",
    nepaliRoman: "Jamnū",
  },
  {
    en: "to swell",
    nepali: "फुल्नु",
    nepaliRoman: "Phulnū",
  },
  {
    en: "sun",
    nepali: "सूर्य",
    nepaliRoman: "Sūrya",
  },
  {
    en: "moon",
    nepali: "चन्द्रमा",
    nepaliRoman: "Candrāmā",
  },
  {
    en: "star",
    nepali: "तारा",
    nepaliRoman: "Tārā",
  },
  {
    en: "water",
    nepali: "पानी",
    nepaliRoman: "Pānī",
  },
  {
    en: "rain",
    nepali: "वर्षा",
    nepaliRoman: "Vaṛṣā",
  },
  {
    en: "river",
    nepali: "खोला",
    nepaliRoman: "Kholā",
  },
  {
    en: "lake",
    nepali: "ताल",
    nepaliRoman: "Tāla",
  },
  {
    en: "sea",
    nepali: "समुद्र",
    nepaliRoman: "Samudra",
  },
  {
    en: "salt",
    nepali: "नुन",
    nepaliRoman: "Nun",
  },
  {
    en: "stone",
    nepali: "ढुंगा",
    nepaliRoman: "Dhūm̐gā",
  },
  {
    en: "sand",
    nepali: "माटो",
    nepaliRoman: "Māṭō",
  },
  {
    en: "dust",
    nepali: "धूलो",
    nepaliRoman: "Dhūlō",
  },
  {
    en: "earth",
    nepali: "पृथ्वी",
    nepaliRoman: "Pṛthvī",
  },
  {
    en: "cloud",
    nepali: "बादल",
    nepaliRoman: "Bādal",
  },
  {
    en: "fog",
    nepali: "धुँध",
    nepaliRoman: "Dhũdha",
  },
  {
    en: "sky",
    nepali: "आकाश",
    nepaliRoman: "Ākāśa",
  },
  {
    en: "wind",
    nepali: "हावा",
    nepaliRoman: "Hāvā",
  },
  {
    en: "snow",
    nepali: "हिउँ",
    nepaliRoman: "Hīũ",
  },
  {
    en: "ice",
    nepali: "बर्फ",
    nepaliRoman: "Baraphā",
  },
  {
    en: "smoke",
    nepali: "धुवाँ",
    nepaliRoman: "Dhuvām̐̄",
  },
  {
    en: "fire",
    nepali: "आगो",
    nepaliRoman: "Āgō",
  },
  {
    en: "ash",
    nepali: "राख",
    nepaliRoman: "Rākha",
  },
  {
    en: "to burn",
    nepali: "जलाउनु",
    nepaliRoman: "Jalāunū",
  },
  {
    en: "road",
    nepali: "सडक",
    nepaliRoman: "Ṣadak",
  },
  {
    en: "mountain",
    nepali: "पहाड",
    nepaliRoman: "Pahād",
  },
  {
    en: "red",
    nepali: "रातो",
    nepaliRoman: "Rātō",
  },
  {
    en: "green",
    nepali: "हरियो",
    nepaliRoman: "Hariyō",
  },
  {
    en: "yellow",
    nepali: "पहेलो",
    nepaliRoman: "Pahelō",
  },
  {
    en: "white",
    nepali: "सेतो",
    nepaliRoman: "Setō",
  },
  {
    en: "black",
    nepali: "कालो",
    nepaliRoman: "Kālō",
  },
  {
    en: "night",
    nepali: "रात",
    nepaliRoman: "Rāta",
  },
  {
    en: "day",
    nepali: "दिन",
    nepaliRoman: "Dina",
  },
  {
    en: "year",
    nepali: "वर्ष",
    nepaliRoman: "Vaṛṣā",
  },
  {
    en: "warm",
    nepali: "उष्ण",
    nepaliRoman: "Uṣṇa",
  },
  {
    en: "cold",
    nepali: "ठाडो",
    nepaliRoman: "Ṭhāḍō",
  },
  {
    en: "full",
    nepali: "भरिया",
    nepaliRoman: "Bhariyā",
  },
  {
    en: "new",
    nepali: "नयाँ",
    nepaliRoman: "Nayām̐",
  },
  {
    en: "old",
    nepali: "पुरानो",
    nepaliRoman: "Purānō",
  },
  {
    en: "good",
    nepali: "राम्रो",
    nepaliRoman: "Rāmrō",
  },
  {
    en: "bad",
    nepali: "खराब",
    nepaliRoman: "Kharāba",
  },
  {
    en: "rotten",
    nepali: "बस्नु",
    nepaliRoman: "Basnū",
  },
  {
    en: "dirty",
    nepali: "गन्धर्नु",
    nepaliRoman: "Gandhaṛnū",
  },
  {
    en: "straight",
    nepali: "सिधा",
    nepaliRoman: "Sidhā",
  },
  {
    en: "round",
    nepali: "गोल",
    nepaliRoman: "Golā",
  },
  {
    en: "sharp (as a knife)",
    nepali: "तेज",
    nepaliRoman: "Teja",
  },
  {
    en: "dull (as a knife)",
    nepali: "कुन्दै",
    nepaliRoman: "Kundāī",
  },
  {
    en: "smooth",
    nepali: "मुल्यामूल्य",
    nepaliRoman: "Mulyāmūlya",
  },
  {
    en: "wet",
    nepali: "भीसी",
    nepaliRoman: "Bhīsī",
  },
  {
    en: "dry",
    nepali: "सुक्खा",
    nepaliRoman: "Sukkhā",
  },
  {
    en: "correct",
    nepali: "सही",
    nepaliRoman: "Sahī",
  },
  {
    en: "near",
    nepali: "पास",
    nepaliRoman: "Pāsa",
  },
  {
    en: "far",
    nepali: "दूर",
    nepaliRoman: "Dūra",
  },
  {
    en: "right",
    nepali: "दायाँ",
    nepaliRoman: "Dāyām̐",
  },
  {
    en: "left",
    nepali: "बायाँ",
    nepaliRoman: "Bāyām̐",
  },
  {
    en: "at",
    nepali: "मा",
    nepaliRoman: "Mā",
  },
  {
    en: "in",
    nepali: "मा",
    nepaliRoman: "Mā",
  },
  {
    en: "with",
    nepali: "सँग",
    nepaliRoman: "Šaṅga",
  },
  {
    en: "and",
    nepali: "र",
    nepaliRoman: "Ra",
  },
  {
    en: "if",
    nepali: "यदि",
    nepaliRoman: "Yadi",
  },
  {
    en: "because",
    nepali: "किनभने",
    nepaliRoman: "Kinabhaṇe",
  },
  {
    en: "ash",
    nepali: "खरानी",
    nepaliRoman: "Kharānī",
  },

  //   jha
  {
    nepali: "झन्",
    en: "jhan",
    nepaliRoman: "bee",
  },
  {
    nepali: "झर्नु",
    en: "jhar̥nu",
    nepaliRoman: "to fall",
  },
  {
    nepali: "झुलेन",
    en: "jhulēna",
    nepaliRoman: "swing",
  },
  {
    nepali: "झापा",
    en: "jhāpā",
    nepaliRoman: "slap",
  },
  {
    nepali: "झिल्किनु",
    en: "jhilkinu",
    nepaliRoman: "to blink",
  },
  {
    nepali: "झुक्नु",
    en: "jhuknu",
    nepaliRoman: "to bow",
  },
  {
    nepali: "झरेक",
    en: "jharēka",
    nepaliRoman: "waterfall",
  },
  {
    nepali: "झोले",
    en: "jhōlē",
    nepaliRoman: "bag",
  },
  {
    nepali: "झर्केल",
    en: "jharkēla",
    nepaliRoman: "cliff",
  },
  {
    nepali: "झुन्झलाउनु",
    en: "jhunjalāunu",
    nepaliRoman: "to swing",
  },

  //   ञ
  {
    nepali: "ञान",
    en: "Knowledge",
    nepaliRoman: "Nyaan",
  },
  {
    nepali: "ञुन",
    en: "Noise",
    nepaliRoman: "Nyan",
  },
  {
    nepali: "ञेक",
    en: "Scissors",
    nepaliRoman: "Nyek",
  },
  {
    nepali: "ञोग",
    en: "Interest",
    nepaliRoman: "Nyog",
  },
  {
    nepali: "ञोल",
    en: "Pail",
    nepaliRoman: "Nyaol",
  },
  {
    nepali: "ञौँछ",
    en: "Seek",
    nepaliRoman: "Nyaũchha",
  },
  {
    nepali: "ञ्‍ज",
    en: "Skirt",
    nepaliRoman: "Nyanja",
  },
  {
    nepali: "ञ्रेव",
    en: "Shed",
    nepaliRoman: "Nyarev",
  },
  {
    nepali: "ञ्छ",
    en: "Stop",
    nepaliRoman: "Nyã",
  },
  {
    nepali: "ञ्जाल",
    en: "Net",
    nepaliRoman: "Nyanjal",
  },
  {
    nepali: "ञ्जालो",
    en: "Nets",
    nepaliRoman: "Nyanjalo",
  },
  {
    nepali: "ञ्जिउ",
    en: "Miser",
    nepaliRoman: "Nyanjiu",
  },
  {
    nepali: "ञ्जु",
    en: "Thirst",
    nepaliRoman: "Nyaju",
  },
  {
    nepali: "ञ्च",
    en: "Pedal",
    nepaliRoman: "Nyãca",
  },
  {
    nepali: "ञ्चल",
    en: "Strut",
    nepaliRoman: "Nyãcal",
  },
  {
    nepali: "ञ्जोर",
    en: "Giggle",
    nepaliRoman: "Nyanjor",
  },
  {
    nepali: "ञ्चु",
    en: "Pinch",
    nepaliRoman: "Nyãchu",
  },
  {
    nepali: "ञ्छै",
    en: "Touch",
    nepaliRoman: "Nyãchai",
  },
  {
    nepali: "ञ्जा",
    en: "Sneer",
    nepaliRoman: "Nyãja",
  },
  {
    nepali: "ञ्जै",
    en: "Snarl",
    nepaliRoman: "Nyãjai",
  },
  {
    nepali: "ञ्जी",
    en: "Stare",
    nepaliRoman: "Nyãji",
  },
  {
    nepali: "ञ्ञ",
    en: "Snore",
    nepaliRoman: "Nyãña",
  },
  {
    nepali: "ञ्जि",
    en: "Sniff",
    nepaliRoman: "Nyãji",
  },
  {
    nepali: "ञ्जीव",
    en: "Stroke",
    nepaliRoman: "Nyãjiv",
  },
  {
    nepali: "ञ्ञौ",
    en: "Snuff",
    nepaliRoman: "Nyãñau",
  },
  {
    nepali: "ञ्ञे",
    en: "Snack",
    nepaliRoman: "Nyãñe",
  },
  {
    nepali: "ञ्यान",
    en: "Snare",
    nepaliRoman: "Nyãñã",
  },
  {
    nepali: "ञ्यानो",
    en: "Snap",
    nepaliRoman: "Nyãñao",
  },
  {
    nepali: "ञ्याल",
    en: "Stoop",
    nepaliRoman: "Nyãñal",
  },
  {
    nepali: "ञ्यालो",
    en: "Stool",
    nepaliRoman: "Nyãñalo",
  },
];
export const nepaliWords203 = [
  {
    en: "Yes, I am Vishal. Hello!",
    nepaliRoman: "hō, ma Viśāla hum̐. Namastē.",
    nepali: "हो, म विशाल हुँ। नमस्ते।",
  },
  {
    en: "i",
    nepaliRoman: "ma",
    nepali: "म",
  },
  {
    en: "do",
    nepaliRoman: "garnu",
    nepali: "गर्नु",
  },
  {
    en: "go",
    nepaliRoman: "januhos",
    nepali: "जानुहोस्",
  },
  {
    en: "he",
    nepaliRoman: "uham",
    nepali: "उहाँ",
  },
  {
    en: "me",
    nepaliRoman: "mala’i",
    nepali: "मलाई",
  },
  {
    en: "my",
    nepaliRoman: "mero",
    nepali: "मेरो",
  },
  {
    en: "no",
    nepaliRoman: "chaina",
    nepali: "छैन",
  },
  {
    en: "on",
    nepaliRoman: "ma",
    nepali: "मा",
  },
  {
    en: "or",
    nepaliRoman: "va",
    nepali: "वा",
  },
  {
    en: "so",
    nepaliRoman: "tyasaile",
    nepali: "त्यसैले",
  },
  {
    en: "up",
    nepaliRoman: "mathi",
    nepali: "माथि",
  },
  {
    en: "we",
    nepaliRoman: "hami",
    nepali: "हामी",
  },
  {
    en: "act",
    nepaliRoman: "karya",
    nepali: "कार्य",
  },
  {
    en: "add",
    nepaliRoman: "thapnuhos",
    nepali: "थप्नुहोस्",
  },
  {
    en: "age",
    nepaliRoman: "umera",
    nepali: "उमेर",
  },
  {
    en: "aim",
    nepaliRoman: "laksya",
    nepali: "लक्ष्य",
  },
  {
    en: "air",
    nepaliRoman: "hava",
    nepali: "हावा",
  },
  {
    en: "all",
    nepaliRoman: "sabai",
    nepali: "सबै",
  },
  {
    en: "and",
    nepaliRoman: "ra",
    nepali: "र",
  },
  {
    en: "and",
    nepaliRoman: "ani",
    nepali: "अनि",
  },
  {
    en: "ant",
    nepaliRoman: "kamila",
    nepali: "कमिला",
  },
  {
    en: "any",
    nepaliRoman: "kunai pani",
    nepali: "कुनै पनि",
  },
  {
    en: "ask",
    nepaliRoman: "sodhnu",
    nepali: "सोध्नु",
  },
  {
    en: "bad",
    nepaliRoman: "naramro",
    nepali: "नराम्रो",
  },
  {
    en: "big",
    nepaliRoman: "thulo",
    nepali: "ठूलो",
  },
  {
    en: "buy",
    nepaliRoman: "kinnuhos",
    nepali: "किन्नुहोस्",
  },
  {
    en: "cry",
    nepaliRoman: "runu",
    nepali: "रुनु",
  },
  {
    en: "dam",
    nepaliRoman: "bamdha",
    nepali: "बाँध",
  },
  {
    en: "die",
    nepaliRoman: "marnu",
    nepali: "मर्नु",
  },
  {
    en: "dry",
    nepaliRoman: "sukkha",
    nepali: "सुक्खा",
  },
  {
    en: "end",
    nepaliRoman: "antya",
    nepali: "अन्त्य",
  },
  {
    en: "ear",
    nepaliRoman: "kana",
    nepali: "कान",
  },
  {
    en: "eat",
    nepaliRoman: "khanu",
    nepali: "खानु",
  },
  {
    en: "egg",
    nepaliRoman: "anda",
    nepali: "अण्डा",
  },
  {
    en: "eye",
    nepaliRoman: "amkha",
    nepali: "आँखा",
  },
  {
    en: "fat",
    nepaliRoman: "moto",
    nepali: "मोटो",
  },
  {
    en: "fly",
    nepaliRoman: "udnu",
    nepali: "उड्नु",
  },
  {
    en: "fun",
    nepaliRoman: "rama’ilo",
    nepali: "रमाइलो",
  },
  {
    en: "get",
    nepaliRoman: "prapta garnuhos",
    nepali: "प्राप्त गर्नुहोस्",
  },
  {
    en: "god",
    nepaliRoman: "bhagavana",
    nepali: "भगवान",
  },
  {
    en: "hen",
    nepaliRoman: "kukhura",
    nepali: "कुखुरा",
  },
  {
    en: "hot",
    nepaliRoman: "tato",
    nepali: "तातो",
  },
  {
    en: "job",
    nepaliRoman: "kama",
    nepali: "काम",
  },
  {
    en: "leg",
    nepaliRoman: "khutta",
    nepali: "खुट्टा",
  },
  {
    en: "lie",
    nepaliRoman: "jhuta",
    nepali: "झूट",
  },
  {
    en: "low",
    nepaliRoman: "kama",
    nepali: "कम",
  },
  {
    en: "mad",
    nepaliRoman: "pagala",
    nepali: "पागल",
  },
  {
    en: "man",
    nepaliRoman: "manche",
    nepali: "मान्छे",
  },
  {
    en: "not",
    nepaliRoman: "ho’ina",
    nepali: "होइन",
  },
  {
    en: "now",
    nepaliRoman: "ahile",
    nepali: "अहिले",
  },
  {
    en: "new",
    nepaliRoman: "nayam",
    nepali: "नयाँ",
  },
  {
    en: "old",
    nepaliRoman: "purano",
    nepali: "पुरानो",
  },
  {
    en: "own",
    nepaliRoman: "aphnai",
    nepali: "आफ्नै",
  },
  {
    en: "run",
    nepaliRoman: "daudanu",
    nepali: "दौडनु",
  },
  {
    en: "sad",
    nepaliRoman: "dukhi",
    nepali: "दुखी",
  },
  {
    en: "sea",
    nepaliRoman: "samudra",
    nepali: "समुद्र",
  },
  {
    en: "see",
    nepaliRoman: "hernuhos",
    nepali: "हेर्नुहोस्",
  },
  {
    en: "shy",
    nepaliRoman: "lajalu",
    nepali: "लजालु",
  },
  {
    en: "sit",
    nepaliRoman: "basnu",
    nepali: "बस्नु",
  },
  {
    en: "sum",
    nepaliRoman: "yogaphala",
    nepali: "योगफल",
  },
  {
    en: "sun",
    nepaliRoman: "surya",
    nepali: "सूर्य",
  },
  {
    en: "tax",
    nepaliRoman: "kara",
    nepali: "कर",
  },
  {
    en: "try",
    nepaliRoman: "prayasa garnuhos",
    nepali: "प्रयास गर्नुहोस्",
  },
  {
    en: "use",
    nepaliRoman: "prayoga garnuhos",
    nepali: "प्रयोग गर्नुहोस्",
  },
  {
    en: "war",
    nepaliRoman: "yud’dha",
    nepali: "युद्ध",
  },
  {
    en: "wet",
    nepaliRoman: "bhijeko",
    nepali: "भिजेको",
  },
  {
    en: "why",
    nepaliRoman: "kina",
    nepali: "किन",
  },
  {
    en: "win",
    nepaliRoman: "jita",
    nepali: "जीत",
  },
  {
    en: "yes",
    nepaliRoman: "ho",
    nepali: "हो",
  },
  {
    en: "you",
    nepaliRoman: "timi",
    nepali: "तिमी",
  },
  {
    en: "also",
    nepaliRoman: "pani",
    nepali: "पनि",
  },
  {
    en: "baby",
    nepaliRoman: "bacca",
    nepali: "बच्चा",
  },
  {
    en: "back",
    nepaliRoman: "phirta",
    nepali: "फिर्ता",
  },
  {
    en: "bake",
    nepaliRoman: "beka",
    nepali: "बेक",
  },
  {
    en: "bald",
    nepaliRoman: "ta’uko",
    nepali: "टाउको",
  },
  {
    en: "ball",
    nepaliRoman: "bala",
    nepali: "बल",
  },
  {
    en: "bark",
    nepaliRoman: "barka",
    nepali: "बार्क",
  },
  {
    en: "bath",
    nepaliRoman: "snana",
    nepali: "स्नान",
  },
  {
    en: "beet",
    nepaliRoman: "cukandara",
    nepali: "चुकन्दर",
  },
  {
    en: "bend",
    nepaliRoman: "bango",
    nepali: "बाङ्गो",
  },
  {
    en: "best",
    nepaliRoman: "sabai bhanda ramro",
    nepali: "सबै भन्दा राम्रो",
  },
  {
    en: "bird",
    nepaliRoman: "cara",
    nepali: "चरा",
  },
  {
    en: "bold",
    nepaliRoman: "bolda",
    nepali: "बोल्ड",
  },
  {
    en: "bone",
    nepaliRoman: "haddi",
    nepali: "हड्डी",
  },
  {
    en: "book",
    nepaliRoman: "pustaka",
    nepali: "पुस्तक",
  },
  {
    en: "born",
    nepaliRoman: "janmeko",
    nepali: "जन्मेको",
  },
  {
    en: "both",
    nepaliRoman: "dubai",
    nepali: "दुबै",
  },
  {
    en: "busy",
    nepaliRoman: "vyasta",
    nepali: "व्यस्त",
  },
  {
    en: "call",
    nepaliRoman: "kala",
    nepali: "कल",
  },
  {
    en: "calm",
    nepaliRoman: "santa",
    nepali: "शान्त",
  },
  {
    en: "care",
    nepaliRoman: "heracaha",
    nepali: "हेरचाह",
  },
  {
    en: "come",
    nepaliRoman: "a’unuhos",
    nepali: "आउनुहोस्",
  },
  {
    en: "cost",
    nepaliRoman: "lagata",
    nepali: "लागत",
  },
  {
    en: "cute",
    nepaliRoman: "pyaro",
    nepali: "प्यारो",
  },
  {
    en: "crow",
    nepaliRoman: "kaga",
    nepali: "काग",
  },
  {
    en: "dare",
    nepaliRoman: "him’mata",
    nepali: "हिम्मत",
  },
  {
    en: "dark",
    nepaliRoman: "amdhyaro",
    nepali: "अँध्यारो",
  },
  {
    en: "date",
    nepaliRoman: "miti",
    nepali: "मिति",
  },
  {
    en: "deal",
    nepaliRoman: "samjhauta",
    nepali: "सम्झौता",
  },
  {
    en: "diet",
    nepaliRoman: "ahara",
    nepali: "आहार",
  },
  {
    en: "dish",
    nepaliRoman: "bhamda",
    nepali: "भाँडा",
  },
  {
    en: "door",
    nepaliRoman: "dhoka",
    nepali: "ढोका",
  },
  {
    en: "down",
    nepaliRoman: "tala",
    nepali: "तल",
  },
  {
    en: "dust",
    nepaliRoman: "dhulo",
    nepali: "धुलो",
  },
  {
    en: "each",
    nepaliRoman: "pratyeka",
    nepali: "प्रत्येक",
  },
  {
    en: "earn",
    nepaliRoman: "kama’une",
    nepali: "कमाउने",
  },
  {
    en: "easy",
    nepaliRoman: "sajilo",
    nepali: "सजिलो",
  },
  {
    en: "edge",
    nepaliRoman: "kinara",
    nepali: "किनारा",
  },
  {
    en: "evil",
    nepaliRoman: "dusta",
    nepali: "दुष्ट",
  },
  {
    en: "exit",
    nepaliRoman: "bahira niskanuhos",
    nepali: "बाहिर निस्कनुहोस्",
  },
  {
    en: "face",
    nepaliRoman: "anuhara",
    nepali: "अनुहार",
  },
  {
    en: "fact",
    nepaliRoman: "vastavama",
    nepali: "वास्तवमा",
  },
  {
    en: "fair",
    nepaliRoman: "nispaksa",
    nepali: "निष्पक्ष",
  },
  {
    en: "fake",
    nepaliRoman: "nakkali",
    nepali: "नक्कली",
  },
  {
    en: "farm",
    nepaliRoman: "kheta",
    nepali: "खेत",
  },
  {
    en: "fast",
    nepaliRoman: "chito",
    nepali: "छिटो",
  },
  {
    en: "fear",
    nepaliRoman: "dara",
    nepali: "डर",
  },
  {
    en: "feel",
    nepaliRoman: "mahasusa",
    nepali: "महसुस",
  },
  {
    en: "find",
    nepaliRoman: "phela parnuhos",
    nepali: "फेला पार्नुहोस्",
  },
  {
    en: "fine",
    nepaliRoman: "ramro",
    nepali: "राम्रो",
  },
  {
    en: "fish",
    nepaliRoman: "macha",
    nepali: "माछा",
  },
  {
    en: "food",
    nepaliRoman: "khana",
    nepali: "खाना",
  },
  {
    en: "fool",
    nepaliRoman: "murkha",
    nepali: "मूर्ख",
  },
  {
    en: "free",
    nepaliRoman: "ni:sulka",
    nepali: "नि:शुल्क",
  },
  {
    en: "frog",
    nepaliRoman: "bhyaguto",
    nepali: "भ्यागुतो",
  },
  {
    en: "full",
    nepaliRoman: "purna",
    nepali: "पूर्ण",
  },
  {
    en: "gape",
    nepaliRoman: "gaipa",
    nepali: "गैप",
  },
  {
    en: "gift",
    nepaliRoman: "upahara",
    nepali: "उपहार",
  },
  {
    en: "girl",
    nepaliRoman: "keti",
    nepali: "केटी",
  },
  {
    en: "goat",
    nepaliRoman: "bakhra",
    nepali: "बाख्रा",
  },
  {
    en: "good",
    nepaliRoman: "ramro",
    nepali: "राम्रो",
  },
  {
    en: "grab",
    nepaliRoman: "samatnu",
    nepali: "समात्नु",
  },
  {
    en: "grow",
    nepaliRoman: "badhnu",
    nepali: "बढ्नु",
  },
  {
    en: "half",
    nepaliRoman: "adha",
    nepali: "आधा",
  },
  {
    en: "hate",
    nepaliRoman: "ghrna",
    nepali: "घृणा",
  },
  {
    en: "head",
    nepaliRoman: "ta’uko",
    nepali: "टाउको",
  },
  {
    en: "hear",
    nepaliRoman: "sunnuhos",
    nepali: "सुन्नुहोस्",
  },
  {
    en: "heat / summer",
    nepaliRoman: "garmi",
    nepali: "गर्मी",
  },
  {
    en: "help",
    nepaliRoman: "maddata",
    nepali: "मद्दत",
  },
  {
    en: "here",
    nepaliRoman: "yaham",
    nepali: "यहाँ",
  },
  {
    en: "hide",
    nepaliRoman: "luka’unuhos",
    nepali: "लुकाउनुहोस्",
  },
  {
    en: "high",
    nepaliRoman: "ucca",
    nepali: "उच्च",
  },
  {
    en: "hold",
    nepaliRoman: "holda garnuhos",
    nepali: "होल्ड गर्नुहोस्",
  },
  {
    en: "hole",
    nepaliRoman: "pvala",
    nepali: "प्वाल",
  },
  {
    en: "home / house",
    nepaliRoman: "ghara",
    nepali: "घर",
  },
  {
    en: "huge",
    nepaliRoman: "visala",
    nepali: "विशाल",
  },
  {
    en: "hurt",
    nepaliRoman: "cota",
    nepali: "चोट",
  },
  {
    en: "idea",
    nepaliRoman: "vicara",
    nepali: "विचार",
  },
  {
    en: "jump",
    nepaliRoman: "jampa",
    nepali: "जम्प",
  },
  {
    en: "just",
    nepaliRoman: "matra",
    nepali: "मात्र",
  },
  {
    en: "kill",
    nepaliRoman: "marnu",
    nepali: "मार्नु",
  },
  {
    en: "land",
    nepaliRoman: "bhumi",
    nepali: "भूमि",
  },
  {
    en: "last",
    nepaliRoman: "antima",
    nepali: "अन्तिम",
  },
  {
    en: "late",
    nepaliRoman: "dhilo",
    nepali: "ढिलो",
  },
  {
    en: "left",
    nepaliRoman: "bayam",
    nepali: "बायाँ",
  },
  {
    en: "life",
    nepaliRoman: "jivana",
    nepali: "जीवन",
  },
  {
    en: "line",
    nepaliRoman: "rekha",
    nepali: "रेखा",
  },
  {
    en: "lion",
    nepaliRoman: "sinha",
    nepali: "सिंह",
  },
  {
    en: "long",
    nepaliRoman: "lamo",
    nepali: "लामो",
  },
  {
    en: "look",
    nepaliRoman: "hera",
    nepali: "हेर",
  },
  {
    en: "lost",
    nepaliRoman: "harayo",
    nepali: "हरायो",
  },
  {
    en: "love",
    nepaliRoman: "maya",
    nepali: "माया",
  },
  {
    en: "luck",
    nepaliRoman: "bhagya",
    nepali: "भाग्य",
  },
  {
    en: "lung",
    nepaliRoman: "phokso",
    nepali: "फोक्सो",
  },
  {
    en: "many",
    nepaliRoman: "dherai",
    nepali: "धेरै",
  },
  {
    en: "meet",
    nepaliRoman: "bhetna",
    nepali: "भेट्न",
  },
  {
    en: "melt",
    nepaliRoman: "pighalnu",
    nepali: "पिघल्नु",
  },
  {
    en: "milk",
    nepaliRoman: "dudha",
    nepali: "दूध",
  },
  {
    en: "must",
    nepaliRoman: "garnuparcha",
    nepali: "गर्नुपर्छ",
  },
  {
    en: "name",
    nepaliRoman: "nama",
    nepali: "नाम",
  },
  {
    en: "near",
    nepaliRoman: "najika",
    nepali: "नजिक",
  },
  {
    en: "neat",
    nepaliRoman: "sapha",
    nepali: "सफा",
  },
  {
    en: "neck",
    nepaliRoman: "ghamti",
    nepali: "घाँटी",
  },
  {
    en: "need",
    nepaliRoman: "avasyakata",
    nepali: "आवश्यकता",
  },
  {
    en: "next",
    nepaliRoman: "arko",
    nepali: "अर्को",
  },
  {
    en: "only",
    nepaliRoman: "matra",
    nepali: "मात्र",
  },
  {
    en: "pain",
    nepaliRoman: "dukha’i",
    nepali: "दुखाइ",
  },
  {
    en: "pair",
    nepaliRoman: "jodi",
    nepali: "जोडी",
  },
  {
    en: "park",
    nepaliRoman: "parka",
    nepali: "पार्क",
  },
  {
    en: "path",
    nepaliRoman: "bato",
    nepali: "बाटो",
  },
  {
    en: "play",
    nepaliRoman: "khelnu",
    nepali: "खेल्नु",
  },
  {
    en: "poor",
    nepaliRoman: "gariba",
    nepali: "गरिब",
  },
  {
    en: "pull",
    nepaliRoman: "tannu",
    nepali: "तान्नु",
  },
  {
    en: "pure",
    nepaliRoman: "sud’dha",
    nepali: "शुद्ध",
  },
  {
    en: "quit",
    nepaliRoman: "chodnuhos",
    nepali: "छोड्नुहोस्",
  },
  {
    en: "quiz",
    nepaliRoman: "prasnottari",
    nepali: "प्रश्नोत्तरी",
  },
  {
    en: "race",
    nepaliRoman: "dauda",
    nepali: "दौड",
  },
  {
    en: "rain",
    nepaliRoman: "varsa",
    nepali: "वर्षा",
  },
  {
    en: "rare",
    nepaliRoman: "durlabha",
    nepali: "दुर्लभ",
  },
  {
    en: "real",
    nepaliRoman: "vastavika",
    nepali: "वास्तविक",
  },
  {
    en: "rent",
    nepaliRoman: "bhada",
    nepali: "भाडा",
  },
  {
    en: "rest",
    nepaliRoman: "visrama",
    nepali: "विश्राम",
  },
  {
    en: "rich",
    nepaliRoman: "dhani",
    nepali: "धनी",
  },
  {
    en: "ride",
    nepaliRoman: "savari",
    nepali: "सवारी",
  },
  {
    en: "rise",
    nepaliRoman: "uthnu",
    nepali: "उठ्नु",
  },
  {
    en: "risk",
    nepaliRoman: "jokhima",
    nepali: "जोखिम",
  },
  {
    en: "room",
    nepaliRoman: "kotha",
    nepali: "कोठा",
  },
  {
    en: "rope",
    nepaliRoman: "dori",
    nepali: "डोरी",
  },
  {
    en: "rude",
    nepaliRoman: "asista",
    nepali: "अशिष्ट",
  },
  {
    en: "sage",
    nepaliRoman: "rsi",
    nepali: "ऋषि",
  },
  {
    en: "sail",
    nepaliRoman: "pala",
    nepali: "पाल",
  },
  {
    en: "salt",
    nepaliRoman: "nuna",
    nepali: "नुन",
  },
  {
    en: "same",
    nepaliRoman: "samana",
    nepali: "समान",
  },
  {
    en: "sand",
    nepaliRoman: "baluva",
    nepali: "बालुवा",
  },
  {
    en: "save",
    nepaliRoman: "bacata garnuhos",
    nepali: "बचत गर्नुहोस्",
  },
  {
    en: "scam",
    nepaliRoman: "ghotala",
    nepali: "घोटाला",
  },
  {
    en: "seed",
    nepaliRoman: "bija",
    nepali: "बीज",
  },
  {
    en: "seek",
    nepaliRoman: "khojnuhos",
    nepali: "खोज्नुहोस्",
  },
  {
    en: "self",
    nepaliRoman: "sva",
    nepali: "स्व",
  },
  {
    en: "sell",
    nepaliRoman: "becnuhos",
    nepali: "बेच्नुहोस्",
  },
  {
    en: "send",
    nepaliRoman: "patha’unuhos",
    nepali: "पठाउनुहोस्",
  },
  {
    en: "shop",
    nepaliRoman: "pasala",
    nepali: "पसल",
  },
  {
    en: "show",
    nepaliRoman: "dekha’unu",
    nepali: "देखाउनु",
  },
  {
    en: "sick",
    nepaliRoman: "birami",
    nepali: "बिरामी",
  },
  {
    en: "side",
    nepaliRoman: "paksa",
    nepali: "पक्ष",
  },
  {
    en: "site",
    nepaliRoman: "sa’ita",
    nepali: "साइट",
  },
  {
    en: "size",
    nepaliRoman: "akara",
    nepali: "आकार",
  },
  {
    en: "skin",
    nepaliRoman: "chala",
    nepali: "छाला",
  },
  {
    en: "slow",
    nepaliRoman: "dhilo",
    nepali: "ढिलो",
  },
  {
    en: "soft",
    nepaliRoman: "narama",
    nepali: "नरम",
  },
  {
    en: "soil",
    nepaliRoman: "mato",
    nepali: "माटो",
  },
  {
    en: "some",
    nepaliRoman: "kehi",
    nepali: "केही",
  },
  {
    en: "soon",
    nepaliRoman: "camdai",
    nepali: "चाँडै",
  },
  {
    en: "stay",
    nepaliRoman: "rahanu",
    nepali: "रहनु",
  },
  {
    en: "stop",
    nepaliRoman: "roka",
    nepali: "रोक",
  },
  {
    en: "such",
    nepaliRoman: "yasto",
    nepali: "यस्तो",
  },
  {
    en: "swap",
    nepaliRoman: "svaipa",
    nepali: "स्वैप",
  },
  {
    en: "swim",
    nepaliRoman: "paudi",
    nepali: "पौडी",
  },
  {
    en: "take",
    nepaliRoman: "linuhos",
    nepali: "लिनुहोस्",
  },
  {
    en: "talk",
    nepaliRoman: "kura",
    nepali: "कुरा",
  },
  {
    en: "tall",
    nepaliRoman: "aglo",
    nepali: "अग्लो",
  },
  {
    en: "team",
    nepaliRoman: "toli",
    nepali: "टोली",
  },
  {
    en: "tell",
    nepaliRoman: "bata’unuhos",
    nepali: "बताउनुहोस्",
  },
  {
    en: "tent",
    nepaliRoman: "pala",
    nepali: "पाल",
  },
  {
    en: "that",
    nepaliRoman: "tyo",
    nepali: "त्यो",
  },
  {
    en: "then",
    nepaliRoman: "tyasapachi",
    nepali: "त्यसपछि",
  },
  {
    en: "thin",
    nepaliRoman: "patalo",
    nepali: "पातलो",
  },
  {
    en: "this",
    nepaliRoman: "yo",
    nepali: "यो",
  },
  {
    en: "tide",
    nepaliRoman: "jvara",
    nepali: "ज्वार",
  },
  {
    en: "time",
    nepaliRoman: "samaya",
    nepali: "समय",
  },
  {
    en: "tour",
    nepaliRoman: "bhramana",
    nepali: "भ्रमण",
  },
  {
    en: "town",
    nepaliRoman: "sahara",
    nepali: "सहर",
  },
  {
    en: "tree",
    nepaliRoman: "rukha",
    nepali: "रूख",
  },
  {
    en: "trip",
    nepaliRoman: "yatra",
    nepali: "यात्रा",
  },
  {
    en: "turn",
    nepaliRoman: "ghuma’unuhos",
    nepali: "घुमाउनुहोस्",
  },
  {
    en: "ugly",
    nepaliRoman: "kurupa",
    nepali: "कुरूप",
  },
  {
    en: "vase",
    nepaliRoman: "phuladana",
    nepali: "फूलदान",
  },
  {
    en: "vein",
    nepaliRoman: "sira",
    nepali: "शिरा",
  },
  {
    en: "very",
    nepaliRoman: "dherai",
    nepali: "धेरै",
  },
  {
    en: "view",
    nepaliRoman: "drsya",
    nepali: "दृश्य",
  },
  {
    en: "wage",
    nepaliRoman: "jyala",
    nepali: "ज्याला",
  },
  {
    en: "wait",
    nepaliRoman: "parkhanuhos",
    nepali: "पर्खनुहोस्",
  },
  {
    en: "wake",
    nepaliRoman: "jaga’unu",
    nepali: "जगाउनु",
  },
  {
    en: "walk",
    nepaliRoman: "hidnu",
    nepali: "हिड्नु",
  },
  {
    en: "wall",
    nepaliRoman: "parkhala",
    nepali: "पर्खाल",
  },
  {
    en: "want",
    nepaliRoman: "cahanuhuncha",
    nepali: "चाहनुहुन्छ",
  },
  {
    en: "warm",
    nepaliRoman: "n’yano",
    nepali: "न्यानो",
  },
  {
    en: "warn",
    nepaliRoman: "cetavani dinuhos",
    nepali: "चेतावनी दिनुहोस्",
  },
  {
    en: "weak",
    nepaliRoman: "kamajora",
    nepali: "कमजोर",
  },
  {
    en: "wear",
    nepaliRoman: "laga’unu",
    nepali: "लगाउनु",
  },
  {
    en: "week",
    nepaliRoman: "hapta",
    nepali: "हप्ता",
  },
  {
    en: "well",
    nepaliRoman: "ramro",
    nepali: "राम्रो",
  },
  {
    en: "went",
    nepaliRoman: "ga’e",
    nepali: "गए",
  },
  {
    en: "what",
    nepaliRoman: "ke",
    nepali: "के",
  },
  {
    en: "when",
    nepaliRoman: "kahile",
    nepali: "कहिले",
  },
  {
    en: "wide",
    nepaliRoman: "cauda",
    nepali: "चौडा",
  },
  {
    en: "wife",
    nepaliRoman: "patni",
    nepali: "पत्नी",
  },
  {
    en: "wild",
    nepaliRoman: "jangali",
    nepali: "जंगली",
  },
  {
    en: "will",
    nepaliRoman: "hunecha",
    nepali: "हुनेछ",
  },
  {
    en: "wind",
    nepaliRoman: "hava",
    nepali: "हावा",
  },
  {
    en: "wine",
    nepaliRoman: "raksi",
    nepali: "रक्सी",
  },
  {
    en: "wish",
    nepaliRoman: "iccha",
    nepali: "इच्छा",
  },
  {
    en: "wood",
    nepaliRoman: "katha",
    nepali: "काठ",
  },
  {
    en: "wool",
    nepaliRoman: "una",
    nepali: "ऊन",
  },
  {
    en: "word",
    nepaliRoman: "sabda",
    nepali: "शब्द",
  },
  {
    en: "work",
    nepaliRoman: "kama",
    nepali: "काम",
  },
  {
    en: "worm",
    nepaliRoman: "kira",
    nepali: "कीरा",
  },
  {
    en: "yarn",
    nepaliRoman: "dhago",
    nepali: "धागो",
  },
  {
    en: "your",
    nepaliRoman: "timro",
    nepali: "तिम्रो",
  },
  {
    en: "zoom",
    nepaliRoman: "juma",
    nepali: "जुम",
  },
  {
    en: "about",
    nepaliRoman: "barema",
    nepali: "बारेमा",
  },
  {
    en: "above",
    nepaliRoman: "mathi",
    nepali: "माथि",
  },
  {
    en: "adapt",
    nepaliRoman: "anukula",
    nepali: "अनुकूल",
  },
  {
    en: "admit",
    nepaliRoman: "svikara",
    nepali: "स्वीकार",
  },
  {
    en: "adult",
    nepaliRoman: "vayaska",
    nepali: "वयस्क",
  },
  {
    en: "after",
    nepaliRoman: "pachi",
    nepali: "पछि",
  },
  {
    en: "again",
    nepaliRoman: "pheri",
    nepali: "फेरि",
  },
  {
    en: "agree",
    nepaliRoman: "sahamata",
    nepali: "सहमत",
  },
  {
    en: "alert",
    nepaliRoman: "alarta",
    nepali: "अलर्ट",
  },
  {
    en: "allow",
    nepaliRoman: "anumati dinuhos",
    nepali: "अनुमति दिनुहोस्",
  },
  {
    en: "alone",
    nepaliRoman: "eklai",
    nepali: "एक्लै",
  },
  {
    en: "along",
    nepaliRoman: "satha",
    nepali: "साथ",
  },
  {
    en: "anger",
    nepaliRoman: "krodha",
    nepali: "क्रोध",
  },
  {
    en: "angle",
    nepaliRoman: "kona",
    nepali: "कोण",
  },
  {
    en: "angry",
    nepaliRoman: "krodhita",
    nepali: "क्रोधित",
  },
  {
    en: "asset",
    nepaliRoman: "sampatti",
    nepali: "सम्पत्ति",
  },
  {
    en: "avoid",
    nepaliRoman: "jogina",
    nepali: "जोगिन",
  },
  {
    en: "awake",
    nepaliRoman: "jaga",
    nepali: "जागा",
  },
  {
    en: "aware",
    nepaliRoman: "saceta",
    nepali: "सचेत",
  },
  {
    en: "begin",
    nepaliRoman: "suru garnuhos",
    nepali: "सुरु गर्नुहोस्",
  },
  {
    en: "birth",
    nepaliRoman: "janma",
    nepali: "जन्म",
  },
  {
    en: "blood",
    nepaliRoman: "ragata",
    nepali: "रगत",
  },
  {
    en: "brain",
    nepaliRoman: "mastiska",
    nepali: "मस्तिष्क",
  },
  {
    en: "built",
    nepaliRoman: "nirmita",
    nepali: "निर्मित",
  },
  {
    en: "bring",
    nepaliRoman: "lya’unuhos",
    nepali: "ल्याउनुहोस्",
  },
  {
    en: "build",
    nepaliRoman: "nirmana",
    nepali: "निर्माण",
  },
  {
    en: "camel",
    nepaliRoman: "umta",
    nepali: "ऊँट",
  },
  {
    en: "canal",
    nepaliRoman: "nahara",
    nepali: "नहर",
  },
  {
    en: "carry",
    nepaliRoman: "bokne",
    nepali: "बोक्ने",
  },
  {
    en: "cheap",
    nepaliRoman: "sasto",
    nepali: "सस्तो",
  },
  {
    en: "cheat",
    nepaliRoman: "dhokha",
    nepali: "धोखा",
  },
  {
    en: "check",
    nepaliRoman: "jamca garnuhos",
    nepali: "जाँच गर्नुहोस्",
  },
  {
    en: "chest",
    nepaliRoman: "chati",
    nepali: "छाती",
  },
  {
    en: "claim",
    nepaliRoman: "davi",
    nepali: "दावी",
  },
  {
    en: "clean",
    nepaliRoman: "sapha",
    nepali: "सफा",
  },
  {
    en: "clear",
    nepaliRoman: "spasta",
    nepali: "स्पष्ट",
  },
  {
    en: "climb",
    nepaliRoman: "cadhnu",
    nepali: "चढ्नु",
  },
  {
    en: "close",
    nepaliRoman: "banda",
    nepali: "बन्द",
  },
  {
    en: "cloth",
    nepaliRoman: "kapada",
    nepali: "कपडा",
  },
  {
    en: "cloud",
    nepaliRoman: "badala",
    nepali: "बादल",
  },
  {
    en: "color",
    nepaliRoman: "ranga",
    nepali: "रंग",
  },
  {
    en: "crime",
    nepaliRoman: "aparadha",
    nepali: "अपराध",
  },
  {
    en: "crowd",
    nepaliRoman: "bhida",
    nepali: "भीड",
  },
  {
    en: "crown",
    nepaliRoman: "mukuta",
    nepali: "मुकुट",
  },
  {
    en: "daily",
    nepaliRoman: "dainika",
    nepali: "दैनिक",
  },
  {
    en: "dance",
    nepaliRoman: "nrtya",
    nepali: "नृत्य",
  },
  {
    en: "death",
    nepaliRoman: "mrtyu",
    nepali: "मृत्यु",
  },
  {
    en: "decay",
    nepaliRoman: "ksaya",
    nepali: "क्षय",
  },
  {
    en: "delay",
    nepaliRoman: "dhila",
    nepali: "ढिला",
  },
  {
    en: "devil",
    nepaliRoman: "raksasa",
    nepali: "राक्षस",
  },
  {
    en: "dirty",
    nepaliRoman: "phohora",
    nepali: "फोहोर",
  },
  {
    en: "dress",
    nepaliRoman: "posaka",
    nepali: "पोशाक",
  },
  {
    en: "drink",
    nepaliRoman: "pi’unu",
    nepali: "पिउनु",
  },
  {
    en: "drive",
    nepaliRoman: "dra’ibha",
    nepali: "ड्राइभ",
  },
  {
    en: "dwell",
    nepaliRoman: "basne",
    nepali: "बस्ने",
  },
  {
    en: "eager",
    nepaliRoman: "utsuka",
    nepali: "उत्सुक",
  },
  {
    en: "eagle",
    nepaliRoman: "cila",
    nepali: "चील",
  },
  {
    en: "early",
    nepaliRoman: "prarambhika",
    nepali: "प्रारम्भिक",
  },
  {
    en: "earth ",
    nepaliRoman: "prthvi",
    nepali: "पृथ्वी",
  },
  {
    en: "elder",
    nepaliRoman: "jetho",
    nepali: "जेठो",
  },
  {
    en: "empty",
    nepaliRoman: "khali",
    nepali: "खाली",
  },
  {
    en: "enemy",
    nepaliRoman: "satru",
    nepali: "शत्रु",
  },
  {
    en: "enjoy",
    nepaliRoman: "maja linuhos",
    nepali: "मजा लिनुहोस्",
  },
  {
    en: "entry",
    nepaliRoman: "pravisti",
    nepali: "प्रविष्टि",
  },
  {
    en: "equal",
    nepaliRoman: "barabara",
    nepali: "बराबर",
  },
  {
    en: "essay",
    nepaliRoman: "nibandha",
    nepali: "निबन्ध",
  },
  {
    en: "event",
    nepaliRoman: "ghatana",
    nepali: "घटना",
  },
  {
    en: "every",
    nepaliRoman: "hareka",
    nepali: "हरेक",
  },
  {
    en: "exact",
    nepaliRoman: "satika",
    nepali: "सटीक",
  },
  {
    en: "exist",
    nepaliRoman: "avasthita cha",
    nepali: "अवस्थित छ",
  },
  {
    en: "extra",
    nepaliRoman: "atirikta",
    nepali: "अतिरिक्त",
  },
  {
    en: "faith",
    nepaliRoman: "visvasa",
    nepali: "विश्वास",
  },
  {
    en: "fault",
    nepaliRoman: "galti",
    nepali: "गल्ती",
  },
  {
    en: "fever",
    nepaliRoman: "jvaro",
    nepali: "ज्वरो",
  },
  {
    en: "field",
    nepaliRoman: "ksetra",
    nepali: "क्षेत्र",
  },
  {
    en: "final",
    nepaliRoman: "antima",
    nepali: "अन्तिम",
  },
  {
    en: "fleet",
    nepaliRoman: "phlita",
    nepali: "फ्लीट",
  },
  {
    en: "float",
    nepaliRoman: "phlota",
    nepali: "फ्लोट",
  },
  {
    en: "flood",
    nepaliRoman: "badhi",
    nepali: "बाढी",
  },
  {
    en: "floor",
    nepaliRoman: "bhu’im",
    nepali: "भुइँ",
  },
  {
    en: "flour",
    nepaliRoman: "pitho",
    nepali: "पीठो",
  },
  {
    en: "fluid",
    nepaliRoman: "tarala padartha",
    nepali: "तरल पदार्थ",
  },
  {
    en: "focus",
    nepaliRoman: "phokasa",
    nepali: "फोकस",
  },
  {
    en: "force",
    nepaliRoman: "bala",
    nepali: "बल",
  },
  {
    en: "fraud",
    nepaliRoman: "dhokhadhadi",
    nepali: "धोखाधडी",
  },
  {
    en: "fresh",
    nepaliRoman: "taja",
    nepali: "ताजा",
  },
  {
    en: "front",
    nepaliRoman: "agadi",
    nepali: "अगाडि",
  },
  {
    en: "fruit",
    nepaliRoman: "phala",
    nepali: "फल",
  },
  {
    en: "ghost",
    nepaliRoman: "bhuta",
    nepali: "भूत",
  },
  {
    en: "globe",
    nepaliRoman: "globa",
    nepali: "ग्लोब",
  },
  {
    en: "going",
    nepaliRoman: "jamdaicha",
    nepali: "जाँदैछ",
  },
  {
    en: "grain",
    nepaliRoman: "anna",
    nepali: "अन्न",
  },
  {
    en: "grant",
    nepaliRoman: "anudana",
    nepali: "अनुदान",
  },
  {
    en: "grass",
    nepaliRoman: "ghamsa",
    nepali: "घाँस",
  },
  {
    en: "great",
    nepaliRoman: "mahana",
    nepali: "महान",
  },
  {
    en: "group",
    nepaliRoman: "samuha",
    nepali: "समूह",
  },
  {
    en: "guard",
    nepaliRoman: "garda",
    nepali: "गार्ड",
  },
  {
    en: "guest",
    nepaliRoman: "atithi",
    nepali: "अतिथि",
  },
  {
    en: "habit",
    nepaliRoman: "bani",
    nepali: "बानी",
  },
  {
    en: "heart",
    nepaliRoman: "mutu",
    nepali: "मुटु",
  },
  {
    en: "honey",
    nepaliRoman: "maha",
    nepali: "मह",
  },
  {
    en: "horse",
    nepaliRoman: "ghoda",
    nepali: "घोडा",
  },

  {
    en: "human",
    nepaliRoman: "manava",
    nepali: "मानव",
  },
  {
    en: "ideal",
    nepaliRoman: "adarsa",
    nepali: "आदर्श",
  },
  {
    en: "issue",
    nepaliRoman: "mudda",
    nepali: "मुद्दा",
  },
  {
    en: "judge",
    nepaliRoman: "n’yayadhisa",
    nepali: "न्यायाधीश",
  },
  {
    en: "knife",
    nepaliRoman: "cakku",
    nepali: "चक्कु",
  },
  {
    en: "labor",
    nepaliRoman: "srama",
    nepali: "श्रम",
  },
  {
    en: "ladle",
    nepaliRoman: "karachula",
    nepali: "करछुल",
  },
  {
    en: "large",
    nepaliRoman: "thulo",
    nepali: "ठूलो",
  },
  {
    en: "laugh",
    nepaliRoman: "hamsna",
    nepali: "हाँस्न",
  },
  {
    en: "learn",
    nepaliRoman: "siknuhos",
    nepali: "सिक्नुहोस्",
  },
  {
    en: "leave",
    nepaliRoman: "choda",
    nepali: "छोड",
  },
  {
    en: "legal",
    nepaliRoman: "kanuni",
    nepali: "कानूनी",
  },
  {
    en: "limit",
    nepaliRoman: "sima",
    nepali: "सीमा",
  },
  {
    en: "lunch",
    nepaliRoman: "bhojana",
    nepali: "भोजन",
  },
  {
    en: "metal",
    nepaliRoman: "dhatu",
    nepali: "धातु",
  },
  {
    en: "mixed",
    nepaliRoman: "misrita",
    nepali: "मिश्रित",
  },
  {
    en: "money",
    nepaliRoman: "paisa",
    nepali: "पैसा",
  },
  {
    en: "month",
    nepaliRoman: "mahina",
    nepali: "महिना",
  },
  {
    en: "mount",
    nepaliRoman: "ma’unta",
    nepali: "माउन्ट",
  },
  {
    en: "mouth",
    nepaliRoman: "mukha",
    nepali: "मुख",
  },
  {
    en: "music",
    nepaliRoman: "sangita",
    nepali: "संगीत",
  },
  {
    en: "maize",
    nepaliRoman: "makai",
    nepali: "मकै",
  },
  {
    en: "naked",
    nepaliRoman: "nagna",
    nepali: "नग्न",
  },
  {
    en: "never",
    nepaliRoman: "kahilyai",
    nepali: "कहिल्यै",
  },
  {
    en: "night",
    nepaliRoman: "rata",
    nepali: "रात",
  },
  {
    en: "niece",
    nepaliRoman: "bhatiji",
    nepali: "भतिजी",
  },
  {
    en: "noise",
    nepaliRoman: "kolahala",
    nepali: "कोलाहल",
  },
  {
    en: "occur",
    nepaliRoman: "utpanna huncha",
    nepali: "उत्पन्न हुन्छ",
  },
  {
    en: "ocean",
    nepaliRoman: "mahasagara",
    nepali: "महासागर",
  },
  {
    en: "onion",
    nepaliRoman: "pyaja",
    nepali: "प्याज",
  },
  {
    en: "offer",
    nepaliRoman: "prastava",
    nepali: "प्रस्ताव",
  },
  {
    en: "order",
    nepaliRoman: "adesa",
    nepali: "आदेश",
  },
  {
    en: "organ",
    nepaliRoman: "anga",
    nepali: "अंग",
  },
  {
    en: "other",
    nepaliRoman: "an’ya",
    nepali: "अन्य",
  },
  {
    en: "owner",
    nepaliRoman: "malika",
    nepali: "मालिक",
  },
  {
    en: "paddy",
    nepaliRoman: "dhana",
    nepali: "धान",
  },
  {
    en: "panic",
    nepaliRoman: "dara’une",
    nepali: "डराउने",
  },
  {
    en: "peace",
    nepaliRoman: "santi",
    nepali: "शान्ति",
  },
  {
    en: "place",
    nepaliRoman: "tha’um",
    nepali: "ठाउँ",
  },
  {
    en: "plant",
    nepaliRoman: "biruva",
    nepali: "बिरुवा",
  },
  {
    en: "price",
    nepaliRoman: "mulya",
    nepali: "मूल्य",
  },
  {
    en: "pride",
    nepaliRoman: "garva",
    nepali: "गर्व",
  },
  {
    en: "proud",
    nepaliRoman: "garva",
    nepali: "गर्व",
  },
  {
    en: "prove",
    nepaliRoman: "pramanita",
    nepali: "प्रमाणित",
  },
  {
    en: "quilt",
    nepaliRoman: "raja’i",
    nepali: "रजाई",
  },
  {
    en: "quick",
    nepaliRoman: "chito",
    nepali: "छिटो",
  },
  {
    en: "quite",
    nepaliRoman: "ekadama",
    nepali: "एकदम",
  },
  {
    en: "raise",
    nepaliRoman: "utha’unu",
    nepali: "उठाउनु",
  },
  {
    en: "reach",
    nepaliRoman: "pugnu",
    nepali: "पुग्नु",
  },
  {
    en: "react",
    nepaliRoman: "pratikriya",
    nepali: "प्रतिक्रिया",
  },
  {
    en: "ready",
    nepaliRoman: "tayara",
    nepali: "तयार",
  },
  {
    en: "reply",
    nepaliRoman: "javapha",
    nepali: "जवाफ",
  },
  {
    en: "right",
    nepaliRoman: "sahi",
    nepali: "सही",
  },
  {
    en: "round",
    nepaliRoman: "golo",
    nepali: "गोलो",
  },
  {
    en: "rural",
    nepaliRoman: "gramina",
    nepali: "ग्रामीण",
  },
  {
    en: "saint",
    nepaliRoman: "santa",
    nepali: "संत",
  },
  {
    en: "scope",
    nepaliRoman: "dayara",
    nepali: "दायरा",
  },
  {
    en: "score",
    nepaliRoman: "skora",
    nepali: "स्कोर",
  },
  {
    en: "sense",
    nepaliRoman: "bhavana",
    nepali: "भावना",
  },
  {
    en: "shake",
    nepaliRoman: "halla’unuhos",
    nepali: "हल्लाउनुहोस्",
  },
  {
    en: "shape",
    nepaliRoman: "akara",
    nepali: "आकार",
  },
  {
    en: "share",
    nepaliRoman: "sajhedari",
    nepali: "साझेदारी",
  },
  {
    en: "sharp",
    nepaliRoman: "tikho",
    nepali: "तीखो",
  },
  {
    en: "shrub",
    nepaliRoman: "jhadi",
    nepali: "झाडी",
  },
  {
    en: "skill",
    nepaliRoman: "kausala",
    nepali: "कौशल",
  },
  {
    en: "sleep",
    nepaliRoman: "sutnu",
    nepali: "सुत्नु",
  },
  {
    en: "slope",
    nepaliRoman: "dhalana",
    nepali: "ढलान",
  },
  {
    en: "small",
    nepaliRoman: "sano",
    nepali: "सानो",
  },
  {
    en: "smell",
    nepaliRoman: "gandha",
    nepali: "गन्ध",
  },
  {
    en: "smile",
    nepaliRoman: "muskana",
    nepali: "मुस्कान",
  },
  {
    en: "snake",
    nepaliRoman: "sarpa",
    nepali: "सर्प",
  },
  {
    en: "snore",
    nepaliRoman: "ghurne",
    nepali: "घुर्ने",
  },
  {
    en: "solid",
    nepaliRoman: "thosa",
    nepali: "ठोस",
  },
  {
    en: "sound",
    nepaliRoman: "avaja",
    nepali: "आवाज",
  },
  {
    en: "space",
    nepaliRoman: "tha’um",
    nepali: "ठाउँ",
  },
  {
    en: "speak",
    nepaliRoman: "bolnuhos",
    nepali: "बोल्नुहोस्",
  },
  {
    en: "speed",
    nepaliRoman: "gati",
    nepali: "गति",
  },
  {
    en: "spend",
    nepaliRoman: "kharca garnuhos",
    nepali: "खर्च गर्नुहोस्",
  },
  {
    en: "spent",
    nepaliRoman: "kharca bhayo",
    nepali: "खर्च भयो",
  },
  {
    en: "sperm",
    nepaliRoman: "sukranu",
    nepali: "शुक्राणु",
  },
  {
    en: "sport",
    nepaliRoman: "khelakuda",
    nepali: "खेलकुद",
  },
  {
    en: "stand",
    nepaliRoman: "khada",
    nepali: "खडा",
  },
  {
    en: "steam",
    nepaliRoman: "bhapa",
    nepali: "भाप",
  },
  {
    en: "stone",
    nepaliRoman: "dhunga",
    nepali: "ढुङ्गा",
  },
  {
    en: "story",
    nepaliRoman: "katha",
    nepali: "कथा",
  },
  {
    en: "taste",
    nepaliRoman: "svada",
    nepali: "स्वाद",
  },
  {
    en: "teach",
    nepaliRoman: "sika’unuhos",
    nepali: "सिकाउनुहोस्",
  },
  {
    en: "teeth",
    nepaliRoman: "damta",
    nepali: "दाँत",
  },
  {
    en: "thank",
    nepaliRoman: "dhan’yavada",
    nepali: "धन्यवाद",
  },
  {
    en: "there",
    nepaliRoman: "tyaham",
    nepali: "त्यहाँ",
  },
  {
    en: "these",
    nepaliRoman: "yi",
    nepali: "यी",
  },
  {
    en: "thick",
    nepaliRoman: "baklo",
    nepali: "बाक्लो",
  },
  {
    en: "thing",
    nepaliRoman: "kura",
    nepali: "कुरा",
  },
  {
    en: "tiger",
    nepaliRoman: "bagha",
    nepali: "बाघ",
  },
  {
    en: "today",
    nepaliRoman: "aja",
    nepali: "आज",
  },
  {
    en: "total",
    nepaliRoman: "kula",
    nepali: "कुल",
  },
  {
    en: "treat",
    nepaliRoman: "upacara",
    nepali: "उपचार",
  },
  {
    en: "trend",
    nepaliRoman: "pravrtti",
    nepali: "प्रवृत्ति",
  },
  {
    en: "tried",
    nepaliRoman: "prayasa gare",
    nepali: "प्रयास गरे",
  },
  {
    en: "trust",
    nepaliRoman: "bharosa",
    nepali: "भरोसा",
  },
  {
    en: "truth",
    nepaliRoman: "satya",
    nepali: "सत्य",
  },
  {
    en: "twice",
    nepaliRoman: "du’i pataka",
    nepali: "दुई पटक",
  },
  {
    en: "under",
    nepaliRoman: "antargata",
    nepali: "अन्तर्गत",
  },
  {
    en: "upper",
    nepaliRoman: "mathillo",
    nepali: "माथिल्लो",
  },
  {
    en: "urban",
    nepaliRoman: "sahari",
    nepali: "सहरी",
  },
  {
    en: "visit",
    nepaliRoman: "bhramana garnuhos",
    nepali: "भ्रमण गर्नुहोस्",
  },
  {
    en: "voice",
    nepaliRoman: "avaja",
    nepali: "आवाज",
  },
  {
    en: "vomit",
    nepaliRoman: "banta",
    nepali: "बान्ता",
  },
  {
    en: "waste",
    nepaliRoman: "barbada",
    nepali: "बर्बाद",
  },
  {
    en: "water",
    nepaliRoman: "pani",
    nepali: "पानी",
  },
  {
    en: "wheat",
    nepaliRoman: "gahum",
    nepali: "गहुँ",
  },
  {
    en: "where",
    nepaliRoman: "kaham",
    nepali: "कहाँ",
  },
  {
    en: "white",
    nepaliRoman: "seto",
    nepali: "सेतो",
  },
  {
    en: "whole",
    nepaliRoman: "sampurna",
    nepali: "सम्पूर्ण",
  },
  {
    en: "woman",
    nepaliRoman: "mahila",
    nepali: "महिला",
  },
  {
    en: "world",
    nepaliRoman: "sansara",
    nepali: "संसार",
  },
  {
    en: "worst",
    nepaliRoman: "sabaibhanda kharaba",
    nepali: "सबैभन्दा खराब",
  },
  {
    en: "write",
    nepaliRoman: "lekhnuhos",
    nepali: "लेख्नुहोस्",
  },
  {
    en: "wrong",
    nepaliRoman: "galata",
    nepali: "गलत",
  },
  {
    en: "yield",
    nepaliRoman: "upaja",
    nepali: "उपज",
  },
  {
    en: "young",
    nepaliRoman: "javana",
    nepali: "जवान",
  },
  {
    en: "absent",
    nepaliRoman: "anupasthita",
    nepali: "अनुपस्थित",
  },
  {
    en: "accept",
    nepaliRoman: "svikara garnuhos",
    nepali: "स्वीकार गर्नुहोस्",
  },
  {
    en: "admire",
    nepaliRoman: "prasansa",
    nepali: "प्रशंसा",
  },
  {
    en: "advice",
    nepaliRoman: "sallaha",
    nepali: "सल्लाह",
  },
  {
    en: "almost",
    nepaliRoman: "lagabhaga",
    nepali: "लगभग",
  },
  {
    en: "always",
    nepaliRoman: "sadhaim",
    nepali: "सधैं",
  },
  {
    en: "animal",
    nepaliRoman: "janavara",
    nepali: "जनावर",
  },
  {
    en: "answer",
    nepaliRoman: "javapha",
    nepali: "जवाफ",
  },
  {
    en: "appeal",
    nepaliRoman: "apila",
    nepali: "अपील",
  },
  {
    en: "appear",
    nepaliRoman: "dekha parchan",
    nepali: "देखा पर्छन्",
  },
  {
    en: "arrive",
    nepaliRoman: "a’ipugcha",
    nepali: "आइपुग्छ",
  },
  {
    en: "artist",
    nepaliRoman: "kalakara",
    nepali: "कलाकार",
  },
  {
    en: "assist",
    nepaliRoman: "sahayoga",
    nepali: "सहयोग",
  },
  {
    en: "attack",
    nepaliRoman: "akramana",
    nepali: "आक्रमण",
  },
  {
    en: "attach",
    nepaliRoman: "sanlagna garnuhos",
    nepali: "संलग्न गर्नुहोस्",
  },
  {
    en: "attend",
    nepaliRoman: "upasthita",
    nepali: "उपस्थित",
  },
  {
    en: "bangle",
    nepaliRoman: "cura",
    nepali: "चुरा",
  },
  {
    en: "before",
    nepaliRoman: "pahile",
    nepali: "पहिले",
  },
  {
    en: "behind",
    nepaliRoman: "pachadi",
    nepali: "पछाडि",
  },

  {
    en: "better",
    nepaliRoman: "ramro",
    nepali: "राम्रो",
  },
  {
    en: "borrow",
    nepaliRoman: "udharo",
    nepali: "उधारो",
  },
  {
    en: "bottom / below",
    nepaliRoman: "tala",
    nepali: "तल",
  },
  {
    en: "broken",
    nepaliRoman: "bhamci’eko",
    nepali: "भाँचिएको",
  },
  {
    en: "budget",
    nepaliRoman: "bajeta",
    nepali: "बजेट",
  },
  {
    en: "cancel",
    nepaliRoman: "radda garnuhos",
    nepali: "रद्द गर्नुहोस्",
  },
  {
    en: "cancer",
    nepaliRoman: "kyansara",
    nepali: "क्यान्सर",
  },
  {
    en: "carrot",
    nepaliRoman: "gajara",
    nepali: "गाजर",
  },
  {
    en: "cattle",
    nepaliRoman: "ga’ivastu",
    nepali: "गाईवस्तु",
  },
  {
    en: "common",
    nepaliRoman: "saman’ya",
    nepali: "सामान्य",
  },
  {
    en: "compel",
    nepaliRoman: "badhya",
    nepali: "बाध्य",
  },
  {
    en: "corner",
    nepaliRoman: "kuna",
    nepali: "कुना",
  },
  {
    en: "couple",
    nepaliRoman: "jodi",
    nepali: "जोडी",
  },
  {
    en: "course",
    nepaliRoman: "pathyakrama",
    nepali: "पाठ्यक्रम",
  },
  {
    en: "create",
    nepaliRoman: "sirjana garnuhos",
    nepali: "सिर्जना गर्नुहोस्",
  },
  {
    en: "custom",
    nepaliRoman: "anukulana",
    nepali: "अनुकूलन",
  },
  {
    en: "damage",
    nepaliRoman: "ksati",
    nepali: "क्षति",
  },
  {
    en: "dancer",
    nepaliRoman: "nartaka",
    nepali: "नर्तक",
  },
  {
    en: "danger",
    nepaliRoman: "khatara",
    nepali: "खतरा",
  },
  {
    en: "decade",
    nepaliRoman: "dasaka",
    nepali: "दशक",
  },
  {
    en: "defeat",
    nepaliRoman: "parajaya",
    nepali: "पराजय",
  },
  {
    en: "delete",
    nepaliRoman: "meta’una",
    nepali: "मेटाउन",
  },
  {
    en: "demand",
    nepaliRoman: "maga",
    nepali: "माग",
  },
  {
    en: "desire",
    nepaliRoman: "iccha",
    nepali: "इच्छा",
  },
  {
    en: "detail",
    nepaliRoman: "vistara",
    nepali: "विस्तार",
  },
  {
    en: "dinner",
    nepaliRoman: "dinara",
    nepali: "डिनर",
  },
  {
    en: "divine",
    nepaliRoman: "isvariya",
    nepali: "ईश्वरीय",
  },
  {
    en: "donkey",
    nepaliRoman: "gadha",
    nepali: "गधा",
  },
  {
    en: "double",
    nepaliRoman: "dobbara",
    nepali: "दोब्बर",
  },
  {
    en: "edible",
    nepaliRoman: "khana yogya",
    nepali: "खान योग्य",
  },
  {
    en: "effect",
    nepaliRoman: "asara",
    nepali: "असर",
  },
  {
    en: "either",
    nepaliRoman: "ya ta",
    nepali: "या त",
  },
  {
    en: "empire",
    nepaliRoman: "samrajya",
    nepali: "साम्राज्य",
  },
  {
    en: "energy",
    nepaliRoman: "urja",
    nepali: "ऊर्जा",
  },
  {
    en: "enough",
    nepaliRoman: "paryapta",
    nepali: "पर्याप्त",
  },
  {
    en: "ensure",
    nepaliRoman: "pakka garnu",
    nepali: "पक्का गर्नु",
  },
  {
    en: "entire",
    nepaliRoman: "sampurna",
    nepali: "सम्पूर्ण",
  },
  {
    en: "except",
    nepaliRoman: "baheka",
    nepali: "बाहेक",
  },
  {
    en: "expand",
    nepaliRoman: "vistara garnuhos",
    nepali: "विस्तार गर्नुहोस्",
  },
  {
    en: "expect",
    nepaliRoman: "apeksa",
    nepali: "अपेक्षा",
  },
  {
    en: "export",
    nepaliRoman: "niryata",
    nepali: "निर्यात",
  },
  {
    en: "extend",
    nepaliRoman: "vistara garnuhos",
    nepali: "विस्तार गर्नुहोस्",
  },
  {
    en: "facade",
    nepaliRoman: "mukhauta",
    nepali: "मुखौटा",
  },
  {
    en: "family",
    nepaliRoman: "parivara",
    nepali: "परिवार",
  },
  {
    en: "famous",
    nepaliRoman: "prasid’dha",
    nepali: "प्रसिद्ध",
  },
  {
    en: "faulty",
    nepaliRoman: "dosapurna",
    nepali: "दोषपूर्ण",
  },
  {
    en: "favour",
    nepaliRoman: "anugraha",
    nepali: "अनुग्रह",
  },
  {
    en: "famous",
    nepaliRoman: "prasid’dha",
    nepali: "प्रसिद्ध",
  },
  {
    en: "favour",
    nepaliRoman: "anugraha",
    nepali: "अनुग्रह",
  },
  {
    en: "female",
    nepaliRoman: "mahila",
    nepali: "महिला",
  },
  {
    en: "fiance",
    nepaliRoman: "mangetara",
    nepali: "मंगेतर",
  },
  {
    en: "finish",
    nepaliRoman: "samapta",
    nepali: "समाप्त",
  },
  {
    en: "flower",
    nepaliRoman: "phula",
    nepali: "फूल",
  },
  {
    en: "forest",
    nepaliRoman: "jangala",
    nepali: "जङ्गल",
  },
  {
    en: "forgot",
    nepaliRoman: "birsiyo",
    nepali: "बिर्सियो",
  },
  {
    en: "freeze",
    nepaliRoman: "phrija",
    nepali: "फ्रिज",
  },
  {
    en: "friend",
    nepaliRoman: "sathi",
    nepali: "साथी",
  },
  {
    en: "future",
    nepaliRoman: "bhavisya",
    nepali: "भविष्य",
  },
  {
    en: "garage",
    nepaliRoman: "gyareja",
    nepali: "ग्यारेज",
  },
  {
    en: "garden",
    nepaliRoman: "bagaica",
    nepali: "बगैचा",
  },
  {
    en: "garlic",
    nepaliRoman: "lasuna",
    nepali: "लसुन",
  },
  {
    en: "ginger",
    nepaliRoman: "aduva",
    nepali: "अदुवा",
  },
  {
    en: "global",
    nepaliRoman: "visvavyapi",
    nepali: "विश्वव्यापी",
  },
  {
    en: "ground",
    nepaliRoman: "jamina",
    nepali: "जमीन",
  },
  {
    en: "growth",
    nepaliRoman: "vrd’dhi",
    nepali: "वृद्धि",
  },
  {
    en: "health",
    nepaliRoman: "svasthya",
    nepali: "स्वास्थ्य",
  },
  {
    en: "hidden",
    nepaliRoman: "lukeko",
    nepali: "लुकेको",
  },
  {
    en: "honest",
    nepaliRoman: "imanadara",
    nepali: "इमानदार",
  },
  {
    en: "honour",
    nepaliRoman: "sam’mana",
    nepali: "सम्मान",
  },
  {
    en: "hostel",
    nepaliRoman: "chatravasa",
    nepali: "छात्रावास",
  },
  {
    en: "humble",
    nepaliRoman: "namra",
    nepali: "नम्र",
  },
  {
    en: "hungry",
    nepaliRoman: "bhoko",
    nepali: "भोको",
  },
  {
    en: "ignore",
    nepaliRoman: "bevasta garnuhos",
    nepali: "बेवास्ता गर्नुहोस्",
  },
  {
    en: "impact",
    nepaliRoman: "prabhava",
    nepali: "प्रभाव",
  },
  {
    en: "impure",
    nepaliRoman: "asud’dha",
    nepali: "अशुद्ध",
  },
  {
    en: "income",
    nepaliRoman: "aya",
    nepali: "आय",
  },
  {
    en: "inform",
    nepaliRoman: "janakari dinuhos",
    nepali: "जानकारी दिनुहोस्",
  },
  {
    en: "insect",
    nepaliRoman: "kira",
    nepali: "कीरा",
  },
  {
    en: "inside",
    nepaliRoman: "bhitra",
    nepali: "भित्र",
  },
  {
    en: "jungle",
    nepaliRoman: "jangala",
    nepali: "जंगल",
  },
  {
    en: "kidnap",
    nepaliRoman: "apaharana",
    nepali: "अपहरण",
  },
  {
    en: "kindle",
    nepaliRoman: "jala’une",
    nepali: "जलाउने",
  },
  {
    en: "labour",
    nepaliRoman: "srama",
    nepali: "श्रम",
  },
  {
    en: "leader",
    nepaliRoman: "neta",
    nepali: "नेता",
  },
  {
    en: "length",
    nepaliRoman: "lamba’i",
    nepali: "लम्बाइ",
  },
  {
    en: "letter",
    nepaliRoman: "patra",
    nepali: "पत्र",
  },
  {
    en: "liquid",
    nepaliRoman: "tarala padartha",
    nepali: "तरल पदार्थ",
  },
  {
    en: "little",
    nepaliRoman: "sano",
    nepali: "सानो",
  },
  {
    en: "living",
    nepaliRoman: "jivita",
    nepali: "जीवित",
  },
  {
    en: "lizard",
    nepaliRoman: "cheparo",
    nepali: "छेपारो",
  },
  {
    en: "locate",
    nepaliRoman: "patta laga’unuhos",
    nepali: "पत्ता लगाउनुहोस्",
  },
  {
    en: "luxury",
    nepaliRoman: "vilasita",
    nepali: "विलासिता",
  },
  {
    en: "making",
    nepaliRoman: "bana’une",
    nepali: "बनाउने",
  },
  {
    en: "mammal",
    nepaliRoman: "stanapayi",
    nepali: "स्तनपायी",
  },
  {
    en: "manage",
    nepaliRoman: "vyavasthapana garnuhos",
    nepali: "व्यवस्थापन गर्नुहोस्",
  },
  {
    en: "manual",
    nepaliRoman: "myanu’ala",
    nepali: "म्यानुअल",
  },
  {
    en: "market",
    nepaliRoman: "bajara",
    nepali: "बजार",
  },
  {
    en: "mental",
    nepaliRoman: "manasika",
    nepali: "मानसिक",
  },
  {
    en: "method",
    nepaliRoman: "vidhi",
    nepali: "विधि",
  },
  {
    en: "middle",
    nepaliRoman: "madhya",
    nepali: "मध्य",
  },
  {
    en: "monkey",
    nepaliRoman: "bamdara",
    nepali: "बाँदर",
  },
  {
    en: "mother",
    nepaliRoman: "ama",
    nepali: "आमा",
  },
  {
    en: "muscle",
    nepaliRoman: "masu",
    nepali: "मासु",
  },
  {
    en: "narrow",
    nepaliRoman: "samghuro",
    nepali: "साँघुरो",
  },
  {
    en: "native",
    nepaliRoman: "desi",
    nepali: "देशी",
  },
  {
    en: "nature",
    nepaliRoman: "prakrti",
    nepali: "प्रकृति",
  },
  {
    en: "normal",
    nepaliRoman: "saman’ya",
    nepali: "सामान्य",
  },
  {
    en: "number",
    nepaliRoman: "sankhya",
    nepali: "संख्या",
  },
  {
    en: "object",
    nepaliRoman: "vastu",
    nepali: "वस्तु",
  },
  {
    en: "office",
    nepaliRoman: "karyalaya",
    nepali: "कार्यालय",
  },
  {
    en: "option",
    nepaliRoman: "vikalpa",
    nepali: "विकल्प",
  },
  {
    en: "parent",
    nepaliRoman: "abhibhavaka",
    nepali: "अभिभावक",
  },
  {
    en: "parrot",
    nepaliRoman: "suta",
    nepali: "सुता",
  },
  {
    en: "people",
    nepaliRoman: "manisaharu",
    nepali: "मानिसहरू",
  },
  {
    en: "person",
    nepaliRoman: "vyakti",
    nepali: "व्यक्ति",
  },
  {
    en: "pickle",
    nepaliRoman: "acara",
    nepali: "अचार",
  },
  {
    en: "picnic",
    nepaliRoman: "banabhoja",
    nepali: "बनभोज",
  },
  {
    en: "pigeon",
    nepaliRoman: "pareva",
    nepali: "परेवा",
  },
  {
    en: "planet",
    nepaliRoman: "graha",
    nepali: "ग्रह",
  },
  {
    en: "please",
    nepaliRoman: "krpaya",
    nepali: "कृपया",
  },
  {
    en: "plenty",
    nepaliRoman: "prasasta",
    nepali: "प्रशस्त",
  },
  {
    en: "police",
    nepaliRoman: "prahari",
    nepali: "प्रहरी",
  },
  {
    en: "potato",
    nepaliRoman: "alu",
    nepali: "आलु",
  },
  {
    en: "praise",
    nepaliRoman: "prasansa",
    nepali: "प्रशंसा",
  },
  {
    en: "prayer",
    nepaliRoman: "prarthana",
    nepali: "प्रार्थना",
  },
  {
    en: "pretty",
    nepaliRoman: "sundara",
    nepali: "सुन्दर",
  },
  {
    en: "prince",
    nepaliRoman: "rajakumara",
    nepali: "राजकुमार",
  },
  {
    en: "profit",
    nepaliRoman: "labha",
    nepali: "लाभ",
  },
  {
    en: "proper",
    nepaliRoman: "ucita",
    nepali: "उचित",
  },
  {
    en: "public",
    nepaliRoman: "sarvajanika",
    nepali: "सार्वजनिक",
  },
  {
    en: "rabbit",
    nepaliRoman: "kharayo",
    nepali: "खरायो",
  },
  {
    en: "recent",
    nepaliRoman: "bharkharako",
    nepali: "भर्खरको",
  },
  {
    en: "recipe",
    nepaliRoman: "nuskha",
    nepali: "नुस्खा",
  },
  {
    en: "record",
    nepaliRoman: "rekarda",
    nepali: "रेकर्ड",
  },
  {
    en: "reduce",
    nepaliRoman: "ghata’une",
    nepali: "घटाउने",
  },
  {
    en: "regret",
    nepaliRoman: "aphasosa",
    nepali: "अफसोस",
  },
  {
    en: "reject",
    nepaliRoman: "asvikara",
    nepali: "अस्वीकार",
  },
  {
    en: "remind",
    nepaliRoman: "samjha’une",
    nepali: "सम्झाउने",
  },
  {
    en: "remove",
    nepaliRoman: "hata’una",
    nepali: "हटाउन",
  },
  {
    en: "repair",
    nepaliRoman: "marmata",
    nepali: "मर्मत",
  },
  {
    en: "repeat",
    nepaliRoman: "dohorya’unuhos",
    nepali: "दोहोर्याउनुहोस्",
  },
  {
    en: "return",
    nepaliRoman: "pharkinu",
    nepali: "फर्किनु",
  },
  {
    en: "rotate",
    nepaliRoman: "ghuma’unuhos",
    nepali: "घुमाउनुहोस्",
  },
  {
    en: "safety",
    nepaliRoman: "suraksa",
    nepali: "सुरक्षा",
  },
  {
    en: "salary",
    nepaliRoman: "talaba",
    nepali: "तलब",
  },
  {
    en: "sample",
    nepaliRoman: "namuna",
    nepali: "नमूना",
  },
  {
    en: "school",
    nepaliRoman: "vidyalaya",
    nepali: "विद्यालय",
  },
  {
    en: "screen",
    nepaliRoman: "parda",
    nepali: "पर्दा",
  },
  {
    en: "script",
    nepaliRoman: "lipi",
    nepali: "लिपि",
  },
  {
    en: "scroll",
    nepaliRoman: "skrola",
    nepali: "स्क्रोल",
  },
  {
    en: "search",
    nepaliRoman: "khoja",
    nepali: "खोज",
  },
  {
    en: "season",
    nepaliRoman: "sijana",
    nepali: "सिजन",
  },
  {
    en: "secret",
    nepaliRoman: "gopya",
    nepali: "गोप्य",
  },
  {
    en: "secure",
    nepaliRoman: "suraksita",
    nepali: "सुरक्षित",
  },
  {
    en: "select",
    nepaliRoman: "cayana garnuhos",
    nepali: "चयन गर्नुहोस्",
  },
  {
    en: "senior",
    nepaliRoman: "varistha",
    nepali: "वरिष्ठ",
  },
  {
    en: "shield",
    nepaliRoman: "dhala",
    nepali: "ढाल",
  },
  {
    en: "should",
    nepaliRoman: "garnuparcha",
    nepali: "गर्नुपर्छ",
  },
  {
    en: "shower",
    nepaliRoman: "nuha’une",
    nepali: "नुहाउने",
  },
  {
    en: "silent",
    nepaliRoman: "mauna",
    nepali: "मौन",
  },
  {
    en: "single",
    nepaliRoman: "ekala",
    nepali: "एकल",
  },
  {
    en: "sister",
    nepaliRoman: "bahini",
    nepali: "बहिनी",
  },
  {
    en: "smooth",
    nepaliRoman: "cillo",
    nepali: "चिल्लो",
  },
  {
    en: "social",
    nepaliRoman: "samajika",
    nepali: "सामाजिक",
  },
  {
    en: "speech",
    nepaliRoman: "bhasana",
    nepali: "भाषण",
  },
  {
    en: "street",
    nepaliRoman: "sadaka",
    nepali: "सडक",
  },
  {
    en: "strong",
    nepaliRoman: "baliyo",
    nepali: "बलियो",
  },
  {
    en: "sudden",
    nepaliRoman: "acanaka",
    nepali: "अचानक",
  },
  {
    en: "supply",
    nepaliRoman: "apurti",
    nepali: "आपूर्ति",
  },
  {
    en: "talent",
    nepaliRoman: "pratibha",
    nepali: "प्रतिभा",
  },
  {
    en: "temple",
    nepaliRoman: "mandira",
    nepali: "मन्दिर",
  },
  {
    en: "thread",
    nepaliRoman: "dhago",
    nepali: "धागो",
  },
  {
    en: "thrill",
    nepaliRoman: "romancaka",
    nepali: "रोमाञ्चक",
  },
  {
    en: "throat",
    nepaliRoman: "ghamti",
    nepali: "घाँटी",
  },
  {
    en: "tittle",
    nepaliRoman: "sirsaka",
    nepali: "शीर्षक",
  },
  {
    en: "toilet",
    nepaliRoman: "saucalaya",
    nepali: "शौचालय",
  },
  {
    en: "tomato",
    nepaliRoman: "tamatara",
    nepali: "टमाटर",
  },
  {
    en: "tongue",
    nepaliRoman: "jibro",
    nepali: "जिब्रो",
  },
  {
    en: "travel",
    nepaliRoman: "yatra",
    nepali: "यात्रा",
  },
  {
    en: "tunnel",
    nepaliRoman: "suruna",
    nepali: "सुरुङ",
  },
  {
    en: "turtle",
    nepaliRoman: "kachuva",
    nepali: "कछुवा",
  },
  {
    en: "unseen",
    nepaliRoman: "nadekheko",
    nepali: "नदेखेको",
  },
  {
    en: "update",
    nepaliRoman: "apadeta garnuhos",
    nepali: "अपडेट गर्नुहोस्",
  },
  {
    en: "urgent",
    nepaliRoman: "atyavasyaka",
    nepali: "अत्यावश्यक",
  },
  {
    en: "vacate",
    nepaliRoman: "khali garnuhos",
    nepali: "खाली गर्नुहोस्",
  },
  {
    en: "vacuum",
    nepaliRoman: "vaikyuma",
    nepali: "वैक्यूम",
  },
  {
    en: "vapour",
    nepaliRoman: "bhapa",
    nepali: "भाप",
  },
  {
    en: "verify",
    nepaliRoman: "pramanita garnuhos",
    nepali: "प्रमाणित गर्नुहोस्",
  },
  {
    en: "virgin",
    nepaliRoman: "kumari",
    nepali: "कुमारी",
  },
  {
    en: "wealth",
    nepaliRoman: "dhana",
    nepali: "धन",
  },
  {
    en: "weekly",
    nepaliRoman: "saptahika",
    nepali: "साप्ताहिक",
  },
  {
    en: "weight",
    nepaliRoman: "vajana",
    nepali: "वजन",
  },
  {
    en: "winter",
    nepaliRoman: "jado",
    nepali: "जाडो",
  },
  {
    en: "winner",
    nepaliRoman: "vijeta",
    nepali: "विजेता",
  },
  {
    en: "wonder",
    nepaliRoman: "ascarya",
    nepali: "आश्चर्य",
  },
  {
    en: "worker",
    nepaliRoman: "kamadara",
    nepali: "कामदार",
  },
  {
    en: "writer",
    nepaliRoman: "lekhaka",
    nepali: "लेखक",
  },
  {
    en: "yearly",
    nepaliRoman: "varsika",
    nepali: "वार्षिक",
  },
  {
    en: "achieve",
    nepaliRoman: "hasila garne",
    nepali: "हासिल गर्ने",
  },
  {
    en: "advance",
    nepaliRoman: "agrima",
    nepali: "अग्रिम",
  },
  {
    en: "against",
    nepaliRoman: "virud’dha",
    nepali: "विरुद्ध",
  },
  {
    en: "already",
    nepaliRoman: "pahile nai",
    nepali: "पहिले नै",
  },
  {
    en: "ancient",
    nepaliRoman: "purano",
    nepali: "पुरानो",
  },
  {
    en: "anybody",
    nepaliRoman: "kohi pani",
    nepali: "कोही पनि",
  },
  {
    en: "approve",
    nepaliRoman: "anumodana",
    nepali: "अनुमोदन",
  },
  {
    en: "apology",
    nepaliRoman: "maphi",
    nepali: "माफी",
  },
  {
    en: "archive",
    nepaliRoman: "abhilekha",
    nepali: "अभिलेख",
  },
  {
    en: "arrange",
    nepaliRoman: "vyavastha garnuhos",
    nepali: "व्यवस्था गर्नुहोस्",
  },
  {
    en: "arrival",
    nepaliRoman: "agamana",
    nepali: "आगमन",
  },
  {
    en: "article",
    nepaliRoman: "lekha",
    nepali: "लेख",
  },
  {
    en: "attempt",
    nepaliRoman: "prayasa",
    nepali: "प्रयास",
  },
  {
    en: "attract",
    nepaliRoman: "akarsita garne",
    nepali: "आकर्षित गर्ने",
  },
  {
    en: "average",
    nepaliRoman: "ausata",
    nepali: "औसत",
  },
  {
    en: "bandage",
    nepaliRoman: "patti",
    nepali: "पट्टी",
  },
  {
    en: "barrage",
    nepaliRoman: "byareja",
    nepali: "ब्यारेज",
  },
  {
    en: "barrier",
    nepaliRoman: "avarodha",
    nepali: "अवरोध",
  },
  {
    en: "because",
    nepaliRoman: "kinabhane",
    nepali: "किनभने",
  },
  {
    en: "benefit",
    nepaliRoman: "labha",
    nepali: "लाभ",
  },
  {
    en: "between",
    nepaliRoman: "bicama",
    nepali: "बीचमा",
  },
  {
    en: "cabbage",
    nepaliRoman: "gobhi",
    nepali: "गोभी",
  },
  {
    en: "capture",
    nepaliRoman: "kabja",
    nepali: "कब्जा",
  },
  {
    en: "careful",
    nepaliRoman: "savadhana",
    nepali: "सावधान",
  },
  {
    en: "carrier",
    nepaliRoman: "vahaka",
    nepali: "वाहक",
  },
  {
    en: "century",
    nepaliRoman: "satabdi",
    nepali: "शताब्दी",
  },
  {
    en: "certain",
    nepaliRoman: "niscita",
    nepali: "निश्चित",
  },
  {
    en: "chamber",
    nepaliRoman: "kaksa",
    nepali: "कक्ष",
  },
  {
    en: "chapter",
    nepaliRoman: "adhyaya",
    nepali: "अध्याय",
  },
  {
    en: "charity",
    nepaliRoman: "paropakara",
    nepali: "परोपकार",
  },
  {
    en: "climate",
    nepaliRoman: "jalavayu",
    nepali: "जलवायु",
  },
  {
    en: "coconut",
    nepaliRoman: "narivala",
    nepali: "नरिवल",
  },
  {
    en: "collect",
    nepaliRoman: "sankalana",
    nepali: "सङ्कलन",
  },
  {
    en: "college",
    nepaliRoman: "kaleja",
    nepali: "कलेज",
  },
  {
    en: "comfort",
    nepaliRoman: "arama",
    nepali: "आराम",
  },
  {
    en: "command",
    nepaliRoman: "adesa",
    nepali: "आदेश",
  },
  {
    en: "comment",
    nepaliRoman: "tippani",
    nepali: "टिप्पणी",
  },
  {
    en: "company",
    nepaliRoman: "kampani",
    nepali: "कम्पनी",
  },
  {
    en: "compare",
    nepaliRoman: "tulana garnuhos",
    nepali: "तुलना गर्नुहोस्",
  },
  {
    en: "concept",
    nepaliRoman: "avadharana",
    nepali: "अवधारणा",
  },
  {
    en: "concern",
    nepaliRoman: "cinta",
    nepali: "चिन्ता",
  },
  {
    en: "conduct",
    nepaliRoman: "acarana",
    nepali: "आचरण",
  },
  {
    en: "confirm",
    nepaliRoman: "pusti garnuhos",
    nepali: "पुष्टि गर्नुहोस्",
  },
  {
    en: "connect",
    nepaliRoman: "jadana garnuhos",
    nepali: "जडान गर्नुहोस्",
  },
  {
    en: "contact",
    nepaliRoman: "samparka garnuhos",
    nepali: "सम्पर्क गर्नुहोस्",
  },
  {
    en: "control",
    nepaliRoman: "niyantrana",
    nepali: "नियन्त्रण",
  },
  {
    en: "convert",
    nepaliRoman: "rupantarana",
    nepali: "रूपान्तरण",
  },
  {
    en: "correct",
    nepaliRoman: "sahi",
    nepali: "सही",
  },
  {
    en: "costume",
    nepaliRoman: "posaka",
    nepali: "पोशाक",
  },
  {
    en: "cottage",
    nepaliRoman: "kutira",
    nepali: "कुटीर",
  },
  {
    en: "country",
    nepaliRoman: "desa",
    nepali: "देश",
  },
  {
    en: "courage",
    nepaliRoman: "sahasa",
    nepali: "साहस",
  },
  {
    en: "cucumber",
    nepaliRoman: "kakadi",
    nepali: "काकडी",
  },
  {
    en: "curious",
    nepaliRoman: "jijnasu",
    nepali: "जिज्ञासु",
  },
  {
    en: "declare",
    nepaliRoman: "ghosana",
    nepali: "घोषणा",
  },
  {
    en: "defense",
    nepaliRoman: "raksa",
    nepali: "रक्षा",
  },
  {
    en: "dentist",
    nepaliRoman: "danta cikitsaka",
    nepali: "दन्त चिकित्सक",
  },
  {
    en: "deposit",
    nepaliRoman: "jam’ma",
    nepali: "जम्मा",
  },
  {
    en: "despite",
    nepaliRoman: "bavajuda",
    nepali: "बावजुद",
  },
  {
    en: "destiny",
    nepaliRoman: "bhagya",
    nepali: "भाग्य",
  },
  {
    en: "destroy",
    nepaliRoman: "nasta",
    nepali: "नष्ट",
  },
  {
    en: "develop",
    nepaliRoman: "vikasa",
    nepali: "विकास",
  },
  {
    en: "disease",
    nepaliRoman: "roga",
    nepali: "रोग",
  },
  {
    en: "display",
    nepaliRoman: "pradarsana",
    nepali: "प्रदर्शन",
  },
  {
    en: "disturb",
    nepaliRoman: "badha purya’une",
    nepali: "बाधा पुर्‍याउने",
  },
  {
    en: "dynasty",
    nepaliRoman: "rajavansa",
    nepali: "राजवंश",
  },
  {
    en: "eagerly",
    nepaliRoman: "utsukatapurvaka",
    nepali: "उत्सुकतापूर्वक",
  },
  {
    en: "earning",
    nepaliRoman: "kama’i",
    nepali: "कमाई",
  },
  {
    en: "eatable",
    nepaliRoman: "khana yogya",
    nepali: "खान योग्य",
  },
  {
    en: "ecology",
    nepaliRoman: "paristhitiki",
    nepali: "पारिस्थितिकी",
  },
  {
    en: "economy",
    nepaliRoman: "arthavyavastha",
    nepali: "अर्थव्यवस्था",
  },
  {
    en: "edition",
    nepaliRoman: "sanskarana",
    nepali: "संस्करण",
  },
  {
    en: "elegant",
    nepaliRoman: "surucipurna",
    nepali: "सुरुचिपूर्ण",
  },
  {
    en: "enhance",
    nepaliRoman: "badha’une",
    nepali: "बढाउने",
  },
  {
    en: "episode",
    nepaliRoman: "episoda",
    nepali: "एपिसोड",
  },
  {
    en: "example",
    nepaliRoman: "udaharana",
    nepali: "उदाहरण",
  },
  {
    en: "evening",
    nepaliRoman: "samjha",
    nepali: "साँझ",
  },
  {
    en: "exclude",
    nepaliRoman: "bahiskara",
    nepali: "बहिष्कार",
  },
  {
    en: "explain",
    nepaliRoman: "vyakhya garnuhos",
    nepali: "व्याख्या गर्नुहोस्",
  },
  {
    en: "explore",
    nepaliRoman: "anvesana garnuhos",
    nepali: "अन्वेषण गर्नुहोस्",
  },
  {
    en: "educate",
    nepaliRoman: "siksita",
    nepali: "शिक्षित",
  },
  {
    en: "factory",
    nepaliRoman: "karakhana",
    nepali: "कारखाना",
  },
  {
    en: "failure",
    nepaliRoman: "asaphalata",
    nepali: "असफलता",
  },
  {
    en: "feature",
    nepaliRoman: "suvidha",
    nepali: "सुविधा",
  },
  {
    en: "finance",
    nepaliRoman: "vitta",
    nepali: "वित्त",
  },
  {
    en: "flavour",
    nepaliRoman: "svada",
    nepali: "स्वाद",
  },
  {
    en: "fluency",
    nepaliRoman: "pravaha",
    nepali: "प्रवाह",
  },
  {
    en: "forever",
    nepaliRoman: "sadhaimbhari",
    nepali: "सधैंभरि",
  },
  {
    en: "further",
    nepaliRoman: "thapa",
    nepali: "थप",
  },
  {
    en: "garment",
    nepaliRoman: "kapada",
    nepali: "कपडा",
  },
  {
    en: "general",
    nepaliRoman: "saman’ya",
    nepali: "सामान्य",
  },
  {
    en: "genuine",
    nepaliRoman: "vastavika",
    nepali: "वास्तविक",
  },
  {
    en: "glamour",
    nepaliRoman: "glaimara",
    nepali: "ग्लैमर",
  },
  {
    en: "grammar",
    nepaliRoman: "vyakarana",
    nepali: "व्याकरण",
  },
  {
    en: "grocery",
    nepaliRoman: "kirana",
    nepali: "किराना",
  },
  {
    en: "habitat",
    nepaliRoman: "basasthana",
    nepali: "बासस्थान",
  },
  {
    en: "harmful",
    nepaliRoman: "hanikaraka",
    nepali: "हानिकारक",
  },
  {
    en: "harvest",
    nepaliRoman: "phasala",
    nepali: "फसल",
  },
  {
    en: "heading",
    nepaliRoman: "sirsaka",
    nepali: "शीर्षक",
  },
  {
    en: "hearing",
    nepaliRoman: "sunuva’i",
    nepali: "सुनुवाइ",
  },
  {
    en: "helpful / useful",
    nepaliRoman: "upayogi",
    nepali: "उपयोगी",
  },

  {
    en: "history",
    nepaliRoman: "itihasa",
    nepali: "इतिहास",
  },
  {
    en: "holding",
    nepaliRoman: "holdina",
    nepali: "होल्डिङ",
  },
  {
    en: "holiday",
    nepaliRoman: "chutti",
    nepali: "छुट्टी",
  },
  {
    en: "hundred",
    nepaliRoman: "saya",
    nepali: "सय",
  },
  {
    en: "husband",
    nepaliRoman: "srimana",
    nepali: "श्रीमान",
  },
  {
    en: "hygiene",
    nepaliRoman: "svacchata",
    nepali: "स्वच्छता",
  },
  {
    en: "impress",
    nepaliRoman: "prabhavita",
    nepali: "प्रभावित",
  },
  {
    en: "improve",
    nepaliRoman: "sudhara",
    nepali: "सुधार",
  },
  {
    en: "include",
    nepaliRoman: "samavesa garnuhos",
    nepali: "समावेश गर्नुहोस्",
  },
  {
    en: "initial",
    nepaliRoman: "suruma",
    nepali: "सुरुमा",
  },
  {
    en: "inspect",
    nepaliRoman: "niriksana garnuhos",
    nepali: "निरीक्षण गर्नुहोस्",
  },
  {
    en: "inspire",
    nepaliRoman: "prerita garnuhos",
    nepali: "प्रेरित गर्नुहोस्",
  },
  {
    en: "journey",
    nepaliRoman: "yatra",
    nepali: "यात्रा",
  },
  {
    en: "justice",
    nepaliRoman: "n’yaya",
    nepali: "न्याय",
  },
  {
    en: "leading",
    nepaliRoman: "agrani",
    nepali: "अग्रणी",
  },
  {
    en: "leather",
    nepaliRoman: "chala",
    nepali: "छाला",
  },
  {
    en: "leaving",
    nepaliRoman: "choddai",
    nepali: "छोड्दै",
  },
  {
    en: "lecture",
    nepaliRoman: "vyakhyana",
    nepali: "व्याख्यान",
  },
  {
    en: "liberal",
    nepaliRoman: "udara",
    nepali: "उदार",
  },
  {
    en: "lovable",
    nepaliRoman: "mayalu",
    nepali: "मायालु",
  },
  {
    en: "luggage",
    nepaliRoman: "samana",
    nepali: "सामान",
  },
  {
    en: "manager",
    nepaliRoman: "prabandhaka",
    nepali: "प्रबन्धक",
  },
  {
    en: "maximum",
    nepaliRoman: "adhikatama",
    nepali: "अधिकतम",
  },
  {
    en: "meaning",
    nepaliRoman: "artha",
    nepali: "अर्थ",
  },
  {
    en: "measure",
    nepaliRoman: "mapana",
    nepali: "मापन",
  },
  {
    en: "medical",
    nepaliRoman: "cikitsa",
    nepali: "चिकित्सा",
  },
  {
    en: "message",
    nepaliRoman: "sandesa",
    nepali: "सन्देश",
  },
  {
    en: "migrant",
    nepaliRoman: "pravasi",
    nepali: "प्रवासी",
  },
  {
    en: "mineral",
    nepaliRoman: "khanija",
    nepali: "खनिज",
  },
  {
    en: "minimum",
    nepaliRoman: "n’yunatama",
    nepali: "न्यूनतम",
  },
  {
    en: "miracle",
    nepaliRoman: "camatkara",
    nepali: "चमत्कार",
  },
  {
    en: "missile",
    nepaliRoman: "misa’ila",
    nepali: "मिसाइल",
  },
  {
    en: "missing",
    nepaliRoman: "hara’iraheko",
    nepali: "हराइरहेको",
  },
  {
    en: "mistake",
    nepaliRoman: "galti",
    nepali: "गल्ती",
  },
  {
    en: "morning",
    nepaliRoman: "bihana",
    nepali: "बिहान",
  },
  {
    en: "mustard",
    nepaliRoman: "tori",
    nepali: "तोरी",
  },
  {
    en: "mystery",
    nepaliRoman: "rahasya",
    nepali: "रहस्य",
  },
  {
    en: "narrate",
    nepaliRoman: "varnana garnuhos",
    nepali: "वर्णन गर्नुहोस्",
  },
  {
    en: "natural",
    nepaliRoman: "prakrtika",
    nepali: "प्राकृतिक",
  },
  {
    en: "naughty",
    nepaliRoman: "sararati",
    nepali: "शरारती",
  },
  {
    en: "neglect",
    nepaliRoman: "upeksa",
    nepali: "उपेक्षा",
  },
  {
    en: "neither",
    nepaliRoman: "na ta",
    nepali: "न त",
  },
  {
    en: "nervous",
    nepaliRoman: "narbhasa",
    nepali: "नर्भस",
  },
  {
    en: "network",
    nepaliRoman: "netavarka",
    nepali: "नेटवर्क",
  },
  {
    en: "nothing",
    nepaliRoman: "kehi chaina",
    nepali: "केही छैन",
  },
  {
    en: "observe",
    nepaliRoman: "avalokana garnuhos",
    nepali: "अवलोकन गर्नुहोस्",
  },
  {
    en: "opening",
    nepaliRoman: "udghatana",
    nepali: "उद्घाटन",
  },
  {
    en: "operate",
    nepaliRoman: "sancalana garne",
    nepali: "सञ्चालन गर्ने",
  },
  {
    en: "opinion",
    nepaliRoman: "raya",
    nepali: "राय",
  },
  {
    en: "organic",
    nepaliRoman: "jaivika",
    nepali: "जैविक",
  },
  {
    en: "ostrich",
    nepaliRoman: "astica",
    nepali: "अस्टीच",
  },
  {
    en: "package",
    nepaliRoman: "pyakeja",
    nepali: "प्याकेज",
  },
  {
    en: "painful",
    nepaliRoman: "pidadayi",
    nepali: "पीडादायी",
  },
  {
    en: "partial",
    nepaliRoman: "ansika",
    nepali: "आंशिक",
  },
  {
    en: "passage",
    nepaliRoman: "bato",
    nepali: "बाटो",
  },
  {
    en: "patient",
    nepaliRoman: "birami",
    nepali: "बिरामी",
  },
  {
    en: "payment",
    nepaliRoman: "bhuktani",
    nepali: "भुक्तानी",
  },
  {
    en: "penalty",
    nepaliRoman: "jarivana",
    nepali: "जरिवाना",
  },
  {
    en: "pending",
    nepaliRoman: "vicaradhina",
    nepali: "विचाराधीन",
  },
  {
    en: "penguin",
    nepaliRoman: "pengu’ina",
    nepali: "पेंगुइन",
  },
  {
    en: "pension",
    nepaliRoman: "pensana",
    nepali: "पेन्सन",
  },
  {
    en: "perfect",
    nepaliRoman: "sid’dha",
    nepali: "सिद्ध",
  },
  {
    en: "perfume",
    nepaliRoman: "attara",
    nepali: "अत्तर",
  },
  {
    en: "popular",
    nepaliRoman: "lokapriya",
    nepali: "लोकप्रिय",
  },
  {
    en: "pottery",
    nepaliRoman: "bhamdakumda",
    nepali: "भाँडाकुँडा",
  },
  {
    en: "poverty",
    nepaliRoman: "garibi",
    nepali: "गरिबी",
  },
  {
    en: "prevent",
    nepaliRoman: "rokna",
    nepali: "रोक्न",
  },
  {
    en: "privacy",
    nepaliRoman: "gopaniyata",
    nepali: "गोपनीयता",
  },
  {
    en: "private",
    nepaliRoman: "niji",
    nepali: "निजी",
  },
  {
    en: "problem",
    nepaliRoman: "samasya",
    nepali: "समस्या",
  },
  {
    en: "produce",
    nepaliRoman: "utpadana garna",
    nepali: "उत्पादन गर्न",
  },
  {
    en: "propose",
    nepaliRoman: "prastava",
    nepali: "प्रस्ताव",
  },
  {
    en: "purpose",
    nepaliRoman: "uddesya",
    nepali: "उद्देश्य",
  },
  {
    en: "quality",
    nepaliRoman: "gunastara",
    nepali: "गुणस्तर",
  },
  {
    en: "quickly",
    nepaliRoman: "chito",
    nepali: "छिटो",
  },
  {
    en: "receive",
    nepaliRoman: "prapta garnuhos",
    nepali: "प्राप्त गर्नुहोस्",
  },
  {
    en: "regular",
    nepaliRoman: "niyamita",
    nepali: "नियमित",
  },
  {
    en: "related",
    nepaliRoman: "sambandhita",
    nepali: "सम्बन्धित",
  },
  {
    en: "release",
    nepaliRoman: "rilija",
    nepali: "रिलीज",
  },
  {
    en: "replace",
    nepaliRoman: "pratisthapana",
    nepali: "प्रतिस्थापन",
  },
  {
    en: "reptile",
    nepaliRoman: "sarisrpa",
    nepali: "सरीसृप",
  },
  {
    en: "request",
    nepaliRoman: "anurodha",
    nepali: "अनुरोध",
  },
  {
    en: "respect",
    nepaliRoman: "sam’mana",
    nepali: "सम्मान",
  },
  {
    en: "respond",
    nepaliRoman: "pratikriya dinuhos",
    nepali: "प्रतिक्रिया दिनुहोस्",
  },
  {
    en: "revenge",
    nepaliRoman: "badala",
    nepali: "बदला",
  },
  {
    en: "revenue",
    nepaliRoman: "rajasva",
    nepali: "राजस्व",
  },
  {
    en: "reverse",
    nepaliRoman: "ulto",
    nepali: "उल्टो",
  },
  {
    en: "robbery",
    nepaliRoman: "dakaiti",
    nepali: "डकैती",
  },
  {
    en: "romance",
    nepaliRoman: "romansa",
    nepali: "रोमान्स",
  },
  {
    en: "science",
    nepaliRoman: "vijnana",
    nepali: "विज्ञान",
  },
  {
    en: "serious",
    nepaliRoman: "gambhira",
    nepali: "गम्भीर",
  },
  {
    en: "servant",
    nepaliRoman: "sevaka",
    nepali: "सेवक",
  },
  {
    en: "service",
    nepaliRoman: "seva",
    nepali: "सेवा",
  },
  {
    en: "similar",
    nepaliRoman: "samana",
    nepali: "समान",
  },
  {
    en: "society",
    nepaliRoman: "samaja",
    nepali: "समाज",
  },
  {
    en: "sparrow",
    nepaliRoman: "bhamgera",
    nepali: "भँगेरा",
  },
  {
    en: "special",
    nepaliRoman: "visesa",
    nepali: "विशेष",
  },
  {
    en: "stomach",
    nepaliRoman: "peta",
    nepali: "पेट",
  },
  {
    en: "student",
    nepaliRoman: "vidyarthi",
    nepali: "विद्यार्थी",
  },
  {
    en: "success",
    nepaliRoman: "saphalata",
    nepali: "सफलता",
  },
  {
    en: "suggest",
    nepaliRoman: "sujhava",
    nepali: "सुझाव",
  },
  {
    en: "suicide",
    nepaliRoman: "atmahatya",
    nepali: "आत्महत्या",
  },
  {
    en: "support",
    nepaliRoman: "samarthana",
    nepali: "समर्थन",
  },
  {
    en: "suspend",
    nepaliRoman: "nilambana",
    nepali: "निलम्बन",
  },
  {
    en: "teacher",
    nepaliRoman: "siksaka",
    nepali: "शिक्षक",
  },
  {
    en: "teenage",
    nepaliRoman: "kisora",
    nepali: "किशोर",
  },
  {
    en: "tension",
    nepaliRoman: "tanava",
    nepali: "तनाव",
  },
  {
    en: "tourism",
    nepaliRoman: "paryatana",
    nepali: "पर्यटन",
  },
  {
    en: "trouble",
    nepaliRoman: "samasya",
    nepali: "समस्या",
  },
  {
    en: "uniform",
    nepaliRoman: "vardi",
    nepali: "वर्दी",
  },
  {
    en: "utility",
    nepaliRoman: "upayogita",
    nepali: "उपयोगिता",
  },
  {
    en: "vacancy",
    nepaliRoman: "riktata",
    nepali: "रिक्तता",
  },
  {
    en: "variety",
    nepaliRoman: "vividhata",
    nepali: "विविधता",
  },
  {
    en: "vehicle",
    nepaliRoman: "savari sadhana",
    nepali: "सवारी साधन",
  },
  {
    en: "village",
    nepaliRoman: "ga’um",
    nepali: "गाउँ",
  },
  {
    en: "vintage",
    nepaliRoman: "purano",
    nepali: "पुरानो",
  },
  {
    en: "victory",
    nepaliRoman: "vijaya",
    nepali: "विजय",
  },
  {
    en: "violent",
    nepaliRoman: "hinsatmaka",
    nepali: "हिंसात्मक",
  },
  {
    en: "visible",
    nepaliRoman: "dekhine",
    nepali: "देखिने",
  },
  {
    en: "visitor",
    nepaliRoman: "agantuka",
    nepali: "आगन्तुक",
  },
  {
    en: "vitamin",
    nepaliRoman: "bhitamina",
    nepali: "भिटामिन",
  },
  {
    en: "walking",
    nepaliRoman: "hiddai",
    nepali: "हिड्दै",
  },
  {
    en: "wanting",
    nepaliRoman: "cahane",
    nepali: "चाहने",
  },
  {
    en: "warning",
    nepaliRoman: "cetavani",
    nepali: "चेतावनी",
  },
  {
    en: "wealthy",
    nepaliRoman: "dhani",
    nepali: "धनी",
  },
  {
    en: "weather",
    nepaliRoman: "mausama",
    nepali: "मौसम",
  },
  {
    en: "wedding",
    nepaliRoman: "vivaha",
    nepali: "विवाह",
  },
  {
    en: "welcome",
    nepaliRoman: "svagata cha",
    nepali: "स्वागत छ",
  },
  {
    en: "welfare",
    nepaliRoman: "kalyana",
    nepali: "कल्याण",
  },
  {
    en: "winning",
    nepaliRoman: "jitdai",
    nepali: "जित्दै",
  },
  {
    en: "working",
    nepaliRoman: "kama gardai",
    nepali: "काम गर्दै",
  },
  {
    en: "worried",
    nepaliRoman: "cintita",
    nepali: "चिन्तित",
  },
  {
    en: "worship",
    nepaliRoman: "puja",
    nepali: "पूजा",
  },
  {
    en: "writing",
    nepaliRoman: "lekhana",
    nepali: "लेखन",
  },
  {
    en: "abnormal",
    nepaliRoman: "asaman’ya",
    nepali: "असामान्य",
  },
  {
    en: "absolute",
    nepaliRoman: "nirapeksa",
    nepali: "निरपेक्ष",
  },
  {
    en: "accepted",
    nepaliRoman: "svikara gariyo",
    nepali: "स्वीकार गरियो",
  },
  {
    en: "accident",
    nepaliRoman: "durghatana",
    nepali: "दुर्घटना",
  },
  {
    en: "accuracy",
    nepaliRoman: "sud’dhata",
    nepali: "शुद्धता",
  },
  {
    en: "activate",
    nepaliRoman: "sakriya garnuhos",
    nepali: "सक्रिय गर्नुहोस्",
  },
  {
    en: "addition",
    nepaliRoman: "thapa",
    nepali: "थप",
  },
  {
    en: "adequate",
    nepaliRoman: "paryapta",
    nepali: "पर्याप्त",
  },
  {
    en: "affected",
    nepaliRoman: "prabhavita",
    nepali: "प्रभावित",
  },
  {
    en: "alphabet",
    nepaliRoman: "varnamala",
    nepali: "वर्णमाला",
  },
  {
    en: "anything",
    nepaliRoman: "kehi pani",
    nepali: "केहि पनि",
  },
  {
    en: "anywhere",
    nepaliRoman: "jaham pani",
    nepali: "जहाँ पनि",
  },
  {
    en: "appraise",
    nepaliRoman: "mulyankana",
    nepali: "मूल्यांकन",
  },
  {
    en: "approach",
    nepaliRoman: "drstikona",
    nepali: "दृष्टिकोण",
  },
  {
    en: "approval",
    nepaliRoman: "svikrti",
    nepali: "स्वीकृति",
  },
  {
    en: "argument",
    nepaliRoman: "tarka",
    nepali: "तर्क",
  },
  {
    en: "assemble",
    nepaliRoman: "jam’ma garnuhos",
    nepali: "जम्मा गर्नुहोस्",
  },
  {
    en: "attitude",
    nepaliRoman: "manovrtti",
    nepali: "मनोवृत्ति",
  },
  {
    en: "audience",
    nepaliRoman: "darsaka",
    nepali: "दर्शक",
  },
  {
    en: "attorney",
    nepaliRoman: "vakila",
    nepali: "वकील",
  },
  {
    en: "aviation",
    nepaliRoman: "uddayana",
    nepali: "उड्डयन",
  },
  {
    en: "backward",
    nepaliRoman: "pachadi",
    nepali: "पछाडि",
  },
  {
    en: "beginner",
    nepaliRoman: "suru’ati",
    nepali: "शुरुआती",
  },
  {
    en: "birthday",
    nepaliRoman: "janmadina",
    nepali: "जन्मदिन",
  },
  {
    en: "bleeding",
    nepaliRoman: "raktasrava",
    nepali: "रक्तस्राव",
  },
  {
    en: "building",
    nepaliRoman: "bhavana",
    nepali: "भवन",
  },
  {
    en: "campaign",
    nepaliRoman: "abhiyana",
    nepali: "अभियान",
  },
  {
    en: "carriage",
    nepaliRoman: "gadi",
    nepali: "गाडी",
  },
  {
    en: "children",
    nepaliRoman: "baccaharu",
    nepali: "बच्चाहरु",
  },
  {
    en: "cleavage",
    nepaliRoman: "darara",
    nepali: "दरार",
  },
  {
    en: "complete",
    nepaliRoman: "pura",
    nepali: "पूरा",
  },
  {
    en: "conserve",
    nepaliRoman: "sanraksana garne",
    nepali: "संरक्षण गर्ने",
  },
  {
    en: "consider",
    nepaliRoman: "vicara garnuhos",
    nepali: "विचार गर्नुहोस्",
  },
  {
    en: "consumer",
    nepaliRoman: "upabhokta",
    nepali: "उपभोक्ता",
  },
  {
    en: "continue",
    nepaliRoman: "jari rakhnuhos",
    nepali: "जारी राख्नुहोस्",
  },
  {
    en: "criminal",
    nepaliRoman: "aparadhi",
    nepali: "अपराधी",
  },
  {
    en: "critical",
    nepaliRoman: "alocanatmaka",
    nepali: "आलोचनात्मक",
  },
  {
    en: "daughter",
    nepaliRoman: "chori",
    nepali: "छोरी",
  },
  {
    en: "decision",
    nepaliRoman: "nirnaya",
    nepali: "निर्णय",
  },
  {
    en: "decrease",
    nepaliRoman: "ghatnu",
    nepali: "घट्नु",
  },
  {
    en: "delicate",
    nepaliRoman: "najuka",
    nepali: "नाजुक",
  },
  {
    en: "delivery",
    nepaliRoman: "delibhari",
    nepali: "डेलिभरी",
  },
  {
    en: "delusion",
    nepaliRoman: "bhrama",
    nepali: "भ्रम",
  },
  {
    en: "describe",
    nepaliRoman: "varnana garnuhos",
    nepali: "वर्णन गर्नुहोस्",
  },
  {
    en: "disagree",
    nepaliRoman: "asahamata",
    nepali: "असहमत",
  },
  {
    en: "disallow",
    nepaliRoman: "asvikara garne",
    nepali: "अस्वीकार गर्ने",
  },
  {
    en: "duration",
    nepaliRoman: "avadhi",
    nepali: "अवधि",
  },
  {
    en: "economic",
    nepaliRoman: "arthika",
    nepali: "आर्थिक",
  },
  {
    en: "elephant",
    nepaliRoman: "hatti",
    nepali: "हात्ती",
  },
  {
    en: "eligible",
    nepaliRoman: "yogya",
    nepali: "योग्य",
  },
  {
    en: "employee",
    nepaliRoman: "karmacari",
    nepali: "कर्मचारी",
  },
  {
    en: "enormous",
    nepaliRoman: "visala",
    nepali: "विशाल",
  },
  {
    en: "entrance",
    nepaliRoman: "pravesa dvara",
    nepali: "प्रवेश द्वार",
  },
  {
    en: "envelope",
    nepaliRoman: "khama",
    nepali: "खाम",
  },
  {
    en: "estimate",
    nepaliRoman: "anumana",
    nepali: "अनुमान",
  },
  {
    en: "everyday",
    nepaliRoman: "dainika",
    nepali: "दैनिक",
  },
  {
    en: "exercise",
    nepaliRoman: "vyayama",
    nepali: "व्यायाम",
  },
  {
    en: "explicit",
    nepaliRoman: "spasta",
    nepali: "स्पष्ट",
  },
  {
    en: "exposure",
    nepaliRoman: "sankramana",
    nepali: "संक्रमण",
  },
  {
    en: "external",
    nepaliRoman: "bahya",
    nepali: "बाह्य",
  },
  {
    en: "facility",
    nepaliRoman: "suvidha",
    nepali: "सुविधा",
  },
  {
    en: "faithful",
    nepaliRoman: "visvasi",
    nepali: "विश्वासी",
  },
  {
    en: "favorite",
    nepaliRoman: "manaparne",
    nepali: "मनपर्ने",
  },
  {
    en: "favorite",
    nepaliRoman: "manaparne",
    nepali: "मनपर्ने",
  },
  {
    en: "festival",
    nepaliRoman: "utsava",
    nepali: "उत्सव",
  },
  {
    en: "flexible",
    nepaliRoman: "lacilo",
    nepali: "लचिलो",
  },
  {
    en: "friction",
    nepaliRoman: "gharsana",
    nepali: "घर्षण",
  },
  {
    en: "generate",
    nepaliRoman: "utpanna garnuhos",
    nepali: "उत्पन्न गर्नुहोस्",
  },
  {
    en: "greeting",
    nepaliRoman: "abhivadana",
    nepali: "अभिवादन",
  },
  {
    en: "guardian",
    nepaliRoman: "sanraksaka",
    nepali: "संरक्षक",
  },
  {
    en: "heritage",
    nepaliRoman: "virasata",
    nepali: "विरासत",
  },
  {
    en: "horrible",
    nepaliRoman: "bhayanaka",
    nepali: "भयानक",
  },
  {
    en: "hospital",
    nepaliRoman: "aspatala",
    nepali: "अस्पताल",
  },
  {
    en: "humorous",
    nepaliRoman: "hasyaspada",
    nepali: "हास्यास्पद",
  },
  {
    en: "identity",
    nepaliRoman: "pahicana",
    nepali: "पहिचान",
  },
  {
    en: "incident",
    nepaliRoman: "ghatana",
    nepali: "घटना",
  },
  {
    en: "increase",
    nepaliRoman: "badhnu",
    nepali: "बढ्नु",
  },
  {
    en: "indicate",
    nepaliRoman: "sanketa garnuhos",
    nepali: "संकेत गर्नुहोस्",
  },
  {
    en: "industry",
    nepaliRoman: "udyoga",
    nepali: "उद्योग",
  },
  {
    en: "jealousy",
    nepaliRoman: "irsya",
    nepali: "ईर्ष्या",
  },
  {
    en: "learning",
    nepaliRoman: "sikne",
    nepali: "सिक्ने",
  },
  {
    en: "location",
    nepaliRoman: "sthana",
    nepali: "स्थान",
  },
  {
    en: "majority",
    nepaliRoman: "bahumata",
    nepali: "बहुमत",
  },
  {
    en: "marriage",
    nepaliRoman: "vivaha",
    nepali: "विवाह",
  },
  {
    en: "material",
    nepaliRoman: "samagri",
    nepali: "सामग्री",
  },
  {
    en: "medicine",
    nepaliRoman: "ausadhi",
    nepali: "औषधी",
  },
  {
    en: "moderate",
    nepaliRoman: "madhyama",
    nepali: "मध्यम",
  },
  {
    en: "mosquito",
    nepaliRoman: "lamakhutte",
    nepali: "लामखुट्टे",
  },
  {
    en: "mountain",
    nepaliRoman: "pahada",
    nepali: "पहाड",
  },
  {
    en: "narrator",
    nepaliRoman: "kathakara",
    nepali: "कथाकार",
  },
  {
    en: "nutrient",
    nepaliRoman: "posaka tatva",
    nepali: "पोषक तत्व",
  },
  {
    en: "opposite",
    nepaliRoman: "viparita",
    nepali: "विपरीत",
  },
  {
    en: "original",
    nepaliRoman: "maulika",
    nepali: "मौलिक",
  },
  {
    en: "ornament",
    nepaliRoman: "abhusana",
    nepali: "आभूषण",
  },
  {
    en: "painting",
    nepaliRoman: "citrakari",
    nepali: "चित्रकारी",
  },
  {
    en: "particle",
    nepaliRoman: "kana",
    nepali: "कण",
  },
  {
    en: "patience",
    nepaliRoman: "dhairya",
    nepali: "धैर्य",
  },
  {
    en: "pleasure",
    nepaliRoman: "ananda",
    nepali: "आनन्द",
  },
  {
    en: "position",
    nepaliRoman: "sthiti",
    nepali: "स्थिति",
  },
  {
    en: "positive",
    nepaliRoman: "sakaratmaka",
    nepali: "सकारात्मक",
  },
  {
    en: "possible",
    nepaliRoman: "sambhava cha",
    nepali: "सम्भव छ",
  },
  {
    en: "postpone",
    nepaliRoman: "sthagita",
    nepali: "स्थगित",
  },
  {
    en: "powerful",
    nepaliRoman: "saktisali",
    nepali: "शक्तिशाली",
  },
  {
    en: "precious",
    nepaliRoman: "bahumulya",
    nepali: "बहुमूल्य",
  },
  {
    en: "pregnant",
    nepaliRoman: "garbhavati",
    nepali: "गर्भवती",
  },
  {
    en: "pressure",
    nepaliRoman: "dababa",
    nepali: "दबाब",
  },
  {
    en: "previous",
    nepaliRoman: "aghillo",
    nepali: "अघिल्लो",
  },
  {
    en: "progress",
    nepaliRoman: "pragati",
    nepali: "प्रगति",
  },
  {
    en: "prohibit",
    nepaliRoman: "nisedha garne",
    nepali: "निषेध गर्ने",
  },
  {
    en: "property",
    nepaliRoman: "sampatti",
    nepali: "सम्पत्ति",
  },
  {
    en: "purchase",
    nepaliRoman: "kharida",
    nepali: "खरिद",
  },
  {
    en: "quantity",
    nepaliRoman: "matra",
    nepali: "मात्रा",
  },
  {
    en: "recovery",
    nepaliRoman: "rikabhari",
    nepali: "रिकभरी",
  },
  {
    en: "regional",
    nepaliRoman: "ksetriya",
    nepali: "क्षेत्रीय",
  },
  {
    en: "relevant",
    nepaliRoman: "sandarbhika",
    nepali: "सान्दर्भिक",
  },
  {
    en: "religion",
    nepaliRoman: "dharma",
    nepali: "धर्म",
  },
  {
    en: "remember",
    nepaliRoman: "samjhanu",
    nepali: "सम्झनु",
  },
  {
    en: "research",
    nepaliRoman: "anusandhana",
    nepali: "अनुसन्धान",
  },
  {
    en: "resource",
    nepaliRoman: "srota",
    nepali: "स्रोत",
  },
  {
    en: "response",
    nepaliRoman: "pratikriya",
    nepali: "प्रतिक्रिया",
  },
  {
    en: "restrict",
    nepaliRoman: "pratibandha",
    nepali: "प्रतिबन्ध",
  },
  {
    en: "revision",
    nepaliRoman: "sansodhana",
    nepali: "संशोधन",
  },
  {
    en: "sensible",
    nepaliRoman: "samajhadara",
    nepali: "समझदार",
  },
  {
    en: "sentence",
    nepaliRoman: "vakya",
    nepali: "वाक्य",
  },
  {
    en: "separate",
    nepaliRoman: "alaga",
    nepali: "अलग",
  },
  {
    en: "stranger",
    nepaliRoman: "aparicita",
    nepali: "अपरिचित",
  },
  {
    en: "strategy",
    nepaliRoman: "rananiti",
    nepali: "रणनीति",
  },
  {
    en: "strength",
    nepaliRoman: "sakti",
    nepali: "शक्ति",
  },
  {
    en: "struggle",
    nepaliRoman: "sangharsa",
    nepali: "संघर्ष",
  },
  {
    en: "suitable",
    nepaliRoman: "upayukta",
    nepali: "उपयुक्त",
  },
  {
    en: "superior",
    nepaliRoman: "ucca",
    nepali: "उच्च",
  },
  {
    en: "surprise",
    nepaliRoman: "ascarya",
    nepali: "आश्चर्य",
  },
  {
    en: "swelling",
    nepaliRoman: "sunnine",
    nepali: "सुन्निने",
  },
  {
    en: "terrible",
    nepaliRoman: "bhayanaka",
    nepali: "भयानक",
  },
  {
    en: "together",
    nepaliRoman: "samgai",
    nepali: "सँगै",
  },
  {
    en: "tomorrow",
    nepaliRoman: "bholi",
    nepali: "भोलि",
  },
  {
    en: "training",
    nepaliRoman: "prasiksana",
    nepali: "प्रशिक्षण",
  },
  {
    en: "transfer",
    nepaliRoman: "sthanantarana",
    nepali: "स्थानान्तरण",
  },
  {
    en: "transmit",
    nepaliRoman: "prasarana",
    nepali: "प्रसारण",
  },
  {
    en: "treasure",
    nepaliRoman: "khajana",
    nepali: "खजाना",
  },
  {
    en: "umbrella",
    nepaliRoman: "chata",
    nepali: "छाता",
  },
  {
    en: "universe",
    nepaliRoman: "brahmanda",
    nepali: "ब्रह्माण्ड",
  },
  {
    en: "vacation",
    nepaliRoman: "chutti",
    nepali: "छुट्टी",
  },
  {
    en: "validate",
    nepaliRoman: "pramanita garnuhos",
    nepali: "प्रमाणित गर्नुहोस्",
  },
  {
    en: "vertical",
    nepaliRoman: "thado",
    nepali: "ठाडो",
  },
  {
    en: "vigorous",
    nepaliRoman: "baliyo",
    nepali: "बलियो",
  },
  {
    en: "violence",
    nepaliRoman: "hinsa",
    nepali: "हिंसा",
  },
  {
    en: "vocation",
    nepaliRoman: "pesa",
    nepali: "पेशा",
  },
  {
    en: "vomiting",
    nepaliRoman: "vanta",
    nepali: "वान्ता",
  },
  {
    en: "wildlife",
    nepaliRoman: "van’yajantu",
    nepali: "वन्यजन्तु",
  },
  {
    en: "yielding",
    nepaliRoman: "upaja",
    nepali: "उपज",
  },
  {
    en: "yourself",
    nepaliRoman: "aphaila’i",
    nepali: "आफैलाई",
  },
  {
    en: "youthful",
    nepaliRoman: "yuva",
    nepali: "युवा",
  },
  {
    en: "accession",
    nepaliRoman: "pravesa",
    nepali: "प्रवेश",
  },
  {
    en: "accessory",
    nepaliRoman: "sahayaka",
    nepali: "सहायक",
  },
  {
    en: "accompany",
    nepaliRoman: "satha dine",
    nepali: "साथ दिने",
  },
  {
    en: "actualize",
    nepaliRoman: "vastavika bana’unuhos",
    nepali: "वास्तविक बनाउनुहोस्",
  },
  {
    en: "admirable",
    nepaliRoman: "prasansaniya",
    nepali: "प्रशंसनीय",
  },
  {
    en: "advantage",
    nepaliRoman: "pha’ida",
    nepali: "फाइदा",
  },
  {
    en: "advisable",
    nepaliRoman: "ucita",
    nepali: "उचित",
  },
  {
    en: "affection",
    nepaliRoman: "sneha",
    nepali: "स्नेह",
  },
  {
    en: "affiliate",
    nepaliRoman: "sambad’dha",
    nepali: "सम्बद्ध",
  },
  {
    en: "afternoon",
    nepaliRoman: "di’umso",
    nepali: "दिउँसो",
  },
  {
    en: "aggregate",
    nepaliRoman: "kula",
    nepali: "कुल",
  },
  {
    en: "agreement",
    nepaliRoman: "samjhauta",
    nepali: "सम्झौता",
  },
  {
    en: "allowance",
    nepaliRoman: "bhatta",
    nepali: "भत्ता",
  },
  {
    en: "alternate",
    nepaliRoman: "vaikalpika",
    nepali: "वैकल्पिक",
  },
  {
    en: "ambiguous",
    nepaliRoman: "aspasta",
    nepali: "अस्पष्ट",
  },
  {
    en: "animation",
    nepaliRoman: "enimesana",
    nepali: "एनिमेसन",
  },
  {
    en: "apologist",
    nepaliRoman: "maphi magne",
    nepali: "माफी माग्ने",
  },
  {
    en: "applicant",
    nepaliRoman: "avedaka",
    nepali: "आवेदक",
  },
  {
    en: "architect",
    nepaliRoman: "naksa va ruparekha tayara parne vyakti",
    nepali: "नक्शा वा रुपरेखा तयार पार्ने व्यक्ति",
  },
  {
    en: "associate",
    nepaliRoman: "sahayogi",
    nepali: "सहयोगी",
  },
  {
    en: "astronomy",
    nepaliRoman: "khagola vijnana",
    nepali: "खगोल विज्ञान",
  },
  {
    en: "attention",
    nepaliRoman: "dhyana",
    nepali: "ध्यान",
  },
  {
    en: "attribute",
    nepaliRoman: "visesata",
    nepali: "विशेषता",
  },
  {
    en: "authority",
    nepaliRoman: "adhikara",
    nepali: "अधिकार",
  },
  {
    en: "automatic",
    nepaliRoman: "svacalita",
    nepali: "स्वचालित",
  },
  {
    en: "available",
    nepaliRoman: "upalabdha",
    nepali: "उपलब्ध",
  },
  {
    en: "awareness",
    nepaliRoman: "jagarukata",
    nepali: "जागरूकता",
  },
  {
    en: "beautiful",
    nepaliRoman: "sundara",
    nepali: "सुन्दर",
  },
  {
    en: "behaviour",
    nepaliRoman: "vyavahara",
    nepali: "व्यवहार",
  },
  {
    en: "butterfly",
    nepaliRoman: "putali",
    nepali: "पुतली",
  },
  {
    en: "calibrate",
    nepaliRoman: "kyalibreta garnuhos",
    nepali: "क्यालिब्रेट गर्नुहोस्",
  },
  {
    en: "candidate",
    nepaliRoman: "um’medavara",
    nepali: "उम्मेदवार",
  },
  {
    en: "celebrate",
    nepaliRoman: "mana’une",
    nepali: "मनाउने",
  },
  {
    en: "challenge",
    nepaliRoman: "cunauti",
    nepali: "चुनौती",
  },
  {
    en: "confident",
    nepaliRoman: "visvasta",
    nepali: "विश्वस्त",
  },
  {
    en: "confusion",
    nepaliRoman: "bhrama",
    nepali: "भ्रम",
  },
  {
    en: "conscious",
    nepaliRoman: "saceta",
    nepali: "सचेत",
  },
  {
    en: "crocodile",
    nepaliRoman: "gohi",
    nepali: "गोही",
  },
  {
    en: "curiosity",
    nepaliRoman: "jijnasa",
    nepali: "जिज्ञासा",
  },
  {
    en: "dangerous",
    nepaliRoman: "khataranaka",
    nepali: "खतरनाक",
  },
  {
    en: "delicious",
    nepaliRoman: "svadista",
    nepali: "स्वादिष्ट",
  },
  {
    en: "democracy",
    nepaliRoman: "lokatantra",
    nepali: "लोकतन्त्र",
  },
  {
    en: "dependent",
    nepaliRoman: "nirbhara",
    nepali: "निर्भर",
  },
  {
    en: "different",
    nepaliRoman: "pharaka",
    nepali: "फरक",
  },
  {
    en: "difficult",
    nepaliRoman: "gahro",
    nepali: "गाह्रो",
  },
  {
    en: "discovery",
    nepaliRoman: "khoja",
    nepali: "खोज",
  },
  {
    en: "dishonest",
    nepaliRoman: "be’imana",
    nepali: "बेइमान",
  },
  {
    en: "diversity",
    nepaliRoman: "vividhata",
    nepali: "विविधता",
  },
  {
    en: "duplicate",
    nepaliRoman: "nakkala",
    nepali: "नक्कल",
  },
  {
    en: "education",
    nepaliRoman: "siksa",
    nepali: "शिक्षा",
  },
  {
    en: "effective",
    nepaliRoman: "prabhavakari",
    nepali: "प्रभावकारी",
  },
  {
    en: "emergency",
    nepaliRoman: "apatakalina",
    nepali: "आपतकालीन",
  },
  {
    en: "equipment",
    nepaliRoman: "upakarana",
    nepali: "उपकरण",
  },
  {
    en: "essential",
    nepaliRoman: "avasyaka",
    nepali: "आवश्यक",
  },
  {
    en: "establish",
    nepaliRoman: "sthapana",
    nepali: "स्थापना",
  },
  {
    en: "evolution",
    nepaliRoman: "vikasa",
    nepali: "विकास",
  },
  {
    en: "excellent",
    nepaliRoman: "utkrsta",
    nepali: "उत्कृष्ट",
  },
  {
    en: "expensive",
    nepaliRoman: "mahamgo",
    nepali: "महँगो",
  },
  {
    en: "fantastic",
    nepaliRoman: "sanadara",
    nepali: "शानदार",
  },
  {
    en: "fertility",
    nepaliRoman: "prajanana ksamata",
    nepali: "प्रजनन क्षमता",
  },
  {
    en: "financial",
    nepaliRoman: "vittiya",
    nepali: "वित्तीय",
  },
  {
    en: "generally",
    nepaliRoman: "sadharanataya",
    nepali: "साधारणतया",
  },
  {
    en: "glamorous",
    nepaliRoman: "akarsaka",
    nepali: "आकर्षक",
  },
  {
    en: "happening",
    nepaliRoman: "bha’iraheko cha",
    nepali: "भइरहेको छ",
  },
  {
    en: "household",
    nepaliRoman: "gharaparivara",
    nepali: "घरपरिवार",
  },
  {
    en: "identical",
    nepaliRoman: "samana",
    nepali: "समान",
  },
  {
    en: "important",
    nepaliRoman: "mahattvapurna",
    nepali: "महत्त्वपूर्ण",
  },
  {
    en: "incorrect",
    nepaliRoman: "galata",
    nepali: "गलत",
  },
  {
    en: "incorrupt",
    nepaliRoman: "asud’dha",
    nepali: "अशुद्ध",
  },
  {
    en: "influence",
    nepaliRoman: "prabhava",
    nepali: "प्रभाव",
  },
  {
    en: "insurance",
    nepaliRoman: "bima",
    nepali: "बीमा",
  },
  {
    en: "interview",
    nepaliRoman: "antarvarta",
    nepali: "अन्तर्वार्ता",
  },
  {
    en: "intestine",
    nepaliRoman: "andra",
    nepali: "आन्द्रा",
  },
  {
    en: "introduce",
    nepaliRoman: "paricaya",
    nepali: "परिचय",
  },
  {
    en: "invention",
    nepaliRoman: "aviskara",
    nepali: "आविष्कार",
  },
  {
    en: "invisible",
    nepaliRoman: "adrsya",
    nepali: "अदृश्य",
  },
  {
    en: "irregular",
    nepaliRoman: "aniyamita",
    nepali: "अनियमित",
  },
  {
    en: "jewellery",
    nepaliRoman: "gahana",
    nepali: "गहना",
  },
  {
    en: "knowledge",
    nepaliRoman: "jnana",
    nepali: "ज्ञान",
  },
  {
    en: "liability",
    nepaliRoman: "dayitva",
    nepali: "दायित्व",
  },
  {
    en: "misbehave",
    nepaliRoman: "durvyavahara",
    nepali: "दुर्व्यवहार",
  },
  {
    en: "narration",
    nepaliRoman: "kathana",
    nepali: "कथन",
  },
  {
    en: "necessity",
    nepaliRoman: "avasyakata",
    nepali: "आवश्यकता",
  },
  {
    en: "negotiate",
    nepaliRoman: "varta",
    nepali: "वार्ता",
  },
  {
    en: "nutrition",
    nepaliRoman: "posana",
    nepali: "पोषण",
  },
  {
    en: "offensive",
    nepaliRoman: "apattijanaka",
    nepali: "आपत्तिजनक",
  },
  {
    en: "partition",
    nepaliRoman: "vibhajana",
    nepali: "विभाजन",
  },
  {
    en: "political",
    nepaliRoman: "rajanitika",
    nepali: "राजनीतिक",
  },
  {
    en: "pollution",
    nepaliRoman: "pradusana",
    nepali: "प्रदूषण",
  },
  {
    en: "potential",
    nepaliRoman: "sambhavyata",
    nepali: "सम्भाव्यता",
  },
  {
    en: "practical",
    nepaliRoman: "vyavaharika",
    nepali: "व्यावहारिक",
  },
  {
    en: "precision",
    nepaliRoman: "parisud’dhata",
    nepali: "परिशुद्धता",
  },
  {
    en: "privilege",
    nepaliRoman: "visesadhikara",
    nepali: "विशेषाधिकार",
  },
  {
    en: "procedure",
    nepaliRoman: "prakriya",
    nepali: "प्रक्रिया",
  },
  {
    en: "prominent",
    nepaliRoman: "pramukha",
    nepali: "प्रमुख",
  },
  {
    en: "professor",
    nepaliRoman: "prophesara",
    nepali: "प्रोफेसर",
  },
  {
    en: "promotion",
    nepaliRoman: "padonnati",
    nepali: "पदोन्नति",
  },
  {
    en: "provoking",
    nepaliRoman: "uttejaka",
    nepali: "उत्तेजक",
  },
  {
    en: "qualified",
    nepaliRoman: "yogya",
    nepali: "योग्य",
  },
  {
    en: "reference",
    nepaliRoman: "sandarbha",
    nepali: "सन्दर्भ",
  },
  {
    en: "repulsion",
    nepaliRoman: "pratikarsana",
    nepali: "प्रतिकर्षण",
  },
  {
    en: "residence",
    nepaliRoman: "nivasa",
    nepali: "निवास",
  },
  {
    en: "sacrifice",
    nepaliRoman: "balidana",
    nepali: "बलिदान",
  },
  {
    en: "sensitive",
    nepaliRoman: "sanvedanasila",
    nepali: "संवेदनशील",
  },
  {
    en: "something",
    nepaliRoman: "kehi",
    nepali: "केहि",
  },
  {
    en: "statement",
    nepaliRoman: "kathana",
    nepali: "कथन",
  },
  {
    en: "subscribe",
    nepaliRoman: "sadasyata linuhos",
    nepali: "सदस्यता लिनुहोस्",
  },
  {
    en: "substance",
    nepaliRoman: "padartha",
    nepali: "पदार्थ",
  },
  {
    en: "sugarcane",
    nepaliRoman: "ukhu",
    nepali: "उखु",
  },
  {
    en: "sunflower",
    nepaliRoman: "suryamukhi",
    nepali: "सूर्यमुखी",
  },
  {
    en: "surrender",
    nepaliRoman: "atmasamarpana",
    nepali: "आत्मसमर्पण",
  },
  {
    en: "technical",
    nepaliRoman: "pravidhika",
    nepali: "प्राविधिक",
  },
  {
    en: "temporary",
    nepaliRoman: "asthayi",
    nepali: "अस्थायी",
  },
  {
    en: "terrorist",
    nepaliRoman: "atankavadi",
    nepali: "आतंकवादी",
  },
  {
    en: "treatment",
    nepaliRoman: "upacara",
    nepali: "उपचार",
  },
  {
    en: "variation",
    nepaliRoman: "bhinnata",
    nepali: "भिन्नता",
  },
  {
    en: "vegetable",
    nepaliRoman: "sagasabji",
    nepali: "सागसब्जी",
  },
  {
    en: "virginity",
    nepaliRoman: "kumaritva",
    nepali: "कुमारीत्व",
  },
  {
    en: "yesterday",
    nepaliRoman: "hijo",
    nepali: "हिजो",
  },
  {
    en: "abbreviate",
    nepaliRoman: "sanksipta",
    nepali: "संक्षिप्त",
  },
  {
    en: "absolutely",
    nepaliRoman: "bilkula",
    nepali: "बिल्कुल",
  },
  {
    en: "absorption",
    nepaliRoman: "avasosana",
    nepali: "अवशोषण",
  },
  {
    en: "acceptable",
    nepaliRoman: "svikarya",
    nepali: "स्वीकार्य",
  },
  {
    en: "achievable",
    nepaliRoman: "prapta garna sakine",
    nepali: "प्राप्त गर्न सकिने",
  },
  {
    en: "additional",
    nepaliRoman: "atirikta",
    nepali: "अतिरिक्त",
  },
  {
    en: "admiration",
    nepaliRoman: "prasansa",
    nepali: "प्रशंसा",
  },
  {
    en: "adolescent",
    nepaliRoman: "kisora",
    nepali: "किशोर",
  },
  {
    en: "adulterant",
    nepaliRoman: "misavata garne",
    nepali: "मिसावट गर्ने",
  },
  {
    en: "adventurer",
    nepaliRoman: "sahasi",
    nepali: "साहसी",
  },
  {
    en: "afterwards",
    nepaliRoman: "pachi",
    nepali: "पछि",
  },
  {
    en: "aggression",
    nepaliRoman: "akramakata",
    nepali: "आक्रामकता",
  },
  {
    en: "alteration",
    nepaliRoman: "parivartana",
    nepali: "परिवर्तन",
  },
  {
    en: "ambassador",
    nepaliRoman: "rajaduta",
    nepali: "राजदूत",
  },
  {
    en: "analytical",
    nepaliRoman: "vislesanatmaka",
    nepali: "विश्लेषणात्मक",
  },
  {
    en: "antibiotic",
    nepaliRoman: "entibayotika",
    nepali: "एन्टिबायोटिक",
  },
  {
    en: "anticipate",
    nepaliRoman: "anumana garnu",
    nepali: "अनुमान गर्नु",
  },
  {
    en: "appreciate",
    nepaliRoman: "kadara garchaum",
    nepali: "कदर गर्छौं",
  },
  {
    en: "artificial",
    nepaliRoman: "krtrima",
    nepali: "कृत्रिम",
  },
  {
    en: "aspiration",
    nepaliRoman: "akanksa",
    nepali: "आकांक्षा",
  },
  {
    en: "assignment",
    nepaliRoman: "asa’inamenta",
    nepali: "असाइनमेन्ट",
  },
  {
    en: "atmosphere",
    nepaliRoman: "vatavarana",
    nepali: "वातावरण",
  },
  {
    en: "attachment",
    nepaliRoman: "sanlagnaka",
    nepali: "संलग्नक",
  },
  {
    en: "attraction",
    nepaliRoman: "akarsana",
    nepali: "आकर्षण",
  },
  {
    en: "chloroform",
    nepaliRoman: "kloropharma",
    nepali: "क्लोरोफर्म",
  },
  {
    en: "combustion",
    nepaliRoman: "dahana",
    nepali: "दहन",
  },
  {
    en: "commission",
    nepaliRoman: "ayoga",
    nepali: "आयोग",
  },
  {
    en: "compassion",
    nepaliRoman: "karuna",
    nepali: "करुणा",
  },
  {
    en: "compulsory",
    nepaliRoman: "anivarya",
    nepali: "अनिवार्य",
  },
  {
    en: "conclusion",
    nepaliRoman: "niskarsa",
    nepali: "निष्कर्ष",
  },
  {
    en: "confection",
    nepaliRoman: "mitha’i",
    nepali: "मिठाई",
  },
  {
    en: "corruption",
    nepaliRoman: "bhrastacara",
    nepali: "भ्रष्टाचार",
  },
  {
    en: "decoration",
    nepaliRoman: "sajavata",
    nepali: "सजावट",
  },
  {
    en: "dedication",
    nepaliRoman: "samarpana",
    nepali: "समर्पण",
  },
  {
    en: "deficiency",
    nepaliRoman: "kami",
    nepali: "कमी",
  },
  {
    en: "definition",
    nepaliRoman: "paribhasa",
    nepali: "परिभाषा",
  },
  {
    en: "department",
    nepaliRoman: "vibhaga",
    nepali: "विभाग",
  },
  {
    en: "depression",
    nepaliRoman: "avasada",
    nepali: "अवसाद",
  },
  {
    en: "dictionary",
    nepaliRoman: "sabdakosa",
    nepali: "शब्दकोश",
  },
  {
    en: "discipline",
    nepaliRoman: "anusasana",
    nepali: "अनुशासन",
  },
  {
    en: "disclaimer",
    nepaliRoman: "asvikarana",
    nepali: "अस्वीकरण",
  },
  {
    en: "disclosure",
    nepaliRoman: "khulasa",
    nepali: "खुलासा",
  },
  {
    en: "discussion",
    nepaliRoman: "chalaphala",
    nepali: "छलफल",
  },
  {
    en: "efficiency",
    nepaliRoman: "daksata",
    nepali: "दक्षता",
  },
  {
    en: "employment",
    nepaliRoman: "rojagari",
    nepali: "रोजगारी",
  },
  {
    en: "engagement",
    nepaliRoman: "sanlagnata",
    nepali: "संलग्नता",
  },
  {
    en: "everything",
    nepaliRoman: "sabai kura",
    nepali: "सबै कुरा",
  },
  {
    en: "everywhere",
    nepaliRoman: "jatatatai",
    nepali: "जताततै",
  },
  {
    en: "exhibition",
    nepaliRoman: "pradarsani",
    nepali: "प्रदर्शनी",
  },
  {
    en: "experience",
    nepaliRoman: "anubhava",
    nepali: "अनुभव",
  },
  {
    en: "experiment",
    nepaliRoman: "prayoga",
    nepali: "प्रयोग",
  },
  {
    en: "expiration",
    nepaliRoman: "myada samapti",
    nepali: "म्याद समाप्ति",
  },
  {
    en: "expression",
    nepaliRoman: "abhivyakti",
    nepali: "अभिव्यक्ति",
  },
  {
    en: "fertilizer",
    nepaliRoman: "mala",
    nepali: "मल",
  },
  {
    en: "foundation",
    nepaliRoman: "adhara",
    nepali: "आधार",
  },
  {
    en: "generation",
    nepaliRoman: "pusta",
    nepali: "पुस्ता",
  },
  {
    en: "government",
    nepaliRoman: "sarakara",
    nepali: "सरकार",
  },
  {
    en: "importance",
    nepaliRoman: "mahatva",
    nepali: "महत्व",
  },
  {
    en: "impossible",
    nepaliRoman: "asambhava",
    nepali: "असम्भव",
  },
  {
    en: "inadequate",
    nepaliRoman: "aparyapta",
    nepali: "अपर्याप्त",
  },
  {
    en: "incomplete",
    nepaliRoman: "apurna",
    nepali: "अपूर्ण",
  },
  {
    en: "incredible",
    nepaliRoman: "avisvasaniya",
    nepali: "अविश्वसनीय",
  },
  {
    en: "individual",
    nepaliRoman: "vyaktigata",
    nepali: "व्यक्तिगत",
  },
  {
    en: "inspection",
    nepaliRoman: "niriksana",
    nepali: "निरीक्षण",
  },
  {
    en: "instrument",
    nepaliRoman: "sadhana",
    nepali: "साधन",
  },
  {
    en: "irrigation",
    nepaliRoman: "sinca’i",
    nepali: "सिंचाई",
  },
  {
    en: "journalism",
    nepaliRoman: "patrakarita",
    nepali: "पत्रकारिता",
  },
  {
    en: "management",
    nepaliRoman: "vyavasthapana",
    nepali: "व्यवस्थापन",
  },
  {
    en: "moderation",
    nepaliRoman: "madhyasthata",
    nepali: "मध्यस्थता",
  },
  {
    en: "motivation",
    nepaliRoman: "prerana",
    nepali: "प्रेरणा",
  },
  {
    en: "negligible",
    nepaliRoman: "naganya",
    nepali: "नगण्य",
  },
  {
    en: "occupation",
    nepaliRoman: "pesa",
    nepali: "पेशा",
  },
  {
    en: "particular",
    nepaliRoman: "visesa",
    nepali: "विशेष",
  },
  {
    en: "passionate",
    nepaliRoman: "bhavuka",
    nepali: "भावुक",
  },
  {
    en: "permission",
    nepaliRoman: "anumati",
    nepali: "अनुमति",
  },
  {
    en: "population",
    nepaliRoman: "janasankhya",
    nepali: "जनसंख्या",
  },
  {
    en: "production",
    nepaliRoman: "utpadana",
    nepali: "उत्पादन",
  },
  {
    en: "prostitute",
    nepaliRoman: "vesya",
    nepali: "वेश्या",
  },
  {
    en: "protection",
    nepaliRoman: "sanraksana",
    nepali: "संरक्षण",
  },
  {
    en: "psychology",
    nepaliRoman: "manovijnana",
    nepali: "मनोविज्ञान",
  },
  {
    en: "punishment",
    nepaliRoman: "sajaya",
    nepali: "सजाय",
  },
  {
    en: "quarantine",
    nepaliRoman: "kvarentina",
    nepali: "क्वारेन्टिन",
  },
  {
    en: "retirement",
    nepaliRoman: "sevanivrtti",
    nepali: "सेवानिवृत्ति",
  },
  {
    en: "sufficient",
    nepaliRoman: "paryapta",
    nepali: "पर्याप्त",
  },
  {
    en: "supervisor",
    nepaliRoman: "paryaveksaka",
    nepali: "पर्यवेक्षक",
  },
  {
    en: "supplement",
    nepaliRoman: "puraka",
    nepali: "पूरक",
  },
  {
    en: "university",
    nepaliRoman: "visvavidyalaya",
    nepali: "विश्वविद्यालय",
  },
  {
    en: "vegetarian",
    nepaliRoman: "sakahari",
    nepali: "शाकाहारी",
  },
  {
    en: "visibility",
    nepaliRoman: "drsyata",
    nepali: "दृश्यता",
  },
  {
    en: "vulnerable",
    nepaliRoman: "kamajora",
    nepali: "कमजोर",
  },
  {
    en: "accommodate",
    nepaliRoman: "samayojana",
    nepali: "समायोजन",
  },
  {
    en: "achievement",
    nepaliRoman: "upalabdhi",
    nepali: "उपलब्धि",
  },
  {
    en: "acknowledge",
    nepaliRoman: "svikara",
    nepali: "स्वीकार",
  },
  {
    en: "affirmation",
    nepaliRoman: "pusti",
    nepali: "पुष्टि",
  },
  {
    en: "aggregation",
    nepaliRoman: "ekatrikarana",
    nepali: "एकत्रीकरण",
  },
  {
    en: "agriculture",
    nepaliRoman: "krsi",
    nepali: "कृषि",
  },
  {
    en: "alternation",
    nepaliRoman: "parivartana",
    nepali: "परिवर्तन",
  },
  {
    en: "anniversary",
    nepaliRoman: "varsikotsava",
    nepali: "वार्षिकोत्सव",
  },
  {
    en: "application",
    nepaliRoman: "avedana",
    nepali: "आवेदन",
  },
  {
    en: "appointment",
    nepaliRoman: "niyukti",
    nepali: "नियुक्ति",
  },
  {
    en: "appreciable",
    nepaliRoman: "sarahaniya",
    nepali: "सराहनीय",
  },
  {
    en: "approximate",
    nepaliRoman: "anumanita",
    nepali: "अनुमानित",
  },
  {
    en: "association",
    nepaliRoman: "sangha",
    nepali: "संघ",
  },
  {
    en: "certificate",
    nepaliRoman: "pramanapatra",
    nepali: "प्रमाणपत्र",
  },
  {
    en: "competition",
    nepaliRoman: "pratispardha",
    nepali: "प्रतिस्पर्धा",
  },
  {
    en: "cultivation",
    nepaliRoman: "kheti",
    nepali: "खेती",
  },
  {
    en: "corporation",
    nepaliRoman: "nigama",
    nepali: "निगम",
  },
  {
    en: "cooperation",
    nepaliRoman: "sahayoga",
    nepali: "सहयोग",
  },
  {
    en: "dehydration",
    nepaliRoman: "nirjalikarana",
    nepali: "निर्जलीकरण",
  },
  {
    en: "discontinue",
    nepaliRoman: "banda garnuhos",
    nepali: "बन्द गर्नुहोस्",
  },
  {
    en: "elimination",
    nepaliRoman: "unmulana",
    nepali: "उन्मूलन",
  },
  {
    en: "environment",
    nepaliRoman: "vatavarana",
    nepali: "वातावरण",
  },
  {
    en: "evaporation",
    nepaliRoman: "vaspikarana",
    nepali: "वाष्पीकरण",
  },
  {
    en: "examination",
    nepaliRoman: "pariksa",
    nepali: "परीक्षा",
  },
  {
    en: "expenditure",
    nepaliRoman: "kharca",
    nepali: "खर्च",
  },
  {
    en: "fabrication",
    nepaliRoman: "banavata",
    nepali: "बनावट",
  },
  {
    en: "improvement",
    nepaliRoman: "sudhara",
    nepali: "सुधार",
  },
  {
    en: "independent",
    nepaliRoman: "svatantra",
    nepali: "स्वतन्त्र",
  },
  {
    en: "information",
    nepaliRoman: "janakari",
    nepali: "जानकारी",
  },
  {
    en: "inspiration",
    nepaliRoman: "prerana",
    nepali: "प्रेरणा",
  },
  {
    en: "institution",
    nepaliRoman: "sanstha",
    nepali: "संस्था",
  },
  {
    en: "instruction",
    nepaliRoman: "nirdesana",
    nepali: "निर्देशन",
  },
  {
    en: "intelligent",
    nepaliRoman: "bud’dhimana",
    nepali: "बुद्धिमान",
  },
  {
    en: "manufacture",
    nepaliRoman: "nirmana",
    nepali: "निर्माण",
  },
  {
    en: "measurement",
    nepaliRoman: "mapana",
    nepali: "मापन",
  },
  {
    en: "mensuration",
    nepaliRoman: "mahinavari",
    nepali: "महिनावारी",
  },
  {
    en: "observation",
    nepaliRoman: "avalokana",
    nepali: "अवलोकन",
  },
  {
    en: "opportunity",
    nepaliRoman: "avasara",
    nepali: "अवसर",
  },
  {
    en: "participant",
    nepaliRoman: "sahabhagi",
    nepali: "सहभागी",
  },
  {
    en: "performance",
    nepaliRoman: "pradarsana",
    nepali: "प्रदर्शन",
  },
  {
    en: "preparation",
    nepaliRoman: "tayari",
    nepali: "तयारी",
  },
  {
    en: "significant",
    nepaliRoman: "mahattvapurna",
    nepali: "महत्त्वपूर्ण",
  },
  {
    en: "temperature",
    nepaliRoman: "tapamana",
    nepali: "तापमान",
  },
  {
    en: "translation",
    nepaliRoman: "anuvada",
    nepali: "अनुवाद",
  },
  {
    en: "transparent",
    nepaliRoman: "paradarsi",
    nepali: "पारदर्शी",
  },
  {
    en: "vaccination",
    nepaliRoman: "khopa",
    nepali: "खोप",
  },
  {
    en: "abbreviation",
    nepaliRoman: "sanksipta nama",
    nepali: "संक्षिप्त नाम",
  },
  {
    en: "administrate",
    nepaliRoman: "prasasana garne",
    nepali: "प्रशासन गर्ने",
  },
  {
    en: "appreciation",
    nepaliRoman: "prasansa",
    nepali: "प्रशंसा",
  },
  {
    en: "accommodation",
    nepaliRoman: "avasa",
    nepali: "आवास",
  },
  {
    en: "accompaniment",
    nepaliRoman: "sangata",
    nepali: "संगत",
  },
  {
    en: "administrator",
    nepaliRoman: "prasasaka",
    nepali: "प्रशासक",
  },
  {
    en: "advertisement",
    nepaliRoman: "vijnapana",
    nepali: "विज्ञापन",
  },
  {
    en: "administration",
    nepaliRoman: "prasasana",
    nepali: "प्रशासन",
  },
  {
    en: "acknowledgement",
    nepaliRoman: "svikrti",
    nepali: "स्वीकृति",
  },
  {
    en: "conformation",
    nepaliRoman: "rupantarana",
    nepali: "रूपान्तरण",
  },
  {
    en: "conservation",
    nepaliRoman: "sanraksana",
    nepali: "संरक्षण",
  },
  {
    en: "constitution",
    nepaliRoman: "sanvidhana",
    nepali: "संविधान",
  },
  {
    en: "construction",
    nepaliRoman: "nirmana",
    nepali: "निर्माण",
  },
  {
    en: "contribution",
    nepaliRoman: "yogadana",
    nepali: "योगदान",
  },
  {
    en: "communication",
    nepaliRoman: "sancara",
    nepali: "संचार",
  },
  {
    en: "classification",
    nepaliRoman: "vargikarana",
    nepali: "वर्गीकरण",
  },
  {
    en: "congratulation",
    nepaliRoman: "badha’i cha",
    nepali: "बधाई छ",
  },
  {
    en: "disadvantage",
    nepaliRoman: "hani",
    nepali: "हानि",
  },
  {
    en: "entrepreneur",
    nepaliRoman: "udyami",
    nepali: "उद्यमी",
  },
  {
    en: "entertainment",
    nepaliRoman: "manoranjana",
    nepali: "मनोरञ्जन",
  },
  {
    en: "extraordinary",
    nepaliRoman: "asadharana",
    nepali: "असाधारण",
  },
  {
    en: "horticulture",
    nepaliRoman: "bagavani",
    nepali: "बागवानी",
  },
  {
    en: "intermediate",
    nepaliRoman: "madhyavarti",
    nepali: "मध्यवर्ती",
  },
  {
    en: "introduction",
    nepaliRoman: "paricaya",
    nepali: "परिचय",
  },
  {
    en: "investigation",
    nepaliRoman: "anusandhana",
    nepali: "अनुसन्धान",
  },
  {
    en: "international",
    nepaliRoman: "antarrastriya",
    nepali: "अन्तर्राष्ट्रिय",
  },
  {
    en: "identification",
    nepaliRoman: "pahicana",
    nepali: "पहिचान",
  },
  {
    en: "justification",
    nepaliRoman: "aucitya",
    nepali: "औचित्य",
  },
  {
    en: "knowledgeable",
    nepaliRoman: "janakara",
    nepali: "जानकार",
  },
  {
    en: "maintainable",
    nepaliRoman: "marmata yogya",
    nepali: "मर्मत योग्य",
  },
  {
    en: "organization",
    nepaliRoman: "sangathana",
    nepali: "संगठन",
  },
  {
    en: "presentation",
    nepaliRoman: "prastuti",
    nepali: "प्रस्तुति",
  },
  {
    en: "preservation",
    nepaliRoman: "sanraksana",
    nepali: "संरक्षण",
  },
  {
    en: "purification",
    nepaliRoman: "sud’dhikarana",
    nepali: "शुद्धीकरण",
  },
  {
    en: "participation",
    nepaliRoman: "sahabhagita",
    nepali: "सहभागिता",
  },
  {
    en: "registration",
    nepaliRoman: "darta",
    nepali: "दर्ता",
  },
  {
    en: "reproduction",
    nepaliRoman: "prajanana",
    nepali: "प्रजनन",
  },
  {
    en: "satisfaction",
    nepaliRoman: "santusti",
    nepali: "सन्तुष्टि",
  },
  {
    en: "self-confidence",
    nepaliRoman: "atmavisvasa",
    nepali: "आत्मविश्वास",
  },
  {
    en: "transformation",
    nepaliRoman: "rupantarana",
    nepali: "रूपान्तरण",
  },
  {
    en: "transportation",
    nepaliRoman: "yatayata",
    nepali: "यातायात",
  },
  {
    en: "good morning",
    nepaliRoman: "subha prabhata",
    nepali: "शुभ प्रभात",
  },
  {
    en: "what is your name",
    nepaliRoman: "Timro nama ke ho",
    nepali: "तिम्रो नाम के हो",
  },
  {
    en: "what is your problem?",
    nepaliRoman: "timro samasya ke ho?",
    nepali: "तिम्रो समस्या के हो?",
  },
  {
    en: "i hate you",
    nepaliRoman: "Ma tapaimlai ghrna garchu",
    nepali: "म तपाईँलाई घृणा गर्छु",
  },
  {
    en: "i love you",
    nepaliRoman: "Ma timilai maya garchu",
    nepali: "म तिमीलाई माया गर्छु",
  },
  {
    en: "can i help you?",
    nepaliRoman: "सक्छु? ke ma tapa’imla’i maddata garna sakchu?",
    nepali: "के म तपाईँलाई मद्दत गर्न सक्छु?",
  },
  {
    en: "i am sorry",
    nepaliRoman: "ma du: khi chu",
    nepali: "म दु: खी छु du:",
  },
  {
    en: "i want to sleep",
    nepaliRoman: "ma sutna cahanchu",
    nepali: "म सुत्न चाहन्छु",
  },
  {
    en: "this is very important",
    nepaliRoman: "Yo dherai mahattvapurna cha",
    nepali: "यो धेरै महत्त्वपूर्ण छ",
  },
  {
    en: "are you hungry?",
    nepaliRoman: "ke timila’i bhoka lageko cha?",
    nepali: "के तिमीलाई भोक लगेको छ?",
  },
  {
    en: "how is your life?",
    nepaliRoman: "timro jindagi kasto caliracha?",
    nepali: "तिम्रो जिन्दगी कस्तो चलिराछ?",
  },
  {
    en: "i am going to study",
    nepaliRoman: "ma adhyayana garna jamdaichu",
    nepali: "म अध्ययन गर्न जाँदैछु",
  },
  {
    en: "lip",
    nepaliRoman: "otha",
    nepali: "ओठ",
  },
  {
    en: "Hello!",
    nepaliRoman: "namastē",
    nepali: "नमस्ते",
  },
  {
    en: "Pardon?",
    nepaliRoman: "hajur",
    nepali: "हजुर",
  },
  {
    en: "namastē! timī Viśāla hau",
    nepaliRoman: "Hello! Are you Vishal?",
    nepali: "नमस्ते! तिमी विशाल हौ?",
  },
].filter((item, idx, coll) => {
  // removes duplicates from the collection
  return coll.findIndex((word) => word?.nepali === item?.nepali) === idx;
});

const songWords = [
  {
    nepali: "ग",
  },
  {
    nepali: "ा",
    nepaliRoman: "aa",
    type: "dependent vowel",
  },
  {
    nepali: "ज",
  },
  {
    nepali: "ल",
  },
  {
    nepali: "त",
  },
  {
    nepali: "्",
    nepaliRoman: "",
    type: "dependent vowel",
  },
  {
    nepali: "य",
  },
  {
    nepali: "ो",
    nepaliRoman: "o",
    type: "dependent vowel",
  },
  {
    nepali: "ि",
    nepaliRoman: "i",
    type: "dependent vowel",
  },
  {
    nepali: "म",
  },
  {
    nepali: "र",
  },
  {
    nepali: "े",
    nepaliRoman: "e",
    type: "dependent vowel",
  },
  {
    nepali: "ट",
  },
  {
    nepali: "ई",
  },
  {
    nepali: "द",
  },
  {
    nepali: "ऊ",
  },
  {
    nepali: "न",
  },
  {
    nepali: "आ",
  },
  {
    nepali: "ँ",
  },
  {
    nepali: "ख",
  },
  {
    nepali: "क",
  },
  {
    nepali: "ं",
  },
  {
    nepali: "ह",
  },
  {
    nepali: "छ",
  },
  {
    nepali: "ब",
  },
  {
    nepali: "ध",
  },
  {
    nepali: "श",
  },
  {
    nepali: "फ",
  },
  {
    nepali: "ु",
    nepaliRoman: "u",
    type: "dependent vowel",
  },
  {
    nepali: "इ",
  },
  {
    nepali: "व",
  },
  {
    nepali: "उ",
  },
  {
    nepali: "ड",
  },
  {
    nepali: "प",
  },
  {
    nepali: "ढ",
  },
  {
    nepali: "ृ",
    nepaliRoman: "r",
    type: "dependent vowel",
  },
  {
    nepali: "च",
  },
  {
    nepali: "भ",
  },
  {
    nepali: "ी",
    nepaliRoman: "ii",
    type: "dependent vowel",
  },
  {
    nepali: "स",
  },
  {
    nepali: "ै",
    nepaliRoman: "ai",
    type: "dependent vowel",
  },
  {
    nepali: "ौ",
    nepaliRoman: "au",
    type: "dependent vowel",
  },
  {
    nepali: "अ",
  },
  {
    nepali: "ू",
    nepaliRoman: "uu",
    type: "dependent vowel",
  },
  {
    nepali: "झ",
  },
  {
    nepali: "ए",
  },
  {
    nepali: "थ",
  },
  {
    nepali: "ः",
  },
];

export const nepaliSentences = [
  "गाजल त्यो तिम्रो मेटाईदेऊ न",
  "तिम्रो आँखाको रंग हेर्न मन छ",
  "बाँधेको केश फुकाइदेऊ न",
  "हावाले उडाको मन पर्छ",
  "नढाक न मुहार श्रृंगारले",
  "चन्द्रमामा पनि दाग हुन्छ",
  "भाग्यमानी सबै तिम्रो मुस्कान हेर्न पाउने",
  "जे छौ, जसो छौ तिमी",
  "त्यही नै हो मलाई चाहिने",
  "छिछोलेर अंधेरो लाई उज्यालो देखाउने",
  "चम्किला जूनकीरी झैँ आँखा",
  "गहिरो समुन्द्र भए जिन्दगी मेरो",
  "किनारा देखाउने तिम्रो हात",
  "सुरिलो त के छ र गीत मेरो",
  "जति तिम्रो आवाज हुन्छ",
  "आशा यही हो सधैं तिम्रो साथ पाउने",
  "तिमी हौ मलाई चाहिने",
  "पर्वा नगर यो दुनियाँको",
  "तिमी मै बसेको छ दुनियाँ मेरो",
];

// https://nepalilanguage.org/alphabet/
export const nepaliConsonants = [
  {
    nepali: "क",
    type: "consonant",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/808b3eb62d56440e83882b4dff015ca0/original/%E0%A4%95.m4a?response-content-disposition=attachment&verify=1689538290-Pt34lg8ozOv1ZNYcKi39OygnoQ%2BL5eJHonrXY9ure7E%3D",
    en: "ka",
    nepaliRoman: "ka",
    variant: "velar",
    pronuncation: "throat",
  },
  {
    nepali: "ख",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/c57c09baaace4c0e8aa70476ae9d3647/original/%E0%A4%96.m4a?response-content-disposition=attachment&verify=1689538492-0d5FIEcR6JUAhD4J5mDK2x7Yy5qXfS%2BqLY18h0MBtWc%3D",
    type: "consonant",
    en: "kʰa",
    nepaliRoman: "kʰa",
    line: 2,
    variant: "velar",
    pronuncation: "throat",
  },
  {
    nepali: "ग",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/adbd6304262043b38d40e077d141ff93/original/%E0%A4%97%E0%A5%A8.m4a?response-content-disposition=attachment&verify=1689539539-XbMxYz3PSEP5%2BnSdtVyA0E%2F40RWFWav2TU0IuB%2BysU0%3D",
    sound2:
      "https://files.gumroad.com/attachments/8481354937827/3dd6cec4f9e2469b8ff5307c2ec46971/original/%E0%A4%97.m4a?response-content-disposition=attachment&verify=1689538596-%2BD%2F7dDUUfK4PIEst4woKXDjTz7rma3R9uDzAQ8RC7Fg%3D",
    type: "consonant",
    en: "ga",
    nepaliRoman: "ga",
    line: 3,
    variant: "velar",
    pronuncation: "throat",
  },
  {
    nepali: "घ",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/79752a0199404392bc46fc33863e1948/original/%E0%A4%98%E0%A5%A8.m4a?response-content-disposition=attachment&verify=1689540940-CXmQcQU350LRxkmICGiuhx3QDZi5XK1CtFKopsTIxco%3D",
    sound2:
      "https://files.gumroad.com/attachments/8481354937827/7908098f97d64e16bdcdc8a368cb42ba/original/%E0%A4%98.m4a?response-content-disposition=attachment&verify=1689539416-jAbOPWYnu%2FlrmNjEhjH1xR7Wk1VH%2BrmNrVL5GrVqWpQ%3D",
    type: "consonant",
    en: "gʰa",
    nepaliRoman: "gʰa",
    line: 4,
    variant: "velar",
    pronuncation: "throat",
  },
  {
    nepali: "ङ",
    type: "consonant",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/b96fcd52668b4d2c9b27369e22bc5a9c/original/%E0%A4%99.m4a?response-content-disposition=attachment&verify=1689538900-%2Bat0MLceglOKoeFzIIuhk1QKzFaO%2Bn%2BF9nMk9onCAVw%3D",
    en: "ŋa",
    nepaliRoman: "ŋa",
    line: 5,
    variant: "velar",
    pronuncation: "throat",
  },
  // {
  //   nepali: 'य',
  //   type: 'consonant',
  //   en: 'ya',
  //   nepaliRoman: 'ya',
  //   variant: 'velar',
  //   variant2: 'semi vowel'
  // },
  {
    nepali: "च",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/47251f9221b14c8aa96a785a3d7d262a/original/%E0%A4%9A.m4a?response-content-disposition=attachment&verify=1689539695-iqeqaxVhfwYrKufiLQ0XaoDoYnzCw4Gp25qtDdKxDLE%3D",
    type: "consonant",
    en: "cha",
    nepaliRoman: "cha",
    line: 1,
    variant: "palatal",
    pronuncation: "upper gum-line",
  },
  {
    nepali: "छ",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/ab6e70b86c004653803df7f92caf218f/original/%E0%A4%9B.m4a?response-content-disposition=attachment&verify=1689540607-bcWPpHVzwj8es5lGdZ7HM7yeflSV%2B8ALq0otdT%2FAFkQ%3D",
    type: "consonant",
    en: "chʰa",
    nepaliRoman: "chʰa",
    line: 2,
    variant: "palatal",
    pronuncation: "upper gum-line",
  },
  {
    nepali: "ज",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/2e30e58e97414c9ca32cee89f8c2888c/original/%E0%A4%9C.m4a?response-content-disposition=attachment&verify=1689540636-XrZvq%2FoQNgLsQH5CJ7lV%2BgKvDf%2FNz6Z6CGTZiDNowsE%3D",
    type: "consonant",
    en: "ja",
    nepaliRoman: "ja",
    line: 3,
    variant: "palatal",
    pronuncation: "upper gum-line",
  },
  {
    nepali: "झ",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/208715bc9edd4d94889f557ebb1c16f0/original/%E0%A4%9D.m4a?response-content-disposition=attachment&verify=1689540662-o3mY8rKmJ3eNYQULvTIy7G1Ab9mk9SyKLNhGsO6EGF0%3D",
    type: "consonant",
    en: "jʰa",
    nepaliRoman: "jʰa",
    line: 4,
    variant: "palatal",
    pronuncation: "upper gum-line",
  },
  {
    nepali: "ञ",
    type: "consonant",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/f9cd96874a004b7d98a7311f6feb9060/original/%E0%A4%9E.m4a?response-content-disposition=attachment&verify=1689540675-uC3P6TwQ6iXb6OsoaMQOoGhec9oYDi57oBUr%2FHrCg%2FI%3D",
    en: "ɲa",
    nepaliRoman: "ɲa",
    line: 5,
    variant: "palatal",
    pronuncation: "upper gum-line",
  },
  {
    nepali: "ट",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/65bc16c29cdd42cab520dc71c2752e74/original/%E0%A4%9F.m4a?response-content-disposition=attachment&verify=1689540721-Q66Qvz%2FwNOcMXLYf%2Boua6usVNY1NhG9wnG7QxrJv9uY%3D",
    type: "consonant",
    en: "ʈa",
    nepaliRoman: "ʈa",
    line: 1,
    variant: "retroflex",
    pronuncation: "tongue curled back to touch the palate",
  },
  {
    nepali: "ठ",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/1c5b5ac7180142ae81af20c94087ec31/original/%E0%A4%A0.m4a?response-content-disposition=attachment&verify=1689540746-gzSVEnHvJa1Cc6qOYM4cqe0bcr4u%2Bsy5NiH%2FVgYd6f0%3D",
    type: "consonant",
    en: "ʈʰa",
    nepaliRoman: "ʈʰa",
    line: 2,
    variant: "retroflex",
    pronuncation: "tongue curled back to touch the palate",
  },
  {
    nepali: "ड",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/295eb924792f412ba3c5bfc1e3761902/original/%E0%A4%A1.m4a?response-content-disposition=attachment&verify=1689540784-NVYsUX8CbcpzQKaxkuYC0TWuUfJEX8oIbqkrmKRUDrk%3D",
    type: "consonant",
    en: "ɖa",
    nepaliRoman: "ɖa",
    line: 3,
    variant: "retroflex",
    pronuncation: "tongue curled back to touch the palate",
  },
  {
    nepali: "ढ",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/f738840a66bc49c69d947e2cb7ad6017/original/%E0%A4%A2.m4a?response-content-disposition=attachment&verify=1689540805-P30FOiO5gyIi6Y8FCJIqH74xvfwxIElRly3cgro6gqM%3D",
    type: "consonant",
    en: "ɖʰa",
    nepaliRoman: "ɖʰa",
    line: 4,
    variant: "retroflex",
    pronuncation: "tongue curled back to touch the palate",
  },
  {
    nepali: "ण",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/b5ad143bcda34eb6935213a4d3af60a9/original/%E0%A4%A3.m4a?response-content-disposition=attachment&verify=1689540818-8apWyD4iPfc1ToCVZnRtkBexv%2B1YTHEKhxK3xrr0Hls%3D",
    type: "consonant",
    en: "ɳa",
    nepaliRoman: "ɳa",
    line: 5,
    variant: "retroflex",
    pronuncation: "tongue curled back to touch the palate",
  },
  // {
  //   nepali: 'र',
  //   type: 'consonant',
  //   en: 'ra',
  //   nepaliRoman: 'ra',
  //   variant: 'retroflex',
  //   variant2: 'semi vowel',
  //   pronuncation: 'tongue trilled'
  // },
  {
    nepali: "त",
    type: "consonant",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/c4d3a601fbb847bf99f74ea80f73f5b0/original/%E0%A4%A4.m4a?response-content-disposition=attachment&verify=1689541675-TvuAlTweWHYOnDa0i9B7IGK8SltcnhIUQm1DQ3N3RiU%3D",
    en: "t̪a",
    nepaliRoman: "t̪a",
    line: 1,
    variant: "dental",
    pronuncation: "upper front teeth",
  },
  {
    nepali: "थ",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/c3911df9621440afbb55955a140c3dec/original/%E0%A4%A5.m4a?response-content-disposition=attachment&verify=1689541692-2mTVjCWXFMNnilnzvKIQlQ80C1r85hb%2FlT5kNojlPxE%3D",
    type: "consonant",
    en: "t̪ha",
    nepaliRoman: "t̪ha",
    line: 2,
    variant: "dental",
    pronuncation: "upper front teeth",
  },
  {
    nepali: "द",
    type: "consonant",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/a1233ec322c6406d9a1a2df291e882c6/original/%E0%A4%A6.m4a?response-content-disposition=attachment&verify=1689541710-FM7tfK%2F%2F%2FSNyqYAH8ACBuN95vkYiqwkfR5vBt%2FlzOcA%3D",
    en: "d̪a",
    nepaliRoman: "d̪a",
    line: 3,
    variant: "dental",
    pronuncation: "upper front teeth",
  },
  {
    nepali: "ध",
    type: "consonant",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/1e472e720f754a4a9b50a5a42be991c5/original/%E0%A4%A7.m4a?response-content-disposition=attachment&verify=1689541742-ns5xLb9vv22HvjLuNSJ9stSfvO0OrQT%2BIOjLiyu8XO0%3D",
    en: "d̪ha",
    nepaliRoman: "d̪ha",
    line: 4,
    variant: "dental",
    pronuncation: "upper front teeth",
  },
  {
    nepali: "न",
    type: "consonant",
    en: "na",
    nepaliRoman: "na",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/366c83b423694c2f9262626f9637f269/original/%E0%A4%A8.m4a?response-content-disposition=attachment&verify=1689541761-cz8T5fu0gapnZW7tQxhzbj%2B8VgH%2FypnRarKdkEoMM3Y%3D",
    line: 5,
    variant: "dental",
    pronuncation: "upper front teeth",
  },
  // {
  //   nepali: 'ल',
  //   type: 'consonant',
  //   en: 'la',
  //   nepaliRoman: 'la',
  //   variant: 'dental',
  //   variant2: 'semi vowel',
  //   pronuncation: 'upper gum-line'
  // },
  {
    nepali: "प",
    type: "consonant",
    en: "pa",
    nepaliRoman: "pa",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/e26a4a47004341c3b7e3e36d41b3d875/original/%E0%A4%AA.m4a?response-content-disposition=attachment&verify=1689541620-P8aBsQj77sVXHvk9KKQvMzPSAaaVZW1gTjksRN7zVpQ%3D",
    variant: "labial",
    pronuncation: "lips",
  },
  {
    nepali: "फ",
    type: "consonant",
    en: "pha",
    nepaliRoman: "pha",
    variant: "labial",
    pronuncation: "lips",
  },
  {
    nepali: "ब",
    type: "consonant",
    en: "ba",
    nepaliRoman: "ba",
    variant: "labial",
    pronuncation: "lips",
  },
  {
    nepali: "भ",
    type: "consonant",
    en: "bha",
    nepaliRoman: "bha",
    variant: "labial",
    pronuncation: "lips",
  },
  {
    nepali: "म",
    type: "consonant",
    en: "ma",
    nepaliRoman: "ma",
    variant: "labial",
    pronuncation: "lips",
  },
  {
    nepali: "य",
    type: "consonant",
    en: "ya",
    nepaliRoman: "ya",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/b108d9fd264743729f2e9bdd49ef1f4d/original/%E0%A4%AF.m4a?response-content-disposition=attachment&verify=1689539309-zG5AIt8xsxT3c%2F%2By4GhORQM%2BIdOZvNKYHe7yNlSdknA%3D",
    // variant: 'velar',
    // variant: 'palatal',
    variant: "semi vowel",
  },
  {
    nepali: "र",
    type: "consonant",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/88e9c51b32624f288a6edbd23feca5c0/original/%E0%A4%B0.m4a?response-content-disposition=attachment&verify=1689540698-KuJcyU%2BAY1%2FrrPU4fw%2FqqGH857lx2DKt8hxdWlRmfh4%3D",
    en: "ra",
    nepaliRoman: "ra",
    // variant: 'retroflex',
    variant: "semi vowel",
    pronuncation: "tongue trilled",
  },
  {
    nepali: "ल",
    type: "consonant",
    en: "la",
    nepaliRoman: "la",
    sound:
      "https://files.gumroad.com/attachments/8481354937827/deb2bc9195104a3587c63b073e09817d/original/%E0%A4%B2.m4a?response-content-disposition=attachment&verify=1689541646-gemjtxJdSn%2Bdqb1lrJ7vCQBDF1YNSyETP2dEegwDN5g%3D",
    // variant: 'dental',
    variant: "semi vowel",
    pronuncation: "upper gum-line",
  },
  {
    nepali: "व",
    type: "consonant",
    en: "va",
    nepaliRoman: "va",
    title: "va (wa)",
    // variant: 'aspirate',
    variant: "semi vowel",
    pronuncation: "lips",
  },
  {
    nepali: "श",
    type: "consonant",
    en: "sá",
    nepaliRoman: "sá",
    variant: "sibilant (hiss)",
    pronuncation: "hiss",
  },
  {
    nepali: "ष",
    type: "consonant",
    en: "sā",
    nepaliRoman: "sā",
    variant: "sibilant (hiss)",
    pronuncation: "hiss",
  },
  {
    nepali: "स",
    type: "consonant",
    en: "sà",
    nepaliRoman: "sà",
    variant: "sibilant (hiss)",
    pronuncation: "hiss",
  },
  {
    nepali: "ह",
    type: "consonant",
    en: "ha",
    nepaliRoman: "ha",
    variant: "aspirate",
    pronuncation: "open mouth",
  },
  // {
  //   nepali: 'व',
  //   type: 'consonant',
  //   en: 'va (wa)',
  //   nepaliRoman: 'va (wa)',
  //   variant: 'aspirate',
  //   variant2: 'semi vowel',
  //   pronuncation: 'lips'
  // },
  {
    nepali: "क्ष",
    type: "consonant",
    en: "che",
    nepaliRoman: "che",
    title: "chʰya",
    variant: "compound",
    pronuncation: "upper gum-line",
  },
  {
    nepali: "त्र",
    type: "consonant",
    en: "t̪ra",
    nepaliRoman: "t̪ra",
    variant: "compound",
    pronuncation: "upper gum-line",
  },
  {
    nepali: "ज्ञ",
    type: "consonant",
    en: "gya",
    nepaliRoman: "gya",
    variant: "compound",
    pronuncation: "throat",
  },
];
export const dependentVowels = [
  {
    nepali: "्",
    nepaliRoman: "hal",
    nepaliRoman2: "conn",
    vowelType: "absent",
    en: "hal (हलंत)",
    en2: "tyo",
    name: "virama / halant aka 'consonant killer'",
    type: "dependent vowel",
    description:
      'In Nepali, the character "्" (called "virama" or "halant" or simply "hal" [हलंत]) is used as a consonant-killer or a symbol to indicate the absence of an inherent vowel sound. It is placed after a consonant character to remove the inherent vowel sound from that consonant.',
  },
  {
    nepali: "ा",
    nepaliRoman: "ā",
    vowelType: "long",
    // en: 'aa',
    en: "k(aa)na (आकार)",
    type: "dependent vowel",
    name: "aakaar",
    description:
      'In Nepali, the character "ा" (called "aakaar") is used as a vowel sign. It is attached to a consonant character and represents the long vowel sound /a/.',
    useCases: [],
  },

  {
    nepali: "ि",
    nepaliRoman: "i",
    vowelType: "long",
    name: "ikaar",
    description:
      'In Nepali, the character "ि" (called "ikaar") is used as a vowel sign. It is attached to a consonant character and represents the short vowel sound /i/.',
    en: "k(i)na (इकार)",
    type: "dependent vowel",
  },

  {
    nepali: "ी",
    vowelType: "long",
    description:
      'In Nepali, the character "ी" (called "eekaar") is used as a vowel sign. It is attached to a consonant character and represents the long vowel sound /i/.',
    name: "eekaar",
    nepaliRoman: "ī",
    en: "j(ii)ta (ईकार)",
    type: "dependent vowel",
  },

  {
    nepali: "ु",
    nepaliRoman: "u",
    vowelType: "short",
    name: "uukaar",
    description:
      'In Nepali, the character "ु" (called "uukaar") is used as a vowel sign. It is attached to a consonant character and represents the short vowel sound /u/.',
    en: "alu (उकार)",
    type: "dependent vowel",
  },

  {
    nepali: "ू",
    nepaliRoman: "ū",
    description:
      'In Nepali, the character "ू" (called "ookaar") is used as a vowel sign. It is attached to a consonant character and represents the long vowel sound /uː/.',
    name: "ookaar",
    vowelType: "long",
    en: "puura (ऊकार)",
    context: {
      nepali: "ऊकार",
    },
    type: "dependent vowel",
  },

  {
    nepali: "े",
    name: "eekaar",
    vowelType: "long",
    description:
      'In Nepali, the character "े" (called "eekaar") is used as a vowel sign. It is attached to a consonant character and represents the long vowel sound /e/.',
    nepaliRoman: "ē",
    en: "ke",
    type: "dependent vowel",
  },

  {
    nepali: "ो",
    name: "oakaar",
    vowelType: "long",
    description:
      'In Nepali, the character "ो" (called "oakaar") is used as a vowel sign. It is attached to a consonant character and represents the long vowel sound /o/.',
    nepaliRoman: "o",
    en: "y(o)",
    type: "dependent vowel",
  },

  {
    nepali: "ृ",
    nepaliRoman: "r",
    vowelType: "short",
    description:
      'In Nepali, the character "ृ" (called "rikaar") is used as a vowel sign. It is attached to a consonant character and represents the short vowel sound /r̩/.',
    name: "rikaar",
    en: "krpaya",
    type: "dependent vowel",
  },

  {
    nepali: "ै",
    description:
      'In Nepali, the character "ै" (called "aikar") is used as a vowel sign. It is attached to a consonant character and represents the diphthong vowel sound /ai/.',
    vowelType: "diphthong",
    name: "aikar",
    nepaliRoman: "ai",
    en: "ch(ai)na",
    type: "dependent vowel",
  },

  {
    nepali: "ौ",
    nepaliRoman: "au",
    vowelType: "diphthong",
    description:
      'In Nepali, the character "ौ" (called "oukaar") is used as a vowel sign. It is attached to a consonant character and represents the diphthong vowel sound /au/.',
    name: "oukaar",
    en: "paudi",
    type: "dependent vowel",
  },

  {
    nepali: "ं",
    name: "anusvara / bindu",
    vowelType: "nasal",
    description:
      'In Nepali, the character "ं" (called "anusvara" or "bindu") is used as a nasalization mark. It is placed after a consonant character to indicate nasalization.',
    nepaliRoman: "aa",
    en: "raanga (बिंदु)",
    nomType: "time extender",
    type: "dependent vowel",
  },

  {
    nepali: "ँ",
    vowelType: "nasal",
    description:
      'In Nepali, the character "ँ" (called "chandrabindu") is used as a nasalization mark. It is placed on top of a vowel or a consonant character to indicate nasalization.',
    en: "amkha",
    nepaliRoman: "ng",
    name: "chandrabindu",
    type: "dependent vowel",
  },

  {
    nepali: "ः",
    en: "h",
    nepaliRoman: "h",
    description:
      'In Nepali, the character "ः" (called "visarga" or "harka") is used as a diacritic mark. It represents a voiceless glottal fricative sound /h/ at the end of a syllable. The visarga can be used in both Devanagari script and Romanized Nepali.',
    vowelType: "voiceless",
    name: "visarga / harka",
    type: "dependent vowel",
  },
];

export const nepaliVowels = [
  {
    nepali: "अ",
    type: "vowel",
    nepaliRoman: "a",
    en: "anda",
    examples: [
      {
        rn: "anaar",
        en: "pomegranate",
      },
    ],
  },
  {
    nepali: "आ",
    type: "vowel",
    nepaliRoman: "ä",
    en: "alu",
    examples: [
      {
        rn: "ämä",
        en: "mother",
      },
    ],
  },

  {
    nepali: "ए",
    type: "vowel",
    nepaliRoman: "e",
    en: "eklai",
    examples: [
      {
        rn: "ek",
        en: "One",
      },
    ],
  },

  {
    nepali: "इ",
    type: "vowel",
    nepaliRoman: "i",
    en: "iccha",
    examples: [
      {
        rn: "inaar",
        en: "Well",
      },
    ],
  },
  {
    nepali: "ई",
    type: "vowel",
    nepaliRoman: "ai",
    en: "mala’i",
    examples: [
      {
        rn: "iishwar",
        en: "god",
      },
    ],
  },

  {
    nepali: "उ",
    type: "vowel",
    nepaliRoman: "u",
    en: "ukhu",
    examples: [
      {
        rn: "ullu",
        en: "owl",
      },
    ],
  },

  {
    nepali: "ऊ",
    type: "vowel",
    nepaliRoman: "uu",
    en: "uuna",
    examples: [
      {
        rn: "uun",
        en: "Wool",
      },
    ],
  },

  {
    nepali: "ऋ",
    type: "vowel",
    nepaliRoman: "ri",
    en: "rsi",
    examples: [
      {
        rn: "rishi",
        en: "Rishi",
      },
    ],
  },

  {
    nepali: "ऐ",
    type: "vowel",
    en: "ai",
    examples: [
      {
        rn: "aina",
        en: "Mirror",
      },
    ],
  },
  {
    nepali: "ओ",
    type: "vowel",
    nepaliRoman: "o",
    en: "(o)tha",
    examples: [
      {
        rn: "okhar",
        en: "walnut",
      },
    ],
  },
  {
    nepali: "औ",
    type: "vowel",
    nepaliRoman: "au",
    en: "(au)sata",
    examples: [
      {
        rn: "ausadhi",
        en: "medicine",
      },
    ],
  },
  {
    nepali: "अं",
    type: "vowel",
    nepaliRoman: "am, ang",
    en: "anga",
  },
  {
    nepali: "अः",
    type: "vowel",
    en: "ah",
  },
];

const nepaliWords1 = nepaliConsonants.concat(nepaliVowels as any);

// export const uniqueWords = songWords.filter(
//   item => !nepaliWords1?.find(word => word?.nepali === item?.nepali)
// ) as any

export const uniqueWords = dependentVowels as any;

const nepaliWords = nepaliWords1.concat(uniqueWords) as any;
