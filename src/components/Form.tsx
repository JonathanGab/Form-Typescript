import axios from 'axios';
import React, { useState } from 'react';
import '../styles/form.css';

interface ISkills {
  index: number,
  title: string,
  votes: number
}

interface IWilder {
  name: string,
  city: string,
  profilePicture?: string
  skills: ISkills[]
}

export default function Form() {
  const [skills, setSkills] = useState<ISkills[]>([{ index: 0, title: '', votes: 0}]);
  const [wilder, setWilder] = useState<IWilder>({ name: '', city: '', profilePicture: '', skills: [...skills]});

  const createWilder = async (): Promise<void> => {
    try {
      const wilderData: IWilder = {
        name: wilder.name,
        city: wilder.city,
        profilePicture: wilder.profilePicture,
        skills: [...skills]
      };
      const newWilder = await axios.post(
        'http://localhost:5000/api/wilders',
      wilderData
      );
      console.log(newWilder.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let data: any = [...skills];
    // ICI A CHANGER !!!
    data[index][event.target.title] = event.currentTarget.value;
    setSkills(data);
  }

  const addFields = () => {
    let object = {
      index: 0,
      title: '',
      votes: 0
    }
    setSkills([...skills, object])
  }

  const removeFields = (index: number) => {
    let data = [...skills];
    data.splice(index, 1);
    setSkills(data);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createWilder();
  }

  console.log(skills)

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
              className="name-input"
            />
            <input
              type="text"
              onChange={(e) => setWilder({ ...wilder, city: e.target.value })}
              value={wilder.city}
              placeholder="City"
              className="city-input"
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
          {skills.map((skill, index) => (    
            <React.Fragment key={index}>          
            <input type="text"
            onChange={(event) => handleFormChange(event, index)}
            defaultValue={skill.title}
            className="input"
            placeholder="Title"
            />
          <input
            type="number"
            onChange={(event) => handleFormChange(event, index)}
            defaultValue={skill.votes}
            className="input"
            placeholder="Votes"    
            />
          <button onClick={() => removeFields(index)}>Remove</button>
            </React.Fragment>
          ))}
          <div className="button-container">
            <button className="button">
              Send
            </button>
          </div>
        </form>
        <button onClick={addFields}>Add More..</button>
      </div>
    </div>
  );
}
