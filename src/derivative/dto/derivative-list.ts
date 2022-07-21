import { ApiModelProperty } from '@nestjs/swagger'
import { DerivativeItem } from './derivative-item'

export class DerivativeList {
  @ApiModelProperty()
  id?: number
  @ApiModelProperty()
  categoryCode?: string
  @ApiModelProperty()
  categoryText?: string
  @ApiModelProperty()
  status?: number
  @ApiModelProperty()
  derivativeItemList?: Array<any>
  @ApiModelProperty()
  createdDate?: string
  @ApiModelProperty()
  createdBy?: string
  @ApiModelProperty()
  updatedDate?: string
  @ApiModelProperty()
  updatedBy?: string
}
