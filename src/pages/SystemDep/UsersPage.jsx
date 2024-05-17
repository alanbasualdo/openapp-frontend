import { useEffect, useState } from "react";
import { ManageUsers } from "../../components/users/ManageUsers";
import { UserList } from "../../components/users/UserList";
import { useUserStore } from "../../hooks/Users/useUserStore";
import { UserView } from "../../components/users/UserView";

export const UsersPage = () => {
  const [createUserClick, setCreateUserClick] = useState(false);
  const { startGetUsers } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    startGetUsers();
  }, []);

  return (
    <div className="rounded-lg p-4 text-center text-white bg-gray">
      <ManageUsers
        createUserClick={createUserClick}
        setCreateUserClick={setCreateUserClick}
      />
      <hr className="text-white my-3" />
      <UserList setSelectedUser={setSelectedUser} />
      {selectedUser && (
        <UserView
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </div>
  );
};
