import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import img1 from "../../assets/orientationtest/image1.png";
import img2 from "../../assets/orientationtest/image2.png";
import img3 from "../../assets/orientationtest/image3.png";
import img4 from "../../assets/orientationtest/image4.png";
import img5 from "../../assets/orientationtest/image5.png";
import img6 from "../../assets/orientationtest/image6.png";
import img7 from "../../assets/orientationtest/image7.png";
import img8 from "../../assets/orientationtest/image8.png";
import img9 from "../../assets/orientationtest/image9.png";
import img10 from "../../assets/orientationtest/image10.png";
import img11 from "../../assets/orientationtest/image11.png";
import img12 from "../../assets/orientationtest/image12.png";
import img13 from "../../assets/orientationtest/image13.png";
import img14 from "../../assets/orientationtest/image14.png";
import {
  PILLAR_KEYS,
  Q_MAPPING,
  computeRawScoresFromAnswers,
  computeMaxScoresTheoretical,
  normalizeScores0to100,
} from "./scoring";

// English Questions Data
const QUESTIONS_DATA = [
  // Category 1: Interests and Passions
  {
    id: "q1",
    category: "Interests and Passions",
    type: "single",
    question:
      "If time and money weren't an issue, what activity would you choose for your ideal day?",
    options: [
      {
  id: "A",
  text: (
    <>
      A: Create something new<br />
      <span style={{ fontWeight: 400, fontSize: "0.95em" }}>
        (build, code, design)
      </span>
    </>
  ),
},
      { id: "B", text: (
    <>
      B: Understand how things work<br />
      <span style={{ fontWeight: 400, fontSize: "0.95em" }}>
        (experiment, analyze, solve puzzles)
      </span>
    </>
  ),},
{ id: "C", text: (
    <>
      C: Interact with and help others<br />
      <span style={{ fontWeight: 400, fontSize: "0.95em" }}>
        (counsel, teach, heal)
      </span>
    </>
  ),},
{ id: "D", text: (
    <>
      D: Organize and manage projects<br />
      <span style={{ fontWeight: 400, fontSize: "0.95em" }}>
        (plan, lead, optimize)
      </span>
    </>
  ), },
{ id: "E", text: (
    <>
      E: Express my creativity<br />
      <span style={{ fontWeight: 400, fontSize: "0.95em" }}>
        (paint, write, music, videos)
      </span>
    </>
  ),  },
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
      {
        key: "tech",
        label: "Scientific discoveries, Technology, innovation",
        photo: img1,
      },
      {
        key: "art",
        label: "Art and culture, Design and creation",
        photo: img2,
      },
      {
        key: "social",
        label: "Personal development, Social causes",
        photo: img3,
      },
      {
        key: "business",
        label: "Economic news, Business strategies",
        photo: img4,
      },
      {
        key: "organization",
        label: "Organization, Project management",
        photo: img5,
      },
      {
        key: "manual",
        label: "Sports, DIY and crafts",
        photo: img6,
      },
    ],
  },

  {
    id: "q3",
    category: "Interests and Passions",
    type: "single",
    question: "Imagine a store. Which section are you naturally drawn to?",
    options: [
      { id: "A", text: "A: Electronics, gadgets, or tools"},
      { id: "B", text: "B: Science books, philosophy, or documentaries" },
      { id: "C", text: "C: Art supplies, musical instruments, or decor items"},
      { id: "D", text: "D: Personal development books, games & video games" },
      { id: "E", text: "E: Clothes, fashion accessories, or luxury items" },
    ],
  },

  // Category 2: Skills and Abilities
  {
    id: "q4",
    category: "Skills and Abilities",
    type: "single",
    question: "When faced with a complex problem, what's your first reaction?",
    options: [
       {
  id: "A",
  text: (
    <>
      A: Break it down into smaller steps<br />
      <span>
        to find the most efficient solution
      </span>
    </>
  ),
},
            {
  id: "B",
  text: (
    <>
      B: Look for data and facts to <br />
      <span>
       understand and solve the issue
      </span>
    </>
  ),
},
             {
  id: "C",
  text: (
    <>
     C: Imagine original solutions,  <br />
      <span>
       even if they seem crazy at first
      </span>
    </>
  ),
},
      {
  id: "D",
  text: (
    <>
     D: Seek input from others to  <br />
      <span>
       find a collaborative solution
      </span>
    </>
  ),
},
    ],
  },

  {
    id: "q5",
    category: "Skills and Abilities",
    type: "ranking", // 3 choices, weighted 4/3/2
    question: "Among these activities, which come most naturally to you? (Rank 3)",
    options: [
      { key: "budget", label: "Managing a budget"},
      { key: "event", label: "Organizing an event" },
      { key: "write", label: "Writing a clear text" },
      { key: "fix", label: "Repairing a device" },
      { key: "draw", label: "Drawing or painting"},
      { key: "equation", label: "Solving a complex equations" },
      { key: "convince", label: "Convincing someone of an idea" },
      { key: "counsel", label: "Listening and giving advice to a friend" },
    ],
  },
  {
    id: "q6",
    category: "Skills and Abilities",
    type: "single",
    question: "When you need to learn something new, how do you prefer to do it?",
    options: [
      { id: "A", text: "A: Read and take detailed notes"},
      { id: "B", text: "B: Watch video tutorials or demonstrations"},
      { id: "C", text: "C: Try it myself, practice and learn from mistakes" },
      { id: "D", text: "D: Discuss with others and exchange ideas" },
    ],
  },

  // Category 3: Values and Goals
{
  id: "q7",
  category: "Values and Goals",
  type: "single",
  question: "What type of impact would you like to have in the world?",
  options: [
    {
      id: "A",
      text: (
        <>
          A: Improve people's lives directly<br />
          <span>(well-being, health, education)</span>
        </>
      ),
    },
    {
      id: "B",
      text: (
        <>
          B: Create systems or products that make <br />
          <span>the world more efficient</span>
        </>
      ),
    },
    {
      id: "C",
      text: (
        <>
          C: Contribute to beauty and culture<br />
          <span>(arts, design, history)</span>
        </>
      ),
    },
    {
      id: "D",
      text: "D: Defend a cause or promote social justice",
    },
  ],
},
{
  id: "q8",
  category: "Values and Goals",
  type: "single",
  question:
    "Choose the image that best represents the work environment where you would thrive most.",
  options: [
    {
      id: "A",
      text: "A: A lab or research center",
      photo: img7,
    },
    {
      id: "B",
      text: "B: An open and collaborative office",
      photo: img8,
    },
    {
      id: "C",
      text: "C: A workshop or creative studio",
      photo: img9,
    },
    {
      id: "D",
      text: "D: Outdoors, nature, or construction site",
      photo: img10,
    },
    {
      id: "E",
      text: "E: E: A calm and individual space (library, private office)",
      photo: img11,
    },
  ],
},

  {
    id: "q9",
    category: "Values and Goals",
    type: "sliders", // 4 sliders 0..5
    question: "When you think about your future career, what matters most?",
    labels: {
      securite: "Job security and stability",
      innovation: "Opportunity to innovate and be on the cutting edge",
      autonomie: "Autonomy and freedom in decision-making",
      salaire: "High salary and good financial opportunities ",
    },
  },
  {
    id: "q10",
    category: "Values and Goals",
    type: "single",
    question: "If you had to solve a major problem, what would be your main motivation?",
    options: [
      { id: "A", text: "A: Understand the root of the problem for a long-term solution"},
      { id: "B", text: "B: Quickly implement a practical solution " },
      { id: "C", text: "C: Bring people together around the solution" },
      { id: "D", text: "D: develop an advanced technological solution" },
    ],
  },

  // Category 4: Work Preferences and Personality
{
  id: "q11",
  category: "Work Preferences",
  type: "single",
  question: "Do you prefer to work:",
  options: [
    {
      id: "A",
      text: "A: Alone on a project, with full autonomy",
      photo: img12,
    },
    {
      id: "B",
      text: "B: In a small team where everyone contributes",
      photo: img13, 
    },
    {
      id: "C",
      text: "C: In a large organization with clearly defined roles",
      photo: img14, 
    },
  ],
},



  {
    id: "q12",
    category: "Work Preferences",
    type: "single",
    question: "During a presentation, you prefer to:",
    options: [
      { id: "A", text: "A: Prepare carefully and clearly present the facts"},
      { id: "B", text: "B: Tell a story to capture attention" },
      { id: "C", text: "C: Answer questions and interact spontaneously" },
    ],
  },
  {
    id: "q13",
    category: "Work Preferences",
    type: "single",
    question: "When making an important decision, you rely most on:",
    options: [
      { id: "A", text: "A: Logic and fact analysis" },
      { id: "B", text: "B: Your intuition and feelings" },
      { id: "C", text: "C: The opinion of people you respect" },
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
      { key: "litterature", label: "Literature and Languages (French, Foreign Languages, Philosophy)" },
      { key: "shs", label: "Social Sciences and Humanities (HistoryGeography, Economics &Sociology, Psychology)" },
      { key: "arts", label: "Arts and Design (Visual Arts, Music, Design)" },
      { key: "tech", label: "Technology and Computer Science (Digital Science, Engineering)" },
      { key: "gestion", label: "Business and Economics (Management, Law)" },
    ],
  },
];

export default function ProtectedOrientationTest() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = getAuthToken();
    const authUser = getAuthUser();

    if (!token || !authUser) {
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/login?redirect=/orientation-test');
      return;
    }
    setIsAuthenticated(true);
    setUserInfo(authUser);
    setIsLoading(false);
  };

  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  const getAuthUser = () => {
    const localAuthUser = localStorage.getItem("auth_user");
    const sessionAuthUser = sessionStorage.getItem("auth_user");

    let userData = null;

    if (localAuthUser) {
      try {
        userData = JSON.parse(localAuthUser);
      } catch (error) {
        console.error('Error parsing localStorage auth_user:', error);
      }
    } else if (sessionAuthUser) {
      try {
        userData = JSON.parse(sessionAuthUser);
      } catch (error) {
        console.error('Error parsing sessionStorage auth_user:', error);
      }
    }

    return userData;
  };

  const questions = QUESTIONS_DATA;
  const totalQuestions = questions.length;
  const q = questions[current] || null;
  const progress = ((current + 1) / totalQuestions) * 100;

  // Gestion des réponses pour les questions de type "single"
  const handleSingle = (optId) => {
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optId }));
  };

  // Gestion des réponses pour les questions de type "multiple"
  const toggleMulti = (optKey) => {
    if (!q) return;
    const max = q.maxSelections || Infinity;
    setAnswers((prev) => {
      const cur = Array.isArray(prev[q.id]) ? prev[q.id] : [];
      const exists = cur.includes(optKey);
      if (exists) {
        return { ...prev, [q.id]: cur.filter((x) => x !== optKey) };
      }
      if (cur.length >= max) return prev;
      return { ...prev, [q.id]: [...cur, optKey] };
    });
  };

  // Gestion des réponses pour les questions de type "ranking" (q5)
  const handleStarClick = (optionKey, starCount) => {
    setAnswers((prev) => {
      const currentAnswers = prev[q.id] || {};
      return {
        ...prev,
        [q.id]: {
          ...currentAnswers,
          [optionKey]: starCount,
        },
      };
    });
  };


  // Initialisation des sliders pour q9
  const ensureQ9Init = () => {
    setAnswers((prev) => {
      if (prev[q.id]) return prev;
      return {
        ...prev,
        [q.id]: { securite: 0, innovation: 0, autonomie: 0, salaire: 0 },
      };
    });
  };

  // Vérification si on peut passer à la question suivante
  const canGoNext = useMemo(() => {
    if (!q) return false;

    const a = answers[q.id];
    if (q.type === "single") return !!a;
    if (q.type === "multiple") {
      const min = q.minSelections || 1;
      return Array.isArray(a) && a.length >= min && a.length <= (q.maxSelections || 99);
    }
    if (q.type === "ranking") {
      const a = answers[q.id] || {};
      return Object.keys(a).length === 3;
    }
    if (q.type === "sliders") {
      return a && ["securite","innovation","autonomie","salaire"].every(k => typeof a[k] === "number");
    }
    return false;
  }, [answers, q]);

  // Sauvegarde des résultats du test
  const saveTestResults = async (testResults) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        'http://localhost:8000/api/orientation-test/save/',
        {
          answers: testResults.answers,
          raw_scores: testResults.raw,
          max_scores: testResults.max,
          normalized_scores: testResults.normalized,
          pillar_keys: testResults.PILLAR_KEYS
        },
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Test results saved:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving test results:', error);
      throw error;
    }
  };

  // Navigation vers la question suivante ou affichage des résultats
  const goNext = async () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setIsSaving(true);

      try {
        const raw = computeRawScoresFromAnswers(answers, Q_MAPPING);
        const max = computeMaxScoresTheoretical(questions, Q_MAPPING);
        const normalized = normalizeScores0to100(raw, max);
        const testResults = {
          answers,
          raw,
          max,
          normalized,
          PILLAR_KEYS
        };
        await saveTestResults(testResults);
        navigate("/results", { state: testResults });
      } catch (error) {
        console.error('Error saving results:', error);
        const raw = computeRawScoresFromAnswers(answers, Q_MAPPING);
        const max = computeMaxScoresTheoretical(questions, Q_MAPPING);
        const normalized = normalizeScores0to100(raw, max);
        navigate("/results", {
          state: { answers, raw, max, normalized, PILLAR_KEYS },
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Navigation vers la question précédente
  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f2f2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          background: '#541652',
          borderRadius: '48px',
          padding: '48px',
          maxWidth: '900px',
          width: '80%',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '18px', margin: 0 }}>Checking your authentication...</p>
        </div>
      </div>
    );
  }

  // Affichage si non authentifié
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f2f2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          background: '#541652',
          borderRadius: '48px',
          padding: '12px',
          maxWidth: '900px',
          width: '80%',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '16px', fontSize: '24px' }}>Authentication Required</h3>
          <p style={{ marginBottom: '32px', fontSize: '16px', opacity: 0.9 }}>
            You must log in to take the orientation test.
          </p>
          <button
            style={{
              background: '#facc15',
              color: '#1f2937',
              border: 'none',
              borderRadius: '9999px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/login?redirect=/orientation-test')}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Affichage si la question n'existe pas
  if (!q) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f2f2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          background: 'red',
          borderRadius: '48px',
          padding: '48px',
          maxWidth: '900px',
          width: '80%',
          color: 'white',
          textAlign: 'center'
        }}>
          Error: Question not found (current: {current}, total: {questions.length})
        </div>
      </div>
    );
  }

  // Rendu principal du composant
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f2f2f2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
       background: '#541652',
       borderRadius: '35px',
       padding: q.id === "q2" ? '15px 65px' 
           : q.id === "q3" ? '5px 65px'  // style spécifique pour q3
           : q.id === "q4" ? '65px 65px'
           : q.id === "q5" ? '45px 65px'
           : q.id === "q6" ? '15px 65px'
           : q.id === "q8" ? '10px 65px'
           : q.id === "q10" ? '75px 45px'
           : q.id === "q12" ? '45px 45px'
           : '75px 75px',               // style par défaut
      maxWidth: q.id === "q3" ? '900px' : '900px', // exemple pour q3
      width: q.id === "q3" ? '80%' : '80%',
      color: 'white',
      marginTop: q.id === "q3" ? -120 : -130, // ajustement pour q3
      textAlign: 'center'
}}>
        {/* Header avec les informations de l'utilisateur */}
        {userInfo && (
          <div style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '14px',
            marginBottom: '20px',
            textAlign: 'right'
          }}>
            {userInfo.first_name || userInfo.prenom} {userInfo.last_name || userInfo.nom}
          </div>
        )}

        {/* Titre de la question */}
        <h2 style={{
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'Poppins, sans-serif',
          color: 'rgba(255,255,255,0.85)'
        }}>
          {current + 1}-{q.question.toUpperCase()}
        </h2>

        {/* Instructions */}
        <p style={{
          marginBottom: '40px',
          opacity: 0.8,
          fontSize: '14px'
        }}>
          {q.type === 'single' && '(SELECT ONE ONLY)'}
          {q.type === 'multiple' && `(SELECT ${q.minSelections || 1} TO ${q.maxSelections || 3} OPTIONS)`}
          {q.type === 'ranking' && '(RATED FROM ★ (NOT IMPORTANT) TO ★★★★★ (VERY IMPORTANT))'}
          {q.type === 'sliders' && '(RATED FROM ★ (NOT IMPORTANT) TO ★★★★★ (VERY IMPORTANT))'}
        </p>

        {q.type === "single" && (
  <>
    {/* Question 1: Design spécifique */}
    {q.id === "q1" && (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
        {q.options.map((opt) => {
          const active = answers[q.id] === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSingle(opt.id)}
              style={{
            background: active ? '#F5B400' : 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '50px',
            padding: '8px 12px',
            color: active ? '#541652' : 'white',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            maxWidth: '300px',
          }}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
    )}

    {/* Question 3: Design spécifique */}
   {q.id === "q3" && (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginBottom: '40px',
    alignItems: 'center'
  }}>
    {q.options.map((opt) => {
      const active = answers[q.id] === opt.id;
      return (
        <button
          key={opt.id}
          onClick={() => handleSingle(opt.id)}
          style={{
            width: '100%',
            maxWidth: '500px',
            border: `2px solid ${active ? '#facc15' : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '30px',
            padding: '18px 24px',
            background: active ? '#F5B400' : 'transparent', 
            color: 'white',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '24px', marginBottom: '8px' }}>{opt.icon}</span>
          {opt.text}
        </button>
      );
    })}
  </div>
)}


    {/* Ajoute d'autres designs spécifiques pour d'autres questions ici */}
{q.id === "q4" && (
  <div style={{ marginBottom: '40px' }}>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '45px',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      {q.options.map((opt) => {
        const active = answers[q.id] === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => handleSingle(opt.id)}
            style={{
              width: '105%',
              padding: '5px 24px',
              border: `2px solid ${active ? '#facc15' : 'rgba(255,255,255,0.2)'}`,
              borderRadius: '30px',
              background: active ? '#F5B400' : 'transparent',
              color: 'white',
              fontWeight: '600',
              fontSize: '15px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{ fontSize: '24px', marginBottom: '8px' }}>{opt.icon}</span>
            {opt.text}
          </button>
        );
      })}
    </div>
  </div>
)}

{q.id === "q6" && (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '40px',
    alignItems: 'center'
  }}>
    {q.options.map((opt) => {
      const active = answers[q.id] === opt.id;
      return (
        <button
          key={opt.id}
          onClick={() => handleSingle(opt.id)}
          style={{
            width: '100%',
            maxWidth: '500px',
            border: `2px solid ${active ? '#facc15' : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '30px',
            padding: '18px 24px',
            background: active ? '#F5B400' : 'transparent', 
            color: 'white',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '24px', marginBottom: '8px' }}>{opt.icon}</span>
          {opt.text}
        </button>
      );
    })}
  </div>
)}

    {q.id === "q7" && (
  <div style={{ marginBottom: '40px' }}>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '45px',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      {q.options.map((opt) => {
        const active = answers[q.id] === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => handleSingle(opt.id)}
            style={{
              width: '105%',
              padding: '5px 24px',
              border: `2px solid ${active ? '#facc15' : 'rgba(255,255,255,0.2)'}`,
              borderRadius: '30px',
              background: active ? '#F5B400' : 'transparent',
              color: 'white',
              fontWeight: '600',
              fontSize: '15px',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{ fontSize: '24px', marginBottom: '8px' }}>{opt.icon}</span>
            {opt.text}
          </button>
        );
      })}
    </div>
  </div>
)}
 

   {/* Question 8: Design spécifique avec photos */}
  {q.id === "q8" && (
  <div style={{ marginBottom: '40px', textAlign: 'center' }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    }}>
      {/* Ligne 1 : A, B, C */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {q.options.slice(0, 3).map((opt) => {
          const active = answers[q.id] === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => handleSingle(opt.id)}
              style={{
                background: active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${active ? '#FACC15' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '12px',
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                minHeight: '140px',
                width: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                marginBottom: '10px',
                backgroundImage: `url(${opt.photo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRadius: '6px',
              }} />
              <p style={{
                color: active ? 'white' : 'rgba(255, 255, 255, 0.85)',
                fontSize: '13px',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.2',
              }}>
                {opt.text.replace(/^.\:/, '').trim()}
              </p>
              {active && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  zIndex: 2,
                  width: '24px',
                  height: '24px',
                  background: '#22c55e',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px 0 #22c55e55',
                }}>
                  <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                    <path d="M5 9L8 12L13 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Ligne 2 : D, E */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        {q.options.slice(3, 5).map((opt) => {
          const active = answers[q.id] === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => handleSingle(opt.id)}
              style={{
                background: active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${active ? '#FACC15' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '12px',
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                minHeight: '140px',
                width: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                marginBottom: '10px',
                backgroundImage: `url(${opt.photo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRadius: '6px',
              }} />
              <p style={{
                color: active ? 'white' : 'rgba(255, 255, 255, 0.85)',
                fontSize: '13px',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.2',
              }}>
                {opt.text.replace(/^.\:/, '').trim()}
              </p>
              {active && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  zIndex: 2,
                  width: '24px',
                  height: '24px',
                  background: '#22c55e',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px 0 #22c55e55',
                }}>
                  <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                    <path d="M5 9L8 12L13 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}

{q.id === "q10" && (
  <div style={{ marginBottom: '40px', textAlign: 'center' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'nowrap',
        maxWidth: '100%',
      }}
    >
      {q.options.map((opt) => {
        const active = answers[q.id] === opt.id;
        return (
          <div key={opt.id} style={{ position: 'relative' }}>
            <button
              onClick={() => handleSingle(opt.id)}
              style={{
                width: '200px',                    
                height: '140px',                   
                padding: '12px',
                background: active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${active ? '#FACC15' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '14px',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                whiteSpace: 'normal',              
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1.4',
              }}
            >
              {opt.text}
            </button>
            {active && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                zIndex: 2,
                width: '24px',
                height: '24px',
                background: '#22c55e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px 0 #22c55e55',
              }}>
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                  <path d="M5 9L8 12L13 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}

{q.id === "q11" && (
  <div style={{ marginBottom: '40px', textAlign: 'center' }}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'nowrap', // une seule ligne
    }}>
      {q.options.map((opt) => {
        const active = answers[q.id] === opt.id;
        return (
          <div
            key={opt.id}
            onClick={() => handleSingle(opt.id)}
            style={{
              background: active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: `2px solid ${active ? '#FACC15' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '12px',
              padding: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s ease',
              minHeight: '140px',
              width: '180px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Image */}
            <div style={{
              width: '48px',
              height: '48px',
              marginBottom: '10px',
              backgroundImage: `url(${opt.photo})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: '6px',
            }} />

            {/* Text */}
            <p style={{
              color: active ? 'white' : 'rgba(255, 255, 255, 0.85)',
              fontSize: '13px',
              fontWeight: '500',
              margin: 0,
              lineHeight: '1.2',
            }}>
              {opt.text.replace(/^.\:/, '').trim()}
            </p>

            {/* Flèche verte */}
            {active && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                zIndex: 2,
                width: '24px',
                height: '24px',
                background: '#22c55e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px 0 #22c55e55',
              }}>
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                  <path d="M5 9L8 12L13 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}

{q.id === "q12" && (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '40px',
    alignItems: 'center'
  }}>
    {q.options.map((opt) => {
      const active = answers[q.id] === opt.id;
      return (
        <button
          key={opt.id}
          onClick={() => handleSingle(opt.id)}
          style={{
            width: '100%',
            maxWidth: '500px',
            border: `2px solid ${active ? '#facc15' : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '30px',
            padding: '18px 24px',
            background: active ? '#F5B400' : 'transparent', 
            color: 'white',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '24px', marginBottom: '8px' }}>{opt.icon}</span>
          {opt.text}
        </button>
      );
    })}
  </div>
)}


{q.id === "q13" && (
  <div style={{ marginBottom: '40px', textAlign: 'center' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '30px',
        flexWrap: 'nowrap',
        maxWidth: '100%',
      }}
    >
      {q.options.map((opt) => {
        const active = answers[q.id] === opt.id;
        return (
          <div key={opt.id} style={{ position: 'relative' }}>
            <button
              onClick={() => handleSingle(opt.id)}
              style={{
                width: '200px',                    
                height: '140px',                   
                padding: '12px',
                background: active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${active ? '#FACC15' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '14px',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                whiteSpace: 'normal',              
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1.4',
              }}
            >
              {opt.text}
            </button>
            {active && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                zIndex: 2,
                width: '24px',
                height: '24px',
                background: '#22c55e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px 0 #22c55e55',
              }}>
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                  <path d="M5 9L8 12L13 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}
  </>
)}


      {q.type === "multiple" && q.id === "q2" && (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '40px',
    marginTop:-20,
    flexWrap: 'wrap'
  }}>
    {q.options.map((opt) => {
      const cur = Array.isArray(answers[q.id]) ? answers[q.id] : [];
      const checked = cur.includes(opt.key);
      const disabled = !checked && q.maxSelections && cur.length >= q.maxSelections;
      return (
        <div style={{ position: 'relative', display: 'inline-block' }} key={opt.key}>
          <button
            onClick={() => !disabled && toggleMulti(opt.key)}
            disabled={disabled}
            style={{
              border: checked ? "2px solid #f0f0f0" : "2px solid rgba(255, 255, 255, 0.1)",
              background: checked ? "transparent" : "rgba(255, 255, 255, 0.1)",
              borderRadius: '10px',
              padding: '8px',
              color: checked ? '#fff' : '#fff',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              width: '150px',
              height: '140px',  // Augmenté pour mieux afficher les photos
              boxShadow: checked ? '0 2px 12px 0 #facc1555' : 'none',
              transition: 'all 0.2s',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Photo */}
            <div
  style={{
    width: "120px",          
    height: "120px",         
    marginBottom: "12px",
    backgroundImage: `url(${opt.photo})`,
    backgroundSize: "contain", 
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "8px",
  }}
/>

            {/* Label */}
            <span style={{ fontSize: '0.8rem', marginTop: 'auto' }}>{opt.label}</span>
          </button>
          {checked && (
            <span style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              zIndex: 2,
              width: '24px',
              height: '24px',
              background: '#22c55e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px 0 #22c55e55'
            }}>
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                <path d="M5 9L8 12L13 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </div>
      );
    })}
  </div>
)}

{q.type === "multiple" && q.id === "q14" && (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '40px',
    marginTop: -20,
    flexWrap: 'wrap',
  }}>
    {q.options.map((opt) => {
      const cur = Array.isArray(answers[q.id]) ? answers[q.id] : [];
      const checked = cur.includes(opt.key);
      const disabled = !checked && q.maxSelections && cur.length >= q.maxSelections;

      return (
        <div key={opt.key} style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => !disabled && toggleMulti(opt.key)}
            disabled={disabled}
            style={{
              border: checked ? "2px solid #f0f0f0" : "2px solid rgba(255, 255, 255, 0.1)",
              background: checked ? "transparent" : "rgba(255, 255, 255, 0.1)",
              borderRadius: '10px',
              padding: '8px',
              color: '#fff',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              width: '200px',
              height: '120px',
              boxShadow: checked ? '0 2px 12px 0 #facc1555' : 'none',
              transition: 'all 0.2s',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1.3',
            }}
          >
            {opt.label}
          </button>
          {checked && (
            <span style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              zIndex: 2,
              width: '24px',
              height: '24px',
              background: '#22c55e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px 0 #22c55e55',
            }}>
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                <path d="M5 9L8 12L13 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>
      );
    })}
  </div>
)}




{q.type === "ranking" && q.id === "q5" && (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '30px',
      maxWidth: '900px',
      margin: '0 auto'
    }}
  >
    {q.options.map((opt) => {
      const currentAnswer = answers[q.id]?.[opt.key] || 0;
      const totalRanked = Object.keys(answers[q.id] || {}).length;

      return (
        <div
          key={opt.key}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px' // Espace entre la carte et les étoiles
          }}
        >
          {/* Carte avec bordure blanche et fond transparent */}
          <div
            style={{
              background: 'transparent',
              border: '2px solid white',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
              color: 'white',
              fontWeight: '500',
              fontSize: '0.9rem',
              minHeight: '60px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {opt.label}
          </div>

          {/* Étoiles */}
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= currentAnswer;
              const isDisabled = totalRanked >= 3 && currentAnswer === 0;

              return (
                <span
                  key={star}
                  onClick={() => {
                    if (!isDisabled) {
                      handleStarClick(opt.key, star);
                    }
                  }}
                  style={{
                    fontSize: '1.7rem',
                    color: isFilled ? '#facc15' : 'rgba(255,255,255,0.4)',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.3 : 1
                  }}
                >
                  ★
                </span>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
)}


      {q.type === "sliders" && (
  <div style={{ marginBottom: '40px', textAlign: 'center' }} onMouseEnter={ensureQ9Init} onTouchStart={ensureQ9Init}>
    {/* Grille des critères avec étoiles en dessous */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      margin: '0 auto',
      maxWidth: '800px',
    }}>
      {[
        { key: "securite", label: "Job security and stability" },
        { key: "innovation", label: "Opportunity to innovate and be on the cutting edge" },
        { key: "autonomie", label: "Autonomy and freedom in decision-making" },
        { key: "salaire", label: "High salary and good financial opportunities" },
      ].map((item) => {
        const currentValue = answers[q.id]?.[item.key] ?? 0;
        return (
          <div
            key={item.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Carte du critère (texte sur une ligne) */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px', // Bordure très arrondie
              padding: '12px 20px',
              textAlign: 'center',
              width: '100%',
              whiteSpace: 'nowrap', // Empêche le retour à la ligne
            }}>
              <p style={{
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                margin: 0,
              }}>
                {item.label}
              </p>
            </div>
            {/* Étoiles en dessous de la carte */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= currentValue;
                return (
                  <span
                    key={star}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: { ...(prev[q.id] || {}), [item.key]: star },
                      }))
                    }
                    style={{
                      fontSize: '20px',
                      color: isFilled ? '#FACC15' : '#9B8BB3',
                      cursor: 'pointer',
                    }}
                  >
                    ★
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}


        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <button
            onClick={goPrev}
            disabled={current === 0 || isSaving}
            style={{
              background: 'transparent',
              color: current === 0 || isSaving ? 'rgba(255,255,255,0.3)' : 'white',
              border: 'none',
              cursor: current === 0 || isSaving ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            ‹ Back
          </button>

          <button
            onClick={goNext}
            disabled={!canGoNext || isSaving}
            style={{
              background: canGoNext && !isSaving ? '#facc15' : 'rgba(255,255,255,0.2)',
              color: canGoNext && !isSaving ? '#1f2937' : 'rgba(255,255,255,0.5)',
              border: 'none',
              borderRadius: '9999px',
              padding: '10px 24px',
              fontWeight: '600',
              cursor: canGoNext && !isSaving ? 'pointer' : 'not-allowed',
              fontSize: '16px'
            }}
          >
            {isSaving ? "Saving..." : (current === questions.length - 1 ? "See Results" : "Next ›")}
          </button>
        </div>

        {/* Barre de progression */}
        <div style={{
          background: '#ccc',
          borderRadius: '9999px',
          height: '28px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f59e0b, #facc15)',
            position: 'relative',
            transition: 'width 0.5s ease'
          }}>
            <div style={{
              position: 'absolute',
              right: '-20px',
              top: 0,
              bottom: 0,
              width: '40px',
              background: 'radial-gradient(circle at left center, #facc15 70%, transparent 71%)'
            }} />
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#541652',
            fontSize: '16px',
            fontWeight: '800'
          }}>
            {current + 1}/{totalQuestions}
          </div>
        </div>
      </div>
    </div>
  );
}