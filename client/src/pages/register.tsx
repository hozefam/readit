import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Register Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Register</h1>
      </main>
    </div>
  );
}
