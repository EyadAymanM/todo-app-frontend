import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Regiser = () => {

  // setting states for email & password 
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  // using navigate function for getting to home page if authenticated
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const register = async () => {
      // sending get request to the server
      const res = await fetch(
        `http://localhost:3000/auth/register`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ email, password: pwd })
        }
      )
      const { error } = await res.json()
      if(error)
        toast.error(error)
      else{
        navigate('/login')
      }
    }
    register()
  };
  return (
    <section className="w-screen h-screen bg-[#FAF9F9] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-84 bg-[#BEE3DB] p-10 pb-8 flex flex-col gap-4 rounded-lg shadow-xl font-josefin">

        <h1 className="text-4xl text-center font-josefin font-bold text-gray-600 select-none text-shadow">To-do App</h1>
        <h1 className="text-2xl text-center font-josefin font-bold text-gray-600 select-none text-shadow">create account</h1>
        {/* E-mail Feild */}
        <div className="flex flex-col ">
          <label htmlFor="email">E-mail</label>
          <input
            onChange={((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value))}
            type="email"
            required
            placeholder="example@domain.com"
            name="email"
            id="email"
            className="border border-[#89B0AE] bg-[#FAF9F9] focus:outline-[#89B0AE] py-1 px-2 placeholder:text-gray-400"
          />
        </div>

        {/* Password Feild */}
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            onChange={((e: ChangeEvent<HTMLInputElement>) => setPwd(e.target.value))}
            type="password"
            required
            placeholder="Must have at least 6 characters"
            name="password"
            id="password"
            className="border border-[#89B0AE] bg-[#FAF9F9] focus:outline-[#89B0AE] py-1 px-2 placeholder:text-gray-400"
          />
        </div>

        <span
          onClick={() => navigate('/login')}
          className="text-xs text-gray-500 font-light underline hover:text-blue-500 cursor-pointer"
        >Aleady have an account? login
        </span>

        {/* From Submit Button */}
        <input
          type="submit"
          value="Register"
          className="border border-[#89B0AE] text-[#555B6E] w-fit px-6 self-center py-1 rounded-sm bg-[#FAF9F9] hover:bg-[#89B0AE] hover:text-[#FAF9F9] hover:cursor-pointer duration-100"
        />
      </form>
      <Toaster />
    </section>
  );
}



export default Regiser;
