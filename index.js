const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const dbConfig = require("./knexfile.js");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({
      message: "Houston, we have a problem! Failed to retrieve records."
    });
  }
});

server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const myCohort = await db("cohorts").where({ id: req.params.id });
    res.status(200).json(myCohort);
  } catch (error) {
    res.status(500).json({ message: "we can't get the records" });
  }
});
// get all students by cohort
server.get("/api/cohorts/:id/students", async (req, res) => {
    try {
      const cohort = await db("cohorts")
      .join("students", "cohorts.id", "=", "students.cohort_id")
      .select("cohorts.name", "students.name")
      .where({ cohort_id: req.params.id })
      res.status(200).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
   });

server.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = req.body;
    const id = await db("cohorts").insert(newCohort);
    if (id > 0) {
      res.status(200).json({ message: "new cohort added succesfully" });
    } else {
      res.status(400).json({ message: "couldn't get the id" });
    }
  } catch (error) {
    res.status(500).json({ message: "we can't add the new record" });
  }
});

server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const toRemoveId = await db("cohorts")
    .where({ id: req.params.id })
    .del();
    if (toRemoveId > 0) {
      res.status(200).json({ message: "record deleted succesfully" });
    } else {
      res
        .status(400)
        .json({ message: "couldn't get the id that you are passing" });
    }
  } catch (error) {
    res.status(500).json({ message: "we can't delete the  record" });
  }
});
server.put("/api/cohorts/:id",async(req,res)=>{
    try{
       const id = await db("cohorts")
           .where ({id:req.params.id})
           .update(req.body)
        if(id>0) {
           res.status(200).json({message:"record succesfully updates"})
        } else{
            res.status(400).json({message:"cant get the record to be updated"})
        } 


    }
    catch(error){

        res.status(500).json({ message: "we can't update the  record" }); 

    }



})


//********************************************** */

server.get("/api/students", async (req, res) => {
    try {
      const students = await db("students");
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({
        message: "Houston, we have a problem! Failed to retrieve records."
      });
    }
  });
  server.get("/api/students/:id", async (req, res) => {
    try {
      const myStudent = await db("students").where({ id: req.params.id });
      res.status(200).json(myStudent);
    } catch (error) {
      res.status(500).json({ message: "we can't get the records" });
    }
  });
  server.post("/api/students", async (req, res) => {
    try {
      const newStudent = req.body;
      const id = await db("students").insert(newStudent);
      if (id > 0) {
        res.status(200).json({ message: "new student added succesfully" });
      } else {
        res.status(400).json({ message: "couldn't get the id" });
      }
    } catch (error) {
      res.status(500).json({ message: "we can't add the new record" });
    }
  });
  server.delete("/api/students/:id", async (req, res) => {
    try {
      const toRemoveId = await db("students")
      .where({ id: req.params.id })
      .del();
      if (toRemoveId > 0) {
        res.status(200).json({ message: "record deleted succesfully" });
      } else {
        res
          .status(400)
          .json({ message: "couldn't get the id that you are passing" });
      }
    } catch (error) {
      res.status(500).json({ message: "we can't delete the  record" });
    }
  });

  server.put("/api/students/:id",async(req,res)=>{
    try{
       const id = await db("students")
           .where ({id:req.params.id})
           .update(req.body)
        if(id>0) {
           res.status(200).json({message:"record succesfully updates"})
        } else{
            res.status(400).json({message:"cant get the record to be updated"})
        } 


    }
    catch(error){

        res.status(500).json({ message: "we can't update the  record" }); 

    }



})


const port = 5000;
server.listen(port, () => {
  console.log(`server is listening at the port:${port}`);
});
