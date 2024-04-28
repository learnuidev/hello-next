const onboarding = [
  {
    type: "dialog",
    name: "start",
    title: "👋 Welcome!",
    subtitle:
      "Let's start with just a few short questions to help us find the best course plan for you!",
    image: {
      light: "/assets/onboarding_welcome-uevXs7ru.webp",
      dark: "/assets/onboarding_welcome-uevXs7ru.webp",
      style: "width: 206px; margin: 50px auto;",
    },
  },
  {
    type: "select",
    layout: "list",
    name: "motivation",
    title: "Why do you want to get better at speaking Spanish?",
    subtitle: null,
    options: [
      {
        id: "motivation_travel",
        title: "🛩 Travel or live abroad",
        payload: {
          planTitle: "Speak Like a Local",
        },
      },
      {
        id: "motivation_career",
        title: "💻 Accelerate my career",
        payload: {
          planTitle: "Leap Ahead At Work",
        },
      },
      {
        id: "motivation_talk_to_foreigners",
        title: "💬 Talk to foreigners",
        payload: {
          planTitle: "Speak with Everyone",
        },
      },
      {
        id: "motivation_self_improvement",
        title: "🌟 Self improvement",
        payload: {
          planTitle: "A Better You",
        },
      },
      {
        id: "motivation_speak_english_kids",
        title: "👶 Speak Spanish to my kids",
        payload: {
          planTitle: "Speak with the Family",
        },
      },
      {
        id: "motivation_other",
        title: "🎯 Other",
        payload: {
          planTitle: "One Day at a Time",
        },
      },
    ],
  },
  {
    type: "select",
    layout: "grid",
    name: "topic",
    title: "What topics are you interested in?",
    stepSummary: {
      title: "👍\nGreat, we'll make sure to cover some of these topics!",
      subtitle: null,
      itemsSummarized: 3,
    },
    subtitle:
      "Choose at least [three] to help us better tailor your course plan",
    options: [
      {
        id: "topic_business",
        emoji: "💻",
        title: "Business",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_business.png",
          title: "Business",
          subtitle: "Useful phrases for work",
        },
      },
      {
        id: "topic_travel",
        emoji: "🛩",
        title: "Travel",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_travel.png",
          title: "Travel",
          subtitle: "Get around a new place like a local",
        },
      },
      {
        id: "topic_entertainment",
        emoji: "🎥",
        title: "Entertainment",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_movies.png",
          title: "Entertainment",
          subtitle: "Talk about your favorite bands and movies",
        },
      },
      {
        id: "topic_socializing",
        emoji: "🍸",
        title: "Socializing",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_socializing.png",
          title: "Socializing",
          subtitle: "Make plans to hang out with friends",
        },
      },
      {
        id: "topic_culture",
        emoji: "🗽",
        title: "Culture",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_culture.png",
          title: "Culture",
          subtitle: "Learn about others' holidays and traditions",
        },
      },
      {
        id: "topic_dating",
        emoji: "💌",
        title: "Dating",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_dating.png",
          title: "Dating",
          subtitle: "Say the right things on a date",
        },
      },
      {
        id: "topic_shopping",
        emoji: "🛍",
        title: "Shopping",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_shopping.png",
          title: "Shopping",
          subtitle: "Buy the dress you actually want",
        },
      },
      {
        id: "topic_food",
        emoji: "🥑",
        title: "Food",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_food.png",
          title: "Food",
          subtitle: "Order food and describe your preferences",
        },
      },
      {
        id: "topic_family",
        emoji: "🏡",
        title: "Family",
        summaryData: {
          icon: "https://s3.usespeak.com/images/onboarding/topic_family.png",
          title: "Family",
          subtitle: "Learn things to say with your kids",
        },
      },
    ],
    minRequiredOptions: 3,
    confirmSelection: true,
  },
  {
    type: "select",
    layout: "list",
    name: "obstacle",
    title: "What is the main challenge for you in learning Spanish?",
    stepSummary: {
      title: "What is the main challenge for you in learning Spanish?",
    },
    subtitle: null,
    options: [
      {
        id: "obstacle_time",
        title: "It's hard to find time",
        summaryData: {
          image: {
            dark: "https://s3.usespeak.com/images/onboarding/obstacle_time_dark.png",
            light:
              "https://s3.usespeak.com/images/onboarding/obstacle_time.png",
          },
          title:
            "Time is precious, and that's why Speak lessons average just 5 minutes long!",
          subtitle:
            "You can pause any time, and when you're ready to restart, it's super easy to pick up from right where you left off!",
        },
      },
      {
        id: "obstacle_stay_motivated",
        title: "It's hard to stay motivated",
        summaryData: {
          image: {
            dark: "https://s3.usespeak.com/images/onboarding/obstacle_stay_motivated.png",
            light:
              "https://s3.usespeak.com/images/onboarding/obstacle_stay_motivated.png",
          },
          title: "We all find it hard to stay motivated sometimes! 😓",
          subtitle:
            "We have fun monthly challenges with prizes, smart methods to review, and great ways to track your progress.\n\nMost importantly, our lessons are designed to keep you interested!",
        },
      },
      {
        id: "obstacle_lack_opportunities",
        title: "Lack of opportunities to speak",
        summaryData: {
          image: {
            dark: "https://s3.usespeak.com/images/onboarding/obstacle_lack_opportunities_dark.png",
            light:
              "https://s3.usespeak.com/images/onboarding/obstacle_lack_opportunities.png",
          },
          title: "Finding opportunities to practice Spanish is hard!",
          subtitle:
            "This is why we built Speak: To make the experience of speaking with someone face-to-face something you can do anytime, anywhere!",
        },
      },
      {
        id: "obstacle_remember",
        title: "Remembering what I learned",
        summaryData: {
          image: {
            dark: "https://s3.usespeak.com/images/onboarding/obstacle_remember_dark.png",
            light:
              "https://s3.usespeak.com/images/onboarding/obstacle_remember.png",
          },
          title: "Why learn something if you can't remember it? 😬",
          subtitle:
            "At Speak, we've built a proven method that will not only help you to learn new words and concepts, but to also remember them down the road!",
        },
      },
      {
        id: "obstacle_nervous",
        title: "I'm too nervous to speak",
        summaryData: {
          image: {
            dark: "https://s3.usespeak.com/images/onboarding/obstacle_nervous_dark.png",
            light:
              "https://s3.usespeak.com/images/onboarding/obstacle_nervous.png",
          },
          title: "You [can] and [will] build confidence  over time 💪",
          subtitle:
            'With Speak, you can practice conversational Spanish with our Speak Tutor.\n\nThe next time you need to speak Spanish, you won\'t be stuck at "Hello."',
        },
      },
      {
        id: "obstacle_hard",
        title: "Spanish might be too hard",
        summaryData: {
          image: {
            dark: "https://s3.usespeak.com/images/onboarding/obstacle_hard.png",
            light:
              "https://s3.usespeak.com/images/onboarding/obstacle_hard.png",
          },
          title: "Speak is designed for learners of all skill levels!",
          subtitle:
            "Our thousands of lessons cover all experiences and topics. We make sure our content is relevant and that concepts are explained clearly for you!\n\nYou are capable of it, and it WILL be fun and rewarding!",
        },
      },
    ],
  },
  {
    type: "select",
    layout: "list",
    name: "level",
    title: "How would you rate your Spanish?",
    subtitle: null,
    options: [
      {
        id: "level_0",
        icon: "https://s3.usespeak.com/images/onboarding/level_0.png",
        title: "Level 0",
        subtitle: "I know a few words",
      },
      {
        id: "level_1",
        icon: "https://s3.usespeak.com/images/onboarding/level_1.png",
        title: "Level 1",
        subtitle:
          "I know basic phrases. I am able to introduce myself and ask simple personal questions.",
      },
      {
        id: "level_2",
        icon: "https://s3.usespeak.com/images/onboarding/level_2.png",
        title: "Level 2",
        subtitle:
          "I understand common expressions. I can communicate about routine tasks and describe simple aspects of my background.",
      },
      {
        id: "level_3",
        icon: "https://s3.usespeak.com/images/onboarding/level_3.png",
        title: "Level 3",
        subtitle:
          "I can explain my opinions, dreams, and ambitions. I can handle complex tasks while traveling.",
      },
      {
        id: "level_4",
        icon: "https://s3.usespeak.com/images/onboarding/level_4.png",
        title: "Level 4",
        subtitle:
          "I can speak with a native speaker without straining. I can have complex technical discussions about my work.",
      },
    ],
    confirmSelection: true,
  },
  {
    type: "select",
    layout: "list",
    name: "goal",
    title: "Where would you like Speak to help you improve?",
    subtitle: "Choose your [top two] goals",
    options: [
      {
        id: "goal_improve_pronunciation",
        title: "👄 Improve my pronunciation",
      },
      {
        id: "goal_confidence_speaking",
        title: "🗣 Gain confidence speaking",
      },
      {
        id: "goal_learn_useful_words",
        title: "💪 Learn useful words and phrases",
      },
      {
        id: "goal_improve_listening_skills",
        title: "👂 Improve my listening skills",
      },
      {
        id: "goal_other",
        title: "🎯 Other",
      },
    ],
    minRequiredOptions: 2,
    maxRequiredOptions: 2,
  },
  {
    type: "select",
    layout: "list",
    name: "frequency",
    title: "How often do you want to practice Spanish?",
    subtitle: "By choosing a goal now, you are much more likely to achieve it!",
    options: [
      {
        id: "frequency_few_minutes_day",
        skipNotifications: false,
        title: "A few minutes every day",
      },
      {
        id: "frequency_few_times_week",
        skipNotifications: false,
        title: "A few times each week",
      },
      {
        id: "frequency_few_times_month",
        skipNotifications: false,
        title: "A few times each month",
      },
      {
        id: "frequency_cant_commit",
        skipNotifications: true,
        title: "I can't commit right now",
      },
    ],
  },
];
