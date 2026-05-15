import Compound from "./components/compound";
import PresentationalAndContainer from "./components/presentational-and-container";

function App() {
  return (
    <>
      <h1>React Component Patterns</h1>
      <section>
        <h2>Compound</h2>
        <Compound />
      </section>
      <section id='spacer'></section>
      <section>
        <h2>Presentational and Container</h2>
        <PresentationalAndContainer />
      </section>
    </>
  );
}

export default App;
