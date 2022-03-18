/* eslint-disable */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IPropsSkills {
  title: string;
  votes: number;
}

interface IPropsWilder {
  _id: string;
  name: string;
  city: string;
  skills: IPropsSkills[];
}

export default function Wilder(): JSX.Element {
  const [wilder, setWilder] = useState<IPropsWilder>({
    _id: '',
    name: '',
    city: '',
    skills: [],
  });
  const [skills, setSkills] = useState<IPropsSkills[]>([]);
  const { id } = useParams();

  const successToast = () => {
    toast.success(
      'Les informations concernant votre wilder ont bel et bien été sauvegardé !'
    );
  };

  const errorToast = () => {
    toast.error("Une erreur est survenue lors de l'édition de votre wilder.");
  };

  const editWilder = async () => {
    try {
      const test = await axios.patch(
        `http://localhost:5000/api/wilders/${id}`,
        wilder
      );
      console.log(test);
      successToast();
    } catch (err) {
      console.log(err);
      errorToast();
    }
  };

  const getWilderByHisId = async () => {
    try {
      const displayWilder = await axios.get(
        `http://localhost:5000/api/wilders/${id}`
      );
      setWilder(displayWilder.data.result);
      setSkills(displayWilder.data.result.skills);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWilderByHisId();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    editWilder();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div key={wilder._id}>
          <input
            type="text"
            onChange={(e) => setWilder({ ...wilder, name: e.target.value })}
            value={wilder.name}
            className="name-input"
          />
          <input
            type="text"
            onChange={(e) => setWilder({ ...wilder, city: e.target.value })}
            value={wilder.city}
            className="city-input"
          />
          {skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                onChange={(e) => {
                  const newValue = e.target.value;
                  // Créer une copie du tableau
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
            </div>
          ))}
          <button type="submit">Sauvegarder</button>
        </div>
      </form>
    </>
  );
}
