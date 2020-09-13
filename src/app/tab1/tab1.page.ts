import { identifierModuleUrl } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {
  doc: any;
  records: { id: string; name: string; type: string; }[];
  addrecord: {type: string ; name: string;status: number }; 

  slide = {
    slidesPerView: 1,
    autoplay:true,
    speed: 1500,
    delay: 6000,
    disableOnInteraction: true
  }

  public now: Date = new Date();

  constructor(private firestore: AngularFirestore) {
      setInterval(() => {
        this.now = new Date();
      }, 1);
  }

  ngOnInit(){
    this.addrecord = {type :'', name :'',status:null}    
    this.firestore.collection('/Records/').snapshotChanges().subscribe(res=>{
      if(res){
        this.records = res.map(e=>{
          return{
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            type: e.payload.doc.data()['type'],
            status: e.payload.doc.data()['status']
          }
        })   
      }  
    })
  }
  
  changeStatus($id,$status) {
    console.log($id,$status);
     let updaterecord = {}
     updaterecord['status'] = $status? 0:1;
    this.firestore.doc('/Records/'+$id).update(updaterecord);

}

}
