import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');

return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>Products and engineering work spanning agentic AI, full-stack development, and automation.</Desc>
        <ToggleButtonGroup>
          {toggle === 'web app' ? (
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>
              PRODUCT PROJECTS
            </ToggleButton>
          ) : (
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>
              PRODUCT PROJECTS
            </ToggleButton>
          )}
          <Divider />
          {toggle === 'android app' ?
            <ToggleButton active value="android app" onClick={() => setToggle('android app')}>INDUSTRY PROJECTS</ToggleButton>
            :
            <ToggleButton value="android app" onClick={() => setToggle('android app')}>INDUSTRY PROJECTS</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' &&
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} openModal={openModal} setOpenModal={setOpenModal} />
            ))}
          {projects
            .filter((item) => item.category === toggle)
            .map((project) => (
              <ProjectCard key={project.id} project={project} openModal={openModal} setOpenModal={setOpenModal} />
            ))}
        
        </CardContainer>
      </Wrapper>
    </Container>
  );
}

export default Projects
