import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent implements OnInit {
  
 
noteForm!: FormGroup;



  constructor(private fb: FormBuilder, private service: NoteService) { }

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: new FormControl('', [Validators.required ]),
  
      info: new FormControl('',[Validators.required]),
    });

    

    this.service.selectedNote$.subscribe(res=>{
      if(res !== undefined){
        this.noteForm.setValue({
          title: res[0].title,
          info: res[0].info
        })
      }
    });

    this.service.newNote$.subscribe(res =>{
      if(res === true){
        this.noteForm.reset();
      }
    })

    
  }
  

  saveNote(title: string, info: string){
    this.service.saveNotes(title,info);
    this.noteForm.reset();
  }

  revertNote(){
    this.service.selectedNote$.subscribe(res=>{
      if(res !== undefined){
        this.noteForm.setValue({
          title: res[0].title,
          info: res[0].info
        })
      }
    });
  }

}
