import './userProfile.scss';

import ProfilePicture from "./profile_components/profile_picture";
import Username from "./profile_components/username";
import ProfileButtons from "./profile_components/profile_buttons";
import Badges from "./profile_components/badges";
import Qualifications from "./profile_components/qualifications";
import Socials from "./profile_components/socials";
import Bio from "./profile_components/bio";
import axios from 'axios';
import { useState, useEffect } from 'react';




export default function UserProfile() {

  //get all of a users recipes
  const [userRecipes, setUserRecipes]= useState();
  useEffect(()=>{
    axios.get(`/api/recipes/user`)
    .then((response)=>{
      const tempArray=[]
      for (let key in response.data){
        tempArray.push(response.data[key])
      }
      setUserRecipes(tempArray);
    })
    // eslint-disable-next-line
  }, [])
  
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
          
        </div>
      </main>
    </>
  );  
}