/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import Layout from '../components/Layout';
import { loadUsers } from '../store/users';

const Home = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const response = await dispatch(loadUsers());
    setUsers(response.payload);
  }, []);

  return (
    <Layout title="List of Users">
      <ul>
        {users.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id}>
            <a>
              <li>
                {user.name} {user.lastName}
              </li>
            </a>
          </Link>
        ))}
      </ul>
      <div>
        <Link href="/new-user">
          <a className="new-user">
            New User!
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          a {
            color: black;
            text-decoration: none;
            font-size: 18px;
            font-weight: 500;
          }
          li {
            list-style: none;
            background: #e7e0e0;
            margin: 5px 0;
            border-radius: 7px;
            padding: 5px;
          }
          li:hover {
            background: grey;
            color: white;
          }
          div {
            min-width: 100%;
            max-width: 100%;
            background: grey;
            border-radius: 7px;
            margin: 5px 0;
            display: flex;
            justify-content: center;
          }
          div:hover {
            background: #e7e0e0;
            
          }
          .new-user {
            padding: 5px;
            color: white;
            width: 100%;
            text-align: center;
            border-radius: 7px;
          }
          .new-user:hover {
            color: black;
          }
          .new-user:focus {
            background: #0172b5ab;
          }
        `}
      </style>
    </Layout>
  );
};

export default Home;
