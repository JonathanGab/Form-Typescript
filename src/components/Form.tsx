import axios from 'axios';
import React, { useState /*, useEffect*/ } from 'react';
import '../styles/form.css';

interface ISkills {
  title: string,
  votes: number
}

interface IWilder {
  name: string,
  city: string,
  profilePicture?: string
}

export default function Form() {
  const [wilder, setWilder] = useState<IWilder>({ name: '', city: '', profilePicture: ''});
  const [skills, setSkills] = useState<ISkills>({ title: '', votes: 0});

  const createWilder = async (): Promise<void> => {
    try {
      const wilderData: IWilder = {
        name: wilder.name,
        city: wilder.city,
        profilePicture: wilder.profilePicture,
      };
      const skillsData: ISkills = {
          title: skills.title,
          votes: skills.votes,
      }
      const newWilder = await axios.post(
        'http://localhost:5000/api/wilders',
      {wilderData, skillsData}
      );
      console.log(newWilder.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createWilder();
  }

  return (
    <div className="form-container">
      <div className="form">
        <h1 className="create">Create a new wilder</h1>
        <form onSubmit={onSubmit} className="form-body">
          <div className="form-header">
            <input
              type="text"
              onChange={(e) => setWilder({ ...wilder, name: e.target.value })}
              value={wilder.name}
              placeholder="Name"
              className="input"
            />
            <input
              type="text"
              onChange={(e) => setWilder({ ...wilder, city: e.target.value })}
              value={wilder.city}
              placeholder="City"
              className="input"
            />
          </div>
          <input
            type="text"
            onChange={(e) =>
              setWilder({ ...wilder, profilePicture: e.target.value })
            }
            value={wilder.profilePicture}
            placeholder="Avatar"
            className="input"
          />
          <input
            type="text"
            onChange={(e) => setSkills({ ...skills, title: e.target.value })}
            value={skills.title}
            className="input"
            placeholder="Title"
          />
          <input
            type="number"
            onChange={(e) => setSkills({ ...skills, votes: parseInt(e.target.value, 10) })}
            value={skills.votes}
            className="input"
            placeholder="Votes"
          /> 
          <div className="button-container">
            <button className="button">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
