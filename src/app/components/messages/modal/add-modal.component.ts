import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.less']
})
export class AddModalComponent implements OnInit {
  public form: FormGroup;
  authors: any[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data) {
      this.authors = data.authors;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(100)]],
      authorId: ['', [Validators.required]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  public save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
