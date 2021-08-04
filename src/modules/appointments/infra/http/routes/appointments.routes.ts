import { Router } from 'express';

import ensureAuthenticated from 'modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderApppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerApppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerApppointmentsController.index);
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

export default appointmentsRouter;
