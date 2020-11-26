import { addUser, loadUserById, loadUsers, modifyUser } from '../../store/users';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from '../../store/configureStore';
import config from '../../../config';

describe('Users module tests', () => {
  let fakeAxios;
  let store;
  const user = {name: 'a', lastName: 'b'}
  const modifiedUser = {name: 'b', lastName: 'b'}
  const savedUser = { id: 1, ...user }
  const savedModifiedUser = { id: 1, ...modifiedUser }
  const { id: userId } = savedUser;
  const { usersURL } = config;

  const usersState = () => store.getState().list

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios)
    store = configureStore();
  });

  describe('addBug tests', () => {
    test("should add the user to the store if it's saved to the server", async () => {

      fakeAxios.onPost(usersURL).reply(200, savedUser)
      
      await store.dispatch(addUser(savedUser));
      expect(usersState()).toContainEqual(savedUser);
    });
    test("shouldn't add the user to the store if it's not saved to the server", async () => {
      fakeAxios.onPost(usersURL).reply(500);

      await store.dispatch(addUser(savedUser));

      expect(usersState()).toHaveLength(0);
    });
    test("Should modify an user if it's saved to the server", async () => {
      fakeAxios.onGet(`${usersURL}/${userId}`).reply(200, savedUser);
      fakeAxios.onPost(usersURL).reply(200, savedUser);
      fakeAxios.onPatch(`${usersURL}/${userId}`).reply(200, savedModifiedUser);

      await store.dispatch(addUser(savedUser));
      await store.dispatch(loadUserById(userId))
      await store.dispatch(modifyUser(userId, savedModifiedUser));

      expect(usersState()).toEqual(savedModifiedUser);
    });
    test("Should not modify an user if it's not saved to the server", async () => {
      fakeAxios.onGet(`${usersURL}/${userId}`).reply(404);
      fakeAxios.onPost(usersURL).reply(500);
      fakeAxios.onPatch(`${usersURL}/${userId}`).reply(500);

      await store.dispatch(addUser(savedUser));
      await store.dispatch(loadUserById(userId));
      await store.dispatch(modifyUser(userId, savedModifiedUser));

      expect(usersState()).toEqual([]);
    });
    test("Should load the user of the specified id", async () => {
      fakeAxios.onGet(`${usersURL}/${userId}`).reply(200, savedUser);

      await store.dispatch(addUser(savedUser));
      await store.dispatch(loadUserById(userId));

      expect(usersState().id).toBe(userId);
    });
    test("Shouldn't load the user of the specified id if the user doesn't exist", async () => {
      fakeAxios.onGet(`${usersURL}/${userId}`).reply(404);

      await store.dispatch(loadUserById(userId));

      expect(usersState().id).toBe(undefined);
    });
    test("should load the users that are saved in the server", async () => {
      fakeAxios.onGet(`${usersURL}/${userId}`).reply(200, savedUser);
      fakeAxios.onPost(usersURL).replyOnce(200, savedUser);
      fakeAxios.onPost(usersURL).replyOnce(200, savedModifiedUser);

      await store.dispatch(addUser(savedUser));
      await store.dispatch(addUser(savedModifiedUser));
      await store.dispatch(loadUsers());

      expect(usersState()).toEqual([savedUser, savedModifiedUser]);
    });
    test("shouldn't load users if there's not user saved in the server", async () => {
      fakeAxios.onGet(`${usersURL}/${userId}`).reply(200, []);

      await store.dispatch(loadUsers());

      expect(usersState()).toEqual([]);
    });
  });
});
