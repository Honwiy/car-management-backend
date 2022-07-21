import { CarEntity } from './car.entity'
import { CarPropertyEntity } from './car-property.entity'
import { CarPropertyItemEntity } from './car-property-item.entity'


enum CarTablesName {
  Car = 'Car',
  CarProperty = 'CarProperty',
  CarPropertyItem = 'CarPropertyItem'
}

export {
  CarTablesName
  , CarEntity
  , CarPropertyEntity
  , CarPropertyItemEntity
}
