import { OrderingDto } from './../dto/ordering.dto'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, Index } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'
import { Ordering } from '../sales.interface'
@Entity('Ordering')
export class OrderingEntity {
  @PrimaryColumn({ type: 'varchar', length: 255})
  OrderingNumber: string

  @Column({ type: 'int', nullable: true })
  CarId: number

  @Index('IDX_CarOrderingSalesId')
  @Column({ type: 'int', nullable: true, comment: '销售人员id' })
  SalesEmployeeId: number

  @Column({ type: 'text', nullable: true })
  CustomerNumber: string

  @Column({ type: 'int', nullable: true })
  AdditionalOrderId: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  DiscountName: string

  @Column({ type: 'decimal', nullable: true })
  DiscountPercentage: number

  @Column({ type: 'int', nullable: true })
  InsuranceId: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  TradingStatus: string

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '销售方式: 车辆预订, 整车销售' })
  SalesType: string

  @Column({ type: 'tinyint', nullable: true, comment: '付款方式: 1: 全款, 0: 分期付款' })
  PaymentType: number

  @Column({ type: 'decimal', nullable: true, comment: '定金' })
  OrderPrice: number

  @Column({ type: 'decimal', nullable: true, comment: '首付款' })
  FirstPaid: number

  @Column({ type: 'decimal', nullable: true, comment: '车款' })
  CarPrice: number

  @Column({ type: 'decimal', nullable: true, comment: '欠款' })
  ArrearPaidPrice: number

  @Column({ type: 'decimal', nullable: true, comment: '居间服务费'})
  ServiceCharge: number

  @Column({ type: 'decimal', nullable: true, comment: '精品销售' })
  DerivativePrice: number

  @Column({ type: 'decimal', nullable: true, comment: '代办上牌' })
  AgentLicensePrice: number

  @Column({ type: 'decimal', nullable: true, comment: '代办购置税' })
  AgentTaxPrice: number

  @Column({ type: 'decimal', nullable: true, comment: '代办大绿本抵押' })
  AgentGreenBookPrice: number

  @Column({ type: 'decimal', nullable: true, comment: '大绿本抵押' })
  GreenBookDeposit: number

  @Column({ type: 'int', nullable: true, comment: '定金付款方式' })
  OrderPaidWay: number

  @Column({ type: 'int', nullable: true, comment: '首付款付款方式' })
  FirstPaidWay: number

  @Column({ type: 'int', nullable: true, comment: '车款付款方式' })
  CarPricePaidWay: number

  @Column({ type: 'int', nullable: true, comment: '欠款付款方式' })
  ArrearPaidWay: number

  @Column({ type: 'int', nullable: true, comment: '居间服务费付款方式' })
  ServiceChargePaidWay: number

  @Column({ type: 'int', nullable: true, comment: '精品付款方式' })
  DerivativePaidWay: number

  @Column({ type: 'int', nullable: true, comment: '代办上牌付款方式' })
  AgentLicensePaidWay: number

  @Column({ type: 'int', nullable: true, comment: '代办购置税付款方式' })
  AgentTaxPaidWay: number

  @Column({ type: 'int', nullable: true, comment: '代办大绿本抵押付款方式' })
  AgentGreenBookPaidWay: number

  @Column({ type: 'int', nullable: true, comment: '大绿本抵押付款方式' })
  GreenBookDepositPaidWay: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  OrderPriceComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  FirstPaidComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CarPriceComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  ArrearPaidPriceComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  ServiceChargeComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  DerivativePriceComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  AgentLicensePriceComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  AgentTaxPriceComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  AgentGreenBookPriceComment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  GreenBookDepositComment: string

  @Column({ type: 'tinyint', nullable: true })
  IsActived: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string
}

export function OrderingDtoToModel(dto: OrderingDto): OrderingEntity {
  const model = new OrderingEntity()
  model.OrderingNumber = dto.orderingNumber
  model.CarId = dto.carId
  model.SalesEmployeeId = dto.salesEmployeeId
  model.CustomerNumber = dto.customerNumber
  model.AdditionalOrderId = dto.additionalOrderId
  model.DiscountName = dto.discountName
  model.DiscountPercentage = dto.discountPercentage
  model.InsuranceId = dto.insuranceId
  model.TradingStatus = dto.tradingStatus
  model.SalesType = dto.salesType
  model.PaymentType = dto.paymentType
  model.OrderPrice = dto.orderPrice
  model.FirstPaid = dto.firstPaid
  model.CarPrice = dto.carPrice
  model.ArrearPaidPrice = dto.arrearPaidPrice
  model.ServiceCharge = dto.serviceCharge
  model.DerivativePrice = dto.derivativePrice
  model.AgentLicensePrice = dto.agentLicensePrice
  model.AgentTaxPrice = dto.agentTaxPrice
  model.AgentGreenBookPrice = dto.agentGreenBookPrice
  model.GreenBookDeposit = dto.greenBookDeposit
  model.OrderPaidWay = dto.orderPaidWay
  model.FirstPaidWay = dto.orderPaidWay
  model.CarPricePaidWay = dto.carPricePaidWay
  model.ArrearPaidWay = dto.arrearPaidWay
  model.ServiceChargePaidWay = dto.serviceChargePaidWay
  model.DerivativePaidWay = dto.derivativePaidWay
  model.AgentLicensePaidWay = dto.agentLicensePaidWay
  model.AgentTaxPaidWay = dto.agentTaxPaidWay
  model.AgentGreenBookPaidWay = dto.agentGreenBookPaidWay
  model.GreenBookDepositPaidWay = dto.greenBookDepositPaidWay
  model.OrderPriceComment = dto.orderPriceComment
  model.FirstPaidComment = dto.firstPaidComment
  model.CarPriceComment = dto.carPriceComment
  model.ArrearPaidPriceComment = dto.arrearPaidPriceComment
  model.ServiceChargeComment = dto.serviceChargeComment
  model.DerivativePriceComment = dto.derivativePriceComment
  model.AgentLicensePriceComment = dto.agentLicensePriceComment
  model.AgentTaxPriceComment = dto.agentTaxPriceComment
  model.AgentGreenBookPriceComment = dto.agentGreenBookPriceComment
  model.GreenBookDepositComment = dto.greenBookDepositComment
  model.IsActived = dto.isActived
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function OrderingModelToDto(model: OrderingEntity): OrderingDto {
  const dto: OrderingDto = {
    orderingNumber: model.OrderingNumber,
    carId: model.CarId,
    salesEmployeeId: model.SalesEmployeeId,
    customerNumber: model.CustomerNumber,
    additionalOrderId: model.AdditionalOrderId,
    discountName: model.DiscountName,
    discountPercentage: model.DiscountPercentage,
    insuranceId: model.InsuranceId,
    tradingStatus: model.TradingStatus,
    salesType: model.SalesType,
    paymentType: model.PaymentType,
    orderPrice: model.OrderPrice,
    firstPaid: model.FirstPaid,
    carPrice: model.CarPrice,
    arrearPaidPrice: model.ArrearPaidPrice,
    serviceCharge: model.ServiceCharge,
    derivativePrice: model.DerivativePrice,
    agentLicensePrice: model.AgentLicensePrice,
    agentTaxPrice: model.AgentTaxPrice,
    agentGreenBookPrice: model.AgentGreenBookPrice,
    greenBookDeposit: model.GreenBookDeposit,
    orderPaidWay: model.OrderPaidWay,
    firstPaidWay: model.FirstPaidWay,
    carPricePaidWay: model.CarPricePaidWay,
    arrearPaidWay: model.ArrearPaidWay,
    serviceChargePaidWay: model.ServiceChargePaidWay,
    derivativePaidWay: model.DerivativePaidWay,
    agentLicensePaidWay: model.AgentLicensePaidWay,
    agentTaxPaidWay: model.AgentTaxPaidWay,
    agentGreenBookPaidWay: model.AgentGreenBookPaidWay,
    greenBookDepositPaidWay: model.GreenBookDepositPaidWay,
    orderPriceComment: model.OrderPriceComment,
    firstPaidComment: model.FirstPaidComment,
    carPriceComment: model.CarPriceComment,
    arrearPaidPriceComment: model.ArrearPaidPriceComment,
    serviceChargeComment: model.ServiceChargeComment,
    derivativePriceComment: model.DerivativePriceComment,
    agentLicensePriceComment: model.AgentLicensePriceComment,
    agentTaxPriceComment: model.AgentTaxPriceComment,
    agentGreenBookPriceComment: model.AgentGreenBookPriceComment,
    greenBookDepositComment: model.GreenBookDepositComment,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}
