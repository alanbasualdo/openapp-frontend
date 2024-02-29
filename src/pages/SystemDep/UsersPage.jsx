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
    <div
      className="rounded-xl p-3 text-center text-light"
      style={{
        boxShadow: "inset 0px 0px 10px 0px rgba(0, 0, 0, 0.8)",
        backgroundColor: "rgb(43, 47, 51)",
      }}
    >
      <ManageUsers
        createUserClick={createUserClick}
        setCreateUserClick={setCreateUserClick}
      />
      <hr className="text-light my-3" />
      <UserList />
    </div>
  );
};
