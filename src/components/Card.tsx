import '../styles/card.css';
import styled from 'styled-components'
import avatar from '../assets/avatar.png';

const Container = styled.div`
  margin: 1rem;
  width: 15rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
`;

interface IWilderHeaderProps {
  name: string,
  city: string,
  profilePicture: string
}

export default function Card({ name, city, profilePicture }: IWilderHeaderProps): JSX.Element {
  return (
    <Container>
      <Wrapper>
        <div className="img-container">
          <img
            src={profilePicture ? profilePicture : avatar}
            alt={`${name} avatar`}
            className="avatar"
          />
        </div> 
        <CardContainer>
          <Header>
            <p>{name}</p>
          </Header>
        </CardContainer>
        <div className="card-row">
          <p>{city}</p>
        </div>
      </Wrapper>
    </Container>
  );
}
