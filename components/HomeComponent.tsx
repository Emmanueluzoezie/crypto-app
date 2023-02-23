import React, { useState } from 'react'
import { CryptoHomeComponent } from './crypto/CryptHomeComponent';
import { NewsHomeComponent } from './news/NewsHomeComponent';

export const HomeComponent = () => {

  return (
    <div className=''>
        <div>
              <h1 className='pt-10 pb-3 font-semibold text-xl md:text-2xl  text-center capitalize font-serif'>crypto Currencies</h1>
                <CryptoHomeComponent />
        </div>
          <div>
              <h1 className='pt-3 font-semibold text-xl md:text-2xl text-center capitalize font-serif'>crypto News</h1>\
              <NewsHomeComponent />
          </div>
    </div>
  )
}
