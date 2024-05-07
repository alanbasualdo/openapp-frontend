import { useDispatch } from "react-redux";
import apiConn from "../../api/apiConn";
import { setTickets, setTicketsLoading } from "../../store/slices/ticketsSlice";

export const useTicketsStore = () => {
  const dispatch = useDispatch();

  const startPostTicket = async (ticket, files) => {
    try {
      dispatch(setTicketsLoading(true));
      const ticketData = {
        ...ticket,
        observers: ticket.observers.map((observer) => observer._id),
      };
      const formData = new FormData();
      formData.append("ticket", JSON.stringify(ticketData));
      files.forEach((file) => {
        formData.append("attachments", file);
      });
      const resp = await apiConn.post("/tickets/post-ticket", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(resp);
      dispatch(setTicketsLoading(false));
    } catch (error) {
      dispatch(setTicketsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startGetTickets = async () => {
    try {
      dispatch(setTicketsLoading(true));
      const { data } = await apiConn.get("/tickets/get-tickets");
      dispatch(setTickets(data.tickets));
      dispatch(setTicketsLoading(false));
    } catch (error) {
      dispatch(setTicketsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  const startDeleteTickets = async (id) => {
    try {
      dispatch(setTicketsLoading(true));
      const { data } = await apiConn.delete(`/tickets/delete-ticket/${id}`);
      dispatch(setTicketsLoading(false));
      return data;
    } catch (error) {
      dispatch(setTicketsLoading(false));
      return { success: false, message: error.response.data.message };
    }
  };

  return {
    startPostTicket,
    startGetTickets,
    startDeleteTickets,
  };
};