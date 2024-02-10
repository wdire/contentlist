import ListItemPage from "@/components/listItemPage";
import {RedirectType, redirect} from "next/navigation";

const ListPage = async ({params}: {params: {id: string}}) => {
  if (!params.id) {
    return redirect("/", RedirectType.replace);
  }

  return <ListItemPage id={params.id} />;
};

export default ListPage;
