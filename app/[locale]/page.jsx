import styles from "../page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to the Application</h1>
        <p>Please enter a valid URL to view the data.</p>
      </main>
    </div>
  );
}
