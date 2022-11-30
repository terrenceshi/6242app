import './App.css';
import * as React from 'react';
import { Typography, TextField, Box, Button, Toolbar, AppBar, IconButton, Tabs, Tab, List, Divider, Drawer, Grid, ListItemText, ListItem, Menu, MenuItem } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import './About.css';



const getbutton = (event: React.ChangeEvent<HTMLInputElement>) => {
  var button = document.getElementById("toggle");
  var targetDiv = document.getElementById("third");
  console.log(button);
  console.log(targetDiv);
  console.log("CLICKED");
  if (targetDiv.style.display === 'none') {
      targetDiv.style.display = 'block';
    } else {
      targetDiv.style.display = 'none';
    }


}


const purposeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  var purpose = document.getElementById("purposeStatement");
  var process = document.getElementById("processStatement");
  var read = document.getElementById("readMore");
  if (process.style.display != 'none') {
      process.style.display = 'none';
    }
  if (read.style.display != 'none') {
      read.style.display = 'none';
  }
  if (purpose.style.display === 'none') {
      purpose.style.display = 'flex';
    }
}

const processClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  var process = document.getElementById("processStatement");
  var read = document.getElementById("readMore");
  var purpose = document.getElementById("purposeStatement");
  console.log(process);
  console.log(read);
  console.log(purpose);
  if (read.style.display != 'none') {
      read.style.display = 'none';
  }
  if (purpose.style.display != 'none') {
      purpose.style.display = 'none';
    }
  if (process.style.display === 'none') {
      process.style.display = 'flex';
    }
}


const readMoreClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  var read = document.getElementById("readMore");
  var process = document.getElementById("processStatement");
  var purpose = document.getElementById("purposeStatement");
  if (read.style.display === 'none') {
    read.style.display = 'inline';
  }
  if (purpose.style.display != 'none') {
    purpose.style.display = 'none';
  }
  if (process.style.display != 'none') {
    process.style.display = 'none';
  }
}


function About() {
  return (
    <div className="About">
      <div id="wrapper">
        <div>
          <p > 
              Many web services rely on recommender systems to
            help users discover personalized content from their
            ever-increasing large databases. Great performance can be achieved through simple tech-
            niques such as matrix factorization (MF) of user-item
            matrices. MF belongs to a class of algorithms known
            as collaborative filtering and leverages preference data
            from a large collection of users to inform the sugges-
            tions provided to any specific individual. While these
            techniques have been applied successfully to recom-
            mend personalized content in a single domain, recom-
            mending content across domains is less explored. As
            a result, we are interested in designing a collaborative
            filtering system to recommend cross-domain content.
            In particular, we designed an automated music playlist
            recommendation system for books based on their descrip-
            tions. In doing so, we hope to create a unique, immersive
            reading experience.
          </p>
        </div>

        <div>
            <p>
                We connect book and song domains by using modern
              advances in NLP. Siamese provided an efficient method for
              computing sentence similarity embeddings
              transformer models. We train our model using recent advances in fast
              MF algorithms. Finally, we apply weighted regularization
              to encourage small norms in the latent factors so that
              the learned factorization will be stable. 
            </p>
        </div>
        
      </div>

    </div>
  );
}

export default About;
