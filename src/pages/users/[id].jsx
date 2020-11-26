import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import useInputValue from '../../hooks/useInputValue';
import { loadUserById, modifyUser } from '../../store/users';

const modifyUserView = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUserState] = useState({ name: '', lastName: '' });

  useEffect(async () => {
    const response = await dispatch(loadUserById(id));
    setUserState(response.payload);
  }, []);

  const name = useInputValue(user.name);
  const lastName = useInputValue(user.lastName);

  const handleOnClick = () => {
    dispatch(modifyUser(id, { name: name.value, lastName: lastName.value }));
    router.push('/');
  };

  return (
    <Layout title="Modify an user">
      <Input name="name" placeholder="Name" {...name} />
      <Input name="lastname" placeholder="Last Name" {...lastName} />
      <Button onClick={handleOnClick}>Submit</Button>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  return {
    props: { id },
  };
}

export default modifyUserView;
