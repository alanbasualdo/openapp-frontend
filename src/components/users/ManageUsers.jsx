import { useEffect, useState } from "react";
import { useUserStore } from "../../hooks/Users/useUserStore";
import { useSelector } from "react-redux";
import { getEnvVariables } from "../../helpers/getEnvVariables";
import { showErrorMessage, showSuccessMessage } from "../../utils/showMessages";
import { useBranchSectionStore } from "../../hooks/CompanySections/useBranchSectionStore";
import { usePositionSectionStore } from "../../hooks/PositionsSections/usePositionSectionStore";
import { useAreaSectionStore } from "../../hooks/PositionsSections/useAreaSectionStore";
import { useSubareaSectionStore } from "../../hooks/PositionsSections/useSubareaSectionStore";

export const ManageUsers = ({ createUserClick, setCreateUserClick }) => {
  const { userLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { branches, positions, areas, subareas } = useSelector(
    (state) => state.companySection
  );
  const { startCreateUser, startGetUsers } = useUserStore();
  const [seePassword, setSeePassword] = useState(false);
  const [secondPassword, setSecondPassword] = useState("");
  const { startGetBranches } = useBranchSectionStore();
  const { startGetPositions } = usePositionSectionStore();
  const { startGetAreas } = useAreaSectionStore();
  const { startGetSubareas } = useSubareaSectionStore();

  const { VITE_BACKEND } = getEnvVariables();

  const initialStateUserData = {
    name: "",
    lastName: "",
    cuil: "",
    birthdate: "",
    gender: "",
    userName: "",
    email: "",
    password: "",
    admissionDate: "",
    departureDate: "",
    payroll: "",
    branch: "",
    area: "",
    subarea: "",
    position: "",
  };

  const [userData, setUserData] = useState(initialStateUserData);

  const resetForm = () => {
    setUserData(initialStateUserData);
    setSeePassword(false);
  };

  const createUser = async () => {
    try {
      const data = await startCreateUser(userData);
      if (data.success) {
        showSuccessMessage(data.message);
        setCreateUserClick(false);
        resetForm();
        startGetUsers();
      } else {
        showErrorMessage(data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    startGetBranches();
    startGetPositions();
    startGetAreas();
    startGetSubareas();
  }, []);

  return (
    <>
      <div className="d-flex gap-3 justify-center align-center">
        <div className="col-6">asd</div>
        <div className="col-6">asd</div>
      </div>
    </>
  );
};
