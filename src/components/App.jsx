import "../styles/index.scss";
import Counter from "./Counter";

const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>Oh Hai, React!</h1>
        </section>
      </main>
      <Counter/>
    </>
  )
}

export default App;