import { Component, OnInit } from '@angular/core';
import { CurrencyConverterService } from '../../service/currency-converter.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  constructor(
    private currencyConverterService: CurrencyConverterService
  ) { }
  usdPrice: number = 0;
  monthlyPrice: number = 0;
  yearlyPrice: number = 0;

  ngOnInit() {
    this.currencyConverterService.getData()
      .subscribe((data: any) => {
        this.usdPrice = data.serie[0].valor;
        this.monthlyPrice = Math.trunc(this.usdPrice);
        this.yearlyPrice = Math.trunc(this.usdPrice * 10);
      });
  }

}
