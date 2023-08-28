'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // import useRouter
import Image from 'next/image';

const Hero = () => {
  const [email, setEmail] = useState('');
  const router = useRouter(); // initialize useRouter

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = JSON.stringify({
      email: email
    });
    console.log('Request body:', body);
    
    // Adjust the fetch URL to match the correct path of your API route
    const res = await fetch('/api/subscribe/', {
      body: body,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
  
    if (res.ok) {
      const result = await res.json();
      console.log('Response:', result);
      router.push('https://www.blockgem.co/c/thank-you'); // redirect to /special-offer if successful
    } else {
      console.error('Error:', await res.text()); // Log the error response for debugging
      alert('Subscription failed. Please try again.'); // show alert message if failed
    }
  };

  return (
      <section className="bg-neutral-950">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center space-y-6 sm:space-y-8">
            <span className="flex justify-center text-8xl font-extrabold text-lighten sm:text-center sm:text-8xl pt-16 my-8">
              <Image src="/Logo.svg" alt="Gem Box" width={125} height={125} />
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 sm:text-center w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto">
              Wish someone told you about MKR when it was $500 instead of $1,000?​
            </h2>
            <p className="max-w-2xl m-auto text-xl text-gray-200 sm:text-center sm:text-2xl">
              Every week our members receive detailed insights about <span className="font-bold">rapidly growing crypto projects</span> before they explode.
            </p>
            <div className="sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
              <div className="sm:col-start-2 relative">
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-4 pr-32 text-sm leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 font-bold text-lighten bg-pink-500 rounded-lg hover:bg-pink-700 focus:outline-none focus:shadow-outline"
                  >
                    SHOW ME HOW!
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
