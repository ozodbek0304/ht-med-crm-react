
import Image from "next/image";
import background from "../../assets/mountain.png";
import LogInForm from "./login-form";

const LoginPage = () => {

  return (
    <div className="loginwrapper bg-card flex items-center min-h-screen overflow-hidden w-full">
      <div className="lg-inner-column  flex w-full flex-wrap justify-center lg:justify-center overflow-y-auto py-10">
        <Image src={background} alt="image" className="absolute top-0 left-0 w-full h-full" priority={true} />
        <div className="basis-full lg:basis-1/2 w-full  flex justify-center items-center relative lg:pr-12 xl:pr-20 2xl:pr-[110px] px-5">
          <div className="w-full   md:w-[400px] xl:w-[500px]  px-5 py-7  lg:p-8 lg:py-14 lg:pt-10 bg-card rounded-xl">
            <LogInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
