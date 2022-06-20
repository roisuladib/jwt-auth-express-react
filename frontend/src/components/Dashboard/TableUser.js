import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const TableUser = () => {
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [token, setToken] = useState('');
   const [expired, setExpired] = useState('');
   const [users, setUsers] = useState([]);
   useEffect(() => {
      refreshToken();
      getUsers();
   }, []);

   const refreshToken = async () => {
      try {
         const res = await axios.get('http://localhost:4000/token');
         const accessToken = res.data.accessToken;
         setToken(accessToken);
         const decoded = jwtDecode(accessToken);
         setName(decoded.name);
         setExpired(decoded.exp);
      } catch (err) {
         if (err.response) {
            navigate('/login');
            console.log(err.response.data);
         }
      }
   }

   const instance = axios.create();
   instance.interceptors.request.use(async config => {
      const currentDate = new Date();
      if (expired * 1000 < currentDate.getTime()) {
         const res = await axios.get('http://localhost:4000/token');
         const accessToken = res.data.accessToken;
         config.headers.Authorization = `Bearer ${accessToken}`;
         setToken(accessToken);
         const decoded = jwtDecode(accessToken);
         setName(decoded.name);
         setExpired(decoded.exp);
      }
      return config;
   }, err => {
      return Promise.reject(err);
   });

   const getUsers = async () => {
      const res = await instance.get('http://localhost:4000/users', {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      setUsers(res.data.data);
   }

   const logout = async () => {
      try {
         await axios.delete('http://localhost:4000/logout');
         navigate('/login');
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <>
         <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
         <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
         <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
               <div className="">{name}</div>
               <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                     <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                           <button onClick={getUsers} className="font-semibold text-base rounded-xl py-2 px-7 bg-pink-500 text-white">Get Users</button>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                           <button onClick={logout} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Log out</button>
                        </div>
                     </div>
                  </div>

                  <div className="block w-full overflow-x-auto">
                     <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                           <tr>
                              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                 No
                              </th>
                              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                 Name
                              </th>
                              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                 Email
                              </th>
                              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                 Gender
                              </th>
                           </tr>
                        </thead>

                        <tbody>
                           {
                              users?.map((user, index) => (
                                 <tr key={index + user.id}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                       {index + 1}
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                       {user.name}
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                       {user.email}
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                       {user.gender}
                                    </td>
                                 </tr>
                              ))
                           }
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
            <footer className="relative pt-8 pb-6 mt-16">
               <div className="container mx-auto px-4">
                  <div className="flex flex-wrap items-center md:justify-between justify-center">
                     <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                           Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                        </div>
                     </div>
                  </div>
               </div>
            </footer>
         </section>
      </>
   )
}