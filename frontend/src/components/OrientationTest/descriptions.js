const MAJOR_DESCRIPTIONS = {
  'Civil Engineering': {
    description: "Civil Engineering is a field focused on the design and construction of infrastructure. It combines scientific theory with practical application to create the bridges, roads, and buildings that shape our environment.",
    strengths: [
      {
        icon: '🔧',
        title: 'You Are a Natural Problem-Solver',
        description: 'Your passion for technical challenges and your aptitude for manual work will give you a head start in this field.'
      },
      {
        icon: '📐',
        title: 'You Thrive on Structure and Precision',
        description: 'Your sense of organization and analytical rigor are major assets for managing large-scale projects.'
      },
      {
        icon: '🌍',
        title: 'You Are Driven to Make a Lasting Impact',
        description: 'This major aligns with your desire to have a concrete social impact by building the foundations of tomorrow\'s world.'
      }
    ]
  },

  'Mechanical Engineering': {
    description: "Mechanical Engineering is the heart of industrial innovation. It covers the design, analysis, and manufacturing of mechanical systems, from car engines to industrial robots, using physics and mathematics to create efficient and sustainable solutions.",
    strengths: [
      {
        icon: '🧠 ',
        title: 'You Have a Strong Analytical Mind',
        description: 'Your analytical profile and interest in science and technology will allow you to solve the most complex problems.'
      },
      {
        icon: '🛠️',
        title: 'You Excel at Bringing Ideas to Life',
        description: 'Your talent for manual and technical work is essential for bringing your creations to life.'
      },
      {
        icon: '💡',
        title: 'You Possess a Deep Drive to Innovate',
        description: 'Your desire to innovate and your curious spirit are the driving forces that will help you excel in this field.'
      }
    ]
  },

  'Architecture': {
    description: "Architecture is the discipline that shapes our built environment. It combines artistic creativity with engineering rigor to design functional, aesthetic, and environmentally respectful spaces.",
    strengths: [
      {
        icon: '🎨',
        title: 'Your Creativity Is Your Superpower',
        description: 'Your very strong creativity and passion for art are at the heart of this major.'
      },
      {
        icon: '🏙️',
        title: 'You Are Motivated by Social Impact and Innovation',
        description: 'Your desire to have a social impact and your innovative spirit perfectly match the architect\'s mission.'
      },
      {
        icon: '📋',
        title: 'You Value Autonomy and Organization',
        description: 'Your need for autonomy and sense of organization are crucial assets for successfully completing your projects.'
      }
    ]
  },

  'International Business': {
    description: "International Business prepares you to become a player in global markets. This major focuses on the economic, legal, and cultural aspects of cross-border trade, teaching you to operate in a complex international environment.",
    strengths: [
      {
        icon: '🗣️',
        title: 'You Are a Skilled Communicator and Negotiator',
        description: 'Your ease in communication and talent for negotiation are fundamental skills for success in international business.'
      },
      {
        icon: '📊',
        title: 'You Have a Strategic and Analytical Mind',
        description: 'Your analytical mind and management sense will allow you to navigate the complex challenges of global commerce.'
      },
      {
        icon: '🚀',
        title: 'You Are an Autonomous Innovator',
        description: 'Your need for autonomy and desire to innovate align well with the flexibility and strategic vision required in this field.'
      }
    ]
  },

  'Business Administration': {
    description: "Business Administration is the ideal major for leading organizations. You will learn the fundamental principles of management, finance, marketing, and human resources to make strategic decisions.",
    strengths: [
      {
        icon: '📈',
        title: 'You Have a Talent for Organization and Leadership',
        description: 'Your talent for organization and desire to manage projects are at the heart of this field.'
      },
      {
        icon: '🤝',
        title: 'You Are a Collaborative Communicator',
        description: 'Your ease in communication and ability to work in teams are major assets for leadership.'
      },
      {
        icon: '🎯',
        title: 'You Are Eager to Make an Impact through Management',
        description: 'Your interest in business strategies and desire to have an impact through management perfectly match this major.'
      }
    ]
  },

  'International Economics and Trade': {
    description: "This major allows you to understand the forces that drive the global economy. It combines economic theory with the realities of international trade to solve complex problems on a planetary scale.",
    strengths: [
      {
        icon: '🧐',
        title: 'You Have a Strong Logical and Analytical Mind',
        description: 'Your very strong logic and interest in economic current events are the foundations of this major.'
      },
      {
        icon: '🌐',
        title: 'You Want to Make a Global Societal Impact',
        description: 'Your desire to have a societal impact and analytical capacity will allow you to navigate the challenges of global trade.'
      },
      {
        icon: '📚',
        title: 'You Enjoy Theoretical Research and Independent Work',
        description: 'Your preference for theoretical research and autonomous spirit are essential qualities for economic modeling.'
      }
    ]
  },

  'Marketing and Management': {
    description: "Marketing and Management are at the heart of business growth. This major teaches you to understand consumer behavior, design impactful campaigns, and lead teams.",
    strengths: [
      {
        icon: '🗣️',
        title: 'Your Communication and Creativity Set You Apart',
        description: 'Your ease in communication and very strong creativity are the driving forces of this field.'
      },
      {
        icon: '🤝',
        title: 'You Excel at Organized and Collaborative Work',
        description: 'Your sense of organization and ability to work in teams are major assets for managing projects and teams.'
      },
      {
        icon: '💡',
        title: 'You Are Driven by Innovation and Challenges',
        description: 'Your desire to innovate and take on challenges is a prerequisite for standing out in this dynamic field.'
      }
    ]
  },

  'Computer Science': {
    description: "Computer Science is the science that studies computers and their applications. This major explores programming, artificial intelligence, and network security to design tomorrow's technologies.",
    strengths: [
      {
        icon: '💻',
        title: 'Your Logical Mind Is Built for Technology',
        description: 'Your logical and analytical mind and interest in technology are the pillars of this field.'
      },
      {
        icon: '✨',
        title: 'You Are a Problem-Solver and Innovator',
        description: 'Your talent for solving complex problems and thirst for innovation will lead you to excellence.'
      },
      {
        icon: '🧠 ',
        title: 'You Thrive on Autonomy and Theoretical Work',
        description: 'Your need for autonomy and taste for theoretical research are key qualities for programming and algorithm design.'
      }
    ]
  },

  'Software Engineering': {
    description: "Software Engineering is the art and science of designing, developing, and maintaining quality software. It's the ideal major for building reliable and efficient computer systems.",
    strengths: [
      {
        icon: '🤖',
        title: 'Your Analytical Mind Is an Ideal Fit',
        description: 'Your logical and analytical mind combined with your interest in technology makes you an ideal candidate.'
      },
      {
        icon: '📋',
        title: 'You Excel at Solving Problems and Organizing Projects',
        description: 'Your talent for problem solving and sense of organization are essential for managing development projects.'
      },
      {
        icon: '💬',
        title: 'You Are a Strong Team Player and Communicator',
        description: 'Your strong preference for teamwork and communication are major assets in a field that relies on collaboration.'
      }
    ]
  },

  'Artificial Intelligence': {
    description: "Artificial Intelligence is the frontier of technological innovation. This major explores machine learning and deep learning to design systems capable of solving complex problems autonomously.",
    strengths: [
      {
        icon: '🧠',
        title: 'Your Logical Mind Is a Perfect Foundation',
        description: 'Your incredible logical and analytical mind is the foundation of this discipline.'
      },
      {
        icon: '🚀',
        title: 'You Are Driven by a Thirst for Innovation',
        description: 'Your thirst for innovation and desire to take on challenges are major assets for breaking through in this field.'
      },
      {
        icon: '🧪',
        title: 'You Excel at Theoretical and Independent Work',
        description: 'Your preference for theoretical research and autonomous work will allow you to dive into the complex concepts of AI.'
      }
    ]
  },

  'Tourism Management': {
    description: "Tourism Management is a major that combines commercial aspects with strong customer service. It teaches you to organize trips and promote destinations to create memorable experiences for others.",
    strengths: [
      {
        icon: '🗣️',
        title: 'You Are a Natural Communicator',
        description: 'Your ease in communication and interest in social interaction are the pillars of this major.'
      },
      {
        icon: '🗓️',
        title: 'You Have a Gift for Organization and Project Management',
        description: 'Your great sense of organization and ability to manage projects are fundamental skills.'
      },
      {
        icon: '🗺️',
        title: 'You Find Fulfillment in Hands-On Work',
        description: 'Your desire to have a positive impact on people and preference for practical work align perfectly with tourism reality.'
      }
    ]
  },

  'Nursing': {
    description: "Nursing is a vocation. It's a major for those with deep empathy and a desire to help others, working in teams to ensure patient well-being.",
    strengths: [
      {
        icon: '❤️‍🩹',
        title: 'You Are a Compassionate and Empathetic Person',
        description: 'Your interest in social and human interaction and desire to have a direct social impact make you an ideal candidate.'
      },
      {
        icon: '🤝',
        title: 'You Are a Collaborative and Effective Communicator',
        description: 'Your ease in communication and preference for teamwork are absolutely essential in the medical field.'
      },
      {
        icon: '💉',
        title: 'You Have a Talent for Hands-On Practice',
        description: 'Your taste for manual practice and manual work are essential qualities for daily technical tasks.'
      }
    ]
  },

  'Pharmacy': {
    description: "Pharmacy is the major for scientific minds who want to contribute to people's health through the science of medicine. It explores chemistry, biology, and drug mechanisms of action.",
    strengths: [
      {
        icon: '🔬',
        title: 'You Possess a Strong Scientific and Analytical Mind',
        description: 'Your scientific and analytical mind is the basis of pharmacy.'
      },
      {
        icon: '📋',
        title: 'You Are Rigorous and Highly Organized',
        description: 'Your strong sense of organization and rigor are indispensable for inventory management and protocol application.'
      },
      {
        icon: '💊',
        title: 'You Are a Team Player with a Desire to Help',
        description: 'Your desire to have a societal impact and preference for teamwork are essential qualities for advising patients and collaborating with medical staff.'
      }
    ]
  },

  'Electrical Engineering': {
    description: "Electrical Engineering is the driving force of modern technology. This major allows you to design electrical and electronic systems for everything from phones to electrical grids.",
    strengths: [
      {
        icon: '💡',
        title: 'Your Scientific and Logical Profile Is a Major Asset',
        description: 'Your scientific and logical profile is an undeniable asset in this field.'
      },
      {
        icon: '🛠️',
        title: 'You Are Driven by Innovation and Practical Work',
        description: 'Your desire to innovate and taste for practical work will lead you to create tomorrow\'s technologies.'
      },
      {
        icon: '🤝',
        title: 'You Are a Collaborative Problem-Solver',
        description: 'Your talent for problem solving and preference for teamwork are key qualities for success.'
      }
    ]
  },

  'Food Science and Engineering': {
    description: "Food Science and Engineering is the meeting point between science and gastronomy. This major allows you to understand food composition and ensure their safety and quality, developing new products and sustainable production methods.",
    strengths: [
      {
        icon: '🧬',
        title: 'Your Logical and Scientific Mind is a Key Strength',
        description: 'Your scientific mind and logic are essential for understanding the biological and chemical processes of food.'
      },
      {
        icon: '🧑‍🍳',
        title: 'You Have a Talent for Hands-On, Organized Work',
        description: 'Your sense of organization and taste for practical work are major assets for product development and quality control.'
      },
      {
        icon: '🍎',
        title: 'You Are Driven to Create a Concrete Social Impact',
        description: 'This major aligns with your desire to have a concrete social impact by ensuring healthy and sustainable food for all.'
      }
    ]
  },

  'Finance': {
    description: "Finance is the major for analytical and ambitious minds. This field gives you the keys to understand and influence the economic world, managing assets and evaluating risks.",
    strengths: [
      {
        icon: '💹',
        title: 'You Have a Strong Logical Mind and Strategic Interest',
        description: 'Your very strong logic and interest in business strategies are the foundations of this field.'
      },
      {
        icon: '📈',
        title: 'You Are Organized and Meticulous with Details',
        description: 'Your excellent sense of organization and rigor are indispensable for risk management and data analysis.'
      },
      {
        icon: '🚀',
        title: 'You Are an Autonomous, Challenge-Driven Person',
        description: 'Your desire for challenges and need for autonomy are qualities that will make you excel in this environment.'
      }
    ]
  },

  'Mechanical Design, Manufacturing and Automation': {
    description: "This major is the meeting point between creativity and production. It allows you to design machines and systems, while mastering CAD tools, robotics, and manufacturing processes to automate industry.",
    strengths: [
      {
        icon: '🔩',
        title: 'Your Scientific Mind and Manual Passion are a Great Combo',
        description: 'Your scientific profile and passion for manual work are the basis of this major.'
      },
      {
        icon: '💡',
        title: 'You Are Driven by Innovation and Complex Problems',
        description: 'Your desire to innovate and solve complex problems is the driving force of this field.'
      },
      {
        icon: '🛠️',
        title: 'You Thrive on Organized, Hands-On Work',
        description: 'Your sense of organization and preference for practical work align perfectly with this engineering field.'
      }
    ]
  },

  'Science of Law': {
    description: "The Science of Law is the foundation of justice. It requires great logical rigor and ability to analyze complex texts, preparing you to defend rights and promote justice.",
    strengths: [
      {
        icon: '⚖️',
        title: 'Your Strong Logic and Analytical Skills are Essential',
        description: 'Your very strong logic and analytical ability are the pillars of this discipline.'
      },
      {
        icon: '📚',
        title: 'You Excel at Communication and Theoretical Research',
        description: 'Your ease in communication and taste for theoretical research will allow you to master law interpretation.'
      },
      {
        icon: '🤝',
        title: 'You Are Driven to Promote Social Justice',
        description: 'Your motivation to promote social justice and need for autonomy align perfectly with a legal professional\'s responsibilities.'
      }
    ]
  },

  'International Politics': {
    description: "International Politics is a major for those who want to understand and influence relations between nations. It gives you the keys to analyze conflicts, foreign policies, and international organizations.",
    strengths: [
      {
        icon: '🗣️',
        title: 'You Are a Skilled Communicator with an Interest in Humanities',
        description: 'Your interest in humanities and ease in communication are essential qualities in this field.'
      },
      {
        icon: '🌎',
        title: 'You Are an Analytical Mind with a Desire for Social Impact',
        description: 'Your analytical mind and desire to have a social impact are powerful motivations for studying global politics.'
      },
      {
        icon: '🤝',
        title: 'You Thrive on Teamwork and Theoretical Research',
        description: 'Your preference for teamwork and theoretical research will help you understand the world\'s complex issues.'
      }
    ]
  },

  'MBBS': {
    description: "MBBS is the path to medicine. It's a demanding field that prepares you to diagnose, treat, and prevent diseases, dedicating yourself to the health and well-being of others.",
    strengths: [
      {
        icon: '🔬',
        title: 'Your Scientific and Logical Mind Is a Perfect Match',
        description: 'Your scientific mind and logic is the basis of this demanding field.'
      },
      {
        icon: '🩺',
        title: 'You Are a Dedicated Team Player Who Wants to Help Others',
        description: 'Your desire to have a direct social impact and ability to work in teams are fundamental human qualities for medical practice.'
      },
      {
        icon: '🧠',
        title: 'Your Rigor and Problem-Solving Skills Will Make You Excel',
        description: 'Your rigor and talent for problem solving will lead you to excel in this vocation.'
      }
    ]
  },

  'Public Relations': {
    description: "Public Relations is the art of building and maintaining a good image. This major teaches you to manage an organization's reputation, interact with media, and create impactful campaigns.",
    strengths: [
      {
        icon: '💬',
        title: 'Your Communication Skills and Creativity Are a Driving Force',
        description: 'Your ease in communication and creativity are the driving forces of this field.'
      },
      {
        icon: '📰',
        title: 'You Are Driven by Social Impact and the Humanities',
        description: 'Your desire to have a social impact and interest in humanities are valuable assets.'
      },
      {
        icon: '🤝',
        title: 'You Are an Organized Team Player',
        description: 'Your preference for teamwork and sense of organization are essential qualities.'
      }
    ]
  },

  'Applied Chemistry': {
    description: "Applied Chemistry is the major for scientific minds who want to transform the physical world. It uses chemistry principles to solve practical problems, developing new medicines, creating innovative materials, or purifying the environment.",
    strengths: [
      {
        icon: '🧪',
        title: 'Your Scientific Mind and Passion for Research Are Key',
        description: 'Your scientific and logical profile and passion for research are the pillars of this field.'
      },
      {
        icon: '💡',
        title: 'You Are a Driven Innovaton and Social Impact',
        description: 'Your desire to innovate and have a social impact will motivate you to create concrete solutions.'
      },
      {
        icon: '🔬',
        title: 'You Enjoy Practical and Hands-On Lab Work',
        description: 'Your taste for practical and manual work is a major asset for laboratory experiments.'
      }
    ]
  },

  'English': {
    description: "The English major is for those passionate about literature, languages, and culture. It allows you to explore the richness of language and thought to develop critical thinking and persuasive communication.",
    strengths: [
      {
        icon: '✍️',
        title: 'You Have a Natural Flair for Creativity and Communication',
        description: 'Your strong creativity and ease in communication are at the heart of this major.'
      },
      {
        icon: '📖',
        title: 'You Thrive on Theoretical Research and Humanities',
        description: 'Your interest in humanities and theoretical research will allow you to deepen literature and cultures.'
      },
      {
        icon: '🧠',
        title: 'You Are an Autonomous and Analytical Thinker',
        description: 'Your need for autonomy and analytical mind are essential assets for research and writing projects.'
      }
    ]
  },

  'Dentistry': {
    description: "Dentistry is a health science focused on the mouth and teeth. It combines precise scientific knowledge with great dexterity to diagnose and treat oral diseases.",
    strengths: [
      {
        icon: '🦷',
        title: 'Your Scientific and Logical Mind Is Indispensable',
        description: 'Your scientific ans logical mind is indispensable for dental practice.'
      },
      {
        icon: '🤝',
        title: 'You Are Driven to Help People with Hands-On Work',
        description: 'Your desire to have a direct social impact and ability to work in teams are fundamental human qualities.'
      },
      {
        icon: '🛠️',
        title: 'You Are Meticulous and Have a Talent for Precision',
        description: 'Your talent for manual work and rigor are essential for the precision of daily tasks.'
      }
    ]
  },

  'New Energy Science and Engineering': {
    description: "This major is the future of energy. It prepares you to design, develop, and implement sustainable energy systems for a cleaner and more efficient world.",
    strengths: [
      {
        icon: '💡',
        title: 'Your Scientific and Analytical Mind is Your Foundation',
        description: 'Your scientific and analytical profile is the basis of this field.'
      },
      {
        icon: '🌍',
        title: 'You Are Driven to Innovate for a Better World',
        description: 'Your desire to have a strong social impact and innovate for a better world will motivate you every day.'
      },
      {
        icon: '🛠️',
        title: 'You Are a Practical, Hands-On Problem-Solver',
        description: 'Your preference for practical work and problem solving is a major asset for this discipline.'
      }
    ]
  },

  'Hydraulic Engineering': {
    description: "Hydraulic Engineering is the science of water management. This major offers you the opportunity to solve crucial problems for society, designing dams or water management systems for irrigation and energy production.",
    strengths: [
      {
        icon: '🧠',
        title: 'Your Scientific and Logical Mind Is a Great Asse',
        description: 'Your scientific mind and logic is an indispensable asset for this major.'
      },
      {
        icon: '📋',
        title: 'You Excel at Organized and Practical Project Work',
        description: 'Your sense of organization and taste for practical field work are essential qualities for managing field projects.'
      },
      {
        icon: '💧',
        title: 'You Are Motivated by Social Impact and Problem-Solving',
        description: 'Your desire to have a social impact and ability to solve complex problems will allow you to succeed.'
      }
    ]
  },

  'Transportation Engineering': {
    description: "Transportation Engineering is an essential major for city development. It teaches you to design road, rail, and airport networks to improve mobility and create sustainable infrastructure for the population.",
    strengths: [
      {
        icon: '🗺️',
        title: 'Your Logical Mind and Organizational Skills Are Fundamental',
        description: 'Your logical and analytical mind and sense of organization are fundamental qualities for this field.'
      },
      {
        icon: '🌆',
        title: 'You Want to Make a Social Impact through Practical Work',
        description: 'Your desire to have a social impact and preference for practical work align perfectly with the field\'s objectives.'
      },
      {
        icon: '🤝',
        title: 'You Are a Collaborative Problem-Solver',
        description: 'Your ability to solve complex problems and preference for teamwork are major assets.'
      }
    ]
  },

  'Bioengineering': {
    description: "Bioengineering is the convergence of engineering and biology. It applies engineering principles to solve medical and biological problems, designing prosthetics, medical implants, or new treatment technologies.",
    strengths: [
      {
        icon: '🧬',
        title: 'Your Scientific and Logical Profile Is at the Core',
        description: 'Your scientific and logical profile is the heart of this discipline.'
      },
      {
        icon: '❤️‍🩹',
        title: 'You Are Driven to Innovate and Improve Human Health',
        description: 'Your desire to have a strong social impact and innovate to improve human health will motivate you every day.'
      },
      {
        icon: '🔬',
        title: 'You Enjoy Hands-On Research and Practical Work',
        description: 'Your taste for manual practice and research is a major asset for designing new medical technologies.'
      }
    ]
  },

  'Biotechnology': {
    description: "Biotechnology uses living organisms to create new products and technologies. This major is for those who want to push the boundaries of science to solve global problems in genetics, microbiology, or biochemistry.",
    strengths: [
      {
        icon: '🧪',
        title: 'Your Scientific Mind and Passion for Research Are Key',
        description: 'Your scientific and logical mind and passion for research are the basis of this field.'
      },
      {
        icon: '🧬',
        title: 'You Are an Innovator with a Desire for Social Impact',
        description: 'Your thirst for innovation and having a social impact will push you to create sustainable solutions for health and environment.'
      },
      {
        icon: '🔬',
        title: 'You Enjoy Hands-On and Collaborative Lab Work',
        description: 'Your preference for practical work and laboratory collaboration are essential assets.'
      }
    ]
  },

  'Materials Science and Engineering': {
    description: "Materials Science and Engineering is the discipline that brings to life the objects around us. This major allows you to understand material structure and design new ones that are lighter and more efficient, for aerospace, medical, or electronic applications.",
    strengths: [
      {
        icon: '🔬',
        title: 'Your Scientific and Analytical Profile Is an Undeniable Asset',
        description: 'Your scientific and analytical profile is an undeniable asset in this field.'
      },
      {
        icon: '💡',
        title: 'You Are an Innovator and Problem-Solver',
        description: 'Your taste for innovation and problem solving will lead you to design the materials of the future.'
      },
      {
        icon: '🛠️',
        title: 'You Excel at Hands-On, Practical Work',
        description: 'Your talent for practical and manual work is a major advantage for characterizing and creating new materials.'
      }
    ]
  },

  'E-Commerce': {
    description: "E-Commerce is the engine of modern commerce. This major will give you the keys to create and manage online stores by mastering digital marketing, logistics, and data analysis.",
    strengths: [
      {
        icon: '🛒',
        title: 'Your Creativity and Business Interest Drive You',
        description: 'Your interest in business management and creativity are at the heart of e-commerce.'
      },
      {
        icon: '📊',
        title: 'You Are Organized and Have a Talent for Problem-Solving',
        description: 'Your sense of organization and ability to solve problems are essential for the success of your projects.'
      },
      {
        icon: '🚀',
        title: 'You Are an Autonomous Innovator',
        description: 'Your desire to innovate and preference for autonomous work align perfectly with this constantly evolving field.'
      }
    ]
  },

  'Robot Engineering': {
    description: "Robot Engineering is the convergence of computer science, mechanics, and electronics. It's the major for creative and analytical minds who want to design and build intelligent robots.",
    strengths: [
      {
        icon: '🤖',
        title: 'Your Logical and Scientific Mind Is a Perfect Fit',
        description: 'Your scientific mind and logic is the basis of this field.'
      },
      {
        icon: '🛠️',
        title: 'You Are a Creative and Hands-On Builder',
        description: 'Your taste for creativity and manual work will allow you to design robots from A to Z.'
      },
      {
        icon: '💡',
        title: 'You Are a Problem-Solver and Innovator',
        description: 'Your thirst for innovation and talent for problem solving are major assets for breaking through in this future-oriented field.'
      }
    ]
  },

  'Biomedical Engineering': {
    description: "Biomedical Engineering is the link between engineering and medicine. It applies engineering principles to solve clinical problems and improve human health.",
    strengths: [
      {
        icon: '🧬',
        title: 'Your Logical Mind and Interest in Technology Align Perfectly',
        description: 'Your scientific and logical mind and interest in technology are the pillars of this discipline.'
      },
      {
        icon: '❤️‍🩹',
        title: 'You Are Driven to Innovate for Human Health',
        description: 'Your desire to have a strong social impact and innovate for human health will motivate you every day.'
      },
      {
        icon: '🤝',
        title: 'You Thrive on Collaborative Research and Teamwork',
        description: 'Your preference for research and teamwork are essential assets for collaborative projects.'
      }
    ]
  },

  'Data Science': {
    description: "Data Science is the discipline that makes sense of masses of information. This major allows you to extract knowledge from data to predict trends and make informed decisions.",
    strengths: [
      {
        icon: '📊',
        title: 'Your Strong Logic and Scientific Mind are a Great Match',
        description: 'Your very strong logic and scientific mind are the basis of data science.'
      },
      {
        icon: '📈',
        title: 'You Are a Problem-Solver with a Thirst for Innovation',
        description: 'Your thirst for innovation and talent for problem solving will lead you to excel in this rapidly expanding field.'
      },
      {
        icon: '🧠',
        title: 'You Excel at Autonomous and Theoretical Work',
        description: 'Your need for autonomy and taste for theory are essential qualities for analysis and modeling.'
      }
    ]
  },

  'Economics': {
    description: "Economics is the science that studies the production, distribution, and consumption of wealth. It gives you the tools to analyze markets and public policies, and solve social and economic problems using data and logic.",
    strengths: [
      {
        icon: '📈',
        title: 'You Are a Logical and Analytical Thinker',
        description: 'Your very strong logic and analytical ability are the foundations of economic thinking.'
      },
      {
        icon: '🌍',
        title: 'You Are Motivated by Social Causes and the Humanities',
        description: 'Your motivation to defend a social cause and interest in humanities are major assets.'
      },
      {
        icon: '🧠',
        title: 'You Are an Autonomous Theorist',
        description: 'Your need for autonomy and preference for theoretical research perfectly match this field of study.'
      }
    ]
  },

  'Chemical Engineering': {
    description: "Chemical Engineering is the major that transforms science into production. You will learn to design processes to produce chemicals, fuels, plastics, or medicines on a large scale.",
    strengths: [
      {
        icon: '🧪',
        title: 'Your Scientific and Analytical Mind is the Foundation',
        description: 'Your scientific and analytical mind is the basis of this field.'
      },
      {
        icon: '⚗️',
        title: 'You Are Organized and Enjoy Practical Work',
        description: 'Your sense of organization and tast'
      },
      {
        icon: '🤝',
        title: 'You Are an Innovator and Team Player',
        description: 'Your desire to innovate and talent for solving complex problems will lead you to create large-scale solutions.'
      }
    ]
  },

  'Petroleum Engineering': {
    description: "Petroleum Engineering is the major that immerses you in the heart of the energy industry. You will study the techniques of exploration, extraction, and processing of oil and gas.",
    strengths: [
      {
        icon: '🛢️',
        title: 'Your Logical Mind and Interest in Manual Work Are Key',
        description: 'Your scientific and logical mind and your interest in manual work are fundamental qualities for this field.'
      },
      {
        icon: '🛠️',
        title: 'You Are Organized and Enjoy Hands-On Field Work',
        description: 'Your sense of organization and your preference for practical work in the field are major assets.'
      },
      {
        icon: '💼',
        title: 'You Value Autonomy and Stability',
        description: 'Your desire for autonomy and stability aligns well with this demanding discipline.'
      }
    ]
  },

  'Electronic and Information Engineering': {
    description: "This major is at the heart of the digital revolution. It allows you to design electronic chips, communication systems, and information technologies to create the innovations of tomorrow.",
    strengths: [
      {
        icon: '💻',
        title: 'Your Strong Logic and Scientific Profile Are Essential',
        description: 'Your very strong logic and your scientific profile are the pillars of this discipline.'
      },
      {
        icon: '🚀',
        title: 'You Are Driven to Innovate and Take on Challenges',
        description: 'Your desire to innovate and take on challenges is a powerful driver for creating the technologies of tomorrow.'
      },
      {
        icon: '💡',
        title: 'You Excel at Practical and Theoretical Work',
        description: 'Your taste for practical work and theoretical research are essential qualities for the design of complex systems.'
      }
    ]
  },

  'Safety Engineering': {
    description: "Safety Engineering is the discipline that protects people and property. This major teaches you to design safe systems and environments by analyzing risks and developing protocols.",
    strengths: [
      {
        icon: '📋',
        title: 'Your Logical Mind and Organizational Skills Are the Pillars',
        description: 'Your logical and analytical mind and your sense of organization are the pillars of this major.'
      },
      {
        icon: '🛡️',
        title: 'You Are Motivated by Social Impact and Stability',
        description: 'Your desire to have a strong social impact and ensure stability is a powerful motivation.'
      },
      {
        icon: '🤝',
        title: 'You Enjoy Practical Work and Team Collaboration',
        description: 'Your preference for practical work and teamwork is a major asset in this field.'
      }
    ]
  },

  'Mining Engineering': {
    description: "Mining Engineering is essential for the extraction of Earth's resources. It teaches you to design mines, manage operations, and ensure safety in demanding environments.",
    strengths: [
      {
        icon: '⛏️',
        title: 'Your Scientific Mind and Manual Interests Are Fundamental',
        description: 'Your scientific and logical mind and your interest in manual work are fundamental qualities for this field.'
      },
      {
        icon: '🛠️',
        title: 'You Are a Hands-On Problem-Solver',
        description: 'Your taste for problem-solving and your preference for practical work in the field are major assets.'
      },
      {
        icon: '💼',
        title: 'You Are an Autonomous Person Who Values Stability',
        description: 'Your desire for autonomy and stability aligns well with this demanding discipline.'
      }
    ]
  },

  'Psychology': {
    description: "Psychology is the study of the mind and human behavior. This major teaches you to analyze behaviors, conduct research, and help individuals improve their well-being.",
    strengths: [
      {
        icon: '🗣️',
        title: 'You Are a Natural Communicator with a Social Interest',
        description: 'Your interest in social and human interaction and your ease with communication are essential qualities.'
      },
      {
        icon: '🧠',
        title: 'You Are an Analytical and Autonomous Theorist',
        description: 'Your analytical mind and your preference for autonomous work and theoretical research will allow you to delve into the complex concepts of the human mind.'
      },
      {
        icon: '⚖️',
        title: 'You Are Driven to Promote Social Justice',
        description: 'Your motivation to promote social justice and your ability to solve problems are major assets.'
      }
    ]
  },

  'Aeronautical Engineering': {
    description: "Aeronautical Engineering is the science of flight. This major prepares you to design, develop, and test airplanes and helicopters, applying the principles of mechanics, physics, and electronics.",
    strengths: [
      {
        icon: '✈️',
        title: 'Your Scientific and Logical Profile is an Undeniable Asset',
        description: 'Your scientific and logical profile is an undeniable asset in this field.'
      },
      {
        icon: '🚀',
        title: 'You Are Driven to Innovate and Take on Challenges',
        description: 'Your desire to innovate and take on challenges is a powerful driver for breaking into this field.'
      },
      {
        icon: '🛠️',
        title: 'You Are Meticulous and Have a Talent for Hands-On Work',
        description: 'Your rigor and your talent for manual work are essential qualities for design and construction.'
      }
    ]
  },

  'Aerospace Engineering': {
    description: "Aerospace Engineering is the major for those who want to explore space. It is a discipline that goes beyond the Earth's atmosphere, designing rockets, satellites, and spacecraft.",
    strengths: [
      {
        icon: '🪐',
        title: 'Your Scientific Mind Is the Basis of This Field',
        description: 'Your scientific and logical mind is the basis of this field.'
      },
      {
        icon: '🚀',
        title: 'You Are an Innovator Driven to Push Boundaries',
        description: 'Your thirst for innovation and your desire to go beyond existing challenges will push you towards the stars.'
      },
      {
        icon: '🧠',
        title: 'You Are Rigorous and Excel at Complex Problem-Solving',
        description: 'Your rigor and your talent for complex problem-solving are essential assets for space missions.'
      }
    ]
  },

  'Medicine': {
    description: "Medicine is a noble path for those who want to dedicate their lives to the health and well-being of others. This major gives you a deep understanding of the human body and its diseases.",
    strengths: [
      {
        icon: '🔬',
        title: 'Your Scientific and Logical Mind Is a Perfect Match',
        description: 'Your scientific and logical mind is the foundation of this demanding field.'
      },
      {
        icon: '🩺',
        title: 'You Are a Dedicated Team Player Who Wants to Help Others',
        description: 'Your desire to have a direct social impact and your ability to work in a team are fundamental human qualities for the practice of medicine.'
      },
      {
        icon: '🧠',
        title: 'Your Rigor and Problem-Solving Skills Will Make You Excel',
        description: 'Your rigor and your talent for problem-solving will lead you to excel in this vocation.'
      }
    ]
  }
};

export default MAJOR_DESCRIPTIONS;