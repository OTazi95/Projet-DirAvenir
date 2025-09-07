const questions = [
  // Category 1: Interests and Passions
  {
    id: "q1",
    category: "Interests and Passions",
    type: "single",
    question:
      "If time and money weren't an issue, what activity would you choose for your ideal day?",
    options: [
      { id: "A", text: "Create something new (build, code, design)", icon: "🔧" },
      { id: "B", text: "Understand how things work (experiment, analyze, solve puzzles)", icon: "🔬" },
      { id: "C", text: "Interact with and help others (counsel, teach, heal)", icon: "🤝" },
      { id: "D", text: "Organize and manage projects (plan, lead, optimize)", icon: "📋" },
      { id: "E", text: "Express my creativity (paint, write, music, videos)", icon: "🎨" },
    ],
  },
  {
    id: "q2",
    category: "Interests and Passions",
    type: "multiple",
    minSelections: 1,
    maxSelections: 3,
    question:
      "When you browse the internet or watch videos, what type of content captures your attention most?",
    options: [
      { key: "tech", label: "Scientific discoveries, Technology, innovation", icon: "🚀" },
      { key: "art", label: "Art and culture, Design and creation", icon: "🎭" },
      { key: "social", label: "Personal development, Social causes", icon: "💖" },
      { key: "business", label: "Economic news, Business strategies", icon: "💼" },
      { key: "organization", label: "Organization, Project management", icon: "📊" },
      { key: "manual", label: "Sports, DIY and crafts", icon: "🔨" },
    ],
  },
  {
    id: "q3",
    category: "Interests and Passions",
    type: "single",
    question: "Imagine a store. Which section are you naturally drawn to?",
    options: [
      { id: "A", text: "Electronics, gadgets or tools section", icon: "📡" },
      { id: "B", text: "Science, philosophy books or documentaries", icon: "📚" },
      { id: "C", text: "Art supplies, musical instruments, decorative items", icon: "🎸" },
      { id: "D", text: "Personal development books, board/video games", icon: "🧠" },
      { id: "E", text: "Clothing, fashion accessories, luxury items", icon: "👗" },
    ],
  },

  // Category 2: Skills and Abilities
  {
    id: "q4",
    category: "Skills and Abilities",
    type: "single",
    question: "When faced with a complex problem, what's your first reaction?",
    options: [
      { id: "A", text: "Break it down into small logical steps", icon: "🧩" },
      { id: "B", text: "Look for data and facts", icon: "📊" },
      { id: "C", text: "Imagine original solutions", icon: "💡" },
      { id: "D", text: "Ask others for their opinion and co-create", icon: "👥" },
    ],
  },
  {
    id: "q5",
    category: "Skills and Abilities",
    type: "ranking", // 3 choices, weighted 4/3/2
    question: "Among these activities, which come most naturally to you? (Rank 3)",
    options: [
      { key: "budget", label: "Managing a budget", icon: "💰" },
      { key: "event", label: "Organizing an event", icon: "🗂️" },
      { key: "write", label: "Writing clear text", icon: "✍️" },
      { key: "fix", label: "Fixing a device", icon: "🛠️" },
      { key: "draw", label: "Drawing or painting", icon: "🎨" },
      { key: "equation", label: "Solving complex equations", icon: "➗" },
      { key: "convince", label: "Convincing someone of an idea", icon: "🗣️" },
      { key: "counsel", label: "Listening to and counseling a friend", icon: "🤗" },
    ],
  },
  {
    id: "q6",
    category: "Skills and Abilities",
    type: "single",
    question: "When you need to learn something new, how do you prefer to do it?",
    options: [
      { id: "A", text: "Read and take detailed notes", icon: "📖" },
      { id: "B", text: "Watch video tutorials/demonstrations", icon: "🎥" },
      { id: "C", text: "Try it myself and practice", icon: "🧪" },
      { id: "D", text: "Discuss with others and exchange ideas", icon: "💬" },
    ],
  },

  // Category 3: Values and Goals
  {
    id: "q7",
    category: "Values and Goals",
    type: "single",
    question: "What type of impact would you like to have in the world?",
    options: [
      { id: "A", text: "Improve individuals' lives directly", icon: "❤️" },
      { id: "B", text: "Create more efficient systems/products", icon: "🧠" },
      { id: "C", text: "Contribute to beauty and culture", icon: "🎭" },
      { id: "D", text: "Defend a cause/promote social justice", icon: "⚖️" },
    ],
  },
  {
    id: "q8",
    category: "Values and Goals",
    type: "single",
    question:
      "Choose the image that best represents the work environment where you would thrive most.",
    options: [
      { id: "A", text: "A laboratory or research center", icon: "🏛️" },
      { id: "B", text: "An open and collaborative office", icon: "🏢" },
      { id: "C", text: "A workshop or creative studio", icon: "🎙️" },
      { id: "D", text: "Outdoors, nature, a construction site", icon: "🏞️" },
      { id: "E", text: "A quiet and individual environment", icon: "📚" },
    ],
  },
  {
    id: "q9",
    category: "Values and Goals",
    type: "sliders", // 4 sliders 0..5
    question: "When you think about your future career, what matters most?",
    labels: {
      securite: "Security / Job stability",
      innovation: "Innovation / Being at the forefront",
      autonomie: "Autonomy / Freedom of decision",
      salaire: "High salary / Opportunities",
    },
  },
  {
    id: "q10",
    category: "Values and Goals",
    type: "single",
    question: "If you had to solve a major problem, what would be your main motivation?",
    options: [
      { id: "A", text: "Understanding the root of the problem", icon: "🔎" },
      { id: "B", text: "Quickly implementing a concrete solution", icon: "⚙️" },
      { id: "C", text: "Rallying people around the solution", icon: "📣" },
      { id: "D", text: "Developing an advanced technological solution", icon: "🤖" },
    ],
  },

  // Category 4: Work Preferences and Personality
  {
    id: "q11",
    category: "Work Preferences",
    type: "single",
    question: "Do you prefer to work:",
    options: [
      { id: "A", text: "Alone, with complete autonomy", icon: "🧍‍♀️" },
      { id: "B", text: "In a small team", icon: "👥" },
      { id: "C", text: "In a large organization", icon: "🏛️" },
    ],
  },
  {
    id: "q12",
    category: "Work Preferences",
    type: "single",
    question: "During a presentation, you prefer to:",
    options: [
      { id: "A", text: "Present facts clearly", icon: "📑" },
      { id: "B", text: "Tell a story to capture attention", icon: "📖" },
      { id: "C", text: "Answer questions and interact", icon: "🙋" },
    ],
  },
  {
    id: "q13",
    category: "Work Preferences",
    type: "single",
    question: "When making an important decision, you rely most on:",
    options: [
      { id: "A", text: "Logic and analysis of facts", icon: "🧠" },
      { id: "B", text: "Your intuition and feelings", icon: "💙" },
      { id: "C", text: "The opinion of people you respect", icon: "👨‍👩‍👧‍👦" },
    ],
  },

  // Category 5: Subjects and Academic Path
  {
    id: "q14",
    category: "Subjects and Academic Path",
    type: "multiple",
    minSelections: 2,
    maxSelections: 3,
    question:
      "Among these subject groups, which ones have most fascinated you? (2 to 3 choices)",
    options: [
      { key: "sciences", label: "Sciences (Math, Physics-Chemistry, Biology)" },
      { key: "litterature", label: "Literature and Languages" },
      { key: "shs", label: "Social Sciences and Humanities" },
      { key: "arts", label: "Arts and Design" },
      { key: "tech", label: "Technology and Computer Science" },
      { key: "gestion", label: "Management and Economics" },
    ],
  },
];

export default questions;