import { getMembers } from "./operations/getMembers.jsx"
import { useQuery } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { supabase } from "./createClient.jsx"
import { useState , useEffect } from "react"
import Loader from "./Loader.jsx"
import SignIn from "./SignIn.jsx"
import Home from './Home.jsx';
import Admin from './Admin.jsx';
import ProtectedRoute from './operations/ProtectedRoute.jsx';

function App() {
  const [edit,setEdit] = useState(null);

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const { data : membersData , error : membersError , isPending : memberPending} = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  })

  if (membersError) return <h1>Error: {membersError.message}</h1>
  if (memberPending) return <Loader />

  return (
    <>
    <Routes>
      {/* <Route path="/" element={<Home session={session} setSession={setSession} members={membersData} edit={edit} setEdit={setEdit} />} />
      <Route path="/LogIn" element={<LogIn session={session} setSession={setSession} />} />
      <Route path="/admin" element={<Admin session={session} setSession={setSession} members={membersData} edit={edit} setEdit={setEdit} />} /> */}

  <Route path="/" element={<Home members={membersData} />} />

  <Route
    path="/SignIn"
    element={<SignIn />}
  />

  <Route
    path="/admin"
    element={
      <ProtectedRoute session={session}>
        <Admin
          members={membersData}
          edit={edit}
          setEdit={setEdit}
        />
      </ProtectedRoute>
    }
  />

    </Routes>
    </>
  )
}

export default App

