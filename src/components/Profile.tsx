import { User } from "../types/RandomUser";
import "./Profile.css";

export const Profile = (props: { user: User }) => {

  return (
    <>
      <p className="profile-head">Selected User</p>
      <div className="profile-container flex jc-c">

        <img
          src={props.user.avatar}
          width="70px"
          alt={`${props.user.first_name} ${props.user.last_name}`}
        />
        <div className="user-info flex jc-se fd-c">
          <p>
            {props.user.first_name} {props.user.last_name}
          </p>
          <p>{props.user.email}</p>
        </div>

      </div>
    </>
  );
};
