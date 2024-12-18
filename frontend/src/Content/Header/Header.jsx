import { GoogleLogin } from '@react-oauth/google';
import LightMode from './components/LightMode';
import Login from './components/Login';
import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <section className='fixed left-0 mb-10 w-[100vw] bg-[--background-color] z-10'>
            <div className="flex justify-between h-20 px-10 py-5">
                <Link to={"/"}>
                    <div className="bg-[image:--highlight-gradient] text-white text-2xl leading-5 p-2 font-bold ml-[-2.5rem] pl-10">Ferrum Web</div>
                </Link>

                <div className='flex'>
                    <LightMode />
                    {/* <Login /> */}
                    
                    {/* Goggle Authentication Button */}
                    {/* <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />  */}
                </div>

            </div>
            <div className='h-[3px] w-full bg-[image:--highlight-gradient]'></div>
        </section>
    )
}