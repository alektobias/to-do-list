import type { NextPage } from "next";
import TodoList from "../components/ToDoList";
import styles from "../styles/home-page.module.scss";

const Home: NextPage = () => {
  return (
    <main className={styles.HomePage}>
      <TodoList />
    </main>
  );
};

export default Home;
