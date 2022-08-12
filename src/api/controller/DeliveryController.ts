import { Request, Response } from 'express'
import { Service } from '../../interfaces/Service'

export default class DeliveryController {

  constructor (private createDelivery: Service) {
    this.index = this.index.bind(this);
  }
  
  index (req: Request, res: Response): Response {
    const result = this.createDelivery.execute()
    return res.send(result)
  }
}
