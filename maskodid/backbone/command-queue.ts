import { Subject } from "rxjs";
import { concatMap } from "rxjs/operators";

type Func = () => Promise<any>;

export class CommandQueue {
  private readonly subject: Subject<Func> = new Subject<Func>();
  private counter = 0;

  get size() {
    return this.counter;
  }

  constructor() {
    this.subject
      .pipe(
        concatMap(async (command) => {
          const result = await command();
          this.counter = this.counter - 1;
          console.log("counter-conc", this.counter);
          return result;
        })
      )
      .subscribe();
  }

  execute<A>(f: () => Promise<A>): Promise<A> {
    this.counter = this.counter + 1;
    console.log("counter-exec", this.counter);
    return new Promise<A>((resolve, reject) => {
      this.subject.next(() => {
        return f().then(resolve).catch(reject);
      });
    });
  }
}
