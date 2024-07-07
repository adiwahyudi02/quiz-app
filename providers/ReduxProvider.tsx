import store from "@/store";
import { Provider } from "react-redux";

interface IReduxProvider {
  children: React.ReactNode;
}

export const ReduxProvider = ({ children }: IReduxProvider) => (
  <Provider store={store}>{children}</Provider>
);
