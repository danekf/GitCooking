export default function Register() {
  return (
      <body>
        <form>
          <input type='text' id='email' name='email' placeholder="Email"></input>
          <input type='text' id='firstname' name='first name' placeholder='First Name'></input>
          <input type='text' id='lastname' name='last name' placeholder='Last Name'></input>
          <input type='text' id='username' name='username' placeholder='Username'></input>
          <input type='password' id='password' name='password' placeholder='Password'></input>

          <label for="profile picture">Upload a photo:</label>
          <input 
            type='file' 
            id='profile picture' 
            name='profile picture' 
            placeholder='Upload Profile Picture'
            // onChange={onChange}
          ></input>
          <button>Register</button>
        </form>
    </body>
  );
}