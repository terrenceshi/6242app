import './App.css';
import * as React from 'react';
import './About.css';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

function About() {

  const [isMobile, setIsMobile] = useState(1)
 
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(350 / 900)

    } else {
        setIsMobile(1)
    }
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <Box 
      className="About"
      sx = {{ width: isMobile * 900 + 'px' }}
    >
      <div id="wrapper">
        <div>
          <p > 
            &emsp;&emsp;Many web services rely on recommender systems to
            help users discover personalized content from their
            ever-increasing large databases. Great performance can be achieved through 
            simple techniques such as matrix factorization (MF) of user-item
            matrices. MF belongs to a class of algorithms known
            as collaborative filtering and leverages preference data
            from a large collection of users to inform the suggestions provided 
            to any specific individual. While these
            techniques have been applied successfully to recommend 
            personalized content in a single domain, recommending content across 
            domains is less explored. As a result, we are interested in designing a collaborative
            filtering system to recommend cross-domain content.
            In particular, we designed an automated music playlist
            recommendation system for books based on their descriptions. 
            In doing so, we hope to create a unique, immersive reading experience.
          </p>
        </div>

        <div>
            <p>
              &emsp;&emsp;We connect book and song domains by using modern
              advances in NLP. Siamese provided an efficient method for
              computing sentence similarity embeddings
              transformer models. We train our model using recent advances in fast
              MF algorithms. Finally, we apply weighted regularization
              to encourage small norms in the latent factors so that
              the learned factorization will be stable. 
            </p>
        </div>
        
      </div>

    </Box>
  );
}

export default About;
