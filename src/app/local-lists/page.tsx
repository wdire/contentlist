import {Metadata} from "next";
import LocalLists from "./components/LocalLists";

export const metadata: Metadata = {
  title: "Local Lists",
};

const LocalListsPage = () => {
  return <LocalLists />;
};

export default LocalListsPage;
