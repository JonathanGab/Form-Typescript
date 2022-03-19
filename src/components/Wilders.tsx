import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Skills from './Skills';
import '../styles/wilders.css';
import Loader from '../utils/Loader';
import { toast } from 'react-toastify';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

interface IWilder {
  _id: string;
  name: string;
  city: string;
  profilePicture: string;
  skills: { _id: string; title: string; votes: number }[];
}

export default function Wilders(): JSX.Element {
  const [wilders, setWilders] = useState<IWilder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const successToast = () => {
    toast.success('Votre wilder a bel et bien été supprimé !');
  };

  const errorToast = () => {
    toast.error(
      'Une erreur est survenue lors de la suppression de votre wilder.'
    );
  };

  const removeWilder = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/api/wilders/${id}`);
      setWilders((name) => name.filter((n) => n._id !== id));
      successToast();
    } catch (err) {
      console.log(err);
      errorToast();
    }
  };

  const returnOnTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  async function getWilders(): Promise<void> {
    setLoading(true);
    try {
      const displayWilders = await axios.get(
        'http://localhost:5000/api/wilders'
      );
      setWilders(displayWilders.data.result);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getWilders();
  }, []);

  return (
    <div className="wilder-component-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="cards-container">
          <button type="button" onClick={returnOnTop} className="tothetop">
            <ArrowCircleUpIcon fontSize="large" />
          </button>

          {wilders.map((wilder) => (
            <Link key={wilder._id} to={`/wilder/${wilder._id}`}>
              <div className="cards">
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
                    onClick={(e) => removeWilder(e, wilder._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
