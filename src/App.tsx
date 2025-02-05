// libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchProducts } from './store/productSlice';
import { AuthProvider } from './context/AuthContext';
// components
import Header from './components/Header';
import Slider from './components/Slider';
import Blocks from './components/Blocks';
import ProtectedRoute from './components/ProtectedRoute';
// styles
import './App.css';

const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Modal = lazy(() => import('./components/Modal'));
const CardInfo = lazy(() => import('./components/CardInfo'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <div className="content">
            <Modal isOpen={isModalOpen} onClose={closeModal} />
            <Header openModal={openModal} />
            <Suspense fallback={<div>Загрузка страницы...</div>}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Slider />
                      <Blocks title="Топ-выгода" products={products} />
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute component={ProfilePage} />}
                />
                <Route
                  path="/orders"
                  element={<ProtectedRoute component={OrdersPage} />}
                />
                <Route
                  path="/favorites"
                  element={<ProtectedRoute component={FavoritesPage} />}
                />
                <Route
                  path="/cart"
                  element={<ProtectedRoute component={CartPage} />}
                />
								<Route path="/product/:id" element={<CardInfo />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
