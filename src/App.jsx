import Compound from "./components/compound"
import HigherOrder from "./components/higher-order"
import LazyLoading from "./components/lazy-loading"
import PresentationalAndContainer from "./components/presentational-and-container"
import RenderProps from "./components/render-props"

function App() {
  return (
    <>
      <h1>React Component Patterns</h1>
      <section>
        <h2>Compound</h2>
        <Compound />
      </section>
      <section id="spacer"></section>
      <section>
        <h2>Presentational and Container</h2>
        <PresentationalAndContainer />
      </section>
      <section id="spacer"></section>
      <section>
        <h2>Higher Order</h2>
        <HigherOrder />
      </section>
      <section id="spacer"></section>
      <section>
        <h2>Props</h2>
        <RenderProps />
      </section>
      <section id="spacer"></section>
      <section>
        <h2>Lazy Loading</h2>
        <LazyLoading />
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
