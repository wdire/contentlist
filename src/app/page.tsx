import SectionContainer from "@/components/common/SectionContainer";
import ListItems from "@/components/home/listItems";

export default function Home() {
  return (
    <>
      <SectionContainer className="pt-page-top-space">
        <h1 className="text-xl sm:text-3xl font-bold flex items-center">
          <span className="anim-vertical-words">
            <ul>
              <li>
                <div>Create</div>
              </li>
              <li>
                <div>Edit</div>
              </li>
              <li>
                <div>Save</div>
              </li>
              <li>
                <div>Create</div>
              </li>
            </ul>
          </span>
          Ranks of Anything
        </h1>

        <div className="mt-4 text-sm text-default-500">
          <p>
            Create best to worst rankings easily. Add contents to your list by easily searching and
            drag into group with similar ranked contents.{" "}
          </p>
          <p className="pt-1">Currently only supported content source is TMDB(movie, tv, anime).</p>
        </div>
      </SectionContainer>

      <ListItems />
    </>
  );
}
