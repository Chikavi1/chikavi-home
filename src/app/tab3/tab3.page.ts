
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

//Import Component for the update function and the Modal controller to handle the component.

import { UpdaterecordComponent } from '../components/updaterecord/updaterecord.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {




  
  doc: any;
  records: { id: string; name: string; type: string; }[];
  addrecord: {type: string ; name: string; };  

  slide = {
    slidesPerView: 1.3,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

 constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
  ) {}

  ngOnInit(){
    this.addrecord = {type :'', name :''}    
    this.firestore.collection('/Records/').snapshotChanges().subscribe(res=>{
      if(res){
        this.records = res.map(e=>{
          return{
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            type: e.payload.doc.data()['type']
          }
        })   
      }  
    })
  }


  AddRecord(type, name){
    let addrecord = {}
    addrecord['type'] = type
    addrecord['name'] = name
    addrecord['status'] = 0
    //console.log(addrecord)

    this.firestore.collection('/Records/').doc(name).set(addrecord).then(()=>{
      this.addrecord = {type :'', name :''} 
    })
  }


  async UpdateRecord(id, type, description, amount) {
    const modal = await this.modalController.create({
      component:  UpdaterecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {          
          'id': id,
          'type': type,
          'description': description,
          'amount': amount,
      }
    });
    return await modal.present();
  }

  DeleteRecord(id){
    this.firestore.doc('/Records/'+id).delete()
  }

}
