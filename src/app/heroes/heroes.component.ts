import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];


  constructor(private heroService: HeroService) { }

  // para pedir data siempre conviene pedirlo en ngOnInit
  ngOnInit() {
    // hasta getHeroes() obtenes el observable, luego te suscribis y esperas los cambios
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  add(inputName: string): void {
    const name = inputName.trim();
    if (name !== '') {
      this.heroService.addHero( { name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
    }
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(() => {
      this.heroes = this.heroes.filter(heroFilter => heroFilter !== hero);
    });
  }

}
