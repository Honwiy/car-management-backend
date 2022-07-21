export class PreOrderingCarDto {
  constructor(object: any = {}) {
    // TODO: to be defined the fields of this class
    object = object || {}
      this.brand = object.brand,
      this.carSeries = object.carSeries,
      this.carType = object.carType,
      this.carTypeCode = object.carTypeCode,
      this.carTypeCategory = object.carTypeCategory,
      this.carColor = object.carColor,
      this.transmission = object.transmission
  }
  readonly brand: string
  readonly carSeries: string
  readonly carType: string
  readonly carTypeCode: string
  readonly carTypeCategory: string
  readonly carColor: string
  readonly transmission: string
}
