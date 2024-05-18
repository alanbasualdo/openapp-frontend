import { useEffect, useState } from "react";
import { ManageUsers } from "../../components/users/ManageUsers";
import { UserList } from "../../components/users/UserList";
import { useUserStore } from "../../hooks/Users/useUserStore";
import { UserView } from "../../components/users/UserView";

export const UsersPage = () => {
  const [createUser, setCreateUser] = useState(false);
  const { startGetUsers } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    startGetUsers();
  }, []);

  const handleCreateOrClose = () => {
    if (createUser || selectedUser) {
      setCreateUser(false);
      setSelectedUser(null);
    } else {
      setCreateUser(true);
    }
  };

  return (
    <div className="rounded-lg p-3 text-center text-white bg-gray">
      <div className="text-end px-3">
        <button
          onClick={handleCreateOrClose}
          className={`${createUser || selectedUser ? "" : ""}`}
        >
          {createUser || selectedUser ? (
            <i className="ri-close-circle-line text-3xl text-danger"></i>
          ) : (
            <i className="ri-user-add-fill text-success text-3xl"></i>
          )}
        </button>
      </div>
      <hr className="text-white mt-2 mb-3" />
      {(createUser || selectedUser) && (
        <>
          <ManageUsers
            setCreateUser={setCreateUser}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <hr className="text-white my-3" />
        </>
      )}
      <UserList setSelectedUser={setSelectedUser} />
      {/* Puedes descomentar UserView si deseas mostrarlo al seleccionar un usuario
      {selectedUser && (
        <UserView
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )} */}
    </div>
  );
};
