import React, {useState} from "react";
import {Text, View, Button, StyleSheet} from "react-native";


type GreetingProps = {
  name: string;
}

const Greeting = (props: GreetingProps) => {
  return (
    <View>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeria" />
    </View>
  );
};

const HelloWorldApp = () => {
  return (
    <View>
      <Text>Hello, world!</Text>
    </View>
  );
};

const App = () => {

  const [count, setCount] = useState(0);

  return (
    <View style={style.container}>
      <LotsOfGreetings/>
      <HelloWorldApp/>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me!"
      />
    </View>
  );
};

// React Native Styles
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;