import styled from 'styled-components';
import db from '../db.json';

import Head from 'next/head';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';


export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      
      <Head>
        <title>{db.title}</title>
      </Head>

      <QuizContainer>

        <QuizLogo />

        <Widget>

        <Widget.Header>
            <h1>The legend of zelda</h1>
        </Widget.Header>

          <Widget.Content>
           <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>  
                  
        </Widget> 

        <Widget>
          <Widget.Content>
           <h1>The legend of zelda</h1>
           <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>          
        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  );
}
