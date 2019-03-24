import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';


/**
 * Generated class for the AddTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-todo',
  templateUrl: 'add-todo.html',
})
export class AddTodoPage {

  title: string='';
  description: string='';
  id: number=0;
  buttonText: string='Add';

  constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public api: DataServiceProvider,
                private toastCtrl : ToastController) {
  }

  ionViewDidLoad() {
    this.id=this.navParams.get('id');
    this.title=this.navParams.get('title');
    this.description=this.navParams.get('description');
    if(this.id != 0){
      this.buttonText='Edit';
    }else{
      this.buttonText='Add';
    }
  }

  addTodo(){
    if (this.title.trim() != "" && this.description.trim() != ""){
      if(this.id != 0){
        this.editTodo();
      }else{
        this.sendTodo();
      }
    }else{
      this.presentToast('All fields are required!');
    }
  }

  editTodo(){
    let data={title: this.title, description: this.description};
    this.api.editTodos(data, this.id)
      .then(data => {
        console.log(data);
        this.presentToast(data['message']);
        this.navCtrl.pop();
      })
      .catch(err=>{
        console.log(err);
      });
  }

  sendTodo(){
    let data={title: this.title, description: this.description};
    this.api.addTodos(data)
      .then(data => {
        console.log(data);
        this.presentToast(data['message']);
        this.navCtrl.pop();
      })
      .catch(err=>{
        console.log(err);
      });
  }

  presentToast(msg) {
      let toast = this
        .toastCtrl
        .create({message: msg, duration: 3000});
      toast.present();
    }
}
