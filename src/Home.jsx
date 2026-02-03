import { Link } from "react-router-dom"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import SignIn from "./SignIn.jsx"

function Home({members}) {
  const styles = { 
    page: { 
      maxWidth: 900, 
      margin: "40px auto", 
      padding: "0 20px", 
      fontFamily: "Segoe UI, sans-serif", 
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
    adminBtn: { 
      background: "#111", 
      color: "#fff", 
      border: "none", 
      padding: "10px 18px", 
      borderRadius: 6, 
      cursor: "pointer", 
      fontWeight: "bold", 
    },
    // tableWrapper: { 
    //   overflowX: "auto", 
    //   background: "#fff", 
    //   borderRadius: 10, 
    //   marginTop: 30,
    //   boxShadow: "0 2px 8px rgba(0,0,0,0.05)", 
    // }, 
    // table: { 
    //   width: "100%", 
    //   borderCollapse: "collapse", 
    //   minWidth: 500, 
    // }, 
    avatar: { 
      width: 45, 
      height: 45, 
      borderRadius: "50%", 
      objectFit: "cover", 
    }, 
    tableCell: { 
      textAlign: "center", 
      verticalAlign: "middle", 
      padding: "12px", 
    }, 
    actions: { 
      display: "flex", 
      justifyContent: "center", 
      gap: 8, 
      flexWrap: "wrap", 
    }, 
    editBtn: { 
      background: "#1877f2", 
      color: "#fff", 
      border: "none", 
      padding: "6px 10px", 
      borderRadius: 5, 
      cursor: "pointer",
      fontSize: 13,
      marginRight: 8,
    }, 
    deleteBtn: { 
      background: "#e53935", 
      color: "#fff", 
      border: "none", 
      padding: "6px 10px", 
      borderRadius: 5, 
      cursor: "pointer", 
      fontSize: 13, 
    },
    tableWrapper: { 
        background: "transparent", 
        marginTop: 30,
      },
      table: { 
        width: "100%", 
        borderCollapse: "separate",
        borderSpacing: "0 15px", 
      },
      tableRow: {
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      },
      responsiveRow: {
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        marginBottom: "15px",
        background: "#fff",
        borderRadius: "10px",
        position: "relative"
      }
  };

  return (
    <div style={styles.page}>
      {/* TOP BAR */}
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Users Area</h2>
          <p style={styles.subTitle}>
            Public view - data available for everyone
          </p>
        </div>
        
        <Link to="/SignIn">
          <button style={styles.adminBtn}>
دخول صفحه الادمن          
        </button>
        </Link>
      </header>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableCell}>الصورة</th>
            <th style={styles.tableCell}>الاسم</th>
            <th style={styles.tableCell}>العمر</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id} className="responsive-tr">
              <td style={styles.tableCell}>
                <Zoom>
                  <img
                    src={Array.isArray(member.avatar) ? member.avatar[0] : member.avatar} 
                    alt={member.name}
                    style={styles.avatar}
                    className="avatar-mobile"
                  />
                </Zoom>
              </td>
              
              <td style={styles.tableCell}>
                <div className="cell-content">
                  <span className="mobile-label">Name:</span> 
                  <span>{member.name}</span>
                </div>
              </td>
              
              <td style={styles.tableCell}>
                <div className="cell-content">
                  <span className="mobile-label">Age:</span> 
                  <span>{member.age}</span>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
