const router = require('express').Router();
const Workout = require('../models/workout');

router.get("/api/workouts", (req, res) => {
    Workout.find()
      .then(workouts => {
        res.json(workouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.get("/api/workouts/range", ({ query }, res) => {
    Workout.find({ day: { $gte: query.start, $lte: query.end } })
      .then(workouts => {
        res.json(workouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

router.post('/api/workouts', (req, res) => {
    Workout.create({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
});  

router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then(workout => {
        res.json(workout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch(err => {
        res.json(err);
      });
  });

  module.exports = router;