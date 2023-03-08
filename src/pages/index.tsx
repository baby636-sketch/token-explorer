import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { ImageI, Wallet } from 'mainnet-js'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [wallet, setWallet] = useState<Wallet>();
  const [image, setImage] = useState<ImageI>();
  useEffect(() => {
    const createWallet = async () => {
      const wallet = await Wallet.newRandom();
      setWallet(wallet);
      setImage(wallet.getDepositQr());
    }

    createWallet();
  }, [])
  return (
    <>
      <Head>
        <title>Token Explorer</title>
        <meta name="description" content="Token explorer for CashTokens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          {image && <Image
            src={image.src}
            alt={image.alt}
            title={image.title}
            className={styles.vercelLogo}
            width={256}
            height={256}
            priority
          />}
        </div>
        {wallet && <div className={styles.center}>
          <div className={styles.description}>
            <p>
              Wallet address: &nbsp;
              <code>{wallet?.cashaddr}</code>
            </p>
          </div>
        </div>}
      </main>
    </>
  )
}
