import SectionContainer from "@/components/common/SectionContainer";
import {HomeDescriptionContent} from "@/components/home/HomeDescriptionContent";
import TopicLists from "@/components/home/TopicLists";
import {getHomeLists} from "@/services/actions/list.actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const homeLists = await getHomeLists();

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
          <HomeDescriptionContent />
        </div>
      </SectionContainer>

      <TopicLists homeLists={homeLists || []} />
    </>
  );
}
