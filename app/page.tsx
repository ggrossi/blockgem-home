'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // import useRouter
import Image from 'next/image';
import axios from 'axios';


const Hero = () => {

  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
  const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

  const [email, setEmail] = useState('');
  const router = useRouter(); // initialize useRouter

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = JSON.stringify({
      email: email
    });
    console.log('Request body:', body);

    const res = await axios.post(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      email: email,
      reactivate_existing: false,
      send_welcome_email: false,
      // Add other parameters as required
    }, {
      headers: {
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    
    const result = await res.json();
    console.log('Response:', result);

    // handle success and error responses here
    if (res.ok) {
      router.push('/special-offer'); // redirect to /special-offer if successful
    } else {
      alert('Subscription failed. Please try again.'); // show alert message if failed
    }
  };

  return (
    <section className="bg-darken">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <span className="flex justify-center text-8xl font-extrabold text-lighten sm:text-center sm:text-8xl pt-16 my-8">
            <Image src="/Logo.svg" alt="Gem Box" width={150} height={150} />
          </span>
          <h1 className="text-4xl font-extrabold text-lighten sm:text-center sm:text-6xl">
            Discover The Next Gem!
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Every week our members receive a detailed insight about rapidly
            growing Web3 projects before they explode.
          </p>
          <div className="mt-6 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            <div className="sm:col-start-2 relative">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-4 pr-32 text-sm leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 font-bold text-lighten bg-pink-500 rounded-lg hover:bg-pink-700 focus:outline-none focus:shadow-outline"
                >
                  GET STARTED!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
