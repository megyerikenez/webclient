import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { sendMockupForm } from "../api";

export default function MockForm() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let form = useRef<HTMLFormElement>(null);

  const [t, i18n] = useTranslation('common');

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
      <form
        ref={form}
        onSubmitCapture={(e: FormEvent)=>{
          e.preventDefault();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              required
              minLength={1}
              placeholder={t('mockupForm.lastName')}
              value={lastName}
              onChange={(e)=>{setLastName(e.target.value)}}
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              required
              minLength={1}
              placeholder={t('mockupForm.firstName')}
              value={firstName}
              onChange={(e)=>{setFirstName(e.target.value)}}
            />
          </div>
        </div>
        <div className="form-group mb-6">
          <input
            type="email"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="email"
            required
            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            placeholder={t('mockupForm.email')}
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <button
          onClick={()=>{
            if (form.current?.checkValidity()){
              sendMockupForm({
                firstName,
                lastName,
                email,
              });
            }
          }}
          type="submit"
          className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          {t('mockupForm.submit')}
        </button>
      </form>
    </div>
  );
}
