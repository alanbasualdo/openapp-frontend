import { useEffect, useState } from "react";
import { ManageUsers } from "../components/users/ManageUsers";
import { UserList } from "../components/users/UserList";
import { useUserStore } from "../hooks/useUserStore";

export const UsersPage = () => {
  const [createUserClick, setCreateUserClick] = useState(false);
  const [searchUser, setSetSearchUser] = useState(false);
  const { startGetUsers } = useUserStore();

  useEffect(() => {
    startGetUsers();
  }, []);

  return (
    <div>
      <ManageUsers
        createUserClick={createUserClick}
        setCreateUserClick={setCreateUserClick}
      />
      <hr className="text-dark" />
      <UserList />
    </div>
  );
};
