import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  storedNotes = localStorage['notes'] ? JSON.parse(localStorage['notes']) : null;

  notes: any =  this.storedNotes === null ? [] : this.storedNotes;
  notesBehave$ = new BehaviorSubject(this.notes);
  notes$ = this.notesBehave$.asObservable();
  
  selectedNote!: any[];
  selectedBehave$ = new BehaviorSubject(this.selectedNote);
  selectedNote$ = this.selectedBehave$.asObservable();
  
  newNote: boolean = false;
  newNoteBehave$ = new BehaviorSubject(this.newNote);
  newNote$ = this.newNoteBehave$.asObservable();



  constructor() { }

  refreshStorage(){
    localStorage.removeItem('notes');
    localStorage.setItem('notes',JSON.stringify(this.notes));
  }

  saveNotes(savedTitle: string,savedInfo: string){
    let current = this.notes.find((el: Note) =>{
      return this.notes.indexOf(el.title === savedTitle);
    })
   
    const newNote ={
      title: savedTitle,
      info: savedInfo
    }

    if(current !== undefined){
      let index = this.notes.indexOf(current);

      this.notes[index] = newNote;
      
    }else{

      this.notes.push(newNote);
    }

    this.notesBehave$.next(this.notes);
    this.refreshStorage();
  }

  deleteNote(selectedTitle: string){
    
    this.notes = this.notes.filter((el: Note)=>{
       return el.title !== selectedTitle;
    });
    
    this.notesBehave$.next(this.notes);
   this.refreshStorage();
  }


  getNote(selectedTitle: string){
    this.selectedNote = this.notes.filter((el: Note)=>{
      return el.title === selectedTitle;
    });
    this.selectedBehave$.next(this.selectedNote);
  }


  clearForm(){
    this.newNote = !this.newNote;
    this.newNoteBehave$.next(this.newNote);
  }

}
