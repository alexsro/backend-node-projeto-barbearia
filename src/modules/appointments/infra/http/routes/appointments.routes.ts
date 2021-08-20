import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from 'modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderApppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerApppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providerApppointmentsController.index);

export default appointmentsRouter;
