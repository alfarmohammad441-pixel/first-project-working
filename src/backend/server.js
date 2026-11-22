import express from "express";
import cors from "cors";
import odbc from "odbc";
const app = express();
app.use(cors());
app.use(express.json());


const ACCESS_DB = process.env.ACCESS_DB || "C:/Users/User/Desktop/system degin.accdb";
const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=${ACCESS_DB};`;

async function query(sql, params = []) {
  const connection = await odbc.connect(connectionString);
  try {
    return await connection.query(sql, params);
  } finally {
    await connection.close();
  }
}

app.get("/userstable", async (_, res) => {
  try {
    const users = await query(
      "SELECT username, password FROM userstable"
    );
    res.json(users);
  } catch (e) {
    if (e.code === "HY000") {
      res.status(500).json({ error: "Database connection error" });
    }
    res.status(500).json({ error: e.message });
  }
  
});


app.get("/studenttable", async (_, res) => {
  try {
    res.json(await query("SELECT * FROM studenttable"));
  } catch (e) {
    if (e.code === "HY000") {
      res.status(500).json({ error: "Database connection error" });
    }
    res.status(500).json({ error: e.message });
  }
});

app.get("/subjecttable", async (_, res) => {
  try {
    res.json(await query("SELECT * FROM subjecttable"));
  } catch (e) {
    if (e.code === "HY000") {
      res.status(500).json({ error: "Database connection error" });
    }
    res.status(500).json({ error: e.message });
  }
});

app.get("/enrollmentstable", async (_, res) => {
  try {
    res.json(await query("SELECT * FROM enrollmentstable"));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/studentexams", async (_, res) => {
  try {
    res.json(await query("SELECT * FROM studentexams"));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/studentpayment", async (_, res) => {
  try {
    res.json(await query("SELECT * FROM studentpayment"));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/specializationtable", async (_, res) => {
  try {
    res.json(await query("SELECT * FROM specializationtable"));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



app.get("/examcenter", async (_, res) => {
  try {
    res.json(await query("SELECT * FROM examcenter"));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/totalstudent", async (_, res) => {
  try {
    const rows = await query(
      "SELECT COUNT(studenttable.ID) AS totalStudent FROM studenttable"
    );
    const result = Array.isArray(rows) ? rows[0] : rows;
    res.json({ totalStudent: Number(result?.totalStudent ?? 0) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/totalsubject",async(_,res)=>{
    try {
    const rows = await query(
      "SELECT Count(subjecttable.ID) AS totalSubject FROM subjecttable"
    );
    const result = Array.isArray(rows) ? rows[0] : rows;
    res.json({ totalSubject: Number(result?.totalSubject ?? 0) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})


app.get("/totalpayment",async(_,res)=>{
    try {
    const rows = await query(
      "SELECT Count(Paymenttable.ID) AS totalpayment FROM Paymenttable"
    );
    const result = Array.isArray(rows) ? rows[0] : rows;
    res.json({ totalpayment: Number(result?.totalpayment ?? 0) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

app.get("/totalexams",async(_,res)=>{
    try {
    const rows = await query(
      "SELECT Count(examstable.ID) AS totalexams FROM examstable"
    );
    const result = Array.isArray(rows) ? rows[0] : rows;
    res.json({ totalexams: Number(result?.totalexams ?? 0) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

app.get("/totalcenter",async(_,res)=>{
    try {
    const rows = await query(
      "SELECT Count(examcenter.ID) AS totalcenter FROM examcenter"
    );
    const result = Array.isArray(rows) ? rows[0] : rows;
    res.json({ totalcenter: Number(result?.totalcenter ?? 0) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

app.get("/totalspecialization",async(_,res)=>{
    try {
    const rows = await query(
      "SELECT Count(specializationtable.ID) AS totalspecialization FROM specializationtable"
    );
    const result = Array.isArray(rows) ? rows[0] : rows;
    res.json({ totalspecialization: Number(result?.totalspecialization ?? 0) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

app.get("/totalcoordintator",async(_,res)=>{
    try {
    const rows = await query(
      "SELECT Count(examcoordintator.ID) AS Totalcoordintator FROM examcoordintator"
    );
    const result = Array.isArray(rows) ? rows[0] : rows;
    res.json({ Totalcoordintator: Number(result?.Totalcoordintator ?? 0) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
console.log(`SVU API running on http://localhost:${PORT}`);
});
