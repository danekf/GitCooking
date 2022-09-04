import { Link } from "react-router-dom";
import './userProfile.scss';

import ProfilePicture from "./profile_components/profile_picture";
import Username from "./profile_components/username";
import MessageButton from "./profile_components/message_button";
import Badges from "./profile_components/badges";
import Qualifications from "./profile_components/qualifications";
import Socials from "./profile_components/socials";
import Bio from "./profile_components/bio";
import RecipeList from "./recipes/recipeList"


export default function UserProfile() {
  // const profileData = getProfileData();
  return (
    <>
      <main>
        <div className="profile-card">
          <ProfilePicture/>
          <Badges/>
          <Username/>
          <MessageButton/>
          <Socials/>
          <Qualifications/>
          <Bio/>
        </div>
        <RecipeList/>
      </main>
    </>
  );  
}