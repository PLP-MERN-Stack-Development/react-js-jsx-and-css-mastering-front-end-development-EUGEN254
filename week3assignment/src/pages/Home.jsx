import Card from "../components/Card";
import Button from "../components/Button";

export default function Home() {
  return (
    <Card title="Welcome">
      <p>This is the home page!</p>
      <Button variant="primary">Click Me</Button>
    </Card>
  );
}
