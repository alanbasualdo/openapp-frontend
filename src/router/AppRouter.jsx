import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "../components/bars/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LoginPage } from "../pages/LoginPage";
import { LeftSidebar } from "../components/bars/LeftSidebar";
import { RightSidebar } from "../components/bars/RightSidebar";
import { DollarPage } from "../pages/DollarPage";
import { ForgetPassword } from "../pages/ForgetPassword";
import { CreateTicket } from "../pages/CreateTicket";
import { useUserStore } from "../hooks/Users/useUserStore";
import { useAuthStore } from "../hooks/Users/useAuthStore";
import { Loader } from "../components/Loader";
import { UsersPage } from "../pages/SystemDep/UsersPage";
import { Sections } from "../pages/SystemDep/Sections";
import { getEnvVariables } from "../helpers/getEnvVariables";
import { io } from "socket.io-client";
import { ManageTickets } from "../pages/ManageTickets";

export const AppRouter = () => {
  const { authStatus, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loader);
  const [showLeftbar, setShowLeftbar] = useState(true);
  const [showRightbar, setShowRightbar] = useState(true);
  const [showContent, setSetShowContent] = useState(true);
  const { startGetUsers } = useUserStore();
  const { checkAuth } = useAuthStore();
  const { VITE_BACKEND } = getEnvVariables();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = io(VITE_BACKEND, {
    transports: ["websocket"],
  });

  const funcShowLeftbar = () => {
    if (window.innerWidth > 1240) {
      setShowLeftbar(!showLeftbar);
    } else if (window.innerWidth < 1240) {
      setShowLeftbar(!showLeftbar);
      setShowRightbar(false);
    }
  };

  const funcShowRightbar = () => {
    if (window.innerWidth > 1240) {
      setShowRightbar(!showRightbar);
    } else if (window.innerWidth < 1240) {
      setShowLeftbar(false);
      setShowRightbar(!showRightbar);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1240) {
        setShowRightbar(false);
        setShowLeftbar(true);
      } else {
        setShowRightbar(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 880) {
        setShowRightbar(false);
        setShowLeftbar(false);
      } else {
        setShowLeftbar(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 880 && (showLeftbar || showRightbar)) {
        setSetShowContent(false);
      } else {
        setSetShowContent(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showContent, showLeftbar, showRightbar]);

  useEffect(() => {
    startGetUsers();
    checkAuth();
  }, []);

  useEffect(() => {
    if (authStatus === "auth") {
      socket.emit("join-room", user._id);
      socket.on("online-users-updated", (users) => {
        setOnlineUsers(users);
      });
    }
    return () => {
      socket.off("online-users-updated");
    };
  }, [authStatus]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {authStatus === "auth" ? (
            <>
              <Navbar
                funcShowLeftbar={funcShowLeftbar}
                funcShowRightbar={funcShowRightbar}
                showContent={showContent}
                setSetShowContent={setSetShowContent}
                setShowLeftbar={setShowLeftbar}
                setShowRightbar={setShowRightbar}
                user={user}
                VITE_BACKEND={VITE_BACKEND}
                socket={socket}
              />
              <div className="flex" style={{ marginTop: "60px" }}>
                <LeftSidebar
                  showLeftbar={showLeftbar}
                  showContent={showContent}
                  setSetShowContent={setSetShowContent}
                  setShowLeftbar={setShowLeftbar}
                  user={user}
                />
                <div
                  className="w-full bg-dark text-white app-router-padding justify-center align-center d-flex"
                  style={{
                    height: "calc(100vh - 60px)",
                    width: "100vw",
                  }}
                >
                  {showContent && (
                    <div
                      style={{
                        overflowY: "auto",
                        maxHeight: "calc(100vh - 60px)",
                      }}
                      className="mt-3 mx-3 w-full"
                    >
                      <Routes>
                        <>
                          <Route path="/*" element={<HomePage />} />
                          <Route path="/home" element={<HomePage />} />
                          <Route path="/dollar" element={<DollarPage />} />
                          <Route
                            path="/createTicket"
                            element={<CreateTicket user={user} users={users} socket={socket} />}
                          />
                          <Route path="/users" element={<UsersPage />} />
                          {user.area.name === "Sistemas" && (
                            <>
                              <Route path="/sections" element={<Sections />} />
                              <Route
                                path="/managetickets"
                                element={
                                  <ManageTickets user={user} socket={socket}/>
                                }
                              />
                            </>
                          )}
                        </>
                      </Routes>
                    </div>
                  )}
                </div>
                <RightSidebar
                  showRightbar={showRightbar}
                  showContent={showContent}
                  user={user}
                  VITE_BACKEND={VITE_BACKEND}
                  onlineUsers={onlineUsers}
                />
              </div>
            </>
          ) : (
            <Routes>
              <>
                <Route path="/*" element={<LoginPage />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
              </>
            </Routes>
          )}
        </>
      )}
    </>
  );
};
