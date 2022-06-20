import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import axios from 'axios';

export const Login = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const Auth = async e => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:4000/login', {
            email, password
         });
         navigate('/table');
      } catch (err) {
         if (err.response) {
            setError(err.response.data.message);
         }
      }
   }

   return (
      <div class="relative py-16 before:absolute before:inset-0 before:w-full before:h-[50%] before:bg-gray-200">
         <div class="relative container m-auto px-6 text-gray-500 md:px-8">
            <div class="m-auto space-y-8 md:w-1/3 lg:">
               <div className="flex items-center">
                     <Logo className="w-36 ml-4" alt="tailus logo" />
                     <div className="font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-300">Mas Adib</div>
                  </div>
                  <div class="rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">
                     <div class="p-6 sm:p-8">
                        <h2 class="mb-8 text-2xl text-cyan-900 font-bold">Sign in to your account</h2>
                        <div className="text-center">{error}</div>
                        <form onSubmit={Auth} class="space-y-8">
                           <div class="space-y-2">
                              <label htmlFor="email" class="text-gray-700">Email</label>
                              <input type="email" name="email" id="email"
                                 value={email}
                                 onChange={e => setEmail(e.target.value)}
                                 class="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400"
                               />
                           </div>
                           <div>
                              <div class="flex items-center justify-between">
                                 <label htmlFor="password" class="text-gray-700">Password</label>
                                 <button class="p-2 -mr-2" type="reset">
                                    <span class="text-sm text-sky-500">Forgot your password ?</span>
                                 </button>
                              </div>
                              <input type="password" name="password" id="password"
                                 value={password}
                                 onChange={e => setPassword(e.target.value)}
                                 class="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                        focus:ring-2 focus:ring-sky-300 focus:outline-none
                                        invalid:ring-2 invalid:ring-red-400"
                              />
                           </div>

                           <button type="submit"
                              class="w-full py-3 px-6 rounded-md bg-sky-600
                                    focus:bg-sky-700 active:bg-sky-500">
                              <span class="text-white">Continue</span>
                           </button>

                           <p class="border-t pt-6 text-sm">
                              Don't have an account ?
                              <Link to="/register" class="text-sky-500">Sign up</Link>
                           </p>
                        </form>
                     </div>
                  </div>
                  <div class="text-center space-x-4">
                     <span>&copy; tailus</span>
                     <a href="#" class="text-sm hover:text-sky-900">Contact</a>
                     <a href="#" class="text-sm hover:text-sky-900">Privacy & Terms</a>
                  </div>
            </div>
         </div>
      </div>

   );
}