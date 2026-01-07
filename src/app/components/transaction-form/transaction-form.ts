import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './transaction-form.html',
  styleUrls: ['./transaction-form.scss']
})
export class TransactionFormComponent {

  @Input() amount = 0;
  @Input() editing = false;

  @Output() save = new EventEmitter<number>();

  submit(): void {
    if (this.amount > 0) {
      this.save.emit(this.amount);
      this.amount = 0;
    }
  }
}
