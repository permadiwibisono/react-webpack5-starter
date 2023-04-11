import "../styles/index.scss";
import Counter from "./Counter";
import Hero from "./hero";
import reactIcon from "../assets/react-icon.png";
import reactSvgIcon from "../assets/react-icon.svg";
import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <Hero />
      <main>
        <section>
          <h1 className={styles.title}>Oh Hai, React!</h1>
        </section>
        <img src={reactIcon} alt="React Icon" width="250" />
        <img src={reactSvgIcon} alt="React Icon" width="250" />
        <Counter />
        <div>
          <ul>
            <li>Todo 1</li>
            <li>Todo 2</li>
            <li>Todo 3</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default App;
