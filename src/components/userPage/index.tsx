"use client";

import {useGetQuery} from "@/services/userApi";
import React from "react";

const UserPage = ({username}: {username: string}) => {
  const {data} = useGetQuery({
    username,
  });

  return (
    <div>
      <pre>{JSON.stringify(data?.data || "", undefined, 1)}</pre>
    </div>
  );
};

export default UserPage;
