import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input('noteForm')
  noteForm!: FormGroup;
  notes!: any;

  constructor(private service: NoteService) { }

  ngOnInit(): void {
    
  this.service.notes$.subscribe(res => this.notes = res);

  }

  deleteNote(title: string){
    this.service.deleteNote(title);
  }

  getNote(title: string){
    this.service.getNote(title);
  }

  clearForm(){
    this.service.clearForm();
  }

}
