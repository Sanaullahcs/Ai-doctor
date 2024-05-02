import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatBoot from "../screens/ChatBoot/ChatBoot";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import DrawerView from "../components/DrawerView/DrawerView";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Correct import
import NewChatButton from "../components/NewChatButton/NewChatButton";
import { blackColor, mainBlackColor } from "../style";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerTintColor: "white" }}
      drawerContent={(props) => <DrawerView {...props} />}
    >
      <Drawer.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: blackColor }, // Add this line
          headerRight: () => (
            // Add this block
            <NewChatButton />
          ),
        }}
        name="Chronos"
        component={ChatBoot}
      />
    </Drawer.Navigator>
  );
};

export function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppDrawerStack" component={DrawerNavigation} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      {1 ? <MainStack /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
