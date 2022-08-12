import { Router } from 'express'
import deliveryController from '../../controller/DeliveryController'
import CreateDelivery from '../../service/delivery/CreateDelivery'

const routes = Router()

const createDelivery = new CreateDelivery()
const controller = new deliveryController(createDelivery)

routes.get('/', controller.index)

export default routes