import React from 'react';

import '../index.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import api from '../utils/api';
import * as auth from "../utils/auth";

import regSuccess from '../images/regSuccess.jpg';
import regFailure from '../images/regFailure.jpg';

import { IsLoggedInContext } from '../contexts/IsLoggedInContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { UserDataContext } from '../contexts/UserDataContext';
import { SelectedCardContext } from '../contexts/SelectedCardContext';

import Loading from './Loading';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';

import Header from './Header';
import Main from './Main';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import Footer from './Footer';

import { checkIfCardIsLiked } from '../utils/constants';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: '', password: '' })

  const [isAuthorizing, setIsAuthorizing] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const [currentPath, setCurrentPath] = React.useState('');

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [tooltipContent, setTooltipContent] = React.useState({ title: '', src: '' });

  const [selectedCard, setSelectedCard] = React.useState({ title: '', name: '', link: '' });

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });

  const [cards, setCards] = React.useState([]);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen;

  React.useEffect(() => {

    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  React.useEffect(() => {

    tokenCheck();
  }, [])

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

  const login = React.useCallback(async function ({ password, email }) {

    try {

      setLoading(true);

      const data = await auth.authorize(password, email);

      if (!data) {
        throw new Error('Ошибка аутентификации');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
      }

    } catch (err) {
      setIsInfoTooltipOpen(true);

      setTooltipContent({
        title: 'Что-то пошло не так! Попробуйте ещё раз.',
        src: regFailure
      });
    }
    finally {
      setLoading(false);
    }

  }, [])

  const register = React.useCallback(async function ({ password, email }) {

    try {

      setLoading(true);

      const data = await auth.register(password, email);

      if (!data) {
        throw new Error('Ошибка аутентификации');
      }

      setTooltipContent({
        title: 'Вы успешно зарегистрировались!',
        src: regSuccess
      });

    } catch (err) {

      setTooltipContent({
        title: 'Что-то пошло не так! Попробуйте ещё раз.',
        src: regFailure
      });

    }
    finally {
      setLoading(false);
      setIsInfoTooltipOpen(true);
    }

  }, [])

  const tokenCheck = React.useCallback(async function () {

    try {

      setLoading(true);


      const token = localStorage.getItem('token');

      const response = token ? await auth.checkToken(token) : null;

      const data = response?.data;

      if (data) {

        setIsLoggedIn(true);
        setUserData(data);
      }

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
      setIsAuthorizing(false);
    }
  }, [])

  const logout = React.useCallback(function () {

    setIsLoggedIn(false);
    setUserData({ email: '', password: '' });
    localStorage.removeItem('token');
  }, [])

  const handleEditAvatarClick = React.useCallback(function () {

    setIsEditAvatarPopupOpen(true);
  }, [])

  const handleEditProfileClick = React.useCallback(function () {

    setIsEditProfilePopupOpen(true)
  }, [])

  const handleAddPlaceClick = React.useCallback(function () {

    setIsAddPlacePopupOpen(true);
  }, [])

  const handleCardClick = React.useCallback(async function (card) {

    await new Promise(resolve => resolve(setSelectedCard(card)));

    setIsImagePopupOpen(true);

  }, [])

  const handleDeleteClick = React.useCallback(async function (card) {

    await new Promise(resolve => resolve(setSelectedCard(card)));

    setIsConfirmationPopupOpen(true);

  }, [])

  const handleCardLike = React.useCallback(function (card) {

    ((checkIfCardIsLiked(card, currentUser) === true) ? api.deleteLike(card._id) : api.likeCard(card._id))
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser])

  const closeAllPopups = React.useCallback(function () {

    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsImagePopupOpen(false);

    setSelectedCard({ title: '', name: '', link: '' });
  }, [])

  const handleUpdateUser = React.useCallback(async function ({ name, about }) {

    try {

      setLoading(true);

      const newUserInfo = await api.editUserInfo(name, about);

      setCurrentUser(newUserInfo);

      closeAllPopups();

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  }, [closeAllPopups])

  const handleUpdateAvatar = React.useCallback(async function ({ avatar }) {

    try {

      setLoading(true);

      const newUserInfo = await api.updateAvatar(avatar);

      setCurrentUser(newUserInfo);

      closeAllPopups();

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }

  }, [closeAllPopups])

  const handleAddPlaceSubmit = React.useCallback(async function ({ name, link }) {

    try {

      setLoading(true);

      const newCard = await api.postNewCard({ name, link });

      setCards([newCard, ...cards]);

      closeAllPopups();

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }

  }, [cards, closeAllPopups])

  const handleDeleteConfirmation = React.useCallback(function (card) {

    setLoading(true);

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
        setLoading(false);
      });
  }, [closeAllPopups])

  if (isAuthorizing) {
    return (
      <Loading />
    )
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <SelectedCardContext.Provider value={selectedCard}>

        <IsLoggedInContext.Provider value={isLoggedIn}>

          <UserDataContext.Provider value={userData}>

            <div className="page">

              <div className="page__container">

                <Header onLogout={logout} navPath={currentPath} />

                <Routes>

                  <Route path="/react-mesto-auth" element={<Navigate to="/" replace />} />

                  <Route path="/"
                    element={
                      <ProtectedRoute
                        element={Main}
                        onRender={setCurrentPath}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onDeleteClick={handleDeleteClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        cards={cards}
                      />
                    }
                  />

                  <Route path="/sign-in" element={
                    <Login setUserData={setUserData} onRender={setCurrentPath} onLogin={login} buttonText={loading ? 'Вход...' : 'Вход'} />
                  } />

                  <Route path="/sign-up" element={
                    <Register onRender={setCurrentPath} onRegister={register} buttonText={loading ? 'Регистрация...' : 'Зарегистрироваться'} />
                  } />

                </Routes>

                <Footer />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  buttonText={loading ? 'Сохранение...' : 'Сохранить'}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  buttonText={loading ? 'Сохранение...' : 'Сохранить'}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                  buttonText={loading ? 'Создание...' : 'Создать'}
                />

                <ConfirmationPopup
                  isOpen={isConfirmationPopupOpen}
                  onClose={closeAllPopups}
                  onDeleteConfirmation={handleDeleteConfirmation}
                  buttonText={loading ? 'Удаление...' : 'Да'}
                />

                <ImagePopup
                  isOpen={isImagePopupOpen}
                  onClose={closeAllPopups}
                  card={selectedCard}
                />

                <InfoTooltip isOpen={isInfoTooltipOpen} tooltipContent={tooltipContent} onOpen={setIsInfoTooltipOpen} onClose={setTooltipContent} />

              </div>

            </div>

          </UserDataContext.Provider>

        </IsLoggedInContext.Provider>

      </SelectedCardContext.Provider>

    </CurrentUserContext.Provider >
  );
}

export default App;
