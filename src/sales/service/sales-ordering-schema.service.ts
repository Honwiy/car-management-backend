import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SalesOrderingSchemaInterface } from '../sales.interface'
import { SalesOrderingDto } from '../dto/salesOrderingSchemas/sales-ordering.dto'
import { CustomerInfoDto } from '../dto/salesOrderingSchemas/customer-info.dto'
import { OrderingInfoDto } from '../dto/salesOrderingSchemas/ordering-info.dto'
import { InsuranceInfoDto } from '../dto/salesOrderingSchemas/insurance-info.dto'

@Injectable()
export class SalesOrderingSchemaService {
  constructor(@InjectModel('SalesOrderingSchemaInterface') private readonly salesOrderingModel: Model<SalesOrderingSchemaInterface>){}

  async findSalesOrderingFormByOrderingNumber(orderingNumber: number): Promise<SalesOrderingSchemaInterface> {
    return await this.salesOrderingModel.findOne({orderingNumber: orderingNumber}).exec()
  }

  async saveOrUpdateSalesOrderingForm(salesOrderingForm: SalesOrderingDto): Promise<SalesOrderingSchemaInterface> {
    // let salesOrderingFormRegistered = await this.findSalesOrderingFormByOrderingNumber(salesOrderingForm.orderingNumber)
    let salesOrderingFormRegistered: any = await this.salesOrderingModel.findOne({orderingNumber: salesOrderingForm.orderingNumber})
    if (salesOrderingFormRegistered) {
      salesOrderingFormRegistered.customerInfo = this.updateCustomerInfo(salesOrderingFormRegistered, salesOrderingForm.customerInfo)
      salesOrderingFormRegistered.orderingInfo = this.updateOrderingInfo(salesOrderingFormRegistered, salesOrderingForm.orderingInfo)
      salesOrderingFormRegistered.insuranceInfo = this.updateInsuranceInfo(salesOrderingFormRegistered, salesOrderingForm.insuranceInfo)
    } else {
      salesOrderingFormRegistered = new this.salesOrderingModel(salesOrderingForm)
    }
    await salesOrderingFormRegistered.save()
    return salesOrderingFormRegistered
  }

  updateCustomerInfo(existedSalesOrderingForm: SalesOrderingSchemaInterface, customerInfo: CustomerInfoDto) {
    const tempCustomerInfo = existedSalesOrderingForm.customerInfo || {}
    for (const key in customerInfo) {
      if (customerInfo.hasOwnProperty(key)) {
        tempCustomerInfo[key] = customerInfo[key]
      }
    }
    return tempCustomerInfo
  }

  updateOrderingInfo(existedSalesOrderingForm: SalesOrderingSchemaInterface, orderingInfo: OrderingInfoDto) {
    const tempOrderingInfo = existedSalesOrderingForm.orderingInfo || {}
    for (const key in orderingInfo) {
      if (orderingInfo.hasOwnProperty(key)) {
        tempOrderingInfo[key] = orderingInfo[key]
      }
    }
    return tempOrderingInfo
  }

  updateInsuranceInfo(existedSalesOrderingForm: SalesOrderingSchemaInterface, insuranceInfo: InsuranceInfoDto) {
    const tempInsuranceInfo = existedSalesOrderingForm.insuranceInfo || {}
    for (const key in insuranceInfo) {
      if (insuranceInfo.hasOwnProperty(key)) {
        tempInsuranceInfo[key] = insuranceInfo[key]
      }
    }
    return tempInsuranceInfo
  }

}
