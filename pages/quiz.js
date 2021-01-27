/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';

import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function QuizPage() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>

      <Head>
        <title>{db.title}</title>
      </Head>

      <QuizContainer>

        <QuizLogo />

        <Widget>

          <Widget.Header>
            <h1>Pergunta 1 de 10</h1>
          </Widget.Header>

          <img src="https://placehold.it/400x400" alt="Descrição" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />

          <Widget.Content>
            <h2>Titulo</h2>
            <p>Descrição</p>
            <Button>Confirmar</Button>
          </Widget.Content>

        </Widget>
        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
