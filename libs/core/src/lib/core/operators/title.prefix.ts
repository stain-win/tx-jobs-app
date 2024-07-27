import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class TitlePrefix extends TitleStrategy {
    updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot); // build the current route title
        if (title) {
            this.title.setTitle(`TX Jobs - ${title}`); // set the app prefix with the current title.
        }
    }
    constructor(private title: Title) { // inject the title service
        super();
    }
}
