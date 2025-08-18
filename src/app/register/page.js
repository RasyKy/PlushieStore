import InputBox from "@/components/inputbox";

export default function CheckoutPage() {
  return (
    <>
      <header className="bg-gray-100">
        <h1 className="text-center">PlushieStore</h1>
      </header>
      <main className="bg-gray-100 min-h-screen">
        <div className="bg-white border flex flex-col">
          <p>Create Accoun</p>
          <p>
            Already have an account?{" "}
            <span className="text-bold underline">Log in</span>
          </p>

          <InputBox displayText="Email" />
          <InputBox displayText="Password" />
          <InputBox displayText="Confirm Password" />

          <button className="text-white bg-blue-600 p-4 rounded">Create Account</button>
        <p> Or continue with</p>
        <button className="border p-4">Google</button>
        </div>
      </main>
    </>
  );
}
