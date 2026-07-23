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
          {toggle === 'product' ? (
            <ToggleButton active value="product" onClick={() => setToggle('product')}>
              AI PLATFORM
            </ToggleButton>
          ) : (
            <ToggleButton value="product" onClick={() => setToggle('product')}>
              AI PLATFORM
            </ToggleButton>
          )}
          <Divider />
          {toggle === 'automation' ?
            <ToggleButton active value="automation" onClick={() => setToggle('automation')}>AUTOMATION PLATFORM</ToggleButton>
            :
            <ToggleButton value="automation" onClick={() => setToggle('automation')}>AUTOMATION PLATFORM</ToggleButton>
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
