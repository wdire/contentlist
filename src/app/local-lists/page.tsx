import LocalLists from "@/components/itemLists/LocalLists";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Local Lists",
};

const LocalListsPage = () => {
  return <LocalLists />;
};

export default LocalListsPage;
