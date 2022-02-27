import {
    AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { gsap } from 'gsap';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {
  title = 'notesApp';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  //   @ViewChildren('cardRef', { read: ElementRef }) cardElementRef!: ElementRef;
  @ViewChildren('cardRef', { read: ElementRef }) cardElementRef!: QueryList<ElementRef>;

  notes: any = [];
  cards: any = [];

  constructor(private dialog: MatDialog, readonly snackBar: MatSnackBar) {
    this.notes = [
      {
        title: 'Pay Credit Card Bill',
        note: 'Reminder to pay credit card bill by Thursday',
      },
      {
        title: 'Call Mom! ❤️❤️',
        note: 'Reminder to call back Mom tonight. She loves me.',
      },
      {
        title: 'Large Note',
        note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, voluptas minima asperiores odio adipisci cupiditate voluptatibus corporis consectetur doloribus, architecto, laboriosam cum nulla! Eius consequatur dicta, quia sequi nam necessitatibus!',
      },
    ];
  }

  ngAfterViewChecked(): void {
    this.cards = this.cardElementRef.toArray();         
  }


  trackByNote(index: number) {
    return index;
  }

  addNote() {
    const addNoteDialog = this.dialog.open(NoteComponent, {
      disableClose: true,
      panelClass: 'add-note-container',
      data: {
        dialogTitle: [''],
        dialogNote: [''],
      },
    });

    addNoteDialog.afterClosed().subscribe((result) => {
      if (result.title != null || result.note != null) {
        this.notes.push(result);
        this.snackBar.open('Note added successfully!', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-bg'],
        });
      }
    });
  }

  editNote(id: number) {
    const addNoteDialog = this.dialog.open(NoteComponent, {
      disableClose: true,
      panelClass: 'add-note-container',
      data: {
        dialogTitle: this.notes[id].title,
        dialogNote: this.notes[id].note,
      },
    });

    addNoteDialog.afterClosed().subscribe((result) => {
      if (result.title != null || result.note != null) {
        this.notes[id].title = result.title;
        this.notes[id].note = result.note;

        //   this.notes.push(result);
        this.snackBar.open('Note edited successfully!', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-bg'],
        });
      }
    });
  }

  deleteNote(id: number) {
    if (id > -1) {
      this.notes.splice(id, 1);
    }
  }

  mouseEnter(id: number) {
      gsap.to(this.cards[id].nativeElement,{ scale: 1.05, duration: 0.5 } )
  }

  mouseLeave(id: number) {
    gsap.to(this.cards[id].nativeElement,{ scale: 1, duration: 0.5 } )
  }
}
