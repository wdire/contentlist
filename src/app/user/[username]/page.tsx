import UserPage from "@/components/userPage";
import {getListsByUserId} from "@/services/fetch/listFetch";
import {getUserByUsername} from "@/services/fetch/userFetch";
import {RedirectType, redirect} from "next/navigation";

const User = async ({params}: {params: {username: string}}) => {
  const user = await getUserByUsername(params.username);

  if (user === null) {
    redirect("/404", RedirectType.replace);
  }
  const userLists = await getListsByUserId(user.id);

  return <UserPage user={user} userLists={userLists} />;
};

export default User;
