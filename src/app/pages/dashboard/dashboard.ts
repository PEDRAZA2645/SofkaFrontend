import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form';
import { TransactionListComponent } from '../../components/transaction-list/transaction-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TransactionFormComponent, TransactionListComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {

  transactions: any[] = [];

  selectedId: number | null = null;
  selectedAmount = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.transactionService.getAll().subscribe({
      next: res => this.transactions = res.content,
      error: err => console.error(err)
    });
  }

  onEdit(transaction: any): void {
    this.selectedId = transaction.id;
    this.selectedAmount = transaction.amount;
  }

  onSave(amount: number): void {
    if (this.selectedId) {
      this.transactionService.update(this.selectedId, amount)
        .subscribe(() => {
          this.reset();
          this.load();
        });
    } else {
      this.transactionService.create(amount)
        .subscribe(() => this.load());
    }
  }

  private reset(): void {
    this.selectedId = null;
    this.selectedAmount = 0;
  }
}

