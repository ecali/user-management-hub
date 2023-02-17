import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { User } from "../types/RandomUser";
import { Loader } from "./Loader";
import "./Modal.css";
import { Profile } from "./Profile";
import { ToggleBar } from "./ToggleBar";

export const UserModal = React.forwardRef(
  (
    props: {
      closeModal: () => void;
      currentUsers: User[];
      setCurrentUsers: (users: User[]) => void;
    },
    ref
  ) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [size, setSize] = useState(10);
    const [overTwenty, setOverTwenty] = useState(false);
    const [zero, setZero] = useState(false);

    const url = `https://random-data-api.com/api/users/random_user?size=${size}`;

    const reference = useRef(false);

    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      bgcolor: "background.paper",
      borderRadius: "20px",
      boxShadow: 24,
      maxWidth: "950px",
      p: 2,
      pt: 1,
    };

    useEffect(() => {
      if (reference.current && props.currentUsers.length === 0) {
        fetchRandomUsers();
      }
      if (props.currentUsers.length > 0) {
        setUsers(props.currentUsers);
      }
      return () => {
        reference.current = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    const fetchRandomUsers = () => {
      if (size > 20) {
        setZero(false);
        setOverTwenty(true);
        setTimeout(() => {
          setOverTwenty(false);
        }, 5000)
      } else if (size > 0) {
        setZero(false);
        setOverTwenty(false);
        setSelectedUser(undefined);
        setIsLoading(true);
        axios
          .get(url)
          .then((res) => {
            setUsers(res.data);
            props.setCurrentUsers(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else if (size === 0) {
        setZero(true);
        setTimeout(() => {
          setZero(false);
        }, 5000)
      }
    };

    return (
      <Box sx={style} ref={ref}>
        <div className="flex jc-c modal-header">
          <h2>User Management Hub</h2>
          <CloseIcon onClick={props.closeModal} className="close-icon" />
        </div>

        <div className="input-container">
          <p>Enter the number of users you want</p>
          <TextField
            type="number"
            value={Number(size).toString()}
            onChange={(e) => setSize(Number(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <button
            disabled={size === users.length || isLoading}
            className="app-button modal-button"
            onClick={fetchRandomUsers}
          >
            <CachedIcon />
          </button>
        </div>
        {overTwenty && (
          <Alert severity="error">
            Error: The number of users to search cannot exceed 20. Please try
            again.
          </Alert>
        )}
        {
          zero && (
            <Alert severity="warning">No users were searched for, so the list is empty. Please note that this list displays the same users as before.</Alert>
          )
        }
        {users.length > 0 && !isLoading && (
          <>
            <ToggleBar users={users} setSelected={setSelectedUser} />
            {selectedUser && <Profile user={selectedUser} />}
            {size === users.length && (
              <button
                className="green-button bottom-button flex jc-c"
                onClick={fetchRandomUsers}
              >
                <CachedIcon /> Fetch again {size} {size > 1 ? "users" : "user"}
              </button>
            )}
          </>
        )}

        {isLoading && (
          <div className="loader-container flex jc-c">
            <Loader />
          </div>
        )}
      </Box>
    );
  }
);
