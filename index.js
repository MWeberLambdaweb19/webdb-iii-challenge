// Manage cohorts (id, name)
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambdaschool1.db3',
  },
  useNullAsDefault: true, // needed for sqlite
};
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

// THE FOLLOWING IS THE REQUESTS FOR COHORTS

// list all cohorts
server.get('/api/cohorts', async (req, res) => {
  // get the cohorts from the database
  try {
    const cohorts = await db('cohorts'); // all the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list a cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
  // get the cohorts from the database
  try {
    const role = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list the students in a cohort by id
server.get('/api/cohorts/:id/students', async (req, res) => {
  // get the cohorts from the database
  try {
    const role = await db('cohorts').innerJoin('students','cohorts.id','=','students.cohort_id').select('students.id', 'students.name', 'cohorts.cohort')
      .where({ 'cohorts.id': req.params.id })
      .first();
    res.status(200).json(role);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

const errorsCohort = {
  '19': 'Another record with that value exists',
};

// create cohorts
server.post('/api/cohorts', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);

    const role = await db('cohorts')
      .where({ id })
      .first();

    res.status(201).json(role);
  } catch (error) {
    const message = errorsCohort[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});
// update cohorts
server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const role = await db('cohorts')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

// remove cohorts (inactivate the cohort)
server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

// list all students
server.get('/api/students', async (req, res) => {
  // get the students from the database
  try {
    const students = await db('students').innerJoin('cohorts', 'students.cohort_id', '=', 'cohorts.id').select('students.id', 'students.name', 'cohorts.cohort', 'students.cohort_id', 'students.created_At', 'students.updated_At');
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// list a student by id
server.get('/api/students/:id', async (req, res) => {
  // get the students from the database
  try {
    const student = await db('students').innerJoin('cohorts', 'students.cohort_id', '=', 'cohorts.id').select('students.id', 'students.name', 'cohorts.cohort')
      .where({ 'students.id': req.params.id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errorsStudents = {
  '19': 'Another record with that value exists',
};

// create students
server.post('/api/students', async (req, res) => {
  try {
    const [id] = await db('students').insert(req.body);

    const student = await db('students')
      .where({ id })
      .first();

    res.status(201).json(student);
  } catch (error) {
    const message = errorsStudents[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});
// update students
server.put('/api/students/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const student = await db('students')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

// remove students (inactivate the role)
server.delete('/api/students/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
