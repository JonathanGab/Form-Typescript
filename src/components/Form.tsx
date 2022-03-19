import axios from 'axios';
import React, { useState } from 'react';
import '../styles/form.css';
import { toast } from 'react-toastify';

interface ISkill {
  title: string;
  votes: number;
}

interface IWilder {
  name: string;
  city: string;
  profilePicture?: string;
  skills: ISkill[];
}

export default function Form() {
  const [wilder, setWilder] = useState<IWilder>({
    name: '',
    city: '',
    profilePicture: '',
    skills: [],
  });
  const [skills, setSkills] = useState<ISkill[]>([]);

  const successToast = () => {
    toast.success('Votre wilder a bel et bien été créé !');
  };

  const errorToast = () => {
    toast.error('Une erreur est survenue lors de la création de votre wilder.');
  };

  const createWilder = async (): Promise<void> => {
    try {
      // Création d'une variable pour récolter toutes les données
      const wilderData: IWilder = {
        name: wilder.name,
        city: wilder.city,
        profilePicture: wilder.profilePicture,
        skills: skills,
      };
      await axios.post('http://localhost:5000/api/wilders', wilderData);
      successToast();
      setWilder({
        name: '',
        city: '',
        profilePicture: '',
        skills: [],
      });
      setSkills([]);
    } catch (err) {
      console.log(err);
      errorToast();
    }
  };

  const addSkills = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    const newSkills = skills.slice();
    newSkills.push({ title: '', votes: 0 });
    setSkills(newSkills);
  };

  const removeSkills = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ): void => {
    e.preventDefault();
    const newSkills = skills.slice();
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createWilder();
  };

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
              required
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
              <input
                type="text"
                onChange={(e) => {
                  const newValue = e.target.value;
                  // Créer une copie du tableau avec slice()
                  const newSkills = skills.slice();
                  // Modifier le contenu du tableau en retirant un élément
                  newSkills.splice(index, 1, { ...skill, title: newValue });
                  // Remplace skills par le tableau modifié
                  setSkills(newSkills);
                }}
                value={skill.title}
                className="input"
                placeholder="Title"
                required
              />
              <input
                type="number"
                min={0}
                onChange={(e) => {
                  const newValue = e.target.value;
                  // Créer une copie du tableau
                  const newSkills = skills.slice();
                  // Modifier le contenu du tableau en retirant un élément
                  newSkills.splice(index, 1, {
                    ...skill,
                    votes: Number(newValue),
                  });
                  // Remplace skills par le tableau modifié
                  setSkills(newSkills);
                }}
                value={skill.votes}
                className="input"
                placeholder="Votes"
                required
              />
              <button onClick={(e) => removeSkills(e, index)}>Remove</button>
            </React.Fragment>
          ))}
          <div className="button-container">
            <button className="button">Send</button>
          </div>
        </form>
        <button onClick={addSkills}>Add Skills</button>
      </div>
    </div>
  );
}
