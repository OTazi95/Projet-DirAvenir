const MAJOR_DESCRIPTIONS = {
  'Civil Engineering': {
    description: "Le Génie Civil est un domaine axé sur la conception et la construction d'infrastructures. Il combine la théorie scientifique avec l'application pratique pour donner vie aux ponts, routes et bâtiments qui façonnent notre environnement.",
    strengths: [
      {
        icon: '🔧',
        title: 'Passion Technique et Travail Manuel',
        description: 'Votre passion pour les défis techniques et votre aptitude pour le travail manuel vous donneront une longueur d\'avance dans ce domaine.'
      },
      {
        icon: '📋',
        title: 'Organisation et Rigueur Analytique',
        description: 'Votre sens de l\'organisation et votre rigueur analytique sont des atouts majeurs pour gérer des projets d\'envergure.'
      },
      {
        icon: '🌍',
        title: 'Impact Social Concret',
        description: 'Cette majeure correspond à votre désir d\'avoir un impact social concret en construisant les fondations du monde de demain.'
      }
    ]
  },

  'Mechanical Engineering': {
    description: "Le Génie Mécanique est le cœur de l'innovation industrielle. Il couvre la conception, l'analyse et la fabrication de systèmes mécaniques, des moteurs de voiture aux robots industriels, utilisant la physique et les mathématiques pour créer des solutions efficaces et durables.",
    strengths: [
      {
        icon: '🔬',
        title: 'Profil Analytique et Scientifique',
        description: 'Votre profil analytique et votre intérêt pour la science et la technologie vous permettront de résoudre les problèmes les plus complexes.'
      },
      {
        icon: '🛠',
        title: 'Talent Manuel et Technique',
        description: 'Votre talent pour le travail manuel et technique est essentiel pour donner vie à vos créations.'
      },
      {
        icon: '💡',
        title: 'Désir d\'Innovation',
        description: 'Votre désir d\'innover et votre esprit curieux sont les forces motrices qui vous aideront à exceller dans ce domaine.'
      }
    ]
  },

  'Architecture': {
    description: "L'Architecture est la discipline qui façonne notre environnement bâti. Elle combine la créativité artistique avec la rigueur de l'ingénierie pour concevoir des espaces fonctionnels, esthétiques et respectueux de l'environnement.",
    strengths: [
      {
        icon: '🎨',
        title: 'Créativité et Passion Artistique',
        description: 'Votre très forte créativité et votre passion pour l\'art sont au cœur de cette majeure.'
      },
      {
        icon: '🌟',
        title: 'Impact Social et Innovation',
        description: 'Votre désir d\'avoir un impact social et votre esprit innovant correspondent parfaitement avec la mission d\'architecte.'
      },
      {
        icon: '🏗',
        title: 'Autonomie et Organisation',
        description: 'Votre besoin d\'autonomie et votre sens de l\'organisation sont des atouts cruciaux pour mener à bien vos projets.'
      }
    ]
  },

  'International Business': {
    description: "Le Commerce International vous prépare à devenir un acteur des marchés mondiaux. Cette majeure se concentre sur les aspects économiques, juridiques et culturels du commerce transfrontalier, et vous apprend à opérer dans un environnement international complexe.",
    strengths: [
      {
        icon: '💬',
        title: 'Aisance Communicative et Négociation',
        description: 'Votre aisance en communication et votre talent pour la négociation sont des compétences fondamentales pour réussir dans le monde du commerce international.'
      },
      {
        icon: '📊',
        title: 'Esprit Analytique et Management',
        description: 'Votre esprit analytique et votre sens du management vous permettront de naviguer dans les défis complexes du commerce mondial.'
      },
      {
        icon: '🚀',
        title: 'Autonomie et Innovation',
        description: 'Votre besoin d\'autonomie et votre désir d\'innover s\'accordent bien avec la flexibilité et la vision stratégique requises dans ce domaine.'
      }
    ]
  },

  'Business Administration': {
    description: "L'Administration des Affaires est la majeure idéale pour diriger des organisations. Vous apprendrez les principes fondamentaux du management, de la finance, du marketing et des ressources humaines pour prendre des décisions stratégiques.",
    strengths: [
      {
        icon: '📈',
        title: 'Organisation et Gestion de Projets',
        description: 'Votre talent pour l\'organisation et votre désir de gérer des projets sont au cœur de ce domaine.'
      },
      {
        icon: '🤝',
        title: 'Communication et Leadership',
        description: 'Votre aisance en communication et votre capacité à travailler en équipe sont des atouts majeurs pour le leadership.'
      },
      {
        icon: '💼',
        title: 'Stratégies d\'Affaires et Impact',
        description: 'Votre intérêt pour les stratégies d\'affaires et votre désir d\'avoir un impact par le management correspondent parfaitement à cette majeure.'
      }
    ]
  },

  'International Economics and Trade': {
    description: "Cette majeure vous permet de comprendre les forces qui animent l'économie mondiale. Elle combine la théorie économique avec les réalités du commerce international pour résoudre des problèmes complexes à l'échelle planétaire.",
    strengths: [
      {
        icon: '🧮',
        title: 'Logique Forte et Actualités Économiques',
        description: 'Votre très forte logique et votre intérêt pour l\'actualité économique sont les fondements de cette majeure.'
      },
      {
        icon: '🌐',
        title: 'Impact Sociétal et Analyse',
        description: 'Votre désir d\'avoir un impact sociétal et votre capacité d\'analyse vous permettront de naviguer dans les défis du commerce mondial.'
      },
      {
        icon: '🔍',
        title: 'Recherche Théorique et Autonomie',
        description: 'Votre préférence pour la recherche théorique et votre esprit autonome sont des qualités essentielles pour la modélisation économique.'
      }
    ]
  },

  'Marketing and Management': {
    description: "Le Marketing et Management sont au cœur de la croissance des entreprises. Cette majeure vous apprend à comprendre le comportement des consommateurs, concevoir des campagnes percutantes et diriger des équipes.",
    strengths: [
      {
        icon: '🗣',
        title: 'Communication et Créativité',
        description: 'Votre aisance en communication et votre très forte créativité sont les forces motrices de ce domaine.'
      },
      {
        icon: '👥',
        title: 'Organisation et Travail d\'Équipe',
        description: 'Votre sens de l\'organisation et votre capacité à travailler en équipe sont des atouts majeurs pour gérer des projets et des équipes.'
      },
      {
        icon: '⚡',
        title: 'Innovation et Défis',
        description: 'Votre désir d\'innover et de relever des défis est un prérequis pour vous démarquer dans ce domaine dynamique.'
      }
    ]
  },

  'Computer Science': {
    description: "L'Informatique est la science qui étudie les ordinateurs et leurs applications. Cette majeure explore la programmation, l'intelligence artificielle et la sécurité réseau pour concevoir les technologies de demain.",
    strengths: [
      {
        icon: '💻',
        title: 'Esprit Logique et Technologie',
        description: 'Votre esprit logique et analytique et votre intérêt pour la technologie sont les piliers de ce domaine.'
      },
      {
        icon: '🧩',
        title: 'Résolution de Problèmes et Innovation',
        description: 'Votre talent pour la résolution de problèmes complexes et votre soif d\'innovation vous mèneront vers l\'excellence.'
      },
      {
        icon: '🔬',
        title: 'Autonomie et Recherche Théorique',
        description: 'Votre besoin d\'autonomie et votre goût pour la recherche théorique sont des qualités clés pour la programmation et la conception d\'algorithmes.'
      }
    ]
  },

  'Software Engineering': {
    description: "Le Génie Logiciel est l'art et la science de concevoir, développer et maintenir des logiciels de qualité. C'est la majeure idéale pour construire des systèmes informatiques fiables et efficaces.",
    strengths: [
      {
        icon: '⚙️',
        title: 'Esprit Logique et Technologie',
        description: 'Votre esprit logique et analytique combiné à votre intérêt pour la technologie fait de vous un candidat idéal.'
      },
      {
        icon: '🎯',
        title: 'Résolution de Problèmes et Organisation',
        description: 'Votre talent pour la résolution de problèmes et votre sens de l\'organisation sont essentiels pour gérer des projets de développement.'
      },
      {
        icon: '🤝',
        title: 'Collaboration et Communication',
        description: 'Votre forte préférence pour le travail d\'équipe et la communication sont des atouts majeurs dans un domaine qui repose sur la collaboration.'
      }
    ]
  },

  'Artificial Intelligence': {
    description: "L'Intelligence Artificielle est la frontière de l'innovation technologique. Cette majeure explore l'apprentissage automatique et l'apprentissage profond pour concevoir des systèmes capables de résoudre des problèmes complexes de manière autonome.",
    strengths: [
      {
        icon: '🧠',
        title: 'Esprit Logique Exceptionnel',
        description: 'Votre incroyable esprit logique et analytique est le fondement de cette discipline.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Défis',
        description: 'Votre soif d\'innovation et votre désir de relever des défis sont des atouts majeurs pour percer dans ce domaine.'
      },
      {
        icon: '📚',
        title: 'Recherche Théorique et Autonomie',
        description: 'Votre préférence pour la recherche théorique et le travail autonome vous permettront de vous plonger dans les concepts complexes de l\'IA.'
      }
    ]
  },

  'Tourism Management': {
    description: "La Gestion du Tourisme est une majeure qui combine l'aspect commercial avec un fort service client. Elle vous apprend à organiser des voyages et promouvoir des destinations pour créer des expériences mémorables pour autrui.",
    strengths: [
      {
        icon: '🌟',
        title: 'Communication et Interaction Sociale',
        description: 'Votre aisance en communication et votre intérêt pour l\'interaction sociale sont les piliers de cette majeure.'
      },
      {
        icon: '📋',
        title: 'Organisation et Gestion de Projets',
        description: 'Votre grand sens de l\'organisation et votre capacité à gérer des projets sont des compétences fondamentales.'
      },
      {
        icon: '💖',
        title: 'Impact Positif et Travail Pratique',
        description: 'Votre désir d\'avoir un impact positif sur les gens et votre préférence pour le travail pratique s\'alignent parfaitement avec la réalité du tourisme.'
      }
    ]
  },

  'Nursing': {
    description: "Les Soins Infirmiers sont une vocation. C'est une majeure pour ceux qui ont une empathie profonde et un désir d'aider autrui, travaillant en équipe pour assurer le bien-être des patients.",
    strengths: [
      {
        icon: '❤️',
        title: 'Interaction Humaine et Impact Social',
        description: 'Votre intérêt pour l\'interaction sociale et humaine et votre désir d\'avoir un impact social direct font de vous un candidat idéal.'
      },
      {
        icon: '🗣',
        title: 'Communication et Travail d\'Équipe',
        description: 'Votre aisance en communication et votre préférence pour le travail d\'équipe sont absolument essentielles dans le domaine médical.'
      },
      {
        icon: '🤲',
        title: 'Pratique Manuelle et Tâches Techniques',
        description: 'Votre goût pour la pratique manuelle et le travail manuel sont des qualités essentielles pour les tâches techniques quotidiennes.'
      }
    ]
  },

  'Pharmacy': {
    description: "La Pharmacie est la majeure pour les esprits scientifiques qui veulent contribuer à la santé des gens par la science du médicament. Elle explore la chimie, la biologie et les mécanismes d'action des médicaments.",
    strengths: [
      {
        icon: '🔬',
        title: 'Esprit Scientifique et Analytique',
        description: 'Votre esprit scientifique et analytique est la base de la pharmacie.'
      },
      {
        icon: '📊',
        title: 'Organisation et Rigueur',
        description: 'Votre fort sens de l\'organisation et votre rigueur sont indispensables pour la gestion d\'inventaire et l\'application de protocoles.'
      },
      {
        icon: '🤝',
        title: 'Impact Sociétal et Travail d\'Équipe',
        description: 'Votre désir d\'avoir un impact sociétal et votre préférence pour le travail d\'équipe sont des qualités essentielles pour conseiller les patients et collaborer avec le personnel médical.'
      }
    ]
  },

  'Electrical Engineering': {
    description: "Le Génie Électrique est la force motrice de la technologie moderne. Cette majeure vous permet de concevoir des systèmes électriques et électroniques pour tout, des téléphones aux réseaux électriques.",
    strengths: [
      {
        icon: '⚡',
        title: 'Profil Scientifique et Logique',
        description: 'Votre profil scientifique et logique est un atout indéniable dans ce domaine.'
      },
      {
        icon: '🔧',
        title: 'Innovation et Travail Pratique',
        description: 'Votre désir d\'innover et votre goût pour le travail pratique vous mèneront à créer les technologies de demain.'
      },
      {
        icon: '👥',
        title: 'Résolution de Problèmes et Équipe',
        description: 'Votre talent pour la résolution de problèmes et votre préférence pour le travail d\'équipe sont des qualités clés pour réussir.'
      }
    ]
  },

  'Food Science and Engineering': {
    description: "La Science et Ingénierie Alimentaire est le point de rencontre entre la science et la gastronomie. Cette majeure vous permet de comprendre la composition des aliments et d'assurer leur sécurité et qualité, en développant de nouveaux produits et des méthodes de production durables.",
    strengths: [
      {
        icon: '🧪',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et votre logique sont essentiels pour comprendre les processus biologiques et chimiques des aliments.'
      },
      {
        icon: '🔬',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre goût pour le travail pratique sont des atouts majeurs pour le développement de produits et le contrôle qualité.'
      },
      {
        icon: '🌱',
        title: 'Impact Social Concret',
        description: 'Cette majeure correspond à votre désir d\'avoir un impact social concret en assurant une alimentation saine et durable pour tous.'
      }
    ]
  },

  'Finance': {
    description: "La Finance est la majeure pour les esprits analytiques et ambitieux. Ce domaine vous donne les clés pour comprendre et influencer le monde économique, en gérant des actifs et évaluant des risques.",
    strengths: [
      {
        icon: '💹',
        title: 'Logique Forte et Stratégies d\'Affaires',
        description: 'Votre très forte logique et votre intérêt pour les stratégies d\'affaires sont les fondements de ce domaine.'
      },
      {
        icon: '📈',
        title: 'Organisation et Rigueur',
        description: 'Votre excellent sens de l\'organisation et votre rigueur sont indispensables pour la gestion des risques et l\'analyse de données.'
      },
      {
        icon: '🎯',
        title: 'Défis et Autonomie',
        description: 'Votre désir de défis et votre besoin d\'autonomie sont des qualités qui vous feront exceller dans cet environnement.'
      }
    ]
  },

  'Mechanical Design, Manufacturing and Automation': {
    description: "Cette majeure est le point de rencontre entre créativité et production. Elle vous permet de concevoir des machines et systèmes, tout en maîtrisant les outils de CAO, la robotique et les processus de fabrication pour automatiser l'industrie.",
    strengths: [
      {
        icon: '🔧',
        title: 'Profil Scientifique et Travail Manuel',
        description: 'Votre profil scientifique et votre passion pour le travail manuel sont la base de cette majeure.'
      },
      {
        icon: '💡',
        title: 'Innovation et Résolution de Problèmes',
        description: 'Votre désir d\'innover et de résoudre des problèmes complexes est la force motrice de ce domaine.'
      },
      {
        icon: '⚙️',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre préférence pour le travail pratique s\'alignent parfaitement avec ce domaine d\'ingénierie.'
      }
    ]
  },

  'Science of Law': {
    description: "La Science du Droit est le fondement de la justice. Elle exige une grande rigueur logique et une capacité d'analyse de textes complexes, vous préparant à défendre les droits et promouvoir la justice.",
    strengths: [
      {
        icon: '⚖️',
        title: 'Logique Forte et Capacité d\'Analyse',
        description: 'Votre très forte logique et votre capacité d\'analyse sont les piliers de cette discipline.'
      },
      {
        icon: '📚',
        title: 'Communication et Recherche Théorique',
        description: 'Votre aisance en communication et votre goût pour la recherche théorique vous permettront de maîtriser l\'interprétation des lois.'
      },
      {
        icon: '🌟',
        title: 'Justice Sociale et Autonomie',
        description: 'Votre motivation à promouvoir la justice sociale et votre besoin d\'autonomie s\'alignent parfaitement avec les responsabilités d\'un professionnel du droit.'
      }
    ]
  },

  'International Politics': {
    description: "La Politique Internationale est une majeure pour ceux qui veulent comprendre et influencer les relations entre nations. Elle vous donne les clés pour analyser les conflits, les politiques étrangères et les organisations internationales.",
    strengths: [
      {
        icon: '🌍',
        title: 'Humanités et Communication',
        description: 'Votre intérêt pour les humanités et votre aisance en communication sont des qualités essentielles dans ce domaine.'
      },
      {
        icon: '🧠',
        title: 'Esprit Analytique et Impact Social',
        description: 'Votre esprit analytique et votre désir d\'avoir un impact social sont des motivations puissantes pour étudier la politique mondiale.'
      },
      {
        icon: '👥',
        title: 'Travail d\'Équipe et Recherche Théorique',
        description: 'Votre préférence pour le travail d\'équipe et la recherche théorique vous aideront à comprendre les enjeux complexes du monde.'
      }
    ]
  },

  'MBBS (Bachelor of Medicine, Bachelor of Surgery)': {
    description: "Le MBBS est la voie vers la médecine. C'est un domaine exigeant qui vous prépare à diagnostiquer, traiter et prévenir les maladies, en vous consacrant à la santé et au bien-être d'autrui.",
    strengths: [
      {
        icon: '🩺',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est la base de ce domaine exigeant.'
      },
      {
        icon: '❤️',
        title: 'Impact Social Direct et Travail d\'Équipe',
        description: 'Votre désir d\'avoir un impact social direct et votre capacité à travailler en équipe sont des qualités humaines fondamentales pour la pratique de la médecine.'
      },
      {
        icon: '🎯',
        title: 'Rigueur et Résolution de Problèmes',
        description: 'Votre rigueur et votre talent pour la résolution de problèmes vous mèneront à exceller dans cette vocation.'
      }
    ]
  },

  'Public Relations': {
    description: "Les Relations Publiques sont l'art de construire et maintenir une bonne image. Cette majeure vous apprend à gérer la réputation d'une organisation, interagir avec les médias et créer des campagnes percutantes.",
    strengths: [
      {
        icon: '📢',
        title: 'Communication et Créativité',
        description: 'Votre aisance en communication et votre créativité sont les forces motrices de ce domaine.'
      },
      {
        icon: '🌟',
        title: 'Impact Social et Humanités',
        description: 'Votre désir d\'avoir un impact social et votre intérêt pour les humanités sont des atouts précieux.'
      },
      {
        icon: '🤝',
        title: 'Travail d\'Équipe et Organisation',
        description: 'Votre préférence pour le travail d\'équipe et votre sens de l\'organisation sont des qualités essentielles.'
      }
    ]
  },

  'Applied Chemistry': {
    description: "La Chimie Appliquée est la majeure pour les esprits scientifiques qui veulent transformer le monde physique. Elle utilise les principes de la chimie pour résoudre des problèmes pratiques, en développant de nouveaux médicaments, créant des matériaux innovants ou purifiant l'environnement.",
    strengths: [
      {
        icon: '🧪',
        title: 'Profil Scientifique et Passion Recherche',
        description: 'Votre profil scientifique et logique et votre passion pour la recherche sont les piliers de ce domaine.'
      },
      {
        icon: '💡',
        title: 'Innovation et Impact Social',
        description: 'Votre désir d\'innover et d\'avoir un impact social vous motivera à créer des solutions concrètes.'
      },
      {
        icon: '🔬',
        title: 'Travail Pratique et Manuel',
        description: 'Votre goût pour le travail pratique et manuel est un atout majeur pour les expérimentations en laboratoire.'
      }
    ]
  },

  'English': {
    description: "La majeure Anglais est pour ceux passionnés de littérature, langues et culture. Elle vous permet d'explorer la richesse de la langue et de la pensée pour développer une pensée critique et une communication persuasive.",
    strengths: [
      {
        icon: '✍️',
        title: 'Créativité et Communication',
        description: 'Votre forte créativité et votre aisance en communication sont au cœur de cette majeure.'
      },
      {
        icon: '📚',
        title: 'Humanités et Recherche Théorique',
        description: 'Votre intérêt pour les humanités et la recherche théorique vous permettront d\'approfondir la littérature et les cultures.'
      },
      {
        icon: '🎯',
        title: 'Autonomie et Esprit Analytique',
        description: 'Votre besoin d\'autonomie et votre esprit analytique sont des atouts essentiels pour les projets de recherche et d\'écriture.'
      }
    ]
  },

  'Dentistry': {
    description: "La Dentisterie est une science de la santé axée sur la bouche et les dents. Elle combine des connaissances scientifiques pointues avec une grande dextérité pour diagnostiquer et traiter les maladies buccodentaires.",
    strengths: [
      {
        icon: '🦷',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est indispensable pour la pratique de la dentisterie.'
      },
      {
        icon: '❤️',
        title: 'Impact Social Direct et Travail d\'Équipe',
        description: 'Votre désir d\'avoir un impact social direct et votre capacité à travailler en équipe sont des qualités humaines fondamentales.'
      },
      {
        icon: '🤲',
        title: 'Talent Manuel et Rigueur',
        description: 'Votre talent pour le travail manuel et votre rigueur sont essentiels pour la précision des tâches quotidiennes.'
      }
    ]
  },

  'New Energy Science and Engineering': {
    description: "Cette majeure est l'avenir de l'énergie. Elle vous prépare à concevoir, développer et implémenter des systèmes énergétiques durables pour un monde plus propre et plus efficace.",
    strengths: [
      {
        icon: '⚡',
        title: 'Profil Scientifique et Analytique',
        description: 'Votre profil scientifique et analytique est la base de ce domaine.'
      },
      {
        icon: '🌱',
        title: 'Impact Social Fort et Innovation',
        description: 'Votre désir d\'avoir un fort impact social et d\'innover pour un monde meilleur vous motivera chaque jour.'
      },
      {
        icon: '🔧',
        title: 'Travail Pratique et Résolution de Problèmes',
        description: 'Votre préférence pour le travail pratique et la résolution de problèmes est un atout majeur pour cette discipline.'
      }
    ]
  },

  'Hydraulic Engineering': {
    description: "Le Génie Hydraulique est la science de la gestion de l'eau. Cette majeure vous offre l'opportunité de résoudre des problèmes cruciaux pour la société, en concevant des barrages ou des systèmes de gestion d'eau pour l'irrigation et la production d'énergie.",
    strengths: [
      {
        icon: '💧',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est un atout indispensable pour cette majeure.'
      },
      {
        icon: '📋',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre goût pour le travail pratique sont des qualités essentielles pour gérer des projets sur le terrain.'
      },
      {
        icon: '🌍',
        title: 'Impact Social et Résolution de Problèmes',
        description: 'Votre désir d\'avoir un impact social et votre capacité à résoudre des problèmes complexes vous permettront de réussir.'
      }
    ]
  },

  'Transportation Engineering': {
    description: "Le Génie des Transports est une majeure essentielle pour le développement des villes. Elle vous apprend à concevoir des réseaux routiers, ferroviaires et aéroportuaires pour améliorer la mobilité et créer des infrastructures durables pour la population.",
    strengths: [
      {
        icon: '🚗',
        title: 'Esprit Logique et Organisation',
        description: 'Votre esprit logique et analytique et votre sens de l\'organisation sont des qualités fondamentales pour ce domaine.'
      },
      {
        icon: '🌆',
        title: 'Impact Social et Travail Pratique',
        description: 'Votre désir d\'avoir un impact social et votre préférence pour le travail pratique s\'alignent parfaitement avec les objectifs du domaine.'
      },
      {
        icon: '🤝',
        title: 'Résolution de Problèmes et Travail d\'Équipe',
        description: 'Votre capacité à résoudre des problèmes complexes et votre préférence pour le travail d\'équipe sont des atouts majeurs.'
      }
    ]
  },

  'Bioengineering': {
    description: "La Bioingénierie est la convergence de l'ingénierie et de la biologie. Elle applique les principes de l'ingénierie pour résoudre des problèmes médicaux et biologiques, en concevant des prothèses, implants médicaux ou de nouvelles technologies de traitement.",
    strengths: [
      {
        icon: '🧬',
        title: 'Profil Scientifique et Logique',
        description: 'Votre profil scientifique et logique est le cœur de cette discipline.'
      },
      {
        icon: '❤️',
        title: 'Impact Social Fort et Innovation',
        description: 'Votre désir d\'avoir un fort impact social et d\'innover pour améliorer la santé humaine vous motivera chaque jour.'
      },
      {
        icon: '🔬',
        title: 'Pratique Manuelle et Recherche',
        description: 'Votre goût pour la pratique manuelle et la recherche est un atout majeur pour concevoir de nouvelles technologies médicales.'
      }
    ]
  },

  'Biotechnology': {
    description: "La Biotechnologie utilise des organismes vivants pour créer de nouveaux produits et technologies. Cette majeure est pour ceux qui veulent repousser les frontières de la science pour résoudre des problèmes globaux en génétique, microbiologie ou biochimie.",
    strengths: [
      {
        icon: '🧪',
        title: 'Esprit Scientifique et Passion Recherche',
        description: 'Votre esprit scientifique et logique et votre passion pour la recherche sont la base de ce domaine.'
      },
      {
        icon: '🌱',
        title: 'Innovation et Impact Social',
        description: 'Votre soif d\'innovation et d\'avoir un impact social vous pousseront à créer des solutions durables pour la santé et l\'environnement.'
      },
      {
        icon: '👥',
        title: 'Travail Pratique et Collaboration',
        description: 'Votre préférence pour le travail pratique et la collaboration en laboratoire sont des atouts essentiels.'
      }
    ]
  },

  'Materials Science and Engineering': {
    description: "La Science et Ingénierie des Matériaux est la discipline qui donne vie aux objets qui nous entourent. Cette majeure vous permet de comprendre la structure des matériaux et d'en concevoir de nouveaux, plus légers et plus efficaces, pour des applications en aérospatiale, médecine ou électronique.",
    strengths: [
      {
        icon: '⚗️',
        title: 'Profil Scientifique et Analytique',
        description: 'Votre profil scientifique et analytique est un atout indéniable dans ce domaine.'
      },
      {
        icon: '💡',
        title: 'Innovation et Résolution de Problèmes',
        description: 'Votre goût pour l\'innovation et la résolution de problèmes vous mènera à concevoir les matériaux du futur.'
      },
      {
        icon: '🛠',
        title: 'Travail Pratique et Manuel',
        description: 'Votre talent pour le travail pratique et manuel est un avantage majeur pour la caractérisation et la création de nouveaux matériaux.'
      }
    ]
  },

  'E-Commerce': {
    description: "L'E-Commerce est le moteur du commerce moderne. Cette majeure vous donnera les clés pour créer et gérer des boutiques en ligne en maîtrisant le marketing digital, la logistique et l'analyse de données.",
    strengths: [
      {
        icon: '💻',
        title: 'Gestion d\'Affaires et Créativité',
        description: 'Votre intérêt pour la gestion d\'affaires et votre créativité sont au cœur de l\'e-commerce.'
      },
      {
        icon: '📊',
        title: 'Organisation et Résolution de Problèmes',
        description: 'Votre sens de l\'organisation et votre capacité à résoudre des problèmes sont essentiels pour le succès de vos projets.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Travail Autonome',
        description: 'Votre désir d\'innover et votre préférence pour le travail autonome s\'alignent parfaitement avec ce domaine en constante évolution.'
      }
    ]
  },

  'Robot Engineering': {
    description: "L'Ingénierie Robotique est la convergence de l'informatique, de la mécanique et de l'électronique. C'est la majeure pour les esprits créatifs et analytiques qui veulent concevoir et construire des robots intelligents.",
    strengths: [
      {
        icon: '🤖',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est la base de ce domaine.'
      },
      {
        icon: '🎨',
        title: 'Créativité et Travail Manuel',
        description: 'Votre goût pour la créativité et le travail manuel vous permettront de concevoir des robots de A à Z.'
      },
      {
        icon: '⚡',
        title: 'Innovation et Résolution de Problèmes',
        description: 'Votre soif d\'innovation et votre talent pour la résolution de problèmes sont des atouts majeurs pour percer dans ce domaine tourné vers l\'avenir.'
      }
    ]
  },

  'Biomedical Engineering': {
    description: "L'Ingénierie Biomédicale est le lien entre l'ingénierie et la médecine. Elle applique les principes de l'ingénierie pour résoudre des problèmes cliniques et améliorer la santé humaine.",
    strengths: [
      {
        icon: '🏥',
        title: 'Esprit Scientifique et Technologie',
        description: 'Votre esprit scientifique et logique et votre intérêt pour la technologie sont les piliers de cette discipline.'
      },
      {
        icon: '💚',
        title: 'Impact Social Fort et Innovation',
        description: 'Votre désir d\'avoir un fort impact social et d\'innover pour la santé humaine vous motivera chaque jour.'
      },
      {
        icon: '👥',
        title: 'Recherche et Travail d\'Équipe',
        description: 'Votre préférence pour la recherche et le travail d\'équipe sont des atouts essentiels pour les projets collaboratifs.'
      }
    ]
  },

  'Data Science': {
    description: "La Science des Données est la discipline qui donne du sens aux masses d'informations. Cette majeure vous permet d'extraire des connaissances à partir de données pour prédire des tendances et prendre des décisions éclairées.",
    strengths: [
      {
        icon: '📈',
        title: 'Logique Forte et Esprit Scientifique',
        description: 'Votre très forte logique et votre esprit scientifique sont la base de la science des données.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Résolution de Problèmes',
        description: 'Votre soif d\'innovation et votre talent pour la résolution de problèmes vous mèneront à exceller dans ce domaine en pleine expansion.'
      },
      {
        icon: '🔍',
        title: 'Autonomie et Goût Théorique',
        description: 'Votre besoin d\'autonomie et votre goût pour la théorie sont des qualités essentielles pour l\'analyse et la modélisation.'
      }
    ]
  },

  'Economics': {
    description: "L'Économie est la science qui étudie la production, la distribution et la consommation des richesses. Elle vous donne les outils pour analyser les marchés et les politiques publiques, et résoudre des problèmes sociaux et économiques en utilisant les données et la logique.",
    strengths: [
      {
        icon: '💹',
        title: 'Logique Forte et Analyse',
        description: 'Votre très forte logique et votre capacité d\'analyse sont les fondements de la pensée économique.'
      },
      {
        icon: '🌍',
        title: 'Défense de Causes Sociales et Humanités',
        description: 'Votre motivation à défendre une cause sociale et votre intérêt pour les humanités sont des atouts majeurs.'
      },
      {
        icon: '📚',
        title: 'Autonomie et Recherche Théorique',
        description: 'Votre besoin d\'autonomie et votre préférence pour la recherche théorique correspondent parfaitement à ce domaine d\'étude.'
      }
    ]
  },

  'Chemical Engineering': {
    description: "Le Génie Chimique est la majeure qui transforme la science en production. Vous apprendrez à concevoir des processus pour produire des produits chimiques, carburants, plastiques ou médicaments à grande échelle.",
    strengths: [
      {
        icon: '⚗️',
        title: 'Esprit Scientifique et Analytique',
        description: 'Votre esprit scientifique et analytique est la base de ce domaine.'
      },
      {
        icon: '📊',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre goût pour le travail pratique sont des qualités essentielles pour gérer les processus industriels.'
      },
      {
        icon: '🤝',
        title: 'Innovation et Travail d\'Équipe',
        description: 'Votre désir d\'innover et votre préférence pour le travail d\'équipe sont des atouts majeurs.'
      }
    ]
  },

  'Petroleum Engineering': {
    description: "L'Ingénierie Pétrolière est la majeure qui vous plonge au cœur de l'industrie énergétique. Vous étudierez les techniques d'exploration, d'extraction et de traitement du pétrole et du gaz.",
    strengths: [
      {
        icon: '🛢',
        title: 'Esprit Scientifique et Travail Manuel',
        description: 'Votre esprit scientifique et logique et votre intérêt pour le travail manuel sont des qualités fondamentales pour ce domaine.'
      },
      {
        icon: '🏗',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre préférence pour le travail pratique sur le terrain sont des atouts majeurs.'
      },
      {
        icon: '⚖️',
        title: 'Autonomie et Stabilité',
        description: 'Votre désir d\'autonomie et de stabilité s\'aligne bien avec cette discipline exigeante.'
      }
    ]
  },

  'Electronic and Information Engineering': {
    description: "Cette majeure est au cœur de la révolution numérique. Elle vous permet de concevoir des puces électroniques, des systèmes de communication et des technologies de l'information pour créer les innovations de demain.",
    strengths: [
      {
        icon: '💻',
        title: 'Logique Forte et Profil Scientifique',
        description: 'Votre très forte logique et votre profil scientifique sont les piliers de cette discipline.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Défis',
        description: 'Votre désir d\'innover et de relever des défis est un puissant moteur pour créer les technologies de demain.'
      },
      {
        icon: '🔬',
        title: 'Travail Pratique et Recherche Théorique',
        description: 'Votre goût pour le travail pratique et la recherche théorique sont des qualités essentielles pour la conception de systèmes complexes.'
      }
    ]
  },

  'Safety Engineering': {
    description: "L'Ingénierie de Sécurité est la discipline qui protège les personnes et les biens. Cette majeure vous apprend à concevoir des systèmes et environnements sûrs en analysant les risques et développant des protocoles.",
    strengths: [
      {
        icon: '🛡',
        title: 'Esprit Logique et Organisation',
        description: 'Votre esprit logique et analytique et votre sens de l\'organisation sont les piliers de cette majeure.'
      },
      {
        icon: '🏥',
        title: 'Impact Social Fort et Stabilité',
        description: 'Votre désir d\'avoir un fort impact social et d\'assurer la stabilité est une motivation puissante.'
      },
      {
        icon: '👥',
        title: 'Travail Pratique et d\'Équipe',
        description: 'Votre préférence pour le travail pratique et d\'équipe est un atout majeur dans ce domaine.'
      }
    ]
  },

  'Mining Engineering': {
    description: "L'Ingénierie Minière est essentielle pour l'extraction des ressources terrestres. Elle vous apprend à concevoir des mines, gérer des opérations et assurer la sécurité dans des environnements exigeants.",
    strengths: [
      {
        icon: '⛏',
        title: 'Esprit Scientifique et Travail Manuel',
        description: 'Votre esprit scientifique et logique et votre intérêt pour le travail manuel sont des qualités fondamentales pour ce domaine.'
      },
      {
        icon: '🔧',
        title: 'Résolution de Problèmes et Travail Pratique',
        description: 'Votre goût pour la résolution de problèmes et votre préférence pour le travail pratique sur le terrain sont des atouts majeurs.'
      },
      {
        icon: '⚖️',
        title: 'Autonomie et Stabilité',
        description: 'Votre désir d\'autonomie et de stabilité s\'aligne bien avec cette discipline exigeante.'
      }
    ]
  },

  'Psychology': {
    description: "La Psychologie est l'étude de l'esprit et du comportement humain. Cette majeure vous apprend à analyser les comportements, mener des recherches et aider les individus à améliorer leur bien-être.",
    strengths: [
      {
        icon: '💭',
        title: 'Intérêt Social et Communication',
        description: 'Votre intérêt pour l\'interaction sociale et humaine et votre aisance en communication sont des qualités essentielles.'
      },
      {
        icon: '📚',
        title: 'Esprit Analytique et Recherche Autonome',
        description: 'Votre esprit analytique et votre préférence pour le travail autonome et la recherche théorique vous permettront d\'approfondir les concepts complexes de l\'esprit humain.'
      },
      {
        icon: '⚖️',
        title: 'Justice Sociale et Résolution de Problèmes',
        description: 'Votre motivation à promouvoir la justice sociale et votre capacité à résoudre des problèmes sont des atouts majeurs.'
      }
    ]
  },

  'Aeronautical Engineering': {
    description: "L'Ingénierie Aéronautique est la science du vol. Cette majeure vous prépare à concevoir, développer et tester des avions et hélicoptères, en appliquant les principes de mécanique, physique et électronique.",
    strengths: [
      {
        icon: '✈️',
        title: 'Profil Scientifique et Logique',
        description: 'Votre profil scientifique et logique est un atout indéniable dans ce domaine.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Défis',
        description: 'Votre désir d\'innover et de relever des défis est un puissant moteur pour percer dans ce domaine.'
      },
      {
        icon: '🛠',
        title: 'Rigueur et Travail Manuel',
        description: 'Votre rigueur et votre talent pour le travail manuel sont des qualités essentielles pour la conception et la construction.'
      }
    ]
  },

  'Aerospace Engineering': {
    description: "L'Ingénierie Aérospatiale est la majeure pour ceux qui veulent explorer l'espace. C'est une discipline qui va au-delà de l'atmosphère terrestre, concevant des fusées, satellites et vaisseaux spatiaux.",
    strengths: [
      {
        icon: '🚀',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est la base de ce domaine.'
      },
      {
        icon: '⭐',
        title: 'Innovation et Défis Extraordinaires',
        description: 'Votre soif d\'innovation et votre désir de dépasser les défis existants vous pousseront vers les étoiles.'
      },
      {
        icon: '🎯',
        title: 'Rigueur et Résolution de Problèmes',
        description: 'Votre rigueur et votre talent pour la résolution de problèmes complexes sont des atouts essentiels pour les missions spatiales.'
      }
    ]
  },

  'Medicine': {
    description: "La Médecine est une voie noble pour ceux qui veulent consacrer leur vie à la santé et au bien-être d'autrui. Cette majeure vous donne une compréhension approfondie du corps humain et de ses maladies.",
    strengths: [
      {
        icon: '🩺',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est le fondement de ce domaine exigeant.'
      },
      {
        icon: '❤️',
        title: 'Impact Social Direct et Travail d\'Équipe',
        description: 'Votre désir d\'avoir un impact social direct et votre capacité à travailler en équipe sont des qualités humaines fondamentales pour la pratique de la médecine.'
      },
      {
        icon: '🎯',
        title: 'Rigueur et Résolution de Problèmes',
        description: 'Votre rigueur et votre talent pour la résolution de problèmes vous mèneront à exceller dans cette vocation.'
      }
    ]
  }
};

export default MAJOR_DESCRIPTIONS;