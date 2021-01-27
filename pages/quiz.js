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

function QuestionWidget({ question, totalQuestions, questionsIdex }) {
  const questionId = `question__${questionsIdex}`;
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
        {/*
        {question.alternatives.map((alternative) => {
          console.log('pare de reclamar');
          return alternative;
        })} */}

        <form>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic htmlFor={alternativeId} as="label">

                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  // style={{ display: 'none' }}
                />

                {alternative}
              </Widget.Topic>
            );
          })}

          {/* {JSON.stringify(question.alternatives)} */}
          {/* <pre>{JSON.stringify(question, null, 4)}</pre> */}

          <Button>Confirmar</Button>
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
  const screenState = 'QUIZ';
  // const screenState = screenStates.QUIZ;
  const totalQuestions = db.questions.length;
  const questionsIdex = 0;
  const question = db.questions[questionsIdex];
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
            questionsIdex={questionsIdex}
            totalQuestions={totalQuestions}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou x questões, parabens</div>}

        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
