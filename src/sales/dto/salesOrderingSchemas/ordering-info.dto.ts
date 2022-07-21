import { PreOrderingCarDto } from './pre-ordering-car.dto'

export class OrderingInfoDto {
  constructor(object: any = {}) {
    this.preOrderingCar = new PreOrderingCarDto(object.preOrderingCar), // this.preOrderingCar in frontend page carinfo component
    this.tradingStatus = object.tradingStatus,
    this.salesType = object.salesType,
    this.paymentType = object.paymentType,
    this.orderPrice = object.orderPrice,
    this.firstPaid = object.firstPaid,
    this.carPrice = object.carPrice,
    this.arrearPaidPrice = object.arrearPaidPrice,
    this.serviceCharge = object.serviceCharge,
    this.derivativePrice = object.derivativePrice,
    this.agentLicensePrice = object.agentLicensePrice,
    this.agentTaxPrice = object.agentTaxPrice,
    this.agentGreenBookPrice = object.agentGreenBookPrice,
    this.greenBookDeposit = object.greenBookDeposit,
    this.orderPaidWay = object.orderPaidWay,
    this.firstPaidWay = object.firstPaidWay,
    this.carPricePaidWay = object.carPricePaidWay,
    this.arrearPaidWay = object.arrearPaidWay,
    this.serviceChargePaidWay = object.serviceChargePaidWay,
    this.derivativePaidWay = object.derivativePaidWay,
    this.agentLicensePaidWay = object.agentLicensePaidWay,
    this.agentTaxPaidWay = object.agentTaxPaidWay,
    this.agentGreenBookPaidWay = object.agentGreenBookPaidWay,
    this.greenBookDepositPaidWay = object.greenBookDepositPaidWay,
    this.orderPriceComment = object.orderPriceComment,
    this.firstPaidComment = object.firstPaidComment,
    this.carPriceComment = object.carPriceComment,
    this.arrearPaidPriceComment = object.arrearPaidPriceComment,
    this.serviceChargeComment = object.serviceChargeComment,
    this.derivativePriceComment = object.derivativePriceComment,
    this.agentLicensePriceComment = object.agentLicensePriceComment,
    this.agentTaxPriceComment = object.agentTaxPriceComment,
    this.agentGreenBookPriceComment = object.agentGreenBookPriceComment,
    this.greenBookDepositComment = object.greenBookDepositComment,
    this.discountName = object.discountName,
    this.discountPercentage = object.discountPercentage
  }
  readonly preOrderingCar: PreOrderingCarDto //  readonly preOrderingCar in frontend page carinfo component
  readonly tradingStatus: string
  readonly salesType: string
  readonly paymentType: number
  readonly orderPrice: number
  readonly firstPaid: number
  readonly carPrice: number
  readonly arrearPaidPrice: number
  readonly serviceCharge: number
  readonly derivativePrice: number
  readonly agentLicensePrice: number
  readonly agentTaxPrice: number
  readonly agentGreenBookPrice: number
  readonly greenBookDeposit: number
  readonly orderPaidWay: number
  readonly firstPaidWay: number
  readonly carPricePaidWay: number
  readonly arrearPaidWay: number
  readonly serviceChargePaidWay: number
  readonly derivativePaidWay: number
  readonly agentLicensePaidWay: number
  readonly agentTaxPaidWay: number
  readonly agentGreenBookPaidWay: number
  readonly greenBookDepositPaidWay: number
  readonly orderPriceComment: string
  readonly firstPaidComment: string
  readonly carPriceComment: string
  readonly arrearPaidPriceComment: string
  readonly serviceChargeComment: string
  readonly derivativePriceComment: string
  readonly agentLicensePriceComment: string
  readonly agentTaxPriceComment: string
  readonly agentGreenBookPriceComment: string
  readonly greenBookDepositComment: string
  readonly discountName: string
  readonly discountPercentage: number
}
