import UserPage from "@/components/userPage";
import {getListsByUserId} from "@/services/actions/list.actions";
import {getUserByUsername} from "@/services/actions/user.actions";
import {Metadata} from "next";
import {RedirectType, redirect} from "next/navigation";

export async function generateMetadata({params}: {params: {username: string}}): Promise<Metadata> {
  const user = await getUserByUsername(params.username);

  const metadata: Metadata = {
    title: user?.username,
  };

  if (user?.imageUrl) {
    metadata.twitter = {
      images: [user?.imageUrl],
    };

    metadata.openGraph = {
      images: {
        url: user?.imageUrl,
      },
    };
  }

  return metadata;
}

const User = async ({params}: {params: {username: string}}) => {
  const user = await getUserByUsername(params.username);

  if (user === null) {
    redirect("/404", RedirectType.replace);
  }
  const userLists = await getListsByUserId(user.id);

  return <UserPage user={user} userLists={userLists} />;
};

export default User;
