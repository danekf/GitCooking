import './userProfile.scss';

import ProfilePicture from "./profile_components/profile_picture";
import Username from "./profile_components/username";
import ProfileButtons from "./profile_components/profile_buttons";
import Badges from "./profile_components/badges";
import Qualifications from "./profile_components/qualifications";
import Socials from "./profile_components/socials";
import Bio from "./profile_components/bio";
import RecipeList from "./recipes/recipeList"


export default function UserProfile() {
  return (
    <>
      <main>
        <div className="profile-card">
          <ProfilePicture/>
          <Badges/>
          <Username/>
          <ProfileButtons/>
          <Socials/>
          <Qualifications/>
          <Bio/>
        </div>
        <div>
          <RecipeList/>
        </div>
      </main>
    </>
  );  
}