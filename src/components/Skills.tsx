import '../styles/skills.css';

interface ISkillsProps{
  title: string;
  votes: number;
}

export default function Skills({ title, votes }: ISkillsProps): JSX.Element {
  return (
    <div className="tag">
      <div className="content">
        <div className="skills">
          <p className="title">
            {title}
          </p>
          <p className="votes">{votes}</p>
        </div>
      </div>
    </div>
  );
}
