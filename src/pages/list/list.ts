import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { DataServiceProvider } from '../../providers/data-service/data-service';

import { AddTodoPage } from '../../pages/add-todo/add-todo';
//import { WebSocket } from 'angular2-websocket/angular2-websocket';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  items: Array<{id: string, title: string, description: string}>;
  noData: boolean=false;


  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public api: DataServiceProvider,
            private toastCtrl : ToastController,
            private alertCtrl : AlertController) {

    this.items = [];

  }

  ionViewWillEnter(){
    this.getTodos();
  }

  buttonRefresh(){
    this.getTodos();
  }

  test(){
    this.api.getTest()
    .subscribe(
        res => {
          // Here you can use the response
          // ...
        },
        error => {

            // TODO: Handle error
            // ...

            console.log(error);
        });
  }

  getTodosId(id){
    this.api.getTodosId(id)
      .then(data => {
        console.log(data);
        if(data['success']=='true'){
          this.showAlert(data['todo']['title'], data['todo']['description']);
        }else{
          this.presentToast('something get wrong with server');
        }
      })
      .catch(err=>{
        console.log(err);
      });
  }

  editTodosId(id, title, description){
    this.navCtrl.push(AddTodoPage, {id: id, title: title, description: description});
  }

  deleteTodosId(id){
    this.api.deleteTodosId(id)
      .then(data => {
        console.log(data);
        if(data['success']!='true'){
          this.presentToast('something get wrong with server');
        }else{
          this.getTodos();
          this.presentToast(data['message']);
        }
      })
      .catch(err=>{
        console.log(err);
      });
  }

  showAlert(title, description) {
      const alert = this.alertCtrl.create({
        title: title,
        subTitle: description,
        buttons: ['OK']
      });
      alert.present();
  }


  getTodos(){
    this.api.getTodos()
      .then(data => {
        console.log(data);
        if(data['success']=='true'){
          this.items=data['todos'];
          if(this.items.length < 1){
            this.noData=true;
          }else{
            this.noData=false;
          }
        }else{
          this.presentToast('something get wrong with server');
        }

      })
      .catch(err=>{
        console.log(err);
      });

  }

  addTodo(){
    this.navCtrl.push(AddTodoPage,{id: 0, title: '', description: ''});
  }

  presentToast(msg) {
      let toast = this
        .toastCtrl
        .create({message: msg, duration: 3000});
      toast.present();
    }
}
