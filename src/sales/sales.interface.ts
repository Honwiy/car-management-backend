import { Customer } from '../customer/customer.interface'
import { OrderingDto } from './dto/ordering.dto'
import { Document } from 'mongoose'

export interface CarOrdering {
  carOrdering?: OrderingDto,
  customer?: Customer
}
export interface Ordering {
  Id?: number
  OrderingNumber?: string
  CarId?: number
  CustomerId?: number
  AdditionalOrderId?: number
  DiscountName?: string
  DiscountPercentage?: number
  InsuranceId?: number
  TradingStatus?: string
  OrderPrice?: number
  FirstPaid?: number
  CarPrice?: number
  ArrearPaidPrice?: number
  ServiceCharge?: number
  DerivativePrice?: number
  AgentLicensePrice?: number
  AgentTaxPrice?: number
  AgentGreenBookPrice?: number
  GreenBookDeposit?: number
  OrderPaidWay?: number
  FirstPaidWay?: number
  CarPricePaidWay?: number
  ArrearPaidWay?: number
  ServiceChargePaidWay?: number
  DerivativePaidWay?: number
  AgentLicensePaidWay?: number
  AgentTaxPaidWay?: number
  AgentGreenBookPaidWay?: number
  GreenBookDepositPaidWay?: number
  OrderPriceComment?: string
  FirstPaidComment?: string
  CarPriceComment?: string
  ArrearPaidPriceComment?: string
  ServiceChargeComment?: string
  DerivativePriceComment?: string
  AgentLicensePriceComment?: string
  AgentTaxPriceComment?: string
  AgentGreenBookPriceComment?: string
  GreenBookDepositComment?: string
  IsActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface Product {
  Id?: number
  CategoryId?: number
  StoreHouseId?: number
  BrandId?: number
  OwnSpecValue?: string
  PurchaseOrderingPrice?: number
  PrePrice?: number
  FinalPrice?: number
  IsDiscount?: number
  DiscountPercentage?: number
  IsFree?: number
  ProductStatus?: string
  IsActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface Category {
  Id?: number
  CategoryCode?: string
  CategoryName?: string
  IsActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface Property {
  Id?: number
  CategoryId?: number
  PropertyCode?: string
  PropertyName?: string
  IsActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface PropertyItem {
  Id?: number
  PropertyId?: number
  PropertyItemCode?: string
  PropertyItemName?: string
  ParentId?: number
  IsActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface PropertyItemMapping {
  Id?: number
  PropertyItemId?: number
  ProductId?: number
  IsActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface Package {
  Id?: number
  PackageName?: string
  PackageCode?: string
  Type?: string
  ProductId?: number
  Quantity?: number
  PaymentType?: number
  IsActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface CarPackageMapping {
  Id?: number
  CarId?: number
  PackageId?: number
  IsActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface SalesOrderingSchemaInterface extends Document {
  id: string,
  brandId: number,
  orderingNumber: number,
  salesEmployeeName: string,
  // 客户信息
  customerInfo: {
    name: string,
    customerNumber: string,
    customerPhoneNumber: string,
    IdentityCard: string,
    DistrictedId: number,
    CustomerSourceId: number
  },
  // 订单信息
  orderingInfo: {
    preOrderingCar: { }, // preOrderingCar in frontend page carinfo component
    tradingStatus: string,
    salesType: string,
    paymentType: number,
    orderPrice: number,
    firstPaid: number,
    carPrice: number,
    arrearPaidPrice: number,
    serviceCharge: number,
    derivativePrice: number,
    agentLicensePrice: number,
    agentTaxPrice: number,
    agentGreenBookPrice: number,
    greenBookDeposit: number,
    orderPaidWay: number,
    firstPaidWay: number,
    carPricePaidWay: number,
    arrearPaidWay: number,
    serviceChargePaidWay: number,
    derivativePaidWay: number,
    agentLicensePaidWay: number,
    agentTaxPaidWay: number,
    agentGreenBookPaidWay: number,
    greenBookDepositPaidWay: number,
    orderPriceComment: string,
    firstPaidComment: string,
    carPriceComment: string,
    arrearPaidPriceComment: string,
    serviceChargeComment: string,
    derivativePriceComment: string,
    agentLicensePriceComment: string,
    agentTaxPriceComment: string,
    agentGreenBookPriceComment: string,
    greenBookDepositComment: string,
    discountName: string,
    discountPercentage: number,
  },
  // 保险信息
  insuranceInfo: {
    accidentIns: boolean,
    carDamageIns: boolean,
    customerType: string,
    driverIns: string,
    findThirdPartyIns: boolean,
    fireIns: boolean,
    glassIns: boolean,
    insuranceCompany: string,
    passengerIns: string,
    scratchIns: boolean,
    stolenIns: boolean,
    thirdPartyIns: string,
    waterIns: boolean
  },
  // 售后衍生信息
  createdDate: Date,
  createdBy: string
}
