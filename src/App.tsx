import { Button } from "@/components/Button/Button";
import { Title } from "@/components/Typography/Title";
import { Text } from "@/components/Typography/Text";
import { Input } from "@/components/Input/Input";

function App() {
  return (
    <div>
      <Title>This are components</Title>
      <Button variant="large">Say Hello large</Button>
      <Button variant="main">Say Hello main</Button>
      <Button variant="round">Say Hello round</Button>
      <Text Tag="p">Some text in paragraph</Text>
      <Input placeholder="default" />
      <Input withIcon placeholder="with icon" />
    </div>
  );
}

export default App;
