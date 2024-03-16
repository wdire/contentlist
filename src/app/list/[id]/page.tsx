import ListItemPage from "@/components/listItemPage";
import {getListById} from "@/services/actions/list.actions";
import {Metadata} from "next";
import {RedirectType, redirect} from "next/navigation";

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

const ListPage = async ({
  params,
  searchParams,
}: {
  params: {id: string};
  searchParams: {local?: string};
}) => {
  if (!params.id) {
    return redirect("/", RedirectType.replace);
  }

  if (Number.isNaN(Number(params.id))) {
    return redirect("/404", RedirectType.replace);
  }

  const isLocal = searchParams?.local ? searchParams?.local === "true" : false;

  const list = searchParams?.local ? null : await getListById(params.id);

  if (!isLocal && list === null) {
    redirect("/404", RedirectType.replace);
  }

  return (
    <>
      <ListItemPage list={list} localId={isLocal ? params.id : undefined} />
    </>
  );
};

export default ListPage;
