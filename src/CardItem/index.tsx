/* LIBRARIES */
import { Component } from 'react'
import * as React from 'react'
import {
 IonCard, IonCardContent,
 IonCol, IonRow,
} from '@ionic/react';

/* ATRIBUTES */
import { PropsCardItem, StateCardItem, TypeCardItem } from './model'

export class CardItem extends Component<PropsCardItem> {
  public state: StateCardItem = {
    IonCardClass: 'button',
    start: [],
    center: [],
    end: [],
  }
  constructor(props: PropsCardItem){
    super(props)
  }
  componentDidUpdate(prevProps: PropsCardItem){
    if( prevProps.cols !== this.props.cols ){
      this.setState({
        start: this.props.cols.filter(col=>col.slot==='start'),
        center: this.props.cols.filter(col=>col.slot==='center'),
        end: this.props.cols.filter(col=>col.slot==='end'),
      })
    }
  }
  private onClick(){
    if(this.props.onClick){
      this.props.onClick(this.props.data)
    }
  }
  private getLabel(field: any){
    if(!field)return eval(`this.props.data`)
    const label = eval(`this.props.data.${field}`)
    return label
  }

  render(){
    return <IonCard className={`ItemCard ${this.props.onClick?'button':''}`} onClick={()=>this.onClick()}>
    <IonCardContent>
      <IonRow>
        { this.state.start.length>0?<IonCol className='start' >
          {  this.state.start.map((element, key) => element.DOM(this.getLabel(element.field), key))}
        </IonCol>:null}
        { this.state.center.length>0?<IonCol className='center' >
          {  this.state.center.map((element, key) => element.DOM(this.getLabel(element.field), key)) }
        </IonCol>:null}
        { this.state.end.length>0?<IonCol className='end' >
          {  this.state.end.map((element, key) => element.DOM(this.getLabel(element.field), key)) }
        </IonCol>:null}
      </IonRow>
    </IonCardContent>
  </IonCard>
  }
}

export {
  TypeCardItem,
  PropsCardItem,
  StateCardItem
}
export default CardItem