import { Link } from "react-router-dom";
import './userProfile.scss';

import ProfilePicture from "./profile_components/profile_picture";
import Username from "./profile_components/username";
import MessageButton from "./profile_components/message_button";
import Badges from "./profile_components/badges";


export default function UserProfile() {
  // const profileData = getProfileData();
  return (
    <>
      <main>
        <ProfilePicture/>
        <Badges/>
        <Username/>
        <MessageButton/>
      </main>
    </>
  );  
}