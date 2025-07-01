import React, { useState } from 'react';
import './Quiz.css';

const questions = [
  {
    question: "Your current mood is 🤨",
    options: [
      { label: 'Happy', category: 'Cake' },
      { label: 'Lazy', category: 'Noodles' },
      { label: 'Stressed', category: 'Deserts' },
      { label: 'Excited', category: 'Pasta' }
    ]
  },
  {
    question: 'Flavour you crave now 🤤',
    options: [
      { label: 'Sweet', category: 'Deserts' },
      { label: 'Spicy', category: 'Rolls' },
      { label: 'Savory', category: 'Sandwich' },
      { label: 'Tangy', category: 'Pure Veg' }
    ]
  },
  {
    question: 'Which time are you most likely to eat?',
    options: [
      { label: 'Morning', category: 'Salad' },
      { label: 'Afternoon', category: 'Pure Veg' },
      { label: 'Evening', category: 'Pasta' },
      { label: 'Late Night', category: 'Noodles' }
    ]
  },
  {
    question: 'Preferred texture to bite into 👩‍🍳 ',
    options: [
      { label: 'Crunchy', category: 'Rolls' },
      { label: 'Creamy', category: 'Pasta' },
      { label: 'Soft', category: 'Cake' },
      { label: 'Chewy', category: 'Salad' }
    ]
  },
  {
    question: 'Your ideal food temperature 🌡️',
    options: [
      { label: 'Cold', category: 'Deserts' },
      { label: 'Hot', category: 'Rolls' },
      { label: 'Warm', category: 'Noodles' },
      { label: 'Doesnt Matter', category: 'Sandwich' }
    ]
  }
];

const Quiz = ({ category, setCategory }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [curQ, setcurQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState('');
  const [ans,setAns]=useState('');

  const handleAnswer = (selectedOption) => {
    const newAnswers = [...answers, selectedOption.category];
    setAnswers(newAnswers);
    if (curQ < questions.length - 1) {
      setcurQ(curQ + 1);
    } else {
      const count = {};
      newAnswers.forEach((cat) => {
        count[cat] = (count[cat] || 0) + 1;
      });
      const bestCategory = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
      
      setAns(bestCategory)
      let msg = '';
      switch (bestCategory) {
        case 'Salad':
          msg = "Feeling fresh and light? A crisp Salad is your go-to vibe!";
          break;
        case 'Deserts':
          msg = "You're in a sweet state of mind. Treat yourself to our dreamy Deserts!";
          break;
        case 'Rolls':
          msg = "Spicy, bold, and ready to roll! Grab one (or three) of our tasty Rolls!";
          break;
        case 'Noodles':
          msg = "Feeling cozy or lazy? Noodles are the slurpy comfort you need.";
          break;
        case 'Cake':
          msg = "Soft, sweet, and pure indulgence — it's Cake o'clock!";
          break;
        case 'Pasta':
          msg = "A little tang, a little warmth — you're totally in a Pasta mood!";
          break;
        case 'Sandwich':
          msg = "Savory, satisfying, and no drama — Sandwiches just get you!";
          break;
        case 'Pure Veg':
        msg = "Clean, green, and feelin serene — Pure Veg is your perfect match!";
        break;
        default:
          msg = "You've got a versatile taste! Explore our full menu!";
      }
      setResult(msg);
    }
  };

  const restart = () => {
    setAnswers([]);
    setcurQ(0);
    setResult('');
  };

  return (
    <div className="quiz-wrapper">
      <div className={`quiz-toggle ${showQuiz ? 'open' : ''}`} onClick={() => setShowQuiz(!showQuiz)}>
       🍽️
      </div>

      {showQuiz && (
        <div className="quiz-box">
          {!result ? (
            <>
              <h4>{questions[curQ].question}</h4>
              <div className="quiz-options">
                {questions[curQ].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(option)}>
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="progress">Q{curQ + 1} of {questions.length}</p>
            </>
          ) : (
            <div className="quiz-result">
              <p>{result}</p>
               <a href='#explore-menu'>
              <button onClick={() => setCategory(ans)}>Explore {ans}</button>
              </a>
              <button onClick={restart}>Restart Quiz</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
