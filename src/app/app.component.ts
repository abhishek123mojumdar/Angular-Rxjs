import {
  AfterViewInit,
  Component,
  ElementRef,
  VERSION,
  ViewChild,
} from '@angular/core';
import {
  from,
  fromEvent,
  interval,
  of,
  toArray,
  take,
  map,
  filter,
  tap,
  concat,
  merge,
  mergeAll,
  mergeMap,
} from 'rxjs';
import { UtilityService } from './utility.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor(public utility: UtilityService) {}

  name = 'RXJS ';
  @ViewChild('fromEventBtn')
  public fromEventBtn: ElementRef;
  public counter = 0;
  public intervalCount = 0;
  public elements = [];
  public toArrayCount = 0;
  public jsonData = [
    {
      id: 1,
      name: 'Abhishek',
      tech: 'JavasScript',
      organisation: {
        office: 'Mahadevpura',
        company: 'Dell',
      },
    },
    {
      id: 2,
      name: 'Shruti',
      tech: 'Java',
      organisation: {
        office: 'Bellandur',
        company: 'JPMC',
      },
    },
    {
      id: 3,
      name: 'Jaideep',
      tech: 'GoLang',
      organisation: {
        office: 'Mg road',
        company: 'BMC',
      },
    },
    {
      id: 4,
      name: 'Swathi',
      tech: 'Python',
      organisation: {
        office: 'Trinity',
        company: 'Citrix',
      },
    },
    {
      id: 5,
      name: 'Ritu',
      tech: 'Sql',
      organisation: {
        office: 'Marathalli',
        company: 'Solaris',
      },
    },
  ];

  public dataInNeed = [];

  ngAfterViewInit(): void {
    fromEvent(this.fromEventBtn.nativeElement, 'click').subscribe((data) => {
      console.log(data);
      this.counter = this.counter + 1;
      this.utility.printData(
        'ulList',
        'Number of times clicked = ' + this.counter
      );
    });
  }

  startinterval() {
    // let intervlaSub = interval(1000).subscribe((data) => {
    //   this.intervalCount++;
    //   this.utility.printData(
    //     'ulListInt',
    //     'emitting interval ' + this.intervalCount
    //   );
    //   if (this.intervalCount === 10) {
    //     intervlaSub.unsubscribe();
    //     this.intervalCount = 0;
    //   }
    // });
    let intervlaSub = interval(1000)
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        map((data) => data * 10),
        tap((data) => {
          console.log(data);
        })
      )
      .subscribe((data) => {
        this.utility.printData('ulListInt', 'emitting interval ' + data);
        if (data === 100) {
          intervlaSub.unsubscribe();
          this.intervalCount = 0;
        }
      });

    // tap helps us to see what is the value of the response before and after an rxjs operator has been applied to a stream of data
  }

  ofOperator() {
    //in of operator whatever is there in the argument will be emitted as a stream
    //let data = { a: 'Abhishek', b: 'is', c: 'a', d: 'FED' };
    let ofObs = of('Abhishek', 'is', 'a', 'front end developer');
    //let ofObs = of(data);
    ofObs.subscribe((data) => {
      console.log(data);
      this.utility.printData('ulListIntOf', data);
    });
  }

  fromOperator() {
    //from operator emits iterables , observables and promises as stream
    let data = ['Abhishek', 'is', 'a', 'front end developer'];
    //let data = 'Abhishek is frontend dev';
    //let data = promiseFn()
    let fromObs = from(data);
    fromObs.subscribe((data) => {
      console.log(data);
      this.utility.printData('ulListFrom', data);
    });
  }

  promiseFn() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('Promise value is resolved');
      }, 2000);
    });
  }

  toArrayDemo() {
    // from(['Abhishek', 'is', 'a', 'front end developer'])
    //   .pipe(take(2))
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    // interval(1000)
    //   .pipe(take(5))
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    let data = { a: 'Abhishek', b: 'is', c: 'a', d: 'FED' };
    let ofObs = of('Abhishek', 'is', 'a', 'front end developer');
    //let ofObs = of(data);
    ofObs.pipe(toArray()).subscribe((res) => {
      console.log(res);
      this.elements = res;
    });

    // take unsubscribes the subscription once the condition is fulfilled
  }

  mapFilter() {
    //this.dataInNeed = this.jsonData;
    from(this.jsonData)
      .pipe(
        map((data) => data.name),
        toArray()
      )
      .subscribe((resp) => {
        console.log(resp);
        // this.dataInNeed = resp;
      });

    from(this.jsonData)
      .pipe(
        filter((data) => data.id < 5),
        toArray()
      )
      .subscribe((resp) => {
        console.log(resp);
        this.dataInNeed = resp;
      });

    //show how do map and filter actually work in JS
    // Map helps us to manipulate data from a stream of data and it returns us the manipulated stream of data rather than an array (as in case of JS map )
  }

  mergeConcatDemo() {
    // let time1 = interval(1000).pipe(
    //   take(5),
    //   map((data) => 'value from time 1 ' + data)
    // );
    // let time2 = interval(1000).pipe(
    //   take(5),
    //   map((data) => 'value from time 2 ' + data)
    // );
    // let time3 = interval(1000).pipe(
    //   take(5),
    //   map((data) => 'value from time 3 ' + data)
    // );
    // let finalConcatenation = concat(time1, time2, time3);
    // finalConcatenation.subscribe((data) => {
    //   console.log(data);
    // });
    // let timer1 = interval(1000).pipe(
    //   take(5),
    //   map((data) => 'value from time 1 ' + data)
    // );
    // let timer2 = interval(2000).pipe(
    //   take(5),
    //   map((data) => 'value from time 2 ' + data)
    // );
    // let timer3 = interval(3000).pipe(
    //   take(5),
    //   map((data) => 'value from time 3 ' + data)
    // );
    // let finalMerge = merge(timer1, timer2, timer3);
    // finalMerge.subscribe((data) => {
    //   console.log(data);
    // });
  }

  mergeMapDemo() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(mergeMap((data) => this.getData(data)))
      .subscribe((resp) => {
        console.log(resp);
        console.log(this.getData(resp));
      });
  }

  getData(id) {
    return of('The id is ' + id);
  }
}
