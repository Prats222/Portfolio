import React from "react";
import styled from "styled-components";
import { certifications } from "../../data/constants";
import { WorkspacePremium } from "@mui/icons-material";

const Container = styled.section`
  display: flex;
  justify-content: center;
  padding: 60px 20px 90px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: 42px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  max-width: 650px;
  margin: 12px auto 32px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 110px;
  padding: 22px;
  border: 1px solid #854ce6;
  border-radius: 16px;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card};
  box-shadow: rgba(23, 92, 230, 0.15) 0 4px 24px;
`;

const Icon = styled.div`
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: white;
  background: linear-gradient(135deg, #854ce6, #306ee8);
`;

const CertificationName = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 1.45;
`;

const Certifications = () => (
  <Container id="certifications">
    <Wrapper>
      <Title>Certifications</Title>
      <Description>
        Focused learning across ASP.NET Core APIs, Playwright automation, and full-stack engineering.
      </Description>
      <Grid>
        {certifications.map((certification) => (
          <Card key={certification}>
            <Icon><WorkspacePremium /></Icon>
            <CertificationName>{certification}</CertificationName>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  </Container>
);

export default Certifications;
