import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import axios from 'axios';

export const Register = () => {
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');

   const Register = async e => {
      e.preventDefault();
      try {
         await axios.post('http://localhost:4000/register', {
            name, email, password, confirm_password: confirmPassword
         });
         navigate('/login')
      } catch (error) {
         setError(error.response.data.message);
      }
   }

   return (
      <div className="relative py-16 before:absolute before:inset-0 before:w-full before:h-[50%] before:bg-gray-200">
         <div className="relative container m-auto px-6 text-gray-500 md:px-8">
            <div className="m-auto space-y-8 md:w-1/3 lg:">
               <div className="flex items-center">
                  <Logo className="w-36 ml-4" alt="tailus logo" />
                  <div className="font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-300">Mas Adib</div>
               </div>
               <div className="rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">
                  <div className="p-6 sm:p-8">
                     <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Register to your account</h2>
                     <form onSubmit={Register} className="space-y-4">
                        <div className="">{error}</div>
                        <div className="space-y-2">
                           <label htmlFor="name" className="text-gray-700">Name</label>
                           <input type="text" name="name" id="name"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400"
                           />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="email" className="text-gray-700">Email</label>
                           <input type="email" name="email" id="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400"
                           />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="password" className="text-gray-700">Password</label>
                           <input type="password" name="password" id="password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400"
                           />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="confirm_password" className="text-gray-700">Password</label>
                           <input type="password" name="confirm_password" id="confirm_password"
                              value={confirmPassword}
                              onChange={e => setConfirmPassword(e.target.value)}
                              className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400"
                           />
                        </div>
                        <button type="submit"
                           className="w-full py-3 px-6 rounded-md bg-sky-600
                                    focus:bg-sky-700 active:bg-sky-500">
                           <span className="text-white">Continue</span>
                        </button>

                        <p className="border-t pt-6 text-sm">
                           Don't have an account ?
                           <NavLink to="/login" className="text-sky-500">Login</NavLink>
                        </p>
                     </form>
                  </div>
               </div>
               <div className="text-center space-x-4">
                  <span>&copy; tailus</span>
                  <a href="#" className="text-sm hover:text-sky-900">Contact</a>
                  <a href="#" className="text-sm hover:text-sky-900">Privacy & Terms</a>
               </div>
            </div>
         </div>
      </div>

   );
}