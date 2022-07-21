import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

// export type SalesOrderingDocument = SalesOrdering & mongoose.Document

// @Schema()
// export class SalesOrdering {
//   @Prop()
//   name: string

//   @Prop()
//   age: number

//   @Prop()
//   breed: string
// }

// export const SalesOrderingSchema = SchemaFactory.createForClass(SalesOrdering)

export const SalesOrderingSchema = new mongoose.Schema({
  id: String,
  brandId: Number,
  orderingNumber: Number,
  salesEmployeeName: String,
  // 客户信息
  customerInfo: {
    name: String,
    customerNumber: String,
    customerPhoneNumber: String,
    identityCard: String,
    districtedId: Number,
    customerSourceId: Number
  },
  // 订单信息
  orderingInfo: {
    preOrderingCar: {
      brand: String,
      carSeries: String,
      carType: String,
      carTypeCode: String,
      carTypeCategory: String,
      carColor: String,
      transmission: String
    }, // preOrderingCar in frontend page carinfo component
    tradingStatus: String,
    salesType: String,
    paymentType: Number,
    orderPrice: Number,
    firstPaid: Number,
    carPrice: Number,
    arrearPaidPrice: Number,
    serviceCharge: Number,
    derivativePrice: Number,
    agentLicensePrice: Number,
    agentTaxPrice: Number,
    agentGreenBookPrice: Number,
    greenBookDeposit: Number,
    orderPaidWay: Number,
    firstPaidWay: Number,
    carPricePaidWay: Number,
    arrearPaidWay: Number,
    serviceChargePaidWay: Number,
    derivativePaidWay: Number,
    agentLicensePaidWay: Number,
    agentTaxPaidWay: Number,
    agentGreenBookPaidWay: Number,
    greenBookDepositPaidWay: Number,
    orderPriceComment: String,
    firstPaidComment: String,
    carPriceComment: String,
    arrearPaidPriceComment: String,
    serviceChargeComment: String,
    derivativePriceComment: String,
    agentLicensePriceComment: String,
    agentTaxPriceComment: String,
    agentGreenBookPriceComment: String,
    greenBookDepositComment: String,
    discountName: String,
    discountPercentage: Number,
  },
  // 保险信息
  insuranceInfo: {
    accidentIns: { type: Boolean, default: false },
    carDamageIns: { type: Boolean, default: false },
    customerType: String,
    driverIns: String,
    findThirdPartyIns: { type: Boolean, default: false },
    fireIns: { type: Boolean, default: false },
    glassIns: { type: Boolean, default: false },
    insuranceCompany: String,
    passengerIns: String,
    scratchIns: { type: Boolean, default: false },
    stolenIns: { type: Boolean, default: false },
    thirdPartyIns: String,
    waterIns: { type: Boolean, default: false }
  },
  // 售后衍生信息
  createdDate: {type: Date, default: Date.now},
  createdBy: String
})
