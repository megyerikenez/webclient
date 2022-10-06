
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { getAdminData, UserInfo } from "../api";
import { LoaderPage } from "../components/LoaderPage";
import Navbar from "../components/Navbar";
import AccordionComponent from "./Accordion";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <Admin />
    </>
  );
}

let dataPromise: Promise<UserInfo[]> | null = null;

export function Admin(){
  const [t, i18n] = useTranslation('common');
  let [data, setData] = useState<UserInfo[] | null>(null);

  useEffect(()=>{
    if (!dataPromise){
      dataPromise = getAdminData();
      toast.promise(
        dataPromise,
        {
          loading: t('loaders.data.loading'),
          success: <b>{t('loaders.data.success')}</b>,
          error: <b>{t('loaders.data.error')}</b>,
        }
      );
      dataPromise.finally(()=>{
        dataPromise = null;
      })
    }
    dataPromise.then(data=>setData(data));
  },[]);

  if (data == null){
    return <LoaderPage />;
  }

  return <>
    <div className="flex justify-center">
      <div className="w-3/4 mt-10">
        {
          data.map(user=>{
            return <>
              <AccordionComponent user={user} />
            </>
          })
        }
        
      </div>
    </div>
  </>
}