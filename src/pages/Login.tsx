import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Login = () => {

  // setting states for email & password 
  const [email,setEmail] = useState('');
  const [pwd,setPwd] = useState('');
  const [remember,setRemember] = useState(false);
  // using navigate function for getting to home page if authenticated
  const navigate = useNavigate()
  
  const handleSubmit = (e:FormEvent)=>{
    e.preventDefault();
    const login = async ()=>{
      // sending get request to the server
      const res = await fetch(
        `http://localhost:3000/auth/login`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ email, password: pwd})
        }
      )
      const { error, token, user } = await res.json()
      
      if(user){
        toast.success('Successfull Login')
        if(remember){
          localStorage.setItem('token', token)
          localStorage.setItem('user', user.email.slice(0, user.email.indexOf('@')))
        }else{
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('user', user.email.slice(0, user.email.indexOf('@')))
        }
        setTimeout(() => {
          navigate('/')
        }, 1000);
      }
      else
        toast.error(error)

      }

      login()
  };

  return (
    <section className="w-screen h-screen bg-[#FAF9F9] flex justify-center items-center">
      <form 
        onSubmit={handleSubmit}
        className="w-84 bg-[#BEE3DB] p-10 pb-8 flex flex-col gap-4 rounded-lg shadow-xl font-josefin">

        <h1 className="text-4xl text-center font-josefin font-bold text-gray-600 text-shadow">To-do App</h1>
        {/* E-mail Feild */}
        <div className="flex flex-col ">
          <label htmlFor="email">E-mail</label>
          <input
            onChange={((e:ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value))}
            type="email"
            required
            placeholder="example@domain.com"
            name="email"
            id="email"
            className="border border-[#89B0AE] bg-[#FAF9F9] focus:outline-[#89B0AE] py-1 px-2"
          />
        </div>

        {/* Password Feild */}
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            onChange={((e: ChangeEvent<HTMLInputElement>) => setPwd(e.target.value))}
            type="password"
            required
            placeholder="••••••••"
            name="password"
            id="password"
            className="border border-[#89B0AE] bg-[#FAF9F9] focus:outline-[#89B0AE] py-1 px-2"
          />
        </div>

        {/* Remember Feild */}
        <div className="flex gap-2">
          <label htmlFor="remember" className="text-sm font-extralight select-none cursor-pointer">Remember me?</label>
          <input type="checkbox" className="cursor-pointer" name="remember" id="remember" onClick={() => setRemember((pre)=>!pre)}/>
        </div>

        {/* E-mail Feild */}
        <input
          type="submit"
          value="Log in"
          className="border border-[#89B0AE] text-[#555B6E] w-fit px-6 self-center py-1 rounded-sm bg-[#FAF9F9] hover:bg-[#89B0AE] hover:text-[#FAF9F9] hover:cursor-pointer duration-100"
        />
      </form>
      <Toaster />
    </section>
  );
};
export default Login;
