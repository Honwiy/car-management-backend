export class InsuranceInfoDto {
  constructor(object: any) {
    object = object || {}
      this.accidentIns = object.accidentIns,
      this.carDamageIns = object.carDamageIns,
      this.customerType = object.customerType,
      this.driverIns = object.driverIns,
      this.findThirdPartyIns = object.findThirdPartyIns,
      this.fireIns = object.fireIns,
      this.glassIns = object.glassIns,
      this.insuranceCompany = object.insuranceCompany,
      this.passengerIns = object.passengerIns,
      this.scratchIns = object.scratchIns,
      this.stolenIns = object.stolenIns,
      this.thirdPartyIns = object.thirdPartyIns,
      this.waterIns = object.waterIns
  }
  readonly accidentIns: boolean
  readonly carDamageIns: boolean
  readonly customerType: string
  readonly driverIns: string
  readonly findThirdPartyIns: boolean
  readonly fireIns: boolean
  readonly glassIns: boolean
  readonly insuranceCompany: string
  readonly passengerIns: string
  readonly scratchIns: boolean
  readonly stolenIns: boolean
  readonly thirdPartyIns: boolean
  readonly waterIns: boolean
}
