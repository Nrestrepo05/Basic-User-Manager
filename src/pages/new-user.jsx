import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
// import UserForm from '../components/UserForm';
import useInputValue from '../hooks/useInputValue';
import { addUser } from '../store/users';

const newUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const name = useInputValue('');
  const lastName = useInputValue('');

  const handleOnClick = () => {
    dispatch(addUser({ name: name.value, lastName: lastName.value }));
    router.push('/');
  };

  return (
    <Layout title="New User">
      <Input name="name" placeholder="Name" {...name} />
      <Input name="lastname" placeholder="Last Name" {...lastName} />
      <Button onClick={handleOnClick}>Submit</Button>
    </Layout>
  );
};

export default newUser;
