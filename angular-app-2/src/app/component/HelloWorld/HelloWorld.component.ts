import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  // selector: 'app-hello-world',
  templateUrl: './HelloWorld.component.html',
  styleUrls: ['./HelloWorld.component.scss']
})
export class HelloWorldComponent implements OnChanges {

	public joke: string;
	private header = { headers: new Headers({
		Accept: 'application/json'
	  })}
		
	@Input()  private newjoke;	// Member müssen alles kleinbuchstaben sein sonst funktioniert setAttribute in der Root-App nicht (index.html)
	@Output() private fetched = new EventEmitter();

	constructor(private cd: ChangeDetectorRef) {}
	
    ngOnChanges() {
        this.getNewJoke();
    }

    getNewJoke() {
      	fetch('https://icanhazdadjoke.com/', this.header)
          	.then(value => value.json())
			.then(json => {
				this.joke = json.joke;
				this.fetched.emit(this.joke)
				this.cd.detectChanges();
			})
    }
}
