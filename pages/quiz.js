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

function QuestionWidget({ question }) {
  return (
    <Widget>

      <Widget.Header>
        <h1>Pergunta 1 de {`${db.questions.length}`}</h1>
      </Widget.Header>

      <img src={question.image} alt="Descrição" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <Button>Confirmar</Button>
      </Widget.Content>

    </Widget>
  );
}

export default function QuizPage() {
  console.log('Pergunta criada: ', db.questions);
  const question = db.questions[0];
  return (
    <QuizBackground backgroundImage={db.bg}>

      <Head>
        <title>{db.title}</title>
      </Head>

      <QuizContainer>

        <QuizLogo />

        <QuestionWidget question={question} />

        <LoadingWidget />

        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
