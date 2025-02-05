import { useAuth } from '../context/AuthContext';
import Button from '../UI/Button';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <h1>Профиль</h1>
      <Button onClick={logout}>Выйти</Button>
    </>
  );
};

export default ProfilePage;
