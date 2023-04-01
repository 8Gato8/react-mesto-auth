import React from 'react';

import '../index.css';

import api from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { SelectedCardContext } from '../contexts/SelectedCardContext';

import Header from './Header';
import Main from './Main';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';

import Footer from './Footer';

import { checkIfCardIsLiked } from '../utils/constants';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({ title: '', name: '', link: '' });

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });

  const [cards, setCards] = React.useState([]);

  const [editProfilePopupSubmitButtonText, setEditProfilePopupSubmitButtonText] = React.useState('Сохранить');
  const [editAvatarPopupSubmitButtonText, setEditAvatarPopupSubmitButtonText] = React.useState('Сохранить');
  const [addPlacePopupSubmitButtonText, setAddPlacePopupSubmitButtonText] = React.useState('Создать');
  const [confirmationPopupSubmitButtonText, setConfirmationPopupSubmitButtonText] = React.useState('Да');

  React.useEffect(() => {

    api.getBackendUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])

  React.useEffect(() => {

    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleEditAvatarClick() {

    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {

    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {

    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {

    new Promise(resolve => resolve(setSelectedCard(card)))
      .then(() => setIsImagePopupOpen(true));

  }

  function handleDeleteClick(card) {

    new Promise(resolve => resolve(setSelectedCard(card)))
      .then(() => setIsConfirmationPopupOpen(true));
  }

  function handleCardLike(card) {

    ((checkIfCardIsLiked(card, currentUser) === true) ? api.deleteLike(card._id) : api.likeCard(card._id))
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {

    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsImagePopupOpen(false);

    setSelectedCard({ title: '', name: '', link: '' });
  }

  function handleUpdateUser({ name, about }) {

    setEditProfilePopupSubmitButtonText('Сохранение...');

    api.editUserInfo(name, about)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditProfilePopupSubmitButtonText('Сохранить')
      });
  }

  function handleUpdateAvatar({ avatar }) {

    setEditAvatarPopupSubmitButtonText('Сохранение...')

    api.updateAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditAvatarPopupSubmitButtonText('Сохранить')
      });
  }

  function handleAddPlaceSubmit({ name, link }) {

    setAddPlacePopupSubmitButtonText('Создание...')

    api.postNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAddPlacePopupSubmitButtonText('Создать')
      });
  }

  function handleDeleteConfirmation(card) {

    setConfirmationPopupSubmitButtonText('Удаление...');

    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id)
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setConfirmationPopupSubmitButtonText('Да')
      });
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <SelectedCardContext.Provider value={selectedCard}>

        <div className="page">

          <div className="page__container">

            <Header />

            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onDeleteClick={handleDeleteClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
            />

            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              buttonText={editProfilePopupSubmitButtonText}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              buttonText={editAvatarPopupSubmitButtonText}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              buttonText={addPlacePopupSubmitButtonText}
            />

            <ConfirmationPopup
              isOpen={isConfirmationPopupOpen}
              onClose={closeAllPopups}
              onDeleteConfirmation={handleDeleteConfirmation}
              buttonText={confirmationPopupSubmitButtonText}
            />

            <ImagePopup
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
            />

          </div>
        </div>

      </SelectedCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
