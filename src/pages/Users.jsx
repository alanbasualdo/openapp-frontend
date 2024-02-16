import { useState } from "react";
import { ManageUsers } from "../components/users/ManageUsers";
import { UserList } from "../components/users/UserList";

export const Users = () => {
  const [createUserClick, setCreateUserClick] = useState(false);
  const [searchUser, setSetSearchUser] = useState(false);

  return (
    <div
      className="bg-white rounded-lg p-3 mt-2 text-center"
      style={{ boxShadow: "0px 0px 5px 0px rgba(255, 255, 255, 0.4)" }}
    >
      <ManageUsers
        createUserClick={createUserClick}
        setCreateUserClick={setCreateUserClick}
      />
      <hr className="text-dark mb-3" />
      <UserList />
    </div>
  );
};
