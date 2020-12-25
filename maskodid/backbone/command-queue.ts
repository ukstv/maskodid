import { Subject } from "rxjs";
import { concatMap } from "rxjs/operators";

type Func = () => Promise<any>;

export class CommandQueue {
  private readonly subject: Subject<Func> = new Subject<Func>();

  constructor() {
    this.subject
      .pipe(
        concatMap((command) => {
          return command();
        })
      )
      .subscribe();
  }

  execute<A>(f: () => Promise<A>): Promise<A> {
    return new Promise<A>((resolve, reject) => {
      this.subject.next(() => {
        return f().then(resolve).catch(reject);
      });
    });
  }
}
