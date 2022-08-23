import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Profile() {
  const { setTitle, setShowHeader, setSearch } = useContext(MyContext);
  useEffect(() => {
    setShowHeader(true);
    setTitle('Profile');
    setSearch(false);
  }, []);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
export default Profile;