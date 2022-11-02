import { User } from "../context/Auth/authSlice";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
interface RootNavigatorProps {
  userSession: User | null;
}
const RootNavigator = ({ userSession }: RootNavigatorProps) => {
  // console.log("root navigator=>", userSession);
  return (
    <>
      {userSession ? (
        <AppNavigator></AppNavigator>
      ) : (
        <AuthNavigator></AuthNavigator>
      )}
    </>
  );
};

export default RootNavigator;
