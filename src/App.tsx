import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/layout/Header';
import Collection from './pages/Collection';
import Loading from './components/common/Loading';
import { AuthProvider } from './context/AuthContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Contact = lazy(() => import('./pages/Contact'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/kolekcije/prolece-leto" element={<Collection />} />
              <Route path="/kolekcije/jesen-zima" element={<Collection  />} />
              <Route path="/kolekcije/:category?" element={<Collection />} />
              <Route path="/proizvod/:slug" element={<Product />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <AuthProvider>
                      <Admin />
                  </AuthProvider>
                } 
              />

              {/* Redirects */}
              <Route path="/naslovna" element={<Navigate to="/" replace />} />
              <Route path="/pocetna" element={<Navigate to="/" replace />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
