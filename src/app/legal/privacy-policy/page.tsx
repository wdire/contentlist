import {LEGAL_LINKS} from "@/lib/constants";
import {redirect} from "next/navigation";

const PrivacyPolicy = () => {
  redirect(LEGAL_LINKS.privacy_policy);
};

export default PrivacyPolicy;
