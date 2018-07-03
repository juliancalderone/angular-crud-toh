import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../hero';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  // Subject tipo de observable

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }
  // .next dispara un update en el observable
  ngOnInit() {
    // en el pipe definimos condiciones porque el usuario va a tipear
    this.heroes$ = this.searchTerms.pipe(
      // espera 3 s mientras mantenes apretada la tecla
      debounceTime(300),
      // busca solo una vez si repetis la busqueda
      distinctUntilChanged(),
      // toma una callback que le devuelve el observable que se tiene que cambiar
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
