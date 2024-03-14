import ListItemPage from "@/components/listItemPage";
import {getListById} from "@/services/fetch/listFetch";
import {RedirectType, redirect} from "next/navigation";

/*
export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
  const list = await getListById(params.id);

  const metadata: Metadata = {
    title: list?.name,
  };

  if (list?.cloudinaryImage?.publicId && list.cloudinaryImage.version) {
    const image = `https://res.cloudinary.com/dgib2iezn/image/upload/v${list.cloudinaryImage.version}/${list.cloudinaryImage.publicId}`;

    metadata.twitter = {
      card: "summary_large_image",
      images: [image],
    };

    metadata.openGraph = {
      images: {
        url: image,
      },
    };
  }

  return metadata;
}
*/

const ListPage = async ({params}: {params: {id: string}}) => {
  if (!params.id) {
    return redirect("/", RedirectType.replace);
  }

  const list = await getListById(params.id);

  if (list === null) {
    redirect("/404", RedirectType.replace);
  }

  return (
    <>
      <ListItemPage list={list} />
    </>
  );
};

export default ListPage;
