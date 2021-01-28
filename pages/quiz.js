/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Head from 'next/head';
import db from '../db.json';

import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionsIdex, onSubmit,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionsIdex}`;
  const isCorrect = selectedAlternative === question.answer;
  return (
    <Widget>

      <Widget.Header>
        {/* <h3>Pergunta {questionsIdex + 1} de {`${totalQuestions}`}</h3> */}
        <h3> {`Pergunta ${questionsIdex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img src={question.image} alt="Descrição" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              onSubmit();
              setIsQuestionSubmited(false);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic htmlFor={alternativeId} as="label" key={alternativeId}>

                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  // style={{ display: 'none' }}
                />

                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">Confirmar</Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </form>
      </Widget.Content>

    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>

      <Head>
        <title>{db.title}</title>
      </Head>

      <QuizContainer>

        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou x questões, parabens</div>}

        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
