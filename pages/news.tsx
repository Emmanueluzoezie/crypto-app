import Head from 'next/head'
// import { Inter } from '@next/font/google'
import Footer from '../components/Footer'
import { NewsComponent } from '../components/news/NewsComponent'

// const inter = Inter({ subsets: ['latin'] })

export default function News() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className=''>
                <NewsComponent />
                <Footer />
            </div>
        </>
    )
}
