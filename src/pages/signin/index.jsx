import LeftSide from "../../component/signin";
import RightSide from "../../component/signin/RightSide";
import signinImg from "../../assets/images/illustration/signin.png";

function SignIn() {
  return (
    <section className="bg-white dark:bg-darkblack-500">
      <div className="flex flex-col lg:flex-row justify-between min-h-screen">
        <LeftSide />
        <RightSide img={signinImg} />
      </div>
    </section>
  );
}

export default SignIn;
