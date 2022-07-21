import { CustomerInfoDto } from './customer-info.dto'
import { OrderingInfoDto } from './ordering-info.dto'
import { InsuranceInfoDto } from './insurance-info.dto'

export class SalesOrderingDto {
  constructor(object: any) {
    this.id = object.id,
    this.brandId = object.brandId,
    this.orderingNumber = object.orderingNumber,
    this.salesEmployeeName = object.salesEmployeeName,
    // 客户信息
    this.customerInfo = new CustomerInfoDto(object.customerInfo),
    // 订单信息
    this.orderingInfo = new OrderingInfoDto(object.orderingInfo),
    // 保险信息
    this.insuranceInfo = new InsuranceInfoDto(object.insuranceInfo)
    // 售后衍生信息
    this.createdDate = object.createdDate,
    this.createdBy = object.createdBy
  }
  readonly id: string
  readonly brandId: number
  readonly orderingNumber: number
  readonly salesEmployeeName: string
  readonly customerInfo: CustomerInfoDto
  readonly orderingInfo: OrderingInfoDto
  readonly insuranceInfo: InsuranceInfoDto
  readonly createdDate: Date
  readonly createdBy: string
}
