/* LIBRARIES */
import { Component, Fragment } from "react";
import * as React from 'react'
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";

/* ATRIBUTES */
import CardItem from '../CardItem'
import { PropsTable } from './model'

export class Table extends Component<PropsTable> {
  public state = {
    data: [],
    isInfiniteDisabled: false
  }
  constructor(props: PropsTable){
    super(props)
  }

  private supportItemsVerify(){
    const cant = (document.body.clientHeight)/100
    const totalItems = parseInt(cant.toFixed(0))
    return totalItems
  }

  private pushData(difference: number = 5, data: Array<any> = this.state.data){
    const max = data.length + difference;
    const min = max - difference;
    const newData: any = data;
    for (let i = min; i < max; i++) {
      if(this.props.data[i])newData.push(this.props.data[i]);
    }
    this.setState({
      data: newData,
      isInfiniteDisabled: newData.length===this.props.data.length?true:false
    });
  }

  componentDidMount(){
    const totalItems = this.supportItemsVerify()
    if(this.props.data.length>totalItems){
      this.pushData(totalItems)
    }else{
      this.pushData(this.props.data.length)
      this.setState({ isInfiniteDisabled: true })
    }
    this.pushData()
  }

  componentDidUpdate(prevPros: any){
    if(prevPros.data !== this.props.data){
      const totalItems = this.supportItemsVerify()
      if(this.props.data.length>totalItems){
        this.pushData(totalItems, [])
      }else{
        this.pushData(this.props.data.length, [])
        this.setState({ isInfiniteDisabled: true })
      }
    }
  }

  render (){
    const loadData = (ev: any) => {
      setTimeout(() => {
        this.pushData();
        ev.target.complete();
      }, 500);
    }
    return <Fragment>
    { this.state.data.map((element: any, index)=> {
      return (
        <CardItem 
          key={index}
          cols = { this.props.cols }
          onClick={this.props.onClickItem}
          data = { element }
        >
        </CardItem>
      )
    })}
    <IonInfiniteScroll
        onIonInfinite={loadData}
        threshold="100px"
        disabled={this.state.isInfiniteDisabled}
    >
      <IonInfiniteScrollContent
        loadingSpinner="bubbles"
        loadingText="Loading more data..."
      ></IonInfiniteScrollContent>
    </IonInfiniteScroll>
  </Fragment>
  }
}