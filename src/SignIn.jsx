import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./createClient.jsx";

const SignIn = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      alert("بيانات غلط")
      return
    }

    navigate("/admin")
  }

{/* <Route
  path="/admin"
  element={
    session ? (
      <Admin
        members={membersData}
        edit={edit}
        setEdit={setEdit}
      />
    ) : (
      <LogIn />
    )
  }
/> */}


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>log in</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="email ...."
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="password ...."
          value={data.password}
          onChange={(e) => setData({...data, password: e.target.value})}
          style={styles.input}
        />

          <button type="submit" style={styles.button}>
            دخول
          </button>
      </form>
      <footer style={{ ...styles.header, marginTop: 30 }}>
        <div>
          <h3 style={{ margin: 0 }}>Email : <span style={styles.subTitle}>admin@gmail.com</span></h3>
          <h3 style={{ margin: 0 }}>password : <span style={styles.subTitle}>admin!</span></h3>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 350,
    margin: "80px auto",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    textAlign: "center",
  },
  title: {
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#1877f2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "15px 20px",
    borderRadius: 10,
    marginBottom: 25,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    flexWrap: "wrap",
    gap: 10,
  },
  subTitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
};

export default SignIn;
