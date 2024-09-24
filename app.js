import 'dotenv/config'
import express from 'express'
import sequelize from './db/index.js';
import router from './routes/app.route.js';


const app = express()
app.use(express.json());
app.use('/api', router);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  await sequelize.sync({ force: false });
  console.log('The table for the User model was just (re)created!');

  app.listen(process.env.APP_PORT, () => {
    console.log('server running')
  })

} catch (error) {
  console.error('Unable to connect to the database:', error);
}


