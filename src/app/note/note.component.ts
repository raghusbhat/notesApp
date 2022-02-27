import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  noteForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<Component>,
    @Inject(MAT_DIALOG_DATA)
    public data: { dialogTitle: string; dialogNote: string }
  ) {
    this.noteForm = this.fb.group({
      title: this.data.dialogTitle,
      note: this.data.dialogNote,
    });
  }

  ngOnInit(): void {}

  addNote() {
    const data = this.noteForm.value;
    this.dialogRef.close(data);
  }
}
