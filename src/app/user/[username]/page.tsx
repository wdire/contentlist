import UserPage from "@/components/userPage";

const User = ({params}: {params: {username: string}}) => {
  return <UserPage username={params.username} />;
};

export default User;
