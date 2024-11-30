import * as React from 'react'
import { AuthButton } from './components/AuthButton'
import { Logo } from './components/Logo'

export const QuestionBankPage = () => {
  const handleSignUp = () => {
    // Add signup logic here
  }

  const handleLogin = () => {
    // Add login logic here
  }

  return (
    <main className="flex overflow-hidden flex-col pb-60 bg-white max-md:pb-24">
      <header className="flex flex-wrap gap-5 justify-between px-16 py-5 w-full text-xl font-medium bg-slate-50 shadow-[0px_4px_20px_rgba(0,0,0,0.15)] max-md:px-5 max-md:max-w-full">
        <Logo />
        <nav className="flex gap-4 my-auto">
          <AuthButton text="Sign up" variant="primary" />
          <AuthButton text="Login" variant="secondary" />
        </nav>
      </header>

      <section className="self-end mt-20 w-full max-w-[1412px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <article className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex z-10 flex-col items-start self-stretch my-auto mr-0 w-full font-medium max-md:mt-10 max-md:max-w-full">
              <h1 className="text-4xl font-bold text-sky-950">
                Welcome to Your Question Bank!
              </h1>
              <p className="self-stretch mt-9 text-2xl text-sky-950 max-md:max-w-full">
                Easily organize and manage your questions by difficulty and
                sections. Create, edit, and delete questions seamlessly to build
                a personalized repository for any project or subject.
              </p>
              <div className="flex gap-4 mt-5 max-w-full text-xl w-[235px]">
                <AuthButton text="Sign up" variant="primary" />
                <AuthButton text="Login" variant="secondary" />
              </div>
            </div>
          </article>
          <aside className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d00273bd8338af38a75b63621cd552f1739530ad359d8fdeac6c18fa1f02455?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627"
              alt="Question Bank Interface Preview"
              className="object-contain grow w-full aspect-[1.79] max-md:max-w-full"
            />
          </aside>
        </div>
      </section>
    </main>
  )
}


const Logo = () => {
  return (
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/42e5619e6985a872cc0fd9bdbc49bf7fb63933932cd0bba2ca484bec765e0165?placeholderIfAbsent=true&apiKey=e40ab9010b324a23beb46e8f03978627"
      alt="Question Bank Logo"
      className="object-contain shrink-0 max-w-full aspect-[3.6] w-[263px]"
    />
  )
}

const AuthButton = ({ text, variant = 'primary' }) => {
  const baseStyles = 'gap-2 self-stretch px-6 py-2 rounded-3xl max-md:px-5'
  const styles =
    variant === 'primary'
      ? `${baseStyles} text-white bg-sky-950`
      : `${baseStyles} whitespace-nowrap border-2 border-solid border-sky-950 text-sky-950`

  return (
    <button className={styles} tabIndex={0}>
      {text}
    </button>
  )
}