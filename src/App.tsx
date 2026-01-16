import Button from "./components/Button";
import Container from "./components/Container";

function App() {
  return (
    <main>
      <p>
        <Button>A Button</Button>
      </p>
      <p>
        <Button href="https://google.com">A Link</Button>
      </p>
      <Container asElement={Button}>Hi</Container>
    </main>
  );
}

export default App;
