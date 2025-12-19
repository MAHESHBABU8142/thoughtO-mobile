import AsyncStorage from "@react-native-async-storage/async-storage";

/*Get item from storage*/
async function getItem(key) {
  let item = await AsyncStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

async function setItem(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export { getItem, setItem };
