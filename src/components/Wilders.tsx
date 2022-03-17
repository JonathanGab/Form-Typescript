import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Skills from './Skills';
import '../styles/wilders.css';
// import { Loader } from '../utils/Loader';

interface IWilder {
  _id: string;
  name: string,
  city: string,
  profilePicture: string,
  skills: {_id: string, title: string, votes: number}[]
}

export default function Wilders(): JSX.Element
{
  const [wilders, setWilders] = useState<IWilder[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  
  const removeWilder = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/api/wilders/${id}`);
      setWilders((name) => name.filter((n) => n._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  
  async function getWilders(): Promise<void> {
    // setLoading(true);
    try {
      const displayWilders = await axios.get(
        'http://localhost:5000/api/wilders'
      );
      setWilders(displayWilders.data.result);
      console.log(displayWilders.data.result);
      setTimeout(() => {
        // setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getWilders();
  }, []);

  return (
    <div className="wilder-component-container">
            <div className="cards-container">
          {wilders.map((wilder) => (
            <div key={wilder._id} className="cards">
              <div className="card-header">
                <Card {...wilder} />
              </div>
              <div className="skills-wrapper">
                {wilder.skills.map((el) => (
                  <div key={el._id} className="cards-skills">
                    <Skills {...el} />
                  </div>
                ))}
              </div>
              <div className="button-container">
                <button
                  className="delete"
                  type="button"
                  onClick={() => removeWilder(wilder._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
