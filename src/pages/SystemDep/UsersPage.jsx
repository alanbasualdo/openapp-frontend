import { useEffect, useState } from "react";
import { ManageUsers } from "../../components/users/ManageUsers";
import { UserList } from "../../components/users/UserList";
import { useUserStore } from "../../hooks/useUserStore";

export const UsersPage = () => {
  const [createUserClick, setCreateUserClick] = useState(false);
  const [searchUser, setSetSearchUser] = useState(false);
  const { startGetUsers } = useUserStore();

  useEffect(() => {
    startGetUsers();
  }, []);

  return (
    <div className="rounded-lg p-4 text-center text-light bg-gray">
      <ManageUsers
        createUserClick={createUserClick}
        setCreateUserClick={setCreateUserClick}
      />
      <hr className="text-light my-3" />
      <UserList />
    </div>
  );
};
