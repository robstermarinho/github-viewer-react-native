import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({host: '10.0.0.104', port: 9090})

    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
