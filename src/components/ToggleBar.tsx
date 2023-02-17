import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { User } from "../types/RandomUser";
import "./ToggleBar.css";

export const ToggleBar = (props: {
  users: User[];
  setSelected: (user: User) => void;
}) => {
  const [usersRows, setUsersRow] = useState<User[][]>([]);
  const [selected, setSelected] = useState<User>();
  const [interestIds, setInterestIds] = useState<{
    last: number;
    first: number;
  }>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => determinateRows, [props.users]);

  const determinateRows = () => {
    setInterestIds({
      last: props.users[props.users.length - 1].id,
      first: props.users[0].id,
    });
    const numItems = props.users.length;
    const numRows = Math.ceil(numItems / 5);
    const numButtons: number[] = [];
    const rows: User[][] = [];
    let total = numItems;
    for (let i = 0; i < numRows; i++) {
      const maxButtons = Math.ceil(total / (numRows - i));
      const buttons = Math.min(maxButtons, 5);
      numButtons.push(buttons);
      total -= buttons;
    }
    let end = 0;
    let start = 0;
    numButtons.forEach((numForRows: number, index: number) => {
      start = index === 0 ? start + 0 : start + numButtons[index - 1];
      end = end + numForRows;
      rows.push(props.users.slice(start, end));
    });
    setUsersRow(rows);
  };

  const handleSelected = (user: User) => {
    setSelected(user);
    props.setSelected(user);
  };

  return (
    <div className="toggle-bar flex fd-c">
      <div className="toggle-header flex jc-sa ai-c">
        {selected && (
          <button
            className="green-button"
            disabled={selected?.id === interestIds?.first}
            onClick={() =>
              handleSelected(
                props.users[
                props.users.findIndex((user) => user.id === selected.id) - 1
                ]
              )
            }
          >
            <NavigateBeforeIcon /> Show Prev
          </button>
        )}
        Select a user from these {props.users.length}.
        {selected && (
          <button
            className="green-button"
            disabled={selected?.id === interestIds?.last}
            onClick={() =>
              handleSelected(
                props.users[
                props.users.findIndex((user) => user.id === selected.id) + 1
                ]
              )
            }
          >
            Show Next <NavigateNextIcon />
          </button>
        )}
      </div>
      <div className="row-container">
        {usersRows.map((row, key) => {
          return (
            <div className="flex" key={key}>
              {row.map((user) => {
                return (
                  <div
                    key={user.id}
                    className={
                      selected && selected?.id === user.id
                        ? "user-item selected"
                        : "user-item"
                    }
                    onClick={() => handleSelected(user)}
                  >
                    {user.first_name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
