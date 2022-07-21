export class CustomerInfoDto {
  constructor(object: any) {
    object = object || {}
      this.name = object.name,
      this.customerNumber = object.customerNumber,
      this.customerPhoneNumber = object.customerPhoneNumber,
      this.identityCard = object.identityCard,
      this.districtedId = object.districtedId,
      this.customerSourceId = object.customerSourceId
  }
  readonly name: string
  readonly customerNumber: string
  readonly customerPhoneNumber: string
  readonly identityCard: string
  readonly districtedId: number
  readonly customerSourceId: number
}
